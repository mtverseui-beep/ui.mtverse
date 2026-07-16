"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, CornerDownLeft, FileText, Folder, Mail, Search, Settings, User, X } from "lucide-react";

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
const inputShell = "flex min-h-11 items-center gap-2 rounded-xl border cs-border cs-input px-3 outline-none transition-shadow focus-within:shadow-[0_0_0_4px_var(--card-border)] motion-reduce:transition-none";

export function SearchBarCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[clamp(300px,95vw,520px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20"><Search className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" strokeWidth={2.2} /></div><div><h2 className="text-[14px] font-bold tracking-tight cs-text">Search Bar</h2><p className="text-[10.5px] cs-muted">Accessible combobox and command overlay patterns</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><SearchCombobox title="1 · Inline Results" placeholder="Search workspace…" /><OverlaySearch /><SearchCombobox title="3 · Recent Suggestions" placeholder="Search or browse recent…" showAllWhenEmpty /><ExpandableSearch /></div>
        <footer className="border-t cs-border px-4 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Arrow keys navigate · Enter selects · Escape closes</p></footer>
      </div>
    </motion.div>
  );
}

function filterResults(query: string, showAllWhenEmpty = false) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return showAllWhenEmpty ? DATA.slice(0, 4) : [];
  return DATA.filter((item) => `${item.label} ${item.category}`.toLowerCase().includes(normalized));
}

function SearchCombobox({ title, placeholder, showAllWhenEmpty = false }: { title: string; placeholder: string; showAllWhenEmpty?: boolean }) {
  const inputId = useId(); const listId = useId();
  const [query, setQuery] = useState(""); const [open, setOpen] = useState(false); const [active, setActive] = useState(0); const [announcement, setAnnouncement] = useState("");
  const results = useMemo(() => filterResults(query, showAllWhenEmpty), [query, showAllWhenEmpty]);
  const choose = (result: Result) => { setQuery(result.label); setOpen(false); setAnnouncement(`${result.label} selected`); };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); setActive((index) => Math.min(index + 1, results.length - 1)); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setOpen(true); setActive((index) => Math.max(index - 1, 0)); }
    else if (event.key === "Enter" && open && results[active]) { event.preventDefault(); choose(results[active]); }
    else if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
  };
  return <section><label htmlFor={inputId} className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">{title}</label><Popover.Root open={open} onOpenChange={setOpen}><Popover.Anchor asChild><div className={inputShell}><Search aria-hidden className="h-4 w-4 shrink-0 cs-subtle" /><input id={inputId} name="workspace-search" type="search" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={listId} aria-activedescendant={open && results[active] ? `${listId}-${results[active].id}` : undefined} autoComplete="off" value={query} onFocus={() => { if (filterResults(query, showAllWhenEmpty).length || query) setOpen(true); }} onChange={(event) => { const next = event.target.value; setQuery(next); setActive(0); setOpen(Boolean(next) || showAllWhenEmpty); }} onKeyDown={onKeyDown} placeholder={placeholder} className="min-w-0 flex-1 appearance-none bg-transparent text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none [&::-webkit-search-cancel-button]:hidden" />{query && <button type="button" onClick={() => { setQuery(""); setActive(0); setOpen(showAllWhenEmpty); }} aria-label="Clear search" className="rounded-md p-1 cs-subtle outline-none cs-hover focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><X aria-hidden className="h-3.5 w-3.5" /></button>}</div></Popover.Anchor>
    <Popover.Portal><Popover.Content onOpenAutoFocus={(event) => event.preventDefault()} sideOffset={6} collisionPadding={12} avoidCollisions className="z-50 max-h-60 w-[var(--radix-popover-anchor-width)] overflow-y-auto rounded-xl border cs-border bg-[var(--card-surface)] p-1 shadow-xl motion-reduce:animate-none" onEscapeKeyDown={() => setOpen(false)}><div id={listId} role="listbox" aria-label="Search results">{results.length ? results.map((result, index) => <ResultOption key={result.id} result={result} id={`${listId}-${result.id}`} active={index === active} selected={query === result.label} query={query} onHover={() => setActive(index)} onChoose={() => choose(result)} />) : <p role="status" className="px-3 py-5 text-center text-[10.5px] cs-subtle">No results for “{query}”</p>}</div></Popover.Content></Popover.Portal></Popover.Root><p className="sr-only" role="status" aria-live="polite">{announcement}</p></section>;
}

