"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { Clock, Cpu, Palette, PenTool, Users, Video } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// TeamDirectoryCard — premium team availability.
// Navy + coral palette. Team member rows with status dots (online / away /
// busy / offline), role filters (All / Design / Engineering / PM) with a
// layoutId sliding pill, a hover profile preview popover (portaled to body
// so it escapes the scroll container's overflow clipping), and a
// "Start standup" meeting CTA.

type Status = "online" | "away" | "busy" | "offline";
type Role = "Design" | "Engineering" | "PM";

interface Member {
  id: string;
  name: string;
  role: Role;
  title: string;
  status: Status;
  tz: string;
  avatar: string;
  focus: string;
}

const TEAM: Member[] = [
  {
    id: "m1",
    name: "Ava Reyes",
    role: "Design",
    title: "Lead Product Designer",
    status: "online",
    tz: "Berlin · 14:02",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    focus: "Onboarding redesign",
  },
  {
    id: "m2",
    name: "Noah Kim",
    role: "Engineering",
    title: "Staff Frontend Engineer",
    status: "busy",
    tz: "Seoul · 21:02",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    focus: "Shipping billing v3",
  },
  {
    id: "m3",
    name: "Maya Singh",
    role: "PM",
    title: "Group Product Manager",
    status: "away",
    tz: "London · 13:02",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    focus: "Q3 roadmap review",
  },
  {
    id: "m4",
    name: "Leo Martín",
    role: "Engineering",
    title: "Backend Engineer",
    status: "online",
    tz: "Madrid · 14:02",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    focus: "Rate-limit service",
  },
  {
    id: "m5",
    name: "Iris Chen",
    role: "Design",
    title: "Motion Designer",
    status: "offline",
    tz: "Taipei · 20:02",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    focus: "Brand film storyboard",
  },
];

