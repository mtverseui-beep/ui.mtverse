"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const STATS = [{ v: "12K+", l: "Active teams" }, { v: "4.9/5", l: "Avg rating" }, { v: "99.99%", l: "Uptime" }, { v: "3.2x", l: "Faster shipping" }];
export function CtaStatisticsCard() {
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">{STATS.map((s, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center"><p className="text-3xl font-bold text-amber-600" style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.04em" }}>{s.v}</p><p className="text-xs text-slate-500">{s.l}</p></motion.div>)}</div>
        <div className="text-center"><h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Join the thousands of teams shipping faster.</h2><a href="#" onClick={(e) => e.preventDefault()} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></div>
      </div>
    </section>
  );
}
