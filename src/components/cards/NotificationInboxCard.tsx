"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reply, Archive, Check, Paperclip, MessageSquare, Inbox, Filter } from "lucide-react";
import { notifications as initialNotifications } from "./data/card-data";
import type { NotificationItem } from "./types";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRIORITY = {
  high: { label: "High", bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-300", dot: "bg-rose-500", border: "border-rose-500/30" },
  normal: { label: "Normal", bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-300", dot: "bg-indigo-500", border: "border-indigo-500/30" },
  low: { label: "Low", bg: "cs-input", text: "cs-muted", dot: "bg-slate-400 dark:bg-white/40", border: "cs-border" },
} as const;

type Action = "reply" | "archive" | "done";

export function NotificationInboxCard() {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [actionedId, setActionedId] = useState<string | null>(null);
  const [actionKind, setActionKind] = useState<Action | null>(null);
  const [actionLabel, setActionLabel] = useState<string>("");

  const visible = items.filter((i) => (filter === "unread" ? !i.read : true));
  const unreadCount = items.filter((i) => !i.read).length;

  const markRead = (id: string) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));

  const handleAction = (id: string, action: Action) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setActionedId(id);
    setActionKind(action);
    setActionLabel(
      action === "reply" ? `Replying to ${item.sender}…`
        : action === "archive" ? `Archived from ${item.sender}`
        : `Marked ${item.sender} as done`,
    );
    if (action !== "reply") {
      setTimeout(() => { setItems((prev) => prev.filter((i) => i.id !== id)); setActionedId(null); setActionKind(null); setActionLabel(""); }, 700);
    } else {
      setTimeout(() => { setActionedId(null); setActionKind(null); setActionLabel(""); markRead(id); }, 1400);
    }
  };

  // True when a row should play its exit (slide-right + fade) animation.
  const isExiting = (id: string) =>
    actionedId === id && (actionKind === "archive" || actionKind === "done");

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,420px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.20), transparent 55%)" }}
      />

      <article className="cs-surface relative overflow-hidden rounded-[16px] cs-border shadow-[0_40px_90px_-40px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.55), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />

        {/* Header */}
        <header className="flex items-center justify-between cs-border-b-subtle px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-gradient-to-b from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-300 shadow-sm">
              <Inbox className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold cs-text">Inbox</h2>
              <p className="text-[10.5px] cs-muted">
                <span className="font-semibold text-indigo-600 dark:text-indigo-300">{unreadCount}</span> unread · {items.length} total
              </p>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Inbox filter"
            className="flex items-center rounded-lg cs-border cs-input p-0.5 text-[11px]"
          >
            <motion.button
              role="radio"
              aria-checked={filter === "all"}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter("all")}
              className="relative flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
            >
              {filter === "all" && (
                <motion.span
                  layoutId="inbox-filter-active"
                  className="absolute inset-0 rounded-md bg-indigo-500 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Filter className="relative h-3 w-3" strokeWidth={2.2} />
              <span
                className={`relative font-semibold transition-colors duration-200 ${
                  filter === "all" ? "text-white" : "cs-muted hover:cs-text"
                }`}
              >
                All
              </span>
            </motion.button>
            <motion.button
              role="radio"
              aria-checked={filter === "unread"}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter("unread")}
              className="relative flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
            >
              {filter === "unread" && (
                <motion.span
                  layoutId="inbox-filter-active"
                  className="absolute inset-0 rounded-md bg-indigo-500 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative font-semibold transition-colors duration-200 ${
                  filter === "unread" ? "text-white" : "cs-muted hover:cs-text"
                }`}
              >
                Unread
              </span>
            </motion.button>
          </div>
        </header>

        {/* Action toast */}
        <AnimatePresence>
          {actionedId && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden border-b border-emerald-400/20 bg-emerald-400/[0.08]"
            >
              <div className="flex items-center gap-2 px-4 py-2 text-[12px] text-emerald-700 dark:text-emerald-200">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </motion.span>
                {actionLabel}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification list — more breathing room */}
        <div className="scrollbar-modern max-h-[340px] overflow-y-auto overflow-x-hidden">
          <AnimatePresence initial={false}>
            {visible.map((item) => {
              const pri = PRIORITY[item.priority];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: isExiting(item.id) ? [1, 1, 0] : 1,
                    x: isExiting(item.id) ? [0, 0, 80] : 0,
                  }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: EASE, times: [0, 0.5, 1] }}
                  className="group/notif relative cs-border-b-subtle last:border-b-0"
                  onMouseEnter={() => !item.read && markRead(item.id)}
                >
                  {/* Unread left rail — refined pulse */}
                  {!item.read && (
                    <motion.span
                      aria-hidden
                      layout
                      className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    />
                  )}

                  <div className="flex gap-3 px-4 py-3.5">
                    {/* Avatar — refined border + status ring */}
                    <div className="relative shrink-0">
                      <div
                        className={`relative h-9 w-9 overflow-hidden rounded-full border-2 shadow-sm ${
                          item.read
                            ? "border-slate-200/60 dark:border-white/10"
                            : "border-indigo-400/50 dark:border-indigo-400/40"
                        }`}
                      >
                        <Image src={item.avatar} alt={item.sender} fill sizes="36px" className="object-cover" />
                      </div>
                      {!item.read && (
                        <motion.span
                          aria-hidden
                          className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        >
                          <motion.span
                            aria-hidden
                            className="absolute inline-flex h-full w-full rounded-full bg-indigo-500"
                            animate={{ opacity: [0, 0.6, 0], scale: [1, 2.2, 2.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500 dark:border-[#0d0f1a]" />
                        </motion.span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`flex items-center gap-1.5 text-[12.5px] ${item.read ? "cs-muted" : "font-semibold cs-text"}`}>
                          {item.sender}
                          {item.threadCount && (
                            <span className="inline-flex items-center gap-0.5 rounded cs-border cs-input px-1 py-0.5 text-[9px] font-medium cs-subtle">
                              <MessageSquare className="h-2 w-2" strokeWidth={2.4} />
                              {item.threadCount}
                            </span>
                          )}
                        </p>
                        <span className="shrink-0 text-[10px] cs-subtle">{item.timestamp}</span>
                      </div>
                      <p className={`mt-0.5 truncate text-[12px] ${item.read ? "cs-muted" : "font-medium cs-text"}`}>{item.subject}</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] cs-subtle">{item.snippet}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        {/* Premium priority badge */}
                        <span
                          className={`inline-flex items-center gap-1 rounded-md border ${pri.border} ${pri.bg} ${pri.text} px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider`}
                        >
                          <span className={`h-1 w-1 rounded-full ${pri.dot}`} />
                          {pri.label}
                        </span>
                        {item.hasAttachment && (
                          <span className="inline-flex items-center gap-1 text-[9.5px] cs-subtle">
                            <Paperclip className="h-2.5 w-2.5" strokeWidth={2} />
                            Attachment
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover action reveal — smooth slide-up */}
                  <div className="overflow-hidden">
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="cs-border-t-subtle cs-input"
                      >
                        <div className="flex items-center justify-end gap-1 px-4 py-1.5">
                          <motion.button
                            type="button"
                            aria-label={`Reply to ${item.sender}`}
                            onClick={() => handleAction(item.id, "reply")}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10.5px] font-medium cs-muted transition cs-hover hover:cs-text hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400/40"
                          >
                            <Reply className="h-3 w-3" strokeWidth={2.2} />
                            Reply
                          </motion.button>
                          <motion.button
                            type="button"
                            aria-label={`Archive thread from ${item.sender}`}
                            onClick={() => handleAction(item.id, "archive")}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10.5px] font-medium cs-muted transition cs-hover hover:cs-text hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400/40"
                          >
                            <Archive className="h-3 w-3" strokeWidth={2.2} />
                            Archive
                          </motion.button>
                          <motion.button
                            type="button"
                            aria-label={`Mark ${item.sender} as done`}
                            onClick={() => handleAction(item.id, "done")}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10.5px] font-medium text-emerald-600 transition cs-hover hover:bg-emerald-500/10 dark:text-emerald-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/40"
                          >
                            <Check className="h-3 w-3" strokeWidth={2.4} />
                            Done
                          </motion.button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full cs-border cs-input cs-subtle">
                <Inbox className="h-4 w-4" strokeWidth={1.9} />
              </div>
              <p className="mt-2.5 text-[12.5px] cs-muted">All caught up</p>
              <p className="mt-0.5 text-[11px] cs-subtle">No {filter === "unread" ? "unread " : ""}notifications to show.</p>
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between cs-border-t-subtle px-4 py-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setItems((prev) => prev.map((i) => ({ ...i, read: true })))}
            className="text-[11px] font-medium cs-muted transition hover:cs-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400/40 rounded px-1 py-0.5"
          >
            Mark all as read
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            className="rounded-md bg-gradient-to-r from-indigo-500 to-indigo-400 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.7)] transition hover:shadow-[0_8px_20px_-6px_rgba(99,102,241,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          >
            View all
          </motion.button>
        </footer>
      </article>
    </motion.div>
  );
}
