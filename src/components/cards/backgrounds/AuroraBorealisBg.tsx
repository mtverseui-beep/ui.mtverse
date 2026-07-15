"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function AuroraBorealisBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <AuroraBorealisContent />
    </BackgroundShell>
  );
}

function AuroraBorealisContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #020617, #0f172a, #1e1b4b)" : "linear-gradient(180deg, #f0f9ff, #e0f2fe, #ddd6fe)" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
            top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%`,
            opacity: dark ? Math.random() * 0.6 + 0.2 : Math.random() * 0.3 + 0.1,
          }} />
        ))}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            <filter id="ab"><feGaussianBlur stdDeviation="30" /></filter>
            <linearGradient id="abg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="30%" stopColor="#10b981" stopOpacity={dark ? 0.5 : 0.2} />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity={dark ? 0.4 : 0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g filter="url(#ab)">
            <path d="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" fill="url(#abg)">
              <animate attributeName="d" values="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z;M0,250 Q300,350 600,200 T1200,300 L1200,450 Q900,550 600,400 T0,550 Z;M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" dur="15s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
  );
}
