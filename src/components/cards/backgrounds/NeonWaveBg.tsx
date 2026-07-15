"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function NeonWaveBg() {
  return (
    <BackgroundShell>
      <NeonWaveContent />
    </BackgroundShell>
  );
}

function NeonWaveContent() {
  const { dark } = useContext(BgContext);
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800" style={{ background: dark ? "#0a0a0a" : "#f8fafc" }}>
        <defs><filter id="nw"><feGaussianBlur stdDeviation="3" /></filter></defs>
        {[
          { c: dark ? "#6366f1" : "#818cf8", o: 0.4, y: 300, dur: 10 },
          { c: dark ? "#8b5cf6" : "#a78bfa", o: 0.3, y: 400, dur: 12 },
          { c: dark ? "#ec4899" : "#f472b6", o: 0.25, y: 500, dur: 8 },
        ].map((w, i) => (
          <path key={i} d={`M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y}`} fill="none" stroke={w.c} strokeWidth="2" filter="url(#nw)" opacity={w.o}>
            <animate attributeName="d" values={`M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y + 60} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y}`} dur={`${w.dur}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
  );
}
