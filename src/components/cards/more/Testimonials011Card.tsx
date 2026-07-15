"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials011 — Glassmorphism aurora with 3D tilt cards
const TESTIMONIALS = [
  { quote: "The polish is unmatched. Every interaction feels considered.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "We shipped in 2 weeks what used to take 2 months.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "Genuinely the best tool in its category. By far.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
];

function TiltCard({ t, i }: { t: typeof TESTIMONIALS[number]; i: number }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="perspective-1000">
      <div
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ rx: -((e.clientY - r.top) / r.height - 0.5) * 10, ry: ((e.clientX - r.left) / r.width - 0.5) * 10 }); }}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-transform duration-200"
        style={{ transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div className="mb-3 flex text-amber-300">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
        <p className="text-sm leading-relaxed text-white/90">"{t.quote}"</p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
          <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20" />
          <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-white/50">{t.role}</p></div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials011Card() {
  return (
    <section className="relative overflow-hidden px-6 py-24" style={{ background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0a26 50%, #050217 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)", filter: "blur(60px)" }} animate={{ x: [0, 80, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22), transparent 60%)", filter: "blur(70px)" }} animate={{ x: [0, -60, 0], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur">Testimonials</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Trusted by builders everywhere</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => <TiltCard key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
