import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const isValidLocale =
    typeof locale === "string" &&
    (routing.locales as readonly string[]).includes(locale);

  const safeLocale: "id" | "en" = isValidLocale
    ? (locale as "id" | "en")
    : routing.defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
