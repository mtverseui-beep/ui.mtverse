"use client";
import { motion } from "framer-motion";
const ROWS = [
  { title: "Real-time collaboration", desc: "Work together with your team in real-time. See changes instantly, leave comments, and track progress without leaving your workflow.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", color: "#f59e0b" },
  { title: "Advanced analytics", desc: "Deep insights into your data with customizable dashboards, automated reports, and predictive analytics powered by AI.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", color: "#06b6d4" },
  { title: "Enterprise security", desc: "Bank-grade encryption, SOC 2 compliance, and granular access controls keep your data safe at every layer.", img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80", color: "#10b981" },
];
export function FeatureAlternatingCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#fafafa", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl space-y-20">
        {ROWS.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className={`flex flex-col items-center gap-8 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className="flex-1"><div className="h-64 w-full overflow-hidden rounded-2xl" style={{ boxShadow: `0 20px 60px -15px ${r.color}40` }}>{ }<img src={r.img} alt={r.title} className="h-full w-full object-cover" /></div></div>
            <div className="flex-1"><span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${r.color}15`, color: r.color }}>Feature 0{i + 1}</span><h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>{r.title}</h3><p className="mt-3 text-base leading-relaxed text-slate-600">{r.desc}</p><button className="mt-4 text-sm font-semibold" style={{ color: r.color }}>Learn more →</button></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
