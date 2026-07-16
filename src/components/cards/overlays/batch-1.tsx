"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Check, X, Search, Command, ArrowRight, ShoppingCart,
  Trash2, Eye, Heart, Share2, Star, Minus, Plus, SlidersHorizontal,
  ShieldCheck, Package, Truck, Zap, Calendar, User, ChevronDown,
  Flag, AlignLeft, Tag, Users,
} from "lucide-react";
import { DemoButton, Backdrop, CloseButton, OverlayStage, TriggerCenter, ModalOverlay, EASE, SPRING, SPRING_SOFT } from "./primitives";
import { PEOPLE, Avatar, Row, ProgressItem, FieldRow, DateField, fSpace, fMono } from "./modal-helpers";

// ════════════════════════════════════════════════════════════════════════════
// BATCH 1 — Components 1-8 (premium quality, real Unsplash images)
// ════════════════════════════════════════════════════════════════════════════

// ─── 1. Task Creation Modal (from provided ModalKit — drawer slide animation) ──
export function ConfirmationDialog() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("violet");
  const [priority, setPriority] = useState("medium");
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const [assignee, setAssignee] = useState<typeof PEOPLE[0] | null>(null);

  const LABELS = [
    { id: "violet", class: "bg-violet-500" },
    { id: "rose", class: "bg-rose-500" },
    { id: "amber", class: "bg-amber-500" },
    { id: "emerald", class: "bg-emerald-500" },
    { id: "slate", class: "bg-slate-400" },
  ];
  const PRIORITIES = [
    { id: "low", label: "Low", color: "text-slate-500 bg-slate-100" },
    { id: "medium", label: "Medium", color: "text-amber-600 bg-amber-50" },
    { id: "high", label: "High", color: "text-rose-600 bg-rose-50" },
  ];

  function close() {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 260);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <OverlayStage gradient="radial-gradient(circle at 20% 30%, rgba(196,181,253,0.25), transparent 50%), radial-gradient(circle at 80% 70%, rgba(165,243,252,0.20), transparent 50%)">
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#6366f1">
          <Plus className="h-4 w-4" /> Create New Task
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={close}>
            <div
              onClick={(e) => { e.stopPropagation(); setAssigneeOpen(false); }}
              className="rounded-2xl bg-white shadow-2xl"
              style={{ animation: `${closing ? "drawerOut" : "drawerIn"} .3s cubic-bezier(.22,1,.36,1) forwards` }}
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <h3 className="text-lg font-bold text-slate-900" style={fSpace}>Create new task</h3>
                <button onClick={close} aria-label="Close" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 space-y-4">
                {/* Title with char counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-500">Title</label>
                    <span className="text-xs text-slate-300" style={fMono}>{title.length}/100</span>
                  </div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                    placeholder="e.g. Ship the onboarding redesign"
                    className="w-full border-b border-slate-200 focus:border-slate-900 outline-none text-sm text-slate-900 pb-2 transition-colors placeholder:text-slate-300"
                  />
                </div>

                <button className="w-full text-left text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-3 py-2.5 hover:border-slate-300 transition-colors">
                  Click to add a description
                </button>

                {/* Label color */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Label color</p>
                  <div className="flex gap-2">
                    {LABELS.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLabel(l.id)}
                        className={`w-7 h-7 rounded-full ${l.class} flex items-center justify-center transition-transform ${label === l.id ? "scale-110 ring-2 ring-offset-2 ring-slate-900" : "hover:scale-105"}`}
                      >
                        {label === l.id && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Priority</p>
                  <div className="flex gap-2">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPriority(p.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${priority === p.id ? p.color + " ring-1 ring-inset ring-current" : "text-slate-400 bg-slate-50 hover:bg-slate-100"}`}
                      >
                        <Flag className="w-3 h-3" /> {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assignee dropdown */}
                <div className="relative">
                  <p className="text-xs font-medium text-slate-500 mb-1.5">Assignee</p>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={assigneeOpen}
                    onClick={(e) => { e.stopPropagation(); setAssigneeOpen((o) => !o); }}
                    className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 text-sm hover:border-slate-300 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-slate-700">
                      {assignee ? (
                        <><Avatar person={assignee} size="w-5 h-5" ring={false} /> {assignee.name}</>
                      ) : (
                        <><Users className="w-4 h-4 text-slate-400" /> <span className="text-slate-400">Select assignee</span></>
                      )}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${assigneeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {assigneeOpen && (
                    <div
                      role="listbox"
                      aria-label="Assignees"
                      onClick={(e) => e.stopPropagation()}
                      className="relative z-10 mt-1.5 max-h-36 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1 shadow-lg scrollbar-modern"
                      style={{ animation: "dropIn .15s ease" }}
                    >
                      {PEOPLE.map((p) => (
                        <button
                          type="button"
                          role="option"
                          aria-selected={assignee?.name === p.name}
                          key={p.name}
                          onClick={() => { setAssignee(p); setAssigneeOpen(false); }}
                          className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Avatar person={p} size="w-6 h-6" ring={false} /> {p.name}
                          {assignee?.name === p.name && <Check className="ml-auto h-3.5 w-3.5 text-indigo-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date fields */}
                <div className="grid grid-cols-2 gap-3">
                  <DateField label="Start date" value="Jul 16, 2026" />
                  <DateField label="Due date" value="Jul 20, 2026" />
                </div>
              </div>

              <div className="flex gap-3 px-6 py-5 mt-2">
                <button onClick={close} className="flex-1 py-2.5 rounded-full text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button onClick={close} className="flex-1 py-2.5 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Create task
                </button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 2. Delete Alert ────────────────────────────────────────────────────────
export function DeleteAlert() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText === "DELETE";
  return (
    <OverlayStage gradient="radial-gradient(circle at 50% 50%, rgba(239,68,68,0.05), transparent 60%)">
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#ef4444" variant="outline">
          <Trash2 className="h-4 w-4" /> Delete Project
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Red gradient header with product image */}
              <div className="relative h-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}>
                { }
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=70" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(220,38,38,0.9))" }} />
                <button onClick={() => setOpen(false)} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-white/80 hover:bg-white/20">
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute -bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 shadow-lg ring-4 ring-[#ffffff]">
                  <AlertTriangle className="h-6 w-6 text-white" strokeWidth={2.2} />
                </div>
              </div>
              <div className="p-5 pt-7">
                <h3 className="text-[15px] font-bold text-[#1e293b]">Delete "Project Apollo"?</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">
                  This will permanently delete the project along with <span className="font-semibold text-[#1e293b]">24 files</span>, <span className="font-semibold text-[#1e293b]">312 commits</span>, and all associated deployments. This action <span className="font-semibold text-red-500">cannot be undone</span>.
                </p>
                {/* Impact summary */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/5 p-2.5 ring-1 ring-red-500/10">
                  <Package className="h-4 w-4 text-red-400" />
                  <span className="text-[11px] text-[#64748b]">3 collaborators will lose access</span>
                </div>
                <div className="mt-4">
                  <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#64748b]">
                    Type <span className="font-mono font-bold text-red-500">DELETE</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={e => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="mt-1.5 w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12.5px] font-mono text-[#1e293b] outline-none focus:ring-2 focus:ring-red-500/40"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <DemoButton onClick={() => setOpen(false)} variant="ghost" className="flex-1">Keep Project</DemoButton>
                  <DemoButton
                    onClick={() => { if (canDelete) setOpen(false); }}
                    color="#ef4444"
                    className={`flex-1 ${canDelete ? "" : "pointer-events-none opacity-40"}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete Forever
                  </DemoButton>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 3. Command Palette ─────────────────────────────────────────────────────
const COMMANDS = [
  { id: "new", label: "New Project", icon: Plus, hint: "⌘N", group: "Actions", desc: "Create a blank project" },
  { id: "open", label: "Open File", icon: Search, hint: "⌘O", group: "Actions", desc: "Open from disk" },
  { id: "import", label: "Import from Figma", icon: Package, hint: "", group: "Actions", desc: "Sync Figma frames" },
  { id: "settings", label: "Settings", icon: SlidersHorizontal, hint: "⌘,", group: "Navigation", desc: "Open preferences" },
  { id: "theme", label: "Toggle Theme", icon: Zap, hint: "⌘D", group: "Navigation", desc: "Switch light/dark" },
  { id: "share", label: "Share Project", icon: Share2, hint: "", group: "Social", desc: "Get share link" },
  { id: "cart", label: "View Cart", icon: ShoppingCart, hint: "⌘B", group: "Social", desc: "3 items in cart" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()));
  const grouped = filtered.reduce((acc, c) => { (acc[c.group] = acc[c.group] || []).push(c); return acc; }, {} as Record<string, typeof COMMANDS>);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else { setQuery(""); setActive(0); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, filtered.length]);

  let runningIdx = 0;

  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <Command className="h-4 w-4" /> Press ⌘K
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={SPRING}
              className="rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b bg-white/10 px-4 py-3.5">
                <Search className="h-4 w-4 text-[#64748b]" strokeWidth={2} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-[14px] text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
                />
                <kbd className="rounded border bg-white/10 bg-[#f8fafc] px-1.5 py-0.5 text-[9px] font-mono text-[#64748b]">ESC</kbd>
              </div>
              {/* Results */}
              <div className="max-h-[280px] overflow-y-auto p-2">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8]">{group}</p>
                    {items.map((item) => {
                      const Icon = item.icon;
                      const idx = runningIdx++;
                      const isActive = active === idx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => setOpen(false)}
                          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition"
                          style={{ background: isActive ? "#f1f5f9" : "transparent" }}
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: isActive ? "rgba(139,92,246,0.15)" : "#f8fafc" }}>
                            <Icon className="h-3.5 w-3.5" style={{ color: isActive ? "#8b5cf6" : "#64748b" }} strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-[12.5px] font-medium text-[#1e293b]">{item.label}</span>
                            <span className="block text-[10px] text-[#64748b] truncate">{item.desc}</span>
                          </div>
                          {item.hint && <kbd className="rounded border bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-[#64748b]">{item.hint}</kbd>}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-8 text-center">
                    <Search className="mx-auto h-6 w-6 text-[#94a3b8]" />
                    <p className="mt-2 text-[12px] text-[#64748b]">No results for "{query}"</p>
                  </div>
                )}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between border-t bg-white/10 px-4 py-2 text-[10px] text-[#94a3b8]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><kbd className="rounded border bg-white/10 px-1">↑</kbd><kbd className="rounded border bg-white/10 px-1">↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="rounded border bg-white/10 px-1">↵</kbd> select</span>
                </div>
                <span className="flex items-center gap-1"><Zap className="h-2.5 w-2.5" /> Powered by mtverse</span>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 4. Quick View Modal (product card with real image) ─────────────────────
export function QuickViewModal() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(0);
  const colors = [
    { name: "Midnight", hex: "#1a1a2e", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { name: "Violet", hex: "#7c3aed", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80" },
    { name: "Rose", hex: "#ec4899", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80" },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#8b5cf6">
          <Eye className="h-4 w-4" /> Quick View
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row"
              style={{ border: "1px solid var(--overlay-border)" }}
            >
              {/* Product image */}
              <div className="relative h-40 w-full shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:h-auto sm:w-48">
                <motion.img
                  key={color}
                  src={colors[color].img}
                  alt={colors[color].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[9px] font-bold text-white backdrop-blur-sm">
                  <Star className="h-2.5 w-2.5 fill-amber-300 text-amber-300" /> 4.9 (482)
                </div>
                <div className="absolute bottom-2 left-2 rounded-full bg-emerald-500 px-2 py-1 text-[8.5px] font-bold text-white">IN STOCK</div>
              </div>
              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-wider text-violet-500">Premium Audio</p>
                    <h3 className="mt-0.5 text-[15px] font-bold text-[#1e293b]">Aurora Wireless Headphones</h3>
                  </div>
                  <CloseButton onClick={() => setOpen(false)} />
                </div>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-[22px] font-bold text-[#1e293b]">$249</span>
                  <span className="text-[12px] text-[#64748b] line-through">$329</span>
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">SAVE 24%</span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#64748b]">
                  Active noise cancellation · 40h battery · Adaptive sound · USB-C fast charge
                </p>
                {/* Color selector */}
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-semibold text-[#64748b]">Color: <span className="text-[#1e293b]">{colors[color].name}</span></p>
                  <div className="flex items-center gap-2">
                    {colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(i)}
                        className="h-7 w-7 rounded-full ring-2 ring-offset-1 transition"
                        style={{ background: c.hex, borderColor: "#e2e8f0", boxShadow: color === i ? `0 0 0 2px #ffffff, 0 0 0 4px ${c.hex}` : "none" }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>
                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["ANC", "40h", "USB-C", "Bluetooth 5.3"].map(tag => (
                    <span key={tag} className="rounded-md bg-[#f8fafc] px-2 py-0.5 text-[9.5px] font-semibold text-[#64748b]">{tag}</span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <DemoButton onClick={() => setOpen(false)} color="#8b5cf6" className="flex-1">
                    <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                  </DemoButton>
                  <DemoButton onClick={() => setOpen(false)} variant="outline"><Heart className="h-3.5 w-3.5" /></DemoButton>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 5. Product Preview (fullscreen gallery with real images) ───────────────
export function ProductPreview() {
  const [open, setOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const images = [
    { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", label: "Studio" },
    { src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80", label: "Violet" },
    { src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80", label: "Rose" },
    { src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80", label: "Ocean" },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <Eye className="h-4 w-4" /> Product Preview
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-0 z-50 flex min-h-full items-start justify-center bg-black/60 p-3 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 10 }}
              transition={SPRING}
              className="relative flex w-full max-w-[680px] flex-col gap-3 rounded-2xl bg-[#ffffff] p-3 shadow-2xl sm:flex-row sm:p-4"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <CloseButton onClick={() => setOpen(false)} />
              {/* Thumbnails */}
              <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="h-14 w-14 overflow-hidden rounded-lg transition"
                    style={{ boxShadow: activeImg === i ? `0 0 0 2px #ffffff, 0 0 0 4px #8b5cf6` : "none", opacity: activeImg === i ? 1 : 0.6 }}
                  >
                    { }
                    <img src={img.src} alt={img.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Main image */}
              <div className="relative min-h-64 flex-1 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <motion.img
                  key={activeImg}
                  src={images[activeImg].src}
                  alt={images[activeImg].label}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Aurora Collection</p>
                    <p className="text-[18px] font-bold text-white">{images[activeImg].label}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{activeImg + 1} / {images.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 6. Checkout Drawer (right slide) ───────────────────────────────────────
export function CheckoutDrawer() {
  const [open, setOpen] = useState(false);
  const items = [
    { name: "Aurora Headphones", price: 249, qty: 1, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80" },
    { name: "USB-C Cable (2m)", price: 29, qty: 1, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=100&q=80" },
    { name: "Wireless Mouse", price: 70.97, qty: 1, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=100&q=80" },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#10b981">Checkout</DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Checkout"
              className="absolute right-0 top-0 z-50 flex h-full w-full max-w-[340px] flex-col bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1e293b]">Checkout</h3>
                  <p className="text-[10.5px] text-[#64748b]">{items.length} items · ${subtotal.toFixed(2)}</p>
                </div>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              {/* Items */}
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-xl border bg-white/10 p-2.5"
                  >
                    { }
                    <img src={item.img} alt={item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[12px] font-semibold text-[#1e293b]">{item.name}</p>
                      <p className="text-[10.5px] text-[#64748b]">${item.price.toFixed(2)} · Qty {item.qty}</p>
                    </div>
                    <span className="text-[12px] font-bold text-[#1e293b]">${(item.price * item.qty).toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>
              {/* Order summary */}
              <div className="border-t bg-white/10 p-4">
                <div className="mb-3 space-y-1.5">
                  <div className="flex justify-between text-[11.5px] text-[#64748b]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[11.5px] text-[#64748b]"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[11.5px] text-emerald-600"><span><Truck className="inline h-3 w-3" /> Shipping</span><span>FREE</span></div>
                  <div className="flex justify-between border-t bg-white/10 pt-1.5 text-[14px] font-bold text-[#1e293b]"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <DemoButton onClick={() => setOpen(false)} color="#10b981" className="w-full">
                  Complete Purchase <ArrowRight className="h-3.5 w-3.5" />
                </DemoButton>
                <p className="mt-2 flex items-center justify-center gap-1 text-[9.5px] text-[#94a3b8]">
                  <ShieldCheck className="h-3 w-3" /> Secure checkout · 256-bit SSL
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 7. Cart Drawer (right slide with quantity steppers) ────────────────────
export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState([2, 1, 3]);
  const items = [
    { name: "Aurora Headphones", price: 249, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80" },
    { name: "USB-C Cable (2m)", price: 29, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=100&q=80" },
    { name: "Wireless Mouse", price: 70, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=100&q=80" },
  ];
  const total = items.reduce((sum, item, i) => sum + item.price * qty[i], 0);
  const totalQty = qty.reduce((a, b) => a + b, 0);
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#3b82f6">
          <ShoppingCart className="h-4 w-4" /> Cart ({totalQty})
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              className="absolute right-0 top-0 z-50 flex h-full w-full max-w-[320px] flex-col bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1e293b]">
                  <ShoppingCart className="h-4 w-4" /> Your Cart
                  <span className="rounded-full bg-blue-500/15 px-1.5 py-0.5 text-[9px] font-bold text-blue-500">{totalQty}</span>
                </h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-2.5 rounded-xl border bg-white/10 p-2"
                  >
                    { }
                    <img src={item.img} alt={item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11.5px] font-semibold text-[#1e293b]">{item.name}</p>
                      <p className="text-[10px] text-[#64748b]">${item.price.toFixed(2)} each</p>
                      <div className="mt-1 flex items-center gap-1 rounded-lg border bg-white/10 p-0.5 w-fit">
                        <button onClick={() => setQty(q => q.map((v, j) => j === i ? Math.max(1, v - 1) : v))} className="flex h-5 w-5 items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-4 text-center text-[10.5px] font-bold text-[#1e293b]">{qty[i]}</span>
                        <button onClick={() => setQty(q => q.map((v, j) => j === i ? v + 1 : v))} className="flex h-5 w-5 items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-[#1e293b]">${(item.price * qty[i]).toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-t bg-white/10 p-4">
                <div className="mb-3 flex justify-between text-[14px] font-bold text-[#1e293b]">
                  <span>Total ({totalQty} items)</span><span>${total.toFixed(2)}</span>
                </div>
                <DemoButton onClick={() => setOpen(false)} color="#3b82f6" className="w-full">
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
                </DemoButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 8. Filter Drawer (left slide) ──────────────────────────────────────────
export function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(75);
  const [selectedCats, setSelectedCats] = useState<string[]>(["Electronics", "Fashion"]);
  const [rating, setRating] = useState(4);
  const categories = [
    { name: "Electronics", count: 142, icon: Zap },
    { name: "Fashion", count: 89, icon: Package },
    { name: "Home & Living", count: 64, icon: Truck },
    { name: "Sports", count: 37, icon: Star },
    { name: "Books", count: 218, icon: Package },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              className="absolute left-0 top-0 z-50 flex h-full w-full max-w-[300px] flex-col bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1e293b]">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto p-4">
                {/* Price range */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748b]">Price Range</label>
                    <span className="text-[11px] font-bold text-violet-500">$0 – ${price}</span>
                  </div>
                  <input type="range" min="0" max="500" value={price} onChange={e => setPrice(+e.target.value)} className="w-full accent-violet-500" />
                  <div className="mt-1 flex justify-between text-[9.5px] text-[#94a3b8]">
                    <span>$0</span><span>$500+</span>
                  </div>
                </div>
                {/* Categories */}
                <div>
                  <label className="mb-2 block text-[10.5px] font-bold uppercase tracking-wider text-[#64748b]">Categories</label>
                  <div className="space-y-1">
                    {categories.map(cat => {
                      const checked = selectedCats.includes(cat.name);
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCats(s => s.includes(cat.name) ? s.filter(c => c !== cat.name) : [...s, cat.name])}
                          className="flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition hover:bg-[#f1f5f9]"
                        >
                          <span
                            className="flex h-4 w-4 items-center justify-center rounded border transition"
                            style={{ borderColor: checked ? "#8b5cf6" : "#e2e8f0", background: checked ? "#8b5cf6" : "transparent" }}
                          >
                            {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                          </span>
                          <Icon className="h-3.5 w-3.5 text-[#64748b]" />
                          <span className="flex-1 text-[12px] font-medium text-[#1e293b]">{cat.name}</span>
                          <span className="text-[10px] text-[#94a3b8]">{cat.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Rating */}
                <div>
                  <label className="mb-2 block text-[10.5px] font-bold uppercase tracking-wider text-[#64748b]">Minimum Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(r => (
                      <button key={r} onClick={() => setRating(r)} className="transition hover:scale-110">
                        <Star className={`h-5 w-5 ${r <= rating ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0]"}`} />
                      </button>
                    ))}
                    <span className="ml-2 text-[11px] font-semibold text-[#1e293b]">{rating}+ stars</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 border-t bg-white/10 p-4">
                <DemoButton onClick={() => { setSelectedCats([]); setPrice(75); setRating(4); }} variant="ghost" className="flex-1">Reset All</DemoButton>
                <DemoButton onClick={() => setOpen(false)} color="#8b5cf6" className="flex-1">Apply Filters</DemoButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}
