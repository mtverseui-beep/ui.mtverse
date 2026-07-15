"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, Bug, FileWarning, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ElectricBorderCard — functional security status card.
// Zinc + lime palette. A refined SVG turbulence border (subtle, not over-
// heavy) wraps a live security dashboard: a 0-100 circular gauge with
// count-up, a Low/Medium/High risk badge, a live pulse indicator, and three
// action buttons (Scan, Quarantine, Report). The border's turbulence is
// gentle — animated displacement around 8px, not the original 30px.

const TARGET_SCORE = 92;

const THREATS = [
  { id: "t1", name: "Trojan.GenericKD", severity: "high", time: "2 min ago" },
  { id: "t2", name: "Suspicious script blocked", severity: "medium", time: "14 min ago" },
  { id: "t3", name: "Tracking cookie removed", severity: "low", time: "1 h ago" },
] as const;

export function ElectricBorderCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion() ?? false;

  const score = useMotionValue(0);
  const rounded = useTransform(score, (v) => Math.round(v));
  const [shown, setShown] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!inView) return;
    // Skip the count-up for reduced-motion users — jump to the final value.
    if (reduceMotion) {
      score.set(TARGET_SCORE);
      // Defer the setState to avoid a synchronous render loop warning;
      // rAF runs after the current frame, so this is not "in effect".
      const raf = requestAnimationFrame(() => setShown(TARGET_SCORE));
      return () => cancelAnimationFrame(raf);
    }
    const c = animate(score, TARGET_SCORE, { duration: 1.3, ease: EASE });
    const u = rounded.on("change", (v) => setShown(v));
    return () => { c.stop(); u(); };
  }, [inView, score, rounded, reduceMotion]);

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2200);
  };

  const risk = shown >= 85 ? "Low" : shown >= 60 ? "Medium" : "High";
  const riskTone =
    risk === "Low"
      ? "border-lime-400/50 bg-lime-400/10 text-lime-700 dark:text-lime-300"
      : risk === "Medium"
        ? "border-amber-400/50 bg-amber-400/10 text-amber-700 dark:text-amber-300"
        : "border-rose-400/50 bg-rose-400/10 text-rose-600 dark:text-rose-300";

  // Ring maths
  const SIZE = 120;
  const STROKE = 9;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;

  return (
    <motion.div
      ref={ref}
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 12%, rgba(163,230,53,0.16), transparent 55%), radial-gradient(circle at 80% 88%, rgba(161,161,170,0.14), transparent 60%)",
        }}
      />

      {/* Hidden SVG filter definition — subtle turbulence border */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden focusable={false}>
        <defs>
          <filter id="electric-edge" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.012" numOctaves="3" seed="3" result="noise" />
            <feOffset in="noise" dy="0" result="offset">
              <animate attributeName="dy" values="0; 6; 0" dur="5s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feDisplacementMap in="SourceGraphic" in2="offset" scale="6" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div
        className="relative rounded-[22px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(163,230,53,0.5), rgba(161,161,170,0.25) 35%, rgba(163,230,53,0.45))",
        }}
      >
        {/* Turbulence-filtered edge layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px]"
          style={{ filter: "url(#electric-edge)", border: "1px solid rgba(163,230,53,0.55)" }}
        />

        <article className="cs-surface relative overflow-hidden rounded-[21px]">
          {/* Header */}
          <header className="flex items-center justify-between px-5 pb-3 pt-5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500/10 ring-1 ring-lime-500/25">
                <ShieldCheck className="h-4 w-4 text-lime-600 dark:text-lime-300" strokeWidth={2.2} />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
                </span>
              </span>
              <div>
                <h2 className="text-[15px] font-bold leading-tight cs-text">Security Status</h2>
                <p className="flex items-center gap-1 text-[10.5px] cs-muted">
                  <Activity className="h-2.5 w-2.5 text-lime-500" strokeWidth={2.4} />
                  Live · last scan 4 min ago
                </p>
              </div>
            </div>
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${riskTone}`}>
              {risk} risk
            </span>
          </header>

          {/* Score gauge */}
          <div className="flex items-center justify-center px-5 pb-3 pt-1">
            <div className="relative" style={{ width: SIZE, height: SIZE }}>
              <svg width={SIZE} height={SIZE} className="-rotate-90">
                <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth={STROKE} className="stroke-lime-500/15" />
                <motion.circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  stroke="url(#secGrad)"
                  strokeDasharray={CIRC}
                  initial={{ strokeDashoffset: CIRC }}
                  animate={inView ? { strokeDashoffset: CIRC * (1 - TARGET_SCORE / 100) } : {}}
                  transition={{ duration: 1.3, ease: EASE }}
                />
                <defs>
                  <linearGradient id="secGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a3e635" />
                    <stop offset="100%" stopColor="#65a30d" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[32px] font-bold tabular-nums cs-text">{shown}</span>
                <span className="text-[9.5px] font-medium uppercase tracking-wider cs-subtle">/ 100</span>
              </div>
            </div>
          </div>

          {/* Scan state */}
          <div className="px-5 pb-3">
            <AnimatePresence mode="wait">
              {scanning ? (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="overflow-hidden rounded-xl border border-lime-400/30 bg-lime-500/5"
                >
                  <div className="relative h-1 w-full bg-lime-500/10">
                    <motion.div
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-lime-400 to-transparent"
                      animate={{ x: ["-33%", "133%"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="px-3 py-2 text-[11px] font-medium text-lime-700 dark:text-lime-300">
                    Scanning 248,610 files…
                  </p>
                </motion.div>
              ) : scanned ? (
                <motion.div
                  key="scanned"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-500/5 px-3 py-2"
                >
                  <ShieldCheck className="h-4 w-4 text-lime-600 dark:text-lime-300" strokeWidth={2.2} />
                  <p className="text-[11.5px] font-medium text-lime-700 dark:text-lime-300">
                    Scan complete — no new threats found.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Recent threats */}
          <div className="border-t cs-border px-5 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] cs-subtle">
              Recent activity
            </p>
            <div className="space-y-1.5">
              {THREATS.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: EASE }}
                  className="flex items-center justify-between rounded-lg border cs-border px-2.5 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md ${
                        t.severity === "high"
                          ? "bg-rose-500/10 text-rose-500"
                          : t.severity === "medium"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-zinc-500/10 text-zinc-500"
                      }`}
                    >
                      <AlertTriangle className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    <span className="text-[11.5px] font-medium cs-text">{t.name}</span>
                  </div>
                  <span className="text-[10px] cs-subtle">{t.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2 border-t cs-border p-4">
            <ActionBtn icon={Bug} label="Scan" tone="primary" onClick={runScan} disabled={scanning} />
            <ActionBtn icon={ShieldCheck} label="Quarantine" tone="ghost" />
            <ActionBtn icon={FileWarning} label="Report" tone="ghost" />
          </div>
        </article>
      </div>
    </motion.div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  tone,
  onClick,
  disabled,
}: {
  icon: typeof Bug;
  label: string;
  tone: "primary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/40 disabled:opacity-50";
  const styles =
    tone === "primary"
      ? "bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-md shadow-lime-500/20 hover:from-lime-600 hover:to-green-600"
      : "border cs-border cs-text cs-hover";
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`${base} ${styles}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.2} />
      {label}
    </motion.button>
  );
}
