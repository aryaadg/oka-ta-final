import React from "react";
import Image from "next/image";

interface PhotoPlaceholderProps {
 aspectRatio?: "4:5" | "1:1" | "3:4" | "16:9" | "auto";
 label?: string;
 className?: string;
 onClick?: () => void;
 showDashedBorder?: boolean;
}

export function PhotoPlaceholder({
 aspectRatio = "4:5",
 label = "[PHOTO]",
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

 // Match label to AI-generated photos in public/temp
 let src = "/temp/gallery-1.jpg";
 const lbl = label.toLowerCase();
 if (lbl.includes("hero")) src = "/temp/hero-1.jpg";
 else if (lbl.includes("budi") || lbl.includes("needles")) src = "/temp/artist-1.jpg";
 else if (lbl.includes("wayan")) src = "/temp/artist-2.jpg";
 else if (lbl.includes("sari")) src = "/temp/artist-3.jpg";
 else if (lbl.includes("interior") || lbl.includes("studio")) src = "/temp/about-1.jpg";
 else if (lbl.includes("botanical") || lbl.includes("fine line") || lbl.includes("fineline") || lbl.includes("floral")) src = "/temp/gallery-1.jpg";
 else if (lbl.includes("snake") || lbl.includes("blackwork") || lbl.includes("dragon")) src = "/temp/gallery-2.jpg";
 else if (lbl.includes("portrait") || lbl.includes("realism") || lbl.includes("grey") || lbl.includes("sculpture")) src = "/temp/gallery-3.jpg";
 else if (lbl.includes("geometric") || lbl.includes("mandala")) src = "/temp/gallery-4.jpg";
 else if (lbl.includes("ornamental") || lbl.includes("spine")) src = "/temp/gallery-5.jpg";
 else if (lbl.includes("tiger") || lbl.includes("wildlife")) src = "/temp/gallery-6.jpg";
 else if (lbl.includes("script") || lbl.includes("lettering") || lbl.includes("minimalist")) src = "/temp/gallery-7.jpg";
 else if (lbl.includes("traditional") || lbl.includes("bali")) src = "/temp/gallery-4.jpg";
 else if (lbl.includes("mythological")) src = "/temp/gallery-2.jpg";
 else {
   // Hash-based fallback for unknown labels
   let hash = 0;
   for (let i = 0; i < label.length; i++) {
     hash = label.charCodeAt(i) + ((hash << 5) - hash);
   }
   const index = (Math.abs(hash) % 7) + 1;
   src = `/temp/gallery-${index}.jpg`;
 }

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
 <Image 
   src={src} 
   alt={label} 
   fill 
   className={`object-cover ${onClick ? "hover:scale-105 duration-300" : ""}`}
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
 </div>
 );
}
