export const instant = false;
import React from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/data/public";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface SiteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function SiteLayout({
  children,
  params,
}: SiteLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === "en" ? "en" : "id";
  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col justify-between">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} settings={settings} />
        <WhatsAppFab settings={settings} />
      </div>
    </NextIntlClientProvider>
  );
}
