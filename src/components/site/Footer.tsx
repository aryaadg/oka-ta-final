import React from "react";
import Link from "next/link";
import { getTranslation, Locale } from "@/lib/i18n";
import { mockSiteSettings, SiteSettings } from "@/lib/mock";
import { MapPin, Clock, Instagram, Phone } from "lucide-react";

interface FooterProps {
  locale?: Locale;
  settings?: SiteSettings;
}

function getInstagramUrl(raw: string): string {
  if (!raw) return "https://instagram.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://instagram.com/${raw.replace(/^@/, "")}`;
}

function getInstagramHandle(raw: string): string {
  if (!raw) return "@blustereast_tattoostudio";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    const clean = raw.replace(/\/+$/, "").split("/").pop() || "blustereast";
    return clean.startsWith("@") ? clean : `@${clean}`;
  }
  return raw.startsWith("@") ? raw : `@${raw}`;
}

function getTiktokUrl(raw: string): string {
  if (!raw) return "https://tiktok.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const handle = raw.startsWith("@") ? raw : `@${raw}`;
  return `https://tiktok.com/${handle}`;
}

function getTiktokHandle(raw: string): string {
  if (!raw) return "@blustereast_tattoostudio";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    const clean = raw.replace(/\/+$/, "").split("/").pop() || "@blustereast";
    return clean.startsWith("@") ? clean : `@${clean}`;
  }
  return raw.startsWith("@") ? raw : `@${raw}`;
}

export function Footer({ locale = "id", settings = mockSiteSettings }: FooterProps) {
  const igUrl = getInstagramUrl(settings.instagram);
  const igHandle = getInstagramHandle(settings.instagram);
  const ttUrl = getTiktokUrl(settings.tiktok);
  const ttHandle = getTiktokHandle(settings.tiktok);
  const waClean = settings.whatsapp.replace(/[^0-9]/g, "");

  return (
    <footer className="w-full bg-card text-gray-400 border-t border-gym-darkBorder py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gym-darkBorder">
          {/* Studio Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gym-gold text-gym-dark flex items-center justify-center font-sans font-black text-lg">
                B
              </div>
              <span className="font-sans font-extrabold text-2xl text-foreground">
                BLUSTEREAST TATTOO
              </span>
            </div>
            <p className="text-sm text-graphite leading-relaxed max-w-md">
              {getTranslation("footer.aboutText", locale)}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gym-gold shrink-0 mt-1" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gym-gold shrink-0" />
                <span>{settings.opening_hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold text-lg text-gym-gold">
              {getTranslation("footer.quickLinks", locale)}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.home", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.about", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/artists`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.artists", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.services", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.gallery", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-gym-gold transition-colors"
                >
                  {getTranslation("nav.contact", locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Admin */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold text-lg text-gym-gold">
              {getTranslation("footer.socialTitle", locale)}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gym-gold transition-colors"
              >
                <Instagram className="w-4 h-4 text-gym-gold shrink-0" />
                <span>Instagram: {igHandle}</span>
              </a>
              <a
                href={ttUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gym-gold transition-colors"
              >
                <span className="font-mono text-gym-gold font-bold text-xs w-4 text-center shrink-0">
                  TT
                </span>
                <span>TikTok: {ttHandle}</span>
              </a>
              <a
                href={`https://wa.me/${waClean}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gym-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gym-gold shrink-0" />
                <span>WhatsApp: {settings.whatsapp}</span>
              </a>
            </div>
            <div className="pt-4 border-t border-gym-darkBorder">
              <Link
                href="/admin/login"
                className="text-xs text-graphite hover:text-gym-gold transition-colors font-mono"
              >
                {getTranslation("nav.admin", locale)} (Internal Only)
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-graphite flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>{getTranslation("footer.copyright", locale)}</span>
          <span className="font-mono">
            Akasia XVI, Denpasar Timur • Strictly 18+
          </span>
        </div>
      </div>
    </footer>
  );
}
