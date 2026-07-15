"use client";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal,
  Filter, Download, Plus, Trash2, Edit3, Eye, Copy, X,
  ChevronLeft, ChevronRight, Sun, Moon, Check, Columns,
  ArrowUpDown, UserPlus, Save, AlertCircle,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  spend: number;
  avatar: string;
}

const MOCK_DATA: User[] = [
  { id: "1", name: "Alex Morgan", email: "alex@acme.io", role: "Admin", status: "active", lastActive: "2 min ago", spend: 4820, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  { id: "2", name: "Sarah Chen", email: "sarah@acme.io", role: "Editor", status: "active", lastActive: "1 hour ago", spend: 2340, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { id: "3", name: "James Wilson", email: "james@techcorp.com", role: "Viewer", status: "pending", lastActive: "3 days ago", spend: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
  { id: "4", name: "Emily Davis", email: "emily@design.co", role: "Editor", status: "active", lastActive: "5 min ago", spend: 8900, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
  { id: "5", name: "Michael Brown", email: "mike@startup.dev", role: "Admin", status: "inactive", lastActive: "2 weeks ago", spend: 1200, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { id: "6", name: "Jessica Taylor", email: "jess@agency.net", role: "Viewer", status: "active", lastActive: "12 min ago", spend: 560, avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&q=80" },
  { id: "7", name: "David Lee", email: "david@enterprise.com", role: "Admin", status: "active", lastActive: "just now", spend: 12300, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80" },
  { id: "8", name: "Lisa Anderson", email: "lisa@creative.studio", role: "Editor", status: "pending", lastActive: "1 day ago", spend: 0, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
  { id: "9", name: "Tom Harris", email: "tom@logistics.io", role: "Viewer", status: "active", lastActive: "30 min ago", spend: 320, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80" },
  { id: "10", name: "Anna Martinez", email: "anna@finance.co", role: "Admin", status: "active", lastActive: "3 min ago", spend: 9800, avatar: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=80&q=80" },
  { id: "11", name: "Chris Evans", email: "chris@retail.shop", role: "Editor", status: "inactive", lastActive: "1 month ago", spend: 450, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" },
  { id: "12", name: "Nina Patel", email: "nina@health.med", role: "Viewer", status: "active", lastActive: "8 min ago", spend: 2100, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80" },
];

type SortDir = "asc" | "desc" | null;
type ColumnKey = "name" | "email" | "role" | "status" | "lastActive" | "spend";

const STATUS_STYLES: Record<string, { bg: string; color: string; dot: string }> = {
  active: { bg: "#10b98115", color: "#10b981", dot: "#10b981" },
  inactive: { bg: "#6b728015", color: "#6b7280", dot: "#6b7280" },
  pending: { bg: "#f59e0b15", color: "#f59e0b", dot: "#f59e0b" },
};

const ROLE_STYLES: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "#8b5cf615", color: "#8b5cf6" },
  Editor: { bg: "#06b6d415", color: "#06b6d4" },
  Viewer: { bg: "#64748b15", color: "#64748b" },
};

export function DataTable() {
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState<User[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<ColumnKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [pageMenuOpen, setPageMenuOpen] = useState(false);

  // Theme
  const bg = isDark ? "#0a0a0f" : "#ffffff";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const headerBg = isDark ? "#0d0d14" : "#f8fafc";
  const rowHover = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const accent = "#6366f1";

  // Close menus on outside click
  useEffect(() => {
    const handler = () => { setActionMenuId(null); setPageMenuOpen(false); };
    if (actionMenuId || pageMenuOpen) {
      window.addEventListener("click", handler);
      return () => window.removeEventListener("click", handler);
    }
  }, [actionMenuId, pageMenuOpen]);

  // Filter + search
  const filtered = useMemo(() => {
    let result = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }
    if (filterStatus) result = result.filter(u => u.status === filterStatus);
    if (filterRole) result = result.filter(u => u.role === filterRole);
    return result;
  }, [data, search, filterStatus, filterRole]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "spend") cmp = a.spend - b.spend;
      else cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = useCallback((key: ColumnKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : d === "desc" ? null : "asc");
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey, sortDir]);

  const handleSelectAll = useCallback(() => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map(u => u.id)));
  }, [selected, paginated]);

  const handleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setData(prev => prev.filter(u => u.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
    setActionMenuId(null);
  }, []);

  const handleDuplicate = useCallback((id: string) => {
    const user = data.find(u => u.id === id);
    if (user) {
      const newId = Date.now().toString();
      setData(prev => [...prev, { ...user, id: newId, name: user.name + " (copy)", email: user.email.replace("@", "+copy@") }]);
    }
    setActionMenuId(null);
  }, [data]);

  const handleSaveUser = useCallback((user: User) => {
    if (editingUser) {
      setData(prev => prev.map(u => u.id === user.id ? user : u));
      setEditingUser(null);
    } else {
      setData(prev => [...prev, { ...user, id: Date.now().toString() }]);
      setShowAddModal(false);
    }
  }, [editingUser]);

  const handleBulkDelete = useCallback(() => {
    setData(prev => prev.filter(u => !selected.has(u.id)));
    setSelected(new Set());
  }, [selected]);

  const columns: { key: ColumnKey; label: string; sortable: boolean; className?: string }[] = [
    { key: "name", label: "User", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "lastActive", label: "Last Active", sortable: true },
    { key: "spend", label: "Total Spend", sortable: true, className: "text-right" },
  ];

  const allSelected = selected.size === paginated.length && paginated.length > 0;
  const someSelected = selected.size > 0 && !allSelected;

  // Custom checkbox component
  const Checkbox = ({ checked, onChange, indeterminate }: { checked: boolean; onChange: () => void; indeterminate?: boolean }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className="flex h-5 w-5 items-center justify-center rounded-md border-2 transition"
      style={{
        borderColor: checked || indeterminate ? accent : isDark ? "#3f3f4a" : "#d4d4d8",
        background: checked || indeterminate ? accent : "transparent",
      }}
    >
      {indeterminate ? (
        <div className="h-0.5 w-2.5 rounded-full bg-white" />
      ) : checked ? (
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      ) : null}
    </button>
  );

  // Custom dropdown component
  const CustomSelect = ({ value, options, onChange, label }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; label: string }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[13px] outline-none transition w-full"
          style={{ background: inputBg, borderColor: border, color: textPrimary }}
        >
          <span>{value || label}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: textMuted }} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute z-50 mt-1 w-full rounded-lg border p-1 shadow-xl"
              style={{ background: panelBg, borderColor: border }}
            >
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: opt.value === value ? accent : textPrimary }}
                >
                  {opt.label}
                  {opt.value === value && <Check className="h-3.5 w-3.5" style={{ color: accent }} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          <div>
            <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Users</h1>
            <p className="text-[10px]" style={{ color: textMuted }}>{filtered.length} of {data.length} users</p>
          </div>
          <div className="flex-1" />
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search users..."
              className="w-48 rounded-lg border py-1.5 pl-8 pr-3 text-[12px] outline-none focus:ring-1"
              style={{ background: inputBg, borderColor: border, color: textPrimary }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition"
            style={{
              background: showFilters || filterStatus || filterRole ? `${accent}10` : "transparent",
              borderColor: showFilters || filterStatus || filterRole ? accent : border,
              color: showFilters || filterStatus || filterRole ? accent : textSecondary,
            }}
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
            {(filterStatus || filterRole) && <span className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: accent }}>{[filterStatus, filterRole].filter(Boolean).length}</span>}
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: border, color: textSecondary }}>
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition"
            style={{ background: accent, boxShadow: `0 2px 8px ${accent}30` }}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Add User
          </button>
          <div className="h-5 w-px" style={{ background: border }} />
          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {/* Filter bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="overflow-hidden"
              style={{ borderBottom: `1px solid ${border}`, background: headerBg }}
            >
              <div className="flex flex-wrap items-center gap-3 px-6 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Status:</span>
                {["active", "inactive", "pending"].map(s => (
                  <button
                    key={s}
                    onClick={() => { setFilterStatus(filterStatus === s ? null : s); setPage(1); }}
                    className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium capitalize transition"
                    style={{
                      background: filterStatus === s ? STATUS_STYLES[s].bg : "transparent",
                      borderColor: filterStatus === s ? STATUS_STYLES[s].color : border,
                      color: filterStatus === s ? STATUS_STYLES[s].color : textSecondary,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_STYLES[s].dot }} />
                    {s}
                  </button>
                ))}
                <div className="h-4 w-px mx-2" style={{ background: border }} />
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Role:</span>
                {["Admin", "Editor", "Viewer"].map(r => (
                  <button
                    key={r}
                    onClick={() => { setFilterRole(filterRole === r ? null : r); setPage(1); }}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-medium transition"
                    style={{
                      background: filterRole === r ? ROLE_STYLES[r].bg : "transparent",
                      borderColor: filterRole === r ? ROLE_STYLES[r].color : border,
                      color: filterRole === r ? ROLE_STYLES[r].color : textSecondary,
                    }}
                  >
                    {r}
                  </button>
                ))}
                {(filterStatus || filterRole) && (
                  <button
                    onClick={() => { setFilterStatus(null); setFilterRole(null); }}
                    className="ml-auto flex items-center gap-1 text-[11px] font-medium transition"
                    style={{ color: "#ef4444" }}
                  >
                    <X className="h-3 w-3" />
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk action bar */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 44, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-3 px-6"
              style={{ background: `${accent}10`, borderBottom: `1px solid ${border}` }}
            >
              <span className="text-[12px] font-semibold" style={{ color: accent }}>{selected.size} selected</span>
              <div className="h-3 w-px" style={{ background: border }} />
              <button onClick={handleBulkDelete} className="flex items-center gap-1.5 text-[12px] font-medium transition hover:text-rose-500" style={{ color: textSecondary }}>
                <Trash2 className="h-3.5 w-3.5" />
                Delete selected
              </button>
              <button className="flex items-center gap-1.5 text-[12px] font-medium transition" style={{ color: textSecondary }}>
                <Download className="h-3.5 w-3.5" />
                Export selected
              </button>
              <button onClick={() => setSelected(new Set())} className="ml-auto flex items-center gap-1 text-[12px] font-medium transition" style={{ color: textMuted }}>
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
              <tr style={{ background: headerBg, borderBottom: `2px solid ${border}` }}>
                <th className="w-12 px-4 py-3">
                  <Checkbox checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} />
                </th>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left">
                    <button
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition ${col.className || ""}`}
                      style={{ color: textMuted }}
                      disabled={!col.sortable}
                    >
                      {col.label}
                      {col.sortable && (
                        sortKey === col.key ? (
                          sortDir === "asc" ? <ChevronUp className="h-3 w-3" style={{ color: accent }} /> :
                          sortDir === "desc" ? <ChevronDown className="h-3 w-3" style={{ color: accent }} /> :
                          <ChevronsUpDown className="h-3 w-3" />
                        ) : <ChevronsUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  </th>
                ))}
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.15 }}
                  style={{ borderBottom: `1px solid ${border}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = rowHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <Checkbox checked={selected.has(user.id)} onChange={() => handleSelect(user.id)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img loading="lazy" src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" style={{ border: `1px solid ${border}` }} />
                      <div>
                        <p className="text-[13px] font-semibold" style={{ color: textPrimary }}>{user.name}</p>
                        <p className="text-[10px]" style={{ color: textMuted }}>ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-mono" style={{ color: textSecondary }}>{user.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: ROLE_STYLES[user.role]?.bg, color: ROLE_STYLES[user.role]?.color }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_STYLES[user.status].dot }} />
                      <span className="text-[12px] font-medium capitalize" style={{ color: STATUS_STYLES[user.status].color }}>{user.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px]" style={{ color: textSecondary }}>{user.lastActive}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[13px] font-bold tabular-nums" style={{ color: textPrimary }}>${user.spend.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative" style={{ overflow: "visible" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActionMenuId(actionMenuId === user.id ? null : user.id); }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5"
                        style={{ color: textMuted }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {actionMenuId === user.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.12 }}
                            className="fixed z-[9999] mt-1 w-40 rounded-xl border p-1 shadow-xl"
                            style={{
                              background: panelBg,
                              borderColor: border,
                              position: "fixed",
                              right: "1rem",
                              bottom: actionMenuId && paginated.indexOf(user) >= paginated.length - 3 ? "3.5rem" : "auto",
                              top: actionMenuId && paginated.indexOf(user) >= paginated.length - 3 ? "auto" : undefined,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button onClick={() => { setActionMenuId(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}>
                              <Eye className="h-3.5 w-3.5" style={{ color: textMuted }} /> View details
                            </button>
                            <button onClick={() => { setEditingUser(user); setActionMenuId(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}>
                              <Edit3 className="h-3.5 w-3.5" style={{ color: textMuted }} /> Edit user
                            </button>
                            <button onClick={() => handleDuplicate(user.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}>
                              <Copy className="h-3.5 w-3.5" style={{ color: textMuted }} /> Duplicate
                            </button>
                            <div className="my-1 h-px" style={{ background: border }} />
                            <button onClick={() => handleDelete(user.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-rose-50 dark:hover:bg-rose-950/20" style={{ color: "#ef4444" }}>
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="mb-3 h-10 w-10" style={{ color: textMuted }} />
              <p className="text-[14px] font-semibold" style={{ color: textPrimary }}>No users found</p>
              <p className="mt-1 text-[12px]" style={{ color: textMuted }}>Try adjusting your search or filters</p>
              <button onClick={() => { setSearch(""); setFilterStatus(null); setFilterRole(null); }} className="mt-4 rounded-lg border px-4 py-2 text-[12px] font-medium transition hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: border, color: textSecondary }}>
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <footer className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderTop: `1px solid ${border}`, background: panelBg }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: textMuted }}>Rows per page:</span>
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setPageMenuOpen(!pageMenuOpen); }}
                className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-[12px] outline-none transition"
                style={{ background: inputBg, borderColor: border, color: textPrimary }}
              >
                {pageSize}
                <ChevronDown className="h-3 w-3" style={{ color: textMuted }} />
              </button>
              <AnimatePresence>
                {pageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute bottom-full mb-1 z-50 w-20 rounded-lg border p-1 shadow-xl"
                    style={{ background: panelBg, borderColor: border }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[5, 8, 10, 20].map(n => (
                      <button
                        key={n}
                        onClick={() => { setPageSize(n); setPage(1); setPageMenuOpen(false); }}
                        className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5"
                        style={{ color: n === pageSize ? accent : textPrimary }}
                      >
                        {n}
                        {n === pageSize && <Check className="h-3.5 w-3.5" style={{ color: accent }} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex-1" />
          <span className="text-[12px]" style={{ color: textSecondary }}>
            {sorted.length === 0 ? "0" : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, sorted.length)}`} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:opacity-30"
              style={{ borderColor: border, color: textSecondary }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[12px] font-medium transition"
                  style={{
                    background: page === p ? accent : "transparent",
                    color: page === p ? "#fff" : textSecondary,
                    border: `1px solid ${page === p ? accent : border}`,
                  }}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:opacity-30"
              style={{ borderColor: border, color: textSecondary }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {(showAddModal || editingUser) && (
          <UserModal
            user={editingUser}
            isDark={isDark}
            panelBg={panelBg}
            border={border}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            textMuted={textMuted}
            inputBg={inputBg}
            accent={accent}
            onClose={() => { setShowAddModal(false); setEditingUser(null); }}
            onSave={handleSaveUser}
            CustomSelect={CustomSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── User Modal (Add / Edit) ──
function UserModal({ user, isDark, panelBg, border, textPrimary, textSecondary, textMuted, inputBg, accent, onClose, onSave, CustomSelect }: {
  user: User | null;
  isDark: boolean; panelBg: string; border: string; textPrimary: string; textSecondary: string; textMuted: string; inputBg: string; accent: string;
  onClose: () => void;
  onSave: (user: User) => void;
  CustomSelect: React.ComponentType<{ value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; label: string }>;
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "Viewer");
  const [status, setStatus] = useState(user?.status || "active");
  const [spend, setSpend] = useState(user?.spend?.toString() || "0");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email format";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onSave({
      id: user?.id || "",
      name: name.trim(),
      email: email.trim(),
      role,
      status: status as "active" | "inactive" | "pending",
      lastActive: user?.lastActive || "just now",
      spend: parseInt(spend) || 0,
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="relative w-full max-w-md rounded-2xl border p-6 shadow-2xl"
        style={{ background: panelBg, borderColor: border }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${accent}15` }}>
              <UserPlus className="h-5 w-5" style={{ color: accent }} />
            </div>
            <h2 className="text-[16px] font-bold" style={{ color: textPrimary }}>{user ? "Edit User" : "Add New User"}</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Name</label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
              placeholder="John Doe"
              className="w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition"
              style={{
                background: inputBg,
                borderColor: errors.name ? "#ef4444" : border,
                color: textPrimary,
              }}
            />
            {errors.name && <p className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: "#ef4444" }}><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Email</label>
            <input
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
              placeholder="john@acme.io"
              className="w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition"
              style={{
                background: inputBg,
                borderColor: errors.email ? "#ef4444" : border,
                color: textPrimary,
              }}
            />
            {errors.email && <p className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: "#ef4444" }}><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
          </div>

          {/* Role + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Role</label>
              <CustomSelect
                value={role}
                options={[{ value: "Admin", label: "Admin" }, { value: "Editor", label: "Editor" }, { value: "Viewer", label: "Viewer" }]}
                onChange={setRole}
                label="Select role"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Status</label>
              <CustomSelect
                value={status}
                options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "pending", label: "Pending" }]}
                onChange={(v) => setStatus(v as any)}
                label="Select status"
              />
            </div>
          </div>

          {/* Spend */}
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Total Spend ($)</label>
            <input
              type="number"
              value={spend}
              onChange={e => setSpend(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition"
              style={{ background: inputBg, borderColor: border, color: textPrimary }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition hover:bg-black/5 dark:hover:bg-white/5"
            style={{ borderColor: border, color: textSecondary }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition"
            style={{ background: accent, boxShadow: `0 4px 12px ${accent}30` }}
          >
            <Save className="h-3.5 w-3.5" />
            {user ? "Save changes" : "Add user"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
