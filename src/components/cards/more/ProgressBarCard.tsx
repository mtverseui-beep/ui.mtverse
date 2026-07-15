"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Loader2, Check, Zap } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProgressBarCard() {
  return (
    <motion.div className="w-[clamp(320px,95vw,520px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"><Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Progress Bar</h2><p className="text-[10.5px] cs-muted">Linear · circular · segmented — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <LinearProgress />
          <CircularProgress />
          <SegmentedProgress />
        </div>
        <div className="border-t cs-border px-5 py-2 text-center"><p className="text-[9px] cs-subtle">3 completely different progress patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Linear — animated fill with shimmer + label ──
function LinearProgress() {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (state !== "idle") return;
    setState("loading"); setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { if (intervalRef.current) clearInterval(intervalRef.current); setState("done"); setTimeout(() => { setState("idle"); setProgress(0); }, 2000); return 100; }
        return p + 5;
      });
    }, 100);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Linear Shimmer</span><span className="text-[10px] font-semibold cs-text">{progress}%</span></div>
      <div className="relative h-3 overflow-hidden rounded-full" style={{ background: "var(--card-border)" }}>
        {/* Fill */}
        <motion.div className="absolute inset-y-0 left-0 rounded-full" animate={{ width: `${progress}%`, background: state === "done" ? "#10b981" : "linear-gradient(90deg, #3b82f6, #6366f1)" }} transition={{ duration: 0.1 }}>
          {/* Shimmer sweep */}
          {state === "loading" && <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: "progress-shimmer 1.2s linear infinite" }} />}
        </motion.div>
      </div>
      <style>{`@keyframes progress-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
      <motion.button type="button" onClick={start} whileTap={{ scale: 0.97 }} disabled={state !== "idle"} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border cs-border cs-input py-1.5 text-[10px] font-semibold cs-text transition cs-hover disabled:opacity-50">
        {state === "idle" && <><Download className="h-3 w-3" strokeWidth={2.2} /> Start Download</>}
        {state === "loading" && <><Loader2 className="h-3 w-3 animate-spin" strokeWidth={2.2} /> Downloading...</>}
        {state === "done" && <><Check className="h-3 w-3 text-emerald-500" strokeWidth={2.6} /> Complete!</>}
      </motion.button>
    </div>
  );
}

// ── 2. Circular — SVG ring with count-up ──
function CircularProgress() {
  const [progress, setProgress] = useState(65);
  const R = 28, C = 2 * Math.PI * R;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Circular Ring</span><span className="text-[10px] font-semibold cs-text">{progress}%</span></div>
      <div className="flex items-center justify-center gap-4 py-2">
        {/* SVG ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={R} fill="none" stroke="var(--card-border)" strokeWidth="5" />
            <motion.circle cx="36" cy="36" r={R} fill="none" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round" strokeDasharray={C} animate={{ strokeDashoffset: C - (progress / 100) * C }} transition={{ type: "spring", stiffness: 100, damping: 20 }} />
          </svg>
          <span className="text-[16px] font-bold tabular-nums cs-text">{progress}%</span>
        </div>
        {/* Controls */}
        <div className="flex flex-col gap-1.5">
          {[25, 50, 75, 100].map(v => (
            <button key={v} type="button" onClick={() => setProgress(v)} className="rounded-md border cs-border cs-input px-2.5 py-1 text-[9px] font-bold cs-muted transition cs-hover" style={{ background: progress === v ? "rgba(139,92,246,0.1)" : "var(--card-input-bg)", color: progress === v ? "#8b5cf6" : "var(--card-text-muted)" }}>{v}%</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 3. Segmented — discrete steps with active fill ──
function SegmentedProgress() {
  const [step, setStep] = useState(3);
  const STEPS = ["Cart", "Address", "Payment", "Review", "Done"];
  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Segmented Steps</span><span className="text-[10px] font-semibold cs-text">{step + 1}/{STEPS.length}</span></div>
      <div className="flex items-center gap-1">
        {STEPS.map((label, i) => {
          const done = i < step; const active = i === step;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center gap-0.5">
                {/* Connector line before (except first) */}
                {i > 0 && <div className="h-1 flex-1 rounded-full transition-colors duration-300" style={{ background: i <= step ? "#10b981" : "var(--card-border)" }} />}
                {/* Step circle */}
                <motion.button type="button" onClick={() => setStep(i)} whileTap={{ scale: 0.85 }} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[9px] font-bold transition-all duration-300" style={{ borderColor: i <= step ? "#10b981" : "var(--card-border)", background: i <= step ? "#10b981" : "transparent", color: i <= step ? "#fff" : "var(--card-text-muted)" }}>
                  {done ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </motion.button>
                {/* Connector line after (except last) */}
                {i < STEPS.length - 1 && <div className="h-1 flex-1 rounded-full transition-colors duration-300" style={{ background: i < step ? "#10b981" : "var(--card-border)" }} />}
              </div>
              <span className="text-[7.5px] font-semibold transition-colors" style={{ color: i <= step ? "#10b981" : "var(--card-text-muted)" }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
