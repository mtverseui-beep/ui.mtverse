"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, FileText, Settings, User, Mail, Calendar, Folder, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Result { id: string; label: string; category: string; icon: typeof FileText; }
const DATA: Result[] = [
  { id: "1", label: "Design Review Notes", category: "Docs", icon: FileText },
  { id: "2", label: "Account Settings", category: "Settings", icon: Settings },
  { id: "3", label: "Sarah Chen", category: "Team", icon: User },
  { id: "4", label: "Inbox — 12 unread", category: "Mail", icon: Mail },
  { id: "5", label: "Q3 Planning", category: "Calendar", icon: Calendar },
  { id: "6", label: "Project Aurora", category: "Folders", icon: Folder },
];

export function SearchBarCard() {
  return (
    <motion.div className="w-[clamp(320px,95vw,520px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20"><Search className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Search Bar</h2><p className="text-[10.5px] cs-muted">Inline · overlay · suggestions — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-8 p-5">
          <InlineSearch />
          <OverlaySearch />
          <SuggestionsSearch />
          <ExpandableSearch />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">4 completely different search patterns</p></div>
      </div>
    </motion.div>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (<>{text.slice(0, idx)}<span className="font-bold text-blue-600 dark:text-blue-400">{text.slice(idx, idx + q.length)}</span>{text.slice(idx + q.length)}</>);
}

// ── 1. Inline — dropdown results below the input ──
function InlineSearch() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const filtered = query ? DATA.filter(d => d.label.toLowerCase().includes(query.toLowerCase()) || d.category.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Inline Dropdown</span></div>
      <div className="relative">
        <div className="flex items-center gap-2 rounded-xl border cs-border cs-input px-3 py-2.5"><Search className="h-4 w-4 cs-subtle" strokeWidth={2} /><input type="text" value={query} onChange={e => { setQuery(e.target.value); setActive(0); }} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} onKeyDown={e => { if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); } else if (e.key === "Enter" && filtered[active]) { setQuery(""); } }} placeholder="Search..." className="flex-1 bg-transparent text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none" />{query && <button onClick={() => setQuery("")} className="text-[9px] font-bold cs-subtle hover:cs-text">Clear</button>}</div>
        <AnimatePresence>
          {focused && query && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1.5 max-h-[180px] w-full overflow-y-auto scrollbar-modern rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
              {filtered.length === 0 ? <p className="py-4 text-center text-[10px] cs-subtle">No results for "{query}"</p> : filtered.map((r, i) => { const Icon = r.icon; return (
                <button key={r.id} type="button" onMouseEnter={() => setActive(i)} onClick={() => setQuery("")} className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] transition ${i === active ? "bg-blue-500/10" : ""}`}>
                  <Icon className="h-3 w-3 cs-subtle" strokeWidth={2} /><span className="flex-1 cs-text">{highlight(r.label, query)}</span><span className="rounded cs-input px-1 py-0.5 text-[8px] font-semibold cs-subtle">{r.category}</span>{i === active && <CornerDownLeft className="h-2.5 w-2.5 text-blue-500" strokeWidth={2.2} />}
                </button> ); })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── 2. Overlay — expands to full overlay on click ──
function OverlaySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = query ? DATA.filter(d => d.label.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Overlay Expand</span></div>
      <motion.button type="button" onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }} whileTap={{ scale: 0.97 }} className="flex w-full items-center gap-2.5 rounded-xl border cs-border cs-input px-3 py-2.5 text-[12px] cs-subtle transition cs-hover">
        <Search className="h-4 w-4" strokeWidth={2} /><span className="flex-1 text-left">Search everything...</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
            <motion.div initial={{ scale: 0.95, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -10 }} className="w-full max-w-[340px] overflow-hidden rounded-xl border cs-border shadow-2xl" style={{ background: "var(--card-surface)" }}>
              <div className="flex items-center gap-2 border-b cs-border px-3 py-2.5"><Search className="h-4 w-4 cs-subtle" strokeWidth={2} /><input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setActive(0); }} onKeyDown={e => { if (e.key === "Escape") setOpen(false); }} placeholder="Type to search..." className="flex-1 bg-transparent text-[13px] cs-text placeholder:cs-subtle focus:outline-none" /><button onClick={() => setOpen(false)} className="flex h-5 w-5 items-center justify-center rounded cs-muted hover:cs-text"><X className="h-3 w-3" strokeWidth={2.4} /></button></div>
              <div className="scrollbar-modern max-h-[200px] overflow-y-auto p-1">
                {filtered.length === 0 && query && <p className="py-4 text-center text-[10px] cs-subtle">No results</p>}
                {filtered.map((r, i) => { const Icon = r.icon; return (
                  <button key={r.id} type="button" onMouseEnter={() => setActive(i)} onClick={() => { setOpen(false); setQuery(""); }} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition ${i === active ? "bg-blue-500/10" : ""}`}>
                    <Icon className="h-3 w-3 cs-subtle" strokeWidth={2} /><span className="flex-1 cs-text">{highlight(r.label, query)}</span>
                  </button> ); })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 3. Suggestions — shows recent/popular when empty ──
function SuggestionsSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const suggestions = ["Settings", "Profile", "Inbox", "Calendar"];
  const filtered = query ? DATA.filter(d => d.label.toLowerCase().includes(query.toLowerCase())) : [];
  const show = focused && (query ? filtered.length > 0 : suggestions.length > 0);

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · With Suggestions</span></div>
      <div className="relative">
        <div className="flex items-center gap-2 rounded-xl border cs-border cs-input px-3 py-2.5" style={{ borderColor: focused ? "#0ea5e9" : "var(--card-border)" }}><Search className="h-4 w-4 cs-subtle" strokeWidth={2} /><input type="text" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} placeholder="Search or see suggestions..." className="flex-1 bg-transparent text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none" /></div>
        <AnimatePresence>
          {show && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
              {!query && <p className="px-3 py-1 text-[8px] font-bold uppercase tracking-wider cs-subtle">Popular</p>}
              {!query && suggestions.map(s => (
                <button key={s} type="button" onMouseDown={() => setQuery(s)} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] cs-muted transition cs-hover"><Search className="h-3 w-3 cs-subtle" strokeWidth={2} />{s}</button>
              ))}
              {query && filtered.map(r => { const Icon = r.icon; return (
                <button key={r.id} type="button" onMouseDown={() => setQuery("")} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] cs-muted transition cs-hover"><Icon className="h-3 w-3 cs-subtle" strokeWidth={2} /><span className="flex-1 cs-text">{highlight(r.label, query)}</span></button> ); })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── 4. Expandable — icon button that expands into a full input on click ──
function ExpandableSearch() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">4 · Expandable Icon</span></div>
      <div className="flex justify-end">
        <motion.div layout className="flex items-center overflow-hidden rounded-full border cs-border cs-surface shadow-sm" style={{ height: "40px" }}>
          <button type="button" onClick={() => { setExpanded(e => !e); if (!expanded) setTimeout(() => inputRef.current?.focus(), 300); }} className="flex h-10 w-10 shrink-0 items-center justify-center transition cs-hover">
            <Search className="h-4 w-4 cs-muted" strokeWidth={2} />
          </button>
          <motion.input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} onBlur={() => { if (!query) setExpanded(false); }} placeholder="Search..." className="bg-transparent text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none" animate={{ width: expanded ? 200 : 0, opacity: expanded ? 1 : 0, paddingRight: expanded ? 12 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ overflow: "hidden", whiteSpace: "nowrap" }} />
          {expanded && query && (
            <motion.button type="button" initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="flex h-10 w-8 shrink-0 items-center justify-center cs-muted transition cs-hover">
              <span className="text-[10px] font-bold">Clear</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
