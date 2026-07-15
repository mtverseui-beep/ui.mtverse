"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function CyberGridBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <CyberGridContent />
    </BackgroundShell>
  );
}

function CyberGridContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#1a1a2e" }}>
        <div className="absolute inset-0" style={{ perspective: "400px" }}>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", transform: "rotateX(60deg)", transformOrigin: "bottom",
            animation: "cg 4s linear infinite",
          }} />
        </div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(255,0,128,0.3), transparent)", borderRadius: "50%", filter: "blur(30px)" }} />
        <style jsx>{`@keyframes cg { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }`}</style>
      </div>
  );
}
