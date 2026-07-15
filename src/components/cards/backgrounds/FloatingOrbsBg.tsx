"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingOrbsBg() {
  return (
    <BackgroundShell>
      <FloatingOrbsContent />
    </BackgroundShell>
  );
}

function FloatingOrbsContent() {
  const { dark } = useContext(BgContext);
  const orbs = [
    { c: "#8b5cf6", s: 120, t: "15%", l: "10%", d: 15 },
    { c: "#ec4899", s: 80, t: "60%", l: "80%", d: 18 },
    { c: "#06b6d4", s: 100, t: "70%", l: "15%", d: 20 },
    { c: "#f59e0b", s: 60, t: "25%", l: "70%", d: 12 },
    { c: "#10b981", s: 90, t: "45%", l: "45%", d: 16 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)", perspective: "800px" }}>
        {orbs.map((o, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: o.s, height: o.s, top: o.t, left: o.l,
            background: `radial-gradient(circle at 30% 30%, ${o.c}, transparent)`,
            opacity: dark ? 0.6 : 0.3,
            animation: `orb-${i % 3} ${o.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes orb-0 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,-20px,30px); } }
          @keyframes orb-1 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-30px,30px,-20px); } }
          @keyframes orb-2 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(20px,40px,20px); } }
        `}</style>
      </div>
  );
}
