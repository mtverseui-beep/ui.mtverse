"use client";
import { motion } from "framer-motion";
const PANELS = [{ title: "Plan", desc: "Create roadmaps, set milestones, and assign tasks with drag-and-drop ease.", color: "#8b5cf6" }, { title: "Build", desc: "Write code, run tests, and deploy — all from one unified workspace.", color: "#06b6d4" }, { title: "Ship", desc: "Deploy to production with one click. Rollback instantly if needed.", color: "#10b981" }];
export function FeatureStickyScrollCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl"><div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <div className="md:sticky md:top-20 md:self-start"><h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>How it works.</h2><p className="mt-2 text-sm text-slate-500">Three simple steps from idea to production.</p></div>
        <div className="space-y-8">{PANELS.map((p, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="rounded-2xl border border-slate-200 p-6"><span className="text-3xl font-bold" style={{ color: p.color, fontFamily: "var(--font-jetbrains), monospace" }}>0{i + 1}</span><h3 className="mt-2 text-xl font-bold text-slate-900">{p.title}</h3><p className="mt-1 text-sm text-slate-600">{p.desc}</p><div className="mt-4 h-24 rounded-lg" style={{ background: `${p.color}08` }} /></motion.div>))}</div>
      </div></div>
    </section>
  );
}
