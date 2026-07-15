"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, ChevronRight, ChevronDown, FileText, Folder, Star, Trash2, Settings, Inbox,
  Hash, Bell, MoreHorizontal, Clock,
} from "lucide-react";
import { UnsplashAvatar } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar009 — Notional (Notion-style sidebar + top bar)
// Left sidebar with nested tree, workspace switcher, search trigger, favorites,
// trash. Top bar with breadcrumbs + share + comments + avatar.
// ════════════════════════════════════════════════════════════════════════════

const TREE = [
  {
    label: "Getting Started",
    icon: Folder,
    children: [
      { label: "Welcome", icon: FileText },
      { label: "Quick Tour", icon: FileText },
      { label: "Keyboard Shortcuts", icon: FileText },
    ],
  },
  {
    label: "Product",
    icon: Folder,
    children: [
      { label: "Roadmap", icon: FileText },
      { label: "Releases", icon: FileText },
      { label: "Changelog", icon: FileText },
      { label: "Specs", icon: Folder, children: [{ label: "Auth v2", icon: FileText }, { label: "Mobile App", icon: FileText }] },
    ],
  },
  {
    label: "Engineering",
    icon: Folder,
    children: [{ label: "Architecture", icon: FileText }, { label: "Style Guide", icon: FileText }],
  },
];

const FAVORITES = ["Roadmap", "Design Tokens", "Hiring Plan"];

export function Navbar009Card() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "Getting Started": true, Product: true, Specs: false });
  const [active, setActive] = useState("Welcome");

  const toggle = (label: string) => setExpanded((p) => ({ ...p, [label]: !p[label] }));

  return (
    <div
      data-navbar009
      className="flex min-h-full"
      style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#37352f" }}
    >
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-black/10 bg-[#fbfbfa]">
        {/* Workspace switcher */}
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-black/5">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-orange-400 to-rose-500 text-xs font-bold text-white">
            A
          </div>
          <span className="flex-1 text-left font-medium">Acme Inc</span>
          <ChevronDown className="h-3.5 w-3.5 text-black/40" />
        </button>

        {/* Quick actions */}
        <div className="px-2 py-1">
          <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-black/70 hover:bg-black/5">
            <Search className="h-4 w-4" /> Search
            <kbd className="ml-auto rounded bg-black/5 px-1 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>⌘K</kbd>
          </button>
          <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-black/5">
            <Inbox className="h-4 w-4 text-black/70" /> Inbox
            <span className="ml-auto rounded bg-rose-100 px-1.5 text-[10px] font-semibold text-rose-700">3</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-black/5">
            <Settings className="h-4 w-4 text-black/70" /> Settings
          </button>
        </div>

        {/* Favorites */}
        <div className="mt-2 px-2">
          <p className="px-2 py-1 text-[11px] uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Favorites
          </p>
          {FAVORITES.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex w-full items-center gap-2 rounded px-2 py-1 text-sm hover:bg-black/5 ${active === f ? "bg-black/5" : ""}`}
            >
              <Star className="h-3.5 w-3.5 text-amber-500" fill="currentColor" /> {f}
            </button>
          ))}
        </div>

        {/* Tree */}
        <div className="mt-2 flex-1 overflow-y-auto px-2 pb-2">
          <p className="px-2 py-1 text-[11px] uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Workspace
          </p>
          {TREE.map((node) => (
            <TreeItem
              key={node.label}
              node={node}
              expanded={expanded}
              toggle={toggle}
              active={active}
              setActive={setActive}
              depth={0}
            />
          ))}
          <button className="mt-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-black/50 hover:bg-black/5">
            <Plus className="h-4 w-4" /> New page
          </button>
        </div>

        {/* Trash */}
        <div className="border-t border-black/10 px-2 py-2">
          <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-black/60 hover:bg-black/5">
            <Trash2 className="h-4 w-4" /> Trash
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 border-t border-black/10 p-2">
          <UnsplashAvatar seed="photo-1535713875002-d1d0cf377fde" alt="User" size={26} className="rounded-full" />
          <div className="flex-1 text-xs">
            <p className="font-medium">Jordan Lee</p>
            <p className="text-black/50">Free Plan</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-black/40" />
        </div>
      </aside>

      {/* Top bar */}
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex h-11 items-center justify-between border-b border-black/10 bg-white/80 px-4 text-sm backdrop-blur-xl">
          <div className="flex items-center gap-1 text-black/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <span>Getting Started</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black">{active}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded px-2 py-1 text-xs hover:bg-black/5">Share</button>
            <button className="rounded px-2 py-1 text-xs hover:bg-black/5">
              <Bell className="h-3.5 w-3.5" />
            </button>
            <button className="rounded px-2 py-1 text-xs hover:bg-black/5">
              <Clock className="h-3.5 w-3.5" />
            </button>
            <button className="rounded px-2 py-1 text-xs hover:bg-black/5">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Document body */}
        <div className="mx-auto max-w-3xl px-12 py-16">
          <Hash className="h-12 w-12 text-black/20" />
          <h1 className="mt-4 text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            {active}
          </h1>
          <p className="mt-3 text-sm text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Last edited 2 minutes ago · 1,247 words
          </p>
          <div className="mt-8 space-y-3 text-[15px] leading-relaxed text-black/70">
            <p>This is a Notion-style document with a sidebar tree. Click any page in the sidebar to switch the active document.</p>
            <p>The sidebar supports nested folders — expand and collapse any node by clicking the chevron. Favorites are pinned to the top for quick access.</p>
            <p>Hover any item to see more options. The top bar shows breadcrumbs, share button, comments, history, and an overflow menu.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TreeNode {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: TreeNode[];
}

function TreeItem({
  node, expanded, toggle, active, setActive, depth,
}: {
  node: TreeNode;
  expanded: Record<string, boolean>;
  toggle: (label: string) => void;
  active: string;
  setActive: (s: string) => void;
  depth: number;
}) {
  const isOpen = expanded[node.label];
  const hasChildren = !!node.children?.length;
  return (
    <div>
      <button
        onClick={() => (hasChildren ? toggle(node.label) : setActive(node.label))}
        className={`group flex w-full items-center gap-1 rounded px-2 py-1 text-sm hover:bg-black/5 ${active === node.label ? "bg-black/5" : ""}`}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        {hasChildren ? (
          <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-black/40">
            <ChevronRight className="h-3 w-3" />
          </motion.span>
        ) : (
          <span className="w-3" />
        )}
        <node.icon className="h-3.5 w-3.5 text-black/60" />
        <span className="flex-1 text-left">{node.label}</span>
      </button>
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {node.children!.map((c) => (
              <TreeItem key={c.label} node={c} expanded={expanded} toggle={toggle} active={active} setActive={setActive} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
