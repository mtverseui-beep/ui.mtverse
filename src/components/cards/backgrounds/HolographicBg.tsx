"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function HolographicBg() {
  return (
    <BackgroundShell>
      <HolographicContent />
    </BackgroundShell>
  );
}

function HolographicContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)`,
          backgroundSize: "400% 400%", animation: "hg 12s ease infinite",
          filter: "blur(50px)", opacity: dark ? 0.3 : 0.1,
        }} />
      <style jsx>{`@keyframes hg { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
    </div>
  );
}
