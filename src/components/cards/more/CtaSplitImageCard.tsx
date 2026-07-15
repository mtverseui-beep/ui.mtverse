"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
export function CtaSplitImageCard() {
  return (
    <section className="flex min-h-full" style={{ background: "#ffffff", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="relative hidden w-1/2 lg:block">{ }<img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-600/40" /></div>
      <div className="flex flex-1 items-center justify-center px-6 py-20 lg:px-12">
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-md">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Ready to transform your workflow?</h2>
          <p className="mt-3 text-base text-slate-600">Get started in minutes. No setup required, no credit card needed.</p>
          <ul className="mt-6 space-y-2">{["14-day free trial", "Cancel anytime", "24/7 support"].map((f, i) => (<li key={i} className="flex items-center gap-2 text-sm text-slate-700"><Check className="h-4 w-4 text-amber-500" strokeWidth={3} />{f}</li>))}</ul>
          <a href="#" onClick={(e) => e.preventDefault()} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        </motion.div>
      </div>
    </section>
  );
}
