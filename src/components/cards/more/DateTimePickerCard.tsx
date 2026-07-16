"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-text-muted)]";
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dateFormatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });
const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" });

function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addDays(date: Date, amount: number) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount); }
function addMonths(date: Date, amount: number) { return new Date(date.getFullYear(), date.getMonth() + amount, 1); }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function dayValue(date: Date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); }
function monthDays(view: Date) {
  const first = startOfMonth(view);
  const gridStart = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

export function DateTimePickerCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section aria-labelledby="date-time-title" className="relative w-[min(100%,26.25rem)] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-sky-500/[0.06] blur-3xl" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20"><Calendar aria-hidden className="h-4 w-4 text-sky-600 dark:text-sky-400" /></div><div><h2 id="date-time-title" className="text-sm font-bold cs-text">Date & Time Picker</h2><p className="text-[10.5px] cs-muted">Calendar · time · date range</p></div></div></header>
        <div className="space-y-6 p-4 sm:p-5"><CalendarPicker /><TimeSelector /><RangePicker /></div>
      </div>
    </motion.section>
  );
}

function CalendarHeader({ view, onChange, label }: { view: Date; onChange: (date: Date) => void; label: string }) {
  return <div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-bold cs-text" aria-live="polite">{monthFormatter.format(view)}</span><div className="flex gap-1"><button type="button" onClick={() => onChange(addMonths(view, -1))} aria-label={`Previous month for ${label}`} className={`flex h-7 w-7 items-center justify-center rounded cs-muted cs-hover ${FOCUS}`}><ChevronLeft aria-hidden className="h-3.5 w-3.5" /></button><button type="button" onClick={() => onChange(addMonths(view, 1))} aria-label={`Next month for ${label}`} className={`flex h-7 w-7 items-center justify-center rounded cs-muted cs-hover ${FOCUS}`}><ChevronRight aria-hidden className="h-3.5 w-3.5" /></button></div></div>;
}

function CalendarPicker() {
  const today = new Date();
  const [selected, setSelected] = useState(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [view, setView] = useState(() => startOfMonth(today));
  const choose = (date: Date) => { setSelected(date); setView(startOfMonth(date)); };
  const move = (date: Date, amount: number) => choose(addDays(date, amount));
  return (
    <section aria-labelledby="calendar-label">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-1"><h3 id="calendar-label" className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Calendar</h3><output className="text-[10px] font-semibold cs-text" aria-live="polite">{dateFormatter.format(selected)}</output></div>
      <div className="rounded-xl border cs-border p-2.5">
        <CalendarHeader view={view} onChange={setView} label="calendar" />
        <div className="grid grid-cols-7" aria-hidden>{DOW.map(day => <span key={day} className="py-1 text-center text-[8px] font-bold cs-subtle">{day.slice(0, 2)}</span>)}</div>
        <div role="grid" aria-label={monthFormatter.format(view)} className="grid grid-cols-7 gap-0.5">
          {monthDays(view).map(date => {
            const selectedDay = sameDay(date, selected);
            const currentMonth = date.getMonth() === view.getMonth();
            return <button key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} role="gridcell" type="button" tabIndex={selectedDay ? 0 : -1} aria-selected={selectedDay} aria-label={dateFormatter.format(date)} onClick={() => choose(date)} onKeyDown={event => { const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }; if (offsets[event.key]) { event.preventDefault(); move(date, offsets[event.key]); } }} className={`relative flex h-8 items-center justify-center rounded-md text-[10px] font-medium ${FOCUS}`} style={{ background: selectedDay ? "var(--card-text)" : "transparent", color: selectedDay ? "var(--card-surface)" : currentMonth ? "var(--card-text)" : "var(--card-text-muted)", opacity: currentMonth ? 1 : 0.55 }}>{date.getDate()}{sameDay(date, today) && !selectedDay && <span aria-hidden className="absolute bottom-1 h-0.5 w-0.5 rounded-full bg-current" />}</button>;
          })}
        </div>
      </div>
    </section>
  );
}

