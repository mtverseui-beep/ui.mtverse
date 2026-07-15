"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing010 — Maison (dark luxury gold sweep + Cormorant serif)
// True black + gold gradient text + Cormorant Garamond display + thin gold
// hairlines + sweep-on-hover links + premium numbered tiers.
// Popular card gets a gold border + corner gold flourishes.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Initié", price: "Free", sub: "Begin the journey",
    features: ["Browse collections", "Save favorites", "Newsletter access"],
    cta: "Register",
  },
  {
    name: "Membre", price: 240, annual: 200, sub: "For the connoisseur",
    features: ["Everything in Initié", "Private sales early access", "Complimentary shipping", "Personal shopper", "Invitations to events", "Quarterly gift"],
    cta: "Become a member", popular: true,
  },
  {
    name: "Patron", price: "Custom", sub: "For the collector",
    features: ["Everything in Membre", "Dedicated concierge", "Bespoke commissions", "Atelier visits", "Auction access", "Heritage archive access"],
    cta: "Apply",
  },
];

export function Pricing010Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="relative py-24"
      style={{
        background: "#000000",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        color: "#e5e2d9",
      }}
    >
      {/* Gold radial glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(196,163,90,0.12), transparent 70%)" }} />

      {/* Top + bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-300/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Maison · Privilege Tiers
          </p>
          <h1 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl" style={{ letterSpacing: "-0.02em", backgroundImage: "linear-gradient(135deg, #d4af37 0%, #f4e5b1 50%, #c4a35a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
            The art of belonging.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-amber-100/50">
            A membership reserved for those who appreciate the finer things.
          </p>

          {/* Toggle — minimal text */}
          <div className="mt-8 inline-flex items-center gap-5 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <button onClick={() => setAnnual(false)} className={annual ? "text-amber-100/30" : "text-amber-200"}>Monthly</button>
            <span className="h-px w-8 bg-amber-300/30" />
            <button onClick={() => setAnnual(true)} className={annual ? "text-amber-200" : "text-amber-100/30"}>Annual</button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative p-7 text-center ${plan.popular ? "border border-amber-400/40 bg-amber-400/[0.03]" : "border border-amber-100/10"}`}
            >
              {/* Corner flourishes for popular */}
              {plan.popular && (
                <>
                  <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-amber-400" />
                  <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-amber-400" />
                  <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-amber-400" />
                  <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-amber-400" />
                </>
              )}

              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                Tier {String(idx + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[0.05em]" style={{ fontStyle: "italic", color: plan.popular ? "#f4e5b1" : "#e5e2d9" }}>
                {plan.name}
              </h2>
              <p className="mt-1 text-xs italic text-amber-100/40">{plan.sub}</p>

              <div className="my-6 flex items-baseline justify-center gap-1.5 border-y border-amber-100/10 py-5">
                <span className="text-4xl font-medium" style={{ backgroundImage: "linear-gradient(135deg, #d4af37, #f4e5b1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {typeof plan.price === "number" ? `$${annual && plan.annual ? plan.annual : plan.price}` : plan.price}
                </span>
                {typeof plan.price === "number" && <span className="text-xs text-amber-100/40">/ month</span>}
              </div>

              <ul className="mb-7 space-y-3 text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-amber-100/70" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rotate-45 bg-amber-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-200 transition-colors hover:text-amber-100"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                <span className="relative">
                  {plan.cta}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
                </span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-amber-100/30" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          All tiers include the maison promise · Cancel anytime
        </p>
      </div>
    </section>
  );
}
