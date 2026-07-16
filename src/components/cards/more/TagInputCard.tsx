"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Tag as TagIcon, X } from "lucide-react";

const SUGGESTIONS = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "Rust", "Go", "Vue", "Svelte"];
const MAX_TAGS = 8;
const normalize = (value: string) => value.trim().replace(/\s+/g, " ");
const keyOf = (value: string) => normalize(value).toLocaleLowerCase();
const neutralFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)]";

export function TagInputCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[min(100%,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55 }}>
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(16,185,129,.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg border cs-border cs-input"><TagIcon className="h-4 w-4 cs-muted" /></span><div><h2 className="text-[14px] font-bold cs-text">Tag Input</h2><p className="text-[10.5px] cs-muted">Validated, normalized, and reorderable</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><ChipsInput /><AutocompleteInput /><DragReorderInput /></div>
      </div>
    </motion.div>
  );
}

function addUnique(tags: string[], raw: string) {
  const tag = normalize(raw);
  if (!tag) return { tags, error: "Enter a tag before adding." };
  if (tag.length > 24) return { tags, error: "Tags must be 24 characters or fewer." };
  if (tags.some((item) => keyOf(item) === keyOf(tag))) return { tags, error: `“${tag}” is already added.` };
  if (tags.length >= MAX_TAGS) return { tags, error: `You can add up to ${MAX_TAGS} tags.` };
  return { tags: [...tags, tag], error: "" };
}

function ChipsInput() {
  const id = useId();
  const errorId = `${id}-error`;
  const statusId = `${id}-status`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState(["Design", "Frontend", "UI"]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const add = () => { const result = addUnique(tags, input); setTags(result.tags); setError(result.error); if (!result.error) { setStatus(`${normalize(input)} added.`); setInput(""); } };
  const remove = (tag: string) => { setTags((items) => items.filter((item) => item !== tag)); setError(""); setStatus(`${tag} removed.`); };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); add(); } else if (event.key === "Backspace" && !input && tags.length) remove(tags.at(-1)!); };
  return <section aria-labelledby={`${id}-title`}><h3 id={`${id}-title`} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Chips input</h3><div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border cs-border cs-input p-2 focus-within:border-[var(--card-text-muted)]" onPointerDown={(event) => { if (event.target === event.currentTarget) inputRef.current?.focus(); }}><AnimatePresence initial={false}>{tags.map((tag) => <motion.span key={tag} layout initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="flex max-w-full items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-300"><span className="truncate">{tag}</span><button type="button" onClick={() => remove(tag)} aria-label={`Remove ${tag}`} className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full cs-hover ${neutralFocus}`}><X aria-hidden className="h-3 w-3" /></button></motion.span>)}</AnimatePresence><input ref={inputRef} id={id} name="tags" type="text" value={input} maxLength={25} onChange={(event) => { setInput(event.target.value); setError(""); }} onKeyDown={onKeyDown} onBlur={() => input.trim() && add()} placeholder={tags.length === 0 ? "Type a tag" : "Add tag"} aria-invalid={Boolean(error)} aria-describedby={`${errorId} ${statusId}`} className="min-w-24 flex-1 bg-transparent px-1 py-1 text-[12px] cs-text outline-none placeholder:cs-subtle" /></div><p id={errorId} role="alert" className="mt-1 min-h-4 text-[9.5px] text-rose-500">{error}</p><p id={statusId} role="status" className="sr-only">{status}</p></section>;
}

