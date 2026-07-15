"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  Zap,
  Users,
  Gauge,
  ChevronDown,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { glassFeature } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS_ICONS = [Users, Gauge, Zap] as const;

// GlassFeatureCard — frosted glass on pastel backdrop. The glass surface
// uses cs-surface tokens so text flips with theme. Height is capped so the
// expandable details area never causes page scroll.

export function GlassFeatureCard() {
  const feature = glassFeature;
  const [expanded, setExpanded] = useState(false);
  const [sweeping, setSweeping] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 180, damping: 22 });
  // Pointer-following sheen — two layered highlights that drift smoothly.
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(py, [0, 1], ["20%", "80%"]);
  const pointerGlow = useTransform(
    [glowX, glowY],
    ([gx, gy]: string[]) =>
      `radial-gradient(220px circle at ${gx} ${gy}, rgba(129,140,248,0.18), transparent 60%)`,
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,380px)] select-none"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Pastel ambient gradient — softened, broader spread */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, rgba(125,211,252,0.20), transparent 55%), radial-gradient(circle at 78% 82%, rgba(165,180,252,0.18), transparent 60%)",
        }}
      />

      <motion.article
        className="relative overflow-hidden rounded-[26px] border border-slate-200/60 shadow-[0_30px_80px_-30px_rgba(30,58,95,0.22)] backdrop-blur-2xl dark:border-white/10 dark:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.7)]"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          // Premium frosted glass — layered translucent surface, tinted by theme.
          backgroundColor: "color-mix(in srgb, var(--card-surface) 62%, transparent)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 100%)",
          // Inner rim light + multi-layer shadow for depth.
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.20), inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -1px 0 0 rgba(15,23,42,0.04), 0 30px 80px -30px rgba(30,58,95,0.22)",
        }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setSweeping(true)}
        onPointerLeave={() => { setSweeping(false); px.set(0.5); py.set(0.5); }}
      >
        {/* Pointer-follow inner glow — subtle radial that tracks the cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: pointerGlow }}
        />

        {/* Animated conic border highlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[26px]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.55) 40deg, transparent 90deg, transparent 270deg, rgba(125,211,252,0.45) 320deg, transparent 360deg)",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
          }}
          animate={{ rotate: sweeping ? 360 : 0 }}
          transition={{ duration: 4, repeat: sweeping ? Infinity : 0, ease: "linear" }}
        />

        {/* Light sweep — smoother follow-the-pointer sheen */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
          <motion.div
            className="absolute -inset-y-12 w-1/3 -skew-x-12"
            style={{
              left: sheenX,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              filter: "blur(10px)",
              mixBlendMode: "overlay",
            }}
            animate={{ opacity: sweeping ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
          <motion.div
            className="absolute -inset-y-12 w-1/4 -skew-x-12"
            style={{
              left: glowX,
              top: glowY,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(165,180,252,0.32) 50%, transparent 100%)",
              filter: "blur(14px)",
            }}
            animate={{ opacity: sweeping ? 0.8 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/40 dark:via-white/40 to-transparent"
        />

        <div className="relative p-5 text-slate-800 dark:text-white">
          <header className="flex items-start justify-between">
            {/* Icon badge with premium halo glow + refined floating */}
            <motion.div
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300/50 bg-gradient-to-br from-white/70 to-white/30 shadow-[0_8px_24px_-6px_rgba(99,102,241,0.4)] dark:border-white/20 dark:from-white/25 dark:to-white/5"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Soft pulsing halo — outer glow that breathes */}
              <motion.div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-3xl blur-xl"
                animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(129,140,248,0.65), transparent 70%)",
                }}
              />
              {/* Inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent opacity-60"
              />
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-white" strokeWidth={1.8} />
            </motion.div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-200">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                  animate={{ opacity: [0, 0.6, 0], scale: [1, 2, 2.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {feature.badge}
            </span>
          </header>

          <h2 className="mt-4 text-[20px] font-semibold leading-tight">
            {feature.title}
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-white/65">
            {feature.description}
          </p>

          {/* Hero image — reduced height to prevent scroll */}
          <div className="relative mt-4 h-[130px] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/10">
            <Image
              src={feature.imageUrl}
              alt="Abstract SaaS product visualisation"
              fill
              sizes="340px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent dark:from-slate-950/50"
            />
            {/* Glossy reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"
            />
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/30 px-2.5 py-1 text-[10.5px] font-medium text-slate-800 backdrop-blur-md dark:border-white/15 dark:bg-black/30 dark:text-white/85">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-indigo-500"
                  animate={{ opacity: [0, 0.7, 0], scale: [1, 2, 2.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
              </span>
              Live now
            </div>
          </div>

          {/* Mini stats row — cleaner layout with subtle dividers */}
          <div className="mt-3 grid grid-cols-3 divide-x divide-slate-200/60 dark:divide-white/10 rounded-xl border border-slate-200/60 bg-white/30 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
            {feature.stats.map((stat, i) => {
              const Icon = STATS_ICONS[i % STATS_ICONS.length];
              return (
                <div
                  key={stat.label}
                  className="group/stat relative flex flex-col gap-1 px-3 py-2.5 transition-colors hover:bg-white/40 dark:hover:bg-white/[0.05] first:rounded-l-xl last:rounded-r-xl"
                >
                  <Icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" strokeWidth={1.9} />
                  <div className="text-[14px] font-semibold tabular-nums leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 dark:text-white/45">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Expandable detail area */}
          <motion.button
            type="button"
            aria-expanded={expanded}
            aria-controls="glass-feature-details"
            onClick={() => setExpanded((v) => !v)}
            whileTap={{ scale: 0.98 }}
            className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200/60 bg-white/30 px-3.5 py-2 text-left text-[12.5px] font-medium text-slate-700 transition cs-hover dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          >
            <span className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" strokeWidth={2.2} />
              Technical specifications
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-slate-400 dark:text-white/55"
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
            </motion.span>
          </motion.button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="glass-feature-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {feature.details.map((d, i) => (
                    <motion.li
                      key={d.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: EASE }}
                      className="rounded-lg border border-slate-200/40 bg-white/20 px-3 py-2 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.03]"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-white/40">{d.label}</div>
                      <div className="mt-0.5 text-[12px] font-medium text-slate-800 dark:text-white/85">{d.value}</div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="group/cta relative mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.7)] transition hover:shadow-[0_14px_34px_-10px_rgba(99,102,241,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            {/* Moving sheen inside CTA */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
            />
            <span className="relative">Explore the feature</span>
            <ArrowUpRight className="relative h-4 w-4 transition group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" strokeWidth={2.2} />
          </motion.button>
        </div>
      </motion.article>
    </motion.div>
  );
}
