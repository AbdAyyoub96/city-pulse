import type { Dictionary, Locale } from "@/lib/i18n/types";
import { Brand } from "../Logo";
export function Footer({
  locale,
  d,
}: {
  locale: Locale;
  d: Pick<Dictionary, "footer" | "brand">;
}) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Brand locale={locale} brand={d.brand} />
          <p>{d.footer.statement}</p>
          <a href="#top">
            {d.footer.top}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <bdi>{d.brand.name}</bdi> ·{" "}
            {d.brand.arabic}. {d.footer.rights}
          </p>
          <span>{d.brand.location}</span>
        </div>
      </div>
    </footer>
  );
}
