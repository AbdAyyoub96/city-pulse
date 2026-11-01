"use client";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { Brand } from "../Logo";
import { Icon } from "../Icon";

const sections = [
  "top",
  "results",
  "services",
  "method",
  "work",
  "tools",
  "contact",
];
export function Header({
  locale,
  d,
}: {
  locale: Locale;
  d: Pick<Dictionary, "nav" | "brand">;
}) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("top");
  const manualScroll = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hash = window.location.hash.slice(1);
        if (
          !manualScroll.current &&
          (sections.includes(hash) || hash.startsWith("service-")) &&
          document.getElementById(hash)
        ) {
          setSection(hash);
          return;
        }
        let current = "top";
        for (const id of sections) {
          const node = document.getElementById(id);
          if (
            node &&
            node.getBoundingClientRect().top <= window.innerHeight * 0.4
          )
            current = id;
        }
        setSection(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const hashChanged = () => {
      manualScroll.current = false;
      update();
    };
    const scrolledManually = () => {
      manualScroll.current = true;
      update();
    };
    window.addEventListener("hashchange", hashChanged);
    window.addEventListener("wheel", scrolledManually, { passive: true });
    window.addEventListener("touchmove", scrolledManually, { passive: true });
    const escape = (event: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key) &&
        !(
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement
        )
      )
        scrolledManually();
      if (
        event.key === "Escape" &&
        menuButton.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        menuButton.current.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", hashChanged);
      window.removeEventListener("wheel", scrolledManually);
      window.removeEventListener("touchmove", scrolledManually);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  const target: Locale = locale === "ar" ? "en" : "ar";
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {d.nav.skip}
      </a>
      <div className="wrap header-inner">
        <Brand locale={locale} brand={d.brand} />
        <nav
          id="site-navigation"
          className={`site-navigation ${open ? "is-open" : ""}`}
          aria-label={d.nav.menu}
        >
          {(["services", "method", "work", "contact"] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                manualScroll.current = false;
                setSection(id);
                setOpen(false);
              }}
              aria-current={section === id ? "location" : undefined}
            >
              {d.nav[id]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-switch"
            href={`/${target}#${section}`}
            lang={target}
            hrefLang={target}
            aria-label={d.nav.language}
          >
            <span className={locale === "ar" ? "active-language" : ""}>
              {d.nav.arabic}
            </span>
            <span className="language-divider">/</span>
            <span className={locale === "en" ? "active-language" : ""}>
              {d.nav.english}
            </span>
          </a>
          <a className="btn btn-small btn-outline header-cta" href="#contact">
            {d.nav.consultation}
            <Icon name="diagonal" />
          </a>
          <button
            ref={menuButton}
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? d.nav.close : d.nav.menu}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
