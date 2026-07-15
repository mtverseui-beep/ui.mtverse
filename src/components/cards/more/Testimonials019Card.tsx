"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials019 — Holographic iridescent conic-gradient border cards
const TESTIMONIALS = [
  { quote: "The polish is unmatched. Every interaction feels considered.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "We shipped in 2 weeks what used to take 2 months.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "Genuinely the best tool in its category.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
];

export function Testimonials019Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-t-shift 4s ease infinite" }}>Testimonials</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Trusted by <span style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "holo-t-shift 4s ease infinite" }}>everyone</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl p-px" style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-t-shift 6s ease infinite" }}>
              <div className="h-full rounded-2xl p-6" style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(20px)" }}>
                <div className="mb-3 flex text-emerald-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
                <p className="text-sm leading-relaxed text-white/90">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20" />
                  <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-white/50">{t.role}</p></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@keyframes holo-t-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
    </section>
  );
}
