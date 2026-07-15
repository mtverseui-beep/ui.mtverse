"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const HOTSPOTS = [{ id: 1, x: 30, y: 40, title: "Smart Inbox", desc: "AI-sorted priorities" }, { id: 2, x: 65, y: 25, title: "Live Stats", desc: "Real-time metrics" }, { id: 3, x: 50, y: 70, title: "Quick Actions", desc: "One-click workflows" }];
export function FeatureHotspotCard() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl"><h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Explore the product.</h2>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10" style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)" }}>
          { }
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Product" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          {HOTSPOTS.map(h => (
            <div key={h.id} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
              <button onClick={() => setActive(active === h.id ? null : h.id)} className="relative flex h-8 w-8 items-center justify-center"><span className="absolute h-8 w-8 animate-ping rounded-full bg-violet-500/30" /><span className="relative h-3 w-3 rounded-full bg-violet-500 ring-2 ring-white/30" /></button>
              <AnimatePresence>{active === h.id && (<motion.div initial={{ opacity: 0, y: 5, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute left-10 top-0 z-10 w-44 rounded-lg border border-white/10 bg-black/90 p-3 backdrop-blur-xl"><p className="text-sm font-bold text-white">{h.title}</p><p className="text-xs text-white/50">{h.desc}</p></motion.div>)}</AnimatePresence>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/40">Click the dots to explore features</p>
      </div>
    </section>
  );
}
