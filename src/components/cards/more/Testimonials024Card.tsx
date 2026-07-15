"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

// Testimonials024 — Stripe-style minimal with sliding quote reveal + indigo gradient
const TESTIMONIALS = [
  { quote: "The polish is unmatched. Every interaction feels considered and intentional. This is the gold standard.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5 },
  { quote: "We evaluated twelve platforms. None came close to this combination of power and elegance.", name: "Marcus Johnson", role: "VP Eng, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5 },
  { quote: "ROI was immediate. Within two weeks we had recouped our annual subscription.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5 },
];

export function Testimonials024Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a2540" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">Testimonials</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.04em" }}>Don't just take our word for it.</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">Join thousands of teams who ship faster with us.</p>
        </div>
        <div className="space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
            >
              <img src={`https://images.unsplash.com/${t.avatar}?w=120&h=120&fit=crop&crop=face`} alt={t.name} className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ring-slate-100" />
              <div className="flex-1">
                <div className="mb-1.5 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
                <p className="text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
                <div className="mt-2">
                  <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="text-xs text-slate-500">{t.role}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-indigo-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
