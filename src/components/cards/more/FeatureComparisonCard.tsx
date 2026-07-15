"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
const ROWS = [{ label: "Real-time analytics", us: true, them: false }, { label: "AI-powered insights", us: true, them: true }, { label: "Unlimited projects", us: true, them: false }, { label: "Custom domains", us: true, them: true }, { label: "SSO + SAML", us: true, them: false }, { label: "24/7 support", us: true, them: false }];
export function FeatureComparisonCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center"><h2 className="text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Why switch?</h2><p className="mt-2 text-base text-slate-500">See how we compare to the competition.</p></div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-[1fr_auto_auto] border-b border-slate-200 bg-slate-50"><div className="p-4" /><div className="p-4 text-center text-sm font-bold text-indigo-600">Us</div><div className="p-4 text-center text-sm font-bold text-slate-400">Others</div></div>
          {ROWS.map((r, i) => (<div key={i} className={`grid grid-cols-[1fr_auto_auto] ${i % 2 ? "bg-slate-50/50" : ""}`}><div className="p-4 text-sm text-slate-700">{r.label}</div><div className="flex items-center justify-center p-4">{r.us ? <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} /> : <X className="h-4 w-4 text-slate-300" />}</div><div className="flex items-center justify-center p-4">{r.them ? <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} /> : <X className="h-4 w-4 text-slate-300" />}</div></div>))}
        </motion.div>
      </div>
    </section>
  );
}
