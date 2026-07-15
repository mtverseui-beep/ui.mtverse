"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GradientWavesBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <GradientWavesContent />
    </BackgroundShell>
  );
}

function GradientWavesContent() {
  const { dark } = useContext(BgContext);
  const waves = [
    { c: "#6366f1", o: 0.4, y: 350, dur: 10 },
    { c: "#8b5cf6", o: 0.3, y: 400, dur: 12 },
    { c: "#a855f7", o: 0.25, y: 450, dur: 14 },
    { c: "#ec4899", o: 0.2, y: 500, dur: 11 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #f8fafc, #e0e7ff)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            {waves.map((w, i) => (
              <linearGradient key={i} id={`gw${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={w.c} stopOpacity="0" />
                <stop offset="50%" stopColor={w.c} stopOpacity={dark ? w.o : w.o * 0.4} />
                <stop offset="100%" stopColor={w.c} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {waves.map((w, i) => (
            <path key={i} fill="none" stroke={`url(#gw${i})`} strokeWidth="2" d={`M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y}`}>
              <animate attributeName="d" values={`M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y + 80} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y}`} dur={`${w.dur}s`} repeatCount="indefinite" />
            </path>
          ))}
        </svg>
      </div>
  );
}
