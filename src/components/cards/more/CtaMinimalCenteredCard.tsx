"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export function CtaMinimalCenteredCard() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.04em" }}>Start building today.</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-md text-base text-slate-500">Join 12,000+ teams shipping faster with our platform. No credit card required.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8 flex items-center justify-center gap-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"><span>Start free</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold text-slate-600 hover:text-slate-900">Book a demo</a>
        </motion.div>
      </div>
    </section>
  );
}
