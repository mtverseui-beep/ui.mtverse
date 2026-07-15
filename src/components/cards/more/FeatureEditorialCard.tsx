"use client";
import { motion } from "framer-motion";
const FEATURES = [{ n: "I", title: "Simplicity", desc: "Every interaction designed with intention. No clutter, no noise — just what you need, when you need it." }, { n: "II", title: "Performance", desc: "Built on a modern stack with edge computing. Sub-50ms response times, anywhere in the world." }, { n: "III", title: "Craft", desc: "Every pixel considered. Every animation purposeful. Every detail a reflection of our commitment to quality." }];
export function FeatureEditorialCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#f5f0e6", fontFamily: "var(--font-fraunces), Georgia, serif", color: "#1a1612" }}>
      <div className="mx-auto max-w-3xl"><div className="border-t-2 border-b border-black/30 py-3 text-center"><p className="text-[10px] uppercase tracking-[0.4em] text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Principles · Vol. I</p></div>
        <h2 className="my-10 text-center text-5xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em", fontStyle: "italic" }}>What we value.</h2>
        <div className="space-y-10">{FEATURES.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="grid grid-cols-[auto_1fr] gap-6 border-b border-black/15 pb-10 last:border-b-0"><span className="text-2xl font-medium text-black/30" style={{ fontStyle: "italic" }}>{f.n}</span><div><h3 className="text-2xl font-medium" style={{ fontStyle: "italic" }}>{f.title}</h3><p className="mt-2 text-base leading-relaxed text-black/60" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{f.desc}</p></div></motion.div>))}</div>
      </div>
    </section>
  );
}
