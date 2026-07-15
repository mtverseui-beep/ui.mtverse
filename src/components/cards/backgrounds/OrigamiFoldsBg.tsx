"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function OrigamiFoldsBg() {
  return (
    <BackgroundShell darkDefault={false}>
      <OrigamiFoldsContent />
    </BackgroundShell>
  );
}

function OrigamiFoldsContent() {
  const { dark } = useContext(BgContext);
  const planes = Array.from({ length: 8 }, (_, i) => ({
    x: 10 + i * 12, y: 15 + (i % 3) * 25, size: 30 + (i % 3) * 20,
    dur: 18 + i * 2, delay: i * 0.5,
    c: ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"][i % 5],
  }));
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff, #f0fdfa)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            {planes.map((p, i) => (
              <linearGradient key={i} id={`of${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={p.c} stopOpacity={dark ? 0.5 : 0.25} />
                <stop offset="100%" stopColor={p.c} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {planes.map((p, i) => (
            <g key={i} style={{ transform: `translate(${p.x * 12}px, ${p.y * 8}px)`, animation: `of-${i % 2} ${p.dur}s ease-in-out infinite`, animationDelay: `${p.delay}s` }}>
              <g style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: "center" }}>
                <polygon points={`0,0 ${p.size},${p.size / 3} 0,${p.size / 2} ${p.size / 4},${p.size / 4}`} fill={`url(#of${i})`} stroke={p.c} strokeWidth="0.5" opacity={dark ? 0.6 : 0.3} />
              </g>
            </g>
          ))}
          <style jsx>{`
            @keyframes of-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
            @keyframes of-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
          `}</style>
        </svg>
      </div>
  );
}
