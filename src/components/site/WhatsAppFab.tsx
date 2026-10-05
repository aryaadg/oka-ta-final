"use client";

import React, { useState } from "react";
import { MessageSquare, Instagram, X } from "lucide-react";
import { mockSiteSettings } from "@/lib/mock";

export function WhatsAppFab() {
 const [isOpen, setIsOpen] = useState(false);
 const waUrl = `https://wa.me/${mockSiteSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Halo Blustereast Tattoo Studio, saya ingin konsultasi desain tato.")}`;
 const igUrl = mockSiteSettings.instagram;

 return (
 <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  {/* Menu Items */}
  {isOpen && (
  <div className="flex flex-col items-end gap-3 animate-fade-in">
   {/* Instagram */}
   <a
   href={igUrl}
   target="_blank"
   rel="noreferrer"
   aria-label="Instagram"
   className="flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full w-12 h-12 shadow-lg hover:scale-105 active:scale-95 duration-200"
   >
   <Instagram className="w-6 h-6" />
   </a>

   {/* WhatsApp */}
   <a
   href={waUrl}
   target="_blank"
   rel="noreferrer"
   aria-label="Chat on WhatsApp"
   className="flex items-center justify-center bg-[#25D366] text-white rounded-full w-12 h-12 shadow-lg hover:scale-105 active:scale-95 duration-200"
   >
   <MessageSquare className="w-6 h-6 fill-white text-transparent" />
   </a>
  </div>
  )}

  {/* Main Toggle Button */}
  <button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle Contact Menu"
  className="flex items-center justify-center bg-gym-gold text-gym-dark rounded-full w-14 h-14 shadow-lg hover:scale-105 active:scale-95 duration-200 focus:outline-none focus:ring-4 focus:ring-gym-gold/50"
  >
  {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-current" />}
  </button>
 </div>
 );
}
