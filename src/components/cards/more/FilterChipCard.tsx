"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const INITIAL_CHIPS = ["React", "Next.js", "Tailwind", "TypeScript"];
const TOGGLE_CHIPS = ["Frontend", "Backend", "Full-stack", "DevOps", "Design"];
const COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626"];

const cleanChip = (value: string) => (typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "");
const chipKey = (value: string) => cleanChip(value).toLocaleLowerCase();

function normalizeChipList(values: string[] | undefined, canonicalValues?: string[]) {
  const canonical = new Map(canonicalValues?.map((value) => [chipKey(value), value]));
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const rawValue of Array.isArray(values) ? values : []) {
    const cleaned = cleanChip(rawValue);
    const key = chipKey(cleaned);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    normalized.push(canonical?.get(key) ?? cleaned);
  }
  return normalized;
}

export interface FilterChipCardProps {
  chips?: string[];
  defaultChips?: string[];
  activeFilters?: string[];
  defaultActiveFilters?: string[];
  addedChips?: string[];
  defaultAddedChips?: string[];
  inputValue?: string;
  defaultInputValue?: string;
  onChipsChange?: (chips: string[]) => void;
  onActiveFiltersChange?: (filters: string[]) => void;
  onAddedChipsChange?: (chips: string[]) => void;
  onInputValueChange?: (value: string) => void;
}

