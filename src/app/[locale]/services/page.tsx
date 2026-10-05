export const instant = false;
import React from "react";

import { getTranslation, Locale } from "@/lib/i18n";
import { mockServices, mockFAQs, mockSiteSettings } from "@/lib/mock";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

interface ServicesPageProps {
 params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
 const resolvedParams = await params;
 const locale: Locale = resolvedParams.locale === "en" ? "en" : "id";

 const isEn = locale === "en";

 const faqItems = mockFAQs.map((faq) => ({
 id: faq.id,
 title: isEn ? faq.question_en : faq.question_id,
 content: isEn ? faq.answer_en : faq.answer_id,
 }));

 const aftercareSteps = isEn
 ? [
 "Keep protective film on for 3-5 hours post-session.",
 "Wash gently with lukewarm water and antibacterial fragrance-free soap.",
 "Pat dry with clean single-use paper towel (do not rub).",
 "Apply thin layer of recommended tattoo balm 2-3 times daily.",
 "Avoid swimming, sauna, direct sunlight, and picking scabs for 2 weeks.",
 ]
 : [
 "Biarkan plastik pelindung selama 3-5 jam setelah sesi tato selesai.",
 "Cuci perlahan dengan air hangat suam dan sabun lembut tanpa pewangi.",
 "Keringkan dengan menepuk-nepuk menggunakan tisu dapur steril (jangan digosok).",
 "Oleskan tipis salep/balm aftercare khusus tato 2-3 kali sehari.",
 "Hindari berenang, berendam, paparan matahari langsung, dan mengelupas kulit selama 2 minggu.",
 ];

 return (
 <div className="flex flex-col w-full">
 {/* Header Banner */}
 <section className="w-full bg-card text-muted-foreground py-16 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col items-start gap-4">
 <span className="text-xs font-mono font-bold text-gym-gold ">
 STUDIO SERVICES & PRICING
 </span>
 <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-foreground ">
 {getTranslation("services.title", locale)}
 </h1>
 <p className="text-lg text-gray-300 max-w-2xl">
 {getTranslation("services.subtitle", locale)}
 </p>
 </div>
 </div>
 </section>

 {/* Services List & Price Grid */}
 <section className="w-full bg-background text-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {mockServices.map((service) => (
 <div
 key={service.id}
 className="flex flex-col justify-between p-6 bg-gym-darkCard border border-gym-darkBorder hover:border-gym-gold duration-200"
 >
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <Badge variant="stencil">{service.size_category}</Badge>
 <span className="font-mono text-xs text-graphite">
 Akasia XVI Studio
 </span>
 </div>

 <h3 className="font-sans font-bold text-2xl text-foreground ">
 {isEn ? service.name_en : service.name_id}
 </h3>

 <p className="text-sm text-graphite leading-relaxed">
 {isEn ? service.description_en : service.description_id}
 </p>
 </div>

 <div className="pt-6 mt-6 border-t border-gym-darkBorder flex flex-col gap-3">
 <div className="flex items-baseline justify-between">
 <span className="text-xs text-graphite font-mono ">
 {getTranslation("services.startingFrom", locale)}:
 </span>
 <span className="font-mono font-black text-gym-gold text-xl">
 Rp {service.starting_price}
 </span>
 </div>

 <a
 href={`https://wa.me/${mockSiteSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo, saya ingin bertanya estimasi harga untuk layanan: ${service.name_id}`)}`}
 target="_blank"
 rel="noreferrer"
 >
 <Button variant="outline" size="sm" className="w-full justify-center">
 Consult This Service
 </Button>
 </a>
 </div>
 </div>
 ))}
 </div>

 <div className="mt-8 p-4 bg-card/5 border border-gym-darkBorder text-xs text-graphite font-mono">
 {getTranslation("services.priceNote", locale)}
 </div>
 </div>
 </section>

 {/* Aftercare Guide Section */}
 <section className="w-full bg-card text-muted-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 <div className="lg:col-span-5 flex flex-col items-start gap-4">
 <div className="flex items-center gap-2 text-gym-gold">
 <Sparkles className="w-5 h-5" />
 <span className="font-mono text-xs font-bold ">
 HEALING & MAINTENANCE
 </span>
 </div>
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground ">
 {getTranslation("services.aftercareTitle", locale)}
 </h2>
 <p className="text-base text-gray-300 leading-relaxed">
 {getTranslation("services.aftercareIntro", locale)}
 </p>
 </div>

 <div className="lg:col-span-7 bg-card/60 p-6 border-2 border-gym-gold flex flex-col gap-4">
 {aftercareSteps.map((step, i) => (
 <div key={i} className="flex items-start gap-3">
 <div className="w-6 h-6 bg-stencil text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
 {i + 1}
 </div>
 <p className="text-sm text-muted-foreground/90 leading-relaxed">{step}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* FAQ Accordion Section */}
 <section className="w-full bg-background text-foreground py-20">
 <div className="max-w-container mx-auto px-4 sm:px-6 max-w-4xl">
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground mb-8 text-left">
 {getTranslation("services.faqTitle", locale)}
 </h2>
 <Accordion items={faqItems} />
 </div>
 </section>
 </div>
 );
}
