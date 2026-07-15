"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal, Pencil, Share2, Download, Trash2, Eye, Copy, Flag, ChevronDown,
  FileText, Image as ImageIcon, Video, Star, Send, Link2, Mail, MessageCircle,
  Archive, FolderOpen, Move, Edit3, Info,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function DropdownMenuCard() {
  return (
    <motion.div
      className="w-[clamp(340px,95vw,640px)] select-none space-y-10"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <ActionMenu />
      <HoverMenu />
      <NestedMenu />
    </motion.div>
  );
}

// ── 1. Action menu — click trigger with spring open ──
function ActionMenu() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const items = [
    { label: "View Details", icon: Eye, color: "var(--card-text-muted)", hint: "⌘V" },
    { label: "Edit", icon: Pencil, color: "#3b82f6", hint: "⌘E" },
    { label: "Share", icon: Share2, color: "#8b5cf6", hint: "⌘S" },
    { label: "Copy Link", icon: Copy, color: "#10b981", hint: "⌘C" },
    { label: "Archive", icon: Archive, color: "#f59e0b", hint: "" },
    { label: "Delete", icon: Trash2, color: "#ef4444", hint: "" },
  ];
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-blue-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">01</span>
        <h3 className="text-[12px] font-bold cs-text">Action Menu</h3>
        <span className="text-[10.5px] cs-subtle">— click trigger · keyboard hints</span>
      </header>
      <div ref={ref} className="relative flex justify-center py-4">
        <motion.button type="button" onClick={() => setOpen(o => !o)} whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 rounded-xl border cs-border cs-input px-4 py-2.5 text-[12px] font-semibold cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40">
          Actions
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
          </motion.span>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute z-50 mt-1 w-56 overflow-hidden rounded-xl border cs-border shadow-2xl"
              style={{ background: "var(--card-surface)", top: "100%" }}
            >
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { setOpen(false); setLastAction(item.label); }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[12px] font-medium transition cs-hover"
                    style={{ color: item.color }}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    <span className="flex-1">{item.label}</span>
                    {item.hint && (
                      <kbd className="rounded border cs-border px-1.5 py-0.5 text-[9px] font-mono cs-subtle">{item.hint}</kbd>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {lastAction && (
        <p className="mt-2 text-center text-[10.5px] cs-subtle">
          Last action: <span className="font-semibold cs-text">{lastAction}</span>
        </p>
      )}
    </section>
  );
}

// ── 2. Hover menu — opens on hover with delay ──
function HoverMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const items = [
    { label: "Download", icon: Download, color: "#10b981" },
    { label: "Share", icon: Share2, color: "#8b5cf6" },
    { label: "Report", icon: Flag, color: "#f59e0b" },
    { label: "Star", icon: Star, color: "#ec4899" },
  ];
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-violet-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">02</span>
        <h3 className="text-[12px] font-bold cs-text">Hover Menu</h3>
        <span className="text-[10.5px] cs-subtle">— hover trigger · click to select</span>
      </header>
      <div className="relative flex justify-center py-4"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
        <div className="flex items-center gap-2 rounded-xl border cs-border cs-input px-4 py-2.5 text-[12px] font-semibold cs-text">
          Hover Me
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
          </motion.span>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1 w-44 overflow-hidden rounded-xl border cs-border shadow-2xl"
              style={{ background: "var(--card-surface)", top: "100%" }}
            >
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(item.label)}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[12px] font-medium transition cs-hover"
                    style={{ color: selected === item.label ? item.color : "var(--card-text-muted)" }}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {item.label}
                    {selected === item.label && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {selected && (
        <p className="mt-2 text-center text-[10.5px] cs-subtle">
          Selected: <span className="font-semibold cs-text">{selected}</span>
        </p>
      )}
    </section>
  );
}

// ── 3. Nested menu — items with sub-items (FIXED: click + hover work together) ──
type MenuItem = {
  label: string;
  icon: typeof Pencil;
  action?: string;
  danger?: boolean;
  hint?: string;
  sub?: { label: string; icon: typeof Copy; color?: string }[];
};

