"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { getTranslation, Locale } from "@/lib/i18n";

interface AgeNoticeProps {
  locale?: Locale;
}

export function AgeNotice({ locale = "id" }: AgeNoticeProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem(
      "blustereast_age_notice_dismissed"
    );
    if (!isDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("blustereast_age_notice_dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <aside
      aria-label="Age restriction notice"
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t-2 border-gym-gold text-foreground p-4"
    >
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:text-left">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-gym-gold shrink-0" />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base text-gym-gold">
              {getTranslation("ageNotice.title", locale)}
            </span>
            <p className="text-xs text-gray-300 leading-tight">
              {getTranslation("ageNotice.message", locale)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="px-4 py-2 bg-gym-gold text-gym-dark font-bold text-xs rounded-[2px] hover:bg-[#d9ae15] transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold shrink-0 min-h-[44px]"
        >
          {getTranslation("ageNotice.dismiss", locale)}
        </button>
      </div>
    </aside>
  );
}
