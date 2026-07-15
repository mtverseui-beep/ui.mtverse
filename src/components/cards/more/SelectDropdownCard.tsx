"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Search, Plus, Globe, MapPin, Building2, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Mock data: 12 countries across 3 regions ──
interface Option { id: string; label: string; category: string; flag?: string; }
const OPTIONS: Option[] = [
  { id: "us", label: "United States", category: "Americas", flag: "🇺🇸" },
  { id: "ca", label: "Canada", category: "Americas", flag: "🇨🇦" },
  { id: "br", label: "Brazil", category: "Americas", flag: "🇧🇷" },
  { id: "mx", label: "Mexico", category: "Americas", flag: "🇲🇽" },
  { id: "uk", label: "United Kingdom", category: "Europe", flag: "🇬🇧" },
  { id: "de", label: "Germany", category: "Europe", flag: "🇩🇪" },
  { id: "fr", label: "France", category: "Europe", flag: "🇫🇷" },
  { id: "es", label: "Spain", category: "Europe", flag: "🇪🇸" },
  { id: "jp", label: "Japan", category: "Asia", flag: "🇯🇵" },
  { id: "in", label: "India", category: "Asia", flag: "🇮🇳" },
  { id: "kr", label: "South Korea", category: "Asia", flag: "🇰🇷" },
  { id: "sg", label: "Singapore", category: "Asia", flag: "🇸🇬" },
];

const REGIONS: Record<string, { id: string; label: string; flag: string }[]> = {
  "Americas": [
    { id: "us", label: "United States", flag: "🇺🇸" },
    { id: "ca", label: "Canada", flag: "🇨🇦" },
    { id: "br", label: "Brazil", flag: "🇧🇷" },
  ],
  "Europe": [
    { id: "uk", label: "United Kingdom", flag: "🇬🇧" },
    { id: "de", label: "Germany", flag: "🇩🇪" },
    { id: "fr", label: "France", flag: "🇫🇷" },
  ],
  "Asia": [
    { id: "jp", label: "Japan", flag: "🇯🇵" },
    { id: "in", label: "India", flag: "🇮🇳" },
    { id: "kr", label: "South Korea", flag: "🇰🇷" },
  ],
};

export function SelectDropdownCard() {
  return (
    <motion.div
      className="w-[clamp(340px,95vw,640px)] select-none space-y-10"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <SearchableSelect />
      <CascadingSelect />
      <ComboboxSelect />
    </motion.div>
  );
}

