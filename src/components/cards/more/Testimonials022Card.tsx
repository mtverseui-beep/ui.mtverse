"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials022 — Neumorphic soft UI embossed cards
const TESTIMONIALS = [
  { quote: "Productivity up 40% in the first month.", name: "Sarah Chen", role: "CTO, TechFlow", stars: 5 },
  { quote: "Best onboarding experience I've seen.", name: "Marcus Johnson", role: "VP Eng, Scale", stars: 5 },
  { quote: "Support team genuinely cares.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", stars: 5 },
];

export function Testimonials022Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#e6e7ee", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#3b3f51" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em", color: "#3b3f51" }}>Gentle praise.</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">Soft words from satisfied teams.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }} className="rounded-3xl p-6" style={{ background: "#e6e7ee", boxShadow: "10px 10px 24px #c5c6cc, -10px -10px 24px #ffffff" }}>
              <div className="mb-3 flex text-amber-500">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#e6e7ee", boxShadow: "inset 3px 3px 6px #c5c6cc, inset -3px -3px 6px #ffffff", color: "#6366f1" }}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg>
                </div>
                <div><p className="text-sm font-semibold" style={{ color: "#3b3f51" }}>{t.name}</p><p className="text-xs text-slate-500">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
