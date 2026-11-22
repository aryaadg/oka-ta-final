/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { LightboxModal } from "@/components/site/LightboxModal";
import { useTranslations } from "next-intl";
import { Filter, User } from "lucide-react";

interface GalleryGridProps {
  items: any[];
  artists: any[];
  initialArtistFilter?: string;
  locale?: string;
  whatsapp?: string;
}

export function GalleryGrid({
  items,
  artists,
  initialArtistFilter = "",
  locale = "id",
  whatsapp,
}: GalleryGridProps) {
  const t = useTranslations("gallery");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [selectedArtist, setSelectedArtist] =
    useState<string>(initialArtistFilter);
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
      const matchStyle =
        selectedStyle === "All" || item.style === selectedStyle;
      const matchArtist =
        !selectedArtist ||
        selectedArtist === "All" ||
        item.artist_id === selectedArtist;
      return matchStyle && matchArtist;
    });
  }, [items, selectedStyle, selectedArtist]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-gym-darkCard border border-gym-darkBorder rounded-[2px]">
        {/* Style Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="w-4 h-4 text-gym-gold shrink-0 hidden sm:block" />
          {styles.map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-[2px] transition-colors whitespace-nowrap min-h-[36px] ${
                selectedStyle === style
                  ? "bg-gym-gold text-gym-dark font-bold border border-gym-gold"
                  : "bg-background text-foreground hover:border-gym-gold/50 border border-gym-darkBorder"
              }`}
            >
              {style === "All" ? t("filterAllStyle") : style}
            </button>
          ))}
        </div>

        {/* Artist Filter Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <User className="w-4 h-4 text-gym-gold shrink-0" />
          <select
            aria-label={t("filterAllArtist")}
            value={selectedArtist || "All"}
            onChange={(e) =>
              setSelectedArtist(e.target.value === "All" ? "" : e.target.value)
            }
            className="px-3 py-1.5 text-xs font-semibold bg-background border border-gym-darkBorder rounded-[2px] text-foreground focus:ring-2 focus:ring-gym-gold focus:outline-none min-h-[36px]"
          >
            <option value="All">{t("filterAllArtist")}</option>
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
        <div className="py-16 text-graphite border border-gym-darkBorder bg-gym-darkCard p-8">
          <p className="text-lg font-medium">
            {locale === "en"
              ? "No tattoo works match the selected filter."
              : "Tidak ada karya yang sesuai dengan filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col group cursor-pointer border border-gym-darkBorder bg-gym-darkCard p-3 hover:border-gym-gold duration-200"
              onClick={() => setActiveItem(item)}
            >
              {/* Photo Block */}
              <PhotoPlaceholder
                aspectRatio="4:5"
                label={`[PHOTO] ${item.title}`}
                src={item.image_url}
                showDashedBorder={true}
              />

              {/* Caption Strip */}
              <div className="flex flex-col gap-1 pt-3 pb-1">
                <h4 className="font-sans font-bold text-lg text-foreground group-hover:text-gym-gold transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-graphite font-mono">
                  <span className="text-gym-gold font-semibold">
                    {item.style}
                  </span>
                  <span>
                    {item.artist?.name || item.artist_name || "Studio Artist"}
                  </span>
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
        whatsapp={whatsapp}
      />
    </div>
  );
}
