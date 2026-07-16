"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Search, Smile } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-text-muted)]";
type Category = "Smileys" | "Gestures" | "Hearts" | "Animals" | "Food" | "Activities" | "Travel" | "Objects";
type EmojiItem = { emoji: string; name: string; category: Category; keywords: string[] };
const emoji = (emojiValue: string, name: string, category: Category, ...keywords: string[]): EmojiItem => ({ emoji: emojiValue, name, category, keywords });

const EMOJIS: EmojiItem[] = [
  emoji("😀", "grinning face", "Smileys", "happy", "smile"),
  emoji("😂", "face with tears of joy", "Smileys", "laugh", "funny"),
  emoji("😊", "smiling face with smiling eyes", "Smileys", "happy", "blush"),
  emoji("😍", "smiling face with heart eyes", "Smileys", "love", "crush"),
  emoji("🤔", "thinking face", "Smileys", "question", "hmm"),
  emoji("😎", "smiling face with sunglasses", "Smileys", "cool", "summer"),
  emoji("🥳", "partying face", "Smileys", "celebrate", "birthday"),
  emoji("😢", "crying face", "Smileys", "sad", "tear"),
  emoji("👍", "thumbs up", "Gestures", "approve", "yes", "like"),
  emoji("👎", "thumbs down", "Gestures", "disapprove", "no"),
  emoji("👋", "waving hand", "Gestures", "hello", "goodbye"),
  emoji("👏", "clapping hands", "Gestures", "applause", "congrats"),
  emoji("🙏", "folded hands", "Gestures", "please", "thanks", "pray"),
  emoji("✌️", "victory hand", "Gestures", "peace", "two"),
  emoji("🤝", "handshake", "Gestures", "agreement", "deal"),
  emoji("💪", "flexed biceps", "Gestures", "strong", "muscle"),
  emoji("❤️", "red heart", "Hearts", "love", "favorite"),
  emoji("🧡", "orange heart", "Hearts", "love", "warm"),
  emoji("💛", "yellow heart", "Hearts", "love", "friendship"),
  emoji("💚", "green heart", "Hearts", "love", "nature"),
  emoji("💙", "blue heart", "Hearts", "love", "trust"),
  emoji("💜", "purple heart", "Hearts", "love", "care"),
  emoji("💔", "broken heart", "Hearts", "sad", "breakup"),
  emoji("💖", "sparkling heart", "Hearts", "love", "sparkle"),
  emoji("🐶", "dog face", "Animals", "pet", "puppy"),
  emoji("🐱", "cat face", "Animals", "pet", "kitten"),
  emoji("🦊", "fox", "Animals", "animal", "clever"),
  emoji("🐼", "panda", "Animals", "bear", "animal"),
  emoji("🦁", "lion", "Animals", "animal", "king"),
  emoji("🐸", "frog", "Animals", "animal", "green"),
  emoji("🦋", "butterfly", "Animals", "insect", "nature"),
  emoji("🐝", "honeybee", "Animals", "insect", "honey"),
  emoji("🍎", "red apple", "Food", "fruit", "healthy"),
  emoji("🍕", "pizza", "Food", "slice", "cheese"),
  emoji("🍔", "hamburger", "Food", "burger", "fast food"),
  emoji("🌮", "taco", "Food", "mexican", "meal"),
  emoji("🍣", "sushi", "Food", "japanese", "fish"),
  emoji("🍰", "shortcake", "Food", "cake", "dessert"),
  emoji("☕", "hot beverage", "Food", "coffee", "tea"),
  emoji("🎂", "birthday cake", "Food", "celebrate", "dessert"),
  emoji("⚽", "soccer ball", "Activities", "football", "sport"),
  emoji("🏀", "basketball", "Activities", "ball", "sport"),
  emoji("🎮", "video game controller", "Activities", "gaming", "play"),
  emoji("🎨", "artist palette", "Activities", "paint", "creative"),
  emoji("🎸", "guitar", "Activities", "music", "instrument"),
  emoji("🏆", "trophy", "Activities", "winner", "award"),
  emoji("🎯", "bullseye", "Activities", "target", "goal"),
  emoji("🎉", "party popper", "Activities", "celebrate", "confetti"),
  emoji("🚗", "automobile", "Travel", "car", "drive"),
  emoji("✈️", "airplane", "Travel", "flight", "trip"),
  emoji("🚀", "rocket", "Travel", "space", "launch"),
  emoji("🚲", "bicycle", "Travel", "bike", "cycle"),
  emoji("🚆", "train", "Travel", "rail", "transport"),
  emoji("⛵", "sailboat", "Travel", "boat", "sea"),
  emoji("🏖️", "beach with umbrella", "Travel", "vacation", "summer"),
  emoji("🗺️", "world map", "Travel", "navigate", "trip"),
  emoji("💡", "light bulb", "Objects", "idea", "light"),
  emoji("📱", "mobile phone", "Objects", "device", "call"),
  emoji("💻", "laptop", "Objects", "computer", "work"),
  emoji("📷", "camera", "Objects", "photo", "picture"),
  emoji("🎁", "wrapped gift", "Objects", "present", "birthday"),
  emoji("🔑", "key", "Objects", "lock", "access"),
  emoji("✨", "sparkles", "Objects", "shine", "magic"),
  emoji("🔥", "fire", "Objects", "hot", "lit"),
];

