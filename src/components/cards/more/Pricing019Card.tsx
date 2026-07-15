"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Cpu, Crown } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing019 — Cyberpunk neon dark with scanlines + glitch price
// Near-black + neon pink/cyan + grid floor lines + CRT scanlines + glitch
// text effect on price (RGB split) + neon glowing borders on cards.
// Toggle = neon segmented switch. Popular = magenta neon glow.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "BASE", price: 0, annual: 0, desc: "Initiate protocol",
    features: ["1 build slot", "256MB RAM", "Community grid", "Basic monitoring"],
    cta: "jack in", icon: Cpu, accent: "#06b6d4",
  },
  {
    name: "NEXUS", price: 49, annual: 39, desc: "Upgrade your stack",
    features: ["5 build slots", "8GB RAM", "Priority uplink", "Real-time metrics", "Custom runners", "API access", "Beta features"],
    cta: "upgrade", popular: true, icon: Zap, accent: "#ec4899",
  },
  {
    name: "OVERLORD", price: 199, annual: 159, desc: "Total system control",
    features: ["Unlimited slots", "64GB RAM", "Dedicated server", "SSO + audit", "Custom SLA", "24/7 ops", "On-prem option"],
    cta: "go overlord", icon: Crown, accent: "#fbbf24",
  },
];

export function Pricing019Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      className="relative py-24"
      style={{
        background: "#0a0014",
        fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
        color: "#e2e8f0",
      }}
    >
      {/* Grid floor */}
      <div
        className="absolute bottom-0 left-1/2 h-1/2 w-full -translate-x-1/2 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(236,72,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236,72,153,0.05) 2px, rgba(236,72,153,0.05) 3px)" }}
      />
      {/* Top glow */}
      <div className="absolute left-1/2 top-0 h-64 w-[800px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.2), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-400/70">pricing_protocol_v2</p>
          <h2 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
            <GlitchText text="JACK IN." accent="#ec4899" />
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-cyan-300/60">
            Choose your access tier. Upgrade or downgrade at any cycle.
          </p>

          {/* Neon segmented toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-md border border-pink-500/30 bg-black/50 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${!annual ? "bg-pink-500 text-black" : "text-pink-400/60 hover:text-pink-400"}`}
              style={!annual ? { boxShadow: "0 0 20px rgba(236,72,153,0.6)" } : {}}
            >
              monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${annual ? "bg-cyan-400 text-black" : "text-cyan-400/60 hover:text-cyan-400"}`}
              style={annual ? { boxShadow: "0 0 20px rgba(6,182,212,0.6)" } : {}}
            >
              annual <span className="text-pink-400">-20%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-lg border bg-black/60 p-6 backdrop-blur-sm transition-all"
              style={{
                borderColor: plan.popular ? `${plan.accent}80` : "rgba(255,255,255,0.1)",
                boxShadow: plan.popular ? `0 0 40px -5px ${plan.accent}60, inset 0 0 20px ${plan.accent}10` : "none",
              }}
            >
              {/* Glow on hover */}
              <div
                className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: `0 0 30px -5px ${plan.accent}80`, border: `1px solid ${plan.accent}` }}
              />

              {plan.popular && (
                <span
                  className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                  style={{ background: plan.accent, color: "#000" }}
                >
                  ★ RECOMMENDED
                </span>
              )}

              <div className="mb-4 flex items-center gap-2">
                <plan.icon className="h-5 w-5" style={{ color: plan.accent }} />
                <span className="text-lg font-bold tracking-widest" style={{ color: plan.accent, textShadow: `0 0 10px ${plan.accent}80` }}>
                  {plan.name}
                </span>
              </div>
              <p className="mb-5 text-xs text-white/40">{plan.desc}</p>

              <div className="mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold" style={{ color: plan.accent, textShadow: `0 0 15px ${plan.accent}80`, letterSpacing: "-0.04em" }}>
                    ${annual ? plan.annual : plan.price}
                  </span>
                  <span className="text-xs text-white/40">/cycle</span>
                </div>
                {annual && plan.price > 0 && (
                  <p className="mt-1 text-[10px] text-white/30">${plan.annual * 12}/yr billed</p>
                )}
              </div>

              <button
                className="flex w-full items-center justify-center gap-1.5 rounded py-2.5 text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${plan.accent}, ${plan.accent}80)`,
                  color: "#000",
                  boxShadow: `0 0 20px -5px ${plan.accent}`,
                }}
              >
                {plan.cta}
                <ArrowRight className="h-3 w-3" />
              </button>

              <div className="my-5 border-t border-dashed border-white/10" />

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                    <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: plan.accent }} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-white/30">
          [ system online · all tiers include end-to-end encryption · no drm ]
        </p>
      </div>
    </section>
  );
}

// ── Glitch text effect (RGB split) ──
function GlitchText({ text, accent }: { text: string; accent: string }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setOffset(Math.random() * 4 - 2), 100);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="relative inline-block" style={{ color: "#fff" }}>
      <span className="absolute inset-0" style={{ color: accent, transform: `translateX(${offset}px)`, opacity: 0.8 }}>{text}</span>
      <span className="absolute inset-0" style={{ color: "#06b6d4", transform: `translateX(${-offset}px)`, opacity: 0.8 }}>{text}</span>
      <span className="relative">{text}</span>
    </span>
  );
}
