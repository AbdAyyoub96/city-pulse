import type { Dictionary } from "@/lib/i18n/types";
import { SectionHeading } from "./SectionHeading";

export function MethodSection({ d }: { d: Pick<Dictionary, "method"> }) {
  return (
    <section
      className="method-section"
      id="method"
      aria-labelledby="method-title"
    >
      <div className="wrap section">
        <div id="method-title">
          <SectionHeading {...d.method} />
        </div>
        <ol className="method-timeline">
          {d.method.steps.map((step, index) => (
            <li key={step.letter}>
              <div className="timeline-node">
                <span dir="ltr">0{index + 1}</span>
                <i />
              </div>
              <span className="method-letter" dir="ltr">
                {step.letter}
                <span>.</span>
              </span>
              <p className="method-name" lang="en" dir="ltr">
                {step.name}
              </p>
              <h3>{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