const CATEGORIES: Category[] = ["Smileys", "Gestures", "Hearts", "Animals", "Food", "Activities", "Travel", "Objects"];

export function EmojiPickerCard() {
  const reduceMotion = useReducedMotion();
  const [variant, setVariant] = useState<"grid" | "search" | "recent">("grid");
  const [selected, setSelected] = useState<EmojiItem>(EMOJIS[0]);
  const [recentIds, setRecentIds] = useState(["red heart", "thumbs up", "grinning face", "fire", "party popper", "sparkles"]);
  const selectEmoji = (item: EmojiItem) => { setSelected(item); setRecentIds(items => [item.name, ...items.filter(name => name !== item.name)].slice(0, 8)); };
  return (
    <motion.section aria-labelledby="emoji-title" className="relative w-[min(100%,32.5rem)] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-amber-500/[0.06] blur-3xl" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20"><Smile aria-hidden className="h-4 w-4 text-amber-600 dark:text-amber-400" /></div><div><h2 id="emoji-title" className="text-sm font-bold cs-text">Emoji Picker</h2><p className="text-[10.5px] cs-muted">Named search · categories · recent picks</p></div></div></header>
        <div className="p-4 sm:p-5">
          <div role="tablist" aria-label="Emoji picker view" className="mb-4 flex rounded-lg cs-input p-0.5">{(["grid", "search", "recent"] as const).map(tab => <button id={`emoji-tab-${tab}`} role="tab" aria-selected={variant === tab} aria-controls={`emoji-panel-${tab}`} key={tab} type="button" onClick={() => setVariant(tab)} className={`flex-1 rounded-md py-1.5 text-[10px] font-bold capitalize ${FOCUS}`} style={{ background: variant === tab ? "var(--card-surface)" : "transparent", color: variant === tab ? "var(--card-text)" : "var(--card-text-muted)", boxShadow: variant === tab ? "0 1px 3px rgba(0,0,0,.08)" : "none" }}>{tab}</button>)}</div>
          {variant === "grid" && <GridVariant selected={selected} onSelect={selectEmoji} />}
          {variant === "search" && <SearchVariant selected={selected} onSelect={selectEmoji} />}
          {variant === "recent" && <RecentVariant selected={selected} recentIds={recentIds} onSelect={selectEmoji} />}
          <SelectionFeedback selected={selected} />
        </div>
      </div>
    </motion.section>
  );
}

type PickerProps = { selected: EmojiItem; onSelect: (item: EmojiItem) => void };

function GridVariant({ selected, onSelect }: PickerProps) {
  const [category, setCategory] = useState<Category>("Smileys");
  const items = EMOJIS.filter(item => item.category === category);
  return (
    <section id="emoji-panel-grid" role="tabpanel" aria-labelledby="emoji-tab-grid">
      <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">Category Grid</h3>
      <div className="mb-2 flex gap-1 overflow-x-auto pb-1 scrollbar-modern" aria-label="Emoji categories">{CATEGORIES.map(value => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`shrink-0 rounded-lg border cs-border px-2 py-1 text-[9px] font-bold cs-hover ${FOCUS}`} style={{ background: category === value ? "var(--card-text)" : "var(--card-input-bg)", color: category === value ? "var(--card-surface)" : "var(--card-text-muted)" }}>{value}</button>)}</div>
      <EmojiGrid items={items} selected={selected} onSelect={onSelect} label={`${category} emoji`} />
    </section>
  );
}

