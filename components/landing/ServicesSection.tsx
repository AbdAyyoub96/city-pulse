import type { Dictionary } from "@/lib/i18n/types";
import { Icon } from "../Icon";
import { SectionHeading } from "./SectionHeading";

export function ServicesSection({ d }: { d: Pick<Dictionary, "services"> }) {
  return (
    <section
      className="section wrap"
      id="services"
      aria-labelledby="services-title"
    >
      <div id="services-title">
        <SectionHeading {...d.services} />
      </div>
      <div className="services-grid">
        {d.services.items.map((service, index) => (
          <article
            id={`service-${service.key}`}
            className="service-card"
            key={service.key}
          >
            <div className="service-card-top">
              <Icon name={service.key} />
              <span className="index-number" dir="ltr">
                0{index + 1}
              </span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
        <a className="service-invite" href="#contact">
          <span className="invite-pulse" aria-hidden="true">
            ↗
          </span>
          <span>{d.services.cta}</span>
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
