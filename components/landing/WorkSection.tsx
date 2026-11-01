import type { Dictionary } from "@/lib/i18n/types";
import { Icon } from "../Icon";
import { SectionHeading } from "./SectionHeading";
import { WorkPreview } from "./WorkPreview";

export function WorkSection({ d }: { d: Pick<Dictionary, "work"> }) {
  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <div id="work-title">
        <SectionHeading {...d.work} />
      </div>
      <div className="work-grid">
        {d.work.cases.map((item, index) => (
          <article className="case-card" key={item.visual}>
            <div className="case-image" role="img" aria-label={d.work.image}>
              <WorkPreview kind={item.visual} />
              <span className="case-placeholder">{d.work.placeholder}</span>
              <span className="case-number" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <div className="case-copy">
              <p className="eyebrow">{item.category}</p>
              <h3>
                {d.work.client}
                <Icon name="diagonal" />
              </h3>
              <p className="muted case-pending">{d.work.pending}</p>
              <div className="case-kpis">
                {item.metrics.map((metric) => (
                  <div key={metric}>
                    <b dir="ltr">[{d.work.kpi}]</b>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="placeholder-note">{d.work.note}</p>
    </section>
  );
}
