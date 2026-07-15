"use client";

// ════════════════════════════════════════════════════════════════════════════
// MODAL KIT — shared helpers (adapted from provided ModalKit code)
// ════════════════════════════════════════════════════════════════════════════

import {
  Check, Calendar, Users, Clock, Video, Copy, MapPin, Plus,
  Info, FileText, Paperclip, Mail, MessageCircle, PenTool, Box,
  ChevronRight, ChevronDown, Flag, Trash2, BadgeCheck, ArrowRight,
} from "lucide-react";

export const fSpace = { fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" } as const;
export const fMono = { fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace" } as const;

export const PEOPLE = [
  { name: "Amara Osei", color: "bg-violet-500", seed: "amara" },
  { name: "Leo Tanaka", color: "bg-sky-500", seed: "leo" },
  { name: "Priya Nair", color: "bg-emerald-500", seed: "priya" },
  { name: "Marcus Webb", color: "bg-amber-500", seed: "marcus" },
  { name: "Ines Duarte", color: "bg-rose-500", seed: "ines" },
];

export function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("");
}

export function Avatar({ person, size = "w-8 h-8", ring = true }: { person: typeof PEOPLE[0]; size?: string; ring?: boolean }) {
  return (
    <div
      className={`${size} ${person.color} rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0 ${ring ? "ring-2 ring-white -ml-2 first:ml-0" : ""}`}
      style={fSpace}
    >
      {initials(person.name)}
    </div>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between text-xs text-slate-600">
      <span>{label}</span>
      <span className="font-medium text-slate-800" style={fSpace}>{value}</span>
    </li>
  );
}

export function ProgressItem({ label, done, active }: { label: string; done?: boolean; active?: boolean }) {
  return (
    <li className="flex items-center gap-2 text-xs">
      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-emerald-500" : active ? "bg-sky-500" : "bg-slate-200"}`}>
        {done && <Check className="w-2.5 h-2.5 text-white" />}
      </span>
      <span className={done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}>{label}</span>
    </li>
  );
}

export function FieldRow({ icon: Icon, label, trailing, muted }: { icon: any; label: string; trailing?: React.ReactNode; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-slate-400 shrink-0" />
      <span className={`text-sm flex-1 ${muted ? "text-slate-400" : "text-slate-700 font-medium"}`}>{label}</span>
      {trailing}
    </div>
  );
}

export function DateField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 mb-1.5">{label}</p>
      <button className="w-full flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 hover:border-slate-300 transition-colors">
        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {value}
      </button>
    </div>
  );
}

// Re-export icons for convenience
export { Check, Calendar, Users, Clock, Video, Copy, MapPin, Plus, Info, FileText, Paperclip, Mail, MessageCircle, PenTool, Box, ChevronRight, ChevronDown, Flag, Trash2, BadgeCheck, ArrowRight };
