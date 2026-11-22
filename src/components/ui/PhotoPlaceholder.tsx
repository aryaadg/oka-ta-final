import React from "react";
import Image from "next/image";

interface PhotoPlaceholderProps {
  aspectRatio?: "4:5" | "1:1" | "3:4" | "16:9" | "auto";
  label?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
  showDashedBorder?: boolean;
}

export function resolvePhotoSrc(label = "[PHOTO]", customSrc?: string): string {
  if (customSrc && customSrc.trim().length > 0) {
    return customSrc.trim();
  }

  const lbl = label.toLowerCase();
  if (lbl.includes("hero")) return "/temp/hero-1.jpg";
  if (lbl.includes("budi") || lbl.includes("needles")) return "/temp/artist-1.jpg";
  if (lbl.includes("wayan")) return "/temp/artist-2.jpg";
  if (lbl.includes("sari")) return "/temp/artist-3.jpg";
  if (lbl.includes("interior") || lbl.includes("studio")) return "/temp/about-1.jpg";
  if (lbl.includes("sterilization") || lbl.includes("equipment")) return "/temp/gallery-5.jpg";
  if (lbl.includes("flash sheet") || lbl.includes("display wall")) return "/temp/gallery-3.jpg";
  if (
    lbl.includes("botanical") ||
    lbl.includes("fine line") ||
    lbl.includes("fineline") ||
    lbl.includes("floral")
  )
    return "/temp/gallery-1.jpg";
  if (lbl.includes("snake") || lbl.includes("blackwork") || lbl.includes("dragon"))
    return "/temp/gallery-2.jpg";
  if (
    lbl.includes("portrait") ||
    lbl.includes("realism") ||
    lbl.includes("grey") ||
    lbl.includes("sculpture")
  )
    return "/temp/gallery-3.jpg";
  if (lbl.includes("geometric") || lbl.includes("mandala")) return "/temp/gallery-4.jpg";
  if (lbl.includes("ornamental") || lbl.includes("spine")) return "/temp/gallery-5.jpg";
  if (lbl.includes("tiger") || lbl.includes("wildlife")) return "/temp/gallery-6.jpg";
  if (lbl.includes("script") || lbl.includes("lettering") || lbl.includes("minimalist"))
    return "/temp/gallery-7.jpg";
  if (lbl.includes("traditional") || lbl.includes("bali")) return "/temp/gallery-4.jpg";
  if (lbl.includes("mythological")) return "/temp/gallery-2.jpg";

  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = (Math.abs(hash) % 7) + 1;
  return `/temp/gallery-${index}.jpg`;
}

export function PhotoPlaceholder({
  aspectRatio = "4:5",
  label = "[PHOTO]",
  src: customSrc,
  className = "",
  onClick,
  showDashedBorder = true,
}: PhotoPlaceholderProps) {
  const aspectClasses = {
    "4:5": "aspect-[4/5]",
    "1:1": "aspect-square",
    "3:4": "aspect-[3/4]",
    "16:9": "aspect-video",
    auto: "",
  }[aspectRatio];

  const resolvedSrc = resolvePhotoSrc(label, customSrc);
  const isUnoptimized =
    resolvedSrc.startsWith("data:") ||
    resolvedSrc.startsWith("blob:") ||
    resolvedSrc.startsWith("http://") ||
    resolvedSrc.startsWith("https://");

  return (
    <div
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-card/90 flex flex-col items-center justify-center duration-200 select-none ${aspectClasses} ${
        showDashedBorder
          ? "border-2 border-gym-darkBorder hover:border-gym-gold"
          : "border border-gym-darkBorder"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {isUnoptimized ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={label}
          className={`w-full h-full object-cover ${
            onClick ? "hover:scale-105 duration-300" : ""
          }`}
        />
      ) : (
        <Image
          src={resolvedSrc}
          alt={label}
          fill
          className={`object-cover ${onClick ? "hover:scale-105 duration-300" : ""}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