const FILTERS = [
  { id: "all", label: "All", icon: Users },
  { id: "Design", label: "Design", icon: PenTool },
  { id: "Engineering", label: "Engineering", icon: Cpu },
  { id: "PM", label: "PM", icon: Palette },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const STATUS_META: Record<Status, { dot: string; ring: string; label: string }> = {
  online: { dot: "bg-emerald-500", ring: "ring-emerald-500/30", label: "Online" },
  busy: { dot: "bg-rose-500", ring: "ring-rose-500/30", label: "Busy" },
  away: { dot: "bg-amber-500", ring: "ring-amber-500/30", label: "Away" },
  offline: { dot: "bg-zinc-400", ring: "ring-zinc-400/30", label: "Offline" },
};

export function TeamDirectoryCard() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  // Row rect for the portaled preview — set on hover start.
  const [hoverRect, setHoverRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = TEAM.filter((m) => filter === "all" || m.role === filter);
  const onlineCount = TEAM.filter((m) => m.status === "online").length;

  const startHover = useCallback((id: string, el: HTMLElement | null) => {
    // Guard against null element — framer-motion's onHoverStart can pass a
    // stale/null currentTarget during rapid hover transitions or when the
    // element unmounts mid-animation.
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Skip if the rect is zero-sized (element not yet laid out)
    if (r.width === 0 && r.height === 0) return;
    setHoverRect({ top: r.bottom + 6, left: r.left, width: r.width });
    setHovered(id);
  }, []);

  const endHover = useCallback(() => {
    setHovered(null);
    setHoverRect(null);
  }, []);

  // Close preview on scroll/resize.
  useEffect(() => {
    if (!hovered) return;
    const close = () => endHover();
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [hovered, endHover]);

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient navy/coral glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 12%, rgba(30,58,138,0.20), transparent 55%), radial-gradient(circle at 80% 90%, rgba(249,115,22,0.14), transparent 60%)",
        }}
      />

      <article className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.4)]">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pb-3 pt-5">
          <div>
            <h2 className="text-[16px] font-bold leading-tight cs-text">Team availability</h2>
            <p className="mt-0.5 text-[11px] cs-muted">
              {onlineCount} of {TEAM.length} online · 3 timezones
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-blue-300/40 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
            <Clock className="h-3 w-3" strokeWidth={2.4} />
            Standup 16:30
          </span>
        </header>

        {/* Filters */}
        <LayoutGroup id="team-filters">
          <div className="flex gap-1 px-5 pb-3">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className="relative flex flex-1 items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-[10.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  aria-pressed={active}
                >
                  {active && (
                    <motion.span
                      layoutId="team-pill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <f.icon
                    className={`relative z-10 h-3 w-3 ${active ? "text-white" : "cs-muted"}`}
                    strokeWidth={2.4}
                  />
                  <span className={`relative z-10 ${active ? "text-white" : "cs-muted"}`}>
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Members */}
        <div ref={listRef} className="relative max-h-[320px] overflow-y-auto scrollbar-modern">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((m, i) => {
              const s = STATUS_META[m.status];
              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.32, ease: EASE, delay: i * 0.04 }}
                  onHoverStart={(e) => {
                    // framer-motion's onHoverStart event can have a null
                    // currentTarget during rapid transitions — guard it.
                    const target = (e as unknown as { currentTarget?: HTMLElement | null })?.currentTarget;
                    if (target) startHover(m.id, target);
                  }}
                  onHoverEnd={endHover}
                  onFocus={(e) => startHover(m.id, e.currentTarget)}
                  onBlur={endHover}
                  className="relative flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-500/5"
                >
                  <div className="relative shrink-0">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10">
                      <Image src={m.avatar} alt={m.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${s.dot} dark:border-zinc-900`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold cs-text">{m.name}</p>
                    <p className="truncate text-[10.5px] cs-muted">{m.title}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className={`text-[10px] font-semibold ${m.status === "online" ? "text-emerald-600 dark:text-emerald-300" : "cs-subtle"}`}>
                      {s.label}
                    </span>
                    <span className="text-[9.5px] cs-subtle">{m.tz}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" strokeWidth={1.8} />
              </span>
              <p className="mt-2.5 text-[12.5px] font-semibold cs-text">No one in this role</p>
              <p className="mt-0.5 text-[11px] cs-muted">Try a different filter.</p>
            </div>
          )}
        </div>

        {/* Standup CTA — disables when no one is online. */}
        <div className="border-t cs-border p-4">
          <motion.button
            type="button"
            whileTap={onlineCount > 0 ? { scale: 0.97 } : undefined}
            disabled={onlineCount === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <Video className="h-4 w-4" strokeWidth={2.2} />
            {onlineCount > 0 ? `Start standup with ${onlineCount} online` : "No one online right now"}
          </motion.button>
        </div>
      </article>

      {/* Hover preview popover — portaled to document.body so it escapes the
          scroll container's overflow clipping. Position is computed from the
          hovered row's bounding rect. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && hoverRect && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: EASE }}
                role="tooltip"
                style={{
                  position: "fixed",
                  top: hoverRect.top,
                  left: hoverRect.left,
                  width: hoverRect.width,
                  zIndex: 9999,
                }}
                className="cs-surface rounded-xl border cs-border p-3 shadow-xl"
              >
                {(() => {
                  const m = TEAM.find((x) => x.id === hovered);
                  if (!m) return null;
                  const s = STATUS_META[m.status];
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-400/40">
                          <Image src={m.avatar} alt={m.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-bold cs-text">{m.name}</p>
                          <p className="truncate text-[11px] text-orange-600 dark:text-orange-300">{m.title}</p>
                        </div>
                      </div>
                      <div className="mt-2.5 space-y-1.5 border-t cs-border pt-2">
                        <Row label="Focus" value={m.focus} />
                        <Row label="Local time" value={m.tz.split("·")[1]?.trim() ?? ""} />
                        <Row label="Status" value={s.label} />
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-wider cs-subtle">{label}</span>
      <span className="text-[11px] font-medium cs-text">{value}</span>
    </div>
  );
}
