"use client";
import { motion } from "framer-motion";
const EVENTS = [{ year: "2020", title: "Founded", desc: "Started with a simple idea: make analytics accessible.", color: "#8b5cf6" }, { year: "2021", title: "Series A", desc: "Raised $12M to scale the platform and grow the team.", color: "#06b6d4" }, { year: "2022", title: "10,000 customers", desc: "Reached 10K teams and launched our API platform.", color: "#10b981" }, { year: "2024", title: "AI Revolution", desc: "Launched AI-powered insights and predictive analytics.", color: "#f59e0b" }];
export function FeatureTimelineCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Our journey.</h2>
        <div className="relative"><div className="absolute left-[19px] top-0 h-full w-px bg-white/10" />
          {EVENTS.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative mb-8 flex gap-4 last:mb-0">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 z-10" style={{ borderColor: e.color, background: "#0a0a0f" }}><span className="h-2 w-2 rounded-full" style={{ background: e.color }} /></div>
              <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-4"><span className="text-xs font-bold" style={{ color: e.color, fontFamily: "var(--font-jetbrains), monospace" }}>{e.year}</span><h3 className="mt-1 text-lg font-bold text-white">{e.title}</h3><p className="mt-1 text-sm text-white/50">{e.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
