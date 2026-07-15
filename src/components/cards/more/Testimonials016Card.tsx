"use client";

import { motion } from "framer-motion";
import { Star, Leaf } from "lucide-react";

// Testimonials016 — Warm earthy beige + Fraunces serif + paper grain
const TESTIMONIALS = [
  { quote: "My team's productivity blossomed. We ship with care now, not haste.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "Grown organically into our daily workflow. Can't imagine tending to projects without it.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "Rooted in thoughtful design. Every feature feels cultivated, not rushed.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
];

export function Testimonials016Card() {
  return (
    <section className="relative px-6 py-24" style={{ background: "#f0e9dc", fontFamily: "var(--font-fraunces), Georgia, serif", color: "#2d2418" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")" }} />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(217,119,6,0.1)", color: "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}><Leaf className="h-3 w-3" /> From our garden</span>
          <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em", fontStyle: "italic" }}>Cultivated with care.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl p-6" style={{ background: "#fbf7ed", border: "1px solid rgba(45,36,24,0.08)" }}>
              <div className="mb-3 flex text-amber-700">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-base italic leading-relaxed" style={{ color: "#5c4a32" }}>"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: "rgba(45,36,24,0.1)" }}>
                <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>
                  <p className="text-sm font-semibold" style={{ color: "#2d2418" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#5c4a32" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
