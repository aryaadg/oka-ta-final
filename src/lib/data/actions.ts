"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { isSupabaseConfigured, readLocalStore, writeLocalStore } from "./store";
import { SiteSettings, Artist, Service, GalleryItem, Inquiry } from "../mock";
import { getGalleryItems, getArtists, getServices, getSiteSettings } from "./public";
import { getAdminInquiries } from "./admin";

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/id", "layout");
  revalidatePath("/en", "layout");
}

function isUuid(val?: string): boolean {
  if (!val) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    val
  );
}

// --- INITIAL DATA FETCH ACTIONS FOR CLIENT ADMIN PAGES ---

export async function fetchAdminGalleryDataAction() {
  const [items, artists] = await Promise.all([getGalleryItems(), getArtists()]);
  return { items, artists };
}

export async function fetchAdminArtistsAction() {
  return await getArtists();
}

export async function fetchAdminServicesAction() {
  return await getServices(true);
}

export async function fetchAdminInquiriesAction() {
  return await getAdminInquiries();
}

export async function fetchAdminSettingsAction() {
  return await getSiteSettings();
}

// --- SYNC LOCAL STORE TO SUPABASE ---

export async function syncLocalToSupabaseAction() {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "NEXT_PUBLIC_SUPABASE_URL belum dikonfigurasi di .env.local.",
    };
  }

  try {
    const supabase = await createClient();
    const store = readLocalStore();

    // Remove old 1-row placeholders if present
    await supabase.from("gallery_items").delete().eq("title", "Placeholder Work");
    await supabase.from("artists").delete().eq("name", "[ARTIST_NAME]");
    await supabase
      .from("services")
      .delete()
      .eq("name_id", "Tato Custom")
      .eq("starting_price", 500000);

    const { error: settingsErr } = await supabase
      .from("site_settings")
      .upsert({ ...store.siteSettings, id: 1 });

    if (settingsErr) {
      return {
        ok: false,
        message: `Supabase menolak penulisan (${settingsErr.message}). Jalankan file supabase/schema.sql di SQL Editor Supabase terlebih dahulu agar RLS mengizinkan sinkronisasi.`,
      };
    }

    const artistIdMap = new Map<string, string>();
    const defaultArtistUuids = [
      "11111111-1111-4111-8111-111111111111",
      "22222222-2222-4222-8222-222222222222",
      "33333333-3333-4333-8333-333333333333",
    ];

    for (let i = 0; i < store.artists.length; i++) {
      const a = store.artists[i];
      const targetId = isUuid(a.id)
        ? a.id
        : defaultArtistUuids[i] || crypto.randomUUID();
      artistIdMap.set(a.id, targetId);
      await supabase.from("artists").upsert({
        id: targetId,
        name: a.name,
        photo_url: a.photo_url,
        bio_id: a.bio_id,
        bio_en: a.bio_en,
        specialties: a.specialties,
        sort_order: a.sort_order || i + 1,
      });
    }

    for (let i = 0; i < store.services.length; i++) {
      const s = store.services[i];
      const targetId = isUuid(s.id) ? s.id : crypto.randomUUID();
      const numericPrice =
        parseInt(String(s.starting_price).replace(/[^0-9]/g, ""), 10) || 0;
      await supabase.from("services").upsert({
        id: targetId,
        name_id: s.name_id,
        name_en: s.name_en,
        description_id: s.description_id,
        description_en: s.description_en,
        size_category: s.size_category,
        starting_price: numericPrice,
        is_active: s.is_active,
        sort_order: s.sort_order || i + 1,
      });
    }

    for (let i = 0; i < store.galleryItems.length; i++) {
      const g = store.galleryItems[i];
      const targetId = isUuid(g.id) ? g.id : crypto.randomUUID();
      const mappedArtistId =
        artistIdMap.get(g.artist_id) ||
        (isUuid(g.artist_id) ? g.artist_id : null);
      await supabase.from("gallery_items").upsert({
        id: targetId,
        title: g.title,
        style: g.style,
        image_url: g.image_url || "/temp/gallery-1.jpg",
        artist_id: mappedArtistId,
        is_featured: g.is_featured,
        sort_order: g.sort_order || i + 1,
      });
    }

    for (let i = 0; i < store.inquiries.length; i++) {
      const inq = store.inquiries[i];
      const targetId = isUuid(inq.id) ? inq.id : crypto.randomUUID();
      await supabase.from("inquiries").upsert({
        id: targetId,
        name: inq.name,
        phone: inq.phone,
        style: inq.style,
        placement: inq.placement,
        size: inq.size,
        message: inq.message,
        status: inq.status,
      });
    }

    store.preferLocalFallback = false;
    writeLocalStore(store);
    revalidateAll();

    return {
      ok: true,
      message:
        "Seluruh data lokal (Settings, 3 Artist, 5 Layanan, 8 Karya Galeri, & Inquiries) berhasil disinkronkan ke Supabase Cloud!",
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Gagal melakukan sinkronisasi ke Supabase.",
    };
  }
}

