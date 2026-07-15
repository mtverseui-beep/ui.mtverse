"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Cpu,
  Globe,
  HeartPulse,
  Home,
  Plane,
  ShieldCheck,
  X,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// DomainCategoryStackCard — premium domain intelligence marketplace.
// Teal + amber palette. Each domain card carries a quality score (circular
// gauge with count-up), category chip, .com availability badge, price/value,
// and is presented in a drag-to-dismiss stack (spring physics). Cards behind
// are scaled + offset to imply depth.

type Cat =
  | "Real Estate"
  | "Blockchain"
  | "AI"
  | "Healthcare"
  | "Travel"
  | "Finance";

interface Domain {
  id: number;
  name: string;
  tld: string;
  category: Cat;
  score: number;
  price: number;
  estValue: number;
  available: boolean;
  blurb: string;
}

const DOMAINS: Domain[] = [
  {
    id: 1,
    name: "lumen",
    tld: "ai",
    category: "AI",
    score: 94,
    price: 4990,
    estValue: 8200,
    available: true,
    blurb: "Short, brandable, two-syllable — ideal for an ML platform.",
  },
  {
    id: 2,
    name: "atlasrealty",
    tld: "com",
    category: "Real Estate",
    score: 88,
    price: 12500,
    estValue: 19000,
    available: true,
    blurb: "Authoritative brokerage name with strong search volume.",
  },
  {
    id: 3,
    name: "vitalis",
    tld: "health",
    category: "Healthcare",
    score: 81,
    price: 3200,
    estValue: 5400,
    available: true,
    blurb: "Latin root signals vitality — great for a wellness clinic.",
  },
  {
    id: 4,
    name: "chainpulse",
    tld: "io",
    category: "Blockchain",
    score: 76,
    price: 1850,
    estValue: 3100,
    available: false,
    blurb: "On-chain analytics feel; .io aligns with dev tooling.",
  },
  {
    id: 5,
    name: "wanderfar",
    tld: "travel",
    category: "Travel",
    score: 72,
    price: 2400,
    estValue: 3900,
    available: true,
    blurb: "Evocative OTA name — works for curated trips.",
  },
  {
    id: 6,
    name: "ledgerco",
    tld: "finance",
    category: "Finance",
    score: 84,
    price: 6700,
    estValue: 9800,
    available: true,
    blurb: "Trust-forward name for a B2B accounting SaaS.",
  },
];

const CAT_META: Record<Cat, { Icon: typeof Home; tone: string; bg: string }> = {
  "Real Estate": { Icon: Home, tone: "text-amber-600 dark:text-amber-300", bg: "bg-amber-500/10" },
  Blockchain: { Icon: Cpu, tone: "text-teal-600 dark:text-teal-300", bg: "bg-teal-500/10" },
  AI: { Icon: Cpu, tone: "text-teal-600 dark:text-teal-300", bg: "bg-teal-500/10" },
  Healthcare: { Icon: HeartPulse, tone: "text-rose-500 dark:text-rose-300", bg: "bg-rose-500/10" },
  Travel: { Icon: Plane, tone: "text-sky-600 dark:text-sky-300", bg: "bg-sky-500/10" },
  Finance: { Icon: Briefcase, tone: "text-amber-600 dark:text-amber-300", bg: "bg-amber-500/10" },
};

function fmtPrice(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Circular gauge for the score
function ScoreGauge({ value, inView }: { value: number; inView: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [shown, setShown] = useState(0);
  const SIZE = 64;
  const STROKE = 6;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration: 1.2, ease: EASE });
    const u = rounded.on("change", (v) => setShown(v));
    return () => { c.stop(); u(); };
  }, [inView, value, mv, rounded]);

  const tone =
    value >= 85 ? "#14b8a6" : value >= 75 ? "#f59e0b" : "#f97316";

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth={STROKE} className="stroke-black/10 dark:stroke-white/10" />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          stroke={tone}
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          animate={inView ? { strokeDashoffset: CIRC * (1 - value / 100) } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[15px] font-bold tabular-nums cs-text">{shown}</span>
      </div>
    </div>
  );
}

