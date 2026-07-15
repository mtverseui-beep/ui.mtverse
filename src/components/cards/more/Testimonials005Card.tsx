"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Testimonials005 — Masonry Pinterest-style staggered columns
// Light bg + CSS columns masonry + Unsplash avatars + hover lift + star ratings.
const TESTIMONIALS = [
  { quote: "Absolutely transformed our workflow. We ship 3x faster now.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "photo-1494790108377-be9c29b29330", stars: 5, company: "TechFlow" },
  { quote: "The best investment we've made this year. ROI was immediate.", name: "Marcus Johnson", role: "VP Engineering, Scale", avatar: "photo-1507003211169-0a1dd7228f2d", stars: 5, company: "Scale" },
  { quote: "Deploy time went from hours to minutes. Genuinely a game-changer for our team. The onboarding was smooth and the support team helped us every step of the way.", name: "Emily Rodriguez", role: "Lead Dev, Nexus", avatar: "photo-1438761681033-6461ffad8d80", stars: 5, company: "Nexus" },
  { quote: "Finally, a tool that delivers on its promises.", name: "David Park", role: "IT Manager", avatar: "photo-1472099645785-5658abf4ff4e", stars: 4, company: "Apex" },
  { quote: "Our team productivity improved dramatically. The interface is intuitive and the features are powerful. Couldn't be happier with the switch.", name: "Aisha Patel", role: "Customer Success", avatar: "photo-1534528741775-53994a69daeb", stars: 5, company: "Quantum" },
  { quote: "Seamless integration with our existing stack.", name: "James Wilson", role: "CEO, Quantum", avatar: "photo-1500648767791-00dcc994a43e", stars: 5, company: "Quantum" },
  { quote: "The customizable interface made team onboarding effortless. We had everyone up and running in under a day, which is unheard of for tools in this category.", name: "Lisa Thompson", role: "Project Manager", avatar: "photo-1517841905240-472988babdf9", stars: 5, company: "Velocity" },
  { quote: "Robust features and quick support. Highly recommend.", name: "Michael Brown", role: "Business Analyst", avatar: "photo-1506794778202-cad84cf45f1d", stars: 5, company: "Innovate" },
  { quote: "We've tried every tool on the market. Nothing comes close to the polish and attention to detail here. It's clear the team cares deeply about the product.", name: "Rachel Kim", role: "Marketing Director", avatar: "photo-1544005313-94ddf0286df2", stars: 5, company: "NextGen" },
];

export function Testimonials005Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Testimonials</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Loved by teams worldwide</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">Real stories from real customers using our platform every day.</p>
        </div>
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="h-6 w-6 text-amber-400" />
              <div className="mt-3 flex text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&crop=face`} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
