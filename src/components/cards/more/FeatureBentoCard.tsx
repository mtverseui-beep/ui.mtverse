"use client";
import { motion } from "framer-motion";
import { Zap, Shield, Sparkles, BarChart3, Code2, Globe } from "lucide-react";

const TILES = [
  { icon: Sparkles, title: "AI-Powered Insights", desc: "Get instant analytics powered by GPT-4.", color: "#8b5cf6", span: "lg" },
  { icon: Zap, title: "1-Click Deploy", desc: "Ship in seconds.", color: "#f59e0b" },
  { icon: Shield, title: "SOC 2", desc: "Enterprise security.", color: "#10b981" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with custom metrics and automated reporting.", color: "#06b6d4", span: "md" },
  { icon: Code2, title: "API Access", desc: "Full REST + GraphQL.", color: "#6366f1" },
  { icon: Globe, title: "Global CDN", desc: "200+ edge locations.", color: "#ec4899" },
];

export function FeatureBentoCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300">Features</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Everything you need to ship.</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TILES.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 ${t.span === "lg" ? "col-span-2 row-span-2" : t.span === "md" ? "col-span-2" : ""}`}>
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: t.color }} />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${t.color}15`, color: t.color }}><t.icon className="h-5 w-5" /></div>
              <h3 className={`mt-3 font-bold text-white ${t.span === "lg" ? "text-xl" : "text-sm"}`}>{t.title}</h3>
              <p className={`mt-1 text-white/50 ${t.span === "lg" ? "text-sm" : "text-xs"}`}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