function SearchVariant({ selected, onSelect }: PickerProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return EMOJIS;
    return EMOJIS.filter(item => { const searchable = `${item.name} ${item.category} ${item.keywords.join(" ")}`.toLowerCase(); return terms.every(term => searchable.includes(term)); });
  }, [query]);
  return (
    <section id="emoji-panel-search" role="tabpanel" aria-labelledby="emoji-tab-search">
      <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">Search by name</h3>
      <label className="mb-2 flex items-center gap-2 rounded-lg border cs-border cs-input px-2.5 py-2 focus-within:ring-1 focus-within:ring-[var(--card-text-muted)]"><Search aria-hidden className="h-3.5 w-3.5 cs-subtle" /><span className="sr-only">Search emoji by name or keyword</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try “happy”, “food”, or “travel”" className="min-w-0 flex-1 bg-transparent text-[11px] cs-text placeholder:cs-subtle focus:outline-none" /></label>
      {filtered.length ? <EmojiGrid items={filtered} selected={selected} onSelect={onSelect} label="Emoji search results" /> : <div role="status" className="rounded-xl border cs-border cs-input px-3 py-8 text-center"><p className="text-[11px] font-semibold cs-text">No emoji found</p><p className="mt-1 text-[9px] cs-muted">Try a broader name or keyword.</p></div>}
      <p className="mt-1.5 text-[9px] cs-subtle" aria-live="polite">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
    </section>
  );
}

function RecentVariant({ selected, recentIds, onSelect }: PickerProps & { recentIds: string[] }) {
  const recent = recentIds.map(name => EMOJIS.find(item => item.name === name)).filter((item): item is EmojiItem => Boolean(item));
  const suggestions = EMOJIS.filter(item => !recentIds.includes(item.name)).slice(0, 16);
  return (
    <section id="emoji-panel-recent" role="tabpanel" aria-labelledby="emoji-tab-recent">
      <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider cs-subtle"><Clock aria-hidden className="h-3 w-3" />Recently used</h3>
      <EmojiGrid items={recent} selected={selected} onSelect={onSelect} label="Recently used emoji" compact />
      <h4 className="mb-2 mt-3 text-[9px] font-bold uppercase tracking-wider cs-subtle">Quick picks</h4>
      <EmojiGrid items={suggestions} selected={selected} onSelect={onSelect} label="Suggested emoji" />
    </section>
  );
}

function EmojiGrid({ items, selected, onSelect, label, compact = false }: PickerProps & { items: EmojiItem[]; label: string; compact?: boolean }) {
  return <div role="list" aria-label={label} className={`grid grid-cols-6 gap-1 rounded-xl border cs-border cs-input p-2 sm:grid-cols-8 ${compact ? "max-h-none" : "max-h-40 overflow-y-auto scrollbar-modern"}`}>{items.map(item => <div role="listitem" key={item.name}><button type="button" onClick={() => onSelect(item)} aria-label={item.name} aria-pressed={selected.name === item.name} title={item.name} className={`flex h-9 w-full items-center justify-center rounded-md text-base cs-hover motion-reduce:transition-none ${FOCUS}`} style={{ background: selected.name === item.name ? "color-mix(in srgb, var(--card-text) 12%, transparent)" : "transparent" }}>{item.emoji}</button></div>)}</div>;
}

function SelectionFeedback({ selected }: { selected: EmojiItem }) {
  return <div className="mt-3 flex min-w-0 items-center gap-2 rounded-xl border cs-border cs-input px-3 py-2" aria-live="polite"><span className="text-2xl" aria-hidden>{selected.emoji}</span><span className="min-w-0"><span className="block truncate text-[10.5px] font-semibold capitalize cs-text">{selected.name}</span><span className="block text-[9px] cs-muted">Selected from {selected.category}</span></span></div>;
}
