"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
const POINTS = ["Live data streams", "Custom widget builder", "Drag-and-drop layout", "Export to PDF/CSV"];
export function FeatureScreenshotCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div><span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">Dashboard</span><h2 className="mt-4 text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Your data, beautifully visualized.</h2><p className="mt-3 text-base text-white/60">Real-time dashboards with drag-and-drop widgets. Build custom views in minutes, not hours.</p>
            <ul className="mt-6 space-y-3">{POINTS.map((p, i) => (<motion.li key={p} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2.5 text-sm text-white/80"><Check className="h-4 w-4 text-indigo-400" strokeWidth={3} />{p}</motion.li>))}</ul>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl">
            <div className="flex items-center gap-1.5 px-2 py-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" /></div>
            <div className="grid grid-cols-3 gap-2 p-2"><div className="col-span-2 h-32 rounded-lg bg-indigo-500/10" /><div className="h-32 rounded-lg bg-cyan-500/10" /><div className="h-20 rounded-lg bg-violet-500/10" /><div className="h-20 rounded-lg bg-emerald-500/10" /><div className="h-20 rounded-lg bg-amber-500/10" /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
