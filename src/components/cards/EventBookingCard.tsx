"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Check, X, Users, Sparkles } from "lucide-react";
import { eventBooking } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;

type RSVP = "going" | "maybe" | "not-going" | null;

export function EventBookingCard() {
  const event = eventBooking;
  const [rsvp, setRsvp] = useState<RSVP>("going");
  const [hoveredAttendee, setHoveredAttendee] = useState<number | null>(null);

  const seatsTaken = event.totalSeats - event.seatsLeft;
  const seatPct = Math.round((seatsTaken / event.totalSeats) * 100);
  // Urgency tier — drives availability badge styling.
  const urgent = event.seatsLeft <= 25;

  const RSVP_OPTIONS: { value: RSVP; label: string }[] = [
    { value: "going", label: "Going" },
    { value: "maybe", label: "Maybe" },
    { value: "not-going", label: "Can't go" },
  ];

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97, rotate: -1 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.22), transparent 55%), radial-gradient(circle at 75% 80%, rgba(34,211,238,0.14), transparent 60%)",
        }}
      />

      <article className="cs-surface relative overflow-hidden rounded-[20px] cs-border shadow-[0_40px_90px_-40px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        {/* Cover with richer overlay */}
        <div className="relative h-[160px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={event.cover} alt={`${event.title} venue`} fill sizes="380px" priority className="object-cover" />
          </motion.div>
          {/* Premium multi-stop gradient overlay */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(88,28,135,0.40) 0%, transparent 30%, transparent 55%, var(--card-surface) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(0,0,0,0.30), transparent 70%)",
            }}
          />

          {/* Date block — premium with refined typography */}
          <motion.div
            initial={{ opacity: 0, y: -10, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center overflow-hidden rounded-xl border border-violet-300/40 bg-[var(--card-surface)]/85 shadow-[0_10px_30px_-10px_rgba(88,28,135,0.6)] backdrop-blur-xl"
          >
            {/* Top accent */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">{event.month}</span>
            <span
              className="text-[26px] font-bold leading-none cs-text tabular-nums"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "-0.02em" }}
            >
              {event.day}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-violet-300/30 bg-[var(--card-surface)]/70 px-2.5 py-1 text-[10.5px] font-medium cs-text backdrop-blur-xl"
          >
            <Sparkles className="h-3 w-3 text-violet-500 dark:text-violet-300" strokeWidth={2.2} />
            {event.category}
          </motion.span>

          {/* Availability badge — clearer urgency */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <motion.span
              animate={urgent ? { boxShadow: ["0 0 0 0 rgba(245,158,11,0.45)", "0 0 0 8px rgba(245,158,11,0)"] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/20 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-amber-700 backdrop-blur-md dark:text-amber-200"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-amber-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              Only {event.seatsLeft} seats left
            </motion.span>
            <span className="rounded-full cs-border bg-[var(--card-surface)]/70 px-2 py-0.5 text-[10.5px] font-medium cs-muted backdrop-blur-md">
              {seatPct}% booked
            </span>
          </div>
        </div>

        {/* Ticket perforation */}
        <div aria-hidden className="relative flex items-center">
          <div className="h-4 w-4 -ml-2 rounded-full bg-[var(--card-surface)] ring-1 ring-violet-500/20" />
          <div className="h-px flex-1 border-t border-dashed border-violet-500/25" />
          <div className="h-4 w-4 -mr-2 rounded-full bg-[var(--card-surface)] ring-1 ring-violet-500/20" />
        </div>

        <div className="relative px-5 pt-3">
          <h2 className="text-[18px] font-semibold leading-tight cs-text">{event.title}</h2>

          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center gap-2.5 text-[12.5px] cs-muted">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg cs-border cs-input text-violet-600 dark:text-violet-300 shadow-sm">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              {event.time}
            </li>
            <li className="flex items-center gap-2.5 text-[12.5px] cs-muted">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg cs-border cs-input text-cyan-600 dark:text-cyan-300 shadow-sm">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              {event.location}
            </li>
          </ul>

          {/* Seat availability */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="cs-muted">{seatsTaken} / {event.totalSeats} seats booked</span>
              <span className="font-mono cs-subtle">{seatPct}%</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full cs-input">
              <motion.div
                className="relative h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${seatPct}%` }}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Attendees — better overlap + hover reveal */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {event.attendees.map((a, i) => (
                  <motion.button
                    key={a.src}
                    type="button"
                    aria-label={`View attendee ${i + 1}`}
                    initial={{ opacity: 0, x: -8, scale: 0.6 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: EASE }}
                    onHoverStart={() => setHoveredAttendee(i)}
                    onHoverEnd={() => setHoveredAttendee(null)}
                    whileTap={{ scale: 0.94 }}
                    className="relative -ml-2.5 first:ml-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 rounded-full"
                    style={{ zIndex: hoveredAttendee === i ? 30 : 10 + i }}
                  >
                    <motion.div
                      animate={{ scale: hoveredAttendee === i ? 1.15 : 1, y: hoveredAttendee === i ? -3 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[var(--card-surface)] shadow-sm"
                    >
                      <Image src={a.src} alt={a.alt} fill sizes="32px" className="object-cover" />
                    </motion.div>
                    <AnimatePresence>
                      {hoveredAttendee === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="cs-surface pointer-events-none absolute -top-9 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-md cs-border px-2 py-1 text-[10px] font-medium cs-text shadow-xl backdrop-blur-md"
                        >
                          {a.alt.replace("Attendee portrait of ", "")}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
                <span className="ml-3 flex h-8 items-center rounded-full cs-border cs-input px-2.5 text-[10.5px] font-medium cs-muted">
                  +{(seatsTaken - event.attendees.length).toLocaleString()} more
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11.5px] cs-muted">
              <Users className="h-3.5 w-3.5 text-violet-500 dark:text-violet-300" strokeWidth={1.9} />
              Going
            </span>
          </div>

          {/* RSVP — smoother selection animation */}
          <div className="mt-4">
            <div role="radiogroup" aria-label="RSVP to this event" className="grid grid-cols-3 gap-2">
              {RSVP_OPTIONS.map((opt) => {
                const active = rsvp === opt.value;
                const tone =
                  opt.value === "going"
                    ? "emerald"
                    : opt.value === "maybe"
                    ? "amber"
                    : "rose";
                const toneClasses: Record<string, string> = {
                  emerald: "border-emerald-500/50 bg-emerald-500/15 text-emerald-600 dark:text-emerald-200 ring-emerald-500/20",
                  amber: "border-amber-500/50 bg-amber-500/15 text-amber-600 dark:text-amber-200 ring-amber-500/20",
                  rose: "border-rose-500/50 bg-rose-500/15 text-rose-600 dark:text-rose-200 ring-rose-500/20",
                };
                return (
                  <motion.button
                    key={opt.value}
                    role="radio"
                    aria-checked={active}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRsvp(opt.value)}
                    className={`relative flex items-center justify-center gap-1.5 overflow-hidden rounded-lg border py-2.5 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30 ${
                      active
                        ? toneClasses[tone]
                        : "cs-border cs-input cs-muted cs-hover hover:cs-text"
                    }`}
                  >
                    {/* Sliding highlight using layoutId for smoother transition */}
                    {active && (
                      <motion.span
                        layoutId={`rsvp-${tone}`}
                        className="pointer-events-none absolute inset-0 rounded-lg"
                        style={{
                          background:
                            tone === "emerald"
                              ? "radial-gradient(circle at 50% 100%, rgba(16,185,129,0.18), transparent 70%)"
                              : tone === "amber"
                              ? "radial-gradient(circle at 50% 100%, rgba(245,158,11,0.18), transparent 70%)"
                              : "radial-gradient(circle at 50% 100%, rgba(244,63,94,0.18), transparent 70%)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <AnimatePresence mode="wait" initial={false}>
                      {active && (
                        <motion.span
                          key="icon"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                          className="relative"
                        >
                          {opt.value === "not-going" ? (
                            <X className="h-3 w-3" strokeWidth={3} />
                          ) : (
                            <Check className="h-3 w-3" strokeWidth={3} />
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="relative">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.button
            type="button"
            disabled={rsvp === null || rsvp === "not-going"}
            whileTap={{ scale: rsvp === "going" || rsvp === "maybe" ? 0.97 : 1 }}
            className={`relative mt-4 mb-5 flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-lg py-3 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 ${
              rsvp === "going" || rsvp === "maybe"
                ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_12px_30px_-10px_rgba(168,85,247,0.7)] hover:shadow-[0_14px_36px_-10px_rgba(168,85,247,0.85)]"
                : "cs-border cs-input cs-subtle"
            }`}
          >
            {/* Moving sheen on enabled state */}
            {(rsvp === "going" || rsvp === "maybe") && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 hover:translate-x-full"
              />
            )}
            <Calendar className="relative h-3.5 w-3.5" strokeWidth={2.4} />
            <span className="relative">
              {rsvp === "going" ? "Add to calendar" : rsvp === "maybe" ? "Hold my seat" : rsvp === "not-going" ? "Removed from your events" : "Reserve a seat"}
            </span>
          </motion.button>
        </div>
      </article>
    </motion.div>
  );
}
