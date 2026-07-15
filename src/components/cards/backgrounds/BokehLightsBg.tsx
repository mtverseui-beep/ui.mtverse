"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function BokehLightsBg() {
  return (
    <BackgroundShell>
      <BokehLightsContent />
    </BackgroundShell>
  );
}

function BokehLightsContent() {
  const { dark } = useContext(BgContext);
  const orbs = [
    { c: "#ec4899", s: 200, t: "10%", l: "15%", d: 18 },
    { c: "#8b5cf6", s: 300, t: "50%", l: "70%", d: 22 },
    { c: "#06b6d4", s: 150, t: "70%", l: "25%", d: 15 },
    { c: "#f59e0b", s: 250, t: "20%", l: "80%", d: 20 },
    { c: "#10b981", s: 180, t: "75%", l: "65%", d: 16 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a0820, #0d1117)" : "linear-gradient(135deg, #fdf2f8, #f0f9ff)" }}>
        {orbs.map((o, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: o.s, height: o.s, top: o.t, left: o.l,
            background: `radial-gradient(circle, ${o.c}80, transparent)`,
            filter: "blur(20px)", opacity: dark ? 0.6 : 0.25,
            animation: `bk-${i % 3} ${o.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes bk-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
          @keyframes bk-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,40px); } }
          @keyframes bk-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,30px); } }
        `}</style>
      </div>
  );
}
