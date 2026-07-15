"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Shield, ArrowRight } from "lucide-react";
import { pricingPlan } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;

// PricingPlanCard — emerald ticket aesthetic. In light mode the card is a
// light emerald-tinted surface; in dark mode it's a deep emerald-black.

export function PricingPlanCard() {
  const plan = pricingPlan;
  const [billingYears, setBillingYears] = useState(false);

  const displayPrice = billingYears ? Math.round((plan.price * 10) / 12) : plan.price;
  const periodLabel = billingYears ? "/ mo · billed yearly" : plan.billingPeriod;

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Soft pulsing aura — calmer, deeper */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        animate={{
          opacity: [0.45, 0.7, 0.45],
          background: "radial-gradient(circle at 50% 30%, rgba(16,185,129,0.32), transparent 60%)",
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.article
        className="group/pricing relative overflow-hidden rounded-[24px] border border-emerald-500/20 bg-gradient-to-b from-emerald-50 to-white p-7 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.15)] dark:from-[#0c1a14] dark:via-[#0a1410] dark:to-[#070a09] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        whileHover="hover"
        initial="rest"
      >
        {/* Topographic SVG line pattern */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] dark:opacity-[0.08]"
          viewBox="0 0 400 560"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pat-pricing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d={`M-50 ${i * 32 + 10} C 80 ${i * 32 - 20}, 160 ${i * 32 + 40}, 280 ${i * 10}, 500 ${i * 32 + 20}`}
              stroke="url(#pat-pricing)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>

        {/* Border pulse on hover — smoother, single breath */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px] border border-emerald-400/40"
          variants={{
            rest: { opacity: 0, scale: 0.985 },
            hover: {
              opacity: [0, 1, 0.55],
              scale: 1,
              transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
            },
          }}
        />

        {/* Ticket perforation line */}
        <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-[272px] flex items-center">
          <div className="h-3.5 w-3.5 -ml-1.5 rounded-full bg-white shadow-sm ring-1 ring-emerald-500/20 dark:bg-[#070a09]" />
          <div className="h-px flex-1 border-t border-dashed border-emerald-500/25" />
          <div className="h-3.5 w-3.5 -mr-1.5 rounded-full bg-white shadow-sm ring-1 ring-emerald-500/20 dark:bg-[#070a09]" />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        <div className="relative text-slate-900 dark:text-white">
          <div className="flex items-center justify-between gap-2">
            {/* Popular badge — premium with shimmer */}
            <motion.span
              className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/pricing:translate-x-full"
              />
              <motion.span
                animate={{ rotate: [0, 20, -10, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
              >
                <Sparkles className="h-3 w-3" strokeWidth={2.4} />
              </motion.span>
              <span className="relative">Most popular</span>
              <span aria-hidden className="absolute -inset-1 -z-10 rounded-full bg-emerald-400/30 blur-md" />
            </motion.span>

            <div
              role="radiogroup"
              aria-label="Billing period"
              className="flex items-center rounded-full border border-emerald-500/20 bg-white/50 p-0.5 text-[11px] dark:bg-black/20"
            >
              <motion.button
                role="radio"
                aria-checked={!billingYears}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingYears(false)}
                className={`relative cursor-pointer rounded-full px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${
                  !billingYears ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-700/60 hover:text-emerald-700 dark:text-emerald-200/60 dark:hover:text-emerald-200"
                }`}
              >
                Monthly
              </motion.button>
              <motion.button
                role="radio"
                aria-checked={billingYears}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingYears(true)}
                className={`relative cursor-pointer rounded-full px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${
                  billingYears ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-700/60 hover:text-emerald-700 dark:text-emerald-200/60 dark:hover:text-emerald-200"
                }`}
              >
                Yearly
              </motion.button>
            </div>
          </div>

          <h2 className="mt-5 text-[26px] font-semibold leading-none tracking-tight">{plan.name}</h2>
          <p className="mt-1.5 text-[13px] text-slate-500 dark:text-emerald-100/55">{plan.tagline}</p>

          {/* Pricing — stronger hierarchy */}
          <div className="mt-5 flex items-end gap-1.5">
            <motion.span
              key={`prefix-${displayPrice}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mb-2 text-[18px] font-semibold text-slate-500 dark:text-emerald-100/55"
            >
              $
            </motion.span>
            <motion.span
              key={displayPrice}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-[64px] font-semibold leading-none tracking-tight tabular-nums"
              style={{ textShadow: "0 2px 24px rgba(16,185,129,0.18)" }}
            >
              {displayPrice}
            </motion.span>
            <span className="mb-2.5 text-[12.5px] text-slate-500 dark:text-emerald-100/55">{periodLabel}</span>
          </div>
          <AnimatePresence>
            {billingYears && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-1.5 overflow-hidden text-[11.5px] font-medium text-emerald-600 dark:text-emerald-300"
              >
                Save 16% vs. monthly — 2 months free
              </motion.p>
            )}
          </AnimatePresence>

          {/* Premium CTA with glow + moving sheen */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="group/cta relative mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 py-3.5 text-[13.5px] font-semibold text-slate-950 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.55)] transition hover:shadow-[0_16px_40px_-10px_rgba(16,185,129,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
            whileHover="hover"
            initial="rest"
          >
            {/* Pulsing outer glow */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-1 -z-10 rounded-xl blur-md"
              variants={{
                rest: { opacity: 0.25, scale: 0.96 },
                hover: {
                  opacity: [0.3, 0.7, 0.3],
                  scale: 1.06,
                  transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                },
              }}
              style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.6), rgba(52,211,153,0.6))" }}
            />
            {/* Moving sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
            />
            <span className="relative">{plan.ctaLabel}</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" strokeWidth={2.4} />
          </motion.button>

          {/* Trust copy — premium placement with icon chip */}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-slate-400 dark:text-emerald-100/45">
            <Shield className="h-3.5 w-3.5 text-emerald-500/70 dark:text-emerald-400/60" strokeWidth={1.9} />
            {plan.trustMicrocopy}
          </p>

          {/* Feature list — clearer icons, better states */}
          <ul className="mt-6 space-y-2.5 pt-1">
            {plan.features.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04, ease: EASE }}
                className={`flex items-center gap-3 text-[13px] transition ${
                  f.included ? "text-slate-800 dark:text-emerald-50/90" : "text-slate-400 line-through dark:text-emerald-100/30"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition ${
                    f.included
                      ? "bg-emerald-400/15 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-400/20"
                      : "bg-slate-200 text-slate-400 dark:bg-white/[0.06] dark:text-white/30"
                  }`}
                >
                  {f.included ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.15 + i * 0.04 }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </motion.span>
                  ) : (
                    <X className="h-2.5 w-2.5" strokeWidth={3} />
                  )}
                </span>
                <span className="flex-1">{f.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  );
}
