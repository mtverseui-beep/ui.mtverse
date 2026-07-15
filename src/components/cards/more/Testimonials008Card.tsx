"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials008 — Editorial magazine with pull quotes + Fraunces serif

const TESTIMONIALS = [
  { quote: "A masterclass in product design. Every interaction feels intentional, every pixel considered. This is the gold standard.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5, vol: "I" },
  { quote: "We evaluated twelve platforms. None came close. The combination of power and elegance is unmatched in this category.", name: "Marcus Johnson", role: "VP Engineering, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5, vol: "II" },
  { quote: "ROI was immediate. Within two weeks we had recouped our annual subscription through time savings alone.", name: "Emily Rodriguez", role: "Lead Developer, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5, vol: "III" },
];

export function Testimonials008Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#f5f0e6", fontFamily: "var(--font-fraunces), Georgia, serif", color: "#1a1612" }}>
      <div className="mx-auto max-w-4xl">
        <div className="border-t-2 border-b border-black/30 py-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Voices · Vol. XII · What Readers Say</p>
        </div>
        <h2 className="my-10 text-center text-5xl font-medium tracking-tight md:text-6xl" style={{ letterSpacing: "-0.03em", fontStyle: "italic" }}>In their own words.</h2>
        <div className="space-y-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="grid grid-cols-[auto_1fr] gap-6 border-b border-black/15 pb-12 last:border-b-0">
              <img src={`https://images.unsplash.com/${t.avatar}?w=120&h=120&fit=crop&crop=face`} alt={t.name} className="h-20 w-20 rounded-full object-cover grayscale" />
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>No. {t.vol}</span>
                  <div className="flex text-amber-700">
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}
                  </div>
                </div>
                <blockquote className="text-2xl font-medium leading-snug" style={{ fontStyle: "italic", letterSpacing: "-0.01em" }}>"{t.quote}"</blockquote>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-sm font-bold" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{t.name}</p>
                  <span className="text-xs text-black/40">·</span>
                  <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
