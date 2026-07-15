"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Users, Zap, Shield, Server } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing016 — Bento grid (mixed-size cards) with tab switcher
// Light slate bg + bento-grid layout where the popular plan is 2x larger
// (spans 2 rows) + secondary plans are smaller bento tiles. Tab switcher
// cycles between Individual / Team / Enterprise views.
// ════════════════════════════════════════════════════════════════════════════

type Tab = "individual" | "team" | "enterprise";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "individual", label: "Individual", icon: Sparkles },
  { id: "team", label: "Team", icon: Users },
  { id: "enterprise", label: "Enterprise", icon: Shield },
];

const TIERS: Record<Tab, { name: string; price: number; annual: number; desc: string; features: string[]; cta: string; popular?: boolean; span?: "lg" | "sm"; icon: React.ComponentType<{ className?: string }>; accent: string }[]> = {
  individual: [
    { name: "Free", price: 0, annual: 0, desc: "For trying things out", features: ["3 projects", "1GB", "Community"], cta: "Start free", span: "sm", icon: Sparkles, accent: "#06b6d4" },
    { name: "Pro", price: 16, annual: 12, desc: "For individual pros", features: ["Unlimited projects", "100GB", "Priority support", "Custom domains", "API access", "Advanced analytics"], cta: "Start trial", popular: true, span: "lg", icon: Zap, accent: "#8b5cf6" },
    { name: "Plus", price: 32, annual: 26, desc: "For power users", features: ["Everything in Pro", "1TB storage", "Beta features", "Early access"], cta: "Upgrade", span: "sm", icon: Server, accent: "#f59e0b" },
  ],
  team: [
    { name: "Starter", price: 49, annual: 39, desc: "For small teams (up to 5)", features: ["5 members", "Shared workspace", "Basic admin"], cta: "Start", span: "sm", icon: Users, accent: "#06b6d4" },
    { name: "Team", price: 99, annual: 79, desc: "For growing teams (up to 25)", features: ["25 members", "SSO", "Admin dashboard", "Audit logs", "Slack integration", "Priority support", "Custom branding"], cta: "Start trial", popular: true, span: "lg", icon: Zap, accent: "#8b5cf6" },
    { name: "Business", price: 199, annual: 159, desc: "For larger teams (up to 100)", features: ["100 members", "Advanced SSO", "Custom integrations"], cta: "Get quote", span: "sm", icon: Server, accent: "#f59e0b" },
  ],
  enterprise: [
    { name: "Scale", price: 499, annual: 399, desc: "For orgs scaling fast", features: ["250 members", "SLA 99.9%", "Dedicated manager"], cta: "Contact", span: "sm", icon: Server, accent: "#06b6d4" },
    { name: "Enterprise", price: 0 as any, annual: 0 as any, desc: "For large orgs with custom needs", features: ["Unlimited members", "Custom SLA", "On-prem option", "SAML + SCIM", "Audit + compliance", "24/7 dedicated support", "Custom contracts"], cta: "Book demo", popular: true, span: "lg", icon: Shield, accent: "#8b5cf6" },
    { name: "Compliance", price: 999, annual: 799, desc: "For regulated industries", features: ["HIPAA", "SOC 2 Type II", "FedRAMP"], cta: "Inquire", span: "sm", icon: Shield, accent: "#f59e0b" },
  ],
};

export function Pricing016Card() {
  const [tab, setTab] = useState<Tab>("individual");
  const [annual, setAnnual] = useState(true);
  const tiers = TIERS[tab];

  return (
    <section className="py-24" style={{ background: "#f8fafc", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0f172a" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
            Plans for every kind of team.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">
            Switch tabs to see plans tailored for you.
          </p>

          {/* Tab switcher */}
          <div className="mt-7 inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === t.id ? "text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                {tab === t.id && <motion.div layoutId="bento-tab" className="absolute inset-0 rounded-full bg-slate-900" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative z-10 flex items-center gap-1.5">
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          {/* Annual/Monthly mini toggle */}
          <div className="mt-4 inline-flex items-center gap-3 text-xs text-slate-500">
            <button onClick={() => setAnnual(false)} className={!annual ? "font-bold text-slate-900" : ""}>Monthly</button>
            <span>/</span>
            <button onClick={() => setAnnual(true)} className={annual ? "font-bold text-slate-900" : ""}>
              Annual <span className="text-emerald-600">save 20%</span>
            </button>
          </div>
        </div>

        {/* Bento grid */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2"
        >
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all hover:shadow-lg ${
                tier.span === "lg" ? "md:col-span-2 md:row-span-2" : ""
              } ${tier.popular ? "border-violet-300 shadow-md" : "border-slate-200"}`}
            >
              {/* Accent corner glow */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30"
                style={{ background: tier.accent }}
              />

              {tier.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-violet-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Popular
                </span>
              )}

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${tier.accent}15`, color: tier.accent }}>
                  <tier.icon className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">{tier.name}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-500">{tier.desc}</p>

              <div className={`mt-5 flex items-baseline gap-1.5 ${tier.span === "lg" ? "mb-2" : ""}`}>
                <span className={`${tier.span === "lg" ? "text-6xl" : "text-4xl"} font-bold`} style={{ letterSpacing: "-0.04em" }}>
                  {tier.price === 0 as any ? "Custom" : `$${annual ? tier.annual : tier.price}`}
                </span>
                {tier.price !== 0 as any && <span className="text-sm text-slate-500">/mo</span>}
              </div>

              <button
                className={`mt-5 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "border border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-slate-50"
                } ${tier.span === "lg" ? "w-full" : "w-full"}`}
              >
                {tier.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <ul className={`mt-6 ${tier.span === "lg" ? "grid grid-cols-2 gap-x-4 gap-y-2.5" : "space-y-2"}`}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: tier.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
