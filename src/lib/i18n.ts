import en from "./locales/en.json";
import ms from "./locales/ms.json";
import zh from "./locales/zh.json";

export const locales = ["en", "ms", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ms: "Bahasa Melayu",
  zh: "中文",
};

export const localeHrefLangs: Record<Locale, string> = {
  en: "en",
  ms: "ms",
  zh: "zh",
};

const dictionaries: Record<Locale, typeof en> = { en, ms, zh };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
