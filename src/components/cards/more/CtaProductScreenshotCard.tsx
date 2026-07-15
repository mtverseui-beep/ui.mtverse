"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export function CtaProductScreenshotCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>See it in action.</motion.h2>
        <p className="mt-3 text-base text-white/60">Your entire workflow, beautifully visualized.</p>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl">
          <div className="flex items-center gap-1.5 px-2 py-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" /></div>
          <div className="grid grid-cols-3 gap-2 p-2"><div className="col-span-2 h-28 rounded-lg bg-sky-500/10" /><div className="h-28 rounded-lg bg-cyan-500/10" /><div className="h-16 rounded-lg bg-violet-500/10" /><div className="h-16 rounded-lg bg-emerald-500/10" /><div className="h-16 rounded-lg bg-amber-500/10" /></div>
        </motion.div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">Try it free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
      </div>
    </section>
  );
}
