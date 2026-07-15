"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
export function CtaFreeTrialCard() {
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md"><Clock className="h-6 w-6 text-white" /></motion.div>
        <h2 className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Start your 14-day free trial.</h2>
        <p className="mt-3 text-base text-white/70">No credit card required. Full access to all features.</p>
        <div className="mt-6 grid grid-cols-2 gap-2 text-left sm:grid-cols-4">{["All features", "Unlimited users", "Priority support", "Cancel anytime"].map((f, i) => <motion.div key={f} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2 text-xs text-white/80"><Check className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} />{f}</motion.div>)}</div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-violet-700 transition-transform hover:scale-105">Start free trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
      </div>
    </section>
  );
}
