"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
export function CtaBackgroundVideoCard() {
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden px-6 py-20" style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      { }
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-900/70 to-purple-900/80" />
      <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>The future is here.</motion.h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/70">Experience the next generation of productivity. Built for what's next.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition-transform hover:scale-105 sm:w-auto">Get started <ArrowRight className="h-4 w-4" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"><Play className="h-3.5 w-3.5 fill-white" /> Watch video</a></div>
      </div>
    </section>
  );
}
