export const instant = false;
import React from "react";
import { getTranslation, Locale } from "@/lib/i18n";
import { mockSiteSettings } from "@/lib/mock";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ShieldCheck, Heart, Sparkles, MapPin } from "lucide-react";

interface AboutPageProps {
 params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
 const resolvedParams = await params;
 const locale: Locale = resolvedParams.locale === "en" ? "en" : "id";

 const isEn = locale === "en";

 return (
 <div className="flex flex-col w-full">
 {/* Header Banner */}
 <section className="w-full bg-card text-muted-foreground py-16 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col items-start gap-4">
 <span className="text-xs font-mono font-bold text-gym-gold ">
 STUDIO PROFILE
 </span>
 <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-foreground ">
 {getTranslation("about.title", locale)}
 </h1>
 <p className="text-lg text-gray-300 max-w-2xl">
 {getTranslation("about.subtitle", locale)}
 </p>
 </div>
 </div>
 </section>

 {/* Story & Vision/Mission Section */}
 <section className="w-full bg-background text-foreground py-16 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 {/* Story */}
 <div className="lg:col-span-7 flex flex-col items-start gap-6">
 <h2 className="font-sans font-extrabold text-3xl text-foreground border-l-4 border-gym-gold pl-4">
 {getTranslation("about.storyTitle", locale)}
 </h2>
 <p className="text-base text-graphite leading-relaxed">
 {isEn
 ? mockSiteSettings.about_en
 : mockSiteSettings.about_id}
 </p>
 <div className="p-4 bg-gym-darkCard border border-gym-darkBorder rounded-[2px] w-full flex items-center gap-3">
 <MapPin className="w-5 h-5 text-gym-gold shrink-0" />
 <span className="text-sm font-medium text-graphite">
 Location: {mockSiteSettings.address}
 </span>
 </div>
 </div>

 {/* Vision & Mission */}
 <div className="lg:col-span-5 flex flex-col gap-8 bg-gym-darkCard p-6 border border-gym-darkBorder">
 <div className="flex flex-col gap-3">
 <h3 className="font-sans font-bold text-xl text-gym-gold ">
 {getTranslation("about.visionTitle", locale)}
 </h3>
 <p className="text-sm text-graphite leading-relaxed">
 {isEn
 ? mockSiteSettings.vision_en
 : mockSiteSettings.vision_id}
 </p>
 </div>

 <div className="border-t border-gym-darkBorder pt-6 flex flex-col gap-3">
 <h3 className="font-sans font-bold text-xl text-gym-gold ">
 {getTranslation("about.missionTitle", locale)}
 </h3>
 <p className="text-sm text-graphite leading-relaxed whitespace-pre-line">
 {isEn
 ? mockSiteSettings.mission_en
 : mockSiteSettings.mission_id}
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Values Section */}
 <section className="w-full bg-card text-muted-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground mb-12">
 {getTranslation("about.valuesTitle", locale)}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {/* Hygiene */}
 <div className="flex flex-col gap-4 p-6 border border-gym-darkBorder bg-card/60">
 <div className="w-12 h-12 bg-stencil/20 border border-gym-gold text-gym-gold flex items-center justify-center">
 <ShieldCheck className="w-6 h-6" />
 </div>
 <h3 className="font-sans font-bold text-2xl text-foreground ">
 {getTranslation("about.valHygieneTitle", locale)}
 </h3>
 <p className="text-sm text-gray-300 leading-relaxed">
 {getTranslation("about.valHygieneDesc", locale)}
 </p>
 </div>

 {/* Comfort */}
 <div className="flex flex-col gap-4 p-6 border border-gym-darkBorder bg-card/60">
 <div className="w-12 h-12 bg-stencil/20 border border-gym-gold text-gym-gold flex items-center justify-center">
 <Heart className="w-6 h-6" />
 </div>
 <h3 className="font-sans font-bold text-2xl text-foreground ">
 {getTranslation("about.valComfortTitle", locale)}
 </h3>
 <p className="text-sm text-gray-300 leading-relaxed">
 {getTranslation("about.valComfortDesc", locale)}
 </p>
 </div>

 {/* Custom */}
 <div className="flex flex-col gap-4 p-6 border border-gym-darkBorder bg-card/60">
 <div className="w-12 h-12 bg-stencil/20 border border-gym-gold text-gym-gold flex items-center justify-center">
 <Sparkles className="w-6 h-6" />
 </div>
 <h3 className="font-sans font-bold text-2xl text-foreground ">
 {getTranslation("about.valCustomTitle", locale)}
 </h3>
 <p className="text-sm text-gray-300 leading-relaxed">
 {getTranslation("about.valCustomDesc", locale)}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Studio Photos Section */}
 <section className="w-full bg-background text-foreground py-20">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <h2 className="font-sans font-extrabold text-3xl text-foreground mb-8">
 {getTranslation("about.photosTitle", locale)}
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
 <PhotoPlaceholder
 aspectRatio="4:5"
 label="[PHOTO] Studio Interior & Workstation"
 showDashedBorder={true}
 />
 <PhotoPlaceholder
 aspectRatio="4:5"
 label="[PHOTO] Sterilization & Equipment Area"
 showDashedBorder={true}
 />
 <PhotoPlaceholder
 aspectRatio="4:5"
 label="[PHOTO] Flash Sheet Display Wall"
 showDashedBorder={true}
 />
 </div>
 </div>
 </section>
 </div>
 );
}