function DomainCard({
  domain,
  index,
  onDismiss,
  inView,
}: {
  domain: Domain;
  index: number;
  onDismiss: () => void;
  inView: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 160], [-12, 12]);
  const opacity = useTransform(x, [-180, -40, 0, 40, 180], [0, 1, 1, 1, 0]);
  const { Icon, tone, bg } = CAT_META[domain.category];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (index !== 0) return;
    if (Math.abs(info.offset.x) > 120) onDismiss();
  };

  const yOffset = index * 16;
  const scale = 1 - index * 0.05;
  const zIndex = 10 - index;

  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{
        opacity: index < 3 ? 1 : 0,
        y: yOffset,
        scale,
        zIndex,
      }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}
    >
      <motion.div
        className="cs-surface flex h-full w-full cursor-grab flex-col overflow-hidden rounded-[22px] border cs-border shadow-[0_24px_60px_-30px_rgba(13,148,136,0.5)] active:cursor-grabbing"
        style={{ x: index === 0 ? x : 0, rotate: index === 0 ? rotate : 0, opacity: index === 0 ? opacity : 1 }}
        drag={index === 0 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* Top: name + tld + score gauge */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <h3 className="truncate text-[26px] font-bold leading-none cs-text">{domain.name}</h3>
              <span className="text-[18px] font-semibold text-teal-600 dark:text-teal-300">.{domain.tld}</span>
            </div>
            <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${bg} ${tone}`}>
              <Icon className="h-3 w-3" strokeWidth={2.4} />
              {domain.category}
            </div>
          </div>
          <ScoreGauge value={domain.score} inView={inView} />
        </div>

        {/* Availability + value */}
        <div className="flex items-center gap-2 px-5 pb-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
              domain.available
                ? "border-teal-400/50 bg-teal-50 text-teal-700 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200"
                : "border-rose-400/50 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
            }`}
          >
            <ShieldCheck className="h-3 w-3" strokeWidth={2.4} />
            {domain.available ? ".com available" : ".com taken"}
          </span>
        </div>

        {/* Blurb */}
        <p className="px-5 text-[12px] leading-relaxed cs-muted">{domain.blurb}</p>

        {/* Price block */}
        <div className="mt-auto border-t cs-border px-5 py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider cs-subtle">Buyout price</p>
              <p className="text-[24px] font-bold tabular-nums cs-text">{fmtPrice(domain.price)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider cs-subtle">Est. value</p>
              <p className="flex items-center gap-0.5 text-[14px] font-semibold text-amber-600 dark:text-amber-300">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                {fmtPrice(domain.estValue)}
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            aria-label={`Acquire ${domain.name}.${domain.tld}`}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:from-teal-600 hover:to-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
          >
            Acquire domain
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DomainCategoryStackCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [queue, setQueue] = useState<Domain[]>(DOMAINS);
  const [saved, setSaved] = useState<number>(0);

  const dismiss = () => setQueue((prev) => prev.slice(1));
  const pass = () => setQueue((prev) => [...prev.slice(1), prev[0]]);
  const keep = () => {
    setSaved((s) => s + 1);
    setQueue((prev) => prev.slice(1));
  };

  const remaining = queue.length;
  const topScore = queue[0]?.score ?? 0;

  const categoryChips = useMemo(() => Object.keys(CAT_META) as Cat[], []);

  return (
    <motion.div
      ref={ref}
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 15%, rgba(20,184,166,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(245,158,11,0.14), transparent 60%)",
        }}
      />

      {/* Header strip */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/20">
            <Globe className="h-4 w-4 text-teal-600 dark:text-teal-300" strokeWidth={2.2} />
          </span>
          <div>
            <h2 className="text-[14px] font-bold leading-tight cs-text">Domain Intelligence</h2>
            <p className="text-[10.5px] cs-muted">{remaining} domains · top score {topScore}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <Building2 className="h-3 w-3" strokeWidth={2.4} />
          {saved} saved
        </span>
      </div>

      {/* Category chips */}
      <div className="mb-3 flex flex-wrap gap-1.5 px-1">
        {categoryChips.map((c) => {
          const { Icon, tone } = CAT_META[c];
          return (
            <span
              key={c}
              className={`inline-flex items-center gap-1 rounded-full border cs-border px-2 py-0.5 text-[9.5px] font-medium ${tone}`}
            >
              <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
              {c}
            </span>
          );
        })}
      </div>

      {/* Stack */}
      <div className="relative h-[440px] w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          {queue.slice(0, 3).map((d, i) => (
            <DomainCard key={d.id} domain={d} index={i} onDismiss={dismiss} inView={inView} />
          ))}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={pass}
          aria-label="Skip domain"
          className="flex h-12 w-12 items-center justify-center rounded-full border cs-border cs-surface shadow-md transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
        >
          <X className="h-5 w-5 cs-muted" strokeWidth={2.4} />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={keep}
          aria-label="Save domain"
          className="flex h-12 w-12 items-center justify-center rounded-full border cs-border cs-surface shadow-md transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          <ArrowUpRight className="h-5 w-5 text-amber-600 dark:text-amber-300" strokeWidth={2.4} />
        </motion.button>
        <p className="ml-1 text-[10.5px] cs-subtle">Drag card to dismiss</p>
      </div>
    </motion.div>
  );
}
