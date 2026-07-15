"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function ColorAudioBarsBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <ColorAudioBarsContent />
    </BackgroundShell>
  );
}

function ColorAudioBarsContent() {
  const { dark } = useContext(BgContext);
  const bars = Array.from({ length: 40 }, (_, i) => ({ h: 20 + Math.random() * 60, delay: i * 0.04, dur: 0.8 + Math.random() * 0.6, hue: 280 + (i / 40) * 80 }));
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #faf5ff, #f3e8ff)" }}>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-4" style={{ height: "60%" }}>
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{
              background: `linear-gradient(180deg, hsl(${b.hue},70%,${dark ? 60 : 50}%), hsl(${b.hue + 40},70%,${dark ? 40 : 30}%))`,
              height: `${b.h}%`, opacity: dark ? 0.7 : 0.3,
              animation: `ab ${b.dur}s ease-in-out infinite alternate`, animationDelay: `${b.delay}s`, maxWidth: "6px",
            }} />
          ))}
        </div>
        <style jsx>{`@keyframes ab { 0% { height: 15%; } 100% { height: 75%; } }`}</style>
      </div>
  );
}
