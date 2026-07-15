"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Search, ChevronDown, Check, X, Zap, Clock, DollarSign,
  Brain, Trophy, TrendingUp, BarChart3, Gauge, Eye, Copy,
  ArrowUpDown, Sparkles, Database, Code2, Languages, Shield,
  Cpu, Activity, Star,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

// Curated comparison models
const COMPARE_MODELS = [
  AI_MODELS[0],  // GPT-4o
  AI_MODELS[3],  // Claude 3.5 Sonnet
  AI_MODELS[5],  // Gemini 1.5 Pro
  AI_MODELS[7],  // Llama 3.1 405B
];

interface Benchmark {
  id: string;
  name: string;
  icon: typeof Brain;
  category: "reasoning" | "coding" | "language" | "safety";
  scores: Record<string, number>;
  maxScore: number;
}

const BENCHMARKS: Benchmark[] = [
  { id: "mmlu", name: "MMLU", icon: Brain, category: "reasoning", maxScore: 100, scores: { "gpt-4o": 88.7, "claude-3.5-sonnet": 88.3, "gemini-1.5-pro": 85.9, "llama-3.1-405b": 87.3 } },
  { id: "humaneval", name: "HumanEval", icon: Code2, category: "coding", maxScore: 100, scores: { "gpt-4o": 90.2, "claude-3.5-sonnet": 92.0, "gemini-1.5-pro": 84.1, "llama-3.1-405b": 89.0 } },
  { id: "math", name: "MATH", icon: Trophy, category: "reasoning", maxScore: 100, scores: { "gpt-4o": 76.6, "claude-3.5-sonnet": 71.1, "gemini-1.5-pro": 67.7, "llama-3.1-405b": 73.8 } },
  { id: "mgsm", name: "MGSM (multilingual)", icon: Languages, category: "language", maxScore: 100, scores: { "gpt-4o": 90.5, "claude-3.5-sonnet": 84.2, "gemini-1.5-pro": 88.7, "llama-3.1-405b": 86.8 } },
  { id: "drop", name: "DROP", icon: Database, category: "reasoning", maxScore: 100, scores: { "gpt-4o": 83.4, "claude-3.5-sonnet": 87.1, "gemini-1.5-pro": 78.9, "llama-3.1-405b": 84.8 } },
];

const FEATURES = [
  { name: "Vision", icon: Eye, models: { "gpt-4o": true, "claude-3.5-sonnet": true, "gemini-1.5-pro": true, "llama-3.1-405b": false } },
  { name: "Function Calling", icon: Code2, models: { "gpt-4o": true, "claude-3.5-sonnet": true, "gemini-1.5-pro": true, "llama-3.1-405b": true } },
  { name: "JSON Mode", icon: Database, models: { "gpt-4o": true, "claude-3.5-sonnet": true, "gemini-1.5-pro": true, "llama-3.1-405b": true } },
  { name: "Streaming", icon: Activity, models: { "gpt-4o": true, "claude-3.5-sonnet": true, "gemini-1.5-pro": true, "llama-3.1-405b": true } },
  { name: "Fine-tuning", icon: Cpu, models: { "gpt-4o": true, "claude-3.5-sonnet": false, "gemini-1.5-pro": false, "llama-3.1-405b": true } },
  { name: "Open Source", icon: Shield, models: { "gpt-4o": false, "claude-3.5-sonnet": false, "gemini-1.5-pro": false, "llama-3.1-405b": true } },
];

const CATEGORY_COLORS = {
  reasoning: "#8b5cf6",
  coding: "#10b981",
  language: "#06b6d4",
  safety: "#f59e0b",
};

type SortKey = "name" | "price" | "context" | "speed";

