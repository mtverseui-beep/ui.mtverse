"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing012 — Neumorphic soft UI with embossed cards
// Soft off-white bg + embossed/extruded cards using dual shadows (light top-
// left, dark bottom-right) + sunken toggle + soft pill CTA + check icons
// in raised circular wells. Hover: card lifts out further.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Lite", monthly: 0, annual: 0, desc: "For tinkerers",
    features: ["3 projects", "1GB storage", "Community", "Basic templates"],
    cta: "Get started",
  },
  {
    name: "Plus", monthly: 24, annual: 19, desc: "For solo pros",
    features: ["Unlimited projects", "50GB storage", "Priority support", "Premium templates", "Custom branding", "API access"],
    cta: "Try Plus", popular: true,
  },
  {
    name: "Team", monthly: 79, annual: 64, desc: "For growing teams",
    features: ["Everything in Plus", "1TB storage", "SSO + SAML", "Admin dashboard", "Audit logs", "Dedicated manager"],
    cta: "Start trial",
  },
];

export function Pricing012Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      className="py-24"
      style={{
        background: "#e6e7ee",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
        color: "#3b3f51",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em", color: "#3b3f51" }}>
            Soft. Simple. Subtle.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">
            Pricing that feels gentle. Upgrade any time.
          </p>

          {/* Sunken toggle */}
          <div
            className="mt-8 inline-flex items-center gap-1 rounded-2xl p-1.5"
            style={{ background: "#e6e7ee", boxShadow: "inset 5px 5px 10px #c5c6cc, inset -5px -5px 10px #ffffff" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${!annual ? "text-indigo-600" : "text-slate-500"}`}
              style={!annual ? { background: "#e6e7ee", boxShadow: "5px 5px 10px #c5c6cc, -5px -5px 10px #ffffff" } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${annual ? "text-indigo-600" : "text-slate-500"}`}
              style={annual ? { background: "#e6e7ee", boxShadow: "5px 5px 10px #c5c6cc, -5px -5px 10px #ffffff" } : {}}
            >
              Annual <span className="text-[10px] text-emerald-600">-21%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-7"
              style={{
                background: "#e6e7ee",
                boxShadow: plan.popular
                  ? "10px 10px 24px #c5c6cc, -10px -10px 24px #ffffff, inset 0 0 0 2px rgba(99,102,241,0.3)"
                  : "10px 10px 24px #c5c6cc, -10px -10px 24px #ffffff",
              }}
            >
              {plan.popular && (
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600"
                  style={{ background: "#e6e7ee", boxShadow: "inset 2px 2px 4px #c5c6cc, inset -2px -2px 4px #ffffff" }}
                >
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold" style={{ color: "#3b3f51" }}>{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.desc}</p>

              <div className="my-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold" style={{ color: "#3b3f51", letterSpacing: "-0.04em" }}>${annual ? plan.annual : plan.monthly}</span>
                <span className="text-sm text-slate-500">/mo</span>
              </div>

              <button
                className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all active:scale-95"
                style={
                  plan.popular
                    ? { background: "#6366f1", color: "#fff", boxShadow: "4px 4px 10px #c5c6cc, -4px -4px 10px #ffffff" }
                    : { background: "#e6e7ee", color: "#3b3f51", boxShadow: "4px 4px 10px #c5c6cc, -4px -4px 10px #ffffff" }
                }
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#e6e7ee", boxShadow: "inset 2px 2px 4px #c5c6cc, inset -2px -2px 4px #ffffff", color: "#6366f1" }}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
