"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, UploadCloud, CreditCard, RotateCcw, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// LoadingStateButtonsCard — 4 premium async button designs.
// Professional slate/neutral palette. Compact width.
// 1. Liquid wave fill  2. Particle burst  3. Icon morph  4. Progress ring

type BtnState = "idle" | "loading" | "success";

export function LoadingStateButtonsCard() {
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
              <Loader2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight cs-text">Loading State Buttons</h2>
              <p className="text-[10.5px] cs-muted">Liquid wave · particle burst · icon morph · progress ring</p>
            </div>
          </div>
        </div>

        <div className="space-y-7 p-5">
          <LiquidWaveButton />
          <ParticleBurstButton />
          <IconMorphButton />
          <ProgressRingButton />
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center">
          <p className="text-[9.5px] cs-subtle">Click any button — each has a different loading mechanic</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── 1. Liquid wave fill ──
function LiquidWaveButton() {
  const [state, setState] = useState<BtnState>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading"); setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 15 + 8;
      if (p >= 100) { p = 100; setProgress(100); if (intervalRef.current) clearInterval(intervalRef.current); setTimeout(() => setState("success"), 300); setTimeout(() => { setState("idle"); setProgress(0); }, 2800); }
      else setProgress(p);
    }, 180);
  };
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Liquid Wave Fill</label>
      <motion.button type="button" onClick={handleClick} disabled={state !== "idle"} whileTap={state === "idle" ? { scale: 0.97 } : undefined} className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-2.5 text-[12.5px] font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ background: state === "success" ? "#059669" : "#2563eb" }}>
        {state === "loading" && (
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs><linearGradient id="lw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#475569" stopOpacity="0.9" /><stop offset="100%" stopColor="#334155" stopOpacity="1" /></linearGradient></defs>
            <motion.path d="M0,100 L0,50 Q25,40 50,50 T100,50 L100,100 Z" fill="url(#lw)" animate={{ d: ["M0,100 L0,50 Q25,40 50,50 T100,50 L100,100 Z", "M0,100 L0,50 Q25,60 50,50 T100,50 L100,100 Z", "M0,100 L0,50 Q25,40 50,50 T100,50 L100,100 Z"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ transform: `translateY(${100 - progress}%)` }} />
          </svg>
        )}
        <span className="relative z-10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {state === "idle" && <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><UploadCloud className="h-4 w-4" strokeWidth={2.2} /> Upload</motion.span>}
            {state === "loading" && <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Uploading… {Math.round(progress)}%</motion.span>}
            {state === "success" && <motion.span key="s" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Check className="h-4 w-4" strokeWidth={2.6} /> Done</motion.span>}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}

// ── 2. Particle burst — neutral particles ──
function ParticleBurstButton() {
  const [state, setState] = useState<BtnState>("idle");
  const [particles, setParticles] = useState<{ id: number; angle: number; distance: number }[]>([]);

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setParticles(Array.from({ length: 14 }, (_, i) => ({ id: Date.now() + i, angle: (i / 14) * 360, distance: 50 + Math.random() * 30 })));
      setTimeout(() => { setState("idle"); setParticles([]); }, 2500);
    }, 1500);
  };

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Particle Burst</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.span key={p.id} className="absolute h-1.5 w-1.5 rounded-full bg-slate-400" initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos((p.angle * Math.PI) / 180) * p.distance, y: Math.sin((p.angle * Math.PI) / 180) * p.distance, opacity: 0, scale: 0.3 }} transition={{ duration: 0.8, ease: "easeOut" }} />
            ))}
          </AnimatePresence>
        </div>
        <motion.button type="button" onClick={handleClick} disabled={state !== "idle"} whileTap={state === "idle" ? { scale: 0.97 } : undefined} className="relative flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[12.5px] font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ background: state === "success" ? "#059669" : state === "loading" ? "#1e40af" : "#2563eb" }}>
          <span className="relative z-10 flex items-center gap-2">
            <AnimatePresence mode="wait">
              {state === "idle" && <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Sparkles className="h-4 w-4" strokeWidth={2.2} /> Activate</motion.span>}
              {state === "loading" && <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} /> Working…</motion.span>}
              {state === "success" && <motion.span key="s" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Check className="h-4 w-4" strokeWidth={2.6} /> Done</motion.span>}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// ── 3. Icon morph ──
function IconMorphButton() {
  const [state, setState] = useState<BtnState>("idle");
  const handleClick = () => { if (state !== "idle") return; setState("loading"); setTimeout(() => { setState("success"); setTimeout(() => setState("idle"), 2200); }, 1600); };

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Icon Morph</label>
      <motion.button type="button" onClick={handleClick} disabled={state !== "idle"} whileTap={state === "idle" ? { scale: 0.97 } : undefined} className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border cs-border cs-surface py-2.5 text-[12.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
        <span className="relative z-10 flex items-center gap-2 cs-text">
          <div className="flex h-5 w-5 items-center justify-center">
            <AnimatePresence mode="wait">
              {state === "idle" && <motion.div key="ii" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}><CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-300" strokeWidth={2.2} /></motion.div>}
              {state === "loading" && <motion.div key="ll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="h-5 w-5 rounded-full border-2 border-slate-400/30 border-t-slate-600 dark:border-t-slate-300" animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} /></motion.div>}
              {state === "success" && <motion.div key="ss" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500"><Check className="h-3 w-3 text-white" strokeWidth={3.5} /></div></motion.div>}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {state === "idle" && <motion.span key="t1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Pay $129.00</motion.span>}
            {state === "loading" && <motion.span key="t2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cs-muted">Processing…</motion.span>}
            {state === "success" && <motion.span key="t3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-600 dark:text-emerald-400">Complete</motion.span>}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}

// ── 4. Progress ring ──
function ProgressRingButton() {
  const [state, setState] = useState<BtnState>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const R = 16, C = 2 * Math.PI * R;

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading"); setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 5;
      if (p >= 100) { p = 100; setProgress(100); if (intervalRef.current) clearInterval(intervalRef.current); setState("success"); setTimeout(() => { setState("idle"); setProgress(0); }, 2200); }
      else setProgress(p);
    }, 80);
  };
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider cs-subtle">4 · Progress Ring</label>
      <motion.button type="button" onClick={handleClick} disabled={state !== "idle"} whileTap={state === "idle" ? { scale: 0.97 } : undefined} className="relative flex w-full items-center justify-center gap-3 rounded-xl py-2.5 text-[12.5px] font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ background: state === "success" ? "#059669" : "#2563eb" }}>
        <span className="relative z-10 flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
              {state !== "idle" && <motion.circle cx="20" cy="20" r={R} fill="none" stroke={state === "success" ? "#fff" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} animate={{ strokeDashoffset: C - (progress / 100) * C }} transition={{ duration: 0.1 }} />}
            </svg>
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {state === "idle" && <motion.div key="i" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><RotateCcw className="h-3.5 w-3.5" strokeWidth={2.4} /></motion.div>}
                {state === "loading" && <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] font-bold tabular-nums">{progress}%</motion.span>}
                {state === "success" && <motion.div key="s" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-3.5 w-3.5" strokeWidth={3} /></motion.div>}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {state === "idle" && <motion.span key="t1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sync Data</motion.span>}
            {state === "loading" && <motion.span key="t2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Syncing…</motion.span>}
            {state === "success" && <motion.span key="t3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Synced</motion.span>}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}
