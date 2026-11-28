import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { isSupabaseConfigured, readLocalStore } from "./store";
import { SiteSettings, Artist, Service, GalleryItem } from "../mock";

export type EnrichedGalleryItem = GalleryItem & {
  artist?: { id: string; name: string } | null;
};

async function markDynamic() {
  try {
    await cookies();
  } catch {
    // Ignore outside request context
  }
}

function enrichGalleryItems(
  items: GalleryItem[],
  artists: Artist[]
): EnrichedGalleryItem[] {
  const artistMap = new Map(artists.map((a) => [a.id, a]));
  return items.map((item) => {
    const found = artistMap.get(item.artist_id);
    const artistName = found?.name || item.artist_name || "Studio Artist";
    return {
      ...item,
      artist_name: artistName,
      aspect_ratio: item.aspect_ratio || "4:5",
      artist: {
        id: item.artist_id,
        name: artistName,
      },
    };
  });
}

function isPlaceholderSettings(data: Partial<SiteSettings> | null): boolean {
  if (!data) return true;
  return (
    data.whatsapp === "[WHATSAPP_NUMBER]" ||
    (typeof data.address === "string" &&
      data.address.includes("[STUDIO_ADDRESS]"))
  );
}

function isPlaceholderArtists(data: Artist[] | null): boolean {
  if (!data || data.length === 0) return true;
  return data.length === 1 && data[0].name === "[ARTIST_NAME]";
}

function isPlaceholderServices(data: unknown[] | null): boolean {
  if (!data || data.length === 0) return true;
  const first = data[0] as { name_id?: string; description_id?: string };
  return (
    data.length === 1 &&
    first.name_id === "Tato Custom" &&
    first.description_id === "Desain khusus"
  );
}

function isPlaceholderGallery(data: GalleryItem[] | null): boolean {
  if (!data || data.length === 0) return true;
  return data.length === 1 && data[0].title === "Placeholder Work";
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await markDynamic();
  const store = readLocalStore();
  if (isSupabaseConfigured() && !store.preferLocalFallback) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (data && !isPlaceholderSettings(data)) {
        return data as SiteSettings;
      }
    } catch {
      // Fallback to local store
    }
  }
  return store.siteSettings;
}

export async function getArtists(): Promise<Artist[]> {
  await markDynamic();
  const store = readLocalStore();
  if (isSupabaseConfigured() && !store.preferLocalFallback) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("artists")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data && !isPlaceholderArtists(data as Artist[])) {
        return data as Artist[];
      }
    } catch {
      // Fallback to local store
    }
  }
  return [...store.artists].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getServices(includeInactive = false): Promise<Service[]> {
  await markDynamic();
  const store = readLocalStore();
  if (isSupabaseConfigured() && !store.preferLocalFallback) {
    try {
      const supabase = await createClient();
      let query = supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!includeInactive) {
        query = query.eq("is_active", true);
      }
      const { data } = await query;
      if (data && !isPlaceholderServices(data)) {
        return data.map((s) => ({
          ...s,
          starting_price:
            typeof s.starting_price === "number"
              ? s.starting_price.toLocaleString("id-ID")
              : String(s.starting_price || ""),
        })) as Service[];
      }
    } catch {
      // Fallback to local store
    }
  }
  const all = [...store.services].sort((a, b) => a.sort_order - b.sort_order);
  return includeInactive ? all : all.filter((s) => s.is_active);
}

export async function getGalleryItems(
  artistId?: string
): Promise<EnrichedGalleryItem[]> {
  await markDynamic();
  const store = readLocalStore();
  if (isSupabaseConfigured() && !store.preferLocalFallback) {
    try {
      const supabase = await createClient();
      let query = supabase
        .from("gallery_items")
        .select(
          `
          *,
          artist:artists(id, name)
        `
        )
        .order("sort_order", { ascending: true });

      if (artistId) {
        query = query.eq("artist_id", artistId);
      }

      const { data } = await query;
      if (data && !isPlaceholderGallery(data as GalleryItem[])) {
        return data.map((item) => ({
          ...item,
          aspect_ratio: item.aspect_ratio || "4:5",
          artist_name: item.artist?.name || item.artist_name || "Studio Artist",
        })) as EnrichedGalleryItem[];
      }
    } catch {
      // Fallback to local store
    }
  }

  const sorted = [...store.galleryItems].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const filtered = artistId
    ? sorted.filter((item) => item.artist_id === artistId)
    : sorted;
  return enrichGalleryItems(filtered, store.artists);
}

export async function getFeaturedGalleryItems(): Promise<EnrichedGalleryItem[]> {
  const all = await getGalleryItems();
  return all.filter((item) => item.is_featured).slice(0, 6);
}
