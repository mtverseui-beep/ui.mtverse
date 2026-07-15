"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Testimonials006 — Single large featured testimonial with auto-rotate
// Dark bg + giant quote + large avatar + auto-rotates every 5s + dots.

const TESTIMONIALS = [
  { quote: "This is the most polished product I've used in years. Every detail feels considered, every interaction smooth. Our entire team adopted it in a day.", name: "Sarah Chen", role: "Chief Technology Officer at TechFlow", avatar: "photo-1494790108377-be9c29b29330" },
  { quote: "We evaluated twelve different platforms. None came close to the combination of power, elegance, and thoughtful design this team has shipped.", name: "Marcus Johnson", role: "VP of Engineering at Scale Inc.", avatar: "photo-1507003211169-0a1dd7228f2d" },
  { quote: "The ROI was immediate and substantial. Within two weeks we had recouped our annual subscription through time savings alone.", name: "Emily Rodriguez", role: "Lead Developer at Nexus Labs", avatar: "photo-1438761681033-6461ffad8d80" },
];

export function Testimonials006Card() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(i);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section className="flex min-h-full items-center justify-center px-6 py-20" style={{ background: "#0a0a0a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto h-12 w-12 text-white/20" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-8 text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            "{t.quote}"
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-6 flex justify-center text-amber-400">
          {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill="currentColor" />)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 flex items-center justify-center gap-4">
            <img src={`https://images.unsplash.com/${t.avatar}?w=120&h=120&fit=crop&crop=face`} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs text-white/50">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="h-1.5 rounded-full transition-all" style={{ width: i === idx ? 24 : 6, background: i === idx ? "#fff" : "rgba(255,255,255,0.3)" }} aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
