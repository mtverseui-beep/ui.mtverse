"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GlassmorphismBlurBg() {
  return (
    <BackgroundShell darkDefault={false}>
      <GlassmorphismBlurContent />
    </BackgroundShell>
  );
}

function GlassmorphismBlurContent() {
  const { dark } = useContext(BgContext);
  const blobs = [
    { c: "#8b5cf6", s: 250, t: "10%", l: "15%", d: 18 },
    { c: "#ec4899", s: 200, t: "60%", l: "70%", d: 20 },
    { c: "#06b6d4", s: 180, t: "70%", l: "25%", d: 16 },
    { c: "#f59e0b", s: 220, t: "30%", l: "75%", d: 22 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff, #f0fdfa)" }}>
        {blobs.map((b, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: b.s, height: b.s, top: b.t, left: b.l,
            background: b.c, filter: "blur(40px)", opacity: dark ? 0.4 : 0.15,
            animation: `gb-${i % 2} ${b.d}s ease-in-out infinite`,
          }} />
        ))}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-2xl" style={{
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.2)"}`,
            }} />
          ))}
        </div>
        <style jsx>{`
          @keyframes gb-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
          @keyframes gb-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-25px,30px); } }
        `}</style>
      </div>
  );
}
