"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Info, ArrowUpRight } from "lucide-react";
import { analyticsInsight } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;
// easeOutExpo for the count-up — smoother, more premium than cubic.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function useCountUp(target: number, duration = 1500, start = false, reduceMotion = false) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    // Skip the count-up animation for users who prefer reduced motion.
    if (reduceMotion) {
      // Defer the setState to avoid a synchronous render-loop warning.
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easeOutExpo(t);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, reduceMotion]);

  return value;
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

export function AnalyticsInsightCard() {
  const data = analyticsInsight;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion() ?? false;

  const animatedKpi = useCountUp(data.kpi, 1600, inView, reduceMotion);

  const [activeSeg, setActiveSeg] = useState(
    data.segments.findIndex((s) => s.active) >= 0 ? data.segments.findIndex((s) => s.active) : 1,
  );

  const isPositive = data.deltaPct >= 0;
  const deltaLabel = `${isPositive ? "+" : ""}${data.deltaPct.toFixed(1)}%`;

  const W = 280, H = 72, PAD = 4;
  const min = Math.min(...data.series);
  const max = Math.max(...data.series);
  const range = Math.max(1, max - min);
  const points = data.series.map((v, i) => {
    const x = PAD + (i / (data.series.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - (v - min) / range) * (H - PAD * 2);
    return [x, y] as const;
  });
  // Smoother curve via Catmull-Rom → cubic-bezier conversion for a premium arc.
  const linePath = catmullRom(points);
  const areaPath = `${linePath} L ${W - PAD} ${H} L ${PAD} ${H} Z`;
  const lastPoint = points[points.length - 1];

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative w-[clamp(280px,90vw,360px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.20), transparent 60%), radial-gradient(circle at 75% 75%, rgba(34,211,238,0.16), transparent 60%)",
        }}
      />

      <article
        className="relative overflow-hidden rounded-3xl cs-border cs-surface p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Subtle data-grid background — fades at edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
          }}
        />

        {/* Top accent line */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.55), rgba(34,211,238,0.55), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        />

        <div className="relative">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-medium uppercase tracking-wider cs-muted">{data.metric}</span>
              <div className="group relative">
                <motion.button
                  type="button"
                  aria-label="Metric details"
                  whileTap={{ scale: 0.92 }}
                  className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full cs-subtle transition hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                >
                  <Info className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.button>
                {/* Premium tooltip — wider, centered with arrow */}
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 top-7 z-30 w-60 -translate-x-1/2 rounded-xl cs-border cs-surface p-3 text-[11px] leading-relaxed cs-muted opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 cs-border cs-surface"
                    style={{ borderBottom: "none", borderRight: "none" }}
                  />
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                    Insight
                  </span>
                  {data.tooltip}
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full cs-border cs-input px-2 py-0.5 font-mono text-[10px] cs-subtle">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                  animate={{ opacity: [0, 0.7, 0], scale: [1, 2, 2.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              LIVE
            </span>
          </header>

          {/* KPI + delta — larger, bolder, tabular */}
          <div className="mt-3 flex items-end gap-3">
            <div className="flex items-baseline">
              {data.prefix && <span className="text-[22px] font-semibold cs-muted">{data.prefix}</span>}
              <span
                className="text-[48px] font-semibold leading-none tracking-tight cs-text tabular-nums"
                style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}
              >
                {formatNumber(animatedKpi)}
              </span>
              {data.suffix && <span className="text-[22px] font-semibold cs-muted">{data.suffix}</span>}
            </div>
            <span
              className={`mb-1.5 inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${
                isPositive
                  ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-400/20"
                  : "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-300 dark:ring-rose-400/20"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" strokeWidth={2.6} />
              ) : (
                <TrendingDown className="h-3 w-3" strokeWidth={2.6} />
              )}
              {deltaLabel}
            </span>
          </div>

          <p className="mt-1 text-[12px] cs-subtle">{data.comparison}</p>

          {/* Sparkline — smoother stroke + richer area fill */}
          <div className="relative mt-5 h-[76px] w-full">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="spark-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.42)" />
                  <stop offset="60%" stopColor="rgba(16,185,129,0.12)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </linearGradient>
                <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="60%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <filter id="spark-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d={areaPath}
                fill="url(#spark-area)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke="url(#spark-line)"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                filter="url(#spark-glow)"
              />
              {/* End dot — solid inner + refined pulsing ring */}
              <motion.circle
                cx={lastPoint[0]}
                cy={lastPoint[1]}
                r="3.5"
                fill="#22d3ee"
                stroke="var(--card-surface)"
                strokeWidth="1.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, delay: 1.4, ease: EASE }}
              />
              <motion.circle
                cx={lastPoint[0]}
                cy={lastPoint[1]}
                r="6"
                fill="none"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="1.25"
                animate={inView ? { scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] } : { opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="pointer-events-none absolute -top-1 z-20 rounded-lg cs-border cs-surface px-2.5 py-1.5 text-[11px] shadow-xl backdrop-blur-md"
                  style={{ left: `calc(${(lastPoint[0] / W) * 100}% - 40px)` }}
                >
                  <div className="font-mono text-[9.5px] uppercase tracking-wider cs-subtle">Now</div>
                  <div className="font-semibold cs-text tabular-nums">{data.prefix}{formatNumber(data.kpi)}{data.suffix}</div>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 cs-border cs-surface"
                    style={{ borderTop: "none", borderLeft: "none" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Segmented metric row — smoother layoutId slide + better active state */}
          <div
            role="radiogroup"
            aria-label="Comparison range"
            className="mt-5 grid grid-cols-4 gap-1 rounded-xl cs-border cs-input p-1"
          >
            {data.segments.map((seg, i) => {
              const active = i === activeSeg;
              return (
                <motion.button
                  key={seg.label}
                  role="radio"
                  aria-checked={active}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveSeg(i)}
                  className={`relative cursor-pointer rounded-lg px-2 py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${
                    active ? "cs-text" : "cs-muted hover:cs-text"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="seg-active"
                      className="absolute inset-0 rounded-lg bg-gradient-to-b from-emerald-500/20 to-emerald-500/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10)] ring-1 ring-emerald-500/25 dark:from-white/12 dark:to-white/[0.04] dark:ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative block">
                    <span className="block text-[11px] font-semibold">{seg.label}</span>
                    <span
                      className={`mt-0.5 block text-[10.5px] tabular-nums transition-colors ${
                        active ? "text-emerald-600 dark:text-emerald-300" : "cs-subtle"
                      }`}
                    >
                      {seg.value}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="group/cta mt-5 flex w-full cursor-pointer items-center justify-between rounded-xl cs-border cs-input px-4 py-2.5 text-[12.5px] font-medium cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
          >
            View full report
            <ArrowUpRight
              className="h-4 w-4 cs-subtle transition group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:text-emerald-600 dark:group-hover/cta:text-emerald-300"
              strokeWidth={2.2}
            />
          </motion.button>
        </div>
      </article>
    </motion.div>
  );
}

// Catmull-Rom spline → cubic-bezier path for smoother premium arcs.
function catmullRom(points: readonly (readonly [number, number])[]) {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}
