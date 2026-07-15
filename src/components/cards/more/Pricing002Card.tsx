import { Check } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// PricingCard — extracted from framer-motion-error project
// ════════════════════════════════════════════════════════════════════════════
// 3-tier pricing grid with a highlighted "Pro" plan. Clean, centered layout
// with section header, plan cards, feature lists, and CTAs.

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for side projects and small teams",
    price: "$0",
    period: "forever",
    features: ["Up to 3 team members", "5 projects", "Basic analytics", "Community support", "1GB storage"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100GB storage",
      "Custom integrations",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom SLA",
      "On-premise deployment",
      "Unlimited storage",
      "Advanced security",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing002Card() {
  return (
    <section id="pricing" className="px-6 py-24 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance text-lg">
            No hidden fees. No surprises. Choose the plan that works for you.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border flex flex-col h-full ${
                plan.highlighted ? "bg-foreground text-background border-foreground" : "bg-background cs-border"
              }`}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? "text-background" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? "text-background" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? "text-background" : "text-muted-foreground"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-background/80" : "text-muted-foreground"}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`block w-full py-3 px-6 text-center rounded-full font-medium text-sm transition-colors mt-auto ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
