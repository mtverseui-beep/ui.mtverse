"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Pipette } from "lucide-react";

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#64748b", "#0f172a", "#ffffff"];
const neutralFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)]";
const validHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

export function ColorPickerCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[min(100%,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55 }}>
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(236,72,153,.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg border cs-border cs-input"><Pipette className="h-4 w-4 cs-muted" /></span><div><h2 className="text-[14px] font-bold cs-text">Color Picker</h2><p className="text-[10.5px] cs-muted">Keyboard, touch, and clipboard ready</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><SwatchGrid /><HueSlider /><HexInput /></div>
      </div>
    </motion.div>
  );
}

function VariantTitle({ children, value, color }: { children: React.ReactNode; value: string; color: string }) {
  return <div className="mb-3 flex min-w-0 items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">{children}</span><output className="flex min-w-0 items-center gap-1.5"><span aria-hidden className="h-4 w-4 shrink-0 rounded-full border cs-border" style={{ background: color }} /><span className="truncate font-mono text-[10px] font-semibold cs-text">{value}</span></output></div>;
}

function SwatchGrid() {
  const [selected, setSelected] = useState("#3b82f6");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const choose = (index: number) => { setSelected(COLORS[index]); refs.current[index]?.focus(); };
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % COLORS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + COLORS.length) % COLORS.length;
    else if (event.key === "ArrowDown") next = (index + 6) % COLORS.length;
    else if (event.key === "ArrowUp") next = (index - 6 + COLORS.length) % COLORS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = COLORS.length - 1;
    else return;
    event.preventDefault(); choose(next);
  };
  return <fieldset><legend className="sr-only">Preset color swatches</legend><VariantTitle value={selected} color={selected}>1 · Swatch grid</VariantTitle><div role="radiogroup" aria-label="Preset colors" className="grid grid-cols-4 gap-2 xs:grid-cols-6">{COLORS.map((color, index) => <button ref={(node) => { refs.current[index] = node; }} key={color} type="button" role="radio" aria-label={color} aria-checked={selected === color} tabIndex={selected === color ? 0 : -1} onClick={() => setSelected(color)} onKeyDown={(event) => onKeyDown(event, index)} className={`relative flex aspect-square min-h-9 items-center justify-center rounded-lg border-2 ${neutralFocus}`} style={{ background: color, borderColor: selected === color ? "var(--card-text)" : "var(--card-border)" }}>{selected === color && <Check aria-hidden className={`h-4 w-4 ${color === "#ffffff" ? "text-slate-900" : "text-white"}`} strokeWidth={3} />}</button>)}</div></fieldset>;
}

function HueSlider() {
  const id = useId();
  const [hue, setHue] = useState(210);
  const color = `hsl(${hue} 70% 50%)`;
  return <div><VariantTitle value={`${hue}°`} color={color}>2 · Hue slider</VariantTitle><label htmlFor={id} className="sr-only">Hue in degrees</label><input id={id} name="hue" type="range" min={0} max={360} step={1} value={hue} onChange={(event) => setHue(event.currentTarget.valueAsNumber)} aria-valuetext={`${hue} degrees`} className={`h-7 w-full cursor-pointer touch-pan-x appearance-none rounded-full border cs-border accent-slate-600 ${neutralFocus}`} style={{ background: "linear-gradient(90deg,hsl(0 70% 50%),hsl(60 70% 50%),hsl(120 70% 50%),hsl(180 70% 50%),hsl(240 70% 50%),hsl(300 70% 50%),hsl(360 70% 50%))" }} /></div>;
}

function HexInput() {
  const id = useId();
  const errorId = `${id}-error`;
  const statusId = `${id}-status`;
  const [hex, setHex] = useState("#3b82f6");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const valid = validHex(hex);
  const copy = async () => {
    if (!valid) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(hex.toUpperCase());
      setCopyStatus("copied");
    } catch { setCopyStatus("failed"); }
  };
  return (
    <div><span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Hex input</span><div className="flex min-w-0 items-start gap-2"><span aria-hidden className="h-12 w-12 shrink-0 rounded-xl border-2 cs-border" style={{ background: valid ? hex : "var(--card-input-bg)" }} /><div className="min-w-0 flex-1"><label htmlFor={id} className="sr-only">Six-digit hexadecimal color</label><input id={id} name="hex-color" autoComplete="off" autoCapitalize="characters" spellCheck={false} value={hex} onChange={(event) => { setHex(event.target.value); setCopyStatus("idle"); }} onBlur={() => { if (valid) setHex(hex.toUpperCase()); }} maxLength={7} pattern="#[0-9A-Fa-f]{6}" aria-invalid={!valid} aria-describedby={`${!valid ? errorId : ""} ${statusId}`.trim()} className={`w-full rounded-xl border cs-input px-3 py-3 font-mono text-[14px] font-bold cs-text ${neutralFocus} ${valid ? "cs-border" : "border-rose-500"}`} />{!valid && <p id={errorId} role="alert" className="mt-1 text-[9.5px] text-rose-500">Use # followed by exactly six hexadecimal digits.</p>}<p id={statusId} role="status" aria-live="polite" className={`mt-1 text-[9.5px] ${copyStatus === "failed" ? "text-rose-500" : "cs-subtle"}`}>{copyStatus === "copied" ? `${hex.toUpperCase()} copied to clipboard.` : copyStatus === "failed" ? "Could not access the clipboard. Select and copy the value manually." : ""}</p></div><button type="button" onClick={copy} disabled={!valid} aria-label="Copy hex color" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border cs-border cs-input cs-muted transition-colors cs-hover disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none ${neutralFocus}`}>{copyStatus === "copied" ? <Check aria-hidden className="h-4 w-4 text-emerald-500" /> : <Copy aria-hidden className="h-4 w-4" />}</button></div><div className="mt-2.5 flex gap-1.5" aria-label="Hex presets">{COLORS.slice(0, 6).map((color) => <button key={color} type="button" aria-label={`Set color to ${color}`} onClick={() => { setHex(color.toUpperCase()); setCopyStatus("idle"); }} className={`h-7 min-w-0 flex-1 rounded-md border cs-border ${neutralFocus}`} style={{ background: color }} />)}</div></div>
  );
}
