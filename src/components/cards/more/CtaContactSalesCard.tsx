"use client";
import { motion } from "framer-motion";
import { Phone, Mail, Building2, ArrowRight } from "lucide-react";
export function CtaContactSalesCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div><span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"><Building2 className="h-3 w-3" /> Enterprise</span><h2 className="mt-4 text-3xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Let's talk about your needs.</h2><p className="mt-2 text-sm text-white/50">Get a personalized demo, custom pricing, and a migration plan in 24 hours.</p><div className="mt-6 space-y-3"><a href="tel:+18005550199" className="flex items-center gap-3 text-sm text-white/70 hover:text-white"><Phone className="h-4 w-4 text-slate-400" /> +1 (800) 555-0199</a><a href="mailto:sales@company.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-white"><Mail className="h-4 w-4 text-slate-400" /> sales@company.com</a></div></div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h3 className="text-sm font-bold text-white">Request a demo</h3><div className="mt-4 space-y-3"><input placeholder="Work email" className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 px-3 text-sm text-white placeholder:text-white/30 outline-none" /><input placeholder="Company" className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 px-3 text-sm text-white placeholder:text-white/30 outline-none" /><button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-slate-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-600">Contact sales <ArrowRight className="h-3.5 w-3.5" /></button></div></motion.div>
        </div>
      </div>
    </section>
  );
}
