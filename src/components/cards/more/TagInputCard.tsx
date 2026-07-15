"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Tag as TagIcon, GripVertical } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// TagInputCard — 3 unique tag input variants:
// 1. Chips — add/remove tags with spring entrance + exit
// 2. Autocomplete — type to filter suggestions, tab/enter to add
// 3. Drag reorder — drag tags to reorder (visual only, click to demo)

const SUGGESTIONS = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "Rust", "Go", "Vue", "Svelte"];

export function TagInputCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"><TagIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Tag Input</h2><p className="text-[10.5px] cs-muted">Chips · autocomplete · drag reorder — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <ChipsInput />
          <AutocompleteInput />
          <DragReorderInput />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">3 completely different tag input patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Chips — add/remove with spring ──
function ChipsInput() {
  const [tags, setTags] = useState<string[]>(["Design", "Frontend", "UI"]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => { const v = input.trim(); if (v && !tags.includes(v)) { setTags(t => [...t, v]); setInput(""); } };
  const remove = (t: string) => setTags(tags.filter(x => x !== t));

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Chips Input</span>
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border cs-border cs-input p-2 min-h-[40px]" onClick={() => inputRef.current?.focus()}>
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span key={tag} layout initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
              {tag}
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(tag); }} className="flex h-3.5 w-3.5 items-center justify-center rounded-full transition hover:bg-emerald-500/20"><X className="h-2.5 w-2.5" strokeWidth={2.4} /></button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } else if (e.key === "Backspace" && !input && tags.length > 0) { remove(tags[tags.length - 1]); } }} placeholder={tags.length === 0 ? "Type and press Enter..." : ""} className="flex-1 min-w-[80px] bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" />
      </div>
    </div>
  );
}

// ── 2. Autocomplete — type to filter suggestions ──
function AutocompleteInput() {
  const [tags, setTags] = useState<string[]>(["React"]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const filtered = input ? SUGGESTIONS.filter(s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)) : [];

  const add = (tag: string) => { if (!tags.includes(tag)) { setTags(t => [...t, tag]); setInput(""); } };

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Autocomplete</span>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border cs-border cs-input p-2 min-h-[40px]">
          {tags.map(tag => (
            <motion.span key={tag} layout initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-blue-600 dark:text-blue-400">{tag}<button type="button" onClick={() => setTags(t => t.filter(x => x !== tag))} className="hover:text-rose-500"><X className="h-2.5 w-2.5" strokeWidth={2.4} /></button></motion.span>
          ))}
          <input type="text" value={input} onChange={e => { setInput(e.target.value); setActive(0); }} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} onKeyDown={e => { if (e.key === "Enter" || e.key === "Tab") { if (filtered[active]) { e.preventDefault(); add(filtered[active]); } } else if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); } }} placeholder={tags.length === 0 ? "Type to search..." : ""} className="flex-1 min-w-[80px] bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" />
        </div>
        <AnimatePresence>
          {focused && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
              {filtered.map((s, i) => (
                <button key={s} type="button" onMouseEnter={() => setActive(i)} onMouseDown={() => add(s)} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] transition cs-hover" style={{ background: i === active ? "rgba(16,185,129,0.08)" : "transparent" }}>
                  <TagIcon className="h-3 w-3 cs-subtle" strokeWidth={2} /><span className="flex-1 cs-text">{s}</span>{i === active && <span className="text-[8px] font-bold cs-subtle">↵</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── 3. Drag reorder — click to move up/down (visual demo) ──
function DragReorderInput() {
  const [tags, setTags] = useState(["First", "Second", "Third", "Fourth"]);

  const move = (i: number, dir: "up" | "down") => {
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= tags.length) return;
    const next = [...tags]; [next[i], next[j]] = [next[j], next[i]]; setTags(next);
  };

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Reorderable</span>
      <div className="space-y-1.5">
        <AnimatePresence>
          {tags.map((tag, i) => (
            <motion.div key={tag} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.3} className="flex items-center gap-2 rounded-xl border cs-border cs-input p-2">
              <GripVertical className="h-4 w-4 cs-subtle cursor-grab active:cursor-grabbing" strokeWidth={2} />
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-500/10 text-[9px] font-bold text-violet-600 dark:text-violet-400">{i + 1}</span>
              <span className="flex-1 text-[11.5px] font-medium cs-text">{tag}</span>
              <button type="button" onClick={() => move(i, "up")} disabled={i === 0} className="flex h-5 w-5 items-center justify-center rounded cs-muted transition hover:cs-text disabled:opacity-30"><motion.span animate={{ y: -1 }}>↑</motion.span></button>
              <button type="button" onClick={() => move(i, "down")} disabled={i === tags.length - 1} className="flex h-5 w-5 items-center justify-center rounded cs-muted transition hover:cs-text disabled:opacity-30"><motion.span animate={{ y: 1 }}>↓</motion.span></button>
              <button type="button" onClick={() => setTags(t => t.filter((_, idx) => idx !== i))} className="flex h-5 w-5 items-center justify-center rounded cs-muted transition hover:text-rose-500"><X className="h-3 w-3" strokeWidth={2.4} /></button>
            </motion.div>
          ))}
        </AnimatePresence>
        {tags.length === 0 && <p className="py-3 text-center text-[10px] cs-subtle">All tags removed</p>}
      </div>
    </div>
  );
}
