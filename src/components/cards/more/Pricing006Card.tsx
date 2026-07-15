"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing006 — Aurora (glassmorphism with floating gradient orbs)
// Deep purple-black bg + animated aurora blobs + glass cards with backdrop
// blur + mouse-tracking glow + monthly/annual spring toggle + popular card
// with elevated scale + glow ring.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Spark", tagline: "For individuals exploring", monthly: 0, annual: 0,
    features: ["3 projects", "Community support", "1GB storage", "Basic analytics"],
    cta: "Start free", accent: "#06b6d4",
  },
  {
    name: "Studio", tagline: "For professionals shipping", monthly: 32, annual: 26,
    features: ["Unlimited projects", "Priority support", "100GB storage", "Advanced analytics", "Custom domains", "API access", "Team collaboration"],
    cta: "Start 14-day trial", popular: true, accent: "#a855f7",
  },
  {
    name: "Atelier", tagline: "For teams scaling up", monthly: 89, annual: 72,
    features: ["Everything in Studio", "SSO + SAML", "Dedicated manager", "Audit logs", "Custom integrations", "SLA guarantee"],
    cta: "Contact sales", accent: "#f59e0b",
  },
];

export function Pricing006Card() {
  const [annual, setAnnual] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-24"
      style={{
        background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0a26 50%, #050217 100%)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Floating aurora blobs */}
      <motion.div
        className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)", filter: "blur(60px)" }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22), transparent 60%)", filter: "blur(70px)" }}
        animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 h-[400px] w-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.18), transparent 60%)", filter: "blur(50px)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur-md">
            <Sparkles className="h-3 w-3" /> Aurora Pricing
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
            Pricing that scales<br />
            <span style={{ background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              with your ambition
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/60">
            Start free, upgrade as you grow. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setAnnual(false)}
              className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${!annual ? "text-white" : "text-white/60"}`}
            >
              {!annual && <motion.div layoutId="aurora-toggle" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${annual ? "text-white" : "text-white/60"}`}
            >
              {annual && <motion.div layoutId="aurora-toggle" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
              <span className="relative z-10">Annual</span>
              <span className="relative z-10 ml-2 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-300">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.12 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-shadow ${
                plan.popular
                  ? "border-violet-400/30 bg-white/[0.07] shadow-[0_0_60px_-12px_rgba(168,85,247,0.4)] md:-my-4 md:py-12"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
              }`}
              style={{ padding: "2.5rem 2rem" }}
            >
              {/* Mouse-tracking glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${plan.accent}25, transparent 60%)` }}
                />
              </div>

              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="relative z-10">
                <div className="mb-1.5 inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: plan.accent }} />
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{plan.name}</span>
                </div>
                <p className="mb-6 text-sm text-white/60">{plan.tagline}</p>

                <div className="mb-1 flex items-baseline gap-1.5">
                  <span className="text-5xl font-bold text-white" style={{ letterSpacing: "-0.04em" }}>
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-sm text-white/50">/mo</span>
                </div>
                {annual && plan.monthly > 0 && (
                  <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    Billed ${plan.annual * 12}/yr
                  </p>
                )}

                <button
                  className={`mt-7 flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/30"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="my-6 h-px bg-white/10" />

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                      <Check className="h-4 w-4 shrink-0" style={{ color: plan.accent }} />
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
