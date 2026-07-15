"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GeometricGridBg() {
  return (
    <BackgroundShell>
      <GeometricGridContent />
    </BackgroundShell>
  );
}

function GeometricGridContent() {
  const { dark } = useContext(BgContext);
  return (
    <div className="absolute inset-0" style={{ background: dark ? "#0d1117" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, rgba(99,102,241,${dark ? 0.06 : 0.04}) 12%, transparent 12.5%, transparent 87%, rgba(99,102,241,${dark ? 0.06 : 0.04}) 87.5%), linear-gradient(150deg, rgba(99,102,241,${dark ? 0.06 : 0.04}) 12%, transparent 12.5%, transparent 87%, rgba(99,102,241,${dark ? 0.06 : 0.04}) 87.5%)`,
          backgroundSize: "80px 140px",
        }} />
      </div>
  );
}
