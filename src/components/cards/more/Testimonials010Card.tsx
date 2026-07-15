"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials010 — Stats + testimonials hybrid with big numbers
const STATS = [{ v: "12K+", l: "Active teams" }, { v: "4.9/5", l: "Avg rating" }, { v: "98%", l: "Would recommend" }, { v: "2.4M", l: "Daily users" }];
const TESTIMONIALS = [
  { quote: "Productivity up 40% in the first month. The dashboards alone are worth it.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "Best onboarding experience I've seen. We were live in under an hour.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "Support team is genuinely the best. They care about your success.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
];

export function Testimonials010Card() {
  return (
    <section className="px-6 py-24" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="text-center">
              <p className="text-4xl font-bold text-indigo-600 md:text-5xl" style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.04em" }}>{s.v}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.l}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div><p className="text-sm font-semibold text-slate-900">{t.name}</p><p className="text-xs text-slate-500">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
