"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Copy, Check, Trash2, Plus, ChevronDown, ChevronRight,
  Sun, Moon, Sparkles, Save, Download, Share2, History,
  Code2, Variable, Hash, Thermometer, Gauge, Zap, Brain,
  FileText, Star, Clock, Search, MoreHorizontal, Pencil,
  ArrowRight, Database, MessageSquare, AlertCircle, CheckCircle2,
  RefreshCw, Eye, Settings,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODELS = [
  AI_MODELS[0],  // GPT-4o
  AI_MODELS[3],  // Claude 3.5 Sonnet
  AI_MODELS[5],  // Gemini 1.5 Pro
  AI_MODELS[7],  // Llama 3.1 405B
];

interface PromptSection {
  id: string;
  label: string;
  icon: typeof Code2;
  color: string;
  content: string;
  enabled: boolean;
}

const INITIAL_SECTIONS: PromptSection[] = [
  {
    id: "system",
    label: "System",
    icon: Settings,
    color: "#64748b",
    content: "You are an expert software engineer with deep knowledge of TypeScript, React, and system design. You provide clear, concise answers with practical code examples. Always explain your reasoning before showing code.",
    enabled: true,
  },
  {
    id: "context",
    label: "Context",
    icon: Database,
    color: "#06b6d4",
    content: "The user is building a production SaaS application using Next.js 16 with App Router, Prisma ORM, and PostgreSQL. The codebase follows clean architecture principles with separate layers for data, domain, and presentation.",
    enabled: true,
  },
  {
    id: "user",
    label: "User",
    icon: MessageSquare,
    color: "#8b5cf6",
    content: "How do I implement a rate limiter for my API routes? I need to limit requests to 100 per minute per user. Consider using {{redis_url}} for distributed rate limiting and {{user_id}} for identification.",
    enabled: true,
  },
  {
    id: "examples",
    label: "Examples",
    icon: Star,
    color: "#f59e0b",
    content: "Example 1:\nInput: \"How to hash passwords?\"\nOutput: Use bcrypt with a salt rounds of 12...\n\nExample 2:\nInput: \"How to validate email?\"\nOutput: Use zod with .email() schema...",
    enabled: false,
  },
];

const TEMPLATES = [
  { name: "Code Review", icon: Code2, color: "#8b5cf6", sections: 3 },
  { name: "RAG System", icon: Database, color: "#06b6d4", sections: 4 },
  { name: "Data Extract", icon: FileText, color: "#10b981", sections: 3 },
  { name: "Summarize", icon: Sparkles, color: "#f59e0b", sections: 2 },
  { name: "Translate", icon: MessageSquare, color: "#ec4899", sections: 2 },
  { name: "Classify", icon: Hash, color: "#3b82f6", sections: 3 },
];

const VARIABLES = [
  { name: "user_id", type: "string", value: "usr_8x2k9f", description: "Current user ID" },
  { name: "redis_url", type: "string", value: "redis://localhost:6379", description: "Redis connection" },
  { name: "api_key", type: "secret", value: "sk-••••••••", description: "API key (masked)" },
  { name: "max_tokens", type: "number", value: "2000", description: "Max output tokens" },
  { name: "language", type: "string", value: "TypeScript", description: "Target language" },
];

const MOCK_RESPONSE = "Here's how to implement a distributed rate limiter using Redis and Next.js API routes:\n\n```typescript\nimport { Ratelimit } from '@upstash/ratelimit';\nimport { Redis } from '@upstash/redis';\n\nconst ratelimit = new Ratelimit({\n  redis: Redis.fromEnv(),\n  limiter: Ratelimit.slidingWindow(100, '1 m'),\n  analytics: true,\n});\n\nexport async function POST(req: Request) {\n  const userId = req.headers.get('x-user-id');\n  if (!userId) return new Response('Unauthorized', { status: 401 });\n\n  const { success, limit, remaining } = await ratelimit.limit(userId);\n  if (!success) {\n    return new Response('Rate limit exceeded', {\n      status: 429,\n      headers: { 'X-RateLimit-Limit': limit.toString(), 'X-RateLimit-Remaining': remaining.toString() }\n    });\n  }\n  // Handle request...\n}\n```\n\nThis uses a sliding window algorithm which is more accurate than fixed windows. The analytics flag gives you visibility into usage patterns.";

