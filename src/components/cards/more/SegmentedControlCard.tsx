"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Calendar, Clock, DollarSign, Heart, LayoutGrid, List, Rows3, Star, TrendingUp, Zap, type LucideIcon } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Segment = { id: string; label: string; icon: LucideIcon };
type Variant = "liquid" | "flip" | "underline" | "elastic" | "glass";

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

const GROUPS: { title: string; variant: Variant; segments: Segment[]; initial: string }[] = [
  { title: "Liquid Morph", variant: "liquid", segments: VIEW, initial: "grid" },
  { title: "3D Flip", variant: "flip", segments: TIME, initial: "week" },
  { title: "Underline Sweep", variant: "underline", segments: PRICE, initial: "all" },
  { title: "Elastic Bounce", variant: "elastic", segments: FAV, initial: "star" },
  { title: "Frosted Glass", variant: "glass", segments: VIEW, initial: "grid" },
];

export function SegmentedControlCard() {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [values, setValues] = useState(() => GROUPS.map((group) => group.initial));

  return (
    <motion.div
      className="relative w-[clamp(280px,92vw,400px)] select-none"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(100,116,139,0.10), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500/10 ring-1 ring-slate-500/20">
              <LayoutGrid aria-hidden className="h-4 w-4 text-slate-600 dark:text-slate-300" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight cs-text">Segmented Controls</h2>
              <p className="text-[10.5px] cs-muted">Five accessible single-choice controls</p>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-5">
          {GROUPS.map((group, index) => {
            const labelId = `${baseId}-label-${index}`;
            return (
              <section key={group.variant}>
                <h3 id={labelId} className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">
                  {index + 1} · {group.title}
                </h3>
                <SegmentedGroup
                  id={`${baseId}-${group.variant}`}
                  labelId={labelId}
                  segments={group.segments}
                  value={values[index]}
                  variant={group.variant}
                  reduceMotion={Boolean(reduceMotion)}
                  onChange={(value) => setValues((current) => current.map((item, itemIndex) => itemIndex === index ? value : item))}
                />
              </section>
            );
          })}
        </div>

        <footer className="border-t cs-border px-5 py-2.5 text-center">
          <p className="text-[9.5px] cs-subtle">Use Left/Right arrows, Home, or End to change each selection.</p>
        </footer>
      </div>
    </motion.div>
  );
}

type SegmentedGroupProps = {
  id: string;
  labelId: string;
  segments: Segment[];
  value: string;
  variant: Variant;
  reduceMotion: boolean;
  onChange: (value: string) => void;
};

function SegmentedGroup({ id, labelId, segments, value, variant, reduceMotion, onChange }: SegmentedGroupProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % segments.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + segments.length) % segments.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = segments.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    onChange(segments[nextIndex].id);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIndex]?.focus();
  };

  const containerClass = variant === "underline"
    ? "relative flex items-center rounded-xl px-1"
    : "relative flex items-center gap-1 rounded-xl p-1.5";

  return (
    <LayoutGroup id={id}>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className={`${containerClass} overflow-hidden`}
        style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)", perspective: variant === "flip" ? "600px" : undefined }}
      >
        {segments.map((segment, index) => {
          const active = value === segment.id;
          const Icon = segment.icon;
          const activeColor = variant === "elastic" ? "#7c3aed" : "#2563eb";
          const activeText = variant === "underline" || variant === "glass" ? "var(--card-text)" : "#fff";
          return (
            <button
              key={segment.id}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(segment.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[11.5px] font-semibold transition-colors focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 ${variant === "underline" ? "flex-col" : ""}`}
              style={{ color: active ? activeText : "var(--card-text-muted)" }}
            >
              <SelectionSurface variant={variant} active={active} id={id} color={activeColor} reduceMotion={reduceMotion} />
              <span className="relative z-10 flex min-w-0 items-center gap-1.5">
                <Icon aria-hidden className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
                <span className="truncate">{segment.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function SelectionSurface({ variant, active, id, color, reduceMotion }: { variant: Variant; active: boolean; id: string; color: string; reduceMotion: boolean }) {
  if (!active) return null;
  if (variant === "underline") {
    return <motion.span layoutId={`${id}-selection`} aria-hidden className="absolute bottom-1 h-0.5 w-1/2 rounded-full" style={{ background: color }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }} />;
  }

  const glass = variant === "glass";
  return (
    <motion.span
      layoutId={`${id}-selection`}
      aria-hidden
      className="absolute inset-0 rounded-lg"
      initial={variant === "flip" && !reduceMotion ? { rotateY: 90, opacity: 0 } : false}
      animate={{ rotateY: 0, opacity: 1 }}
      style={{
        background: glass ? "var(--card-surface)" : color,
        border: glass ? "1px solid var(--card-border)" : undefined,
        boxShadow: glass ? "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.45)" : `0 2px 8px ${color}33`,
        backdropFilter: glass ? "blur(12px)" : undefined,
      }}
      transition={reduceMotion ? { duration: 0 } : variant === "elastic" ? { type: "spring", stiffness: 220, damping: 14 } : { type: "spring", stiffness: 340, damping: 28 }}
    />
  );
}