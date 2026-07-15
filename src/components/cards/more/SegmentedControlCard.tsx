"use client";

import { useState } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Rows3,
  Calendar,
  Clock,
  BarChart3,
  DollarSign,
  TrendingUp,
  Star,
  Heart,
  Zap,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// SegmentedControlCard — 5 COMPLETELY DIFFERENT animation styles.
// Professional color palette: slate surfaces, subtle dark accents.
// No bright gradients. Compact width.

interface Segment {
  id: string;
  label: string;
  icon: typeof LayoutGrid;
}

const VIEW: Segment[] = [
  { id: "grid", label: "Grid", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
  { id: "rows", label: "Rows", icon: Rows3 },
];

const TIME: Segment[] = [
  { id: "day", label: "Day", icon: Clock },
  { id: "week", label: "Week", icon: Calendar },
  { id: "month", label: "Month", icon: BarChart3 },
];

const PRICE: Segment[] = [
  { id: "all", label: "All", icon: DollarSign },
  { id: "free", label: "Free", icon: Star },
  { id: "paid", label: "Paid", icon: TrendingUp },
];

const FAV: Segment[] = [
  { id: "star", label: "Star", icon: Star },
  { id: "heart", label: "Heart", icon: Heart },
  { id: "zap", label: "Zap", icon: Zap },
];

export function SegmentedControlCard() {
  const [v1, setV1] = useState("grid");
  const [v2, setV2] = useState("week");
  const [v3, setV3] = useState("all");
  const [v4, setV4] = useState("star");
  const [v5, setV5] = useState("grid");

  return (
    <motion.div
      className="w-[clamp(280px,88vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(100,116,139,0.08), transparent 55%)" }}
      />

      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-500/10 ring-1 ring-slate-500/20">
              <LayoutGrid className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight cs-text">Segmented Controls</h2>
              <p className="text-[10.5px] cs-muted">5 unique animation styles</p>
            </div>
          </div>
        </div>

        <div className="space-y-7 p-5">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Liquid Morph</label>
            <LiquidMorphGroup segments={VIEW} value={v1} onChange={setV1} id="liquid" />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · 3D Flip</label>
            <ThreeDFlipGroup segments={TIME} value={v2} onChange={setV2} id="flip" />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Underline Sweep</label>
            <UnderlineSweepGroup segments={PRICE} value={v3} onChange={setV3} id="underline" />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">4 · Elastic Bounce</label>
            <ElasticBounceGroup segments={FAV} value={v4} onChange={setV4} id="elastic" />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">5 · Frosted Glass</label>
            <GlassBlurGroup segments={VIEW} value={v5} onChange={setV5} id="glass" />
          </div>
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center">
          <p className="text-[9.5px] cs-subtle">Each group uses a completely different animation engine</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── 1. Liquid morph — professional slate pill ──
function LiquidMorphGroup({ segments, value, onChange, id }: { segments: Segment[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <LayoutGroup id={id}>
      <div className="relative flex items-center gap-1 rounded-xl p-1.5" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
        {segments.map((seg) => {
          const active = value === seg.id;
          const Icon = seg.icon;
          return (
            <button key={seg.id} type="button" onClick={() => onChange(seg.id)} className="relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11.5px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ color: active ? "#fff" : "var(--card-text-muted)" }}>
              {active && (
                <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-lg" style={{ background: "#2563eb", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }} transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }} />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="relative z-10">{seg.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

// ── 2. 3D flip — dark slate active face ──
function ThreeDFlipGroup({ segments, value, onChange, id }: { segments: Segment[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="relative flex items-center gap-1 rounded-xl p-1" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)", perspective: "600px" }}>
      {segments.map((seg) => {
        const active = value === seg.id;
        const Icon = seg.icon;
        return (
          <button key={seg.id} type="button" onClick={() => onChange(seg.id)} className="relative flex flex-1 items-center justify-center gap-1.5 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ color: active ? "#fff" : "var(--card-text-muted)" }}>
            <motion.div className="absolute inset-0 rounded-lg" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: active ? 180 : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}>
              <div className="absolute inset-0 rounded-lg" style={{ background: "#2563eb", backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }} />
            </motion.div>
            <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2.2} />
            <span className="relative z-10">{seg.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── 3. Underline sweep — slate underline ──
function UnderlineSweepGroup({ segments, value, onChange, id }: { segments: Segment[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <LayoutGroup id={id}>
      <div className="relative flex items-center gap-0 rounded-xl px-1" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
        {segments.map((seg) => {
          const active = value === seg.id;
          const Icon = seg.icon;
          return (
            <button key={seg.id} type="button" onClick={() => onChange(seg.id)} className="relative flex flex-1 flex-col items-center gap-1 py-2 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ color: active ? "var(--card-text)" : "var(--card-text-muted)" }}>
              <div className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" strokeWidth={2.2} />{seg.label}</div>
              {active && <motion.div layoutId={`${id}-underline`} className="absolute bottom-1 h-0.5 rounded-full" style={{ background: "#2563eb", width: "55%", left: "22.5%" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

// ── 4. Elastic bounce — dark pill with high bounce ──
function ElasticBounceGroup({ segments, value, onChange, id }: { segments: Segment[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <LayoutGroup id={id}>
      <div className="relative flex items-center gap-1 rounded-xl p-1.5" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
        {segments.map((seg) => {
          const active = value === seg.id;
          const Icon = seg.icon;
          return (
            <button key={seg.id} type="button" onClick={() => onChange(seg.id)} className="relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ color: active ? "#fff" : "var(--card-text-muted)" }}>
              {active && (
                <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-lg" style={{ background: "#7c3aed", boxShadow: "0 2px 8px rgba(124,58,237,0.25)" }} transition={{ type: "spring", stiffness: 200, damping: 8, mass: 0.5 }} />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="relative z-10">{seg.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

// ── 5. Frosted glass — subtle, professional ──
function GlassBlurGroup({ segments, value, onChange, id }: { segments: Segment[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <LayoutGroup id={id}>
      <div className="relative flex items-center gap-1 overflow-hidden rounded-xl p-1.5" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
        {segments.map((seg) => {
          const active = value === seg.id;
          const Icon = seg.icon;
          return (
            <button key={seg.id} type="button" onClick={() => onChange(seg.id)} className="relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ color: active ? "var(--card-text)" : "var(--card-text-muted)" }}>
              {active && (
                <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-lg" style={{ background: "var(--card-surface)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)", border: "1px solid var(--card-border)" }} transition={{ type: "spring", stiffness: 350, damping: 25 }} />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="relative z-10">{seg.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
