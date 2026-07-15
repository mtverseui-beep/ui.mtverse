"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function NoiseTextureBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <NoiseTextureContent />
    </BackgroundShell>
  );
}

function NoiseTextureContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" : "linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: dark ? 0.06 : 0.04, mixBlendMode: "overlay",
        }} />
        <div className="absolute inset-0" style={{ background: dark ? "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)" : "none" }} />
      </div>
  );
}
