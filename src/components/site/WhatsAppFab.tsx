"use client";

import React, { useState } from "react";
import { MessageSquare, Instagram, X } from "lucide-react";
import { mockSiteSettings, SiteSettings } from "@/lib/mock";

interface WhatsAppFabProps {
  settings?: SiteSettings;
}

export function WhatsAppFab({ settings = mockSiteSettings }: WhatsAppFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const waClean = settings.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waClean}?text=${encodeURIComponent(
    "Halo Blustereast Tattoo Studio, saya ingin konsultasi desain tato."
  )}`;
  const igUrl =
    settings.instagram.startsWith("http://") ||
    settings.instagram.startsWith("https://")
      ? settings.instagram
      : `https://instagram.com/${settings.instagram.replace(/^@/, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col items-end gap-3">
          {/* Instagram */}
          <a
            href={igUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center bg-gym-darkCard border-2 border-gym-gold text-gym-gold rounded-[2px] w-12 h-12 hover:bg-gym-gold hover:text-gym-dark transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center bg-[#25D366] text-white rounded-[2px] w-12 h-12 hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="w-5 h-5 fill-white text-transparent" />
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Contact Menu"
        className="flex items-center justify-center bg-gym-gold text-gym-dark rounded-[2px] w-14 h-14 hover:bg-[#d9ae15] transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-current" />
        )}
      </button>
    </div>
  );
}
