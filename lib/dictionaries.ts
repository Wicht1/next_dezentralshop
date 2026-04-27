import de from "@/dictionaries/de.json";
import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import it from "@/dictionaries/it.json";

export const SUPPORTED_LOCALES = ["de", "en", "fr", "it"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = { de, en, fr, it };

export function normalizeLocale(locale: string): Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : "de";
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  return dictionaries[normalizeLocale(locale)];
}
