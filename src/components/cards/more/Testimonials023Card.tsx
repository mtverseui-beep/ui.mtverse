"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials023 — Cyberpunk neon grid floor + glitch quote cards
const TESTIMONIALS = [
  { quote: "shipped 3x faster. no cap.", name: "sarah_chen", role: "// CTO @ techflow", stars: 5, accent: "#ec4899" },
  { quote: "deploy: 4h → 8min. unreal.", name: "marcus_j", role: "// VP eng @ scale", stars: 5, accent: "#06b6d4" },
  { quote: "best tool. period.", name: "emily_r", role: "// lead dev @ nexus", stars: 5, accent: "#fbbf24" },
  { quote: "ROI in 2 weeks.", name: "david_p", role: "// IT mgr @ apex", stars: 5, accent: "#a78bfa" },
  { quote: "can't work without it.", name: "aisha_p", role: "// CS lead @ quantum", stars: 5, accent: "#34d399" },
  { quote: "genuinely essential.", name: "james_w", role: "// CEO @ quantum", stars: 5, accent: "#f472b6" },
];

export function Testimonials023Card() {
  return (
    <section className="relative overflow-hidden px-6 py-24" style={{ background: "#0a0014", fontFamily: "var(--font-jetbrains), ui-monospace, monospace" }}>
      <div className="absolute bottom-0 left-1/2 h-1/2 w-full -translate-x-1/2 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(236,72,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px", transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom center", maskImage: "linear-gradient(to top, black, transparent)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236,72,153,0.05) 2px, rgba(236,72,153,0.05) 3px)" }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-pink-400/70">{"// user_feedback.log"}</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl" style={{ letterSpacing: "-0.03em", textShadow: "0 0 20px rgba(236,72,153,0.3)" }}>REAL TALK.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.08 }} whileHover={{ y: -4 }} className="rounded-lg border bg-black/60 p-5 backdrop-blur-sm transition-all" style={{ borderColor: `${t.accent}40`, boxShadow: `0 0 30px -8px ${t.accent}40` }}>
              <div className="mb-3 flex" style={{ color: t.accent }}>{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm" style={{ color: t.accent }}>{"// "}{t.quote}</p>
              <div className="mt-4 border-t border-dashed border-white/10 pt-3">
                <p className="text-xs font-bold" style={{ color: t.accent }}>@{t.name}</p>
                <p className="text-[10px] text-white/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
