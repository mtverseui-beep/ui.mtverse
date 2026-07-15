"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials017 — Dark luxury gold serif + Cormorant Garamond
const TESTIMONIALS = [
  { quote: "A masterpiece of craft. Every detail speaks of intention.", name: "Sarah Chen", role: "Creative Director, Maison", stars: 5 },
  { quote: "Unparalleled elegance. The finest tool in its class, by far.", name: "Marcus Johnson", role: "VP Eng, Atelier", stars: 5 },
  { quote: "Exquisite. A rare combination of beauty and power.", name: "Emily Rodriguez", role: "Lead Designer, Studio", stars: 5 },
];

export function Testimonials017Card() {
  return (
    <section className="relative px-6 py-24" style={{ background: "#000000", fontFamily: "var(--font-cormorant), Georgia, serif", color: "#e5e2d9" }}>
      <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(196,163,90,0.1), transparent 70%)" }} />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-300/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Testimonials</p>
          <h2 className="mt-5 text-4xl font-medium tracking-[0.05em] md:text-6xl" style={{ fontStyle: "italic", backgroundImage: "linear-gradient(135deg, #d4af37, #f4e5b1, #c4a35a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>In their words.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center">
              <div className="mb-3 flex justify-center text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={1.5} />)}</div>
              <blockquote className="text-lg leading-snug" style={{ fontStyle: "italic", color: "#e5e2d9" }}>"{t.quote}"</blockquote>
              <div className="mt-4">
                <p className="text-sm font-medium" style={{ color: "#f4e5b1" }}>{t.name}</p>
                <p className="text-xs text-amber-100/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
