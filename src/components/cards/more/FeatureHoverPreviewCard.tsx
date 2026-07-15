"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
const CARDS = [{ title: "Analytics", desc: "Real-time dashboards", color: "#06b6d4", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" }, { title: "Collaboration", desc: "Work together live", color: "#8b5cf6", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" }, { title: "Automation", desc: "Workflows that run themselves", color: "#f59e0b", img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80" }];
export function FeatureHoverPreviewCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl"><h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Hover to preview.</h2>
        <div className="grid gap-4 md:grid-cols-3">{CARDS.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-video overflow-hidden">{ }<img src={c.img} alt={c.title} className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105" /><div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"><div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${c.color}30`, backdropFilter: "blur(8px)" }}><Play className="h-4 w-4 fill-white text-white" /></div></div></div>
            <div className="p-4"><h3 className="text-sm font-bold text-white">{c.title}</h3><p className="text-xs text-white/50">{c.desc}</p></div>
          </motion.div>
        ))}</div>
      </div>
    </section>
  );
}
