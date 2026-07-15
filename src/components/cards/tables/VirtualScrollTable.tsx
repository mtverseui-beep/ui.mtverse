"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Sun, Moon } from "lucide-react";

// Generate 1000 rows
const BIG_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i + 1), name: `User ${i + 1}`, email: `user${i + 1}@example.com`,
  status: (["active", "inactive", "pending"] as const)[i % 3], value: ((i * 137 + 89) % 10000),
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
