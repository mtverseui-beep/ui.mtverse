"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import {
  AlertTriangle,
  Archive,
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  Heart,
  Info,
  Trash2,
  UserPlus,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// NotificationStylesCard — a single functional premium notification center.
// Indigo + sky palette. Priority filter tabs (All / High / Normal / Low) with
// a layoutId sliding pill, unread pulse indicators, AnimatePresence row
// stagger on filter change, and per-row quick actions (mark read, archive,
// delete). Avatars + status icons ground each notification.

type Priority = "high" | "normal" | "low";

interface Notif {
  id: string;
  avatar: string;
  name: string;
  title: string;
  body: string;
  time: string;
  priority: Priority;
  unread: boolean;
  kind: "mention" | "follow" | "alert" | "like" | "system" | "success";
}

const SEED: Notif[] = [
  {
    id: "n1",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    name: "Priya Nair",
    title: "Priya mentioned you in the design review",
    body: "“@you Can you take a look at the spacing on the hero before we ship?”",
    time: "2m ago",
    priority: "high",
    unread: true,
    kind: "mention",
  },
  {
    id: "n2",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    name: "Marcus Lee",
    title: "Marcus sent you a follow request",
    body: "Frontend engineer · 14 mutual connections",
    time: "18m ago",
    priority: "normal",
    unread: true,
    kind: "follow",
  },
  {
    id: "n3",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    name: "System Alert",
    title: "Build pipeline failed on main",
    body: "Step “Deploy preview” exited with code 1 · retry available",
    time: "1h ago",
    priority: "high",
    unread: true,
    kind: "alert",
  },
  {
    id: "n4",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    name: "Elena Rossi",
    title: "Elena liked your article “Quiet UI”",
    body: "Your piece is trending in the Design tag",
    time: "3h ago",
    priority: "low",
    unread: false,
    kind: "like",
  },
  {
    id: "n5",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    name: "Sam Okafor",
    title: "Sam approved your pull request #842",
    body: "“LGTM — nice cleanup on the reducer.” Ready to merge.",
    time: "5h ago",
    priority: "normal",
    unread: false,
    kind: "success",
  },
  {
    id: "n6",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    name: "Atlas Workspace",
    title: "Weekly usage summary is ready",
    body: "You shipped 23 tasks this week — 14% above your average.",
    time: "1d ago",
    priority: "low",
    unread: false,
    kind: "system",
  },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "high", label: "High" },
  { id: "normal", label: "Normal" },
  { id: "low", label: "Low" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const KIND_ICON = {
  mention: { Icon: Info, tone: "text-sky-600 dark:text-sky-300" },
  follow: { Icon: UserPlus, tone: "text-indigo-600 dark:text-indigo-300" },
  alert: { Icon: AlertTriangle, tone: "text-rose-600 dark:text-rose-300" },
  like: { Icon: Heart, tone: "text-pink-600 dark:text-pink-300" },
  system: { Icon: Clock, tone: "text-slate-500 dark:text-slate-300" },
  success: { Icon: CheckCircle2, tone: "text-emerald-600 dark:text-emerald-300" },
} as const;

export function NotificationStylesCard() {
  const [items, setItems] = useState<Notif[]>(SEED);
  const [tab, setTab] = useState<TabId>("all");

  const visible = items.filter((n) => tab === "all" || n.priority === tab);
  const unreadCount = items.filter((n) => n.unread).length;

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const archive = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));
  const remove = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));
  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient indigo glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(circle at 85% 90%, rgba(14,165,233,0.14), transparent 60%)",
        }}
      />

      <article className="cs-surface relative flex max-h-[560px] flex-col overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)]">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pb-3 pt-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
              <Bell className="h-4 w-4 text-indigo-600 dark:text-indigo-300" strokeWidth={2.2} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </span>
            <div>
              <h2 className="text-[15px] font-bold leading-tight cs-text">Inbox</h2>
              <p className="text-[11px] cs-muted">{unreadCount} unread · 6 total</p>
            </div>
          </div>
          <motion.button
            type="button"
            onClick={markAllRead}
            whileTap={{ scale: 0.97 }}
            aria-label="Mark all as read"
            className="flex items-center gap-1 rounded-full border border-indigo-300/50 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 transition hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
          >
            <CheckCheck className="h-3 w-3" strokeWidth={2.4} />
            Mark all
          </motion.button>
        </header>

        {/* Filter tabs with layoutId pill */}
        <LayoutGroup id="notif-tabs">
          <div className="flex gap-1 px-5 pb-3">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className="relative flex-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
                >
                  {active && (
                    <motion.span
                      layoutId="notif-pill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active ? "text-white" : "cs-muted"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* List */}
        <div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((n, i) => {
              const { Icon, tone } = KIND_ICON[n.kind];
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.34, ease: EASE, delay: i * 0.05 }}
                  className="group relative flex gap-3 px-5 py-3 transition-colors hover:bg-indigo-50/60 dark:hover:bg-indigo-500/5"
                >
                  {/* unread rail */}
                  {n.unread && (
                    <span className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-indigo-500 to-sky-500" />
                  )}

                  {/* avatar */}
                  <div className="relative shrink-0">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10">
                      <Image src={n.avatar} alt={n.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                      <Icon className={`h-3 w-3 ${tone}`} strokeWidth={2.4} />
                    </span>
                  </div>

                  {/* body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[12.5px] font-semibold cs-text">
                        {n.title}
                      </p>
                      <span className="shrink-0 text-[10px] cs-subtle">{n.time}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug cs-muted">
                      {n.body}
                    </p>

                    {/* quick actions */}
                    <div className="mt-1.5 flex items-center gap-1 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100">
                      {n.unread && (
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.92 }}
                          onClick={() => markRead(n.id)}
                          aria-label="Mark as read"
                          className="flex h-6 items-center gap-1 rounded-md border border-indigo-300/40 bg-indigo-50/70 px-1.5 text-[10px] font-medium text-indigo-700 transition hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
                        >
                          <CheckCheck className="h-3 w-3" strokeWidth={2.4} />
                          Read
                        </motion.button>
                      )}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => archive(n.id)}
                        aria-label="Archive notification"
                        className="flex h-6 w-6 items-center justify-center rounded-md border cs-border cs-muted transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40"
                      >
                        <Archive className="h-3 w-3" strokeWidth={2.2} />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => remove(n.id)}
                        aria-label="Delete notification"
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-rose-300/40 text-rose-500 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40 dark:border-rose-500/30 dark:hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={2.2} />
                      </motion.button>
                    </div>
                  </div>

                  {/* unread pulse dot */}
                  {n.unread && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500">
                      <span className="block h-2 w-2 animate-ping rounded-full bg-sky-400/70" />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                <CheckCircle2 className="h-6 w-6 text-indigo-500" strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-[13px] font-semibold cs-text">All caught up</p>
              <p className="mt-0.5 text-[11px] cs-muted">No notifications in this view.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t cs-border px-5 py-2.5 text-center">
          <button
            type="button"
            className="text-[11px] font-medium text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:text-indigo-300"
          >
            View all notifications →
          </button>
        </footer>
      </article>
    </motion.div>
  );
}
