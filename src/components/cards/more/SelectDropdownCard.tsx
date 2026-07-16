"use client";

import { useId, useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Check, ChevronDown, Globe, Plus, Search, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
type Option = { id: string; label: string; category: string; flag: string };
const OPTIONS: Option[] = [
  { id: "us", label: "United States", category: "Americas", flag: "🇺🇸" }, { id: "ca", label: "Canada", category: "Americas", flag: "🇨🇦" },
  { id: "br", label: "Brazil", category: "Americas", flag: "🇧🇷" }, { id: "mx", label: "Mexico", category: "Americas", flag: "🇲🇽" },
  { id: "uk", label: "United Kingdom", category: "Europe", flag: "🇬🇧" }, { id: "de", label: "Germany", category: "Europe", flag: "🇩🇪" },
  { id: "fr", label: "France", category: "Europe", flag: "🇫🇷" }, { id: "es", label: "Spain", category: "Europe", flag: "🇪🇸" },
  { id: "jp", label: "Japan", category: "Asia", flag: "🇯🇵" }, { id: "in", label: "India", category: "Asia", flag: "🇮🇳" },
  { id: "kr", label: "South Korea", category: "Asia", flag: "🇰🇷" }, { id: "sg", label: "Singapore", category: "Asia", flag: "🇸🇬" },
];
const REGIONS = ["Americas", "Europe", "Asia"];
const fieldClass = "flex min-h-11 w-full items-center rounded-xl border cs-border cs-input px-3 text-[12px] cs-text outline-none transition-shadow focus-visible:shadow-[0_0_0_4px_var(--card-border)] motion-reduce:transition-none";
const contentClass = "z-50 overflow-hidden rounded-xl border cs-border bg-[var(--card-surface)] shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out motion-reduce:animate-none";

export function SelectDropdownCard() {
  const reduceMotion = useReducedMotion();
  return <motion.div className="w-[clamp(300px,95vw,640px)] space-y-8" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}><SearchableSelect /><CascadingSelect /><ComboboxSelect /></motion.div>;
}

function SectionTitle({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <header className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-md bg-violet-500/10 px-2 py-1 text-[10px] font-bold text-violet-600 dark:text-violet-400">{number}</span><h3 className="text-[12px] font-bold cs-text">{title}</h3><span className="text-[10.5px] cs-subtle">— {detail}</span></header>;
}

function SearchableSelect() {
  const labelId = useId(); const listId = useId(); const searchId = useId();
  const [open, setOpen] = useState(false); const [selected, setSelected] = useState(OPTIONS[0]); const [query, setQuery] = useState(""); const [active, setActive] = useState(0);
  const filtered = useMemo(() => OPTIONS.filter((option) => `${option.label} ${option.category}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const choose = (option: Option) => { setSelected(option); setOpen(false); setQuery(""); };
  return <section aria-labelledby={labelId}><SectionTitle number="01" title="Searchable Grouped" detail="12 countries · 3 regions" /><span id={labelId} className="sr-only">Choose a country</span>
    <Popover.Root open={open} onOpenChange={(next) => { setOpen(next); if (!next) { setQuery(""); setActive(0); } }}>
      <Popover.Trigger className={`${fieldClass} justify-between`} aria-labelledby={labelId}><span className="flex items-center gap-2"><span aria-hidden>{selected.flag}</span>{selected.label}</span><ChevronDown aria-hidden className="h-4 w-4 cs-subtle" /></Popover.Trigger>
      <Popover.Portal><Popover.Content sideOffset={6} collisionPadding={12} avoidCollisions className={`${contentClass} w-[var(--radix-popover-trigger-width)]`}>
        <div className="flex items-center gap-2 border-b cs-border px-3 py-2"><Search aria-hidden className="h-3.5 w-3.5 cs-subtle" /><label htmlFor={searchId} className="sr-only">Search countries</label><input id={searchId} name="country-search" role="combobox" aria-autocomplete="list" aria-controls={listId} aria-expanded={open} aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined} autoComplete="off" autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, filtered.length - 1)); } else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); } else if (event.key === "Enter" && filtered[active]) { event.preventDefault(); choose(filtered[active]); } else if (event.key === "Escape") setOpen(false); }} placeholder="Search countries or regions…" className="min-w-0 flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" />{query && <button type="button" onClick={() => { setQuery(""); setActive(0); }} aria-label="Clear country search" className="rounded p-1 cs-subtle outline-none cs-hover focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><X aria-hidden className="h-3 w-3" /></button>}</div>
        <div id={listId} role="listbox" aria-labelledby={labelId} className="max-h-56 overflow-y-auto p-1">{!filtered.length && <p role="status" className="px-3 py-5 text-center text-[11px] cs-subtle">No countries match “{query}”.</p>}{REGIONS.map((region) => { const items = filtered.filter((option) => option.category === region); if (!items.length) return null; return <div key={region} role="group" aria-label={region}><p className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider cs-subtle">{region}</p>{items.map((option) => { const index = filtered.indexOf(option); return <button id={`${listId}-${option.id}`} key={option.id} type="button" role="option" aria-selected={selected.id === option.id} onPointerMove={() => setActive(index)} onClick={() => choose(option)} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] outline-none ${index === active ? "bg-[var(--card-hover)]" : ""}`}><span aria-hidden>{option.flag}</span><span className="flex-1 cs-text">{option.label}</span>{selected.id === option.id && <Check aria-hidden className="h-3.5 w-3.5 text-violet-500" />}</button>; })}</div>; })}</div>
      </Popover.Content></Popover.Portal>
    </Popover.Root>
  </section>;
}

