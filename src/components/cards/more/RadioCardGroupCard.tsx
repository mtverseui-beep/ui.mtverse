"use client";

import { useId, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Check, Crown, Heart, Rocket, Shield, Star, Wifi, Zap } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const focusClass = "outline-none focus-visible:shadow-[0_0_0_4px_var(--card-border)] motion-reduce:transition-none";
const PLANS = [
  { id: "starter", title: "Starter", desc: "For individuals", price: "$0", icon: Zap, color: "#3b82f6" },
  { id: "pro", title: "Professional", desc: "For growing teams", price: "$29", icon: Crown, color: "#8b5cf6" },
  { id: "enterprise", title: "Enterprise", desc: "For large orgs", price: "Custom", icon: Building2, color: "#059669" },
];
const TILES = [
  { id: "star", label: "Favorites", icon: Star, color: "#f59e0b" },
  { id: "heart", label: "Liked", icon: Heart, color: "#ec4899" },
  { id: "shield", label: "Secure", icon: Shield, color: "#10b981" },
  { id: "zap", label: "Fast", icon: Zap, color: "#6366f1" },
  { id: "rocket", label: "Launch", icon: Rocket, color: "#8b5cf6" },
  { id: "wifi", label: "Online", icon: Wifi, color: "#0ea5e9" },
];

export function RadioCardGroupCard() {
  const reduceMotion = useReducedMotion();
  const [plan, setPlan] = useState("pro");
  const [tile, setTile] = useState("star");
  const [period, setPeriod] = useState("monthly");
  return (
    <motion.div className="relative w-[clamp(300px,92vw,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div><div><h2 className="text-[14px] font-bold tracking-tight cs-text">Radio Card Group</h2><p className="text-[10.5px] cs-muted">Arrow-key navigable single-choice groups</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><PlanGroup value={plan} onChange={setPlan} /><TileGroup value={tile} onChange={setTile} /><PeriodGroup value={period} onChange={setPeriod} /></div>
        <footer className="border-t cs-border px-4 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Tab to a group · use arrow keys to change selection</p></footer>
      </div>
    </motion.div>
  );
}

function PlanGroup({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const labelId = useId();
  return <section><h3 id={labelId} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Plan Cards</h3><RadioGroup.Root name="subscription-plan" value={value} onValueChange={onChange} aria-labelledby={labelId} className="space-y-2">
    {PLANS.map((plan) => { const selected = value === plan.id; const Icon = plan.icon; return <RadioGroup.Item key={plan.id} value={plan.id} className={`relative flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors ${focusClass}`} style={{ borderColor: selected ? plan.color : "var(--card-border)", background: selected ? `${plan.color}0d` : "var(--card-surface)" }}>
      <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: selected ? plan.color : "var(--card-border)" }}><RadioGroup.Indicator className="h-2.5 w-2.5 rounded-full" style={{ background: plan.color }} /></span>
      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${plan.color}18` }}><Icon className="h-4 w-4" style={{ color: plan.color }} /></span>
      <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="text-[12.5px] font-bold cs-text">{plan.title}</span><span className="text-[11.5px] font-semibold" style={{ color: plan.color }}>{plan.price}</span></span><span className="block text-[10px] cs-muted">{plan.desc}</span></span>
    </RadioGroup.Item>; })}
  </RadioGroup.Root></section>;
}

function TileGroup({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const labelId = useId();
  return <section><h3 id={labelId} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Icon Tiles</h3><RadioGroup.Root name="workspace-view" value={value} onValueChange={onChange} aria-labelledby={labelId} className="grid grid-cols-2 gap-2 min-[360px]:grid-cols-3">
    {TILES.map((tile) => { const selected = value === tile.id; const Icon = tile.icon; return <RadioGroup.Item key={tile.id} value={tile.id} className={`relative flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-2 transition-colors ${focusClass}`} style={{ borderColor: selected ? tile.color : "var(--card-border)", background: selected ? `${tile.color}12` : "var(--card-input-bg)" }}>
      <Icon aria-hidden className="h-5 w-5" style={{ color: selected ? tile.color : "var(--card-text-muted)" }} /><span className="text-[9px] font-semibold" style={{ color: selected ? tile.color : "var(--card-text-muted)" }}>{tile.label}</span><RadioGroup.Indicator className="sr-only">Selected</RadioGroup.Indicator>
    </RadioGroup.Item>; })}
  </RadioGroup.Root></section>;
}

function PeriodGroup({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const labelId = useId();
  return <section><h3 id={labelId} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Billing Period</h3><RadioGroup.Root name="billing-period" value={value} onValueChange={onChange} aria-labelledby={labelId} className="grid grid-cols-3 gap-1 rounded-xl border cs-border cs-input p-1">
    {["daily", "weekly", "monthly"].map((period) => { const selected = value === period; return <RadioGroup.Item key={period} value={period} className={`rounded-lg px-1 py-2 text-[11px] font-semibold capitalize transition-colors ${focusClass} ${selected ? "cs-surface cs-text shadow-sm" : "cs-muted cs-hover"}`}><RadioGroup.Indicator className="sr-only">Selected</RadioGroup.Indicator>{period}</RadioGroup.Item>; })}
  </RadioGroup.Root></section>;
}
