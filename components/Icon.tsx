import type { ReactNode } from "react";
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    websites: (
      <>
        <rect x="3" y="4" width="26" height="23" rx="3" />
        <path d="M3 11h26M8 7.5h.1m4 0h.1M13 16l-4 4 4 4m6-8 4 4-4 4" />
      </>
    ),
    marketing: (
      <>
        <path d="M5 14h7l13-7v18l-13-7H5zM8 18l2 9h5l-3-9M28 12l2-2m-2 10 2 2" />
        <path d="M12 14v4" />
      </>
    ),
    "ai-marketing": (
      <>
        <path d="m16 3 3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5zM26 3v6m-3-3h6" />
      </>
    ),
    "mobile-apps": (
      <>
        <rect x="8" y="2" width="16" height="28" rx="4" />
        <path d="M13 6h6m-4 20h2M8 22h16" />
      </>
    ),
    automation: (
      <>
        <rect x="12" y="2" width="8" height="8" rx="2" />
        <rect x="2" y="22" width="8" height="8" rx="2" />
        <rect x="22" y="22" width="8" height="8" rx="2" />
        <path d="M16 10v6M6 22v-6h20v6" />
      </>
    ),
    arrow: <path d="M6 16h20m-8-8 8 8-8 8" />,
    diagonal: <path d="M8 24 24 8H9m15 0v15" />,
    mail: (
      <>
        <rect x="3" y="6" width="26" height="20" rx="3" />
        <path d="m4 8 12 10L28 8" />
      </>
    ),
    phone: (
      <path d="m8 3 5 7-4 4c2 4 5 7 9 9l4-4 7 5c-1 5-4 7-8 5C11 25 5 19 2 10 1 6 4 3 8 3Z" />
    ),
    location: (
      <>
        <path d="M26 13c0 8-10 17-10 17S6 21 6 13a10 10 0 1 1 20 0Z" />
        <circle cx="16" cy="13" r="3" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.arrow}
    </svg>
  );
}
