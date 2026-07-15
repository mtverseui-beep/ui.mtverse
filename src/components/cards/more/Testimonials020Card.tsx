"use client";

import { motion } from "framer-motion";
import { Star, Briefcase, Heart, Zap, GraduationCap } from "lucide-react";

// Testimonials020 — Industry verticals comparison testimonials
const VERTICALS = [
  { icon: Zap, label: "Startups", color: "#f59e0b", testimonials: [{ quote: "Shipped MVP in 2 weeks.", name: "Sarah C.", role: "Founder", stars: 5 }, { quote: "3x faster deploys.", name: "Marcus J.", role: "CTO", stars: 5 }] },
  { icon: Briefcase, label: "Enterprise", color: "#3b82f6", testimonials: [{ quote: "Onboarded 500+ devs in a week.", name: "Emily R.", role: "VP Eng", stars: 5 }, { quote: "SOC 2 compliant. Perfect.", name: "David P.", role: "CISO", stars: 5 }] },
  { icon: Heart, label: "Healthcare", color: "#ec4899", testimonials: [{ quote: "HIPAA-ready out of the box.", name: "Aisha P.", role: "Director", stars: 5 }, { quote: "Cut our admin time 60%.", name: "James W.", role: "CMO", stars: 5 }] },
  { icon: GraduationCap, label: "Education", color: "#10b981", testimonials: [{ quote: "Students love it. So do we.", name: "Lisa T.", role: "Dean", stars: 5 }, { quote: "Adoption was instant.", name: "Michael B.", role: "Provost", stars: 5 }] },
];

export function Testimonials020Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Trusted across industries</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">From startups to enterprises, teams everywhere ship faster.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {VERTICALS.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${v.color}15`, color: v.color }}><v.icon className="h-4 w-4" /></div>
                <span className="text-sm font-bold text-slate-900">{v.label}</span>
              </div>
              <div className="space-y-3">
                {v.testimonials.map((t, j) => (
                  <div key={j} className="rounded-xl bg-white p-3 shadow-sm">
                    <div className="mb-1.5 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
                    <p className="text-xs font-medium text-slate-800">"{t.quote}"</p>
                    <p className="mt-1.5 text-[10px] text-slate-500"><span className="font-semibold text-slate-700">{t.name}</span> · {t.role}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
