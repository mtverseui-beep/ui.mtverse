"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingCodeBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <FloatingCodeContent />
    </BackgroundShell>
  );
}

function FloatingCodeContent() {
  const { dark } = useContext(BgContext);
  const snippets = [
    { code: "const app = createApp()", t: "15%", l: "10%", d: 20, c: "#3b82f6" },
    { code: "await fetch('/api')", t: "25%", l: "70%", d: 25, c: "#10b981" },
    { code: "useEffect(() => {})", t: "60%", l: "15%", d: 22, c: "#f59e0b" },
    { code: "<Component />", t: "70%", l: "65%", d: 18, c: "#ec4899" },
    { code: "npm install", t: "40%", l: "45%", d: 24, c: "#8b5cf6" },
    { code: "git push origin", t: "85%", l: "35%", d: 19, c: "#06b6d4" },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #0d1117, #161b22)" : "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(139,148,158,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        {snippets.map((s, i) => (
          <div key={i} className="absolute rounded-lg border px-3 py-1.5 font-mono text-[12px] font-medium" style={{
            top: s.t, left: s.l, background: dark ? "rgba(22,27,34,0.7)" : "rgba(255,255,255,0.7)",
            borderColor: `${s.c}40`, color: s.c, backdropFilter: "blur(8px)",
            opacity: dark ? 0.7 : 0.4, animation: `fc-${i % 3} ${s.d}s ease-in-out infinite`,
          }}><span style={{ opacity: 0.5 }}>›</span> {s.code}</div>
        ))}
        <style jsx>{`
          @keyframes fc-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(15px,-20px); } }
          @keyframes fc-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,15px); } }
          @keyframes fc-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,20px); } }
        `}</style>
      </div>
  );
}
