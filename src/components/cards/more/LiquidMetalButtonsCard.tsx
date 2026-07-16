"use client";

import type React from "react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Home,
  Search,
  Settings,
  User,
  Bell,
  Heart,
  Share2,
  Download,
  Play,
  Plus,
  Mail,
  Camera,
  Music,
  Video,
  Bookmark,
  Lock,
  Wifi,
  Moon,
  Zap,
  Globe,
  Cloud,
  Mic,
  Send,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// LiquidMetalButtonsCard — a grid of 24 premium liquid-metal icon buttons.
// Each button has a unique click animation, mouse-tracking glow, press depth,
// and a metallic gradient surface. Theme-aware: in light mode the metal reads
// as polished silver/chrome; in dark mode it reads as graphite/black chrome.

export type LiquidMetalActionId =
  | "slide-right" | "bounce" | "zoom" | "spin" | "wave" | "shake"
  | "heartbeat" | "spread" | "drop" | "pulse" | "rotate-in" | "flip"
  | "flash" | "bounce-beat" | "record" | "slide-down" | "lock-shake"
  | "signal" | "phase" | "spark" | "rotate" | "float" | "pulse-ring" | "fly";

export interface LiquidMetalButtonsCardProps {
  onAction?: (label: string, id: LiquidMetalActionId) => void;
}

const ICONS: { icon: LucideIcon; label: string; animation: LiquidMetalActionId }[] = [
  { icon: ArrowRight, label: "Next", animation: "slide-right" },
  { icon: Home, label: "Home", animation: "bounce" },
  { icon: Search, label: "Search", animation: "zoom" },
  { icon: Settings, label: "Settings", animation: "spin" },
  { icon: User, label: "Profile", animation: "wave" },
  { icon: Bell, label: "Alerts", animation: "shake" },
  { icon: Heart, label: "Like", animation: "heartbeat" },
  { icon: Share2, label: "Share", animation: "spread" },
  { icon: Download, label: "Download", animation: "drop" },
  { icon: Play, label: "Play", animation: "pulse" },
  { icon: Plus, label: "Add", animation: "rotate-in" },
  { icon: Mail, label: "Mail", animation: "flip" },
  { icon: Camera, label: "Snap", animation: "flash" },
  { icon: Music, label: "Music", animation: "bounce-beat" },
  { icon: Video, label: "Rec", animation: "record" },
  { icon: Bookmark, label: "Bookmark", animation: "slide-down" },
  { icon: Lock, label: "Lock", animation: "lock-shake" },
  { icon: Wifi, label: "Wifi", animation: "signal" },
  { icon: Moon, label: "Night", animation: "phase" },
  { icon: Zap, label: "Zap", animation: "spark" },
  { icon: Globe, label: "Web", animation: "rotate" },
  { icon: Cloud, label: "Cloud", animation: "float" },
  { icon: Mic, label: "Voice", animation: "pulse-ring" },
  { icon: Send, label: "Send", animation: "fly" },
];

const CLICK_ANIMATIONS: Record<LiquidMetalActionId, { transform: string; color: string }> = {
  "slide-right": { transform: "translateX(8px) scale(1.2)", color: "var(--btn-accent)" },
  bounce: { transform: "translateY(-10px) scale(1.2)", color: "var(--btn-accent)" },
  zoom: { transform: "scale(1.5)", color: "var(--btn-accent)" },
  spin: { transform: "rotate(180deg) scale(1.1)", color: "var(--btn-accent)" },
  wave: { transform: "rotate(-15deg) scale(1.2)", color: "var(--btn-accent)" },
  shake: { transform: "rotate(20deg) scale(1.2)", color: "var(--btn-accent)" },
  heartbeat: { transform: "scale(1.4)", color: "#ff6b6b" },
  spread: { transform: "scale(1.3) rotate(15deg)", color: "var(--btn-accent)" },
  drop: { transform: "translateY(6px) scale(1.2)", color: "var(--btn-accent)" },
  pulse: { transform: "scale(1.4)", color: "var(--btn-accent)" },
  "rotate-in": { transform: "rotate(90deg) scale(1.3)", color: "var(--btn-accent)" },
  flip: { transform: "rotateY(180deg) scale(1.2)", color: "var(--btn-accent)" },
  flash: { transform: "scale(1.5)", color: "#facc15" },
  "bounce-beat": { transform: "translateY(-6px) scale(1.2)", color: "var(--btn-accent)" },
  record: { transform: "scale(1.3)", color: "#ff4444" },
  "slide-down": { transform: "translateY(4px) scale(1.2)", color: "var(--btn-accent)" },
  "lock-shake": { transform: "translateX(4px) scale(1.2)", color: "var(--btn-accent)" },
  signal: { transform: "scale(1.3)", color: "#4ade80" },
  phase: { transform: "rotate(-30deg) scale(1.2)", color: "#fbbf24" },
  spark: { transform: "scale(1.4) rotate(15deg)", color: "#facc15" },
  rotate: { transform: "rotate(360deg) scale(1.1)", color: "#60a5fa" },
  float: { transform: "translateY(-8px) scale(1.2)", color: "var(--btn-accent)" },
  "pulse-ring": { transform: "scale(1.3)", color: "#ef4444" },
  fly: { transform: "translate(10px, -10px) scale(1.2)", color: "var(--btn-accent)" },
};

