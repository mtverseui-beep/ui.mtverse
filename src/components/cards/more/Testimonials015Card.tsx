"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials015 — Apple-style minimal with large spacious quotes
const TESTIMONIALS = [
  { quote: "It just works. Every time.", name: "Sarah Chen", role: "CTO, TechFlow", stars: 5 },
  { quote: "Beautifully designed. Powerful under the hood.", name: "Marcus Johnson", role: "VP Eng, Scale", stars: 5 },
  { quote: "The best tool we've ever used.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", stars: 5 },
];

export function Testimonials015Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#1d1d1f" }}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 text-center text-5xl font-semibold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>Loved by everyone.</h2>
        <div className="space-y-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center">
              <div className="mb-4 flex justify-center text-[#ffb800]">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <blockquote className="mx-auto max-w-2xl text-3xl font-medium leading-tight md:text-4xl" style={{ letterSpacing: "-0.03em" }}>"{t.quote}"</blockquote>
              <p className="mt-5 text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-[#86868b]">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
