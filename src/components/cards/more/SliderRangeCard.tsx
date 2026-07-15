"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// SliderRangeCard — 3 unique slider variants:
// 1. Dual range — min + max thumbs with gradient track + tooltips
// 2. Single value — one thumb with spring tooltip + value display
// 3. Stepped — discrete segments with click-to-set + active fill

export function SliderRangeCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"><span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">↔</span></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Range Slider</h2><p className="text-[10.5px] cs-muted">Dual · single · stepped — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <DualRangeSlider />
          <SingleValueSlider />
          <SteppedSlider />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Drag thumbs · click track · 3 slider patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Dual range ──
function DualRangeSlider() {
  const [min, setMin] = useState(250);
  const [max, setMax] = useState(750);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const MIN = 0, MAX = 1000, GAP = 50;
  const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

  const move = (e: React.MouseEvent) => {
    if (!activeThumb || !trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const v = Math.round(MIN + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (MAX - MIN));
    if (activeThumb === "min") setMin(Math.min(v, max - GAP)); else setMax(Math.max(v, min + GAP));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Dual Range</span><span className="text-[11px] font-semibold cs-text">${min} — ${max}</span></div>
      <div className="relative py-3" onMouseMove={move} onMouseUp={() => setActiveThumb(null)} onMouseLeave={() => setActiveThumb(null)}>
        <div ref={trackRef} className="relative h-2 cursor-pointer rounded-full" style={{ background: "var(--card-border)" }} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const v = Math.round(MIN + ((e.clientX - r.left) / r.width) * (MAX - MIN)); if (Math.abs(v - min) < Math.abs(v - max)) setMin(Math.min(v, max - GAP)); else setMax(Math.max(v, min + GAP)); }}>
          <div className="absolute inset-y-0 rounded-full" style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%`, background: "linear-gradient(90deg, #8b5cf6, #6366f1)" }} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${pct(min)}%` }}>
          <SliderTip show={activeThumb === "min"} value={`$${min}`} />
          <motion.button type="button" onMouseDown={() => setActiveThumb("min")} whileTap={{ scale: 0.9 }} animate={{ scale: activeThumb === "min" ? 1.3 : 1, boxShadow: activeThumb === "min" ? "0 0 16px rgba(139,92,246,0.5)" : "0 2px 6px rgba(0,0,0,0.15)" }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="h-5 w-5 rounded-full border-2 border-violet-500 bg-white shadow-md dark:bg-slate-200 focus-visible:outline-none" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${pct(max)}%` }}>
          <SliderTip show={activeThumb === "max"} value={`$${max}`} />
          <motion.button type="button" onMouseDown={() => setActiveThumb("max")} whileTap={{ scale: 0.9 }} animate={{ scale: activeThumb === "max" ? 1.3 : 1, boxShadow: activeThumb === "max" ? "0 0 16px rgba(99,102,241,0.5)" : "0 2px 6px rgba(0,0,0,0.15)" }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="h-5 w-5 rounded-full border-2 border-indigo-500 bg-white shadow-md dark:bg-slate-200 focus-visible:outline-none" />
        </div>
      </div>
    </div>
  );
}

// ── 2. Single value ──
function SingleValueSlider() {
  const [val, setVal] = useState(60);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    setVal(Math.round(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Single Value</span><span className="text-[11px] font-semibold cs-text">{val}%</span></div>
      <div className="relative py-3" onMouseMove={move} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}>
        <div ref={trackRef} className="relative h-2 cursor-pointer rounded-full" style={{ background: "var(--card-border)" }} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setVal(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${val}%`, background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${val}%` }}>
          <SliderTip show={dragging} value={`${val}%`} />
          <motion.button type="button" onMouseDown={() => setDragging(true)} whileTap={{ scale: 0.9 }} className="h-6 w-6 rounded-full border-2 border-blue-500 bg-white shadow-lg dark:bg-slate-200 focus-visible:outline-none" />
        </div>
      </div>
    </div>
  );
}

// ── 3. Stepped — discrete segments ──
function SteppedSlider() {
  const [step, setStep] = useState(3);
  const STEPS = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Stepped</span><span className="text-[11px] font-semibold cs-text">{STEPS[step]}</span></div>
      <div className="relative py-2">
        <div className="flex items-center gap-1.5">
          {STEPS.map((label, i) => (
            <motion.button key={label} type="button" onClick={() => setStep(i)} whileTap={{ scale: 0.92 }} className="relative flex-1 overflow-hidden rounded-lg py-2 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40" style={{ color: i <= step ? "#fff" : "var(--card-text-muted)", background: i <= step ? "linear-gradient(135deg, #10b981, #059669)" : "var(--card-input-bg)", border: `1px solid ${i <= step ? "#10b981" : "var(--card-border)"}` }}>
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SliderTip({ show, value }: { show: boolean; value: string }) {
  return (
    <motion.div animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4, scale: show ? 1 : 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-slate-700">
      {value}<span className="absolute -bottom-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-700" />
    </motion.div>
  );
}