function RadixField({ label, value, disabled, options, onChange, icon: Icon }: { label: string; value: string; disabled?: boolean; options: { value: string; label: string; flag?: string }[]; onChange: (value: string) => void; icon: typeof Globe }) {
  const id = useId();
  return <div><label id={id} className="mb-1 block text-[10px] font-semibold uppercase tracking-wider cs-subtle">{label}</label><Select.Root name={label.toLowerCase()} value={value || undefined} onValueChange={onChange} disabled={disabled}><Select.Trigger aria-labelledby={id} className={`${fieldClass} justify-between disabled:cursor-not-allowed disabled:opacity-40`}><span className="flex min-w-0 items-center gap-1.5"><Icon aria-hidden className="h-3.5 w-3.5 shrink-0 cs-subtle" /><Select.Value placeholder={`Select ${label.toLowerCase()}`} /></span><Select.Icon><ChevronDown aria-hidden className="h-3.5 w-3.5 cs-subtle" /></Select.Icon></Select.Trigger><Select.Portal><Select.Content position="popper" sideOffset={6} collisionPadding={12} className={`${contentClass} min-w-[var(--radix-select-trigger-width)]`}><Select.Viewport className="max-h-56 p-1">{options.map((option) => <Select.Item key={option.value} value={option.value} className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-[12px] cs-text outline-none data-[highlighted]:bg-[var(--card-hover)]"><span aria-hidden>{option.flag}</span><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator className="ml-auto"><Check aria-hidden className="h-3.5 w-3.5 text-violet-500" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal></Select.Root></div>;
}

function CascadingSelect() {
  const [region, setRegion] = useState(""); const [country, setCountry] = useState("");
  const countries = OPTIONS.filter((option) => option.category === region).map((option) => ({ value: option.id, label: option.label, flag: option.flag }));
  return <section><SectionTitle number="02" title="Cascading Dependent" detail="region → country" /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><RadixField label="Region" value={region} icon={Globe} options={REGIONS.map((item) => ({ value: item, label: item }))} onChange={(next) => { setRegion(next); setCountry(""); }} /><RadixField label="Country" value={country} icon={Building2} disabled={!region} options={countries} onChange={setCountry} /></div><p aria-live="polite" className="mt-2 min-h-4 text-[10.5px] cs-subtle">{region && <>Selected: <span className="font-semibold cs-text">{region}{country ? ` → ${countries.find((item) => item.value === country)?.label}` : ""}</span></>}</p></section>;
}

const TAG_OPTIONS = ["Accessibility", "Design", "Motion", "Next.js", "React", "Testing", "TypeScript"];

function ComboboxSelect() {
  const inputId = useId(); const listId = useId();
  const [open, setOpen] = useState(false); const [query, setQuery] = useState(""); const [tags, setTags] = useState(["Design", "React", "TypeScript"]); const [active, setActive] = useState(0); const [announcement, setAnnouncement] = useState("");
  const normalized = query.trim();
  const filtered = TAG_OPTIONS.filter((tag) => !tags.includes(tag) && tag.toLowerCase().includes(normalized.toLowerCase()));
  const canCreate = Boolean(normalized) && !TAG_OPTIONS.some((tag) => tag.toLowerCase() === normalized.toLowerCase()) && !tags.some((tag) => tag.toLowerCase() === normalized.toLowerCase());
  const addTag = (tag: string) => { if (!tag || tags.includes(tag)) return; setTags((current) => [...current, tag]); setQuery(""); setActive(0); setOpen(false); setAnnouncement(`${tag} added`); };
  const removeTag = (tag: string) => { setTags((current) => current.filter((item) => item !== tag)); setAnnouncement(`${tag} removed`); };
  return <section><SectionTitle number="03" title="Combobox + Create" detail="search or create tags" /><label htmlFor={inputId} className="sr-only">Add a tag</label><Popover.Root open={open} onOpenChange={setOpen}><Popover.Anchor asChild><div className={`${fieldClass} flex-wrap gap-1.5 p-2`} onClick={() => setOpen(true)}>{tags.map((tag) => <span key={tag} className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={(event) => { event.stopPropagation(); removeTag(tag); }} className="rounded-sm outline-none focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><X aria-hidden className="h-2.5 w-2.5" /></button></span>)}<input id={inputId} name="new-tag" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={listId} aria-activedescendant={open && filtered[active] ? `${listId}-${active}` : undefined} autoComplete="off" value={query} onFocus={() => setOpen(true)} onChange={(event) => { setQuery(event.target.value); setActive(0); setOpen(true); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, filtered.length - 1)); } else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); } else if (event.key === "Enter") { event.preventDefault(); if (filtered[active]) addTag(filtered[active]); else if (canCreate) addTag(normalized); } else if (event.key === "Escape") setOpen(false); else if (event.key === "Backspace" && !query && tags.length) removeTag(tags[tags.length - 1]); }} placeholder="Add tag…" className="min-w-24 flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none" /></div></Popover.Anchor><Popover.Portal><Popover.Content onOpenAutoFocus={(event) => event.preventDefault()} sideOffset={6} collisionPadding={12} avoidCollisions className={`${contentClass} w-[var(--radix-popover-anchor-width)] p-1`}><div id={listId} role="listbox" aria-label="Available tags">{filtered.map((tag, index) => <button id={`${listId}-${index}`} key={tag} type="button" role="option" aria-selected="false" onPointerMove={() => setActive(index)} onClick={() => addTag(tag)} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] cs-text outline-none ${index === active ? "bg-[var(--card-hover)]" : ""}`}><Plus aria-hidden className="h-3 w-3 text-emerald-500" />{tag}</button>)}{canCreate && <button type="button" onClick={() => addTag(normalized)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-emerald-600 outline-none cs-hover"><Plus aria-hidden className="h-3 w-3" />Create “{normalized}”</button>}{!filtered.length && !canCreate && <p role="status" className="px-3 py-3 text-[11px] cs-subtle">{normalized ? "No matching tags." : "Type to filter available tags."}</p>}</div></Popover.Content></Popover.Portal></Popover.Root><p className="sr-only" role="status" aria-live="polite">{announcement}</p></section>;
}
