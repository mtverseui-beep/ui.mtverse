"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Smile, Heart, ThumbsUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMOJI_CATEGORIES: Record<string, string[]> = {
  Smileys: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙"],
  Gestures: ["👍","👎","👌","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","☝️","✋","🤚","🖐️","🖖","👋","🤝","🙏"],
  Hearts: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","♥️"],
  Animals: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🦄","🦋","🐝"],
  Food: ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🥦","🥕","🌽","🌶️"],
  Activities: ["⚽","🏀","🏈","⚾","🎾","🏐","🏉","🎱","🏓","🏸","🥅","🏒","🥍","🏏","🎯","🎮","🎲","🎰","🎳","🏆"],
  Travel: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🏍️","🛵","✈️","🚀","🛸","🚁","⛵"],
  Objects: ["💡","🔦","🕯️","📱","💻","⌨️","🖥️","🖨️","📷","📹","🎥","📺","📻","⏰","⏳","📡","🔋","🔌","🧲","🔑"],
};

export function EmojiPickerCard() {
  const [variant, setVariant] = useState(0);
  return (
    <motion.div className="w-[clamp(320px,95vw,520px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(245,158,11,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20"><Smile className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Emoji Picker</h2><p className="text-[10.5px] cs-muted">Grid · search · recent — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          {/* Variant selector */}
          <div className="flex gap-1 rounded-lg cs-input p-0.5">
            {["Grid", "Search", "Recent"].map((v, i) => (
              <button key={v} type="button" onClick={() => setVariant(i)} className="relative flex-1 rounded-md py-1.5 text-[10px] font-bold transition focus-visible:outline-none" style={{ color: variant === i ? "var(--card-text)" : "var(--card-text-muted)" }}>
                {variant === i && <motion.div layoutId="emoji-tab" className="absolute inset-0 rounded-md cs-surface border cs-border shadow-sm" transition={{ type: "spring", stiffness: 350, damping: 25 }} />}
                <span className="relative z-10">{v}</span>
              </button>
            ))}
          </div>
          {variant === 0 && <GridVariant />}
          {variant === 1 && <SearchVariant />}
          {variant === 2 && <RecentVariant />}
        </div>
        <div className="border-t cs-border px-5 py-2 text-center"><p className="text-[9px] cs-subtle">Click any emoji · 3 picker patterns</p></div>
      </div>
    </motion.div>
  );
}

function GridVariant() {
  const [selected, setSelected] = useState("😀");
  const [cat, setCat] = useState("Smileys");
  const emojis = EMOJI_CATEGORIES[cat];
  return (
    <div>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Category Grid</span>
      {/* Category tabs */}
      <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-modern">
        {Object.keys(EMOJI_CATEGORIES).map(c => (
          <button key={c} type="button" onClick={() => setCat(c)} className="shrink-0 rounded-lg px-2 py-1 text-[9px] font-bold transition" style={{ background: cat === c ? "rgba(245,158,11,0.15)" : "var(--card-input-bg)", color: cat === c ? "#d97706" : "var(--card-text-muted)" }}>{c}</button>
        ))}
      </div>
      {/* Emoji grid */}
      <div className="grid grid-cols-8 gap-0.5 rounded-xl border cs-border cs-input p-2 max-h-[140px] overflow-y-auto scrollbar-modern">
        {emojis.map((e, i) => (
          <motion.button key={`${e}-${i}`} type="button" onClick={() => setSelected(e)} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} className="flex h-7 w-7 items-center justify-center rounded text-[14px] transition" style={{ background: selected === e ? "rgba(245,158,11,0.15)" : "transparent" }}>{e}</motion.button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2"><span className="text-[10px] cs-subtle">Selected:</span><span className="text-[20px]">{selected}</span></div>
    </div>
  );
}

function SearchVariant() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const all = Object.values(EMOJI_CATEGORIES).flat();
  const filtered = query ? all.slice(0, 40) : all.slice(0, 40);
  return (
    <div>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Search Filter</span>
      <div className="mb-2 flex items-center gap-2 rounded-lg border cs-border cs-input px-2.5 py-1.5">
        <Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search emoji..." className="flex-1 bg-transparent text-[11px] cs-text placeholder:cs-subtle focus:outline-none" />
      </div>
      <div className="grid grid-cols-8 gap-0.5 rounded-xl border cs-border cs-input p-2 max-h-[140px] overflow-y-auto scrollbar-modern">
        {filtered.map((e, i) => (
          <motion.button key={`${e}-${i}`} type="button" onClick={() => setSelected(e)} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} className="flex h-7 w-7 items-center justify-center rounded text-[14px]">{e}</motion.button>
        ))}
      </div>
      {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 flex items-center gap-2"><span className="text-[10px] cs-subtle">Picked:</span><span className="text-[20px]">{selected}</span></motion.div>}
    </div>
  );
}

function RecentVariant() {
  const [recent, setRecent] = useState(["❤️","👍","😀","🔥","🎉","✨"]);
  const [all, setAll] = useState(EMOJI_CATEGORIES.Smileys.slice(0, 12));
  const pick = (e: string) => { setRecent(r => [e, ...r.filter(x => x !== e)].slice(0, 8)); };
  return (
    <div>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Recent + Quick Pick</span>
      {/* Recent */}
      <div className="mb-2 flex items-center gap-1.5">
        <Clock className="h-3 w-3 cs-subtle" strokeWidth={2} />
        <div className="flex gap-1">
          {recent.map((e, i) => (
            <motion.button key={`${e}-${i}`} type="button" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="flex h-7 w-7 items-center justify-center rounded-lg cs-input text-[14px]">{e}</motion.button>
          ))}
        </div>
      </div>
      {/* Quick pick */}
      <div className="grid grid-cols-8 gap-0.5 rounded-xl border cs-border cs-input p-2">
        {all.map((e, i) => (
          <motion.button key={`${e}-${i}`} type="button" onClick={() => pick(e)} whileHover={{ scale: 1.3, y: -2 }} whileTap={{ scale: 0.9 }} className="flex h-7 w-7 items-center justify-center rounded text-[14px]">{e}</motion.button>
        ))}
      </div>
      <p className="mt-1.5 text-[9px] cs-subtle">Click to add to recent</p>
    </div>
  );
}
