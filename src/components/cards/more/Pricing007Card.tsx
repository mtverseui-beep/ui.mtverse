"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Star } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing007 — Brutalist (black/yellow with offset shadows)
// Off-white bg + heavy black borders + offset hard shadows (no blur) +
// Archivo Black display + tab toggle + popular card with rotated badge.
// Hover: card lifts and shadow grows.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "BASIC", price: 0, yearly: 0, desc: "Dip your toes in.",
    features: ["1 project", "Community", "100MB storage", "Basic stats"],
    cta: "Start free",
  },
  {
    name: "PRO", price: 29, yearly: 24, desc: "For serious builders.",
    features: ["Unlimited projects", "Priority support", "50GB storage", "Advanced analytics", "Custom domains", "API access"],
    cta: "Get Pro", popular: true,
  },
  {
    name: "MAX", price: 99, yearly: 79, desc: "For scaling teams.",
    features: ["Everything in PRO", "SSO + SAML", "Unlimited storage", "Audit logs", "Dedicated manager", "SLA"],
    cta: "Go MAX",
  },
];

export function Pricing007Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="relative py-24"
      style={{
        background: "#fefce8",
        fontFamily: "var(--font-archivo), system-ui, sans-serif",
        color: "#0a0a0a",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start gap-6">
          <span className="border-2 border-black bg-yellow-300 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            PRICING
          </span>
          <h1 className="text-5xl font-black uppercase leading-[0.9] md:text-7xl" style={{ letterSpacing: "-0.05em" }}>
            Pick a plan.<br />
            <span className="bg-yellow-300 px-2">Build fast.</span>
          </h1>

          {/* Toggle — brutalist square */}
          <div className="flex items-center gap-0 border-2 border-black bg-white">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${!annual ? "bg-black text-yellow-300" : "text-black hover:bg-yellow-100"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${annual ? "bg-black text-yellow-300" : "text-black hover:bg-yellow-100"}`}
            >
              Annual
              <span className="rounded-none bg-yellow-300 px-1.5 py-0.5 text-[9px] text-black">-20%</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative border-2 border-black bg-white p-7 transition-all ${
                plan.popular
                  ? "shadow-[10px_10px_0_0_#000] hover:shadow-[14px_14px_0_0_#000]"
                  : "shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000]"
              }`}
            >
              {plan.popular && (
                <span
                  className="absolute -right-2 -top-2 flex items-center gap-1 border-2 border-black bg-yellow-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ transform: "rotate(3deg)" }}
                >
                  <Star className="h-3 w-3 fill-black" /> Popular
                </span>
              )}

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {plan.name}
              </p>
              <p className="mt-1 text-sm text-black/70">{plan.desc}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-black" style={{ letterSpacing: "-0.04em" }}>${annual ? plan.yearly : plan.price}</span>
                <span className="text-sm font-bold text-black/60">/mo</span>
              </div>
              {annual && plan.price > 0 && (
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ${plan.yearly * 12}/yr billed
                </p>
              )}

              <button
                className={`mt-6 flex w-full items-center justify-center gap-1.5 border-2 border-black py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  plan.popular
                    ? "bg-black text-yellow-300 hover:bg-yellow-300 hover:text-black"
                    : "bg-white text-black hover:bg-black hover:text-yellow-300"
                }`}
              >
                {plan.cta}
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <div className="my-5 h-0.5 border-t-2 border-dashed border-black" />

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300">
                      <Check className="h-2.5 w-2.5" strokeWidth={4} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-black/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          All plans include 14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}
