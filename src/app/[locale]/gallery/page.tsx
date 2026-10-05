export const instant = false;
import React from "react";
import { getTranslations } from "next-intl/server";
import { getGalleryItems, getArtists } from "@/lib/data/public";
import { GalleryGrid } from "@/components/site/GalleryGrid";

interface GalleryPageProps {
 params: Promise<{ locale: string }>;
 searchParams: Promise<{ artist?: string }>;
}

export default async function GalleryPage({
 params,
 searchParams,
}: GalleryPageProps) {
 const resolvedParams = await params;
 const resolvedSearchParams = await searchParams;

 const locale = resolvedParams.locale;
 const artistFilter = resolvedSearchParams.artist || "";
 const t = await getTranslations("gallery");

 const items = await getGalleryItems();
 const artists = await getArtists();

 return (
 <div className="flex flex-col w-full">
 {/* Header Banner */}
 <section className="w-full bg-card text-muted-foreground py-16 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col items-start gap-4">
 <span className="text-xs font-mono font-bold text-gym-gold ">
 FLASH SHEET & PORTFOLIO
 </span>
 <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-foreground ">
 {t("title")}
 </h1>
 <p className="text-lg text-gray-300 max-w-2xl">
 {t("subtitle")}
 </p>
 </div>
 </div>
 </section>

 {/* Main Gallery Grid Section */}
 <section className="w-full bg-background text-foreground py-16">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <GalleryGrid
 items={items}
 artists={artists}
 initialArtistFilter={artistFilter}
 locale={locale}
 />
 </div>
 </section>
 </div>
 );
}
