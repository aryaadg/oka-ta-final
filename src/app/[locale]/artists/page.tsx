export const instant = false;
import React from "react";
import Link from "next/link";
import { getTranslation, Locale } from "@/lib/i18n";
import { getArtists } from "@/lib/data/public";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

interface ArtistsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ArtistsPage({ params }: ArtistsPageProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === "en" ? "en" : "id";
  const isEn = locale === "en";
  const artists = await getArtists();

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="w-full bg-card text-foreground py-16 border-b border-gym-darkBorder">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-mono font-bold text-gym-gold">
              STUDIO TEAM
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-foreground">
              {getTranslation("artists.title", locale)}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              {getTranslation("artists.subtitle", locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Artist List */}
      <section className="w-full bg-background text-foreground py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-12">
            {artists.map((artist, idx) => (
              <div
                key={artist.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-gym-darkCard p-6 sm:p-8 border border-gym-darkBorder hover:border-gym-gold transition-colors"
              >
                {/* Photo Placeholder */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <PhotoPlaceholder
                    aspectRatio="1:1"
                    label={`[PHOTO] ${artist.name}`}
                    src={artist.photo_url}
                    showDashedBorder={true}
                  />
                </div>

                {/* Info Block */}
                <div className="md:col-span-8 flex flex-col justify-between items-start gap-6">
                  <div className="flex flex-col gap-3 items-start">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-gym-gold bg-gym-gold/10 px-2 py-1 border border-gym-gold/30">
                        RESIDENT #0{idx + 1}
                      </span>
                      <h2 className="font-sans font-black text-3xl text-foreground">
                        {artist.name}
                      </h2>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-mono text-graphite font-semibold">
                        {getTranslation("artists.specialties", locale)}:
                      </span>
                      {artist.specialties.map((spec) => (
                        <Badge key={spec} variant="stencil">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-base text-graphite leading-relaxed pt-2">
                      {isEn ? artist.bio_en : artist.bio_id}
                    </p>
                  </div>

                  {/* Filter Link CTA */}
                  <div className="pt-4 border-t border-gym-darkBorder w-full flex justify-end">
                    <Link href={`/${locale}/gallery?artist=${artist.id}`}>
                      <Button variant="stencil" size="md" className="gap-2">
                        <span>
                          {getTranslation("artists.viewGallery", locale)}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
