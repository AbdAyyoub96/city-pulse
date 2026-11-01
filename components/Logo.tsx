import type { Dictionary, Locale } from "@/lib/i18n/types";

// Replace /public/logo-placeholder.svg with the supplied company SVG.
export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <img
      src="/logo-placeholder.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}
export function Brand({
  locale,
  brand,
}: {
  locale: Locale;
  brand: Dictionary["brand"];
}) {
  return (
    <a className="brand" href={`/${locale}#top`} aria-label={brand.name}>
      <span className="logo-slot" title={brand.logo}>
        <LogoMark />
      </span>
      <span className="brand-name" dir="ltr">
        {brand.short}
        <small>{brand.suffix}</small>
      </span>
    </a>
  );
}
