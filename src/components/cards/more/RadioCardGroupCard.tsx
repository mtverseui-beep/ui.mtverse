"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Building2, Star, Heart, Shield, Rocket, Wifi } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// RadioCardGroupCard — 3 redesigned premium variants:
// 1. Plan cards — full-width selectable cards with border glow + checkmark
// 2. Icon tiles — 2x3 grid with color fill + ring + label
// 3. Segmented bar — pill-style with sliding indicator (no text hiding)

export function RadioCardGroupCard() {
  const [plan, setPlan] = useState("pro");
  const [tile, setTile] = useState("star");
  const [seg, setSeg] = useState("monthly");

  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Radio Card Group</h2><p className="text-[10.5px] cs-muted">Plan cards · icon tiles · segmented bar — 3 variants</p></div>
          </div>
        </div>

        <div className="space-y-7 p-5">
          {/* 1. Plan cards */}
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Plan Cards</span>
            <div className="space-y-2">
              {[
                { id: "starter", title: "Starter", desc: "For individuals", price: "$0", icon: Zap, color: "#3b82f6" },
                { id: "pro", title: "Professional", desc: "For growing teams", price: "$29", icon: Crown, color: "#8b5cf6" },
                { id: "enterprise", title: "Enterprise", desc: "For large orgs", price: "Custom", icon: Building2, color: "#059669" },
              ].map(p => {
                const sel = plan === p.id;
                const Icon = p.icon;
                return (
                  <button key={p.id} type="button" onClick={() => setPlan(p.id)} className="relative flex w-full items-center gap-3 overflow-hidden rounded-xl border-2 p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ borderColor: sel ? p.color : "var(--card-border)", background: sel ? `${p.color}06` : "transparent" }}>
                    {/* Glow on selected */}
                    {sel && <motion.div layoutId="plan-glow" className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 20px ${p.color}10` }} transition={{ type: "spring", stiffness: 300, damping: 25 }} />}
                    {/* Checkmark circle */}
                    <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors" style={{ borderColor: sel ? p.color : "var(--card-border)" }}>
                      {sel && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="absolute inset-0.5 flex items-center justify-center rounded-full" style={{ background: p.color }}><Check className="h-2.5 w-2.5 text-white" strokeWidth={4} /></motion.div>}
                    </div>
                    {/* Icon */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${p.color}15` }}><Icon className="h-4 w-4" style={{ color: p.color }} strokeWidth={2.2} /></div>
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between"><p className="text-[12.5px] font-bold cs-text">{p.title}</p><p className="text-[11.5px] font-semibold" style={{ color: p.color }}>{p.price}</p></div>
                      <p className="text-[10px] cs-muted">{p.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Icon tiles */}
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Icon Tiles</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "star", label: "Favorites", icon: Star, color: "#f59e0b" },
                { id: "heart", label: "Liked", icon: Heart, color: "#ec4899" },
                { id: "shield", label: "Secure", icon: Shield, color: "#10b981" },
                { id: "zap", label: "Fast", icon: Zap, color: "#6366f1" },
                { id: "rocket", label: "Launch", icon: Rocket, color: "#8b5cf6" },
                { id: "wifi", label: "Online", icon: Wifi, color: "#0ea5e9" },
              ].map(item => {
                const sel = tile === item.id;
                const Icon = item.icon;
                return (
                  <motion.button key={item.id} type="button" onClick={() => setTile(item.id)} whileTap={{ scale: 0.92 }} className="relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ borderColor: sel ? item.color : "var(--card-border)", background: sel ? `${item.color}10` : "var(--card-input-bg)" }}>
                    {sel && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute -inset-0.5 rounded-xl" style={{ boxShadow: `0 0 12px ${item.color}40` }} />}
                    <Icon className="h-5 w-5 relative z-10" style={{ color: sel ? item.color : "var(--card-text-muted)" }} strokeWidth={2} />
                    <span className="text-[8.5px] font-semibold relative z-10" style={{ color: sel ? item.color : "var(--card-text-muted)" }}>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 3. Segmented bar — fixed width so text never hides */}
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Segmented Bar</span>
            <div className="relative flex gap-1 rounded-xl p-1" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
              {["daily", "weekly", "monthly"].map(opt => {
                const sel = seg === opt;
                return (
                  <button key={opt} type="button" onClick={() => setSeg(opt)} className="relative flex-1 rounded-lg py-2 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ color: sel ? "var(--card-text)" : "var(--card-text-muted)" }}>
                    {sel && <motion.div layoutId="seg-bar-bg" className="absolute inset-0 rounded-lg" style={{ background: "var(--card-surface)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid var(--card-border)" }} transition={{ type: "spring", stiffness: 350, damping: 25 }} />}
                    <span className="relative z-10 capitalize">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Click any option — 3 different selection styles</p></div>
      </div>
    </motion.div>
  );
}
