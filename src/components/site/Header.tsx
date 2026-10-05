"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { getTranslation, Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
 locale?: Locale;
}

export function Header({ locale = "id" }: HeaderProps) {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const pathname = usePathname();
 const router = useRouter();

 const toggleLocale = () => {
 const targetLocale = locale === "id" ? "en" : "id";
 // Replace current locale prefix if present, else append
 let newPath = pathname;
 if (pathname.startsWith("/id")) {
 newPath = pathname.replace(/^\/id/, `/${targetLocale}`);
 } else if (pathname.startsWith("/en")) {
 newPath = pathname.replace(/^\/en/, `/${targetLocale}`);
 } else {
 newPath = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
 }
 router.push(newPath);
 };

 const navItems = [
 { label: getTranslation("nav.home", locale), href: `/${locale}` },
 { label: getTranslation("nav.about", locale), href: `/${locale}/about` },
 { label: getTranslation("nav.artists", locale), href: `/${locale}/artists` },
 { label: getTranslation("nav.services", locale), href: `/${locale}/services` },
 { label: getTranslation("nav.gallery", locale), href: `/${locale}/gallery` },
 { label: getTranslation("nav.contact", locale), href: `/${locale}/contact` },
 ];

 const isActive = (href: string) => {
 if (href === `/${locale}`) {
 return pathname === `/${locale}` || pathname === "/";
 }
 return pathname.startsWith(href);
 };

 return (
 <header className="sticky top-0 z-40 w-full bg-card/95 text-muted-foreground border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
 {/* Brand Logo */}
 <Link
 href={`/${locale}`}
 className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-gym-gold"
 >
 <div className="w-9 h-9 bg-stencil text-white flex items-center justify-center font-sans font-black text-xl ">
 B
 </div>
 <div className="flex flex-col">
 <span className="font-sans font-extrabold text-xl text-muted-foreground group-hover:text-gym-gold transition-colors ">
 BLUSTEREAST
 </span>
 <span className="text-[10px] text-graphite font-mono">
 TATTOO STUDIO • BALI
 </span>
 </div>
 </Link>

 {/* Desktop Navigation */}
 <nav className="hidden lg:flex items-center gap-8">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={`text-sm font-medium transition-colors hover:text-gym-gold relative py-1 ${
 isActive(item.href)
 ? "text-gym-gold font-semibold border-b-2 border-gym-gold"
 : "text-gray-300"
 }`}
 >
 {item.label}
 </Link>
 ))}
 </nav>

 {/* Actions (Language Switcher & WA CTA) */}
 <div className="hidden sm:flex items-center gap-4">
 <button
 onClick={toggleLocale}
 className="flex items-center gap-1.5 px-3 py-1.5 border border-gym-gold/40 rounded-[2px] text-xs font-semibold text-muted-foreground hover:bg-stencil/20 transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold min-h-[44px]"
 title="Switch Language"
 >
 <Globe className="w-4 h-4 text-gym-gold" />
 <span>{locale === "id" ? "ID | EN" : "EN | ID"}</span>
 </button>

 
 </div>

 {/* Mobile Controls */}
 <div className="flex sm:hidden items-center gap-2">
 <button
 onClick={toggleLocale}
 className="p-2 border border-gym-gold/40 rounded-[2px] text-xs font-semibold text-muted-foreground hover:bg-stencil/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
 title="Switch Language"
 >
 {locale.toUpperCase()}
 </button>

 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-2.5 text-muted-foreground hover:text-gym-gold focus:outline-none focus:ring-2 focus:ring-gym-gold min-h-[44px] min-w-[44px] flex items-center justify-center border border-gym-darkBorder rounded-[2px]"
 aria-label="Toggle menu"
 >
 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>
 </div>

 {/* Mobile Drawer Menu */}
 {mobileMenuOpen && (
 <div className="lg:hidden bg-card border-b border-gym-darkBorder px-4 pt-2 pb-6 flex flex-col gap-3 slide-in-from-top-2 duration-200">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 onClick={() => setMobileMenuOpen(false)}
 className={`px-3 py-3 rounded-[2px] text-base font-semibold transition-colors min-h-[44px] flex items-center ${
 isActive(item.href)
 ? "bg-stencil text-white"
 : "text-muted-foreground/90 hover:bg-graphite/30"
 }`}
 >
 {item.label}
 </Link>
 ))}
   </div>
  )}
 </header>
 );
}