export function AIPromptBuilder() {
  const [isDark, setIsDark] = useState(false);
  const [sections, setSections] = useState<PromptSection[]>(INITIAL_SECTIONS);
  const [activeSection, setActiveSection] = useState("user");
  const [variables, setVariables] = useState(VARIABLES);
  const [selectedModel, setSelectedModel] = useState(MODELS[1]);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [topP, setTopP] = useState(0.9);
  const [showPreview, setShowPreview] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResponse, setTestResponse] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [promptName, setPromptName] = useState("Rate Limiter Guide");
  const [renaming, setRenaming] = useState(false);
  const [varMenuOpen, setVarMenuOpen] = useState(false);
  const streamRef = useRef<NodeJS.Timeout | null>(null);

  // Theme
  const bg = isDark ? "#0a0a0f" : "#ffffff";
  const sidebarBg = isDark ? "#0d0d14" : "#fafafa";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const editorBg = isDark ? "#0d0d12" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const hoverBg = isDark ? "#1a1a24" : "#f4f4f5";
  const accent = selectedModel.color;

  // Calculate token count (rough estimate: 1 token ≈ 4 chars)
  const fullPrompt = sections.filter(s => s.enabled).map(s => s.content).join("\n\n");
  const tokenCount = Math.ceil(fullPrompt.length / 4);
  const estimatedCost = (tokenCount / 1000 * selectedModel.price / 1000).toFixed(4);

  // Cleanup
  useEffect(() => {
    return () => { if (streamRef.current) clearInterval(streamRef.current); };
  }, []);

  const handleSectionChange = useCallback((id: string, content: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, content } : s));
  }, []);

  const handleToggleSection = useCallback((id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleInsertVariable = useCallback((varName: string) => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return;
    const newText = section.content + ` {{${varName}}}`;
    handleSectionChange(activeSection, newText);
    setVarMenuOpen(false);
  }, [sections, activeSection, handleSectionChange]);

  const handleTest = useCallback(() => {
    setIsTesting(true);
    setTestResponse("");
    setStreamingText("");
    let i = 0;
    const chunkSize = 5;
    streamRef.current = setInterval(() => {
      if (i >= MOCK_RESPONSE.length) {
        if (streamRef.current) clearInterval(streamRef.current);
        setTestResponse(MOCK_RESPONSE);
        setStreamingText("");
        setIsTesting(false);
        return;
      }
      setStreamingText(MOCK_RESPONSE.slice(0, i + chunkSize));
      i += chunkSize;
    }, 15);
  }, []);

  const handleStopTest = useCallback(() => {
    if (streamRef.current) clearInterval(streamRef.current);
    setStreamingText("");
    setIsTesting(false);
  }, []);

  const activeSectionData = sections.find(s => s.id === activeSection);

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      {/* ── LEFT: Sections + Templates ── */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col" style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}>
        <div className="flex h-12 shrink-0 items-center gap-2 px-3" style={{ borderBottom: `1px solid ${border}` }}>
          <Code2 className="h-4 w-4" style={{ color: accent }} />
          <span className="text-[13px] font-bold" style={{ color: textPrimary }}>Prompt Builder</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4" style={{ scrollbarWidth: "none" }}>
          {/* Prompt sections */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Sections</p>
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <div key={section.id} className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleSection(section.id)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded transition"
                      style={{ color: section.enabled ? section.color : textMuted }}
                      title={section.enabled ? "Disable" : "Enable"}
                    >
                      <div className="h-3 w-3 rounded-full border-2 transition" style={{ borderColor: section.enabled ? section.color : textMuted, background: section.enabled ? section.color : "transparent" }} />
                    </button>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className="group flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] font-medium transition"
                      style={{
                        background: isActive ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                        color: isActive ? textPrimary : textSecondary,
                        borderLeft: isActive ? `2px solid ${section.color}` : "2px solid transparent",
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: section.enabled ? section.color : textMuted }} />
                      <span className="flex-1 truncate">{section.label}</span>
                      <span className="text-[9px] tabular-nums" style={{ color: textMuted }}>{Math.ceil(section.content.length / 4)}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Templates */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Templates</p>
            <div className="space-y-1">
              {TEMPLATES.map(tpl => {
                const Icon = tpl.icon;
                return (
                  <button key={tpl.name} className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textSecondary }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: tpl.color }} />
                    <span className="flex-1">{tpl.name}</span>
                    <span className="text-[9px]" style={{ color: textMuted }}>{tpl.sections} sec</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Recent</p>
            <div className="space-y-1">
              {["API Error Handler", "SQL Query Optimizer", "README Generator"].map(name => (
                <button key={name} className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
                  <Clock className="h-3 w-3" />
                  <span className="flex-1 truncate">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
          <button onClick={() => setIsDark(!isDark)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textSecondary }}>
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* ── MAIN: Editor ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          {/* Prompt name */}
          {renaming ? (
            <input
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              onBlur={() => setRenaming(false)}
              onKeyDown={(e) => { if (e.key === "Enter") setRenaming(false); }}
              autoFocus
              className="rounded-md border px-2 py-1 text-[13px] font-bold outline-none"
              style={{ background: inputBg, borderColor: border, color: textPrimary }}
            />
          ) : (
            <button onClick={() => setRenaming(true)} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-bold transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}>
              {promptName}
              <Pencil className="h-3 w-3" style={{ color: textMuted }} />
            </button>
          )}

          {/* Model selector */}
          <div className="relative">
            <button
              onClick={() => setModelMenuOpen(!modelMenuOpen)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: textPrimary }}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded" style={{ background: `${selectedModel.color}15` }}>
                <selectedModel.Icon className="h-3.5 w-3.5" style={{ color: selectedModel.color }} />
              </div>
              {selectedModel.name}
              <ChevronDown className="h-3 w-3" style={{ color: textMuted }} />
            </button>
            <AnimatePresence>
              {modelMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="fixed z-[9999] mt-1 w-64 rounded-xl border p-1.5 shadow-2xl"
                  style={{ background: panelBg, borderColor: border }}
                >
                  {MODELS.map(model => {
                    const Icon = model.Icon;
                    return (
                      <button
                        key={model.id}
                        onClick={() => { setSelectedModel(model); setModelMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${model.color}15` }}>
                          <Icon className="h-4 w-4" style={{ color: model.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[12px] font-semibold" style={{ color: textPrimary }}>{model.name}</span>
                          <p className="text-[9px]" style={{ color: textMuted }}>{model.vendor} · {model.context}</p>
                        </div>
                        {selectedModel.id === model.id && <Check className="h-3.5 w-3.5" style={{ color: accent }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-4 w-px" style={{ background: border }} />

          {/* Token + cost */}
          <div className="hidden sm:flex items-center gap-3 text-[11px]" style={{ color: textMuted }}>
            <span className="flex items-center gap-1">
              <Hash className="h-3.5 w-3.5" />
              {tokenCount} tokens
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              ${estimatedCost}
            </span>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <button onClick={() => handleCopy("full", fullPrompt)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Copy prompt">
            {copiedId === "full" ? <Check className="h-4 w-4" style={{ color: "#10b981" }} /> : <Copy className="h-4 w-4" />}
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Save"><Save className="h-4 w-4" /></button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="History"><History className="h-4 w-4" /></button>

          <div className="h-4 w-px" style={{ background: border }} />

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition"
            style={{
              background: showPreview ? `${accent}15` : "transparent",
              color: showPreview ? accent : textSecondary,
              border: `1px solid ${showPreview ? accent : border}`,
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>

          {isTesting ? (
            <button onClick={handleStopTest} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition" style={{ background: "#ef4444" }}>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Stop
            </button>
          ) : (
            <button onClick={handleTest} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition" style={{ background: accent, boxShadow: `0 2px 8px ${accent}30` }}>
              <Play className="h-3.5 w-3.5 fill-current" />
              Test
            </button>
          )}
        </header>

        {/* Editor area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sections editor */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {activeSectionData && (
              <>
                {/* Section header */}
                <div className="flex h-10 shrink-0 items-center gap-2 px-4" style={{ borderBottom: `1px solid ${border}`, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                  <div className="flex h-6 w-6 items-center justify-center rounded" style={{ background: `${activeSectionData.color}15` }}>
                    <activeSectionData.icon className="h-3.5 w-3.5" style={{ color: activeSectionData.color }} />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: activeSectionData.color }}>{activeSectionData.label}</span>
                  <span className="text-[10px]" style={{ color: textMuted }}>· {Math.ceil(activeSectionData.content.length / 4)} tokens</span>
                  <div className="flex-1" />
                  {/* Variable insert */}
                  <div className="relative">
                    <button
                      onClick={() => setVarMenuOpen(!varMenuOpen)}
                      className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ borderColor: border, color: textSecondary }}
                    >
                      <Variable className="h-3 w-3" />
                      Insert {"{{ }}"}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <AnimatePresence>
                      {varMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="fixed z-[9999] mt-1 w-56 rounded-xl border p-1.5 shadow-2xl"
                          style={{ background: panelBg, borderColor: border }}
                        >
                          {variables.map(v => (
                            <button
                              key={v.name}
                              onClick={() => handleInsertVariable(v.name)}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
                            >
                              <Variable className="h-3 w-3 shrink-0" style={{ color: accent }} />
                              <div className="min-w-0 flex-1">
                                <span className="text-[11px] font-mono" style={{ color: textPrimary }}>{`{{${v.name}}}`}</span>
                                <p className="text-[9px]" style={{ color: textMuted }}>{v.description}</p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative flex-1 overflow-hidden">
                  <textarea
                    value={activeSectionData.content}
                    onChange={(e) => handleSectionChange(activeSectionData.id, e.target.value)}
                    className="h-full w-full resize-none bg-transparent px-4 py-3 text-[14px] leading-relaxed outline-none"
                    style={{ color: textPrimary, fontFamily: "monospace", scrollbarWidth: "thin" }}
                    placeholder={`Enter ${activeSectionData.label} prompt...`}
                  />
                  {/* Variable highlighting overlay (visual indicator) */}
                  <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px]" style={{ background: isDark ? "rgba(15,15,23,0.9)" : "rgba(255,255,255,0.9)", borderColor: border, color: textMuted }}>
                    <Variable className="h-3 w-3" style={{ color: accent }} />
                    {(activeSectionData.content.match(/\{\{[^}]+\}\}/g) || []).length} variables
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Parameters + Test result */}
          <aside className="hidden lg:flex w-80 shrink-0 flex-col" style={{ background: panelBg, borderLeft: `1px solid ${border}` }}>
            {/* Tabs */}
            <div className="flex h-10 shrink-0 items-center gap-1 px-2" style={{ borderBottom: `1px solid ${border}` }}>
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold transition"
                style={!showPreview ? { background: `${accent}15`, color: accent } : { color: textMuted }}
              >
                Parameters
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
                style={showPreview ? { background: `${accent}15`, color: accent } : { color: textMuted }}
              >
                {isTesting ? "Output" : "Preview"}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3" style={{ scrollbarWidth: "none" }}>
              {!showPreview ? (
                <>
                  {/* Parameters */}
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Generation</p>

                  {/* Temperature */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: textPrimary }}>
                        <Thermometer className="h-3.5 w-3.5" style={{ color: textMuted }} />
                        Temperature
                      </label>
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: accent }}>{temperature.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full"
                      style={{ accentColor: accent }}
                    />
                    <div className="mt-1 flex justify-between text-[9px]" style={{ color: textMuted }}>
                      <span>Precise</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max tokens */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: textPrimary }}>
                        <Hash className="h-3.5 w-3.5" style={{ color: textMuted }} />
                        Max Tokens
                      </label>
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: accent }}>{maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="8000"
                      step="100"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full"
                      style={{ accentColor: accent }}
                    />
                  </div>

                  {/* Top P */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: textPrimary }}>
                        <Gauge className="h-3.5 w-3.5" style={{ color: textMuted }} />
                        Top P
                      </label>
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: accent }}>{topP.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={topP}
                      onChange={(e) => setTopP(parseFloat(e.target.value))}
                      className="w-full"
                      style={{ accentColor: accent }}
                    />
                  </div>

                  {/* Variables */}
                  <p className="mb-2 mt-6 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Variables</p>
                  <div className="space-y-1.5">
                    {variables.map(v => (
                      <div key={v.name} className="rounded-lg border p-2" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                        <div className="mb-0.5 flex items-center gap-1.5">
                          <Variable className="h-3 w-3" style={{ color: accent }} />
                          <span className="text-[11px] font-mono font-semibold" style={{ color: textPrimary }}>{`{{${v.name}}}`}</span>
                          <span className="ml-auto rounded px-1.5 py-0.5 text-[8px] font-bold uppercase" style={{ background: v.type === "secret" ? "#ef444415" : `${accent}15`, color: v.type === "secret" ? "#ef4444" : accent }}>{v.type}</span>
                        </div>
                        <p className="truncate text-[10px] font-mono" style={{ color: textMuted }}>{v.value}</p>
                      </div>
                    ))}
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed py-2 text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: border, color: textMuted }}>
                      <Plus className="h-3.5 w-3.5" />
                      Add variable
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Preview / Test output */}
                  {isTesting || streamingText || testResponse ? (
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded" style={{ background: `${accent}15` }}>
                          <selectedModel.Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                        </div>
                        <span className="text-[11px] font-semibold" style={{ color: textPrimary }}>{selectedModel.name}</span>
                        {isTesting && <RefreshCw className="h-3 w-3 animate-spin" style={{ color: accent }} />}
                      </div>
                      <div className="rounded-xl border p-3 text-[12px] leading-relaxed whitespace-pre-wrap" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", color: textPrimary, fontFamily: "monospace" }}>
                        {streamingText || testResponse}
                        {(testResponse || streamingText) && <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse" style={{ background: accent }} />}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: textMuted }}>
                        <span>{Math.ceil((streamingText || testResponse).length / 4)} tokens</span>
                        <button onClick={() => handleCopy("resp", testResponse || streamingText)} className="flex items-center gap-1 transition hover:text-foreground">
                          {copiedId === "resp" ? <><Check className="h-3 w-3" style={{ color: "#10b981" }} /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Compiled Prompt</p>
                      <div className="rounded-xl border p-3 text-[12px] leading-relaxed whitespace-pre-wrap" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", color: textPrimary, fontFamily: "monospace" }}>
                        {fullPrompt}
                      </div>
                      <p className="mt-2 text-center text-[10px]" style={{ color: textMuted }}>Click "Test" to run with {selectedModel.name}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
