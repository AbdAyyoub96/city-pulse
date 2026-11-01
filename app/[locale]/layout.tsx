import { notFound } from "next/navigation";
import type { Viewport } from "next";
import { Document } from "@/components/Document";
import { isLocale } from "@/lib/i18n";
import "../globals.css";
import "./landing.css";

export const viewport: Viewport = {
  themeColor: "#0B1626",
  width: "device-width",
  initialScale: 1,
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Document locale={locale}>{children}</Document>;
}
