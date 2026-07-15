"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eye, Play, Plus, Star } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// HoverVideoProductCard — luxury media product card.
// Midnight + amber palette. Product image with a hover "video preview" overlay
// (an animated sheen + play affordance, since we can't embed video), price +
// rating, quick-view button, color variant selector, and an add-to-cart
// action. Hover reveals the preview with a scale + overlay crossfade.

const VARIANTS = [
  { id: "midnight", label: "Midnight", color: "#0f172a", ring: "#f59e0b" },
  { id: "amber", label: "Amber", color: "#b45309", ring: "#f59e0b" },
  { id: "ivory", label: "Ivory", color: "#f5f5f4", ring: "#f59e0b" },
] as const;

export function HoverVideoProductCard() {
  const [hovered, setHovered] = useState(false);
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]["id"]>("midnight");
  const [added, setAdded] = useState(false);

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 12%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(15,23,42,0.20), transparent 60%)",
        }}
      />

      <article
        className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.5)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Media — reduced from aspect-[4/5] to a fixed 240px height so the
            whole card fits the shell canvas without bottom overflow. */}
        <div className="relative h-[240px] w-full overflow-hidden bg-zinc-900">
          {/* base product image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
              alt="Aurum One over-ear headphones in midnight finish"
              fill
              sizes="380px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* "video preview" overlay on hover — animated sheen + play affordance */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                {/* dark scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-zinc-950/40" />
                {/* moving amber sheen */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(245,158,11,0.18) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-40%", "140%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* play affordance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/30" />
                    <Play className="h-5 w-5 fill-white text-white" />
                  </motion.span>
                </div>
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Preview · 0:42
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* top badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-zinc-900">
              Limited
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              aria-label="Quick view"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-zinc-900 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <Eye className="h-4 w-4" strokeWidth={2.2} />
            </motion.button>
          </div>
        </div>

        {/* Body — tighter padding to keep the card compact. */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
                Aurum Audio
              </p>
              <h3 className="mt-0.5 text-[16px] font-bold leading-tight cs-text">
                Aurum One · Reference
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" strokeWidth={2} />
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">4.9</span>
              <span className="text-[10px] cs-muted">(384)</span>
            </div>
          </div>

          <p className="mt-1 text-[11px] leading-snug cs-muted">
            Hand-finished aluminum, planar magnetic drivers, 60-hour battery.
          </p>

          {/* variants */}
          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider cs-subtle">Finish</span>
            {VARIANTS.map((v) => {
              const active = variant === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v.id)}
                  aria-label={v.label}
                  aria-pressed={active}
                  className="relative h-6 w-6 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
                  style={{ backgroundColor: v.color, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="variant-ring"
                      className="absolute -inset-1 rounded-full"
                      style={{ border: `2px solid ${v.ring}` }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* price + CTA */}
          <div className="mt-3 flex items-end justify-between border-t cs-border pt-2.5">
            <div>
              <p className="text-[10px] uppercase tracking-wider cs-subtle">Price</p>
              <p className="text-[22px] font-bold leading-none tabular-nums cs-text">$899</p>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setAdded((a) => !a)}
              aria-label={added ? "Added to cart" : "Add to cart"}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 ${
                added
                  ? "border border-amber-400/50 bg-amber-400/10 text-amber-700 dark:text-amber-300"
                  : "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400"
              }`}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              {added ? "In cart" : "Add to cart"}
            </motion.button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
