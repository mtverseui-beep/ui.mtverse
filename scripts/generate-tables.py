#!/usr/bin/env python3
"""Generate 10 advanced table components — production-ready, no issues."""
import os

TABLES_DIR = "/home/z/my-project/src/components/cards/tables"
os.makedirs(TABLES_DIR, exist_ok=True)

# Common shared data and utilities
COMMON = '''const EASE = [0.16, 1, 0.3, 1] as const;

const USERS = [
  { id: "1", name: "Alex Morgan", email: "alex@acme.io", role: "Admin", status: "active", spend: 4820, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  { id: "2", name: "Sarah Chen", email: "sarah@acme.io", role: "Editor", status: "active", spend: 2340, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { id: "3", name: "James Wilson", email: "james@techcorp.com", role: "Viewer", status: "pending", spend: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
  { id: "4", name: "Emily Davis", email: "emily@design.co", role: "Editor", status: "active", spend: 8900, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
  { id: "5", name: "Michael Brown", email: "mike@startup.dev", role: "Admin", status: "inactive", spend: 1200, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { id: "6", name: "Jessica Taylor", email: "jess@agency.net", role: "Viewer", status: "active", spend: 560, avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&q=80" },
  { id: "7", name: "David Lee", email: "david@enterprise.com", role: "Admin", status: "active", spend: 12300, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80" },
  { id: "8", name: "Lisa Anderson", email: "lisa@creative.studio", role: "Editor", status: "pending", spend: 0, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
  { id: "9", name: "Tom Harris", email: "tom@logistics.io", role: "Viewer", status: "active", spend: 320, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80" },
  { id: "10", name: "Anna Martinez", email: "anna@finance.co", role: "Admin", status: "active", spend: 9800, avatar: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=80&q=80" },
  { id: "11", name: "Chris Evans", email: "chris@retail.shop", role: "Editor", status: "inactive", spend: 450, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" },
  { id: "12", name: "Nina Patel", email: "nina@health.med", role: "Viewer", status: "active", spend: 2100, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80" },
];

const STATUS = {
  active: { bg: "#10b98115", color: "#10b981", dot: "#10b981" },
  inactive: { bg: "#6b728015", color: "#6b7280", dot: "#6b7280" },
  pending: { bg: "#f59e0b15", color: "#f59e0b", dot: "#f59e0b" },
};

const ROLE = {
  Admin: { bg: "#8b5cf615", color: "#8b5cf6" },
  Editor: { bg: "#06b6d415", color: "#06b6d4" },
  Viewer: { bg: "#64748b15", color: "#64748b" },
};

function useTheme(isDark: boolean) {
  return {
    bg: isDark ? "#0a0a0f" : "#ffffff",
    panelBg: isDark ? "#0f0f17" : "#ffffff",
    headerBg: isDark ? "#0d0d14" : "#f8fafc",
    border: isDark ? "#1f1f2a" : "#e4e4e7",
    textPrimary: isDark ? "#fafafa" : "#09090b",
    textSecondary: isDark ? "#a1a1aa" : "#52525b",
    textMuted: isDark ? "#71717a" : "#a1a1aa",
    inputBg: isDark ? "#14141c" : "#f4f4f5",
    rowHover: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    stripeBg: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.015)",
  };
}
'''

