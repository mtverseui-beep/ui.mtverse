"use client";
import { motion } from "framer-motion";
const PILLARS = [{ title: "Speed", desc: "Sub-50ms globally." }, { title: "Scale", desc: "10M+ requests/day." }, { title: "Security", desc: "SOC 2 + GDPR." }];
export function FeatureFullWidthCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative mb-12 overflow-hidden rounded-3xl">
          { }
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80" alt="Earth from space" className="h-64 w-full object-cover md:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">Our Story</span><h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-white md:text-4xl" style={{ letterSpacing: "-0.03em" }}>From a simple idea to a platform powering 12,000 teams.</h2></div>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">{PILLARS.map((p, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-2 border-slate-200 pl-4"><h3 className="text-lg font-bold text-slate-900">{p.title}</h3><p className="mt-1 text-sm text-slate-500">{p.desc}</p></motion.div>))}</div>
      </div>
    </section>
  );
}
