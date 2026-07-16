"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Download, ExternalLink, Trash2, Upload } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type PremiumAnimatedAction = "upload" | "download" | "get-started" | "confirm" | "save" | "delete" | "remove" | "cancel" | "learn-more" | "fast-preview" | "slow-preview";

export interface PremiumAnimatedButtonsCardProps {
  onAction?: (action: PremiumAnimatedAction) => void;
}

type ButtonConfig = {
  action: PremiumAnimatedAction;
  label: string;
  group: string;
  size?: "sm" | "md" | "lg";
  tone?: "slate" | "emerald" | "rose" | "outline" | "link";
  icon?: ReactNode;
  arrowPosition?: "left" | "right";
  showArrow?: boolean;
  duration?: number;
};

const BUTTONS: ButtonConfig[] = [
  { action: "upload", label: "Upload", group: "Primary actions", size: "sm", icon: <Upload className="h-3.5 w-3.5" /> },
  { action: "download", label: "Download", group: "Primary actions", icon: <Download className="h-4 w-4" /> },
  { action: "get-started", label: "Get Started", group: "Primary actions", size: "lg" },
  { action: "confirm", label: "Confirm", group: "Completion actions", tone: "emerald", icon: <Check className="h-4 w-4" /> },
  { action: "save", label: "Save Changes", group: "Completion actions", tone: "emerald" },
  { action: "delete", label: "Delete", group: "Destructive actions", tone: "rose", icon: <Trash2 className="h-4 w-4" /> },
  { action: "remove", label: "Remove", group: "Destructive actions", tone: "rose", arrowPosition: "left" },
  { action: "cancel", label: "Cancel", group: "Secondary actions", tone: "outline" },
  { action: "learn-more", label: "Learn More", group: "Secondary actions", tone: "link", icon: <ExternalLink className="h-3.5 w-3.5" />, showArrow: false },
  { action: "fast-preview", label: "Fast motion", group: "Motion previews", duration: 0.3 },
  { action: "slow-preview", label: "Slow motion", group: "Motion previews", duration: 1.2 },
];

const GROUPS = Array.from(new Set(BUTTONS.map((button) => button.group)));

export function PremiumAnimatedButtonsCard({ onAction }: PremiumAnimatedButtonsCardProps = {}) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState("Choose an action to preview its response.");

  const runAction = (button: ButtonConfig) => {
    onAction?.(button.action);
    setStatus(onAction ? `${button.label} action dispatched.` : `${button.label} selected in local preview mode.`);
  };

  return (
    <motion.div
      className="relative w-[clamp(320px,95vw,520px)] select-none"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08), transparent 55%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.06), transparent 60%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
              <ArrowRight aria-hidden className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold tracking-tight cs-text">Premium Animated Buttons</h2>
              <p className="text-[11px] cs-muted">Responsive actions with clear local or callback state</p>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-6">
          {GROUPS.map((group) => (
            <section key={group} aria-labelledby={`premium-${group.replaceAll(" ", "-")}`}>
              <h3 id={`premium-${group.replaceAll(" ", "-")}`} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">{group}</h3>
              <div className="flex flex-wrap gap-3">
                {BUTTONS.filter((button) => button.group === group).map((button) => (
                  <AnimatedButton key={button.action} config={button} reduceMotion={Boolean(reduceMotion)} onAction={() => runAction(button)} />
                ))}
              </div>
            </section>
          ))}
          <p role="status" aria-live="polite" aria-atomic="true" className="rounded-xl border cs-border cs-input px-3 py-2 text-[10.5px] cs-muted">{status}</p>
        </div>

        <footer className="border-t cs-border px-6 py-2.5 text-center">
          <p className="text-[10px] cs-subtle">Motion is decorative; every activation dispatches a named action.</p>
        </footer>
      </div>
    </motion.div>
  );
}

function AnimatedButton({ config, reduceMotion, onAction }: { config: ButtonConfig; reduceMotion: boolean; onAction: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const duration = reduceMotion ? 0 : config.duration ?? 0.55;

  useEffect(() => () => {
    if (resetRef.current) clearTimeout(resetRef.current);
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handleClick = () => {
    onAction();
    if (resetRef.current) clearTimeout(resetRef.current);
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (reduceMotion) return;
    setIsAnimating(false);
    frameRef.current = requestAnimationFrame(() => {
      setIsAnimating(true);
      frameRef.current = null;
    });
    resetRef.current = setTimeout(() => {
      setIsAnimating(false);
      resetRef.current = null;
    }, duration * 1000);
  };

  const sizes = {
    sm: "px-4 py-2 text-[12.5px]",
    md: "px-5 py-2.5 text-[13px]",
    lg: "px-7 py-3 text-[14px]",
  };
  const tones = {
    slate: "border-transparent bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
    emerald: "border-transparent bg-emerald-700 text-white",
    rose: "border-transparent bg-rose-700 text-white",
    outline: "border cs-border cs-surface cs-text",
    link: "border cs-border cs-surface text-blue-700 dark:text-blue-300",
  };
  const wipes = {
    slate: "bg-blue-600",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    outline: "bg-slate-100 dark:bg-white/10",
    link: "bg-blue-50 dark:bg-blue-500/10",
  };
  const tone = config.tone ?? "slate";
  const size = config.size ?? "md";
  const arrowPosition = config.arrowPosition ?? "right";
  const showArrow = config.showArrow ?? true;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border font-semibold shadow-sm transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${sizes[size]} ${tones[tone]}`}
    >
      <motion.span aria-hidden className={`absolute inset-0 ${wipes[tone]}`} initial={{ x: "-105%" }} animate={{ x: isAnimating ? "0%" : "-105%" }} transition={{ duration, ease: [0.4, 0, 0.2, 1] }} />
      <motion.span className="relative z-10 flex items-center gap-2" animate={reduceMotion ? undefined : { x: isAnimating ? (arrowPosition === "right" ? -2 : 2) : 0 }} transition={{ duration: duration * 0.7 }}>
        {showArrow && arrowPosition === "left" && !config.icon && <ArrowRight aria-hidden className="h-4 w-4 rotate-180" />}
        {config.icon}
        <span>{config.label}</span>
        {showArrow && arrowPosition === "right" && !config.icon && <ArrowRight aria-hidden className="h-4 w-4" />}
      </motion.span>
      {!reduceMotion && <motion.span aria-hidden className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" initial={{ x: "-120%" }} animate={{ x: isAnimating ? "220%" : "-120%" }} transition={{ duration: duration * 0.8, ease: "easeOut" }} />}
    </motion.button>
  );
}