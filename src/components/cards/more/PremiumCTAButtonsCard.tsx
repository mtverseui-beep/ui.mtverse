"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, ChevronRight, MousePointer2, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// PremiumCTAButtonsCard — 5 advanced CTA designs.
// Professional slate/neutral palette. Compact width.
// 1. Aurora mesh  2. Magnetic 3D  3. Holographic  4. Particle trail  5. Liquid morph

export function PremiumCTAButtonsCard() {
  return (
    <motion.div
      className="w-[clamp(280px,88vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(100,116,139,0.08), transparent 55%)" }} />

      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-500/10 ring-1 ring-slate-500/20">
              <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight cs-text">Premium CTA Buttons</h2>
              <p className="text-[10.5px] cs-muted">Aurora · magnetic 3D · holographic · trail · liquid morph</p>
            </div>
          </div>
        </div>

        <div className="space-y-7 p-5">
          <div><label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Magnetic 3D Tilt</label><Magnetic3DButton /></div>
          <div><label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Holographic Shimmer</label><HolographicButton /></div>
          <div><label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Particle Trail</label><ParticleTrailButton /></div>
          <div><label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">4 · Liquid Metal Morph</label><LiquidMorphButton /></div>
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center">
          <p className="text-[9.5px] cs-subtle">Hover each button — completely different interaction engines</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── 1. Magnetic 3D tilt — blue button with spotlight ──
function Magnetic3DButton() {
  const [transform, setTransform] = useState("");
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    setTransform(`perspective(800px) rotateX(${((y - cy) / cy) * -12}deg) rotateY(${((x - cx) / cx) * 12}deg) scale(1.03)`);
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  }, []);

  return (
    <motion.button type="button" onMouseMove={handleMove} onMouseLeave={() => { setTransform("perspective(800px) rotateX(0) rotateY(0) scale(1)"); setSpotlight(s => ({ ...s, opacity: 0 })); }} whileTap={{ scale: 0.96 }} className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-700 px-5 py-2.5 text-[12.5px] font-semibold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ transform, transformStyle: "preserve-3d" }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300" style={{ background: `radial-gradient(80px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.15), transparent 70%)`, opacity: spotlight.opacity }} />
      <span className="relative z-10 flex items-center gap-2"><Download className="h-4 w-4" strokeWidth={2.2} /> Download Free</span>
    </motion.button>
  );
}

// ── 3. Holographic shimmer — subtle silver/steel holographic ──
function HolographicButton() {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState(50);
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => { const rect = e.currentTarget.getBoundingClientRect(); setPos(((e.clientX - rect.left) / rect.width) * 100); };

  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setPos(50); }} onMouseMove={handleMove} className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-600/30 bg-blue-600 px-5 py-2.5 text-[12.5px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-blue-900">
      <motion.span aria-hidden className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0, background: `linear-gradient(${pos}deg, rgba(148,163,184,0.2), rgba(203,213,225,0.2), rgba(100,116,139,0.2), rgba(148,163,184,0.2))` }} transition={{ duration: 0.2 }} style={{ mixBlendMode: "overlay" }} />
      <motion.span aria-hidden className="absolute inset-0" animate={{ x: hovered ? "100%" : "-100%" }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ background: "linear-gradient(90deg, transparent, rgba(203,213,225,0.3), transparent)", width: "50%" }} />
      <span className="relative z-10 flex items-center gap-2"><Sparkles className="h-4 w-4" strokeWidth={2.2} /> Try Holographic</span>
    </motion.button>
  );
}

// ── 4. Particle trail — neutral particles ──
function ParticleTrailButton() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => { const rect = e.currentTarget.getBoundingClientRect(); const id = idRef.current++; setParticles(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]); setTimeout(() => setParticles(p => p.filter(pp => pp.id !== id)), 600); };

  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} onMouseMove={handleMove} className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-5 py-2.5 text-[12.5px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
      <div className="pointer-events-none absolute inset-0">
        {particles.map(p => <motion.span key={p.id} className="absolute h-1.5 w-1.5 rounded-full bg-slate-300" style={{ left: p.x, top: p.y }} initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0, y: -20 }} transition={{ duration: 0.6, ease: "easeOut" }} />)}
      </div>
      <span className="relative z-10 flex items-center gap-2"><MousePointer2 className="h-4 w-4" strokeWidth={2.2} /> Hover for Trail</span>
    </motion.button>
  );
}

// ── 5. Liquid metal morph — SVG goo, slate + emerald accent ──
function LiquidMorphButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-blue-600 px-5 py-2.5 text-[12.5px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-blue-900">
      <svg className="absolute h-0 w-0"><defs><filter id="goo2"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>
      <motion.div className="flex items-center gap-2" style={{ filter: hovered ? "url(#goo2)" : "none" }}>
        <motion.div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-600" animate={{ scale: hovered ? 0.6 : 1, x: hovered ? 2 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}><ChevronRight className="h-3.5 w-3.5 text-white" strokeWidth={2.6} /></motion.div>
        <motion.div className="h-2 w-2 rounded-full bg-slate-600" animate={{ scale: hovered ? 3 : 0, opacity: hovered ? 1 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} />
      </motion.div>
      <motion.span animate={{ x: hovered ? -4 : 0, color: hovered ? "#94a3b8" : "#fff" }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="relative z-10">Start Free Trial</motion.span>
    </motion.button>
  );
}
