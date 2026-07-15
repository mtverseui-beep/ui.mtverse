"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing003Card — extracted from Nexus Work Management Platform
// ════════════════════════════════════════════════════════════════════════════
// 3-tier pricing with:
//   • Monthly/Yearly toggle with sliding pill (framer-motion layoutId)
//   • "Most Popular" badge on Pro plan
//   • BorderBeam animation on highlighted plan (light spot travels the border)
//   • Shimmer effect on the highlighted CTA button
//   • Staggered card entrance via useInView
//
// All CSS animations are inlined in a <style> block so the component is
// self-contained. Uses zinc color palette (dark theme) matching the source.

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for side projects and small teams",
    price: { monthly: 0, yearly: 0 },
    features: ["3 team members", "10 projects", "Basic analytics", "Community support", "1GB storage"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    price: { monthly: 29, yearly: 24 },
    features: ["Unlimited team members", "Unlimited projects", "Advanced analytics", "Priority support", "100GB storage", "Custom domains", "API access"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: { monthly: 99, yearly: 79 },
    features: ["Everything in Pro", "SSO & SAML", "Dedicated support", "SLA guarantee", "Unlimited storage", "Custom integrations", "Audit logs"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

// ── BorderBeam — light spot travels around the card border ──
function BorderBeam() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div
        className="nexus-border-beam absolute w-24 h-24 bg-white/20 blur-xl"
        style={{ offsetPath: "rect(0 100% 100% 0 round 16px)" }}
      />
    </div>
  );
}

export function Pricing003Card() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <style>{`
        @keyframes nexus-border-beam {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .nexus-border-beam {
          animation: nexus-border-beam 8s linear infinite;
        }
        @keyframes nexus-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .nexus-shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .nexus-shimmer-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: nexus-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <section id="pricing" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          {/* Header + toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${billingCycle === "monthly" ? "text-white" : "text-zinc-400"}`}
              >
                {billingCycle === "monthly" && (
                  <motion.div layoutId="nexus-billing-toggle" className="absolute inset-0 bg-zinc-800 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${billingCycle === "yearly" ? "text-white" : "text-zinc-400"}`}
              >
                {billingCycle === "yearly" && (
                  <motion.div layoutId="nexus-billing-toggle" className="absolute inset-0 bg-zinc-800 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                )}
                <span className="relative z-10">Yearly</span>
                <span className="relative z-10 ml-2 px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">-20%</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing grid */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  plan.highlighted ? "bg-zinc-900 border-zinc-700" : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {plan.highlighted && <BorderBeam />}

                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-zinc-950 text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-zinc-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${plan.price[billingCycle]}</span>
                    {plan.price.monthly > 0 && <span className="text-zinc-400 text-sm">/month</span>}
                  </div>
                  {billingCycle === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-xs text-zinc-500 mt-1">Billed annually (${plan.price.yearly * 12}/year)</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`nexus-shimmer-btn w-full py-2.5 px-4 rounded-full text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-white text-zinc-950 hover:bg-zinc-200"
                      : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
