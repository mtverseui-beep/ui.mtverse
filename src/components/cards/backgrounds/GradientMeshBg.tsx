"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GradientMeshBg() {
  return (
    <BackgroundShell>
      <GradientMeshContent />
    </BackgroundShell>
  );
}

function GradientMeshContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4, #3b82f6, #8b5cf6)`,
          animation: "gm-rot 30s linear infinite", filter: "blur(80px)", opacity: dark ? 0.4 : 0.15,
        }} />
      <style jsx>{`@keyframes gm-rot { 0% { transform: rotate(0deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1.5); } }`}</style>
    </div>
  );
}