// ── 1. Searchable grouped ──
function SearchableSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(OPTIONS[0]);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const filtered = query
    ? OPTIONS.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : OPTIONS;
  const grouped = new Map<string, Option[]>();
  for (const o of filtered) {
    const arr = grouped.get(o.category) || [];
    arr.push(o);
    grouped.set(o.category, arr);
  }

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-blue-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">01</span>
        <h3 className="text-[12px] font-bold cs-text">Searchable Grouped</h3>
        <span className="text-[10.5px] cs-subtle">— 12 countries · 3 regions</span>
      </header>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => { setOpen(o => !o); setQuery(""); }}
          className="flex w-full items-center justify-between gap-2 rounded-xl border cs-border cs-input px-3.5 py-3 text-left text-[13px] cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
        >
          <span className="flex items-center gap-2">
            {selected && <span className="text-base leading-none">{selected.flag}</span>}
            <span>{selected ? selected.label : "Select..."}</span>
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 cs-subtle" strokeWidth={2.2} />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border cs-border shadow-2xl"
              style={{ background: "var(--card-surface)" }}
            >
              <div className="flex items-center gap-2 border-b cs-border px-3 py-2">
                <Search className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search countries..."
                  autoFocus
                  className="flex-1 bg-transparent text-[12px] cs-text placeholder:cs-subtle focus:outline-none"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} className="text-[10px] cs-subtle hover:cs-text">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="scrollbar-modern max-h-[180px] overflow-y-auto p-1">
                {filtered.length === 0 && (
                  <p className="py-4 text-center text-[11px] cs-subtle">No results for "{query}"</p>
                )}
                {Array.from(grouped.entries()).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider cs-subtle">{cat}</p>
                    {items.map(opt => {
                      const sel = selected?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setSelected(opt); setOpen(false); setQuery(""); }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12px] transition cs-hover"
                        >
                          <span className="text-base leading-none">{opt.flag}</span>
                          <span className="flex-1 cs-text">{opt.label}</span>
                          {sel && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                              <Check className="h-3.5 w-3.5 text-blue-500" strokeWidth={2.6} />
                            </motion.span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 2. Cascading — dependent selects ──
function CascadingSelect() {
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const countries = region ? REGIONS[region] || [] : [];
  const ref = useRef<HTMLDivElement>(null);
  const [openLevel, setOpenLevel] = useState<number>(0);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenLevel(0);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-violet-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">02</span>
        <h3 className="text-[12px] font-bold cs-text">Cascading Dependent</h3>
        <span className="text-[10.5px] cs-subtle">— region → country</span>
      </header>
      <div ref={ref} className="grid grid-cols-2 gap-3">
        {/* Region */}
        <div className="relative">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider cs-subtle">Region</label>
          <button
            type="button"
            onClick={() => setOpenLevel(openLevel === 1 ? 0 : 1)}
            className="flex w-full items-center justify-between gap-1.5 rounded-xl border cs-border cs-input px-3 py-2.5 text-left text-[12px] transition cs-hover"
            style={{ color: region ? "var(--card-text)" : "var(--card-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} />
              {region || "Select region"}
            </span>
            <motion.span animate={{ rotate: openLevel === 1 ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-3.5 w-3.5 cs-subtle" strokeWidth={2.2} />
            </motion.span>
          </button>
          <AnimatePresence>
            {openLevel === 1 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border cs-border shadow-2xl"
                style={{ background: "var(--card-surface)" }}
              >
                {Object.keys(REGIONS).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setRegion(r); setCountry(""); setOpenLevel(2); }}
                    className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[12px] transition cs-hover ${region === r ? "text-blue-500 font-semibold" : "cs-text"}`}
                  >
                    {r}
                    {region === r && <Check className="h-3.5 w-3.5" strokeWidth={2.6} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Country */}
        <div className="relative">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider cs-subtle">Country</label>
          <button
            type="button"
            disabled={!region}
            onClick={() => setOpenLevel(openLevel === 2 ? 0 : 2)}
            className="flex w-full items-center justify-between gap-1.5 rounded-xl border cs-border cs-input px-3 py-2.5 text-left text-[12px] transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: country ? "var(--card-text)" : "var(--card-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} />
              {country || "Select country"}
            </span>
            <motion.span animate={{ rotate: openLevel === 2 ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-3.5 w-3.5 cs-subtle" strokeWidth={2.2} />
            </motion.span>
          </button>
          <AnimatePresence>
            {openLevel === 2 && region && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border cs-border shadow-2xl"
                style={{ background: "var(--card-surface)" }}
              >
                {countries.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { setCountry(c.label); setOpenLevel(0); }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition cs-hover ${country === c.label ? "text-blue-500 font-semibold" : "cs-text"}`}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    {c.label}
                    {country === c.label && <Check className="ml-auto h-3.5 w-3.5" strokeWidth={2.6} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {(region || country) && (
        <p className="mt-3 text-[10.5px] cs-subtle">
          Selected: <span className="font-semibold cs-text">{region || "—"}</span>
          {" → "}
          <span className="font-semibold cs-text">{country || "—"}</span>
        </p>
      )}
    </section>
  );
}

// ── 3. Combobox — type to search + create new (FIXED create logic) ──
function ComboboxSelect() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(["Design", "React", "TypeScript"]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query
    ? tags.filter(t => t.toLowerCase().includes(query.toLowerCase()))
    : tags;
  const canCreate = query.trim().length > 0 && !tags.some(t => t.toLowerCase() === query.trim().toLowerCase());

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setActiveIdx(-1);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const add = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !tags.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      setTags(t => [...t, trimmed]);
    }
    setQuery("");
    setActiveIdx(-1);
  };
  const remove = (tag: string) => setTags(t => t.filter(x => x !== tag));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && activeIdx < filtered.length) {
        // Select an existing tag (no-op since it's already added)
        setQuery("");
        setActiveIdx(-1);
      } else if (canCreate) {
        add(query);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Backspace" && query === "" && tags.length > 0) {
      remove(tags[tags.length - 1]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      setActiveIdx(-1);
    }
  };

  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-emerald-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">03</span>
        <h3 className="text-[12px] font-bold cs-text">Combobox + Create</h3>
        <span className="text-[10.5px] cs-subtle">— type to search · Enter to create · ↑↓ to navigate</span>
      </header>
      <div ref={ref} className="relative">
        <div
          className="flex flex-wrap items-center gap-1.5 rounded-xl border cs-border cs-input p-2 min-h-[44px] focus-within:ring-2 focus-within:ring-emerald-400/40 transition"
          onClick={() => setOpen(true)}
        >
          {tags.map(tag => (
            <motion.span
              key={tag}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(tag); }}
                className="hover:text-rose-500 transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-2.5 w-2.5" strokeWidth={2.6} />
              </button>
            </motion.span>
          ))}
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Type to search or create..." : "Add tag..."}
            className="flex-1 bg-transparent text-[12.5px] cs-text placeholder:cs-subtle focus:outline-none min-w-[100px]"
          />
        </div>
        <AnimatePresence>
          {open && (filtered.length > 0 || canCreate) && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border cs-border shadow-2xl"
              style={{ background: "var(--card-surface)" }}
            >
              <div className="p-1">
                {filtered.length > 0 && (
                  <p className="px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider cs-subtle">Existing</p>
                )}
                {filtered.map((tag, i) => (
                  <button
                    key={tag}
                    type="button"
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setQuery("")}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition ${activeIdx === i ? "bg-[var(--card-hover)]" : "cs-hover"}`}
                  >
                    <Check className="h-3 w-3 text-emerald-500" strokeWidth={2.6} />
                    <span className="cs-text">{tag}</span>
                  </button>
                ))}
                {canCreate && (
                  <>
                    {filtered.length > 0 && <div className="my-1 h-px cs-border" />}
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(filtered.length)}
                      onClick={() => add(query)}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-emerald-600 dark:text-emerald-400 transition cs-hover"
                    >
                      <Plus className="h-3 w-3" strokeWidth={2.4} />
                      Create <span className="font-semibold">"{query.trim()}"</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[10.5px] cs-subtle">
        {tags.length} tag{tags.length !== 1 ? "s" : ""}: <span className="cs-text font-medium">{tags.join(" · ")}</span>
      </p>
    </section>
  );
}
