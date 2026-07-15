"use client";
import { useState, useCallback } from "react";
import { Search, Sun, Moon, Check, X, Edit3 } from "lucide-react";
const EASE = [0.16, 1, 0.3, 1] as const;

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
