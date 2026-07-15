"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function LiquidMetalBg() {
  return (
    <BackgroundShell>
      <LiquidMetalContent />
    </BackgroundShell>
  );
}

function LiquidMetalContent() {
  const { dark } = useContext(BgContext);
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600" style={{ background: dark ? "#121214" : "#f4f4f5" }}>
        <defs>
          <linearGradient id="lm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={dark ? "#6366f1" : "#818cf8"} />
            <stop offset="50%" stopColor={dark ? "#8b5cf6" : "#a78bfa"} />
            <stop offset="100%" stopColor={dark ? "#ec4899" : "#f472b6"} />
          </linearGradient>
          <filter id="lmb"><feGaussianBlur stdDeviation="50" /></filter>
        </defs>
        <g filter="url(#lmb)" opacity={dark ? 0.5 : 0.3}>
          <ellipse cx="200" cy="300" rx="180" ry="120" fill="url(#lm)"><animateTransform attributeName="transform" type="rotate" from="0 200 300" to="360 200 300" dur="25s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="600" cy="200" rx="150" ry="180" fill="url(#lm)" opacity="0.7"><animateTransform attributeName="transform" type="rotate" from="360 600 200" to="0 600 200" dur="20s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="400" cy="450" rx="200" ry="100" fill="url(#lm)" opacity="0.6"><animateTransform attributeName="transform" type="rotate" from="0 400 450" to="-360 400 450" dur="30s" repeatCount="indefinite" /></ellipse>
        </g>
      </svg>
  );
}
