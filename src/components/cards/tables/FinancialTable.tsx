"use client";
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
