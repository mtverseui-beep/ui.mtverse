"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function DotMatrixBg() {
  return (
    <BackgroundShell>
      <Dots />
    </BackgroundShell>
  );
}

function Dots() {
  const { dark } = useContext(BgContext);
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{x:number;y:number;id:number}[]>([]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setRipples(p => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id: Date.now() }].slice(-4));
    };
    el.addEventListener("click", h);
    return () => el.removeEventListener("click", h);
  }, []);
  useEffect(() => { if (!ripples.length) return; const t = setTimeout(() => setRipples(p => p.slice(0, -1)), 2000); return () => clearTimeout(t); }, [ripples]);
  return (
    <div ref={ref} className="absolute inset-0 cursor-pointer" style={{ background: dark ? "#0f172a" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(99,102,241,${dark ? 0.3 : 0.15}) 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }} />
      {ripples.map(r => (
        <div key={r.id} className="absolute rounded-full pointer-events-none" style={{ left: r.x, top: r.y, width: 10, height: 10, marginLeft: -5, marginTop: -5, border: "2px solid #8b5cf6", animation: "dm-rip 2s ease-out forwards" }} />
      ))}
      <style jsx>{`@keyframes dm-rip { 0% { width:10px; height:10px; margin-left:-5px; margin-top:-5px; opacity:1; } 100% { width:300px; height:300px; margin-left:-150px; margin-top:-150px; opacity:0; } }`}</style>
    </div>
  );
}
