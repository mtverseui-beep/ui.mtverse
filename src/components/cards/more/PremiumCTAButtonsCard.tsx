"use client";

import { useCallback, useId, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Download, MousePointer2, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type PremiumCTAAction = "download" | "holographic-demo" | "particle-demo" | "start-trial";

export interface PremiumCTAButtonsCardProps {
  onAction?: (action: PremiumCTAAction) => void;
}

type CTAButtonProps = {
  onAction: (action: PremiumCTAAction, label: string) => void;
  reduceMotion: boolean;
};

export function PremiumCTAButtonsCard({ onAction }: PremiumCTAButtonsCardProps = {}) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState("Select a call to action.");
  const runAction = (action: PremiumCTAAction, label: string) => {
    onAction?.(action);
    setStatus(onAction ? `${label} action dispatched.` : `${label} selected in local preview mode.`);
  };

  return (
    <motion.div
      className="relative w-[clamp(280px,92vw,400px)] select-none"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.10), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
              <Sparkles aria-hidden className="h-4 w-4 text-blue-700 dark:text-blue-300" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight cs-text">Premium CTA Buttons</h2>
              <p className="text-[10.5px] cs-muted">Distinct motion, consistent keyboard behavior</p>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-5">
          <CTASection title="Magnetic depth"><Magnetic3DButton onAction={runAction} reduceMotion={Boolean(reduceMotion)} /></CTASection>
          <CTASection title="Holographic shimmer"><HolographicButton onAction={runAction} reduceMotion={Boolean(reduceMotion)} /></CTASection>
          <CTASection title="Pointer trail"><ParticleTrailButton onAction={runAction} reduceMotion={Boolean(reduceMotion)} /></CTASection>
          <CTASection title="Liquid morph"><LiquidMorphButton onAction={runAction} reduceMotion={Boolean(reduceMotion)} /></CTASection>
          <p role="status" aria-live="polite" aria-atomic="true" className="rounded-xl border cs-border cs-input px-3 py-2 text-[10.5px] cs-muted">{status}</p>
        </div>

        <footer className="border-t cs-border px-5 py-2.5 text-center">
          <p className="text-[9.5px] cs-subtle">All CTAs dispatch named actions; motion respects system preferences.</p>
        </footer>
      </div>
    </motion.div>
  );
}

function CTASection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">{title}</h3>{children}</section>;
}

const buttonClass = "relative flex min-h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-700 px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus-visible:ring-offset-slate-950";

function Magnetic3DButton({ onAction, reduceMotion }: CTAButtonProps) {
  const [transform, setTransform] = useState("none");
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const handleMove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setTransform(`perspective(800px) rotateX(${((y - rect.height / 2) / rect.height) * -16}deg) rotateY(${((x - rect.width / 2) / rect.width) * 16}deg) scale(1.02)`);
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  }, [reduceMotion]);
  const reset = () => {
    setTransform("none");
    setSpotlight((current) => ({ ...current, opacity: 0 }));
  };

  return (
    <motion.button type="button" onClick={() => onAction("download", "Download")} onMouseMove={handleMove} onMouseLeave={reset} onBlur={reset} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className={buttonClass} style={{ transform, transformStyle: "preserve-3d" }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 transition-opacity" style={{ background: `radial-gradient(90px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.22), transparent 70%)`, opacity: spotlight.opacity }} />
      <span className="relative z-10 flex items-center gap-2"><Download aria-hidden className="h-4 w-4" />Download resource</span>
    </motion.button>
  );
}

function HolographicButton({ onAction, reduceMotion }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState(50);
  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition(((event.clientX - rect.left) / rect.width) * 100);
  };
  return (
    <motion.button type="button" onClick={() => onAction("holographic-demo", "Holographic demo")} onMouseEnter={() => !reduceMotion && setHovered(true)} onMouseLeave={() => { setHovered(false); setPosition(50); }} onFocus={() => !reduceMotion && setHovered(true)} onBlur={() => setHovered(false)} onMouseMove={handleMove} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className={buttonClass}>
      <motion.span aria-hidden className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} style={{ background: `linear-gradient(${position}deg, rgba(125,211,252,.3), rgba(196,181,253,.3), rgba(103,232,249,.25))`, mixBlendMode: "screen" }} />
      <span className="relative z-10 flex items-center gap-2"><Sparkles aria-hidden className="h-4 w-4" />Open visual demo</span>
    </motion.button>
  );
}

function ParticleTrailButton({ onAction, reduceMotion }: CTAButtonProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const particle = { id: idRef.current++, x: event.clientX - rect.left, y: event.clientY - rect.top };
    setParticles((current) => [...current.slice(-11), particle]);
  };
  return (
    <motion.button type="button" onClick={() => onAction("particle-demo", "Pointer demo")} onMouseMove={handleMove} onMouseLeave={() => setParticles([])} onBlur={() => setParticles([])} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className={buttonClass}>
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <motion.span key={particle.id} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200" style={{ left: particle.x, top: particle.y }} initial={{ opacity: 0.9, scale: 1 }} animate={{ opacity: 0, scale: 0, y: -18 }} transition={{ duration: 0.45, ease: "easeOut" }} onAnimationComplete={() => setParticles((current) => current.filter((item) => item.id !== particle.id))} />
        ))}
      </span>
      <span className="relative z-10 flex items-center gap-2"><MousePointer2 aria-hidden className="h-4 w-4" />Open pointer demo</span>
    </motion.button>
  );
}

function LiquidMorphButton({ onAction, reduceMotion }: CTAButtonProps) {
  const [active, setActive] = useState(false);
  const filterId = useId().replaceAll(":", "");
  return (
    <motion.button type="button" onClick={() => onAction("start-trial", "Start trial")} onMouseEnter={() => !reduceMotion && setActive(true)} onMouseLeave={() => setActive(false)} onFocus={() => !reduceMotion && setActive(true)} onBlur={() => setActive(false)} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className={buttonClass}>
      <svg aria-hidden className="absolute h-0 w-0"><defs><filter id={filterId}><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>
      <motion.span aria-hidden className="flex items-center gap-2" style={{ filter: active ? `url(#${filterId})` : "none" }}>
        <motion.span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20" animate={{ scale: active ? 0.75 : 1, x: active ? 3 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}><ChevronRight className="h-3.5 w-3.5" /></motion.span>
        <motion.span className="h-2 w-2 rounded-full bg-white/30" animate={{ scale: active ? 2.8 : 0, opacity: active ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />
      </motion.span>
      <span className="relative z-10">Start free trial</span>
    </motion.button>
  );
}