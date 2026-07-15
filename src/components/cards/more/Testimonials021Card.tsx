"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials021 — Origami folded cards with 3D perspective hover
const TESTIMONIALS = [
  { quote: "The polish is unmatched. Every interaction feels considered.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5, accent: "#ec4899" },
  { quote: "We shipped in 2 weeks what used to take 2 months.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5, accent: "#3b82f6" },
  { quote: "Genuinely the best tool in its category. By far.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5, accent: "#10b981" },
];

export function Testimonials021Card() {
  return (
    <section className="px-6 py-24" style={{ background: "linear-gradient(180deg, #fdf6e3 0%, #fef9c3 100%)", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif", color: "#1c1917" }}>
      <div className="mx-auto max-w-6xl" style={{ perspective: "1500px" }}>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.04em" }}>What people say.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, rotateY: -15 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ rotateY: 8, rotateX: -4, y: -6 }} style={{ transformStyle: "preserve-3d" }}>
              <div className="relative overflow-hidden rounded-2xl border-2 border-stone-900/10 bg-white p-6 transition-shadow duration-500" style={{ boxShadow: `8px 8px 0 0 ${t.accent}30, 16px 16px 32px rgba(0,0,0,0.06)` }}>
                <div className="absolute right-0 top-0 h-12 w-12 origin-top-right transition-transform duration-500 hover:scale-0" style={{ background: `linear-gradient(225deg, ${t.accent}30, transparent)`, clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                <div className="absolute -left-8 -top-8 h-16 w-16 rotate-45 opacity-10" style={{ background: t.accent }} />
                <div className="mb-3 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
                <p className="text-sm leading-relaxed text-stone-700">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-stone-200 pt-4">
                  <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div><p className="text-sm font-bold">{t.name}</p><p className="text-xs text-stone-500">{t.role}</p></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
