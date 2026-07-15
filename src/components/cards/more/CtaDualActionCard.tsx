"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
export function CtaDualActionCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#fafafa", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Two ways to get started.</h2>
        <p className="mt-3 text-base text-slate-500">Pick what works for you.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <motion.a href="#" onClick={(e) => e.preventDefault()} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition-shadow hover:shadow-lg"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500"><ArrowRight className="h-5 w-5" /></div><h3 className="mt-3 text-lg font-bold text-slate-900">Start free</h3><p className="mt-1 text-sm text-slate-500">14-day trial. No credit card. Cancel anytime.</p><p className="mt-3 text-sm font-semibold text-pink-600">Sign up →</p></motion.a>
          <motion.a href="#" onClick={(e) => e.preventDefault()} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition-shadow hover:shadow-lg"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><Play className="h-5 w-4 fill-current" /></div><h3 className="mt-3 text-lg font-bold text-slate-900">Watch demo</h3><p className="mt-1 text-sm text-slate-500">3-minute product tour. See everything in action.</p><p className="mt-3 text-sm font-semibold text-violet-600">Play video →</p></motion.a>
        </div>
      </div>
    </section>
  );
}
