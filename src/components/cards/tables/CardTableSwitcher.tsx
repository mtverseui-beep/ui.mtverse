"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, LayoutGrid, Table as TableIcon } from "lucide-react";
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
                      <td className="px-3 py-2"><div className="flex items-center gap-2"><img loading="lazy" src={u.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className="font-semibold" style={{ color: t.textPrimary }}>{u.name}</span></div></td>
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
                  <div className="flex items-center gap-3 mb-3"><img loading="lazy" src={u.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /><div><p className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>{u.name}</p><p className="text-[10px] font-mono" style={{ color: t.textMuted }}>{u.email}</p></div></div>
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
