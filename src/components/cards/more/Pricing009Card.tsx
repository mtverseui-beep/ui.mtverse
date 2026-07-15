"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing009 — Glass cards on mesh gradient + 3D tilt-on-hover
// Animated mesh gradient bg + glass cards with backdrop blur that tilt in
// 3D toward the cursor. Popular card has gradient border glow.
// Toggle = circular dial with year/mo labels around it.
// ════════════════════════════════════════════════════════════════════════════

const PLANS = [
  {
    name: "Sprout", monthly: 0, annual: 0,
    desc: "Plant the seed. Free forever.",
    features: ["3 boards", "Basic templates", "Community support", "1GB storage"],
    cta: "Start free", color: "#34d399",
  },
  {
    name: "Bloom", monthly: 18, annual: 14,
    desc: "For makers ready to grow.",
    features: ["Unlimited boards", "Premium templates", "Priority support", "50GB storage", "Collaborators (5)", "Version history", "Export to PDF/PNG"],
    cta: "Start trial", popular: true, color: "#a855f7",
  },
  {
    name: "Forest", monthly: 49, annual: 39,
    desc: "For teams running the show.",
    features: ["Everything in Bloom", "Unlimited collaborators", "SSO + SAML", "Admin dashboard", "Audit logs", "Custom branding"],
    cta: "Book demo", color: "#f59e0b",
  },
];

export function Pricing009Card() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      className="relative py-24"
      style={{
        background: "linear-gradient(135deg, #fdf4ff 0%, #faf5ff 25%, #eff6ff 50%, #ecfeff 75%, #f0fdfa 100%)",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Animated mesh blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22), transparent 70%)", filter: "blur(50px)" }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/60 px-3 py-1 text-xs font-medium text-violet-700 backdrop-blur">
            <Sparkles className="h-3 w-3" /> Pricing
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            Plans for every kind of maker.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-slate-600">
            Transparent pricing. Cancel anytime. No credit card to start.
          </p>

          {/* Toggle */}
          <div className="mt-7 inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 backdrop-blur">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!annual ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${annual ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              Annual <span className="text-[10px] text-emerald-600">−22%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <TiltCard key={plan.name} plan={plan} annual={annual} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ plan, annual, delay }: { plan: typeof PLANS[number]; annual: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="perspective-1000"
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          setTilt({ rx: -py * 10, ry: px * 10 });
        }}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-transform duration-200 ${
          plan.popular
            ? "border-violet-300/50 bg-white/70 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]"
            : "border-slate-200/60 bg-white/50"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          padding: "2rem 1.75rem",
        }}
      >
        {plan.popular && (
          <>
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.08), transparent 50%, rgba(6,182,212,0.08))",
              }}
            />
            <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Popular
            </span>
          </>
        )}

        <div className="relative z-10">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: plan.color }} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{plan.name}</span>
          </div>
          <p className="text-sm text-slate-600">{plan.desc}</p>

          <div className="mt-5 flex items-baseline gap-1.5">
            <span className="text-5xl font-bold text-slate-900" style={{ letterSpacing: "-0.04em" }}>${annual ? plan.annual : plan.monthly}</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          {annual && plan.monthly > 0 && (
            <p className="mt-1 text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              ${plan.annual * 12}/yr billed
            </p>
          )}

          <button
            className={`mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all ${
              plan.popular
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/30"
                : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
            }`}
          >
            {plan.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <ul className="mt-6 space-y-2.5 border-t border-slate-200/60 pt-5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                <Check className="h-4 w-4 shrink-0" style={{ color: plan.color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
