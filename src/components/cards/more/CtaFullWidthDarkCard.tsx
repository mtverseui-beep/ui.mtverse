"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
export function CtaFullWidthDarkCard() {
  return (
    <section className="px-6 py-24" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-bold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em", background: "linear-gradient(135deg, #06b6d4 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ship faster. Scale further.</motion.h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/50">The platform trusted by 12,000+ teams to build, deploy, and scale their products.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105 sm:w-auto">Start free trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto">Talk to sales</a></div>
      </div>
    </section>
  );
}
