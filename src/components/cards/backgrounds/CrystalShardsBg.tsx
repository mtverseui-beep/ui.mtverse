"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function CrystalShardsBg() {
  return (
    <BackgroundShell>
      <CrystalShardsContent />
    </BackgroundShell>
  );
}

function CrystalShardsContent() {
  const { dark } = useContext(BgContext);
  const shards = Array.from({ length: 6 }, (_, i) => ({
    x: 10 + i * 16, y: 15 + (i % 3) * 25, size: 50 + (i % 3) * 30,
    dur: 20 + i * 3, delay: i * 0.8, hue: 200 + i * 30,
  }));
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "linear-gradient(135deg, #0a0a1a, #1a0a2a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)" }}>
        <defs>
          {shards.map((s, i) => (
            <linearGradient key={i} id={`cs${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsla(${s.hue},70%,60%,${dark ? 0.3 : 0.15})`} />
              <stop offset="100%" stopColor={`hsla(${s.hue + 60},70%,40%,0)`} />
            </linearGradient>
          ))}
        </defs>
        {shards.map((s, i) => (
          <polygon key={i} points={`${s.x},${s.y - s.size / 2} ${s.x + s.size / 3},${s.y} ${s.x},${s.y + s.size / 2} ${s.x - s.size / 3},${s.y}`} fill={`url(#cs${i})`} stroke={`hsla(${s.hue},70%,70%,${dark ? 0.4 : 0.2})`} strokeWidth="0.5" style={{ transformOrigin: `${s.x}px ${s.y}px`, animation: `cs-${i % 2} ${s.dur}s linear infinite`, animationDelay: `${s.delay}s` }} />
        ))}
        <style jsx>{`
          @keyframes cs-0 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes cs-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        `}</style>
      </svg>
  );
}