function formatTime(totalMinutes: number, mode: "12" | "24") {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  if (mode === "24") return `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  const hour12 = hour24 % 12 || 12;
  return `${hour12.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${hour24 >= 12 ? "PM" : "AM"}`;
}

function TimeSelector() {
  const [minutes, setMinutes] = useState(10 * 60 + 30);
  const [mode, setMode] = useState<"12" | "24">("12");
  const adjust = (amount: number) => setMinutes(value => (value + amount + 1440) % 1440);
  return (
    <section aria-labelledby="time-label">
      <div className="mb-2 flex items-center justify-between gap-2"><h3 id="time-label" className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Time Selector</h3><output className="flex items-center gap-1 text-[10px] font-semibold cs-text" aria-live="polite"><Clock aria-hidden className="h-3 w-3" />{formatTime(minutes, mode)}</output></div>
      <div className="rounded-xl border cs-border p-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TimeStepper label="hour" value={mode === "12" ? String(Math.floor(minutes / 60) % 12 || 12).padStart(2, "0") : String(Math.floor(minutes / 60)).padStart(2, "0")} increase={() => adjust(60)} decrease={() => adjust(-60)} />
          <span aria-hidden className="text-lg font-bold cs-subtle">:</span>
          <TimeStepper label="minute" value={String(minutes % 60).padStart(2, "0")} increase={() => adjust(5)} decrease={() => adjust(-5)} />
          {mode === "12" && <div className="flex flex-col gap-1" aria-label="Period">{(["AM", "PM"] as const).map(period => { const active = (minutes < 720 ? "AM" : "PM") === period; return <button key={period} type="button" aria-pressed={active} onClick={() => setMinutes(value => period === "AM" ? value % 720 : value % 720 + 720)} className={`h-7 rounded-md px-2 text-[9px] font-bold ${FOCUS}`} style={{ background: active ? "var(--card-text)" : "var(--card-input-bg)", color: active ? "var(--card-surface)" : "var(--card-text-muted)" }}>{period}</button>; })}</div>}
          <div className="flex rounded-lg cs-input p-0.5" aria-label="Time format">{(["12", "24"] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`rounded-md px-2 py-1.5 text-[9px] font-bold ${FOCUS}`} style={{ background: mode === value ? "var(--card-surface)" : "transparent", color: "var(--card-text)" }}>{value}h</button>)}</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">{[540, 720, 900, 1080].map(value => <button key={value} type="button" onClick={() => setMinutes(value)} className={`rounded-lg border cs-border cs-input py-1.5 text-[9px] font-semibold cs-muted cs-hover ${FOCUS}`}>{formatTime(value, mode)}</button>)}</div>
      </div>
    </section>
  );
}

function TimeStepper({ label, value, increase, decrease }: { label: string; value: string; increase: () => void; decrease: () => void }) {
  return <div className="flex flex-col items-center gap-0.5"><button type="button" onClick={increase} aria-label={`Increase ${label}`} className={`flex h-6 w-9 items-center justify-center rounded cs-muted cs-hover ${FOCUS}`}><ChevronUp aria-hidden className="h-3.5 w-3.5" /></button><output aria-label={`Selected ${label}`} className="flex h-9 w-12 items-center justify-center rounded-lg cs-input text-base font-bold tabular-nums cs-text">{value}</output><button type="button" onClick={decrease} aria-label={`Decrease ${label}`} className={`flex h-6 w-9 items-center justify-center rounded cs-muted cs-hover ${FOCUS}`}><ChevronDown aria-hidden className="h-3.5 w-3.5" /></button></div>;
}

function RangePicker() {
  const today = new Date();
  const [view, setView] = useState(() => startOfMonth(today));
  const [start, setStart] = useState<Date | null>(() => addDays(today, 2));
  const [end, setEnd] = useState<Date | null>(() => addDays(today, 6));
  const select = (date: Date) => {
    if (!start || end || dayValue(date) < dayValue(start)) { setStart(date); setEnd(null); return; }
    setEnd(date);
  };
  const summary = start ? end ? `${dateFormatter.format(start)} – ${dateFormatter.format(end)}` : `${dateFormatter.format(start)} – choose end` : "Choose a start date";
  return (
    <section aria-labelledby="range-label">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-1"><h3 id="range-label" className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Date Range</h3><output className="max-w-full truncate text-[9px] font-semibold cs-text" aria-live="polite">{summary}</output></div>
      <div className="rounded-xl border cs-border p-2.5">
        <CalendarHeader view={view} onChange={setView} label="date range" />
        <div className="grid grid-cols-7" aria-hidden>{DOW.map(day => <span key={day} className="py-1 text-center text-[8px] font-bold cs-subtle">{day.slice(0, 2)}</span>)}</div>
        <div role="grid" aria-label={`Date range, ${monthFormatter.format(view)}`} className="grid grid-cols-7 gap-y-0.5">
          {monthDays(view).map(date => {
            const value = dayValue(date);
            const isStart = !!start && sameDay(date, start);
            const isEnd = !!end && sameDay(date, end);
            const inRange = !!start && !!end && value > dayValue(start) && value < dayValue(end);
            const outside = date.getMonth() !== view.getMonth();
            return <button key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} role="gridcell" type="button" aria-selected={isStart || isEnd} aria-label={`${dateFormatter.format(date)}${isStart ? ", range start" : isEnd ? ", range end" : inRange ? ", in selected range" : ""}`} onClick={() => select(date)} className={`flex h-8 items-center justify-center text-[10px] font-medium ${FOCUS}`} style={{ background: isStart || isEnd ? "var(--card-text)" : inRange ? "color-mix(in srgb, var(--card-text) 10%, transparent)" : "transparent", color: isStart || isEnd ? "var(--card-surface)" : outside ? "var(--card-text-muted)" : "var(--card-text)", opacity: outside ? 0.55 : 1, borderRadius: isStart ? "6px 0 0 6px" : isEnd ? "0 6px 6px 0" : inRange ? 0 : "6px" }}>{date.getDate()}</button>;
          })}
        </div>
        <div className="mt-2 flex items-center justify-between"><p className="text-[9px] cs-subtle">Select a start, then an end.</p><button type="button" onClick={() => { setStart(null); setEnd(null); }} className={`rounded px-2 py-1 text-[9px] cs-muted cs-hover ${FOCUS}`}>Clear</button></div>
      </div>
    </section>
  );
}
