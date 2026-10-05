/* eslint-disable @typescript-eslint/no-explicit-any */
import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";

export type Locale = "id" | "en";

const messages: Record<Locale, Record<string, any>> = {
 id: idMessages,
 en: enMessages,
};

export function getTranslation(key: string, locale: Locale = "id"): string {
 const parts = key.split(".");
 let current: any = messages[locale] || messages.id;

 for (const part of parts) {
 if (current && typeof current === "object" && part in current) {
 current = current[part];
 } else {
 // Fallback to Indonesian if missing in current locale
 let fallback: any = messages.id;
 for (const fPart of parts) {
 if (fallback && typeof fallback === "object" && fPart in fallback) {
 fallback = fallback[fPart];
 } else {
 return key;
 }
 }
 return typeof fallback === "string" ? fallback : key;
 }
 }

 return typeof current === "string" ? current : key;
}

export function useTranslations(locale: Locale = "id") {
 return (key: string) => getTranslation(key, locale);
}
