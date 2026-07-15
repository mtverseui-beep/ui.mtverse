"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

// Testimonials013 — Horizontal scroll-snap carousel with arrows
const TESTIMONIALS = [
  { quote: "The polish is unmatched. Every interaction feels considered and intentional.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "We shipped our MVP in 2 weeks instead of 2 months. Genuinely a game-changer.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "Deploy time went from hours to minutes. The support team is exceptional.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
  { quote: "Onboarding was effortless. We had everyone up and running in under a day.", name: "David Park", role: "IT Manager, Apex", avatar: "photo-1472099645785-5658abf4ff4e", stars: 5 },
  { quote: "Productivity improved dramatically. The features are powerful and intuitive.", name: "Aisha Patel", role: "CS Lead, Quantum", avatar: "photo-1534528741775-53994a69daeb", stars: 5 },
];

export function Testimonials013Card() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };
  return (
    <section className="px-6 py-24" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300">Testimonials</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ letterSpacing: "-0.03em" }}>What teams are saying</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scroll("left")} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-white/5 hover:text-white" aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll("right")} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-white/5 hover:text-white" aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={scroller} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="w-[340px] flex-shrink-0 snap-center rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-3 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm leading-relaxed text-white/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-white/50">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
