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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (payload.id) {
        const { error } = await supabase
          .from("gallery_items")
          .update({
            title: payload.title,
            style: payload.style,
            image_url: payload.image_url,
            artist_id: payload.artist_id || null,
            is_featured: payload.is_featured,
          })
          .eq("id", payload.id);
        if (!error) {
          revalidateAll();
          return { ok: true, items: await getGalleryItems() };
        }
      } else {
        const { error } = await supabase.from("gallery_items").insert({
          title: payload.title,
          style: payload.style,
          image_url: payload.image_url || "/temp/gallery-1.jpg",
          artist_id: payload.artist_id || null,
          is_featured: payload.is_featured,
          sort_order: store.galleryItems.length + 1,
        });
        if (!error) {
          revalidateAll();
          return { ok: true, items: await getGalleryItems() };
        }
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
      image_url: payload.image_url || "",
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

  writeLocalStore(store);
  revalidateAll();
  return { ok: true, items: await getGalleryItems() };
}

export async function deleteGalleryItemAction(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (!error) {
        revalidateAll();
        return { ok: true, items: await getGalleryItems() };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.galleryItems = store.galleryItems.filter((item) => item.id !== id);
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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (payload.id) {
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
        if (!error) {
          revalidateAll();
          return { ok: true, artists: await getArtists() };
        }
      } else {
        const { error } = await supabase.from("artists").insert({
          name: payload.name,
          photo_url: payload.photo_url,
          bio_id: payload.bio_id,
          bio_en: payload.bio_en,
          specialties: payload.specialties,
          sort_order: store.artists.length + 1,
        });
        if (!error) {
          revalidateAll();
          return { ok: true, artists: await getArtists() };
        }
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
      item.artist_id === payload.id ? { ...item, artist_name: payload.name } : item
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

  writeLocalStore(store);
  revalidateAll();
  return { ok: true, artists: await getArtists() };
}

export async function deleteArtistAction(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("artists").delete().eq("id", id);
      if (!error) {
        revalidateAll();
        return { ok: true, artists: await getArtists() };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.artists = store.artists.filter((a) => a.id !== id);
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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const numericPrice =
        parseInt(payload.starting_price.replace(/[^0-9]/g, ""), 10) || 0;
      if (payload.id) {
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
        if (!error) {
          revalidateAll();
          return { ok: true, services: await getServices(true) };
        }
      } else {
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
        if (!error) {
          revalidateAll();
          return { ok: true, services: await getServices(true) };
        }
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

  writeLocalStore(store);
  revalidateAll();
  return { ok: true, services: await getServices(true) };
}

export async function deleteServiceAction(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) {
        revalidateAll();
        return { ok: true, services: await getServices(true) };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.services = store.services.filter((s) => s.id !== id);
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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("inquiries").insert({
        name,
        phone,
        style: payload.style || "Fine Line",
        placement: payload.placement || "-",
        size: payload.size || "-",
        message: payload.message || "",
        status: "new",
      });
      if (!error) {
        revalidateAll();
        return { ok: true };
      }
    } catch {
      // Fallback to local store
    }
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
  store.inquiries = [newInquiry, ...store.inquiries];
  writeLocalStore(store);
  revalidateAll();
  return { ok: true };
}

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "replied" | "done"
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);
      if (!error) {
        revalidateAll();
        return { ok: true, inquiries: await getAdminInquiries() };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.inquiries = store.inquiries.map((inq) =>
    inq.id === id ? { ...inq, status } : inq
  );
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, inquiries: await getAdminInquiries() };
}

export async function deleteInquiryAction(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (!error) {
        revalidateAll();
        return { ok: true, inquiries: await getAdminInquiries() };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.inquiries = store.inquiries.filter((inq) => inq.id !== id);
  writeLocalStore(store);
  revalidateAll();
  return { ok: true, inquiries: await getAdminInquiries() };
}

// --- SETTINGS UPDATE ---

export async function saveSiteSettingsAction(settings: SiteSettings) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("site_settings")
        .upsert({ ...settings, id: 1 });
      if (!error) {
        revalidateAll();
        return { ok: true, settings: await getSiteSettings() };
      }
    } catch {
      // Fallback to local store
    }
  }

  const store = readLocalStore();
  store.siteSettings = { ...settings, id: 1 };
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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (error) {
        return { ok: false, error: error.message };
      }
      const cookieStore = await cookies();
      cookieStore.set("blustereast_admin_session", "authenticated", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return { ok: true };
    } catch {
      // Fallback if Supabase network fails
    }
  }

  // Local / Demo authentication fallback when Supabase is not configured
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