function AutocompleteInput() {
  const id = useId();
  const listId = `${id}-listbox`;
  const [tags, setTags] = useState(["React"]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const filtered = input ? SUGGESTIONS.filter((suggestion) => keyOf(suggestion).includes(keyOf(input)) && !tags.some((tag) => keyOf(tag) === keyOf(suggestion))) : [];
  const add = (value: string) => { const result = addUnique(tags, value); setTags(result.tags); if (!result.error) { setInput(""); setOpen(false); setActive(0); } };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === "ArrowDown" && filtered.length) { event.preventDefault(); setOpen(true); setActive((index) => (index + 1) % filtered.length); } else if (event.key === "ArrowUp" && filtered.length) { event.preventDefault(); setOpen(true); setActive((index) => (index - 1 + filtered.length) % filtered.length); } else if ((event.key === "Enter" || event.key === "Tab") && open && filtered[active]) { event.preventDefault(); add(filtered[active]); } else if (event.key === "Escape") { event.preventDefault(); setOpen(false); } };
  return <section aria-labelledby={`${id}-title`}><h3 id={`${id}-title`} className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Autocomplete</h3><div className="relative"><div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border cs-border cs-input p-2 focus-within:border-[var(--card-text-muted)]">{tags.map((tag) => <span key={tag} className="flex items-center gap-1 rounded-full bg-sky-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-sky-700 dark:text-sky-300">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags((items) => items.filter((item) => item !== tag))} className={`rounded-full p-0.5 ${neutralFocus}`}><X aria-hidden className="h-3 w-3" /></button></span>)}<input id={id} role="combobox" aria-autocomplete="list" aria-expanded={open && filtered.length > 0} aria-controls={listId} aria-activedescendant={open && filtered[active] ? `${id}-option-${active}` : undefined} value={input} onChange={(event) => { setInput(event.target.value); setOpen(true); setActive(0); }} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={onKeyDown} placeholder="Search tags" className="min-w-24 flex-1 bg-transparent px-1 py-1 text-[12px] cs-text outline-none placeholder:cs-subtle" /></div>{open && filtered.length > 0 && <div id={listId} role="listbox" className="absolute z-40 mt-1.5 max-h-40 w-full overflow-auto rounded-xl border cs-border cs-surface p-1 shadow-xl">{filtered.map((suggestion, index) => <button id={`${id}-option-${index}`} key={suggestion} role="option" aria-selected={index === active} type="button" onPointerDown={(event) => event.preventDefault()} onClick={() => add(suggestion)} onPointerMove={() => setActive(index)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] cs-text outline-none ${index === active ? "bg-black/[.06] dark:bg-white/[.08]" : ""}`}><TagIcon aria-hidden className="h-3 w-3 cs-subtle" />{suggestion}</button>)}</div>}</div></section>;
}

function DragReorderInput() {
  const [tags, setTags] = useState(["First", "Second", "Third", "Fourth"]);
  const [status, setStatus] = useState("Use the drag handles with pointer or keyboard to reorder tags.");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const onDragEnd = ({ active, over }: DragEndEvent) => { if (!over || active.id === over.id) return; const oldIndex = tags.indexOf(String(active.id)); const newIndex = tags.indexOf(String(over.id)); setTags((items) => arrayMove(items, oldIndex, newIndex)); setStatus(`${active.id} moved to position ${newIndex + 1}.`); };
  return <section aria-labelledby="reorder-title"><h3 id="reorder-title" className="mb-3 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Reorderable</h3><DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} accessibility={{ screenReaderInstructions: { draggable: "Press space to pick up a tag. Use arrow keys to move it, then press space to drop." } }}><SortableContext items={tags} strategy={verticalListSortingStrategy}><div className="space-y-1.5">{tags.map((tag, index) => <SortableTag key={tag} tag={tag} index={index} count={tags.length} onRemove={() => { setTags((items) => items.filter((item) => item !== tag)); setStatus(`${tag} removed.`); }} />)}</div></SortableContext></DndContext><p role="status" aria-live="polite" className="mt-2 text-[9.5px] cs-subtle">{status}</p></section>;
}

function SortableTag({ tag, index, count, onRemove }: { tag: string; index: number; count: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tag });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`flex items-center gap-2 rounded-xl border cs-border cs-input p-2 ${isDragging ? "relative z-50 opacity-80 shadow-xl" : ""}`}><button type="button" {...attributes} {...listeners} aria-label={`Reorder ${tag}, position ${index + 1} of ${count}`} className={`flex h-8 w-8 touch-none cursor-grab items-center justify-center rounded-lg cs-muted cs-hover active:cursor-grabbing ${neutralFocus}`}><GripVertical aria-hidden className="h-4 w-4" /></button><span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-[9px] font-bold text-violet-700 dark:text-violet-300">{index + 1}</span><span className="min-w-0 flex-1 truncate text-[11.5px] font-medium cs-text">{tag}</span><button type="button" onClick={onRemove} aria-label={`Remove ${tag}`} className={`flex h-8 w-8 items-center justify-center rounded-lg cs-muted cs-hover ${neutralFocus}`}><X aria-hidden className="h-3.5 w-3.5" /></button></div>;
}
