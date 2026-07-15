"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Pipette } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ColorPickerCard — 3 unique color picker variants:
// 1. Swatch grid — preset color palette with ring selection
// 2. Gradient slider — HSL hue slider with live preview
// 3. Hex input — type hex code with live color preview + copy

export function ColorPickerCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(236,72,153,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 ring-1 ring-pink-500/20"><Pipette className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Color Picker</h2><p className="text-[10.5px] cs-muted">Swatch · hue slider · hex input — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <SwatchGrid />
          <HueSlider />
          <HexInput />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">3 completely different color selection patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Swatch grid — preset palette with ring ──
function SwatchGrid() {
  const COLORS = ["#ef4444","#f97316","#f59e0b","#10b981","#06b6d4","#3b82f6","#6366f1","#8b5cf6","#ec4899","#64748b","#0f172a","#ffffff"];
  const [sel, setSel] = useState("#3b82f6");
  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Swatch Grid</span><span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded-full border cs-border" style={{ background: sel }} /><span className="text-[10px] font-mono font-semibold cs-text">{sel}</span></span></div>
      <div className="grid grid-cols-6 gap-2">
        {COLORS.map(c => (
          <motion.button key={c} type="button" onClick={() => setSel(c)} whileTap={{ scale: 0.85 }} className="relative flex h-9 w-9 items-center justify-center rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40" style={{ background: c, borderColor: sel === c ? "#3b82f6" : "var(--card-border)" }}>
            {sel === c && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><Check className="h-3.5 w-3.5 text-white drop-shadow-lg" strokeWidth={3} /></motion.div>}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── 2. Hue slider — HSL with live preview ──
function HueSlider() {
  const [hue, setHue] = useState(210);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const move = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    setHue(Math.round(Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360))));
  };
  const color = `hsl(${hue}, 70%, 50%)`;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Hue Slider</span><span className="flex items-center gap-1.5"><span className="h-5 w-5 rounded-lg border cs-border" style={{ background: color }} /><span className="text-[10px] font-mono font-semibold cs-text">{color}</span></span></div>
      <div className="relative py-3" onMouseMove={move} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}>
        <div ref={trackRef} className="relative h-4 cursor-pointer rounded-full" style={{ background: "linear-gradient(90deg, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%), hsl(180,70%,50%), hsl(240,70%,50%), hsl(300,70%,50%), hsl(360,70%,50%))" }} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setHue(Math.round(((e.clientX - r.left) / r.width) * 360)); }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${(hue / 360) * 100}%` }}>
            <motion.button type="button" onMouseDown={() => setDragging(true)} whileTap={{ scale: 0.9 }} className="h-6 w-6 rounded-full border-4 border-white shadow-lg" style={{ background: color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Hex input — type hex with live preview + copy ──
function HexInput() {
  const [hex, setHex] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);
  const valid = /^#[0-9a-fA-F]{6}$/.test(hex);

  const handleCopy = () => { navigator.clipboard?.writeText(hex).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {}); };

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Hex Input</span>
      <div className="flex items-center gap-2.5">
        {/* Color preview */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 cs-border" style={{ background: valid ? hex : "var(--card-input-bg)" }}>
          {!valid && <div className="flex h-full w-full items-center justify-center text-[8px] font-bold text-rose-500">!</div>}
        </div>
        {/* Hex input */}
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} maxLength={7} className="flex-1 rounded-xl border cs-border cs-input px-3 py-3 font-mono text-[14px] font-bold cs-text focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30" style={{ borderColor: valid ? "var(--card-border)" : "#ef4444" }} />
        {/* Copy button */}
        <motion.button type="button" onClick={handleCopy} whileTap={{ scale: 0.92 }} disabled={!valid} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ background: copied ? "#10b981" : "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
          {copied ? <Check className="h-4 w-4 text-white" strokeWidth={2.6} /> : <Pipette className="h-4 w-4 cs-muted" strokeWidth={2} />}
        </motion.button>
      </div>
      {/* Preset row */}
      <div className="mt-2.5 flex gap-1.5">
        {["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899"].map(c => (
          <button key={c} type="button" onClick={() => setHex(c)} className="h-6 flex-1 rounded-md border cs-border transition hover:scale-105" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}
