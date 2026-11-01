import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  );
  return {
    metadataBase: base,
    title: d.meta.title,
    description: d.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", "x-default": "/ar" },
    },
    openGraph: {
      type: "website",
      title: d.meta.title,
      description: d.meta.description,
      siteName: d.brand.name,
      url: `/${locale}`,
      locale: locale === "ar" ? "ar_JO" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_JO",
      images: [
        { url: "/opengraph.png", width: 1200, height: 630, alt: d.brand.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: ["/opengraph.png"],
    },
  };
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LandingPage locale={locale} d={getDictionary(locale)} />;
}
