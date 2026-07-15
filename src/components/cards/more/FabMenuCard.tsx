"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PenLine, Share2, Trash2, Download, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// FabMenuCard — expandable floating action button that opens into a radial
// menu of action buttons. Each sub-button springs out with stagger + rotation.
// Backdrop dim + close on outside click.

const ACTIONS = [
  { id: "edit", icon: PenLine, label: "Edit", color: "#2563eb" },
  { id: "share", icon: Share2, label: "Share", color: "#7c3aed" },
  { id: "download", icon: Download, label: "Download", color: "#059669" },
  { id: "delete", icon: Trash2, label: "Delete", color: "#dc2626" },
];

export function FabMenuCard() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleAction = (id: string) => { setSelected(id); setOpen(false); setTimeout(() => setSelected(null), 1500); };

  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Plus className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">FAB Action Menu</h2><p className="text-[10.5px] cs-muted">Radial expand · spring stagger · backdrop dim</p></div>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-8" style={{ minHeight: "260px" }}>
          {/* Backdrop */}
          <AnimatePresence>
            {open && <motion.div className="absolute inset-0 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />}
          </AnimatePresence>

          {/* Selected feedback */}
          <AnimatePresence>
            {selected && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-4 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                {ACTIONS.find(a => a.id === selected)?.label} clicked!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons — spring out radially */}
          <AnimatePresence>
            {open && ACTIONS.map((action, i) => {
              const Icon = action.icon;
              const angle = -90 + (i - (ACTIONS.length - 1) / 2) * 65;
              const rad = (angle * Math.PI) / 180;
              const dist = 80;
              return (
                <motion.button key={action.id} type="button" onClick={() => handleAction(action.id)} className="absolute flex flex-col items-center gap-1 focus-visible:outline-none" initial={{ x: 0, y: 0, opacity: 0, scale: 0 }} animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: 1, scale: 1 }} exit={{ x: 0, y: 0, opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.05 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg" style={{ background: action.color, boxShadow: `0 4px 14px ${action.color}40` }}>
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-[9px] font-semibold cs-text">{action.label}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>

          {/* FAB toggle */}
          <motion.button type="button" onClick={() => setOpen(o => !o)} whileTap={{ scale: 0.9 }} animate={{ rotate: open ? 135 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40">
            <Plus className="h-6 w-6" strokeWidth={2.4} />
          </motion.button>
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Tap + to expand the radial action menu</p></div>
      </div>
    </motion.div>
  );
}
