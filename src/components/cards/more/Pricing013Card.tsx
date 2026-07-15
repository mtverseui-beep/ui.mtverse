"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing013 — Holographic (iridescent conic gradient borders)
// Near-black bg + animated conic-gradient border (rotating holographic) on
// every card + dark glass interior + popular card has wider holographic
// border + spinning glow behind price. Toggle = holographic pill.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Pulse", monthly: 0, annual: 0, desc: "For the curious",
    features: ["3 streams", "Basic analytics", "Community", "1GB storage"],
    cta: "Start free",
  },
  {
    name: "Wave", monthly: 29, annual: 23, desc: "For creators",
    features: ["Unlimited streams", "Advanced analytics", "Priority support", "Custom branding", "API access", "HD exports"],
    cta: "Ride the wave", popular: true,
  },
  {
    name: "Spectrum", monthly: 99, annual: 79, desc: "For studios",
    features: ["Everything in Wave", "White-label", "SSO + SAML", "Dedicated infra", "Audit logs", "24/7 support"],
    cta: "Get spectrum",
  },
];

export function Pricing013Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      className="relative py-24"
      style={{
        background: "#0a0a0f",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
              color: "#fff",
              backgroundSize: "200% 200%",
              animation: "holo-shift 4s ease infinite",
            }}
          >
            <Sparkles className="h-3 w-3" /> Iridescent Pricing
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
            Pricing that shifts<br />
            <span
              style={{
                background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "holo-shift 4s ease infinite",
              }}
            >
              like a hologram.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            All plans include unlimited collaborators.
          </p>

          {/* Holographic pill toggle */}
          <div className="relative mt-8 inline-flex items-center rounded-full p-1" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}>
            <div
              className="absolute inset-0 rounded-full opacity-50"
              style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-shift 4s ease infinite", filter: "blur(8px)" }}
            />
            <button
              onClick={() => setAnnual(false)}
              className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${!annual ? "text-white" : "text-white/60"}`}
            >
              {!annual && <motion.div layoutId="holo-toggle" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${annual ? "text-white" : "text-white/60"}`}
            >
              {annual && <motion.div layoutId="holo-toggle" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10">Annual</span>
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
              className="group relative rounded-2xl p-px"
              style={{
                background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
                backgroundSize: "200% 200%",
                animation: "holo-shift 6s ease infinite",
              }}
            >
              <div
                className="relative h-full rounded-2xl p-7"
                style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)" }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-shift 4s ease infinite" }}
                  >
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-white/50">{plan.desc}</p>

                <div className="relative my-6">
                  <div
                    className="absolute -inset-2 rounded-full opacity-30 blur-xl"
                    style={{ background: "linear-gradient(135deg, #ff006e, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-shift 3s ease infinite" }}
                  />
                  <div className="relative flex items-baseline gap-1.5">
                    <span className="text-5xl font-bold text-white" style={{ letterSpacing: "-0.04em" }}>${annual ? plan.annual : plan.monthly}</span>
                    <span className="text-sm text-white/50">/mo</span>
                  </div>
                </div>

                <button
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-shift 4s ease infinite" }}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                      <Check className="h-4 w-4 shrink-0" style={{ color: "#06ffa5" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes holo-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
