"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function MeshGradientBg() {
  return (
    <BackgroundShell>
      <MeshGradientContent />
    </BackgroundShell>
  );
}

function MeshGradientContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(at 20% 20%, rgba(139,92,246,${dark ? 0.6 : 0.2}) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(236,72,153,${dark ? 0.5 : 0.15}) 0px, transparent 50%), radial-gradient(at 60% 80%, rgba(6,182,212,${dark ? 0.5 : 0.15}) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(245,158,11,${dark ? 0.4 : 0.1}) 0px, transparent 50%)`,
          backgroundSize: "150% 150%", animation: "mg 15s ease-in-out infinite",
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <style jsx>{`@keyframes mg { 0%,100% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } }`}</style>
    </div>
  );
}
