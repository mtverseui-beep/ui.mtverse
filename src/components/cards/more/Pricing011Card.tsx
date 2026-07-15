"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing011 — Stripe-style minimal with sliding feature rows
// Pure white + Inter Tight + signature Stripe gradient pill toggle +
// cards with subtle border + colored top accent bar that animates on hover +
// feature rows that slide in from left on hover. Popular = indigo accent.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Starter", monthly: 0, annual: 0, desc: "Everything you need to start",
    features: ["Up to $1M monthly volume", "2.9% + 30c per transaction", "No setup fees", "Standard fraud protection", "Email support"],
    cta: "Start now", accent: "#06b6d4",
  },
  {
    name: "Growth", monthly: 79, annual: 65, desc: "For scaling businesses",
    features: ["Everything in Starter", "Lower 2.5% + 25c rate", "Advanced fraud protection", "Card issuing", "24/7 priority support", "Custom branding", "Webhooks + API"],
    cta: "Start with Growth", popular: true, accent: "#635bff",
  },
  {
    name: "Enterprise", monthly: null, annual: null, desc: "For high-volume orgs",
    features: ["Everything in Growth", "Volume-based pricing", "Dedicated solutions engineer", "Multi-currency settlement", "Custom contracts + SLA", "Implementation support"],
    cta: "Contact sales", accent: "#0a2540",
  },
];

export function Pricing011Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="relative py-24"
      style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a2540" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3 w-3" /> Pricing
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
            Pricing built to scale with you.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-slate-500">
            No setup fees, no monthly minimums. Only pay for what you process.
          </p>

          {/* Stripe-style pill toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-slate-200 p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${!annual ? "text-white" : "text-slate-600"}`}
            >
              {!annual && <motion.div layoutId="stripe-toggle" className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #635bff, #00d4ff)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10">Pay monthly</span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${annual ? "text-white" : "text-slate-600"}`}
            >
              {annual && <motion.div layoutId="stripe-toggle" className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #635bff, #00d4ff)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10 flex items-center gap-1.5">
                Pay annually
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-700">Save 20%</span>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-xl ${
                plan.popular ? "border-indigo-500 shadow-lg md:-my-2 md:py-8" : "border-slate-200 hover:border-slate-300"
              }`}
              style={{ padding: "1.75rem" }}
            >
              {/* Top accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${plan.accent}, transparent)` }}
              />

              {plan.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}

              <h3 className="text-lg font-bold tracking-tight text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.desc}</p>

              <div className="mt-5 flex items-baseline gap-1">
                {plan.monthly === null ? (
                  <span className="text-4xl font-bold tracking-tight text-slate-900">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>${annual ? plan.annual : plan.monthly}</span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </>
                )}
              </div>
              {annual && plan.monthly && plan.monthly > 0 && (
                <p className="mt-1 text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ${plan.annual! * 12}/yr billed
                </p>
              )}

              <button
                className={`mt-6 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <div className="my-6 h-px bg-slate-200" />

              <ul className="space-y-2.5">
                {plan.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0.7, x: 0 }}
                    whileHover={{ x: 4, opacity: 1 }}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: plan.accent }} strokeWidth={2.5} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          Need a custom solution? <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-indigo-600 hover:underline">Talk to our team →</a>
        </p>
      </div>
    </section>
  );
}
