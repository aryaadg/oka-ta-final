import React from "react";
import Link from "next/link";
import { getTranslation, Locale } from "@/lib/i18n";
import { mockSiteSettings } from "@/lib/mock";
import { MapPin, Clock, Instagram, Phone } from "lucide-react";

interface FooterProps {
 locale?: Locale;
}

export function Footer({ locale = "id" }: FooterProps) {
 return (
 <footer className="w-full bg-card text-gray-400 border-t border-gym-darkBorder py-16">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gym-darkBorder">
 {/* Studio Brand Info */}
 <div className="md:col-span-2 flex flex-col gap-4">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 bg-stencil text-white flex items-center justify-center font-sans font-black text-lg">
 B
 </div>
 <span className="font-sans font-extrabold text-2xl text-gray-400">
 BLUSTEREAST TATTOO
 </span>
 </div>
 <p className="text-sm text-gray-400/70 leading-relaxed max-w-md">
 {getTranslation("footer.aboutText", locale)}
 </p>
 <div className="flex flex-col gap-2 pt-2 text-sm text-gray-400/80">
 <div className="flex items-start gap-2.5">
 <MapPin className="w-4 h-4 text-gym-gold shrink-0 mt-1" />
 <span>{mockSiteSettings.address}</span>
 </div>
 <div className="flex items-center gap-2.5">
 <Clock className="w-4 h-4 text-gym-gold shrink-0" />
 <span>{mockSiteSettings.opening_hours}</span>
 </div>
 </div>
 </div>

 {/* Quick Links */}
 <div className="flex flex-col gap-3">
 <h4 className="font-sans font-bold text-lg text-gym-gold ">
 {getTranslation("footer.quickLinks", locale)}
 </h4>
 <ul className="flex flex-col gap-2 text-sm text-gray-400/80">
 <li>
 <Link href={`/${locale}`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.home", locale)}
 </Link>
 </li>
 <li>
 <Link href={`/${locale}/about`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.about", locale)}
 </Link>
 </li>
 <li>
 <Link href={`/${locale}/artists`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.artists", locale)}
 </Link>
 </li>
 <li>
 <Link href={`/${locale}/services`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.services", locale)}
 </Link>
 </li>
 <li>
 <Link href={`/${locale}/gallery`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.gallery", locale)}
 </Link>
 </li>
 <li>
 <Link href={`/${locale}/contact`} className="hover:text-gym-gold transition-colors">
 {getTranslation("nav.contact", locale)}
 </Link>
 </li>
 </ul>
 </div>

 {/* Socials & Admin */}
 <div className="flex flex-col gap-3">
 <h4 className="font-sans font-bold text-lg text-gym-gold ">
 {getTranslation("footer.socialTitle", locale)}
 </h4>
 <div className="flex flex-col gap-2 text-sm text-gray-400/80">
 <a
 href={`https://instagram.com/${mockSiteSettings.instagram.replace("@", "")}`}
 target="_blank"
 rel="noreferrer"
 className="flex items-center gap-2 hover:text-gym-gold transition-colors"
 >
 <Instagram className="w-4 h-4 text-gym-gold" />
 <span>Instagram: {mockSiteSettings.instagram}</span>
 </a>
 <a
 href={`https://tiktok.com/${mockSiteSettings.tiktok.replace("@", "")}`}
 target="_blank"
 rel="noreferrer"
 className="flex items-center gap-2 hover:text-gym-gold transition-colors"
 >
 <span className="font-mono text-gym-gold font-bold">TT</span>
 <span>TikTok: {mockSiteSettings.tiktok}</span>
 </a>
 <a
 href={`https://wa.me/${mockSiteSettings.whatsapp}`}
 target="_blank"
 rel="noreferrer"
 className="flex items-center gap-2 hover:text-gym-gold transition-colors"
 >
 <Phone className="w-4 h-4 text-gym-gold" />
 <span>WhatsApp: {mockSiteSettings.whatsapp}</span>
 </a>
 </div>
 <div className="pt-4 border-t border-gym-darkBorder">
 <Link
 href="/admin/login"
 className="text-xs text-gray-500 hover:text-gray-400 transition-colors font-mono"
 >
 🔒 {getTranslation("nav.admin", locale)} (Internal Only)
 </Link>
 </div>
 </div>
 </div>

 <div className="pt-8 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
 <span>{getTranslation("footer.copyright", locale)}</span>
 <span className="font-mono">Akasia XVI, Denpasar Timur • Strictly 18+</span>
 </div>
 </div>
 </footer>
 );
}