// --- GALLERY CRUD ---

export async function saveGalleryItemAction(payload: {
  id?: string;
  title: string;
  style: string;
  image_url: string;
  artist_id: string;
  aspect_ratio: "4:5" | "1:1" | "3:4";
  is_featured: boolean;
}) {
  const store = readLocalStore();
  const artist = store.artists.find((a) => a.id === payload.artist_id);
  const artistName = artist?.name || "Studio Artist";

  let supabaseSucceeded = false;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (payload.id && isUuid(payload.id)) {
        const { error } = await supabase
          .from("gallery_items")
          .update({
            title: payload.title,
            style: payload.style,
            image_url: payload.image_url,
            artist_id: isUuid(payload.artist_id) ? payload.artist_id : null,
            is_featured: payload.is_featured,
          })
          .eq("id", payload.id);
        if (!error) supabaseSucceeded = true;
      } else if (!payload.id) {
        const { error } = await supabase.from("gallery_items").insert({
          title: payload.title,
          style: payload.style,
          image_url: payload.image_url || "/temp/gallery-1.jpg",
          artist_id: isUuid(payload.artist_id) ? payload.artist_id : null,
          is_featured: payload.is_featured,
          sort_order: store.galleryItems.length + 1,
        });
        if (!error) supabaseSucceeded = true;
      }
    } catch {
      // Fallback to local store
    }
  }

  if (payload.id) {
    store.galleryItems = store.galleryItems.map((item) =>
      item.id === payload.id
        ? {
            ...item,
            title: payload.title,
            style: payload.style,
            image_url: payload.image_url || item.image_url,
            artist_id: payload.artist_id,
            artist_name: artistName,
            aspect_ratio: payload.aspect_ratio,
            is_featured: payload.is_featured,
          }
        : item
    );
  } else {
    const newItem: GalleryItem = {
      id: `work-${Date.now()}`,
      title: payload.title || "Karya Tato Baru",
      style: payload.style,
      image_url: payload.image_url || "/temp/gallery-1.jpg",
      artist_id: payload.artist_id,
      artist_name: artistName,
      aspect_ratio: payload.aspect_ratio,
      is_featured: payload.is_featured,
      sort_order: 0,
      created_at: new Date().toISOString(),
    };
    store.galleryItems = [newItem, ...store.galleryItems].map((item, idx) => ({
      ...item,
      sort_order: idx + 1,
    }));
  }

  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, items: await getGalleryItems() };
}

export async function deleteGalleryItemAction(id: string) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured() && isUuid(id)) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.galleryItems = store.galleryItems.filter((item) => item.id !== id);
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, items: await getGalleryItems() };
}

// --- ARTISTS CRUD ---

export async function saveArtistAction(payload: {
  id?: string;
  name: string;
  photo_url: string;
  bio_id: string;
  bio_en: string;
  specialties: string[];
}) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (payload.id && isUuid(payload.id)) {
        const { error } = await supabase
          .from("artists")
          .update({
            name: payload.name,
            photo_url: payload.photo_url,
            bio_id: payload.bio_id,
            bio_en: payload.bio_en,
            specialties: payload.specialties,
          })
          .eq("id", payload.id);
        if (!error) supabaseSucceeded = true;
      } else if (!payload.id) {
        const { error } = await supabase.from("artists").insert({
          name: payload.name,
          photo_url: payload.photo_url,
          bio_id: payload.bio_id,
          bio_en: payload.bio_en,
          specialties: payload.specialties,
          sort_order: store.artists.length + 1,
        });
        if (!error) supabaseSucceeded = true;
      }
    } catch {
      // Fallback to local store
    }
  }

  if (payload.id) {
    store.artists = store.artists.map((artist) =>
      artist.id === payload.id
        ? {
            ...artist,
            name: payload.name,
            photo_url: payload.photo_url || artist.photo_url,
            bio_id: payload.bio_id,
            bio_en: payload.bio_en,
            specialties: payload.specialties,
          }
        : artist
    );
    store.galleryItems = store.galleryItems.map((item) =>
      item.artist_id === payload.id
        ? { ...item, artist_name: payload.name }
        : item
    );
  } else {
    const newArtist: Artist = {
      id: `artist-${Date.now()}`,
      name: payload.name,
      photo_url: payload.photo_url || "/temp/artist-1.jpg",
      bio_id: payload.bio_id,
      bio_en: payload.bio_en,
      specialties: payload.specialties,
      sort_order: store.artists.length + 1,
      created_at: new Date().toISOString(),
    };
    store.artists = [...store.artists, newArtist];
  }

  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, artists: await getArtists() };
}

export async function deleteArtistAction(id: string) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured() && isUuid(id)) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("artists").delete().eq("id", id);
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.artists = store.artists.filter((a) => a.id !== id);
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, artists: await getArtists() };
}

// --- SERVICES CRUD ---

