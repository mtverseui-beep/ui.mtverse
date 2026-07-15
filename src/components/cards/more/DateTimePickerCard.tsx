"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// DateTimePickerCard — 3 unique date/time picker variants:
// 1. Calendar — month grid with day selection
// 2. Time selector — compact horizontal hour:minute + AM/PM (not tall scroll)
// 3. Date range — pick start + end with highlighted range

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DOW = ["S","M","T","W","T","F","S"];

export function DateTimePickerCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20"><Calendar className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Date & Time Picker</h2><p className="text-[10.5px] cs-muted">Calendar · time selector · range — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-5 p-4">
          <CalendarPicker />
          <TimeSelector />
          <RangePicker />
        </div>
        <div className="border-t cs-border px-5 py-2 text-center"><p className="text-[9px] cs-subtle">3 completely different date/time patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Calendar — compact month grid ──
function CalendarPicker() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today.getDate());
  const year = viewDate.getFullYear(), month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Calendar</span><span className="text-[10px] font-semibold cs-text">{MONTHS[month]} {selected}</span></div>
      <div className="rounded-xl border cs-border p-2.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-bold cs-text">{MONTHS[month]} {year}</span>
          <div className="flex gap-1">
            <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))} className="flex h-5 w-5 items-center justify-center rounded cs-muted transition cs-hover"><ChevronLeft className="h-3 w-3" strokeWidth={2.2} /></button>
            <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} className="flex h-5 w-5 items-center justify-center rounded cs-muted transition cs-hover"><ChevronRight className="h-3 w-3" strokeWidth={2.2} /></button>
          </div>
        </div>
        <div className="mb-1 grid grid-cols-7 gap-0.5">{DOW.map((d, i) => <div key={i} className="text-center text-[7.5px] font-bold cs-subtle">{d}</div>)}</div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1; const isSel = day === selected; const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <motion.button key={day} type="button" onClick={() => setSelected(day)} whileTap={{ scale: 0.8 }} className="flex h-6 items-center justify-center rounded text-[9.5px] font-medium transition focus-visible:outline-none" style={{ background: isSel ? "#0ea5e9" : "transparent", color: isSel ? "#fff" : isToday ? "#0ea5e9" : "var(--card-text)" }}>
                {isToday && !isSel && <span className="absolute rounded border border-sky-400/40" style={{ width: "22px", height: "22px" }} />}
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 2. Time selector — COMPACT horizontal design (not tall scroll wheel) ──
function TimeSelector() {
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");

  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Time Selector</span><span className="flex items-center gap-1 text-[10px] font-semibold cs-text"><Clock className="h-3 w-3" strokeWidth={2} />{hour.toString().padStart(2,"0")}:{minute.toString().padStart(2,"0")} {ampm}</span></div>
      {/* Compact horizontal time picker — steppers for hour/minute + AM/PM toggle */}
      <div className="flex items-center justify-center gap-2 rounded-xl border cs-border p-3">
        {/* Hour stepper */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => setHour(h => h >= 12 ? 1 : h + 1)} className="flex h-5 w-7 items-center justify-center rounded cs-muted transition cs-hover text-[10px]">▲</button>
          <div className="flex h-8 w-10 items-center justify-center rounded-lg cs-input text-[16px] font-bold tabular-nums cs-text">{hour.toString().padStart(2,"0")}</div>
          <button type="button" onClick={() => setHour(h => h <= 1 ? 12 : h - 1)} className="flex h-5 w-7 items-center justify-center rounded cs-muted transition cs-hover text-[10px]">▼</button>
        </div>
        <span className="text-[16px] font-bold cs-subtle">:</span>
        {/* Minute stepper */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => setMinute(m => m >= 59 ? 0 : m + 1)} className="flex h-5 w-7 items-center justify-center rounded cs-muted transition cs-hover text-[10px]">▲</button>
          <div className="flex h-8 w-10 items-center justify-center rounded-lg cs-input text-[16px] font-bold tabular-nums cs-text">{minute.toString().padStart(2,"0")}</div>
          <button type="button" onClick={() => setMinute(m => m <= 0 ? 59 : m - 1)} className="flex h-5 w-7 items-center justify-center rounded cs-muted transition cs-hover text-[10px]">▼</button>
        </div>
        {/* AM/PM toggle */}
        <div className="ml-1 flex flex-col gap-0.5">
          <button type="button" onClick={() => setAmpm("AM")} className="flex h-6 w-9 items-center justify-center rounded-md text-[9px] font-bold transition" style={{ background: ampm === "AM" ? "#0ea5e9" : "var(--card-input-bg)", color: ampm === "AM" ? "#fff" : "var(--card-text-muted)" }}>AM</button>
          <button type="button" onClick={() => setAmpm("PM")} className="flex h-6 w-9 items-center justify-center rounded-md text-[9px] font-bold transition" style={{ background: ampm === "PM" ? "#0ea5e9" : "var(--card-input-bg)", color: ampm === "PM" ? "#fff" : "var(--card-text-muted)" }}>PM</button>
        </div>
      </div>
      {/* Quick time presets */}
      <div className="mt-2 flex gap-1.5">
        {["9:00","12:00","15:00","18:00"].map(t => {
          const [h, m] = t.split(":").map(Number);
          return <button key={t} type="button" onClick={() => { setHour(h); setMinute(m); setAmpm(h >= 12 ? "PM" : "AM"); }} className="flex-1 rounded-lg border cs-border cs-input py-1 text-[9px] font-semibold cs-muted transition cs-hover">{t}</button>;
        })}
      </div>
    </div>
  );
}

// ── 3. Range picker — compact ──
function RangePicker() {
  const [start, setStart] = useState(5);
  const [end, setEnd] = useState(12);
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Date Range</span><span className="text-[10px] font-semibold cs-text">Day {start} — Day {end}</span></div>
      <div className="rounded-xl border cs-border p-2.5">
        <div className="grid grid-cols-7 gap-0.5">
          {days.map(d => {
            const inRange = d >= start && d <= end;
            const isStart = d === start; const isEnd = d === end;
            return (
              <motion.button key={d} type="button" onClick={() => { if (d < start) setStart(d); else if (d > end) setEnd(d); else if (d - start < end - d) setStart(d); else setEnd(d); }} whileTap={{ scale: 0.8 }} className="flex h-6 items-center justify-center text-[9.5px] font-medium transition focus-visible:outline-none" style={{ background: isStart || isEnd ? "#0ea5e9" : inRange ? "rgba(14,165,233,0.12)" : "transparent", color: isStart || isEnd ? "#fff" : inRange ? "#0ea5e9" : "var(--card-text)", borderRadius: isStart ? "6px 0 0 6px" : isEnd ? "0 6px 6px 0" : "0" }}>
                {d}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
