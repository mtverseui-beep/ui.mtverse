"use client";
import { motion } from "framer-motion";
const CARDS = [{ title: "Analytics", desc: "Real-time dashboards with custom metrics.", color: "#06b6d4" }, { title: "Automation", desc: "Workflows that run themselves.", color: "#8b5cf6" }, { title: "Collaboration", desc: "Real-time editing with your team.", color: "#f59e0b" }, { title: "Integrations", desc: "200+ tools connected in one click.", color: "#10b981" }, { title: "Security", desc: "SOC 2 + end-to-end encryption.", color: "#ec4899" }, { title: "AI", desc: "GPT-4 powered insights.", color: "#6366f1" }];
export function FeatureHorizontalScrollCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl"><h2 className="mb-8 text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Swipe through features.</h2>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((c, i) => (<motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="w-[280px] flex-shrink-0 snap-center rounded-2xl border border-slate-200 p-6"><span className="text-3xl font-bold" style={{ color: c.color, fontFamily: "var(--font-jetbrains), monospace" }}>0{i + 1}</span><h3 className="mt-2 text-lg font-bold text-slate-900">{c.title}</h3><p className="mt-1 text-sm text-slate-500">{c.desc}</p><div className="mt-4 h-20 rounded-lg" style={{ background: `${c.color}10` }} /></motion.div>))}
        </div>
      </div>
    </section>
  );
}
