"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function TopographicBg() {
  return (
    <BackgroundShell>
      <TopographicContent />
    </BackgroundShell>
  );
}

function TopographicContent() {
  const { dark } = useContext(BgContext);
  const paths = Array.from({ length: 12 }, (_, i) => {
    const y = 60 + i * 50;
    const v = 30 + Math.sin(i * 0.5) * 20;
    return `M0,${y} Q200,${y - v} 400,${y} T800,${y} T1200,${y}`;
  });
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "#0a1a0f" : "#f0fdf4" }}>
      <defs>
        <linearGradient id="tg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity={dark ? 0.4 : 0.2} />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity={dark ? 0.15 : 0.08} />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="url(#tg)" strokeWidth="1" opacity={0.4 + i / 30} />
      ))}
    </svg>
  );
}