const GLOW_COLORS: Partial<Record<LiquidMetalActionId, string>> = {
  heartbeat: "rgba(255, 107, 107, 0.9)",
  flash: "rgba(250, 204, 21, 0.9)",
  record: "rgba(255, 68, 68, 0.9)",
  signal: "rgba(74, 222, 128, 0.9)",
  phase: "rgba(251, 191, 36, 0.9)",
  spark: "rgba(250, 204, 21, 0.9)",
  rotate: "rgba(96, 165, 250, 0.9)",
  "pulse-ring": "rgba(239, 68, 68, 0.9)",
};

const TOGGLE_ACTIONS = new Set<LiquidMetalActionId>(["shake", "heartbeat", "bounce-beat", "record", "slide-down", "lock-shake", "signal", "phase", "pulse-ring"]);

export function LiquidMetalButtonsCard({ onAction }: LiquidMetalButtonsCardProps = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeActions, setActiveActions] = useState<Set<LiquidMetalActionId>>(() => new Set());
  const [status, setStatus] = useState("Choose an icon action.");

  const handleAction = (label: string, id: LiquidMetalActionId) => {
    const enabled = TOGGLE_ACTIONS.has(id) ? !activeActions.has(id) : null;
    if (enabled !== null) {
      setActiveActions((current) => {
        const next = new Set(current);
        if (enabled) next.add(id);
        else next.delete(id);
        return next;
      });
    }
    onAction?.(label, id);
    setStatus(enabled === null
      ? (onAction ? `${label} action dispatched.` : `${label} selected in local preview mode.`)
      : `${label} ${enabled ? "enabled" : "disabled"}${onAction ? " and dispatched" : " locally"}.`);
  };

  return (
    <motion.div
      className="w-[clamp(320px,95vw,520px)] select-none"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
    >
      {/* CSS custom properties for theme-aware metallic surfaces.
          Dark mode: full metallic depth with layered shadows.
          Light mode: clean, flat, minimal — just a subtle border + soft bg. */}
      <style>{`
        .lm-card {
          --btn-accent: #7c3aed;
          --metal-outer-from: #f4f4f5;
          --metal-outer-to: #e4e4e7;
          --metal-ring-from: #ffffff;
          --metal-ring-via: #f0f0f1;
          --metal-ring-to: #e8e8ea;
          --metal-body-from: #fafafa;
          --metal-body-to: #e8e8ea;
          --metal-sheen: rgba(0,0,0,0.03);
          --metal-border: rgba(0,0,0,0.08);
          --card-bg-from: #ffffff;
          --card-bg-to: #f9f9fb;
          --card-border: rgba(0,0,0,0.08);
          --card-header-border: rgba(0,0,0,0.06);
          --label-color: rgba(0,0,0,0.5);
          --btn-shadow: none;
          --btn-shadow-pressed: inset 0 2px 4px rgba(0,0,0,0.06);
          --btn-inset: inset 0 1px 0 rgba(255,255,255,0.8);
          --top-line-opacity: 0;
          --ambient-glow-opacity: 0.5;
        }
        .dark .lm-card {
          --btn-accent: #c084fc;
          --metal-outer-from: #1a1a1a;
          --metal-outer-to: #0a0a0a;
          --metal-ring-from: #4a4a4a;
          --metal-ring-via: #2a2a2a;
          --metal-ring-to: #3a3a3a;
          --metal-body-from: #252525;
          --metal-body-to: #181818;
          --metal-sheen: rgba(255,255,255,0.08);
          --metal-border: rgba(120,120,120,0.2);
          --card-bg-from: #0a0a0a;
          --card-bg-to: #050505;
          --card-border: rgba(255,255,255,0.10);
          --card-header-border: rgba(255,255,255,0.06);
          --label-color: rgba(255,255,255,0.35);
          --btn-shadow: 0 10px 25px rgba(0,0,0,0.5), 0 4px 10px rgba(0,0,0,0.3);
          --btn-shadow-pressed: inset 0 8px 20px rgba(0,0,0,0.6), inset 0 2px 8px rgba(0,0,0,0.4);
          --btn-inset: inset 0 4px 12px rgba(0,0,0,0.4), inset 0 -1px 4px rgba(255,255,255,0.03);
          --top-line-opacity: 1;
          --ambient-glow-opacity: 1;
        }
      `}</style>

      {/* Ambient glow — subtle in light mode, full in dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.12), transparent 55%), radial-gradient(circle at 70% 80%, rgba(96,165,250,0.08), transparent 60%)",
          opacity: "var(--ambient-glow-opacity)",
        }}
      />

      <div className="lm-card overflow-hidden rounded-[22px] border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
        style={{
          borderColor: "var(--card-border)",
          background: "linear-gradient(to bottom, var(--card-bg-from), var(--card-bg-to))",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b px-6 py-4" style={{ borderColor: "var(--card-header-border)" }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg ring-1"
            style={{ background: "var(--metal-sheen)", borderColor: "var(--card-border)" }}
          >
            <Zap className="h-3.5 w-3.5" strokeWidth={2.2} style={{ color: "var(--btn-accent)" }} />
          </div>
          <div>
            <h2 className="text-[15px] font-bold tracking-tight" style={{ color: "var(--label-color)" }}>Liquid Metal Buttons</h2>
            <p className="text-[11px]" style={{ color: "var(--label-color)", opacity: 0.7 }}>24 unique click animations · tap any icon</p>
          </div>
        </div>

        {/* Button grid */}
        <div className="grid grid-cols-4 gap-3 p-5 sm:grid-cols-6 sm:gap-4">
          {ICONS.map(({ icon, label, animation }, i) => (
            <motion.div
              key={animation}
              className="flex flex-col items-center gap-1.5"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : i * 0.02, ease: EASE }}
            >
              <LiquidMetalButton
                icon={icon}
                label={label}
                animationType={animation}
                active={activeActions.has(animation)}
                toggle={TOGGLE_ACTIONS.has(animation)}
                onAction={handleAction}
                reduceMotion={Boolean(prefersReducedMotion)}
              />
              <span className="text-[9.5px] font-medium" style={{ color: "var(--label-color)", opacity: 0.7 }}>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-2.5 text-center" style={{ borderColor: "var(--card-header-border)" }}>
          <p role="status" aria-live="polite" aria-atomic="true" className="text-[10px]" style={{ color: "var(--label-color)", opacity: 0.75 }}>{status}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LiquidMetalButton({
  icon: Icon,
  label,
  animationType = "slide-right",
  active,
  toggle,
  onAction,
  reduceMotion,
}: {
  icon: LucideIcon;
  label: string;
  animationType?: LiquidMetalActionId;
  active: boolean;
  toggle: boolean;
  onAction: (label: string, id: LiquidMetalActionId) => void;
  reduceMotion: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shakePhase, setShakePhase] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (shakeIntervalRef.current) clearInterval(shakeIntervalRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = () => {
    onAction?.(label, animationType);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (shakeIntervalRef.current) clearInterval(shakeIntervalRef.current);
    setIsClicked(true);

    if (!reduceMotion && (animationType === "shake" || animationType === "lock-shake")) {
      let count = 0;
      shakeIntervalRef.current = setInterval(() => {
        setShakePhase((prev) => (prev === 1 ? -1 : 1));
        count++;
        if (count >= 6 && shakeIntervalRef.current) {
          clearInterval(shakeIntervalRef.current);
          shakeIntervalRef.current = null;
          setShakePhase(0);
        }
      }, 50);
    }

    resetTimerRef.current = setTimeout(() => {
      setIsClicked(false);
      setShakePhase(0);
      resetTimerRef.current = null;
    }, reduceMotion ? 150 : 500);
  };

  const clickAnim = CLICK_ANIMATIONS[animationType];
  const glowColor = GLOW_COLORS[animationType] || "rgba(255, 255, 255, 0.9)";

  const getIconTransform = () => {
    if (reduceMotion) return "scale(1)";
    if (isClicked) {
      if ((animationType === "shake" || animationType === "lock-shake") && shakePhase !== 0) {
        return `translateX(${shakePhase * 4}px) scale(1.2)`;
      }
      return clickAnim.transform;
    }
    if (isPressed) return "scale(0.95)";
    if (isHovering) return "scale(1.05)";
    return "scale(1)";
  };

  const getIconColor = () => {
    if (isClicked) return clickAnim.color;
    if (active) return "var(--btn-accent)";
    if (isPressed) return "var(--label-color)";
    if (isHovering) return "var(--btn-accent)";
    return "var(--label-color)";
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={toggle ? active : undefined}
      className="group relative inline-flex touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
      style={{
        transform: reduceMotion ? "none" : isPressed ? "translateY(4px)" : "translateY(0)",
        transition: reduceMotion ? "none" : "transform 0.1s ease-out",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x + 32}px ${mousePosition.y + 32}px, rgba(168, 85, 247, 0.15), transparent 60%)`,
          opacity: isHovering ? (isPressed ? 0.5 : 1) : 0,
        }}
      />

      {/* Metallic outer ring */}
      <div
        className="relative rounded-full p-[3px] transition-all duration-100"
        style={{
          background: "linear-gradient(to bottom, var(--metal-outer-from), var(--metal-outer-to))",
          boxShadow: isPressed ? "var(--btn-shadow-pressed)" : "var(--btn-shadow)",
        }}
      >
        <div className="relative overflow-hidden rounded-full p-[2px]">
          {/* Brushed metal texture */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(to bottom, var(--metal-ring-from), var(--metal-ring-via), var(--metal-ring-to))",
            }}
          />

          {/* Mouse-tracking highlight */}
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-150"
            style={{
              background: isHovering
                ? `radial-gradient(60px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 25%, rgba(220, 230, 255, 0.2) 50%, transparent 70%)`
                : "transparent",
            }}
          />

          {/* Inner surface */}
          <div className="relative overflow-hidden rounded-full">
            <div
              className="absolute inset-0 rounded-full transition-opacity duration-150"
              style={{
                background: isHovering
                  ? `radial-gradient(60px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08) 0%, transparent 60%)`
                  : "transparent",
              }}
            />

            {/* Click glow burst */}
            <div
              className="absolute inset-0 rounded-full transition-all"
              style={{
                background: `radial-gradient(circle, ${glowColor.replace("0.9", "0.3")} 0%, transparent 70%)`,
                transform: isClicked ? "scale(2)" : "scale(0)",
                opacity: isClicked ? 0 : 1,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
              }}
            />

            {/* Button body */}
            <div
              className="relative rounded-full px-5 py-3 transition-all duration-100"
              style={{
                background: "linear-gradient(to bottom, var(--metal-body-from), var(--metal-body-to))",
                boxShadow: isPressed ? "var(--btn-shadow-pressed)" : "var(--btn-inset)",
              }}
            >
              {/* Top sheen */}
              <div
                className="absolute inset-x-0 top-0 h-1/3 rounded-t-full transition-opacity duration-100"
                style={{
                  background: "linear-gradient(to bottom, var(--metal-sheen), transparent)",
                  opacity: isPressed ? 0.3 : 1,
                }}
              />
              {/* Bottom shadow */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 rounded-b-full bg-gradient-to-t from-black/20 to-transparent" />

              <Icon
                className="relative z-10 h-5 w-5"
                strokeWidth={1.5}
                style={{
                  color: getIconColor(),
                  transform: getIconTransform(),
                  filter: isClicked
                    ? `drop-shadow(0 0 15px ${glowColor})`
                    : isPressed
                      ? "drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))"
                      : isHovering
                        ? "drop-shadow(0 0 6px rgba(168, 85, 247, 0.3))"
                        : "none",
                  transition:
                    animationType === "spin" || animationType === "rotate"
                      ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease-out, filter 0.15s ease-out"
                      : "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease-out, filter 0.15s ease-out",
                }}
              />

              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border" style={{ borderColor: "var(--metal-border)" }} />
              {/* Press overlay */}
              <div
                className="absolute inset-0 rounded-full transition-opacity duration-100"
                style={{ background: "var(--metal-sheen)", opacity: isPressed ? 0.5 : 0 }}
              />
            </div>
          </div>
        </div>

        {/* Top highlight line — only visible in dark mode */}
        <div
          className="absolute inset-x-6 top-1 h-[1px] rounded-full transition-opacity duration-100"
          style={{
            background: "linear-gradient(to right, transparent, var(--metal-sheen), transparent)",
            opacity: isPressed ? 0 : "var(--top-line-opacity)",
          }}
        />
      </div>
    </button>
  );
}
