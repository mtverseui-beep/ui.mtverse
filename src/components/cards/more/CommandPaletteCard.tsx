"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, FileText, Settings, User, Mail, Calendar, Folder, Command, LayoutGrid, List } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Cmd { id: string; label: string; category: string; icon: typeof FileText; }
const COMMANDS: Cmd[] = [
  { id: "new-file", label: "Create New File", category: "Actions", icon: FileText },
  { id: "new-project", label: "New Project", category: "Actions", icon: Folder },
  { id: "settings", label: "Open Settings", category: "Navigation", icon: Settings },
  { id: "profile", label: "View Profile", category: "Navigation", icon: User },
  { id: "inbox", label: "Go to Inbox", category: "Navigation", icon: Mail },
  { id: "calendar", label: "Open Calendar", category: "Navigation", icon: Calendar },
];

export function CommandPaletteCard() {
  return (
    <motion.div className="w-[clamp(320px,95vw,520px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Command className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Command Palette</h2><p className="text-[10.5px] cs-muted">List · grid · compact — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-8 p-5">
          <ListViewPalette />
          <GridViewPalette />
          <CompactBarPalette />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Click any to open · type to filter · keyboard nav</p></div>
      </div>
    </motion.div>
  );
}

function useFiltered(query: string) {
  return query ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())) : COMMANDS;
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (<>{text.slice(0, idx)}<span className="font-bold text-blue-600 dark:text-blue-400">{text.slice(idx, idx + q.length)}</span>{text.slice(idx + q.length)}</>);
}

// ── 1. List view — grouped list with category headers ──
function ListViewPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useFiltered(query);
  const grouped = new Map<string, Cmd[]>();
  for (const c of filtered) { const arr = grouped.get(c.category) || []; arr.push(c); grouped.set(c.category, arr); }
  const flat = Array.from(grouped.values()).flat();

  useEffect(() => { if (open) { setActive(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);
  useEffect(() => { setActive(0); }, [query]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { setOpen(false); setQuery(""); }
    else if (e.key === "Escape") { setOpen(false); setQuery(""); }
  };

  let idx = -1;
  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><List className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · List View</span></div>
      {!open ? (
        <motion.button type="button" onClick={() => setOpen(true)} whileTap={{ scale: 0.97 }} className="flex w-full items-center gap-2.5 rounded-xl border cs-border cs-input px-3 py-2.5 text-[12px] cs-subtle transition cs-hover">
          <Search className="h-4 w-4" strokeWidth={2} /><span className="flex-1 text-left">Search commands...</span><kbd className="rounded border cs-border px-1 py-0.5 text-[8px] font-bold cs-subtle">⌘K</kbd>
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
          <div className="flex items-center gap-2 border-b cs-border px-3 py-2"><Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={onKey} placeholder="Type..." className="flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" /><button onClick={() => { setOpen(false); setQuery(""); }} className="rounded border cs-border px-1 py-0.5 text-[8px] font-bold cs-subtle">ESC</button></div>
          <div className="scrollbar-modern max-h-[160px] overflow-y-auto p-1">
            {flat.length === 0 && <p className="py-4 text-center text-[10px] cs-subtle">No results</p>}
            {Array.from(grouped.entries()).map(([cat, items]) => (
              <div key={cat}><p className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider cs-subtle">{cat}</p>
                {items.map(cmd => { idx++; const isA = idx === active; const Icon = cmd.icon; return (
                  <button key={cmd.id} type="button" onMouseEnter={() => setActive(idx)} onClick={() => { setOpen(false); setQuery(""); }} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] transition ${isA ? "bg-blue-500/10 cs-text" : "cs-muted"}`}>
                    <Icon className={`h-3 w-3 ${isA ? "text-blue-500" : "cs-subtle"}`} strokeWidth={2} /><span className="flex-1">{highlight(cmd.label, query)}</span>{isA && <CornerDownLeft className="h-2.5 w-2.5 text-blue-500" strokeWidth={2.2} />}
                  </button> ); })}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── 2. Grid view — icon cards instead of list ──
function GridViewPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useFiltered(query);

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><LayoutGrid className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Grid View</span></div>
      {!open ? (
        <motion.button type="button" onClick={() => setOpen(true)} whileTap={{ scale: 0.97 }} className="flex w-full items-center gap-2.5 rounded-xl border cs-border cs-input px-3 py-2.5 text-[12px] cs-subtle transition cs-hover">
          <LayoutGrid className="h-4 w-4" strokeWidth={2} /><span className="flex-1 text-left">Browse commands...</span>
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
          <div className="flex items-center gap-2 border-b cs-border px-3 py-2"><Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter..." autoFocus className="flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" /><button onClick={() => { setOpen(false); setQuery(""); }} className="text-[10px] cs-subtle hover:cs-text">Close</button></div>
          <div className="grid grid-cols-3 gap-1.5 p-2">
            {filtered.length === 0 && <p className="col-span-3 py-4 text-center text-[10px] cs-subtle">No results</p>}
            {filtered.map(cmd => { const Icon = cmd.icon; return (
              <motion.button key={cmd.id} type="button" onClick={() => { setOpen(false); setQuery(""); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-1.5 rounded-lg border cs-border cs-input p-2.5 transition cs-hover">
                <Icon className="h-4 w-4 text-blue-500" strokeWidth={2} /><span className="text-[8.5px] font-medium cs-text text-center leading-tight">{highlight(cmd.label, query)}</span>
              </motion.button> ); })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── 3. Compact bar — always visible inline search ──
function CompactBarPalette() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const filtered = useFiltered(query);

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Compact Inline</span></div>
      <div className="relative">
        <div className="flex items-center gap-2 rounded-xl border cs-border cs-input px-3 py-2"><Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><input value={query} onChange={e => { setQuery(e.target.value); setActive(0); }} onKeyDown={e => { if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); } }} placeholder="Quick find..." className="flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" />{query && <button onClick={() => setQuery("")} className="text-[9px] font-bold cs-subtle hover:cs-text">Clear</button>}</div>
        <AnimatePresence>
          {query && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border cs-border shadow-lg" style={{ background: "var(--card-surface)" }}>
              <div className="p-1">
                {filtered.map((cmd, i) => { const Icon = cmd.icon; return (
                  <button key={cmd.id} type="button" onMouseEnter={() => setActive(i)} onClick={() => setQuery("")} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] transition ${i === active ? "bg-blue-500/10 cs-text" : "cs-muted"}`}>
                    <Icon className="h-3 w-3 cs-subtle" strokeWidth={2} /><span className="flex-1">{highlight(cmd.label, query)}</span>
                  </button> ); })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