export function ModelComparisonTable() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedBench, setSelectedBench] = useState(BENCHMARKS[0]);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);

  // Theme
  const bg = isDark ? "#0a0a0f" : "#f4f4f5";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";

  const sortedModels = useMemo(() => {
    const sorted = [...COMPARE_MODELS];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "price": cmp = a.price - b.price; break;
        case "context": cmp = parseFloat(a.context) - parseFloat(b.context); break;
        case "speed": cmp = 0; break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const getMaxScore = (benchId: string) => {
    const bench = BENCHMARKS.find(b => b.id === benchId);
    if (!bench) return 0;
    return Math.max(...Object.values(bench.scores));
  };

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(139,92,246,0.15)" }}>
            <BarChart3 className="h-4.5 w-4.5" style={{ color: "#8b5cf6" }} />
          </div>
          <div>
            <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Model Comparison</h1>
            <p className="text-[10px]" style={{ color: textMuted }}>{COMPARE_MODELS.length} models · {BENCHMARKS.length} benchmarks · updated weekly</p>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter..."
              className="w-32 rounded-lg border py-1.5 pl-8 pr-3 text-[12px] outline-none focus:ring-1"
              style={{ background: inputBg, borderColor: border, color: textPrimary }}
            />
          </div>

          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
            {/* Benchmark Chart */}
            <div className="rounded-2xl border p-5" style={{ background: panelBg, borderColor: border }}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-[15px] font-bold" style={{ color: textPrimary }}>
                    <TrendingUp className="h-4 w-4" style={{ color: "#8b5cf6" }} />
                    Benchmark Scores
                  </h2>
                  <p className="text-[11px]" style={{ color: textMuted }}>Higher is better · scale 0-100</p>
                </div>
                {/* Benchmark selector */}
                <div className="flex flex-wrap gap-1.5">
                  {BENCHMARKS.map(bench => {
                    const Icon = bench.icon;
                    const isActive = selectedBench.id === bench.id;
                    return (
                      <button
                        key={bench.id}
                        onClick={() => setSelectedBench(bench)}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition"
                        style={{
                          background: isActive ? `${CATEGORY_COLORS[bench.category]}15` : "transparent",
                          color: isActive ? CATEGORY_COLORS[bench.category] : textMuted,
                          border: `1px solid ${isActive ? CATEGORY_COLORS[bench.category] : border}`,
                        }}
                      >
                        <Icon className="h-3 w-3" />
                        {bench.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bar chart */}
              <div className="space-y-3">
                {sortedModels.map((model, i) => {
                  const score = selectedBench.scores[model.id] || 0;
                  const maxScore = getMaxScore(selectedBench.id);
                  const isWinner = score === maxScore;
                  const Icon = model.Icon;
                  return (
                    <div key={model.id} className="flex items-center gap-3">
                      <div className="flex w-40 shrink-0 items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${model.color}15` }}>
                          <Icon className="h-4 w-4" style={{ color: model.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>{model.name}</p>
                          <p className="text-[9px]" style={{ color: textMuted }}>{model.vendor}</p>
                        </div>
                      </div>
                      <div className="relative flex-1 h-7 rounded-lg overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                          className="flex h-full items-center justify-end rounded-lg px-2"
                          style={{
                            background: isWinner
                              ? `linear-gradient(90deg, ${model.color}88, ${model.color})`
                              : `linear-gradient(90deg, ${model.color}55, ${model.color}88)`,
                            boxShadow: isWinner ? `0 0 12px ${model.color}50` : "none",
                          }}
                        >
                          <span className="text-[11px] font-bold text-white tabular-nums">{score.toFixed(1)}</span>
                        </motion.div>
                        {isWinner && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Trophy className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: panelBg, borderColor: border }}>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${border}` }}>
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
                        <button onClick={() => handleSort("name")} className="flex items-center gap-1 transition hover:text-foreground">
                          Model <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Vendor</th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
                        <button onClick={() => handleSort("context")} className="flex items-center gap-1 transition hover:text-foreground">
                          Context <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
                        <button onClick={() => handleSort("price")} className="flex items-center gap-1 transition hover:text-foreground">
                          Price /M tokens <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Badge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedModels.map((model, i) => {
                      const Icon = model.Icon;
                      return (
                        <motion.tr
                          key={model.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{ borderBottom: `1px solid ${border}` }}
                          className="transition hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${model.color}15` }}>
                                <Icon className="h-4 w-4" style={{ color: model.color }} />
                              </div>
                              <span className="text-[13px] font-semibold" style={{ color: textPrimary }}>{model.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[12px]" style={{ color: textSecondary }}>{model.vendor}</td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: textPrimary }}>
                              <Database className="h-3.5 w-3.5" style={{ color: textMuted }} />
                              {model.context}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: textPrimary }}>
                              <DollarSign className="h-3.5 w-3.5" style={{ color: textMuted }} />
                              {model.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase" style={{ background: `${model.color}15`, color: model.color }}>{model.badge}</span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features matrix */}
            <div className="rounded-2xl border p-5" style={{ background: panelBg, borderColor: border }}>
              <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold" style={{ color: textPrimary }}>
                <Sparkles className="h-4 w-4" style={{ color: "#8b5cf6" }} />
                Feature Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Feature</th>
                      {sortedModels.map(model => {
                        const Icon = model.Icon;
                        return (
                          <th key={model.id} className="px-3 py-2 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${model.color}15` }}>
                                <Icon className="h-4 w-4" style={{ color: model.color }} />
                              </div>
                              <span className="text-[9px] font-semibold" style={{ color: textMuted }}>{model.name.split(" ")[0]}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map(feat => {
                      const Icon = feat.icon;
                      return (
                        <tr key={feat.name} style={{ borderTop: `1px solid ${border}` }}>
                          <td className="px-3 py-2.5">
                            <span className="flex items-center gap-2 text-[12px] font-medium" style={{ color: textPrimary }}>
                              <Icon className="h-3.5 w-3.5" style={{ color: textMuted }} />
                              {feat.name}
                            </span>
                          </td>
                          {sortedModels.map(model => {
                            const supported = feat.models[model.id as keyof typeof feat.models];
                            return (
                              <td key={model.id} className="px-3 py-2.5 text-center">
                                {supported ? (
                                  <Check className="mx-auto h-4 w-4" style={{ color: "#10b981" }} strokeWidth={2.5} />
                                ) : (
                                  <X className="mx-auto h-4 w-4" style={{ color: textMuted }} strokeWidth={2} />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Calculator */}
            <div className="rounded-2xl border p-5" style={{ background: panelBg, borderColor: border }}>
              <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold" style={{ color: textPrimary }}>
                <DollarSign className="h-4 w-4" style={{ color: "#10b981" }} />
                Pricing Calculator
              </h2>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-[11px] font-semibold" style={{ color: textSecondary }}>
                    <span>Input Tokens</span>
                    <span className="tabular-nums" style={{ color: "#8b5cf6" }}>{inputTokens.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(parseInt(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "#8b5cf6" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-[11px] font-semibold" style={{ color: textSecondary }}>
                    <span>Output Tokens</span>
                    <span className="tabular-nums" style={{ color: "#8b5cf6" }}>{outputTokens.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(parseInt(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "#8b5cf6" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {sortedModels.map((model, i) => {
                  const cost = (inputTokens / 1000000 * model.price) + (outputTokens / 1000000 * model.price * 3);
                  const Icon = model.Icon;
                  const minCost = Math.min(...sortedModels.map(m => (inputTokens / 1000000 * m.price) + (outputTokens / 1000000 * m.price * 3)));
                  const isCheapest = cost === minCost;
                  return (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border p-3"
                      style={{
                        borderColor: isCheapest ? "#10b981" : border,
                        background: isCheapest ? (isDark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.03)") : "transparent",
                      }}
                    >
                      <div className="mb-2 flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" style={{ color: model.color }} />
                        <span className="truncate text-[11px] font-semibold" style={{ color: textPrimary }}>{model.name.split(" ")[0]}</span>
                        {isCheapest && <span className="ml-auto text-[8px] font-bold uppercase" style={{ color: "#10b981" }}>Cheapest</span>}
                      </div>
                      <p className="text-[18px] font-bold tabular-nums" style={{ color: isCheapest ? "#10b981" : textPrimary }}>${cost.toFixed(4)}</p>
                      <p className="text-[9px]" style={{ color: textMuted }}>per request</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
