"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing001Card — Brand: Vertex (PagePulse extraction)
// ════════════════════════════════════════════════════════════════════════════
// 3-tier pricing grid with monthly/annual toggle, "Most Popular" badge on
// Growth plan, staggered card entrance animation.

const BRAND = "Vertex";

interface Plan {
  name: string; description: string; monthly: number; annual: number;
  features: string[]; cta: string; popular: boolean;
}

const PLANS: Plan[] = [
  { name: "Starter", description: "For side projects and small sites", monthly: 19, annual: 16, popular: false,
    features: ["50k page views / month", "Core Web Vitals tracking", "3 projects", "7-day history", "Email reports", "Basic alerts"], cta: "Start with Starter" },
  { name: "Growth", description: "For growing teams and SaaS products", monthly: 49, annual: 41, popular: true,
    features: ["500k page views / month", "Unlimited projects", "Deployment tracking", "Performance budgets", "Slack alerts", "90-day history", "Team members", "Web Vitals reports"], cta: "Start with Growth" },
  { name: "Scale", description: "For high-traffic apps and agencies", monthly: 149, annual: 124, popular: false,
    features: ["5M page views / month", "Advanced segmentation", "Custom retention", "SSO", "Audit logs", "Priority support", "Custom alerts", "SLA reports"], cta: "Start with Scale" },
];

export function Pricing001Card() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @keyframes vertex-fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes vertex-scale-in { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes vertex-arrow { 0%,100% { transform:translateX(0); } 50% { transform:translateX(3px); } }
        .v-fade-up { animation: vertex-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .v-scale-in { animation: vertex-scale-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .v-arrow:hover svg { animation: vertex-arrow 0.6s ease-in-out; }
      `}</style>
      <section id="pricing" className="relative border-t border-foreground/10 bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 max-w-3xl lg:mb-20">
            <span className="v-fade-up mb-6 block font-mono text-xs uppercase tracking-widest text-muted-foreground" style={{animationDelay:"0.1s"}}>{BRAND} · Pricing</span>
            <h2 className="v-fade-up mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" style={{animationDelay:"0.15s",opacity:mounted?1:0}}>
              Simple, transparent<br/>pricing
            </h2>
            <p className="v-fade-up max-w-xl text-lg text-muted-foreground" style={{animationDelay:"0.2s"}}>Start building in 2 minutes and scale as you grow. No hidden fees, no surprises.</p>
          </div>
          <div className="v-fade-up mb-12 flex flex-wrap items-center gap-4 lg:mb-16" style={{animationDelay:"0.25s"}}>
            <span className={`text-sm transition-colors ${!isAnnual?"text-foreground":"text-muted-foreground"}`}>Monthly</span>
            <button type="button" onClick={()=>setIsAnnual(!isAnnual)} aria-label="Toggle billing period"
              className="relative h-7 w-14 rounded-full bg-foreground/10 p-1 transition-colors hover:bg-foreground/20">
              <div className={`h-5 w-5 rounded-full bg-foreground transition-transform duration-300 ${isAnnual?"translate-x-7":"translate-x-0"}`}/>
            </button>
            <span className={`text-sm transition-colors ${isAnnual?"text-foreground":"text-muted-foreground"}`}>Annual</span>
            {isAnnual && <span className="v-scale-in ml-2 bg-foreground px-2 py-1 text-xs font-mono text-background" style={{animationDelay:"0.4s"}}>Save 17%</span>}
          </div>
          <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
            {PLANS.map((plan, idx) => (
              <div key={plan.name} className={`v-fade-up relative bg-background p-8 lg:p-12 ${plan.popular?"md:-my-4 border-2 border-foreground md:py-12 lg:py-16":""}`} style={{animationDelay:`${0.3 + idx*0.1}s`}}>
                {plan.popular && <span className="v-scale-in absolute -top-3 left-8 bg-foreground px-3 py-1 text-xs font-mono uppercase tracking-widest text-background" style={{animationDelay:"0.6s"}}>Most Popular</span>}
                <div className="mb-8">
                  <span className="font-mono text-xs text-muted-foreground">{String(idx+1).padStart(2,"0")}</span>
                  <h3 className="mt-2 text-3xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-8 border-b border-foreground/10 pb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold lg:text-6xl">${isAnnual?plan.annual:plan.monthly}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isAnnual && <p className="mt-2 font-mono text-xs text-muted-foreground">Billed annually (${plan.annual*12}/yr)</p>}
                </div>
                <ul className="mb-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0"/> <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" onClick={(e)=>e.preventDefault()} className={`v-arrow group flex w-full items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${plan.popular?"bg-foreground text-background hover:bg-foreground/90":"border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"}`}>
                  {plan.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                </a>
              </div>
            ))}
          </div>
          <p className="v-fade-up mt-12 text-center text-sm text-muted-foreground" style={{animationDelay:"0.7s"}}>
            All plans include real-user monitoring, HTTPS beacons, and GDPR-compliant data handling.{" "}
            <a href="#" onClick={(e)=>e.preventDefault()} className="underline underline-offset-4 hover:text-foreground transition-colors">Talk to sales</a>
          </p>
        </div>
      </section>
    </>
  );
}
