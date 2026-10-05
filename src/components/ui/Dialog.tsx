"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface DialogProps {
 isOpen: boolean;
 onClose: () => void;
 title?: string;
 children: React.ReactNode;
 className?: string;
}

export function Dialog({
 isOpen,
 onClose,
 title,
 children,
 className = "",
}: DialogProps) {
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (e.key === "Escape") onClose();
 };

 if (isOpen) {
 document.body.style.overflow = "hidden";
 window.addEventListener("keydown", handleKeyDown);
 }

 return () => {
 document.body.style.overflow = "unset";
 window.removeEventListener("keydown", handleKeyDown);
 };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-card/80 fade-in duration-200"
 onClick={onClose}
 >
 <div
 className={`relative w-full max-w-2xl bg-background dark:bg-card text-foreground dark:text-muted-foreground border-2 border-gym-gold p-6 overflow-y-auto max-h-[90vh] ${className}`}
 onClick={(e) => e.stopPropagation()}
 >
 <div className="flex items-center justify-between pb-4 mb-4 border-b border-gym-darkBorder">
 {title && (
 <h3 className="font-sans font-bold text-2xl text-foreground dark:text-muted-foreground">
 {title}
 </h3>
 )}
 <button
 onClick={onClose}
 className="p-2 -mr-2 text-graphite dark:text-muted-foreground hover:text-gym-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold"
 aria-label="Close dialog"
 >
 <X className="w-6 h-6" />
 </button>
 </div>
 {children}
 </div>
 </div>
 );
}
