"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing017 — Origami folded cards with 3D perspective hover
// Soft cream bg + Space Grotesk display + cards that look like folded paper
// with diagonal corner accents. On hover, the card "unfolds" (rotateX/Y 3D).
// Popular card has a deeper fold shadow.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Seed", price: 0, annual: 0, desc: "Start growing",
    features: ["3 projects", "1GB storage", "Community"],
    cta: "Plant seed", accent: "#10b981",
  },
  {
    name: "Bloom", price: 24, annual: 19, desc: "For makers in full swing",
    features: ["Unlimited projects", "50GB storage", "Priority support", "Custom domains", "API access", "Version history"],
    cta: "Bloom now", popular: true, accent: "#ec4899",
  },
  {
    name: "Harvest", price: 79, annual: 64, desc: "For teams reaping scale",
    features: ["Everything in Bloom", "1TB storage", "SSO", "Admin tools", "Audit logs", "Dedicated manager"],
    cta: "Harvest plan", accent: "#f59e0b",
  },
];

export function Pricing017Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #fdf6e3 0%, #fef9c3 100%)",
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        color: "#1c1917",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/50 px-3 py-1 text-xs font-medium text-stone-700 backdrop-blur">
            Origami Pricing
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
            Plans that unfold<br />with your growth.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-stone-600">
            Hover any card to see it unfold.
          </p>

          <div className="mt-7 inline-flex items-center rounded-full border border-stone-300 bg-white/70 p-1 backdrop-blur">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${!annual ? "bg-stone-900 text-white" : "text-stone-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${annual ? "bg-stone-900 text-white" : "text-stone-600"}`}
            >
              Annual <span className="text-xs text-emerald-600">−21%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, rotateY: -20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ rotateY: 8, rotateX: -4, y: -8 }}
              className="group relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Folded corner */}
              <div
                className="absolute right-0 top-0 h-12 w-12 origin-top-right transition-transform duration-500 group-hover:scale-0"
                style={{
                  background: `linear-gradient(225deg, ${plan.accent}30, transparent)`,
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                }}
              />

              <div
                className="relative h-full overflow-hidden rounded-2xl border-2 border-stone-900/10 bg-white p-7 transition-shadow duration-500 group-hover:shadow-2xl"
                style={{
                  boxShadow: plan.popular
                    ? `8px 8px 0 0 ${plan.accent}40, 16px 16px 32px rgba(0,0,0,0.08)`
                    : "4px 4px 0 0 rgba(28,25,23,0.1), 12px 12px 24px rgba(0,0,0,0.05)",
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-px right-4 origin-top-right rounded-b-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ background: plan.accent }}
                  >
                    Popular
                  </span>
                )}

                {/* Diagonal accent line */}
                <div
                  className="absolute -left-8 -top-8 h-16 w-16 rotate-45 opacity-10"
                  style={{ background: plan.accent }}
                />

                <h3 className="relative text-2xl font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-1 text-sm text-stone-600">{plan.desc}</p>

                <div className="mt-5 flex items-baseline gap-1.5 border-b border-dashed border-stone-300 pb-5">
                  <span className="text-5xl font-bold" style={{ letterSpacing: "-0.04em", color: plan.accent }}>
                    ${annual ? plan.annual : plan.price}
                  </span>
                  <span className="text-sm text-stone-500">/mo</span>
                </div>

                <button
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ background: plan.accent }}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-stone-700">
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-white"
                        style={{ background: plan.accent }}
                      >
                        <Check className="h-3 w-3" strokeWidth={4} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
