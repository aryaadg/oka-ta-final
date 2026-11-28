import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { isSupabaseConfigured, readLocalStore } from "./store";
import {
  getSiteSettings,
  getArtists,
  getServices,
  getGalleryItems,
} from "./public";
import { Inquiry } from "../mock";

export async function getAdminInquiries(): Promise<Inquiry[]> {
  try {
    await cookies();
  } catch {
    // Ignore outside request context
  }
  const store = readLocalStore();
  if (isSupabaseConfigured() && !store.preferLocalFallback) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) return data as Inquiry[];
    } catch {
      // Fallback to local store
    }
  }

  return [...store.inquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getDashboardStats() {
  const [galleryItems, services, artists, inquiries] = await Promise.all([
    getGalleryItems(),
    getServices(true),
    getArtists(),
    getAdminInquiries(),
  ]);

  const newInquiries = inquiries.filter((i) => i.status === "new");

  return {
    galleryCount: galleryItems.length,
    servicesCount: services.length,
    artistsCount: artists.length,
    newInquiriesCount: newInquiries.length,
    recentInquiries: inquiries.slice(0, 5),
  };
}

export { getSiteSettings, getArtists, getServices, getGalleryItems };
