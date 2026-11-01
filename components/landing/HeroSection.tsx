import type { Dictionary } from "@/lib/i18n/types";
import { Icon } from "../Icon";
import { PulseGraphic } from "./PulseGraphic";

export function HeroSection({
  d,
}: {
  d: Pick<Dictionary, "hero" | "services">;
}) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {d.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            {d.hero.title}
            <br />
            <span>{d.hero.emphasis}</span>
            <br />
            {d.hero.ending}
          </h1>
          <p className="hero-description">{d.hero.description}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#contact">
              {d.hero.primary}
              <Icon name="arrow" />
            </a>
            <a className="btn btn-text" href="#work">
              {d.hero.secondary}
              <Icon name="diagonal" />
            </a>
          </div>
          <ul className="service-tags">
            {d.services.items.map((item) => (
              <li key={item.key}>
                <a href={`#service-${item.key}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <PulseGraphic d={d} />
      </div>
      <div className="wrap hero-bottom">
        <span>{d.hero.bottom}</span>
        <a href="#services">
          {d.hero.scroll}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
      <svg
        className="hero-pulse"
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 50h490l18-12 19 25 20-52 24 79 24-40h1005"
          className="pulse-track"
        />
        <path
          d="M0 50h490l18-12 19 25 20-52 24 79 24-40h1005"
          className="pulse-run"
        />
      </svg>
    </section>
  );
}