function ResultOption({ result, id, active, selected, query, onHover, onChoose }: { result: Result; id: string; active: boolean; selected: boolean; query: string; onHover: () => void; onChoose: () => void }) {
  const Icon = result.icon;
  return <button id={id} type="button" role="option" aria-selected={selected} onPointerMove={onHover} onClick={onChoose} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] outline-none ${active ? "bg-[var(--card-hover)]" : ""}`}><Icon aria-hidden className="h-3.5 w-3.5 shrink-0 cs-subtle" /><span className="min-w-0 flex-1 truncate cs-text"><Highlighted text={result.label} query={query} /></span><span className="rounded bg-[var(--card-input-bg)] px-1.5 py-0.5 text-[8px] font-semibold cs-subtle">{result.category}</span>{active && <CornerDownLeft aria-hidden className="h-3 w-3 text-sky-500" />}</button>;
}

function Highlighted({ text, query }: { text: string; query: string }) {
  const normalized = query.trim(); const index = text.toLowerCase().indexOf(normalized.toLowerCase());
  if (!normalized || index < 0) return text;
  return <>{text.slice(0, index)}<mark className="bg-transparent font-bold text-sky-600 dark:text-sky-400">{text.slice(index, index + normalized.length)}</mark>{text.slice(index + normalized.length)}</>;
}

function OverlaySearch() {
  const inputRef = useRef<HTMLInputElement>(null); const inputId = useId(); const listId = useId();
  const [open, setOpen] = useState(false); const [query, setQuery] = useState(""); const [active, setActive] = useState(0); const [announcement, setAnnouncement] = useState("");
  const results = useMemo(() => filterResults(query, true), [query]);
  const choose = (result: Result) => { setAnnouncement(`${result.label} selected`); setQuery(""); setOpen(false); };
  return <section><h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Command Overlay</h3><Dialog.Root open={open} onOpenChange={(next) => { setOpen(next); if (!next) { setQuery(""); setActive(0); } }}><Dialog.Trigger asChild><motion.button type="button" whileTap={{ scale: 0.98 }} className={`${inputShell} w-full text-[12px] cs-subtle`}><Search aria-hidden className="h-4 w-4" /><span className="flex-1 text-left">Search everything…</span><kbd className="rounded border cs-border px-1.5 py-0.5 text-[9px] cs-subtle">⌘ K</kbd></motion.button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out motion-reduce:animate-none" /><Dialog.Content onOpenAutoFocus={(event) => { event.preventDefault(); inputRef.current?.focus(); }} className="fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border cs-border bg-[var(--card-surface)] shadow-2xl outline-none"><Dialog.Title className="sr-only">Search everything</Dialog.Title><Dialog.Description className="sr-only">Type a query, then use arrow keys and Enter to choose a result.</Dialog.Description><div className="flex items-center gap-2 border-b cs-border px-3 py-3"><Search aria-hidden className="h-4 w-4 cs-subtle" /><label htmlFor={inputId} className="sr-only">Search everything</label><input ref={inputRef} id={inputId} name="command-search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={listId} aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined} autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, results.length - 1)); } else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); } else if (event.key === "Enter" && results[active]) { event.preventDefault(); choose(results[active]); } else if (event.key === "Escape") setOpen(false); }} placeholder="Type to search…" className="min-w-0 flex-1 bg-transparent text-[13px] cs-text placeholder:cs-subtle focus:outline-none" /><Dialog.Close aria-label="Close search" className="rounded-md p-1 cs-muted outline-none cs-hover focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><X aria-hidden className="h-3.5 w-3.5" /></Dialog.Close></div><div id={listId} role="listbox" aria-label="Search results" className="max-h-[min(50vh,300px)] overflow-y-auto p-1.5">{results.length ? results.map((result, index) => <ResultOption key={result.id} result={result} id={`${listId}-${result.id}`} active={index === active} selected={false} query={query} onHover={() => setActive(index)} onChoose={() => choose(result)} />) : <p role="status" className="px-3 py-8 text-center text-[11px] cs-subtle">No results for “{query}”</p>}</div><div className="flex items-center justify-between border-t cs-border px-3 py-2 text-[9px] cs-subtle"><span>↑↓ Navigate · ↵ Select</span><span>Esc Close</span></div></Dialog.Content></Dialog.Portal></Dialog.Root><p className="sr-only" role="status" aria-live="polite">{announcement}</p></section>;
}

function ExpandableSearch() {
  const reduceMotion = useReducedMotion(); const inputId = useId(); const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false); const [query, setQuery] = useState(""); const [announcement, setAnnouncement] = useState("");
  useEffect(() => { if (expanded) inputRef.current?.focus(); }, [expanded]);
  return <section><h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">4 · Compact Search</h3><form role="search" onSubmit={(event) => { event.preventDefault(); if (query.trim()) setAnnouncement(`Searching for ${query.trim()}`); }} className="flex justify-end"><motion.div layout={!reduceMotion} className="flex min-h-11 items-center overflow-hidden rounded-full border cs-border cs-input shadow-sm focus-within:shadow-[0_0_0_4px_var(--card-border)]"><button type="button" aria-label={expanded ? "Collapse search" : "Expand search"} aria-expanded={expanded} aria-controls={inputId} onClick={() => setExpanded((current) => !current)} className="flex h-11 w-11 shrink-0 items-center justify-center cs-muted outline-none cs-hover"><Search aria-hidden className="h-4 w-4" /></button><motion.div initial={false} animate={{ width: expanded ? "min(220px, 58vw)" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><label htmlFor={inputId} className="sr-only">Compact search</label><input ref={inputRef} id={inputId} name="compact-search" type="search" autoComplete="off" tabIndex={expanded ? 0 : -1} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setExpanded(false); setQuery(""); } }} placeholder="Search…" className="w-full bg-transparent pr-2 text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none" /></motion.div>{expanded && query && <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear compact search" className="mr-1 rounded-full p-1.5 cs-muted outline-none cs-hover focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><X aria-hidden className="h-3 w-3" /></button>}</motion.div></form><p className="sr-only" role="status" aria-live="polite">{announcement}</p></section>;
}
