"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// StepperQuantityCard — 3 unique quantity selector designs:
// 1. Classic stepper — +/- with number flip animation, shake at limits
// 2. Long-press accelerate — hold + or - to fast-increment with acceleration
// 3. Compact pill — circular +/- with center number, spring on change

export function StepperQuantityCard() {
  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Plus className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Stepper & Quantity</h2><p className="text-[10.5px] cs-muted">Number flip · long-press accelerate · pill style</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <ClassicStepper />
          <LongPressStepper />
          <CompactPillStepper />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Click + / − · hold to accelerate · shake at limits</p></div>
      </div>
    </motion.div>
  );
}

function ClassicStepper() {
  const [val, setVal] = useState(5);
  const [shake, setShake] = useState(0);
  const MIN = 0, MAX = 10;

  const change = (delta: number) => {
    const next = val + delta;
    if (next < MIN || next > MAX) { setShake(delta); setTimeout(() => setShake(0), 400); return; }
    setVal(next);
  };

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Classic Stepper (0–10)</label>
      <motion.div animate={shake !== 0 ? { x: [0, shake > 0 ? 6 : -6, shake > 0 ? -6 : 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-center gap-3">
        <motion.button type="button" onClick={() => change(-1)} whileTap={{ scale: 0.9 }} disabled={val <= MIN} className="flex h-9 w-9 items-center justify-center rounded-lg border cs-border cs-surface cs-text transition cs-hover disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"><Minus className="h-4 w-4" strokeWidth={2.4} /></motion.button>
        <div className="flex h-9 w-12 items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span key={val} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="text-[18px] font-bold tabular-nums cs-text">{val}</motion.span>
          </AnimatePresence>
        </div>
        <motion.button type="button" onClick={() => change(1)} whileTap={{ scale: 0.9 }} disabled={val >= MAX} className="flex h-9 w-9 items-center justify-center rounded-lg border cs-border cs-surface cs-text transition cs-hover disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"><Plus className="h-4 w-4" strokeWidth={2.4} /></motion.button>
      </motion.div>
    </div>
  );
}

function LongPressStepper() {
  const [val, setVal] = useState(1);
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speedRef = useRef(200);

  const startHold = (delta: number) => {
    speedRef.current = 200;
    const tick = () => { setVal(v => Math.max(0, v + delta)); };
    tick();
    holdRef.current = setInterval(() => {
      tick();
      speedRef.current = Math.max(40, speedRef.current * 0.85);
      if (holdRef.current) { clearInterval(holdRef.current); holdRef.current = setInterval(tick, speedRef.current); }
    }, speedRef.current);
  };
  const stopHold = () => { if (holdRef.current) { clearInterval(holdRef.current); holdRef.current = null; } };
  useEffect(() => stopHold, []);

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Long-Press Accelerate (hold +/−)</label>
      <div className="flex items-center justify-center gap-3">
        <motion.button type="button" onMouseDown={() => startHold(-1)} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchStart={() => startHold(-1)} onTouchEnd={stopHold} whileTap={{ scale: 0.9 }} className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"><Minus className="h-4 w-4" strokeWidth={2.4} /></motion.button>
        <div className="flex h-9 min-w-[3rem] items-center justify-center rounded-lg border cs-border cs-input px-2">
          <motion.span key={val} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-[16px] font-bold tabular-nums cs-text">{val}</motion.span>
        </div>
        <motion.button type="button" onMouseDown={() => startHold(1)} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchStart={() => startHold(1)} onTouchEnd={stopHold} whileTap={{ scale: 0.9 }} className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"><Plus className="h-4 w-4" strokeWidth={2.4} /></motion.button>
      </div>
    </div>
  );
}

function CompactPillStepper() {
  const [val, setVal] = useState(3);
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Compact Pill</label>
      <div className="flex items-center justify-center py-1">
        <div className="flex items-center gap-1 rounded-full border cs-border cs-surface p-1">
          <motion.button type="button" onClick={() => setVal(v => Math.max(0, v - 1))} whileTap={{ scale: 0.85 }} className="flex h-8 w-8 items-center justify-center rounded-full cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"><Minus className="h-3.5 w-3.5 cs-text" strokeWidth={2.4} /></motion.button>
          <motion.span key={val} initial={{ scale: 1.3, color: "#2563eb" }} animate={{ scale: 1, color: "var(--card-text)" }} className="w-8 text-center text-[15px] font-bold tabular-nums">{val}</motion.span>
          <motion.button type="button" onClick={() => setVal(v => v + 1)} whileTap={{ scale: 0.85 }} className="flex h-8 w-8 items-center justify-center rounded-full cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"><Plus className="h-3.5 w-3.5 cs-text" strokeWidth={2.4} /></motion.button>
        </div>
      </div>
    </div>
  );
}
