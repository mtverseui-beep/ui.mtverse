"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// FilterChipCard — 3 unique chip/filter interactions:
// 1. Removable chips — click X to remove with exit animation
// 2. Toggle chips — click to activate/deactivate with color shift
// 3. Add chip input — type + enter to add new chips with spring entrance

const INITIAL_CHIPS = ["React", "Next.js", "Tailwind", "TypeScript"];
const TOGGLE_CHIPS = ["Frontend", "Backend", "Full-stack", "DevOps", "Design"];
const COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626"];

export function FilterChipCard() {
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ "Frontend": true });
  const [input, setInput] = useState("");
  const [added, setAdded] = useState<string[]>(["Vue", "Svelte"]);

  const removeChip = (chip: string) => setChips(c => c.filter(x => x !== chip));
  const toggleChip = (chip: string) => setToggles(t => ({ ...t, [chip]: !t[chip] }));
  const addChip = () => {
    const val = input.trim();
    if (val && !added.includes(val)) { setAdded(a => [...a, val]); setInput(""); }
  };

  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Filter Chips</h2><p className="text-[10.5px] cs-muted">Removable · toggle · add input</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          {/* 1. Removable chips */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Removable Chips</label>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {chips.map(chip => (
                  <motion.span key={chip} layout initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }} className="flex items-center gap-1.5 rounded-full border cs-border cs-input py-1 pl-3 pr-1.5 text-[11.5px] font-medium cs-text">
                    {chip}
                    <button type="button" onClick={() => removeChip(chip)} aria-label={`Remove ${chip}`} className="flex h-4 w-4 items-center justify-center rounded-full cs-muted transition hover:bg-rose-500/20 hover:text-rose-500"><X className="h-3 w-3" strokeWidth={2.4} /></button>
                  </motion.span>
                ))}
              </AnimatePresence>
              {chips.length === 0 && <span className="text-[11px] cs-subtle">All removed — refresh to reset</span>}
            </div>
          </div>

          {/* 2. Toggle chips */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Toggle Chips</label>
            <div className="flex flex-wrap gap-2">
              {TOGGLE_CHIPS.map((chip, i) => {
                const active = !!toggles[chip];
                const color = COLORS[i % COLORS.length];
                return (
                  <motion.button key={chip} type="button" onClick={() => toggleChip(chip)} whileTap={{ scale: 0.92 }} className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ background: active ? color : "var(--card-input-bg)", color: active ? "#fff" : "var(--card-text-muted)", border: `1px solid ${active ? color : "var(--card-border)"}` }}>
                    <span className="flex items-center gap-1">{active && <Check className="h-3 w-3" strokeWidth={3} />}{chip}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 3. Add chip input */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Add Chip Input</label>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {added.map(chip => (
                  <motion.span key={chip} layout initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="flex items-center gap-1.5 rounded-full bg-blue-600 py-1 pl-3 pr-1.5 text-[11.5px] font-medium text-white">
                    {chip}
                    <button type="button" onClick={() => setAdded(a => a.filter(x => x !== chip))} aria-label={`Remove ${chip}`} className="flex h-4 w-4 items-center justify-center rounded-full transition hover:bg-white/20"><X className="h-3 w-3" strokeWidth={2.4} /></button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addChip(); } }} placeholder="Type & press Enter" className="cs-input w-full rounded-lg border cs-border px-3 py-1.5 text-[12px] cs-text placeholder:cs-subtle focus:border-blue-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400/30" />
              <motion.button type="button" onClick={addChip} whileTap={{ scale: 0.92 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"><Plus className="h-4 w-4" strokeWidth={2.4} /></motion.button>
            </div>
          </div>
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Remove chips · toggle active · type to add new</p></div>
      </div>
    </motion.div>
  );
}
