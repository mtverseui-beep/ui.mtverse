"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
const TILES = [{ icon: Sparkles, title: "Free trial", desc: "14 days, no card", color: "#8338ec", span: "lg" }, { icon: Zap, title: "1-click setup", desc: "No config needed", color: "#f59e0b" }, { icon: Shield, title: "SOC 2", desc: "Enterprise ready", color: "#10b981" }, { icon: ArrowRight, title: "Start now", desc: "Join 12K teams", color: "#06b6d4", span: "md" }];
export function CtaBentoCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl"><h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Get started in minutes.</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{TILES.map((t, i) => (<motion.a href="#" onClick={(e) => e.preventDefault()} key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 ${t.span === "lg" ? "col-span-2 row-span-2" : t.span === "md" ? "col-span-2" : ""}`}><div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: t.color }} /><div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${t.color}15`, color: t.color }}><t.icon className="h-4 w-4" /></div><h3 className={`mt-2 font-bold text-white ${t.span === "lg" ? "text-lg" : "text-sm"}`}>{t.title}</h3><p className="text-xs text-white/50">{t.desc}</p></motion.a>))}</div>
      </div>
    </section>
  );
}
