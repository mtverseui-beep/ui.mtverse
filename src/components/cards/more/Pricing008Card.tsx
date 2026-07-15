"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing008 — Editorial (magazine serif with rule lines)
// Newsprint cream + Fraunces serif + thin rule lines between sections +
// numbered plans (01/02/03) + small-cap labels + hover line-draw underline.
// Toggle is a subtle text-only switch with hairline under active.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    n: "01", name: "Reader", price: 0, annual: 0,
    desc: "For the curious. Browse, read, and bookmark.",
    features: ["Full archive access", "Weekly newsletter", "Save articles", "Community comments"],
    cta: "Begin reading",
  },
  {
    n: "02", name: "Subscriber", price: 12, annual: 9,
    desc: "For the devoted. Unlimited reading and exclusive essays.",
    features: ["Everything in Reader", "Exclusive long-form essays", "Audio versions", "Offline reading", "Ad-free experience", "Member events"],
    cta: "Subscribe now", popular: true,
  },
  {
    n: "03", name: "Patron", price: 50, annual: 42,
    desc: "For the supporter. Fund independent journalism.",
    features: ["Everything in Subscriber", "Behind-the-scenes notes", "Quarterly print edition", "Direct editor access", "Founding member credit", "Invitations to salon dinners"],
    cta: "Become a patron",
  },
];

export function Pricing008Card() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="relative py-24"
      style={{
        background: "#f5f0e6",
        fontFamily: "var(--font-fraunces), Georgia, serif",
        color: "#1a1612",
      }}
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Masthead */}
        <div className="border-t-2 border-b border-black/30 py-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Vol. XII · No. 4 · The Quarterly · Subscription Plans
          </p>
        </div>

        {/* Header */}
        <div className="my-16 text-center">
          <h1 className="text-5xl font-medium tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em", fontStyle: "italic" }}>
            Subscribe to <span className="underline decoration-2 underline-offset-8">thought</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-black/60" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>
            Choose the depth of your engagement. Cancel any time.
          </p>

          {/* Text-only toggle */}
          <div className="mt-8 inline-flex items-center gap-6 text-sm" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <button
              onClick={() => setAnnual(false)}
              className={`relative pb-1 ${!annual ? "text-black" : "text-black/40 hover:text-black/60"}`}
            >
              Monthly
              {!annual && <span className="absolute inset-x-0 -bottom-px h-px bg-black" />}
            </button>
            <span className="text-black/20">·</span>
            <button
              onClick={() => setAnnual(true)}
              className={`relative pb-1 ${annual ? "text-black" : "text-black/40 hover:text-black/60"}`}
            >
              Annual
              {annual && <span className="absolute inset-x-0 -bottom-px h-px bg-black" />}
            </button>
            {annual && <span className="text-xs italic text-amber-800" style={{ fontFamily: "var(--font-fraunces), serif" }}>save 25%</span>}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-px border-t border-l border-black/15 md:grid-cols-3" style={{ background: "rgba(26,22,18,0.15)" }}>
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`relative p-8 ${plan.popular ? "bg-amber-50" : "bg-[#fbf7ed]"}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  Plan {plan.n}
                </span>
                {plan.popular && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    Most chosen
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-3xl font-medium tracking-tight">{plan.name}</h2>
              <p className="mt-1.5 text-sm italic text-black/60" style={{ fontFamily: "var(--font-fraunces), serif" }}>{plan.desc}</p>

              <div className="my-6 flex items-baseline gap-1.5 border-b border-dashed border-black/20 pb-6">
                <span className="text-5xl font-medium" style={{ letterSpacing: "-0.02em" }}>
                  ${annual ? plan.annual : plan.price}
                </span>
                <span className="text-sm text-black/50" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>
                  {plan.price === 0 ? "forever" : "/ month"}
                </span>
              </div>

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-800" />
                    <span className="text-black/75">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`group mt-7 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline ${plan.popular ? "text-amber-900" : "text-black"}`}
                style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs italic text-black/50">
          All subscriptions fund independent journalism · ISSN 2768-4051
        </p>
      </div>
    </section>
  );
}
