export const instant = false;
import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSiteSettings, getArtists, getServices, getFeaturedGalleryItems } from "@/lib/data/public";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

interface HomePageProps {
 params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
 const resolvedParams = await params;
 const locale = resolvedParams.locale;
 const t = await getTranslations();

 const mockSiteSettings = await getSiteSettings();
 const featuredWorks = await getFeaturedGalleryItems();
 const mockArtists = await getArtists();
 const mockServicesData = await getServices();
 const coreServices = mockServicesData.slice(0, 4);

 return (
 <div className="flex flex-col w-full">
 {/* 1. HERO SECTION (ink bg) */}
 <section className="w-full bg-card text-muted-foreground py-16 md:py-24 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 {/* Left Copy Block */}
 <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
 

 <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9]">
 {t("hero.title")}
 </h1>

 <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl font-sans">
 {t("hero.subtitle")}
 </p>

 <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
 <a
 href={`https://wa.me/${mockSiteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
 target="_blank"
 rel="noreferrer"
 className="w-full sm:w-auto"
 >
 <Button variant="stencil" size="lg" className="w-full sm:w-auto gap-2">
 <span>{t("hero.ctaWhatsapp")}</span>
 <ArrowRight className="w-5 h-5" />
 </Button>
 </a>

 <Link href={`/${locale}/gallery`} className="w-full sm:w-auto">
 <Button variant="outline" size="lg" className="w-full sm:w-auto">
 {t("hero.ctaGallery")}
 </Button>
 </Link>
 </div>

 {/* Quick Trust Badges */}
 <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gym-darkBorder text-xs text-gray-400 font-mono">
 <span className="flex items-center gap-1.5">
 <ShieldCheck className="w-4 h-4 text-gym-gold" /> Single-Use Sterile Needles
 </span>
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-4 h-4 text-gym-gold" /> Custom Anatomy Fitting
 </span>
 </div>
 </div>

 {/* Right Work Photo Placeholder */}
 <div className="lg:col-span-5 flex flex-col items-center">
 <div className="w-full max-w-md">
 <PhotoPlaceholder
 aspectRatio="4:5"
 label="[PHOTO] Hero Work Highlight"
 showDashedBorder={true}
 />
 <div className="mt-2 text-xs text-graphite font-mono">
 Featured Stencil Work • Denpasar Timur
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* 2. SERVICES SUMMARY SECTION (paper bg) */}
 <section className="w-full bg-background text-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
 <div className="flex flex-col items-start gap-2">
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground ">
 {t("home.servicesTitle")}
 </h2>
 <p className="text-graphite text-base max-w-lg">
 {t("home.servicesSubtitle")}
 </p>
 </div>
 <Link href={`/${locale}/services`}>
 <Button variant="outline" size="md">
 {t("home.servicesViewAll")}
 </Button>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {coreServices.map((service) => (
 <div
 key={service.id}
 className="flex flex-col justify-between p-6 bg-gym-darkCard border border-gym-darkBorder hover:border-gym-gold duration-200"
 >
 <div className="flex flex-col gap-3">
 <Badge variant="stencil" className="w-fit">
 {service.size_category}
 </Badge>
 <h3 className="font-sans font-bold text-xl text-foreground ">
 {locale === "en" ? service.name_en : service.name_id}
 </h3>
 <p className="text-sm text-graphite leading-relaxed">
 {locale === "en"
 ? service.description_en
 : service.description_id}
 </p>
 </div>
 <div className="pt-6 mt-4 border-t border-gym-darkBorder flex items-center justify-between">
 <span className="text-xs text-graphite font-mono ">
 {t("services.startingFrom")}
 </span>
 <span className="font-mono font-bold text-gym-gold text-base">
 Rp {service.starting_price}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 3. FEATURED WORKS / FLASH SHEET (ink bg) */}
 <section className="w-full bg-card text-muted-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
 <div className="flex flex-col items-start gap-2">
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground ">
 {t("home.featuredWorksTitle")}
 </h2>
 <p className="text-gray-400 text-base max-w-lg">
 {t("home.featuredWorksSubtitle")}
 </p>
 </div>
 <Link href={`/${locale}/gallery`}>
 <Button variant="stencil" size="md">
 {t("home.featuredWorksViewAll")}
 </Button>
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {featuredWorks.map((work) => (
 <Link
 key={work.id}
 href={`/${locale}/gallery`}
 className="flex flex-col border border-gym-darkBorder bg-card/50 p-3 hover:border-gym-gold duration-200 group"
 >
 <PhotoPlaceholder
 aspectRatio="4:5"
 label={`[PHOTO] ${work.title}`}
 showDashedBorder={true}
 />
 <div className="flex flex-col gap-1 pt-3 pb-1">
 <h4 className="font-sans font-bold text-lg text-foreground group-hover:text-gym-gold transition-colors">
 {work.title}
 </h4>
 <div className="flex items-center justify-between text-xs font-mono text-gray-400">
 <span className="text-gym-gold font-semibold">{work.style}</span>
 <span>{work.artist?.name || "Studio Artist"}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* 4. RESIDENT ARTISTS SECTION (paper bg) */}
 <section className="w-full bg-background text-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
 <div className="flex flex-col items-start gap-2">
 <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-foreground ">
 {t("home.artistsTitle")}
 </h2>
 <p className="text-graphite text-base max-w-lg">
 {t("home.artistsSubtitle")}
 </p>
 </div>
 <Link href={`/${locale}/artists`}>
 <Button variant="outline" size="md">
 {t("home.artistsViewAll")}
 </Button>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {mockArtists.map((artist) => (
 <div
 key={artist.id}
 className="flex flex-col border border-gym-darkBorder bg-gym-darkCard p-5 hover:border-gym-gold transition-colors"
 >
 <PhotoPlaceholder
 aspectRatio="1:1"
 label={`[PHOTO] ${artist.name}`}
 showDashedBorder={true}
 />
 <h3 className="font-sans font-bold text-2xl text-foreground mt-4">
 {artist.name}
 </h3>
 <div className="flex flex-wrap gap-1.5 mt-2">
 {artist.specialties?.map((spec: string) => (
 <Badge key={spec} variant="stencil">
 {spec}
 </Badge>
 ))}
 </div>
 <p className="text-sm text-graphite mt-3 line-clamp-3 leading-relaxed">
 {locale === "en" ? artist.bio_en : artist.bio_id}
 </p>
 <div className="mt-6 pt-4 border-t border-gym-darkBorder">
 <Link href={`/${locale}/gallery?artist=${artist.id}`}>
 <Button variant="ghost" size="sm" className="text-gym-gold p-0 hover:bg-transparent hover:underline">
 {t("artists.viewGallery")} →
 </Button>
 </Link>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 5. CLOSING CONTACT CTA (ink bg) */}
 <section className="w-full bg-card text-muted-foreground py-20 border-b border-gym-darkBorder">
 <div className="max-w-container mx-auto px-4 sm:px-6 text-left max-w-3xl">
 <div className="flex flex-col items-start gap-6 border-l-4 border-gym-gold pl-6 py-2">
 <h2 className="font-sans font-black text-4xl sm:text-5xl text-foreground">
 {t("home.contactCtaTitle")}
 </h2>
 <p className="text-lg text-gray-300 leading-relaxed font-sans">
 {t("home.contactCtaSubtitle")}
 </p>
 <a
 href={`https://wa.me/${mockSiteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
 target="_blank"
 rel="noreferrer"
 >
 <Button variant="stencil" size="lg" className="gap-2">
 <span>{t("home.contactCtaButton")}</span>
 <ArrowRight className="w-5 h-5" />
 </Button>
 </a>
 </div>
 </div>
 </section>
 </div>
 );
}