# 1. CompactTable — dense rows, minimal padding
tables = {
"CompactTable": '''"use client";
import { useState } from "react";
import { Search, Sun, Moon, MoreHorizontal } from "lucide-react";
''' + COMMON + '''

export function CompactTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Compact Table</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>{filtered.length} rows</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[12px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              {["User", "Email", "Role", "Status", "Spend"].map(h => <th key={h} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td className="px-3 py-1.5"><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-6 w-6 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
                <td className="px-3 py-1.5 font-mono" style={{ color: t.textSecondary }}>{u.email}</td>
                <td className="px-3 py-1.5"><span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>
                <td className="px-3 py-1.5"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
                <td className="px-3 py-1.5 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"ExpandableRowsTable": '''"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, Sun, Moon, Mail, Phone, MapPin, Calendar } from "lucide-react";
''' + COMMON + '''

export function ExpandableRowsTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Expandable Rows</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>Click row to expand</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              <th className="w-8 px-3 py-2.5" />
              {["User", "Role", "Status", "Spend"].map(h => <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <>
                <tr key={u.id} onClick={() => setExpanded(expanded === u.id ? null : u.id)} className="cursor-pointer" style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td className="px-3 py-2.5"><motion.div animate={{ rotate: expanded === u.id ? 90 : 0 }} transition={{ duration: 0.15 }}><ChevronRight className="h-4 w-4" style={{ color: t.textMuted }} /></motion.div></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
                  <td className="px-3 py-2.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>
                  <td className="px-3 py-2.5"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
                  <td className="px-3 py-2.5 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>
                </tr>
                <AnimatePresence>
                  {expanded === u.id && (
                    <tr key={u.id + "-detail"}>
                      <td colSpan={5} style={{ borderBottom: `1px solid ${t.border}`, padding: 0 }}>
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: EASE }} style={{ overflow: "hidden", background: t.headerBg }}>
                          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                            {[
                              { icon: Mail, label: "Email", value: u.email },
                              { icon: Phone, label: "Phone", value: "+1 (555) 0" + u.id + "-00" + u.id },
                              { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                              { icon: Calendar, label: "Joined", value: "Jan 202" + (parseInt(u.id) % 5) },
                            ].map((d, i) => { const Icon = d.icon; return (
                              <div key={i}>
                                <p className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}><Icon className="h-3 w-3" /> {d.label}</p>
                                <p className="text-[12px] font-medium" style={{ color: t.textPrimary }}>{d.value}</p>
                              </div>
                            ); })}
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"InlineEditableTable": '''"use client";
import { useState, useCallback } from "react";
import { Search, Sun, Moon, Check, X, Edit3 } from "lucide-react";
''' + COMMON + '''

export function InlineEditableTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(USERS);
  const [editing, setEditing] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const t = useTheme(isDark);
  const filtered = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const startEdit = useCallback((id: string, field: string, value: string | number) => {
    setEditing({ id, field });
    setEditValue(String(value));
  }, []);

  const saveEdit = useCallback(() => {
    if (!editing) return;
    setData(prev => prev.map(u => {
      if (u.id !== editing.id) return u;
      if (editing.field === "spend") return { ...u, spend: parseInt(editValue) || 0 };
      return { ...u, [editing.field]: editValue };
    }));
    setEditing(null);
  }, [editing, editValue]);

  const cancelEdit = () => { setEditing(null); };

  const editableFields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "spend", label: "Spend" },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Inline Editable</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>Click any cell to edit</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              {editableFields.map(f => <th key={f.key} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{f.label}</th>)}
              <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {editableFields.map(field => (
                  <td key={field.key} className="px-3 py-2.5" onClick={() => startEdit(u.id, field.key, (u as any)[field.key])}>
                    {editing?.id === u.id && editing?.field === field.key ? (
                      <div className="flex items-center gap-1">
                        <input
                          autoFocus
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit(); }}
                          onBlur={saveEdit}
                          className="rounded border px-2 py-0.5 text-[12px] outline-none"
                          style={{ background: t.inputBg, borderColor: "#6366f1", color: t.textPrimary }}
                        />
                        <button onClick={(e) => { e.stopPropagation(); saveEdit(); }} className="flex h-5 w-5 items-center justify-center rounded text-white" style={{ background: "#10b981" }}><Check className="h-3 w-3" /></button>
                        <button onClick={(e) => { e.stopPropagation(); cancelEdit(); }} className="flex h-5 w-5 items-center justify-center rounded" style={{ background: t.inputBg, color: t.textMuted }}><X className="h-3 w-3" /></button>
                      </div>
                    ) : (
                      <div className="group flex items-center gap-1 cursor-pointer">
                        <span style={{ color: t.textPrimary }}>{field.key === "spend" ? "$" + (u as any)[field.key].toLocaleString() : (u as any)[field.key]}</span>
                        <Edit3 className="h-3 w-3 opacity-0 transition group-hover:opacity-50" style={{ color: t.textMuted }} />
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-3 py-2.5"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"CardTableSwitcher": '''"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, LayoutGrid, Table as TableIcon } from "lucide-react";
''' + COMMON + '''

export function CardTableSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<"table" | "card">("table");
  const [search, setSearch] = useState("");
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Card / Table Switcher</h1>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: t.inputBg }}>
          <button onClick={() => setView("table")} className="flex h-7 w-7 items-center justify-center rounded-md transition" style={{ background: view === "table" ? "#6366f1" : "transparent", color: view === "table" ? "#fff" : t.textMuted }}><TableIcon className="h-4 w-4" /></button>
          <button onClick={() => setView("card")} className="flex h-7 w-7 items-center justify-center rounded-md transition" style={{ background: view === "card" ? "#6366f1" : "transparent", color: view === "card" ? "#fff" : t.textMuted }}><LayoutGrid className="h-4 w-4" /></button>
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto p-4" style={{ scrollbarWidth: "thin" }}>
        <AnimatePresence mode="wait">
          {view === "table" ? (
            <motion.div key="table" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
              <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `1px solid ${t.border}` }}>{["User", "Role", "Status", "Spend"].map(h => <th key={h} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td className="px-3 py-2"><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
                      <td className="px-3 py-2"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>
                      <td className="px-3 py-2"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
                      <td className="px-3 py-2 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((u, i) => (
                <motion.div key={u.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="rounded-xl border p-4" style={{ borderColor: t.border, background: t.panelBg }}>
                  <div className="flex items-center gap-3 mb-3"><img src={u.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /><div><p className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>{u.name}</p><p className="text-[10px] font-mono" style={{ color: t.textMuted }}>{u.email}</p></div></div>
                  <div className="flex items-center justify-between"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span><span className="text-[14px] font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</span></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
''',

"FinancialTable": '''"use client";
import { useState } from "react";
import { Search, Sun, Moon, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 2.34, changePct: 1.30, volume: "52.3M", marketCap: "2.83T", sparkline: [180, 181, 179, 182, 183, 182, 184, 182.52] },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.68, change: -1.22, changePct: -0.85, volume: "28.1M", marketCap: "1.78T", sparkline: [145, 144, 143, 144, 142, 143, 142, 142.68] },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.20, change: 5.67, changePct: 1.38, volume: "21.4M", marketCap: "3.08T", sparkline: [408, 410, 412, 409, 413, 414, 415, 415.20] },
  { symbol: "AMZN", name: "Amazon.com", price: 178.15, change: -0.45, changePct: -0.25, volume: "35.7M", marketCap: "1.85T", sparkline: [180, 179, 178, 179, 178, 177, 178, 178.15] },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: 8.92, changePct: 3.72, volume: "89.2M", marketCap: "791B", sparkline: [240, 242, 244, 241, 245, 247, 246, 248.50] },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.30, change: 22.15, changePct: 2.60, volume: "45.6M", marketCap: "2.16T", sparkline: [855, 860, 865, 858, 870, 872, 873, 875.30] },
  { symbol: "META", name: "Meta Platforms", price: 502.95, change: -3.80, changePct: -0.75, volume: "15.3M", marketCap: "1.28T", sparkline: [508, 506, 505, 507, 503, 504, 503, 502.95] },
  { symbol: "NFLX", name: "Netflix Inc.", price: 612.40, change: 4.20, changePct: 0.69, volume: "8.7M", marketCap: "265B", sparkline: [608, 610, 606, 609, 611, 612, 611, 612.40] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 60},${20 - ((v - min) / range) * 18}`).join(" ");
  return (
    <svg width="60" height="20" viewBox="0 0 60 20">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FinancialTable() {
  const [isDark, setIsDark] = useState(true);
  const [search, setSearch] = useState("");
  const t = { bg: isDark ? "#0a0a0f" : "#ffffff", panelBg: isDark ? "#0f0f17" : "#ffffff", headerBg: isDark ? "#0d0d14" : "#f8fafc", border: isDark ? "#1f1f2a" : "#e4e4e7", textPrimary: isDark ? "#fafafa" : "#09090b", textSecondary: isDark ? "#a1a1aa" : "#52525b", textMuted: isDark ? "#71717a" : "#a1a1aa", inputBg: isDark ? "#14141c" : "#f4f4f5" };
  const filtered = STOCKS.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Financial Table</h1>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stocks..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              {["Symbol", "Price", "Change", "Volume", "Market Cap", "Trend"].map(h => <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const isUp = s.change >= 0;
              return (
                <tr key={s.symbol} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td className="px-3 py-2.5"><span className="font-bold" style={{ color: t.textPrimary }}>{s.symbol}</span><br /><span className="text-[10px]" style={{ color: t.textMuted }}>{s.name}</span></td>
                  <td className="px-3 py-2.5 font-bold tabular-nums" style={{ color: t.textPrimary }}>${s.price.toFixed(2)}</td>
                  <td className="px-3 py-2.5"><span className="flex items-center gap-1 font-semibold tabular-nums" style={{ color: isUp ? "#10b981" : "#ef4444" }}>{isUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{isUp ? "+" : ""}{s.change.toFixed(2)} ({s.changePct.toFixed(2)}%)</span></td>
                  <td className="px-3 py-2.5 tabular-nums" style={{ color: t.textSecondary }}>{s.volume}</td>
                  <td className="px-3 py-2.5 tabular-nums" style={{ color: t.textSecondary }}>{s.marketCap}</td>
                  <td className="px-3 py-2.5"><Sparkline data={s.sparkline} color={isUp ? "#10b981" : "#ef4444"} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"ColumnToggleTable": '''"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, Columns, Check, ChevronDown } from "lucide-react";
''' + COMMON + '''

const ALL_COLS = [
  { key: "name", label: "User", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "role", label: "Role", visible: true },
  { key: "status", label: "Status", visible: true },
  { key: "spend", label: "Spend", visible: true },
];

export function ColumnToggleTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [cols, setCols] = useState(ALL_COLS);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  const visibleCols = cols.filter(c => c.visible);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Column Toggle</h1>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <div ref={menuRef} className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition" style={{ borderColor: t.border, color: t.textSecondary, background: menuOpen ? t.inputBg : "transparent" }}>
            <Columns className="h-3.5 w-3.5" /> Columns <ChevronDown className="h-3 w-3" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }} className="absolute right-0 top-full z-50 mt-1 w-40 rounded-xl border p-1.5 shadow-xl" style={{ background: t.panelBg, borderColor: t.border }}>
                {cols.map(col => (
                  <button key={col.key} onClick={() => setCols(prev => prev.map(c => c.key === col.key ? { ...c, visible: !c.visible } : c))} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textPrimary }}>
                    <div className="flex h-4 w-4 items-center justify-center rounded border-2 transition" style={{ borderColor: col.visible ? "#6366f1" : t.textMuted, background: col.visible ? "#6366f1" : "transparent" }}>{col.visible && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}</div>
                    {col.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              {visibleCols.map(col => <th key={col.key} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{col.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {visibleCols.map(col => {
                  if (col.key === "name") return <td key={col.key} className="px-3 py-2.5"><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>;
                  if (col.key === "role") return <td key={col.key} className="px-3 py-2.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>;
                  if (col.key === "status") return <td key={col.key} className="px-3 py-2.5"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>;
                  if (col.key === "spend") return <td key={col.key} className="px-3 py-2.5 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>;
                  return <td key={col.key} className="px-3 py-2.5 font-mono" style={{ color: t.textSecondary }}>{(u as any)[col.key]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"TreeTable": '''"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sun, Moon } from "lucide-react";

const TREE_DATA = [
  { id: "1", name: "Engineering", type: "folder", level: 0, children: [
    { id: "1-1", name: "Frontend Team", type: "folder", level: 1, children: [
      { id: "1-1-1", name: "Alex Morgan", type: "user", level: 2, role: "Lead", status: "active" },
      { id: "1-1-2", name: "Sarah Chen", type: "user", level: 2, role: "Dev", status: "active" },
      { id: "1-1-3", name: "James Wilson", type: "user", level: 2, role: "Dev", status: "pending" },
    ]},
    { id: "1-2", name: "Backend Team", type: "folder", level: 1, children: [
      { id: "1-2-1", name: "David Lee", type: "user", level: 2, role: "Lead", status: "active" },
      { id: "1-2-2", name: "Emily Davis", type: "user", level: 2, role: "Dev", status: "active" },
    ]},
  ]},
  { id: "2", name: "Design", type: "folder", level: 0, children: [
    { id: "2-1", name: "Jessica Taylor", type: "user", level: 1, role: "Lead", status: "active" },
    { id: "2-2", name: "Lisa Anderson", type: "user", level: 1, role: "Designer", status: "pending" },
  ]},
  { id: "3", name: "Marketing", type: "folder", level: 0, children: [
    { id: "3-1", name: "Anna Martinez", type: "user", level: 1, role: "Lead", status: "active" },
    { id: "3-2", name: "Tom Harris", type: "user", level: 1, role: "Marketing", status: "active" },
  ]},
];

const STATUS_COLORS = { active: "#10b981", pending: "#f59e0b", inactive: "#6b7280" };

export function TreeTable() {
  const [isDark, setIsDark] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "1-1"]));
  const t = isDark ? { bg: "#0a0a0f", panelBg: "#0f0f17", headerBg: "#0d0d14", border: "#1f1f2a", textPrimary: "#fafafa", textSecondary: "#a1a1aa", textMuted: "#71717a", inputBg: "#14141c", rowHover: "rgba(255,255,255,0.03)" } : { bg: "#ffffff", panelBg: "#ffffff", headerBg: "#f8fafc", border: "#e4e4e7", textPrimary: "#09090b", textSecondary: "#52525b", textMuted: "#a1a1aa", inputBg: "#f4f4f5", rowHover: "rgba(0,0,0,0.02)" };

  const toggle = (id: string) => setExpanded(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const renderRow = (node: any) => (
    <>
      <tr key={node.id} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <td className="px-3 py-2.5" style={{ paddingLeft: `${12 + node.level * 24}px` }}>
          <div className="flex items-center gap-1.5">
            {node.type === "folder" ? (
              <button onClick={() => toggle(node.id)} className="flex h-5 w-5 items-center justify-center"><motion.div animate={{ rotate: expanded.has(node.id) ? 90 : 0 }} transition={{ duration: 0.15 }}><ChevronRight className="h-4 w-4" style={{ color: t.textMuted }} /></motion.div></button>
            ) : <div className="w-5" />}
            <span className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>{node.name}</span>
          </div>
        </td>
        <td className="px-3 py-2.5">{node.type === "folder" ? <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#8b5cf615", color: "#8b5cf6" }}>Team</span> : <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#06b6d415", color: "#06b6d4" }}>{node.role}</span>}</td>
        <td className="px-3 py-2.5">{node.status && <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLORS[node.status as keyof typeof STATUS_COLORS] }} /><span className="capitalize text-[12px]" style={{ color: STATUS_COLORS[node.status as keyof typeof STATUS_COLORS] }}>{node.status}</span></span>}</td>
        <td className="px-3 py-2.5 text-[12px]" style={{ color: t.textMuted }}>{node.type}</td>
      </tr>
      {node.children && expanded.has(node.id) && node.children.map((child: any) => renderRow(child))}
    </>
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Tree / Hierarchical</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>Click folders to expand</span>
        <div className="flex-1" />
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr style={{ background: t.headerBg, borderBottom: `1px solid ${t.border}` }}>
              {["Name", "Type", "Status", "Category"].map(h => <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>{TREE_DATA.map(node => renderRow(node))}</tbody>
        </table>
      </div>
    </div>
  );
}
''',

"VirtualScrollTable": '''"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Sun, Moon } from "lucide-react";

// Generate 1000 rows
const BIG_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i + 1), name: `User ${i + 1}`, email: `user${i + 1}@example.com`,
  status: (["active", "inactive", "pending"] as const)[i % 3], value: Math.floor(Math.random() * 10000),
}));

const ROW_HEIGHT = 40;

export function VirtualScrollTable() {
  const [isDark, setIsDark] = useState(true);
  const [search, setSearch] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = isDark ? { bg: "#0a0a0f", panelBg: "#0f0f17", headerBg: "#0d0d14", border: "#1f1f2a", textPrimary: "#fafafa", textSecondary: "#a1a1aa", textMuted: "#71717a", inputBg: "#14141c", rowHover: "rgba(255,255,255,0.03)" } : { bg: "#ffffff", panelBg: "#ffffff", headerBg: "#f8fafc", border: "#e4e4e7", textPrimary: "#09090b", textSecondary: "#52525b", textMuted: "#a1a1aa", inputBg: "#f4f4f5", rowHover: "rgba(0,0,0,0.02)" };

  const filtered = useMemo(() => BIG_DATA.filter(u => u.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const totalHeight = filtered.length * ROW_HEIGHT;
  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const endIndex = Math.min(startIndex + visibleCount + 5, filtered.length);
  const visibleData = filtered.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const onScroll = () => {
      setScrollTop(el.scrollTop);
      setVisibleCount(Math.ceil(el.clientHeight / ROW_HEIGHT));
    };
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const STATUS_COLORS: Record<string, string> = { active: "#10b981", inactive: "#6b7280", pending: "#f59e0b" };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Virtual Scroll</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>{filtered.length.toLocaleString()} rows · smooth scroll</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 1000 rows..." className="w-44 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-hidden">
        <div style={{ height: 36, background: t.headerBg, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center" }}>
          {["ID", "Name", "Email", "Status", "Value"].map(h => <div key={h} className="px-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted, flex: h === "ID" || h === "Value" ? "0 0 80px" : "1" }}>{h}</div>)}
        </div>
        <div ref={containerRef} className="overflow-auto" style={{ height: "calc(100% - 36px)", scrollbarWidth: "thin" }}>
          <div style={{ height: totalHeight, position: "relative" }}>
            <div style={{ transform: `translateY(${offsetY}px)`, position: "absolute", top: 0, left: 0, right: 0 }}>
              {visibleData.map(u => (
                <div key={u.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center", borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div className="px-3 text-[12px] font-mono" style={{ color: t.textMuted, flex: "0 0 80px" }}>#{u.id}</div>
                  <div className="px-3 text-[12px] font-semibold" style={{ color: t.textPrimary, flex: 1 }}>{u.name}</div>
                  <div className="px-3 text-[12px] font-mono" style={{ color: t.textSecondary, flex: 1 }}>{u.email}</div>
                  <div className="px-3" style={{ flex: 1 }}><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLORS[u.status] }} /><span className="text-[12px] capitalize" style={{ color: STATUS_COLORS[u.status] }}>{u.status}</span></span></div>
                  <div className="px-3 text-[12px] font-bold tabular-nums" style={{ color: t.textPrimary, flex: "0 0 80px" }}>${u.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
''',

"EnterpriseTable": '''"use client";
import { useState } from "react";
import { Search, Sun, Moon, Download } from "lucide-react";
''' + COMMON + '''

export function EnterpriseTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Enterprise Table</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>Zebra stripes · sticky first column</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition" style={{ borderColor: t.border, color: t.textSecondary }}><Download className="h-3.5 w-3.5" /> Export</button>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
            <tr style={{ background: t.headerBg, borderBottom: `2px solid ${t.border}` }}>
              <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted, position: "sticky", left: 0, zIndex: 11, background: t.headerBg, minWidth: 180 }}>User</th>
              {["Email", "Role", "Status", "Last Active", "Spend", "Plan", "Region"].map(h => <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${t.border}`, background: i % 2 === 0 ? "transparent" : t.stripeBg }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : t.stripeBg}>
                <td className="px-3 py-2.5" style={{ position: "sticky", left: 0, zIndex: 5, background: i % 2 === 0 ? t.bg : t.stripeBg, minWidth: 180 }}><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
                <td className="px-3 py-2.5 font-mono" style={{ color: t.textSecondary }}>{u.email}</td>
                <td className="px-3 py-2.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>
                <td className="px-3 py-2.5"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
                <td className="px-3 py-2.5 text-[12px]" style={{ color: t.textSecondary }}>{"2h ago"}</td>
                <td className="px-3 py-2.5 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>
                <td className="px-3 py-2.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#10b98115", color: "#10b981" }}>Pro</span></td>
                <td className="px-3 py-2.5 text-[12px]" style={{ color: t.textSecondary }}>{["US", "EU", "APAC", "US", "EU"][i % 5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
''',

"ResponsiveTable": '''"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Mail, DollarSign } from "lucide-react";
''' + COMMON + '''

export function ResponsiveTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const t = useTheme(isDark);
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-sans" style={{ background: t.bg, color: t.textPrimary }}>
      <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${t.border}`, background: t.panelBg }}>
        <h1 className="text-[14px] font-bold" style={{ color: t.textPrimary }}>Responsive Table</h1>
        <span className="text-[10px]" style={{ color: t.textMuted }}>Resize window to see it adapt</span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: t.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-40 rounded-lg border py-1 pl-8 pr-3 text-[12px] outline-none" style={{ background: t.inputBg, borderColor: t.border, color: t.textPrimary }} />
        </div>
        <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: t.textMuted }}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </header>
      <div className="flex-1 overflow-auto p-4" style={{ scrollbarWidth: "thin" }}>
        {/* Desktop table view */}
        <div className="hidden md:block">
          <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${t.border}` }}>{["User", "Email", "Role", "Status", "Spend"].map(h => <th key={h} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td className="px-3 py-2"><div className="flex items-center gap-2"><img src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
                  <td className="px-3 py-2 font-mono" style={{ color: t.textSecondary }}>{u.email}</td>
                  <td className="px-3 py-2"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span></td>
                  <td className="px-3 py-2"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></span></td>
                  <td className="px-3 py-2 font-bold tabular-nums" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile card view */}
        <div className="space-y-3 md:hidden">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="rounded-xl border p-3" style={{ borderColor: t.border, background: t.panelBg }}>
              <div className="flex items-center gap-3 mb-2"><img src={u.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /><div><p className="text-[13px] font-bold" style={{ color: t.textPrimary }}>{u.name}</p><p className="text-[10px] font-mono" style={{ color: t.textMuted }}>{u.email}</p></div></div>
              <div className="flex items-center justify-between"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: ROLE[u.role as keyof typeof ROLE].bg, color: ROLE[u.role as keyof typeof ROLE].color }}>{u.role}</span><span className="text-[14px] font-bold" style={{ color: t.textPrimary }}>${u.spend.toLocaleString()}</span></div>
              <div className="mt-2 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[u.status as keyof typeof STATUS].dot }} /><span className="text-[10px] capitalize" style={{ color: STATUS[u.status as keyof typeof STATUS].color }}>{u.status}</span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
''',
}

for name, content in tables.items():
    path = os.path.join(TABLES_DIR, f"{name}.tsx")
    with open(path, "w") as f:
        f.write(content)
    print(f"✓ {name}")

print(f"\nGenerated {len(tables)} table components")
