import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function getDashboardStats() {
 const supabase = await createClient();
 const [galleryCount, servicesCount, artistsCount, newInquiries] = await Promise.all([
 supabase.from("gallery_items").select("*", { count: "exact", head: true }),
 supabase.from("services").select("*", { count: "exact", head: true }),
 supabase.from("artists").select("*", { count: "exact", head: true }),
 supabase.from("inquiries").select("*").eq("status", "new").order("created_at", { ascending: false }).limit(5),
 ]);

 return {
 galleryCount: galleryCount.count || 0,
 servicesCount: servicesCount.count || 0,
 artistsCount: artistsCount.count || 0,
 newInquiriesCount: newInquiries.data?.length || 0,
 recentInquiries: newInquiries.data || [],
 };
}

export async function getAdminInquiries() {
 const supabase = await createClient();
 const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
 return data || [];
}

export async function updateInquiryStatus(id: string, status: string) {
 const supabase = await createClient();
 await supabase.from("inquiries").update({ status }).eq("id", id);
 revalidatePath("/admin/inquiries");
 revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
 const supabase = await createClient();
 await supabase.from("inquiries").delete().eq("id", id);
 revalidatePath("/admin/inquiries");
 revalidatePath("/admin");
}

// Re-export public functions that are sufficient for admin list views
export { getSiteSettings, getArtists, getServices, getGalleryItems } from "./public";
