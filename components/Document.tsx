import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/types";

export function Document({
  locale,
  children,
  className,
}: {
  locale: Locale;
  children: ReactNode;
  className?: string;
}) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={className}>{children}</body>
    </html>
  );
}
