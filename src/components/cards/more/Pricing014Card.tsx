"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Cpu, Zap, GitBranch } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing014 — Terminal/CLI developer pricing
// True black + green phosphor + CRT scanlines + JetBrains Mono throughout +
// ASCII-art plan headers + animated typing price display + command-style CTA.
// Toggle = `--billing=annual` flag style switch.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "FREE", cmd: "tier=free", price: 0, annual: 0,
    desc: "$ devkit init --tier=free",
    features: ["1 project", "100 builds/mo", "Community support", "1GB artifacts"],
    cta: "$ devkit init",
    icon: Terminal,
  },
  {
    name: "PRO", cmd: "tier=pro", price: 24, annual: 19,
    desc: "$ devkit init --tier=pro",
    features: ["Unlimited projects", "10K builds/mo", "Priority support", "50GB artifacts", "Parallel CI", "Custom runners", "API access"],
    cta: "$ devkit upgrade pro",
    popular: true,
    icon: Cpu,
  },
  {
    name: "ENT", cmd: "tier=enterprise", price: null, annual: null,
    desc: "$ devkit init --tier=enterprise --contact-sales",
    features: ["Everything in PRO", "Self-hosted runners", "SSO + SAML", "Audit logs", "SLA 99.99%", "Dedicated engineer"],
    cta: "$ devkit contact-sales",
    icon: GitBranch,
  },
];

export function Pricing014Card() {
  const [annual, setAnnual] = useState(true);
  const [typedPrices, setTypedPrices] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasTyped.current) {
        hasTyped.current = true;
        PLANS.forEach((plan) => {
          const target = plan.price === null ? "Custom" : `$${annual ? plan.annual : plan.price}`;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTypedPrices((p) => ({ ...p, [plan.name]: target.slice(0, i) }));
            if (i >= target.length) clearInterval(interval);
          }, 50);
        });
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [annual]);

  return (
    <section
      className="relative py-24"
      style={{
        background: "#000000",
        fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
        color: "#e2e8f0",
      }}
    >
      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 3px)" }}
      />
      {/* Phosphor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, rgba(34,197,94,0.08), transparent 60%)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6" ref={ref}>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500/70">devkit pricing</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.4)", letterSpacing: "-0.03em" }}>
            $ ./deploy --pricing
          </h2>

          {/* Toggle — flag style */}
          <div className="mt-8 inline-flex items-center rounded-md border border-emerald-500/30 bg-black/50 p-1" style={{ boxShadow: "0 0 20px -5px rgba(34,197,94,0.2)" }}>
            <button
              onClick={() => setAnnual(false)}
              className={`rounded px-3 py-1.5 text-xs transition-colors ${!annual ? "bg-emerald-500/15 text-emerald-400" : "text-emerald-500/50"}`}
            >
              --billing=monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded px-3 py-1.5 text-xs transition-colors ${annual ? "bg-emerald-500/15 text-emerald-400" : "text-emerald-500/50"}`}
            >
              --billing=annual <span className="text-emerald-600">(-21%)</span>
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
              className={`relative overflow-hidden rounded-lg p-6 ${
                plan.popular
                  ? "border border-emerald-500/40 bg-emerald-500/[0.03] shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]"
                  : "border border-white/10 bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-3 top-3 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
                  ★ popular
                </span>
              )}

              <div className="mb-4 flex items-center gap-2">
                <plan.icon className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-bold tracking-widest text-emerald-400">{plan.name}</span>
              </div>
              <p className="mb-5 text-xs text-white/40">{plan.desc}</p>

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-emerald-400" style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)" }}>
                    {typedPrices[plan.name] || ""}
                  </span>
                  {plan.price !== null && <span className="text-xs text-white/40">/mo</span>}
                </div>
                {annual && plan.price && plan.price > 0 && (
                  <p className="mt-1 text-[10px] text-white/30">${plan.annual! * 12}/yr billed</p>
                )}
              </div>

              <button
                className={`flex w-full items-center justify-center gap-1.5 rounded-md py-2.5 text-xs font-bold transition-all ${
                  plan.popular
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3 w-3" />
              </button>

              <div className="my-5 border-t border-dashed border-emerald-500/15" />

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                    <Zap className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] text-white/40">
          <span className="text-emerald-500">✓</span> All plans MIT licensed · <span className="text-emerald-500">✓</span> Self-hostable · <span className="text-emerald-500">✓</span> Cancel anytime
        </p>
      </div>
    </section>
  );
}
