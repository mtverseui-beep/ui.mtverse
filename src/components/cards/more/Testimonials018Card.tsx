"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Testimonials018 — Bento grid with mixed-size testimonial tiles
const TILES = [
  { quote: "The best investment we've made this year. ROI was immediate and substantial.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5, span: "lg" },
  { quote: "Shipped 3x faster.", name: "Marcus J.", role: "VP Eng", stars: 5, span: "sm" },
  { quote: "Support is unreal.", name: "Emily R.", role: "Lead Dev", stars: 5, span: "sm" },
  { quote: "We evaluated twelve platforms. None came close to this combination of power and elegance. Genuinely the gold standard.", name: "David Park", role: "IT Manager, Apex", avatar: "photo-1472099645785-5658abf4ff4e", stars: 5, span: "md" },
  { quote: "Onboarding took 30 min.", name: "Aisha P.", role: "CS Lead", stars: 5, span: "sm" },
  { quote: "Can't work without it.", name: "James W.", role: "CEO", stars: 5, span: "sm" },
];

export function Testimonials018Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#f8fafc", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">Testimonials</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Loved by teams everywhere</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TILES.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all hover:shadow-lg ${t.span === "lg" ? "col-span-2 row-span-2" : t.span === "md" ? "col-span-2" : ""} ${t.span === "lg" ? "border-violet-200" : "border-slate-200"}`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20" style={{ background: t.span === "lg" ? "#8b5cf6" : "#3b82f6" }} />
              <Quote className={`text-slate-300 ${t.span === "lg" ? "h-8 w-8" : "h-5 w-5"}`} />
              <div className="mt-2 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className={`mt-2 ${t.span === "lg" ? "text-lg" : "text-sm"} font-medium leading-snug text-slate-800`}>"{t.quote}"</p>
              <div className="mt-3 flex items-center gap-2">
                {t.avatar && <img src={`https://images.unsplash.com/${t.avatar}?w=60&h=60&fit=crop&crop=face`} alt={t.name} className="h-7 w-7 rounded-full object-cover" />}
                <div><p className="text-xs font-semibold text-slate-900">{t.name}</p><p className="text-[10px] text-slate-500">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
