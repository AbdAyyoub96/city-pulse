import "server-only";
import { en } from "./en";
import { ar } from "./ar";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale } from "./types";
export function isLocale(value: string): value is Locale {
  return value === "ar" || value === "en";
}
export function getDictionary(locale: Locale): Dictionary {
  return locale === "ar" ? ar : en;
}
