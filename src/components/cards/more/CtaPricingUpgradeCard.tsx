"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check, Crown } from "lucide-react";
export function CtaPricingUpgradeCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#fff7ed", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-lg rounded-2xl border border-orange-200 bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2"><Crown className="h-5 w-5 text-orange-500" /><span className="text-xs font-bold uppercase tracking-widest text-orange-600" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Upgrade to Pro</span></div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Unlock unlimited everything.</h2>
        <p className="mt-1 text-sm text-slate-500">You've hit your free plan limit. Upgrade to keep building.</p>
        <div className="mt-4 rounded-xl bg-orange-50 p-4"><div className="flex items-baseline gap-1"><span className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>$29</span><span className="text-sm text-slate-500">/month</span></div><div className="mt-3 space-y-1.5">{["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"].map(f => <div key={f} className="flex items-center gap-2 text-xs text-slate-700"><Check className="h-3 w-3 text-orange-500" strokeWidth={3} />{f}</div>)}</div></div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">Upgrade now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        <p className="mt-2 text-center text-[10px] text-slate-400">7-day money-back guarantee</p>
      </div>
    </section>
  );
}
