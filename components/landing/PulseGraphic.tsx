import type { Dictionary } from "@/lib/i18n/types";
export function PulseGraphic({ d }: { d: Pick<Dictionary, "hero"> }) {
  return (
    <div className="growth-visual" role="img" aria-label={d.hero.diagramTitle}>
      <div className="visual-grid" />
      <p className="visual-caption">{d.hero.diagramTop}</p>
      <svg
        viewBox="0 0 520 420"
        className="orbit-svg"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="260" cy="210" r="164" stroke="currentColor" />
        <circle
          cx="260"
          cy="210"
          r="116"
          stroke="currentColor"
          strokeDasharray="3 9"
        />
        <path
          d="M96 210h328M260 46v328"
          stroke="currentColor"
          strokeDasharray="3 9"
        />
        <path
          d="M0 210H175l18-30 21 66 25-92 30 115 23-59h228"
          className="visual-pulse-base"
        />
        <path
          d="M0 210H175l18-30 21 66 25-92 30 115 23-59h228"
          className="visual-pulse"
        />
        <circle
          cx="260"
          cy="46"
          r="5"
          fill="#FF5A36"
          stroke="#0B1626"
          strokeWidth="5"
        />
        <circle cx="402" cy="292" r="5" fill="#A3AFBF" />
        <circle cx="118" cy="292" r="5" fill="#A3AFBF" />
      </svg>
      <span className="orbit-label orbit-label-one">
        {d.hero.diagramLabels[0]}
      </span>
      <span className="orbit-label orbit-label-two">
        {d.hero.diagramLabels[1]}
      </span>
      <span className="orbit-label orbit-label-three">
        {d.hero.diagramLabels[2]}
      </span>
      <span className="growth-label">{d.hero.diagramCenter}</span>
      <p className="visual-footer">{d.hero.diagramBottom}</p>
      <i className="corner corner-one" />
      <i className="corner corner-two" />
    </div>
  );
}
