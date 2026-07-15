"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function AnimatedGridGlowBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <Grid />
    </BackgroundShell>
  );
}

function Grid() {
  const { dark } = useContext(BgContext);
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener("mousemove", h);
    return () => el.removeEventListener("mousemove", h);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 cursor-crosshair" style={{ background: dark ? "#0a0a0f" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,${dark ? 0.08 : 0.04}) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,${dark ? 0.08 : 0.04}) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 300px at ${mouse.x}% ${mouse.y}%, rgba(139,92,246,${dark ? 0.2 : 0.1}), transparent 70%)` }} />
    </div>
  );
}