export function FilterChipCard({
  chips: chipsProp,
  defaultChips = INITIAL_CHIPS,
  activeFilters: activeFiltersProp,
  defaultActiveFilters = ["Frontend"],
  addedChips: addedChipsProp,
  defaultAddedChips = ["Vue", "Svelte"],
  inputValue: inputValueProp,
  defaultInputValue = "",
  onChipsChange,
  onActiveFiltersChange,
  onAddedChipsChange,
  onInputValueChange,
}: FilterChipCardProps = {}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const inputId = useId();
  const feedbackId = useId();
  const [internalChips, setInternalChips] = useState(() => normalizeChipList(defaultChips));
  const [internalActiveFilters, setInternalActiveFilters] = useState(() => normalizeChipList(defaultActiveFilters, TOGGLE_CHIPS));
  const [internalAddedChips, setInternalAddedChips] = useState(() => normalizeChipList(defaultAddedChips));
  const [internalInputValue, setInternalInputValue] = useState(() => typeof defaultInputValue === "string" ? defaultInputValue : "");
  const [feedback, setFeedback] = useState("");
  const [showInputError, setShowInputError] = useState(false);

  const chips = normalizeChipList(chipsProp ?? internalChips);
  const activeFilters = normalizeChipList(activeFiltersProp ?? internalActiveFilters, TOGGLE_CHIPS);
  const addedChips = normalizeChipList(addedChipsProp ?? internalAddedChips);
  const inputValue = typeof (inputValueProp ?? internalInputValue) === "string" ? (inputValueProp ?? internalInputValue) : "";
  const candidate = cleanChip(inputValue);
  const duplicateCandidate = candidate !== "" && addedChips.some((chip) => chipKey(chip) === chipKey(candidate));
  const inputFeedback = feedback || (duplicateCandidate ? `${candidate} is already in the added chips.` : "");

  const changeChips = (next: string[]) => {
    const normalized = normalizeChipList(next);
    if (chipsProp === undefined) setInternalChips(normalized);
    onChipsChange?.(normalized);
  };
  const changeActiveFilters = (next: string[]) => {
    const normalized = normalizeChipList(next, TOGGLE_CHIPS);
    if (activeFiltersProp === undefined) setInternalActiveFilters(normalized);
    onActiveFiltersChange?.(normalized);
  };
  const changeAddedChips = (next: string[]) => {
    const normalized = normalizeChipList(next);
    if (addedChipsProp === undefined) setInternalAddedChips(normalized);
    onAddedChipsChange?.(normalized);
  };
  const changeInputValue = (next: string) => {
    if (inputValueProp === undefined) setInternalInputValue(next);
    onInputValueChange?.(next);
  };

  const removeChip = (chip: string, source: "removable" | "added") => {
    const key = chipKey(chip);
    const current = source === "removable" ? chips : addedChips;
    const next = current.filter((item) => chipKey(item) !== key);
    if (source === "removable") changeChips(next); else changeAddedChips(next);
    setFeedback(`${chip} ${source === "removable" ? "removal" : "added-chip removal"} ${source === "removable" ? (chipsProp === undefined ? "completed" : "requested") : (addedChipsProp === undefined ? "completed" : "requested")}.`);
  };

  const toggleFilter = (chip: string) => {
    const key = chipKey(chip);
    const active = activeFilters.some((item) => chipKey(item) === key);
    changeActiveFilters(active ? activeFilters.filter((item) => chipKey(item) !== key) : [...activeFilters, chip]);
    setFeedback(`${chip} ${active ? "deselection" : "selection"} ${activeFiltersProp === undefined ? "completed" : "requested"}.`);
  };

  const addChip = () => {
    if (!candidate) {
      setShowInputError(true);
      setFeedback("Enter a chip name before adding.");
      return;
    }
    if (duplicateCandidate) {
      setShowInputError(true);
      setFeedback(`${candidate} is already in the added chips.`);
      return;
    }
    changeAddedChips([...addedChips, candidate]);
    changeInputValue("");
    setShowInputError(false);
    setFeedback(`${candidate} add ${addedChipsProp === undefined ? "completed" : "requested"}.`);
  };

  return (
    <motion.div
      className="relative w-[min(380px,calc(100vw-2rem))] select-none"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Filter Chips</h2><p className="text-[10.5px] cs-muted">Removable · toggle · add input</p></div>
          </div>
        </div>
        <div className="space-y-7 p-4 sm:p-5">
          <section aria-labelledby="removable-chips-label">
            <h3 id="removable-chips-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Removable Chips</h3>
            <div role="group" aria-labelledby="removable-chips-label" className="flex flex-wrap gap-2">
              <AnimatePresence initial={!shouldReduceMotion}>
                {chips.map((chip) => (
                  <motion.span key={`removable-${chipKey(chip)}`} layout={!shouldReduceMotion} initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0, transition: { duration: 0.2 } }} className="cs-input flex items-center gap-1.5 rounded-full border cs-border py-1 pl-3 pr-1.5 text-[11.5px] font-medium cs-text">
                    {chip}
                    <button type="button" onClick={() => removeChip(chip, "removable")} aria-label={`Remove ${chip}`} className="flex h-5 w-5 items-center justify-center rounded-full cs-muted transition-colors motion-reduce:transition-none hover:bg-rose-500/20 hover:text-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:focus-visible:ring-rose-300"><X aria-hidden className="h-3 w-3" strokeWidth={2.4} /></button>
                  </motion.span>
                ))}
              </AnimatePresence>
              {chips.length === 0 && <span className="text-[11px] cs-subtle">All chips removed</span>}
            </div>
          </section>

          <section aria-labelledby="toggle-chips-label">
            <h3 id="toggle-chips-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Toggle Chips</h3>
            <div role="group" aria-labelledby="toggle-chips-label" className="flex flex-wrap gap-2">
              {TOGGLE_CHIPS.map((chip, index) => {
                const active = activeFilters.some((item) => chipKey(item) === chipKey(chip));
                const color = COLORS[index % COLORS.length];
                return (
                  <motion.button key={`toggle-${chipKey(chip)}`} type="button" aria-pressed={active} onClick={() => toggleFilter(chip)} whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }} className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950" style={{ background: active ? color : "var(--card-input-bg)", color: active ? "#fff" : "var(--card-text-muted)", border: `1px solid ${active ? color : "var(--card-border)"}` }}>
                    <span className="flex items-center gap-1">{active && <Check aria-hidden className="h-3 w-3" strokeWidth={3} />}{chip}</span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="add-chip-label">
            <label id="add-chip-label" htmlFor={inputId} className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Add Chip Input</label>
            <div role="group" aria-label="Added chips" className="flex flex-wrap gap-2">
              <AnimatePresence initial={!shouldReduceMotion}>
                {addedChips.map((chip) => (
                  <motion.span key={`added-${chipKey(chip)}`} layout={!shouldReduceMotion} initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }} className="flex items-center gap-1.5 rounded-full bg-blue-600 py-1 pl-3 pr-1.5 text-[11.5px] font-medium text-white">
                    {chip}
                    <button type="button" onClick={() => removeChip(chip, "added")} aria-label={`Remove ${chip}`} className="flex h-5 w-5 items-center justify-center rounded-full transition-colors motion-reduce:transition-none hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-blue-600"><X aria-hidden className="h-3 w-3" strokeWidth={2.4} /></button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-2 flex items-center gap-2" role="group" aria-label="Add a chip">
              <input
                id={inputId}
                type="text"
                value={inputValue}
                aria-invalid={showInputError || duplicateCandidate}
                aria-describedby={feedbackId}
                onChange={(event) => { changeInputValue(event.target.value); setShowInputError(false); setFeedback(""); }}
                onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addChip(); } }}
                placeholder="Type & press Enter"
                autoComplete="off"
                className="cs-input w-full min-w-0 rounded-lg border cs-border px-3 py-1.5 text-[12px] cs-text placeholder:cs-subtle focus:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 aria-[invalid=true]:border-rose-500 aria-[invalid=true]:focus-visible:ring-rose-500/40 dark:focus:border-slate-500"
              />
              <motion.button type="button" aria-label="Add chip" onClick={addChip} whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors motion-reduce:transition-none hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-950"><Plus aria-hidden className="h-4 w-4" strokeWidth={2.4} /></motion.button>
            </div>
            <p id={feedbackId} role="status" aria-live="polite" aria-atomic="true" className={`mt-1.5 min-h-4 text-[10.5px] ${showInputError || duplicateCandidate ? "text-rose-600 dark:text-rose-400" : "cs-muted"}`}>{inputFeedback}</p>
          </section>
        </div>
        <div className="border-t cs-border px-4 py-2.5 text-center sm:px-5"><p className="text-[9.5px] cs-subtle">Remove chips · toggle active · type to add new</p></div>
      </div>
    </motion.div>
  );
}
