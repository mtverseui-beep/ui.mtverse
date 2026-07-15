"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function LavaLampBg() {
  return (
    <BackgroundShell>
      <LavaLampContent />
    </BackgroundShell>
  );
}

function LavaLampContent() {
  const { dark } = useContext(BgContext);
  const blobs = [
    { c: "#8b5cf6", s: 160, l: "15%", d: 10 },
    { c: "#ec4899", s: 130, l: "40%", d: 12 },
    { c: "#6366f1", s: 150, l: "65%", d: 9 },
    { c: "#a855f7", s: 110, l: "85%", d: 11 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #1a0033, #0f0a1e)" : "linear-gradient(180deg, #fdf4ff, #f0f9ff)" }}>
        {blobs.map((b, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: b.s, height: b.s, left: b.l, bottom: -100,
            background: `radial-gradient(circle at 40% 40%, ${b.c}, transparent)`,
            filter: "blur(10px)", opacity: dark ? 0.5 : 0.2,
            animation: `ll-${i} ${b.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes ll-0 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 60%; transform: scale(1.2); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-1 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 70%; transform: scale(0.9); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-2 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 55%; transform: scale(1.1); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-3 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 65%; transform: scale(1.15); } 100% { bottom: -20%; transform: scale(1); } }
        `}</style>
      </div>
  );
}
