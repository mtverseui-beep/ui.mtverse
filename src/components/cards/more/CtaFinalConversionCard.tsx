"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
export function CtaFinalConversionCard() {
  return (
    <section className="relative overflow-hidden px-6 py-28" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)", filter: "blur(60px)" }} animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-widest text-indigo-400" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Last chance</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.04em" }}>Stop waiting.<br /><span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Start building.</span></motion.h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/50">Join 12,000+ teams already shipping faster. Your 14-day free trial is one click away.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">{["No credit card", "Cancel anytime", "Full access"].map(f => <div key={f} className="flex items-center gap-1.5 text-xs text-white/60"><Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />{f}</div>)}</div>
        <motion.a href="#" onClick={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-4 text-base font-bold text-white" style={{ boxShadow: "0 15px 40px -10px rgba(99,102,241,0.5)" }}>Start free trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></motion.a>
      </div>
    </section>
  );
}
