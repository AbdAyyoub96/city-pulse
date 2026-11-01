import type { Dictionary } from "@/lib/i18n/types";

export function ToolsSection({ d }: { d: Pick<Dictionary, "tools"> }) {
  return (
    <section className="tools-section" id="tools" aria-labelledby="tools-title">
      <div className="wrap">
        <p className="eyebrow muted">{d.tools.eyebrow}</p>
        <h2 id="tools-title">{d.tools.title}</h2>
        <ul className="tool-list" dir="ltr">
          {d.tools.names.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
