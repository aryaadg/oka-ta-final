import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-geist-sans",
});

export const metadata: Metadata = {
 title: {
 template: "%s | Blustereast Tattoo Studio",
 default: "Blustereast Tattoo Studio | Custom Tattoo & Fine Line Denpasar Bali",
 },
 description:
 "Custom tattoo studio in East Denpasar (Akasia XVI), Bali. Specializing in Fine Line, Blackwork, Realism, and original flash designs.",
 metadataBase: new URL("https://blustereast.com"),
 alternates: {
 languages: {
 "en-US": "/en",
 "id-ID": "/id",
 },
 },
 openGraph: {
 title: "Blustereast Tattoo Studio",
 description: "Custom tattoo studio in East Denpasar, Bali. Specializing in Fine Line, Blackwork, and original designs.",
 url: "https://blustereast.com",
 siteName: "Blustereast Tattoo Studio",
 images: [
 {
 url: "/og-image.jpg",
 width: 1200,
 height: 630,
 alt: "Blustereast Tattoo Studio Bali",
 },
 ],
 locale: "id_ID",
 type: "website",
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 "max-video-preview": -1,
 "max-image-preview": "large",
 "max-snippet": -1,
 },
 },
 twitter: {
 title: "Blustereast Tattoo Studio",
 card: "summary_large_image",
 },
};

export default async function RootLayout({
 children,
 params,
}: Readonly<{
 children: React.ReactNode;
 params: Promise<{ locale?: string }>;
}>) {
 // Try to resolve params since it's a promise in Next.js 15
 const resolvedParams = await params.catch(() => ({ locale: "id" }));
 const locale = resolvedParams.locale || "id";
 
 // Try loading messages for the locale. Wait, `RootLayout` doesn't get `locale` automatically if it's the root app layout without a locale param.
 // Actually, we should probably do NextIntlClientProvider in the localized layout `app/[locale]/layout.tsx`.
 return (
 <html lang={locale} className={`dark ${inter.variable}`}>
 <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
 {children}
 </body>
 </html>
 );
}
