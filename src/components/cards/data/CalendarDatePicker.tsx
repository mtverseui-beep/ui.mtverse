"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Sun, Moon, Calendar as CalIcon,
  Clock, X, Check, CalendarRange, CalendarCheck, CalendarDays,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function CalendarDatePicker() {
  const [isDark, setIsDark] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 15));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 6, 15));
  const [rangeStart, setRangeStart] = useState<Date | null>(new Date(2025, 6, 10));
  const [rangeEnd, setRangeEnd] = useState<Date | null>(new Date(2025, 6, 20));
  const [mode, setMode] = useState<"single" | "range">("range");
  const [timeValue, setTimeValue] = useState("14:30");

  const bg = isDark ? "#0a0a0f" : "#f8fafc";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const todayBg = isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.05)";
  const accent = "#6366f1";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const days: { date: Date; current: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) days.push({ date: new Date(year, month - 1, prevDays - i), current: false });
    for (let i = 1; i <= daysCount; i++) days.push({ date: new Date(year, month, i), current: true });
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) days.push({ date: new Date(year, month + 1, i), current: false });
    return days;
  }, [year, month]);

  const today = new Date();
  const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isInRange = (d: Date) => rangeStart && rangeEnd && d > rangeStart && d < rangeEnd;

  const handleDateClick = (d: Date) => {
    if (mode === "single") {
      setSelectedDate(d);
    } else {
      if (!rangeStart || (rangeStart && rangeEnd)) { setRangeStart(d); setRangeEnd(null); }
      else if (d < rangeStart) { setRangeEnd(rangeStart); setRangeStart(d); }
      else { setRangeEnd(d); }
    }
  };

  const formatDate = (d: Date) => `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  return (
    <div className="flex h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
            <CalIcon className="h-4 w-4" style={{ color: accent }} />
          </div>
          <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Calendar & Date Picker</h1>
          <div className="flex-1" />

          {/* Mode toggle */}
          <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: inputBg }}>
            <button onClick={() => setMode("single")} className="rounded-md px-3 py-1 text-[11px] font-medium transition" style={{ background: mode === "single" ? accent : "transparent", color: mode === "single" ? "#fff" : textMuted }}>Single</button>
            <button onClick={() => setMode("range")} className="rounded-md px-3 py-1 text-[11px] font-medium transition" style={{ background: mode === "range" ? accent : "transparent", color: mode === "range" ? "#fff" : textMuted }}>Range</button>
          </div>

          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Calendar */}
          <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm">
              {/* Month navigation */}
              <div className="mb-4 flex items-center justify-between">
                <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textSecondary }}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[15px] font-bold" style={{ color: textPrimary }}>{MONTHS[month]} {year}</span>
                <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textSecondary }}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {WEEKDAYS.map((day, i) => (
                  <div key={i} className="flex h-8 items-center justify-center text-[10px] font-bold uppercase" style={{ color: textMuted }}>{day}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {daysInMonth.map((day, i) => {
                  const isToday = isSameDay(day.date, today);
                  const isSelected = mode === "single" && selectedDate && isSameDay(day.date, selectedDate);
                  const isRangeStart = mode === "range" && rangeStart && isSameDay(day.date, rangeStart);
                  const isRangeEnd = mode === "range" && rangeEnd && isSameDay(day.date, rangeEnd);
                  const inRange = isInRange(day.date);
                  return (
                    <button
                      key={i}
                      onClick={() => handleDateClick(day.date)}
                      className="relative flex h-9 items-center justify-center rounded-lg text-[12px] font-medium transition"
                      style={{
                        color: !day.current ? textMuted : isSelected || isRangeStart || isRangeEnd ? "#fff" : textPrimary,
                        background: isSelected || isRangeStart || isRangeEnd ? accent : inRange ? `${accent}20` : isToday ? todayBg : "transparent",
                        opacity: !day.current ? 0.4 : 1,
                        borderRadius: isRangeStart ? "8px 0 0 8px" : isRangeEnd ? "0 8px 8px 0" : "8px",
                      }}
                    >
                      {day.date.getDate()}
                      {isToday && !isSelected && !isRangeStart && !isRangeEnd && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full" style={{ background: accent }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick actions */}
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setSelectedDate(today); setRangeStart(today); setRangeEnd(today); }} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition" style={{ borderColor: border, color: textSecondary }}>
                  <CalendarCheck className="h-3.5 w-3.5" /> Today
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition" style={{ borderColor: border, color: textSecondary }}>
                  <CalendarRange className="h-3.5 w-3.5" /> This week
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition" style={{ borderColor: border, color: textSecondary }}>
                  <CalendarDays className="h-3.5 w-3.5" /> This month
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: selected info */}
          <aside className="hidden lg:flex w-72 shrink-0 flex-col" style={{ background: panelBg, borderLeft: `1px solid ${border}` }}>
            <div className="flex h-10 shrink-0 items-center px-4" style={{ borderBottom: `1px solid ${border}` }}>
              <span className="text-[12px] font-bold" style={{ color: textPrimary }}>Selected</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "none" }}>
              {/* Date display */}
              <div className="rounded-xl border p-3" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>{mode === "single" ? "Date" : "Range"}</p>
                {mode === "single" ? (
                  <p className="text-[13px] font-semibold" style={{ color: textPrimary }}>{selectedDate ? formatDate(selectedDate) : "No date selected"}</p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-[12px] font-semibold" style={{ color: textPrimary }}>{rangeStart ? formatDate(rangeStart) : "Start date"}</p>
                    <div className="h-px" style={{ background: border }} />
                    <p className="text-[12px] font-semibold" style={{ color: textPrimary }}>{rangeEnd ? formatDate(rangeEnd) : "End date"}</p>
                    {rangeStart && rangeEnd && (
                      <p className="pt-1 text-[10px]" style={{ color: accent }}>{Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / 86400000) + 1} days</p>
                    )}
                  </div>
                )}
              </div>

              {/* Time picker */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
                  <Clock className="h-3 w-3" /> Time
                </p>
                <input
                  type="time"
                  value={timeValue}
                  onChange={e => setTimeValue(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-[13px] font-mono outline-none"
                  style={{ background: inputBg, borderColor: border, color: textPrimary }}
                />
              </div>

              {/* Confirm */}
              <button className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold text-white transition" style={{ background: accent, boxShadow: `0 4px 12px ${accent}30` }}>
                <Check className="h-4 w-4" />
                Confirm selection
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
