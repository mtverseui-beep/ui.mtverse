"use client";
import { motion } from "framer-motion";
import { Zap, Users, TrendingUp, Clock } from "lucide-react";
const STATS = [{ icon: Zap, value: "50ms", label: "Avg response time", color: "#f59e0b" }, { icon: Users, value: "12K+", label: "Active teams", color: "#06b6d4" }, { icon: TrendingUp, value: "3.2x", label: "Avg growth", color: "#10b981" }, { icon: Clock, value: "99.99%", label: "Uptime SLA", color: "#8b5cf6" }];
const FEATURES = ["Real-time monitoring with instant alerts", "Custom dashboards with drag-and-drop widgets", "Automated reports delivered to your inbox", "Predictive analytics powered by GPT-4"];
export function FeatureMetricsCard() {
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">{STATS.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center"><s.icon className="mx-auto h-5 w-5" style={{ color: s.color }} /><p className="mt-1 text-3xl font-bold" style={{ color: s.color, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.04em" }}>{s.value}</p><p className="text-xs uppercase tracking-wider text-slate-500">{s.label}</p></motion.div>))}</div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="mb-4 text-lg font-bold text-slate-900">What you get:</h3><div className="grid gap-3 md:grid-cols-2">{FEATURES.map((f, i) => (<motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2.5 text-sm text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{f}</motion.div>))}</div></div>
      </div>
    </section>
  );
}
