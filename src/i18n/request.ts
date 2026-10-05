import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
 // Await the locale promise (Next.js 15 requirement)
 const locale = await requestLocale;
 
 // Fallback to default locale if undefined or invalid (solves Next 16 prefetch error)
 const safeLocale = routing.locales.includes(locale as any) ? locale : routing.defaultLocale;

 return {
 locale: safeLocale as any,
 messages: (await import(`../messages/${safeLocale}.json`)).default,
 };
});
