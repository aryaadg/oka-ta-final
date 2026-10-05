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

 // Match label to placeholder images in public/temp
 let src = "/temp/gallery-1.jpg";
 if (label.toLowerCase().includes("hero")) src = "/temp/hero-1.jpg";
 else if (label.toLowerCase().includes("budi")) src = "/temp/artist-1.jpg";
 else if (label.toLowerCase().includes("sari")) src = "/temp/artist-2.jpg";
 else if (label.toLowerCase().includes("wayan")) src = "/temp/artist-3.jpg";
 else if (label.toLowerCase().includes("interior")) src = "/temp/about-1.jpg";
 else if (label.toLowerCase().includes("process")) src = "/temp/about-2.jpg";
 else if (label.toLowerCase().includes("exterior")) src = "/temp/about-3.jpg";
 // Hash string to pick a random gallery image 1-12 based on the label text
 else {
   let hash = 0;
   for (let i = 0; i < label.length; i++) {
     hash = label.charCodeAt(i) + ((hash << 5) - hash);
   }
   const index = (Math.abs(hash) % 12) + 1;
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
