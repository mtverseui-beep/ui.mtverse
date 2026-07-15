"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowUpRight, Award, Rocket, Target, Trophy } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// YearInReviewCard — premium yearly performance recap.
// Slate + violet palette. SVG KPI ring with stroke-dash reveal, count-up
// animated headline metric, milestone timeline with staggered reveal, a mini
// sparkline of monthly progress, and three stat tiles.

const TARGET_SCORE = 87; // annual completion %
const SPARK = [42, 48, 45, 58, 63, 61, 72, 78, 74, 82, 88, 87];

const MILESTONES = [
  {
    icon: Rocket,
    month: "Mar",
    title: "Shipped Atlas v2",
    note: "Rebuilt onboarding in 6 weeks",
  },
  {
    icon: Target,
    month: "Jul",
    title: "Hit 10k active teams",
    note: "Triple-digit YoY growth",
  },
  {
    icon: Award,
    month: "Oct",
    title: "Won Design Award",
    note: "Awwwards Site of the Day",
  },
  {
    icon: Trophy,
    month: "Dec",
    title: "98% retention",
    note: "Best quarter on record",
  },
] as const;

const STATS = [
  { label: "Projects", value: "48" },
  { label: "Commits", value: "3.2k" },
  { label: "Reviews", value: "612" },
] as const;

// SVG sparkline path generator (smooth-ish polyline)
function buildSparkPath(data: number[], w: number, h: number, pad: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  return data
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function YearInReviewCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Count-up animated score
  const score = useMotionValue(0);
  const scoreRounded = useTransform(score, (v) => Math.round(v));
  const [displayScore, setDisplayScore] = useState(0);

  // Count-up animated big metric
  const bigMetric = useMotionValue(0);
  const [displayMetric, setDisplayMetric] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controlsA = animate(score, TARGET_SCORE, {
      duration: 1.4,
      ease: EASE,
    });
    const controlsB = animate(bigMetric, 2.4, {
      duration: 1.6,
      ease: EASE,
    });
    const unsubA = scoreRounded.on("change", (v) => setDisplayScore(v));
    const unsubB = bigMetric.on("change", (v) => setDisplayMetric(Number(v.toFixed(1))));
    return () => {
      controlsA.stop();
      controlsB.stop();
      unsubA();
      unsubB();
    };
  }, [inView, score, scoreRounded, bigMetric]);

  // Ring maths
  const RING_SIZE = 92;
  const STROKE = 8;
  const R = (RING_SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = CIRC * (1 - TARGET_SCORE / 100);

  // Sparkline maths
  const SPARK_W = 260;
  const SPARK_H = 56;
  const sparkPath = buildSparkPath(SPARK, SPARK_W, SPARK_H, 6);

  return (
    <motion.div
      ref={ref}
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient violet glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 15%, rgba(139,92,246,0.20), transparent 55%), radial-gradient(circle at 80% 85%, rgba(99,102,241,0.14), transparent 60%)",
        }}
      />

      <article className="cs-surface relative overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)]">
        {/* Header */}
        <header className="flex items-start justify-between px-6 pb-3 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
              Year in Review
            </p>
            <h2 className="mt-1 text-[22px] font-bold leading-tight cs-text">
              2025 Performance
            </h2>
          </div>
          <span className="rounded-full border border-violet-300/50 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
            PERSONAL
          </span>
        </header>

        {/* Top: KPI ring + headline metric */}
        <div className="flex items-center gap-5 px-6 pb-5 pt-1">
          <div className="relative shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
            <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={R}
                fill="none"
                strokeWidth={STROKE}
                className="stroke-violet-500/15"
              />
              <motion.circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={R}
                fill="none"
                strokeWidth={STROKE}
                strokeLinecap="round"
                stroke="url(#yirGrad)"
                strokeDasharray={CIRC}
                initial={{ strokeDashoffset: CIRC }}
                animate={inView ? { strokeDashoffset: dashOffset } : {}}
                transition={{ duration: 1.4, ease: EASE }}
              />
              <defs>
                <linearGradient id="yirGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[20px] font-bold tabular-nums cs-text">
                {displayScore}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-wider cs-subtle">
                Score
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wider cs-subtle">Goals completed</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[40px] font-bold leading-none tabular-nums cs-text">
                {displayMetric.toFixed(1)}
              </span>
              <span className="text-[16px] font-semibold cs-muted">M</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-violet-600 dark:text-violet-300">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              +38% vs last year
            </p>
          </div>
        </div>

        {/* Mini sparkline */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider cs-subtle">
              Monthly momentum
            </span>
            <span className="text-[10px] font-medium cs-muted">12 months</span>
          </div>
          <svg
            viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
            className="mt-1.5 h-12 w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="yirSparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139,92,246,0.30)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d={`${sparkPath} L${SPARK_W - 6},${SPARK_H - 6} L6,${SPARK_H - 6} Z`}
              fill="url(#yirSparkFill)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            />
            <motion.path
              d={sparkPath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
            />
            {SPARK.map((_, i) => {
              const min = Math.min(...SPARK);
              const max = Math.max(...SPARK);
              const step = (SPARK_W - 12) / (SPARK.length - 1);
              const x = 6 + i * step;
              const y = 6 + (SPARK_H - 12) * (1 - (SPARK[i] - min) / (max - min));
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === SPARK.length - 1 ? 3 : 1.6}
                  fill={i === SPARK.length - 1 ? "#8b5cf6" : "rgba(139,92,246,0.5)"}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.04, ease: EASE }}
                />
              );
            })}
          </svg>
        </div>

        {/* Milestone timeline */}
        <div className="border-t cs-border px-6 py-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] cs-subtle">
            Key milestones
          </p>
          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-violet-400/60 via-violet-300/30 to-transparent dark:from-violet-500/50"
            />
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.title}
                className="relative flex gap-3 pb-3 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-300/50 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-500/15">
                  <m.icon className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[13px] font-semibold cs-text">{m.title}</p>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-300">
                      {m.month}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] cs-muted">{m.note}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 divide-x cs-border-t">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="px-2 py-3 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease: EASE }}
            >
              <p className="text-[18px] font-bold tabular-nums cs-text">{s.value}</p>
              <p className="text-[9.5px] uppercase tracking-wider cs-subtle">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </article>
    </motion.div>
  );
}
