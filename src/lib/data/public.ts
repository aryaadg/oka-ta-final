import { createClient } from "../supabase/server";
import { mockSiteSettings, mockArtists, mockServices, mockGalleryItems } from "../mock";

export async function getSiteSettings() {
 const supabase = await createClient();
 const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
 return data || mockSiteSettings;
}

export async function getArtists() {
 const supabase = await createClient();
 const { data } = await supabase.from("artists").select("*").order("sort_order", { ascending: true });
 return (data && data.length > 0) ? data : mockArtists;
}

export async function getServices() {
 const supabase = await createClient();
 const { data } = await supabase.from("services").select("*").eq("is_active", true).order("sort_order", { ascending: true });
 return (data && data.length > 0) ? data : mockServices;
}

export async function getGalleryItems(artistId?: string) {
 const supabase = await createClient();
 let query = supabase.from("gallery_items").select(`
 *,
 artist:artists(id, name)
 `).order("sort_order", { ascending: true });

 if (artistId) {
 query = query.eq("artist_id", artistId);
 }

 const { data } = await query;
 if (data && data.length > 0) return data;
 
 return artistId 
   ? mockGalleryItems.filter((item) => item.artist_id === artistId) 
   : mockGalleryItems;
}

export async function getFeaturedGalleryItems() {
 const supabase = await createClient();
 const { data } = await supabase.from("gallery_items").select(`
 *,
 artist:artists(id, name)
 `).eq("is_featured", true).order("sort_order", { ascending: true }).limit(6);
 
 return (data && data.length > 0) ? data : mockGalleryItems.filter(item => item.is_featured).slice(0, 6);
}
