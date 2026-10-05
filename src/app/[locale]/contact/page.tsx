export const instant = false;

import React from "react";
import { getTranslation, Locale } from "@/lib/i18n";
import { mockSiteSettings } from "@/lib/mock";
import { getSiteSettings } from "@/lib/data/public";
import { ContactForm } from "./ContactForm";
import { MapPin, Clock, Instagram, Phone } from "lucide-react";

interface ContactPageProps {
 params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
 const resolvedParams = await params;
 const locale: Locale = resolvedParams.locale === "en" ? "en" : "id";

 const settings = await getSiteSettings();

 return (
 <div className="flex flex-col w-full">
 {/* Header Banner */}
 <section className="w-full bg-card py-16 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col items-start gap-4">
 <span className="text-xs font-mono font-bold text-gym-gold">
 REACH OUR STUDIO
 </span>
 <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-foreground">
 {getTranslation("contact.title", locale)}
 </h1>
 <p className="text-lg text-gray-300 max-w-2xl">
 {getTranslation("contact.subtitle", locale)}
 </p>
 </div>
 </div>
 </section>

 {/* Main Grid: Details + Form */}
 <section className="w-full bg-background text-foreground py-20">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 {/* Left Column: Contact Details & Map */}
 <div className="lg:col-span-5 flex flex-col gap-8">
 <div className="flex flex-col gap-6 bg-gym-darkCard p-6 border border-gym-darkBorder">
 <h3 className="font-sans font-bold text-2xl text-foreground border-b border-gym-darkBorder pb-3">
 {getTranslation("contact.addressTitle", locale)}
 </h3>

 <div className="flex flex-col gap-4 text-base text-gray-300">
 <div className="flex items-start gap-3">
 <MapPin className="w-5 h-5 text-gym-gold shrink-0 mt-1" />
 <div>
 <p className="font-semibold text-foreground">Blustereast Tattoo Studio</p>
 <p className="text-sm">{settings.address}</p>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <Clock className="w-5 h-5 text-gym-gold shrink-0 mt-1" />
 <div>
 <p className="font-semibold text-foreground">
 {getTranslation("contact.hoursTitle", locale)}
 </p>
 <p className="text-sm">{settings.opening_hours}</p>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <Instagram className="w-5 h-5 text-gym-gold shrink-0 mt-1" />
 <div>
 <p className="font-semibold text-foreground">Social Media</p>
 <p className="text-sm font-mono">{settings.instagram}</p>
 <p className="text-sm font-mono">{settings.tiktok}</p>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <Phone className="w-5 h-5 text-gym-gold shrink-0 mt-1" />
 <div>
 <p className="font-semibold text-foreground">WhatsApp</p>
 <p className="text-sm font-mono">{settings.whatsapp}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Map Embed */}
 <div className="flex flex-col gap-2">
 <h4 className="font-sans font-bold text-lg text-foreground">
 {getTranslation("contact.mapTitle", locale)}
 </h4>
 <div className="w-full h-64 border-2 border-gym-gold overflow-hidden relative bg-card/10">
 <iframe
 title="Studio Map"
 src={settings.maps_embed_url || mockSiteSettings.maps_embed_url}
 className="w-full h-full border-0"
 loading="lazy"
 allowFullScreen
 />
 </div>
 </div>
 </div>

 {/* Right Column: Client-side Form */}
 <ContactForm locale={locale} whatsapp={settings.whatsapp} />
 </div>
 </div>
 </section>
 </div>
 );
}
