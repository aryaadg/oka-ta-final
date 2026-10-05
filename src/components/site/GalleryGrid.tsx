/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useMemo } from "react";
import { GalleryItem, Artist } from "@/lib/mock";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { LightboxModal } from "@/components/site/LightboxModal";
import { useTranslations } from "next-intl";
import { Filter, User } from "lucide-react";

interface GalleryGridProps {
 items: any[];
 artists: any[];
 initialArtistFilter?: string;
 locale?: string;
}

export function GalleryGrid({
 items,
 artists,
 initialArtistFilter = "",
 locale = "id",
}: GalleryGridProps) {
 const t = useTranslations("gallery");
 const [selectedStyle, setSelectedStyle] = useState<string>("All");
 const [selectedArtist, setSelectedArtist] = useState<string>(initialArtistFilter);
 const [activeItem, setActiveItem] = useState<any | null>(null);

 // Extract unique styles
 const styles = useMemo(() => {
 const set = new Set<string>();
 items.forEach((item) => set.add(item.style));
 return ["All", ...Array.from(set)];
 }, [items]);

 // Filter items
 const filteredItems = useMemo(() => {
 return items.filter((item) => {
 const matchStyle = selectedStyle === "All" || item.style === selectedStyle;
 const matchArtist =
 !selectedArtist || selectedArtist === "All" || item.artist_id === selectedArtist;
 return matchStyle && matchArtist;
 });
 }, [items, selectedStyle, selectedArtist]);

 return (
 <div className="flex flex-col gap-8 w-full">
 {/* Filter Toolbar */}
 <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-card/5 dark:bg-background/5 border border-gym-darkBorder rounded-[2px]">
 {/* Style Filter Tabs */}
 <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
 <Filter className="w-4 h-4 text-gym-gold shrink-0 hidden sm:block" />
 {styles.map((style) => (
 <button
 key={style}
 onClick={() => setSelectedStyle(style)}
 className={`px-3 py-1.5 text-xs font-semibold rounded-[2px] transition-colors whitespace-nowrap min-h-[36px] ${
 selectedStyle === style
 ? "bg-stencil text-white border border-gym-gold"
 : "bg-background dark:bg-card text-foreground dark:text-muted-foreground hover:border-gym-gold/50 border border-gym-darkBorder"
 }`}
 >
 {style === "All"
 ? t("filterAllStyle")
 : style}
 </button>
 ))}
 </div>

 {/* Artist Filter Dropdown */}
 <div className="flex items-center gap-2 shrink-0">
 <User className="w-4 h-4 text-gym-gold shrink-0" />
 <select
 value={selectedArtist}
 onChange={(e) => setSelectedArtist(e.target.value)}
 className="px-3 py-1.5 text-xs font-semibold bg-gym-darkCard dark:bg-card border border-gym-darkBorder rounded-[2px] text-foreground dark:text-muted-foreground focus:ring-2 focus:ring-gym-gold focus:outline-none min-h-[36px]"
 >
 <option value="All">
 {t("filterAllArtist")}
 </option>
 {artists.map((artist) => (
 <option key={artist.id} value={artist.id}>
 {artist.name}
 </option>
 ))}
 </select>
 </div>
 </div>

 {/* Flash Sheet Grid */}
 {filteredItems.length === 0 ? (
 <div className="py-16 text-graphite dark:text-muted-foreground/60 border-2 border-gym-darkBorder p-8">
 <p className="text-lg font-medium">Tidak ada karya yang sesuai dengan filter.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredItems.map((item) => (
 <div
 key={item.id}
 className="flex flex-col group cursor-pointer border border-gym-darkBorder bg-background dark:bg-card p-3 hover:border-gym-gold duration-200"
 onClick={() => setActiveItem(item)}
 >
 {/* Photo Block */}
 <PhotoPlaceholder
 aspectRatio="4:5"
 label={`[PHOTO] ${item.title}`}
 showDashedBorder={true}
 />

 {/* Caption Strip */}
 <div className="flex flex-col gap-1 pt-3 pb-1">
 <h4 className="font-sans font-bold text-lg text-foreground dark:text-muted-foreground group-hover:text-gym-gold transition-colors">
 {item.title}
 </h4>
 <div className="flex items-center justify-between text-xs text-graphite dark:text-muted-foreground/70 font-mono">
 <span className="text-gym-gold font-semibold">{item.style}</span>
 <span>{item.artist?.name || "[ARTIST_NAME]"}</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}

 {/* Lightbox Dialog */}
 <LightboxModal
 item={activeItem}
 onClose={() => setActiveItem(null)}
 locale={locale}
 />
 </div>
 );
}
