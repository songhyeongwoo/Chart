"use client";

export function Logo({ dark = false }: { dark?: boolean }) {
  const fg = dark ? "#F5F6F8" : "#0B0D14";
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22">
        <rect x="1" y="1" width="20" height="20" rx="5" fill={fg} />
        <path d="M5 15 L5 8 L9 12 L13 7 L13 15" stroke={dark ? "#0B0D14" : "#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="17" cy="7.5" r="1.6" fill="#2B3BFF" />
      </svg>
      <span style={{ color: fg, letterSpacing: "-0.02em", fontWeight: 600, fontSize: 16 }}>MAC</span>
      <span style={{ color: dark ? "#6E7488" : "#9AA0B1", fontSize: 11, marginLeft: 2, letterSpacing: "0.08em" }}>STUDIO</span>
    </div>
  );
}

