export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="160" height="160" rx="36" fill="#FFFFFF" />
      <path d="M113.7 51.7 A44 44 0 1 0 113.7 108.3" stroke="#0B1626" strokeWidth="14" />
      <polyline points="56,80 72,80 80,62 90,98 98,80 132,80" stroke="#FF5A36" strokeWidth="10" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="/#top" aria-label="City Pulse Solutions">
      <LogoMark />
      <span className="brand-name" dir="ltr">
        City Pulse<small>SOLUTIONS</small>
      </span>
    </a>
  );
}
