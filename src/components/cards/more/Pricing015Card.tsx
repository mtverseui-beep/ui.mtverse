"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing015 — Comparison table (single section, sticky feature col)
// Pure white + Inter Tight + horizontal plan comparison table with feature
// rows. Sticky leftmost "Features" column. Plan headers highlight on hover.
// Checkmarks/X marks. CTA row at bottom. Toggle in header.
// ════════════════════════════════════════════════════════════════════════════

interface Feature {
  label: string;
  values: (boolean | string)[];
}

const PLANS = [
  { name: "Starter", price: { m: 0, a: 0 }, cta: "Start free" },
  { name: "Pro", price: { m: 29, a: 24 }, cta: "Start trial", popular: true },
  { name: "Team", price: { m: 79, a: 64 }, cta: "Start trial" },
  { name: "Enterprise", price: { m: null, a: null }, cta: "Contact sales" },
];

const FEATURES: Feature[] = [
  { label: "Projects", values: ["3", "Unlimited", "Unlimited", "Unlimited"] },
  { label: "Storage", values: ["1GB", "50GB", "500GB", "Custom"] },
  { label: "Team members", values: ["1", "5", "20", "Unlimited"] },
  { label: "Priority support", values: [false, true, true, true] },
  { label: "Custom domains", values: [false, true, true, true] },
  { label: "SSO + SAML", values: [false, false, true, true] },
  { label: "Audit logs", values: [false, false, true, true] },
  { label: "SLA guarantee", values: [false, false, false, true] },
  { label: "Dedicated manager", values: [false, false, false, true] },
];

export function Pricing015Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.04em" }}>
            Compare every plan, side by side.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">
            Pick the right tier with full transparency.
          </p>

          <div className="mt-7 inline-flex items-center rounded-full border border-slate-200 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${!annual ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${annual ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Annual <span className="text-xs text-emerald-600">−17%</span>
            </button>
          </div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden rounded-2xl border border-slate-200"
        >
          {/* Plan header row */}
          <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] border-b border-slate-200 bg-slate-50">
            <div className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Plan
            </div>
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative p-5 text-center ${plan.popular ? "bg-indigo-50" : ""}`}>
                {plan.popular && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-indigo-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                    Popular
                  </span>
                )}
                <p className="mt-2 text-base font-bold text-slate-900">{plan.name}</p>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-slate-900" style={{ letterSpacing: "-0.03em" }}>
                    {plan.price.m === null ? "Custom" : `$${annual ? plan.price.a : plan.price.m}`}
                  </span>
                  {plan.price.m !== null && <span className="text-xs text-slate-500">/mo</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {FEATURES.map((feature, fi) => (
            <div
              key={feature.label}
              className={`grid grid-cols-[1.5fr_repeat(4,1fr)] border-b border-slate-100 ${fi % 2 === 1 ? "bg-slate-50/50" : ""}`}
            >
              <div className="sticky left-0 p-4 text-sm font-medium text-slate-700" style={{ background: "inherit" }}>
                {feature.label}
              </div>
              {feature.values.map((v, vi) => (
                <div key={vi} className={`p-4 text-center text-sm ${PLANS[vi].popular ? "bg-indigo-50/40" : ""}`}>
                  {typeof v === "boolean" ? (
                    v ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-600" strokeWidth={3} />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-slate-300" strokeWidth={2.5} />
                    )
                  ) : (
                    <span className="font-medium text-slate-800">{v}</span>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* CTA row */}
          <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] bg-white">
            <div className="p-5" />
            {PLANS.map((plan) => (
              <div key={plan.name} className={`p-4 text-center ${plan.popular ? "bg-indigo-50/40" : ""}`}>
                <button
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-105 ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-300 text-slate-900 hover:border-slate-900"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Need help choosing? <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-indigo-600 hover:underline">Schedule a call →</a>
        </p>
      </div>
    </section>
  );
}