const MENU: MenuItem[] = [
  { label: "Rename", icon: Edit3, action: "rename", hint: "F2" },
  { label: "Move to", icon: Move, sub: [
    { label: "Documents", icon: FolderOpen, color: "#3b82f6" },
    { label: "Downloads", icon: FolderOpen, color: "#10b981" },
    { label: "Archive", icon: Archive, color: "#f59e0b" },
  ]},
  { label: "Share", icon: Share2, sub: [
    { label: "Copy Link", icon: Link2, color: "#10b981" },
    { label: "Email", icon: Mail, color: "#3b82f6" },
    { label: "Message", icon: MessageCircle, color: "#8b5cf6" },
    { label: "Send", icon: Send, color: "#ec4899" },
  ]},
  { label: "Export as", icon: Download, sub: [
    { label: "PDF", icon: FileText, color: "#ef4444" },
    { label: "Image", icon: ImageIcon, color: "#8b5cf6" },
    { label: "Video", icon: Video, color: "#06b6d4" },
  ]},
  { label: "Properties", icon: Info, action: "properties" },
  { label: "Delete", icon: Trash2, action: "delete", danger: true },
];

function NestedMenu() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSubOpen(null);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleRootClick = (item: MenuItem) => {
    if (item.sub) {
      // Toggle the sub-menu open/closed on click
      setSubOpen(prev => prev === item.label ? null : item.label);
    } else {
      // Leaf action — close everything
      setOpen(false);
      setSubOpen(null);
      setLastAction(item.label);
    }
  };

  const handleSubClick = (parent: string, child: string) => {
    setOpen(false);
    setSubOpen(null);
    setLastAction(`${parent} → ${child}`);
  };

  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-rose-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">03</span>
        <h3 className="text-[12px] font-bold cs-text">Nested Menu</h3>
        <span className="text-[10.5px] cs-subtle">— click or hover to expand sub-menus</span>
      </header>
      <div ref={ref} className="relative flex justify-center py-4">
        <motion.button type="button" onClick={() => { setOpen(o => !o); setSubOpen(null); }} whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 rounded-xl border cs-border cs-input px-4 py-2.5 text-[12px] font-semibold cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40">
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={2.2} />
          Nested Menu
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              // ⚠ overflow-VISIBLE so sub-menus (positioned absolute left-full) are not clipped
              className="absolute z-50 mt-1 w-52 rounded-xl border cs-border shadow-2xl"
              style={{ background: "var(--card-surface)", top: "100%" }}
            >
              {MENU.map((item, i) => {
                const Icon = item.icon;
                const isSubOpen = subOpen === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    // Hover also opens sub-menu (in addition to click)
                    onMouseEnter={() => item.sub && setSubOpen(item.label)}
                  >
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => handleRootClick(item)}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[12px] font-medium transition cs-hover"
                      style={{ color: item.danger ? "#ef4444" : "var(--card-text-muted)" }}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      <span className="flex-1">{item.label}</span>
                      {item.hint && (
                        <kbd className="rounded border cs-border px-1.5 py-0.5 text-[9px] font-mono cs-subtle">{item.hint}</kbd>
                      )}
                      {item.sub && (
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${isSubOpen ? "rotate-90" : "-rotate-90"}`}
                          strokeWidth={2.2}
                          style={{ color: "var(--card-text-subtle)" }}
                        />
                      )}
                    </motion.button>

                    {/* Sub-menu — positioned to the right, overflow-visible parent lets it show */}
                    <AnimatePresence>
                      {item.sub && isSubOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-1 w-40 rounded-xl border cs-border shadow-2xl"
                          style={{ background: "var(--card-surface)" }}
                        >
                          {item.sub.map((s, si) => {
                            const SIcon = s.icon;
                            return (
                              <motion.button
                                key={s.label}
                                type="button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: si * 0.04 }}
                                onClick={() => handleSubClick(item.label, s.label)}
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[11.5px] font-medium transition cs-hover"
                                style={{ color: s.color ?? "var(--card-text-muted)" }}
                              >
                                <SIcon className="h-3.5 w-3.5" strokeWidth={2} />
                                {s.label}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {lastAction && (
        <p className="mt-2 text-center text-[10.5px] cs-subtle">
          Selected: <span className="font-semibold cs-text">{lastAction}</span>
        </p>
      )}
    </section>
  );
}
