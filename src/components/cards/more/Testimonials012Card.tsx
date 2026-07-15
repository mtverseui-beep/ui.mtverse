"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials012 — Logo wall (top) + compact quote grid (bottom)
const LOGOS = ["TechCorp", "Innovate", "NextGen", "Quantum", "Velocity", "Apex", "Cognition", "Tensor"];
const TESTIMONIALS = [
  { quote: "Genuinely the best tool we use daily.", name: "Sarah C.", role: "CTO", stars: 5 },
  { quote: "Shipped 3x faster. No exaggeration.", name: "Marcus J.", role: "VP Eng", stars: 5 },
  { quote: "Support is unreal. They actually care.", name: "Emily R.", role: "Lead Dev", stars: 5 },
  { quote: "Onboarding took 30 minutes. 30!", name: "David P.", role: "IT Manager", stars: 5 },
  { quote: "ROI in two weeks. Two weeks.", name: "Aisha P.", role: "CS Lead", stars: 5 },
  { quote: "Can't imagine working without it now.", name: "James W.", role: "CEO", stars: 5 },
];

export function Testimonials012Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        {/* Logo wall */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-40">
          {LOGOS.map((l) => <span key={l} className="text-xl font-bold tracking-tight text-slate-900">{l}</span>)}
        </div>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Don't just take our word for it.</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">Join thousands of teams who ship faster with us.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 3) * 0.06 }} className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-white hover:shadow-md">
              <div className="mb-2 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm font-medium text-slate-800">"{t.quote}"</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                <div><p className="text-xs font-semibold text-slate-900">{t.name}</p><p className="text-[10px] text-slate-500">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
