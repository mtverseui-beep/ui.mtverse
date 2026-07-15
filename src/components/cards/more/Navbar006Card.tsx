"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BatteryMedium, Wifi, Home, Folder, Mail, MessageSquare, Music, Camera, Settings,
  Cpu, FileText, Terminal, Calendar, ChevronDown,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar006 — macOS Desktop (menu bar + magnifying dock)
// Night gradient wallpaper + top menu bar with dropdowns + bottom frosted dock
// with cursor-distance magnification + running indicators + live clock.
// ════════════════════════════════════════════════════════════════════════════

const MENUS = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"];

const MENU_ITEMS: Record<string, { label: string; shortcut?: string; divider?: boolean }[]> = {
  Finder: [
    { label: "About Finder" },
    { label: "Preferences…", shortcut: "⌘," },
    { label: "", divider: true },
    { label: "Empty Trash…", shortcut: "⇧⌘⌫" },
  ],
  File: [
    { label: "New Finder Window", shortcut: "⌘N" },
    { label: "New Folder", shortcut: "⇧⌘N" },
    { label: "Open", shortcut: "⌘O" },
    { label: "", divider: true },
    { label: "Close Window", shortcut: "⌘W" },
  ],
  Edit: [
    { label: "Undo", shortcut: "⌘Z" },
    { label: "Redo", shortcut: "⇧⌘Z" },
    { label: "", divider: true },
    { label: "Cut", shortcut: "⌘X" },
    { label: "Copy", shortcut: "⌘C" },
    { label: "Paste", shortcut: "⌘V" },
  ],
  View: [{ label: "as Icons" }, { label: "as List" }, { label: "as Columns" }, { label: "as Gallery" }],
  Go: [{ label: "Back", shortcut: "⌘[" }, { label: "Forward", shortcut: "⌘]" }, { label: "", divider: true }, { label: "Documents" }, { label: "Downloads" }],
  Window: [{ label: "Minimize", shortcut: "⌘M" }, { label: "Zoom" }],
  Help: [{ label: "Search", shortcut: "⌘?" }, { label: "macOS Help" }],
};

const DOCK = [
  { id: "finder", label: "Finder", icon: Home, color: "#3b82f6", running: true },
  { id: "files", label: "Files", icon: Folder, color: "#22d3ee", running: true },
  { id: "mail", label: "Mail", icon: Mail, color: "#818cf8" },
  { id: "messages", label: "Messages", icon: MessageSquare, color: "#34d399", running: true },
  { id: "music", label: "Music", icon: Music, color: "#fb7185" },
  { id: "photos", label: "Photos", icon: Camera, color: "#f59e0b" },
  { id: "calendar", label: "Calendar", icon: Calendar, color: "#ef4444" },
  { id: "notes", label: "Notes", icon: FileText, color: "#facc15" },
  { id: "terminal", label: "Terminal", icon: Terminal, color: "#6b7280", running: true },
  { id: "settings", label: "Settings", icon: Settings, color: "#94a3b8" },
];

export function Navbar006Card() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [now, setNow] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      setNow(`${days[d.getDay()]} ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const scaleFor = (i: number) => {
    if (mouseX === null) return 1;
    const width = 52;
    const center = i * (width + 8) + width / 2;
    const dist = Math.abs(mouseX - center);
    const max = 140;
    if (dist > max) return 1;
    return 1 + (1 - dist / max) * 0.7;
  };

  return (
    <div
      data-navbar006
      className="relative min-h-full"
      style={{
        background: "linear-gradient(160deg,#1e3a8a 0%,#312e81 45%,#0f172a 100%)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Soft light orbs */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-64 w-64 rounded-full bg-sky-400/20 blur-[90px]" />
      <div className="pointer-events-none absolute right-10 top-32 h-64 w-64 rounded-full bg-fuchsia-400/15 blur-[90px]" />

      {/* Top menu bar */}
      <header className="sticky top-0 z-40 flex h-7 items-center gap-4 bg-black/25 px-3 text-[12.5px] text-white backdrop-blur-xl">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white">
          <path d="M17 12c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7C7.9 7.4 6.6 8.2 6 9.3 4.6 11.6 5.6 15 7 16.8c.7.9 1.5 1.9 2.5 1.9s1.4-.6 2.6-.6 1.5.6 2.6.6 1.7-.9 2.4-1.8c.5-.7.8-1.4.8-1.5-.1 0-2.9-1.1-2.9-3.4M14.5 6.3c.6-.7 1-1.6.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 1.9-.5 2.5-1.2" />
        </svg>
        {MENUS.map((m) => (
          <button
            key={m}
            onClick={() => setOpenMenu(openMenu === m ? null : m)}
            onMouseEnter={() => openMenu && setOpenMenu(m)}
            className={`relative px-2 py-0.5 rounded ${openMenu === m ? "bg-white/20" : "hover:bg-white/10"} ${m === "Finder" ? "font-bold" : ""}`}
          >
            {m}
            <AnimatePresence>
              {openMenu === m && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-white/10 bg-neutral-800/95 p-1 text-white shadow-2xl backdrop-blur-xl"
                >
                  {MENU_ITEMS[m].map((item, i) =>
                    item.divider ? (
                      <div key={i} className="my-1 h-px bg-white/10" />
                    ) : (
                      <button
                        key={i}
                        onClick={() => setOpenMenu(null)}
                        className="flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-blue-500"
                      >
                        <span>{item.label}</span>
                        {item.shortcut && <span className="text-white/50 text-[11px]">{item.shortcut}</span>}
                      </button>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <BatteryMedium className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Search className="h-3.5 w-3.5" />
          <span className="tabular-nums">{now}</span>
        </div>
      </header>

      {/* Window content (just for visual richness) */}
      <div className="px-6 pt-10 pb-32 text-white/70">
        <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-white/40">finder — Documents</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["Resume.pdf", "Photos", "Projects", "Notes.txt", "Invoices", "Music", "Movies", "Downloads"].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1.5 rounded-lg p-3 hover:bg-white/10">
                <Folder className="h-8 w-8 text-sky-300" />
                <span className="text-[11px]">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom dock */}
      <div className="sticky bottom-0 z-40 flex justify-center pb-2">
        <div
          ref={dockRef}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMouseX(e.clientX - rect.left);
          }}
          onMouseLeave={() => {
            setMouseX(null);
            setHover(null);
          }}
          className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/10 px-2.5 py-2 backdrop-blur-2xl"
        >
          {DOCK.map((item, i) => {
            const scale = scaleFor(i);
            return (
              <div key={item.id} className="relative flex flex-col items-center" onMouseEnter={() => setHover(item.id)}>
                <motion.button
                  layout
                  animate={{ scale }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => {}}
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" strokeWidth={1.8} />
                </motion.button>
                {item.running && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white/80" />
                )}
                <AnimatePresence>
                  {hover === item.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute -top-8 whitespace-nowrap rounded-md border border-white/10 bg-neutral-800/95 px-2 py-1 text-[11px] text-white"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
