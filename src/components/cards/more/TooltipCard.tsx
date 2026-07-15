"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, HelpCircle, AlertTriangle, Star, Zap, TrendingUp, User } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function TooltipCard() {
  return (
    <motion.div
      className="w-[clamp(340px,95vw,640px)] select-none space-y-10"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <HoverTooltips />
      <ClickTooltip />
      <RichTooltip />
    </motion.div>
  );
}

// ── 1. Hover tooltips — 4 positions ──
const POSITIONS = [
  { label: "Top", position: "top" as const, text: "Tooltip on top" },
  { label: "Bottom", position: "bottom" as const, text: "Tooltip below" },
  { label: "Right", position: "right" as const, text: "Tooltip to the right" },
  { label: "Left", position: "left" as const, text: "Tooltip to the left" },
];

function HoverTooltips() {
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-slate-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">01</span>
        <h3 className="text-[12px] font-bold cs-text">Hover (4 Positions)</h3>
        <span className="text-[10.5px] cs-subtle">— CSS-only · no JS</span>
      </header>
      <div className="flex flex-wrap items-center justify-center gap-4 py-8" style={{ background: "var(--card-input-bg)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
        {POSITIONS.map(t => (
          <div key={t.label} className="group relative">
            <div className="flex h-10 items-center rounded-lg border cs-border cs-input px-3.5 text-[11px] font-semibold cs-text transition cs-hover cursor-pointer">
              {t.label}
            </div>
            <div
              className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] font-medium text-white opacity-0 transition-all duration-200 group-hover:opacity-100 dark:bg-slate-700 ${
                t.position === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:-translate-y-0.5" : ""
              } ${
                t.position === "bottom" ? "top-full left-1/2 -translate-x-1/2 mt-2 group-hover:translate-y-0.5" : ""
              } ${
                t.position === "right" ? "left-full top-1/2 -translate-y-1/2 ml-2 group-hover:translate-x-0.5" : ""
              } ${
                t.position === "left" ? "right-full top-1/2 -translate-y-1/2 mr-2 group-hover:-translate-x-0.5" : ""
              }`}
            >
              {t.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 2. Click tooltip — toggles on click, closes on outside click ──
function ClickTooltip() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-amber-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">02</span>
        <h3 className="text-[12px] font-bold cs-text">Click Toggle</h3>
        <span className="text-[10.5px] cs-subtle">— persistent · click outside to close</span>
      </header>
      <div className="flex items-center justify-center gap-6 py-8" style={{ background: "var(--card-input-bg)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
        <div ref={ref} className="relative">
          <motion.button
            type="button"
            onClick={() => { setOpen(o => !o); setCount(c => c + 1); }}
            whileTap={{ scale: 0.92 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border cs-border cs-input cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" strokeWidth={2} />
          </motion.button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-xl bg-slate-900 p-3 text-[10.5px] leading-relaxed text-white shadow-2xl dark:bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-amber-400" strokeWidth={2.4} />
                  <p className="font-bold">Quick Tip #{count}</p>
                </div>
                <p className="mt-1.5 text-slate-300 dark:text-slate-400">
                  Click outside to close this tooltip. It stays open until you dismiss it.
                </p>
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-700" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="text-center">
          <div className="text-[20px] font-bold cs-text tabular-nums">{count}</div>
          <div className="text-[10px] cs-subtle">opens</div>
        </div>
      </div>
    </section>
  );
}

// ── 3. Rich tooltip — avatar + title + stats + rating ──
function RichTooltip() {
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-rose-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">03</span>
        <h3 className="text-[12px] font-bold cs-text">Rich Content</h3>
        <span className="text-[10.5px] cs-subtle">— avatar + stats + rating</span>
      </header>
      <div className="flex items-center justify-center py-8" style={{ background: "var(--card-input-bg)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
        <div className="group relative">
          <div className="flex h-10 items-center gap-2 rounded-lg border cs-border cs-input px-3.5 text-[11px] font-semibold cs-text transition cs-hover cursor-pointer">
            <User className="h-3.5 w-3.5 text-rose-500" strokeWidth={2} />
            Hover for profile
          </div>
          {/* Rich tooltip with CSS hover */}
          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5">
            <div className="overflow-hidden rounded-xl border cs-border shadow-2xl" style={{ background: "var(--card-surface)" }}>
              {/* Header with avatar + name */}
              <div className="flex items-center gap-3 border-b cs-border p-3" style={{ background: "var(--card-input-bg)" }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                  <span className="text-[12px] font-bold">AM</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold cs-text">Alex Morgan</p>
                  <p className="text-[10px] cs-muted">Product Designer · San Francisco</p>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" title="Online" />
              </div>
              {/* Body: stats */}
              <div className="grid grid-cols-3 gap-1 p-3">
                <div className="text-center">
                  <div className="text-[13px] font-bold cs-text tabular-nums">24</div>
                  <div className="text-[9px] uppercase tracking-wider cs-subtle">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-[13px] font-bold cs-text tabular-nums">1.8K</div>
                  <div className="text-[9px] uppercase tracking-wider cs-subtle">Followers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <TrendingUp className="h-3 w-3 text-emerald-500" strokeWidth={2.4} />
                    <span className="text-[13px] font-bold cs-text tabular-nums">4.9</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-wider cs-subtle">Rating</div>
                </div>
              </div>
              {/* Footer: stars */}
              <div className="flex items-center justify-center gap-0.5 border-t cs-border p-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-[9.5px] cs-subtle">482 reviews</span>
              </div>
            </div>
            <span className="mx-auto block h-2 w-2 -translate-y-1 rotate-45 border-r border-b cs-border" style={{ background: "var(--card-surface)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
