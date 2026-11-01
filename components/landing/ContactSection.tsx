import type { Dictionary } from "@/lib/i18n/types";
import { Icon } from "../Icon";
import { LeadForm } from "./LeadForm";

export function ContactSection({
  d,
}: {
  d: Pick<Dictionary, "contact" | "services" | "brand">;
}) {
  return (
    <section
      className="section wrap contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <p className="eyebrow">{d.contact.eyebrow}</p>
        <h2 id="contact-title">
          {d.contact.title}
          <br />
          <span>{d.contact.emphasis}</span>
        </h2>
        <p className="section-description">{d.contact.description}</p>
        <dl className="contact-details">
          {[
            {
              icon: "mail",
              label: d.contact.emailLabel,
              value: d.contact.email,
            },
            {
              icon: "phone",
              label: d.contact.phoneLabel,
              value: d.contact.phone,
            },
            {
              icon: "location",
              label: d.contact.addressLabel,
              value: d.contact.address,
            },
          ].map((item) => (
            <div key={item.icon}>
              <Icon name={item.icon} />
              <div>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="contact-signature">
          {d.brand.arabic}
          <span lang="en" dir="ltr">
            {d.brand.name}
          </span>
        </p>
      </div>
      <LeadForm d={{ contact: d.contact, services: d.services }} />
    </section>
  );
}
