"use client";
import { motion } from "framer-motion";
import { ArrowRight, Plug } from "lucide-react";
const LOGOS = ["Slack", "GitHub", "Notion", "Linear", "Figma", "Vercel", "Stripe", "Zapier"];
export function CtaIntegrationCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600"><Plug className="h-3 w-3" /> Integrations</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Connect your entire stack.</h2>
        <p className="mt-2 text-sm text-slate-500">200+ integrations. Set up in minutes, not days.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">{LOGOS.map(l => <motion.span key={l} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">{l}</motion.span>)}</div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">Browse integrations <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
      </div>
    </section>
  );
}
