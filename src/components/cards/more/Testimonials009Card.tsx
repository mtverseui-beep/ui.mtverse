"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";

// Testimonials009 — Video testimonial cards with play buttons + Unsplash thumbnails
const VIDEOS = [
  { name: "Sarah Chen", role: "CTO, TechFlow", thumb: "photo-1494790108377-be9c29b29330", quote: "How we shipped 3x faster", duration: "2:34" },
  { name: "Marcus Johnson", role: "VP Eng, Scale", thumb: "photo-1507003211169-0a1dd7228f2d", quote: "The ROI was immediate", duration: "1:48" },
  { name: "Emily Rodriguez", role: "Lead Dev, Nexus", thumb: "photo-1438761681033-6461ffad8d80", quote: "From hours to minutes", duration: "3:12" },
];

export function Testimonials009Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300">Video Stories</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Hear it from them.</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-white/50">Real customers, real results, in their own words.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -6 }} className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-video overflow-hidden">
                <img src={`https://images.unsplash.com/${v.thumb}?w=600&h=340&fit=crop&crop=face`} alt={v.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all group-hover:scale-110 group-hover:bg-white/30">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{v.duration}</span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex text-amber-400">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />)}</div>
                <p className="text-base font-semibold text-white">"{v.quote}"</p>
                <div className="mt-3 flex items-center gap-2">
                  <p className="text-sm font-medium text-white/80">{v.name}</p>
                  <span className="text-white/30">·</span>
                  <p className="text-xs text-white/50">{v.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
