"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Leaf } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing018 — Warm earthy beige with Fraunces serif + grain
// Warm beige (#f0e9dc) + Fraunces serif display + paper grain texture +
// emerald accent for sustainability brand. Cards are unbordered tiles with
// soft shadows. Toggle is a stem-switch slider. Popular card has leaf badge.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Sprout", price: 0, annual: 0, desc: "For curious gardeners",
    features: ["3 plant journals", "Basic care reminders", "Community access", "1 photo per plant"],
    cta: "Start growing",
  },
  {
    name: "Gardener", price: 14, annual: 11, desc: "For home plant parents",
    features: ["Unlimited journals", "Smart care reminders", "Photo gallery (unlimited)", "Disease identification", "Watering schedule", "Light tracking", "Weekly digest"],
    cta: "Cultivate", popular: true,
  },
  {
    name: "Botanist", price: 39, annual: 32, desc: "For pros and small businesses",
    features: ["Everything in Gardener", "Multi-garden management", "Client sharing", "Inventory tracking", "Custom reports", "API access"],
    cta: "Go pro",
  },
];

export function Pricing018Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      className="relative py-24"
      style={{
        background: "#f0e9dc",
        fontFamily: "var(--font-fraunces), Georgia, serif",
        color: "#2d2418",
      }}
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Warm radial glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(217,119,6,0.15), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(217,119,6,0.1)", color: "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}>
            <Leaf className="h-3 w-3" /> Verdant Pricing
          </span>
          <h2 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
            Pricing that<br />
            <em style={{ color: "#92400e" }}>grows with you.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base" style={{ color: "#5c4a32", fontFamily: "var(--font-inter-tight), sans-serif" }}>
            Made with care for plant lovers everywhere.
          </p>

          {/* Stem-switch slider */}
          <div className="mt-8 inline-flex items-center gap-3">
            <span className={`text-sm ${!annual ? "font-semibold" : ""}`} style={{ color: annual ? "#92400e80" : "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative h-7 w-14 rounded-full border-2 transition-colors"
              style={{ background: annual ? "#92400e" : "rgba(45,36,24,0.15)", borderColor: "#2d2418" }}
              aria-label="Toggle billing"
            >
              <motion.div
                animate={{ x: annual ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-0.5 h-5 w-5 rounded-full bg-[#f0e9dc] border border-[#2d2418]"
              />
            </button>
            <span className={`text-sm ${annual ? "font-semibold" : ""}`} style={{ color: annual ? "#92400e" : "#92400e80", fontFamily: "var(--font-jetbrains), monospace" }}>
              Annual <span className="text-xs italic" style={{ fontFamily: "var(--font-fraunces), serif" }}>save 21%</span>
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-7 shadow-lg transition-shadow hover:shadow-xl ${
                plan.popular ? "bg-amber-50" : "bg-[#fbf7ed]"
              }`}
              style={{ border: "1px solid rgba(45,36,24,0.08)" }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: "#92400e" }}>
                  <Leaf className="h-3 w-3" /> Most Loved
                </span>
              )}

              <h3 className="text-2xl font-medium tracking-tight" style={{ fontStyle: "italic" }}>{plan.name}</h3>
              <p className="mt-1 text-sm" style={{ color: "#5c4a32", fontFamily: "var(--font-inter-tight), sans-serif" }}>{plan.desc}</p>

              <div className="my-5 flex items-baseline gap-1.5 border-b pb-5" style={{ borderColor: "rgba(45,36,24,0.1)" }}>
                <span className="text-5xl font-medium" style={{ letterSpacing: "-0.02em" }}>
                  ${annual ? plan.annual : plan.price}
                </span>
                <span className="text-sm" style={{ color: "#5c4a32", fontFamily: "var(--font-inter-tight), sans-serif" }}>/mo</span>
              </div>

              <button
                className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.02] ${
                  plan.popular ? "text-white" : "border-2"
                }`}
                style={{
                  background: plan.popular ? "#92400e" : "transparent",
                  color: plan.popular ? "#f0e9dc" : "#2d2418",
                  borderColor: plan.popular ? "transparent" : "#2d2418",
                  fontFamily: "var(--font-inter-tight), sans-serif",
                }}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#5c4a32", fontFamily: "var(--font-inter-tight), sans-serif" }}>
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#92400e" }} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs italic" style={{ color: "#5c4a32" }}>
          A portion of every subscription funds community gardens · Cancel anytime
        </p>
      </div>
    </section>
  );
}
