"use client";
import { useState, Fragment } from "react";
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
    <Fragment key={node.id}>
      <tr style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e => e.currentTarget.style.background = t.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
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
    </Fragment>
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
