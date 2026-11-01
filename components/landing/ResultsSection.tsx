import type { Dictionary } from "@/lib/i18n/types";

export function ResultsSection({ d }: { d: Pick<Dictionary, "results"> }) {
  return (
    <section
      className="results-section wrap"
      id="results"
      aria-labelledby="results-title"
    >
      <h2 id="results-title" className="eyebrow muted">
        {d.results.label}
      </h2>
      <div className="stats-grid">
        {d.results.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <b dir="ltr">[{stat.value}]</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="placeholder-note">{d.results.note}</p>
    </section>
  );
}
