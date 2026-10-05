/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { GalleryItem, mockSiteSettings } from "@/lib/mock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";
import { MessageSquare, User, Palette } from "lucide-react";

interface LightboxModalProps {
 item: any | null;
 onClose: () => void;
 locale?: string;
}

export function LightboxModal({
 item,
 onClose,
 locale = "id",
}: LightboxModalProps) {
 const t = useTranslations("gallery");
 if (!item) return null;

 const waConsultUrl = `https://wa.me/${mockSiteSettings.whatsapp.replace(
 /[^0-9]/g,
 ""
 )}?text=${encodeURIComponent(
 `Halo Blustereast Tattoo, saya tertarik konsultasi desain tato serupa dengan karya: ${item.title} (Style: ${item.style}).`
 )}`;

 return (
 <Dialog isOpen={!!item} onClose={onClose} title={item.title}>
 <div className="flex flex-col gap-6">
 {/* Placeholder Photo Block */}
 <PhotoPlaceholder
 aspectRatio="4:5"
 label={`[PHOTO] ${item.title}`}
 showDashedBorder={true}
 />

 {/* Details Metadata */}
 <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card/5 dark:bg-background/5 border border-gym-darkBorder">
 <div className="flex items-center gap-2">
 <Palette className="w-4 h-4 text-gym-gold" />
 <span className="text-sm text-graphite dark:text-muted-foreground/70 font-medium">
 {t("styleLabel")}:
 </span>
 <Badge variant="stencil">{item.style}</Badge>
 </div>

 <div className="flex items-center gap-2">
 <User className="w-4 h-4 text-gym-gold" />
 <span className="text-sm text-graphite dark:text-muted-foreground/70 font-medium">
 {t("artistLabel")}:
 </span>
 <span className="text-sm font-semibold text-foreground dark:text-muted-foreground">
 {item.artist?.name || "[ARTIST_NAME]"}
 </span>
 </div>
 </div>

 {/* WhatsApp Consultation Action */}
 <a href={waConsultUrl} target="_blank" rel="noreferrer" className="w-full">
 <Button variant="stencil" className="w-full gap-2 py-3">
 <MessageSquare className="w-5 h-5" />
 <span>{t("lightboxConsult")}</span>
 </Button>
 </a>
 </div>
 </Dialog>
 );
}
