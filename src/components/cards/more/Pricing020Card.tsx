"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Apple } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing020 — Apple-style clean with tiered feature matrix
// Pure white + SF Pro-like (Inter Tight) + Apple-style spacious layout +
// gradient price text on highlighted plan + feature matrix below the cards
// showing which tier includes what. Subtle, premium, minimal.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Individual", price: 9.99, annual: 7.99, desc: "For one person",
    features: ["1TB storage", "All apps included", "Family Sharing (1)", "Standard support"],
    cta: "Buy",
  },
  {
    name: "Family", price: 16.99, annual: 13.99, desc: "For up to six people",
    features: ["2TB storage (shared)", "All apps included", "Family Sharing (6)", "Priority support", "Screen Time", "Personalized recommendations"],
    cta: "Buy", popular: true,
  },
  {
    name: "Premier", price: 29.99, annual: 24.99, desc: "For the whole household",
    features: ["4TB storage (shared)", "All apps + Fitness", "Family Sharing (6)", "24/7 priority support", "Apple Music family", "Apple TV+ family", "Apple Arcade"],
    cta: "Buy",
  },
];

const MATRIX = [
  { feature: "Storage", values: ["1TB", "2TB", "4TB"] },
  { feature: "Family Sharing", values: ["1 person", "6 people", "6 people"] },
  { feature: "Apple Music", values: [false, true, true] },
  { feature: "Apple TV+", values: [false, true, true] },
  { feature: "Apple Arcade", values: [false, false, true] },
  { feature: "Apple Fitness+", values: [false, false, true] },
  { feature: "Priority support", values: [false, true, true] },
];

export function Pricing020Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section className="bg-white py-24" style={{ fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#1d1d1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="mb-5 flex justify-center">
            <Apple className="h-10 w-10" fill="currentColor" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
            One subscription.<br />Everything Apple.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-[#86868b]">
            Bundle five Apple services into one. Save up to 30%.
          </p>

          {/* Apple-style toggle */}
          <div className="mt-7 inline-flex items-center gap-1 rounded-full bg-[#f5f5f7] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${!annual ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#86868b]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${annual ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#86868b]"}`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-7 transition-all ${
                plan.popular
                  ? "bg-gradient-to-b from-[#f5f5f7] to-white ring-2 ring-[#1d1d1f] md:-my-4 md:py-10"
                  : "bg-[#f5f5f7] hover:bg-[#ececef]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1d1d1f] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-1 text-sm text-[#86868b]">{plan.desc}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span
                  className="text-5xl font-semibold"
                  style={{
                    letterSpacing: "-0.04em",
                    backgroundImage: plan.popular ? "linear-gradient(135deg, #0071e3, #00c7ff)" : undefined,
                    WebkitBackgroundClip: plan.popular ? "text" : undefined,
                    WebkitTextFillColor: plan.popular ? "transparent" : undefined,
                    color: plan.popular ? undefined : "#1d1d1f",
                  }}
                >
                  ${annual ? plan.annual : plan.price}
                </span>
                <span className="text-sm text-[#86868b]">/mo</span>
              </div>
              {annual && (
                <p className="mt-1 text-xs text-[#86868b]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ${Math.round(plan.annual! * 12)}/yr
                </p>
              )}

              <button
                className={`mt-6 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-medium transition-all ${
                  plan.popular
                    ? "bg-[#0071e3] text-white hover:bg-[#0077ed]"
                    : "bg-[#1d1d1f] text-white hover:bg-[#000]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#1d1d1f]">
                    <Check className="h-4 w-4 flex-shrink-0 text-[#0071e3]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Feature matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 overflow-hidden rounded-2xl border border-[#d2d2d7]"
        >
          <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-[#d2d2d7] bg-[#f5f5f7] px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Feature</span>
            {PLANS.map((p) => (
              <span key={p.name} className="text-center text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{p.name}</span>
            ))}
          </div>
          {MATRIX.map((row, ri) => (
            <div key={row.feature} className={`grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-[#d2d2d7] px-5 py-3 last:border-b-0 ${ri % 2 === 1 ? "bg-[#fbfbfd]" : ""}`}>
              <span className="text-sm text-[#1d1d1f]">{row.feature}</span>
              {row.values.map((v, vi) => (
                <span key={vi} className="text-center text-sm">
                  {typeof v === "boolean" ? (
                    v ? <Check className="mx-auto h-4 w-4 text-[#0071e3]" strokeWidth={2.5} /> : <span className="text-[#86868b]">—</span>
                  ) : (
                    <span className="text-[#1d1d1f]">{v}</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-[#86868b]">
          Plan automatically renews until cancelled. <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0071e3] hover:underline">Learn more →</a>
        </p>
      </div>
    </section>
  );
}