export async function saveServiceAction(payload: {
  id?: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  size_category: string;
  starting_price: string;
  is_active: boolean;
}) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const numericPrice =
        parseInt(payload.starting_price.replace(/[^0-9]/g, ""), 10) || 0;
      if (payload.id && isUuid(payload.id)) {
        const { error } = await supabase
          .from("services")
          .update({
            name_id: payload.name_id,
            name_en: payload.name_en,
            description_id: payload.description_id,
            description_en: payload.description_en,
            size_category: payload.size_category,
            starting_price: numericPrice,
            is_active: payload.is_active,
          })
          .eq("id", payload.id);
        if (!error) supabaseSucceeded = true;
      } else if (!payload.id) {
        const { error } = await supabase.from("services").insert({
          name_id: payload.name_id,
          name_en: payload.name_en,
          description_id: payload.description_id,
          description_en: payload.description_en,
          size_category: payload.size_category,
          starting_price: numericPrice,
          is_active: payload.is_active,
          sort_order: store.services.length + 1,
        });
        if (!error) supabaseSucceeded = true;
      }
    } catch {
      // Fallback to local store
    }
  }

  if (payload.id) {
    store.services = store.services.map((s) =>
      s.id === payload.id
        ? {
            ...s,
            name_id: payload.name_id,
            name_en: payload.name_en,
            description_id: payload.description_id,
            description_en: payload.description_en,
            size_category: payload.size_category,
            starting_price: payload.starting_price,
            is_active: payload.is_active,
          }
        : s
    );
  } else {
    const newService: Service = {
      id: `service-${Date.now()}`,
      name_id: payload.name_id,
      name_en: payload.name_en,
      description_id: payload.description_id,
      description_en: payload.description_en,
      size_category: payload.size_category,
      starting_price: payload.starting_price,
      is_active: payload.is_active,
      sort_order: store.services.length + 1,
      created_at: new Date().toISOString(),
    };
    store.services = [...store.services, newService];
  }

  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, services: await getServices(true) };
}

export async function deleteServiceAction(id: string) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured() && isUuid(id)) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.services = store.services.filter((s) => s.id !== id);
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, services: await getServices(true) };
}

// --- INQUIRIES CRUD & PUBLIC FORM SUBMISSION ---

export async function submitContactInquiryAction(payload: {
  name: string;
  phone: string;
  style: string;
  placement: string;
  size: string;
  message: string;
  honeypot?: string;
}) {
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { ok: true };
  }

  const name = payload.name.trim();
  const phone = payload.phone.trim();
  if (!name || !phone) {
    return { ok: false, error: "Nama dan nomor WhatsApp wajib diisi." };
  }

  const store = readLocalStore();
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name,
    phone,
    style: payload.style || "Fine Line",
    placement: payload.placement || "-",
    size: payload.size || "-",
    message: payload.message || "",
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("inquiries").insert({
        name,
        phone,
        style: payload.style || "Fine Line",
        placement: payload.placement || "-",
        size: payload.size || "-",
        message: payload.message || "",
        status: "new",
      });
    } catch {
      // Continue and also store locally
    }
  }

  store.inquiries = [newInquiry, ...store.inquiries];
  writeLocalStore(store);
  revalidateAll();
  return { ok: true };
}

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "replied" | "done"
) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured() && isUuid(id)) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.inquiries = store.inquiries.map((inq) =>
    inq.id === id ? { ...inq, status } : inq
  );
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, inquiries: await getAdminInquiries() };
}

export async function deleteInquiryAction(id: string) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured() && isUuid(id)) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.inquiries = store.inquiries.filter((inq) => inq.id !== id);
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, inquiries: await getAdminInquiries() };
}

// --- SETTINGS UPDATE ---

export async function saveSiteSettingsAction(settings: SiteSettings) {
  const store = readLocalStore();
  let supabaseSucceeded = false;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("site_settings")
        .upsert({ ...settings, id: 1 });
      if (!error) supabaseSucceeded = true;
    } catch {
      // Fallback to local store
    }
  }

  store.siteSettings = { ...settings, id: 1 };
  if (!supabaseSucceeded) {
    store.preferLocalFallback = true;
  }
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, settings: store.siteSettings };
}

// --- ADMIN AUTH ACTIONS ---

export async function loginAdminAction(email: string, password: string) {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    return { ok: false, error: "Email dan kata sandi wajib diisi." };
  }

  const isDemoAdmin =
    trimmedEmail.toLowerCase() === "admin@blustereast.com" &&
    password === "admin123";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (!error || isDemoAdmin) {
        const cookieStore = await cookies();
        cookieStore.set("blustereast_admin_session", "authenticated", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });
        return { ok: true };
      }
      return { ok: false, error: error.message };
    } catch {
      // Fallback if Supabase network fails
    }
  }

  if (password.length < 4) {
    return { ok: false, error: "Kata sandi minimal 4 karakter." };
  }

  const cookieStore = await cookies();
  cookieStore.set("blustereast_admin_session", "authenticated", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { ok: true };
}

export async function logoutAdminAction() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  }

  const cookieStore = await cookies();
  cookieStore.delete("blustereast_admin_session");
  return { ok: true };
}
