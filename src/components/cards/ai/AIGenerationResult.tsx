"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, RefreshCw, Share2, Bookmark, Trash2, Download,
  ChevronDown, ChevronRight, Brain, Sparkles, Zap, Clock,
  FileText, Image, Code2, Lightbulb, AlertCircle, CheckCircle2,
  ExternalLink, Quote, ThumbsUp, ThumbsDown,
  Sun, Moon, Cpu, Eye, EyeOff, Maximize2, X, Layers,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODEL = AI_MODELS[3]; // Claude 3.5 Sonnet

const RESPONSE_TEXT = "Based on your question, here are the key findings from analyzing the codebase:\n\n## Architecture Overview\nThe application follows a **modular monolith** pattern with clear separation between domain logic and infrastructure. The main entry point (`src/index.ts`) bootstraps the dependency injection container and registers all service providers.\n\n### Key Components\n1. **API Gateway** — Handles rate limiting (100 req/min), authentication via JWT, and request routing\n2. **Domain Services** — Business logic layer with repository pattern for data access\n3. **Event Bus** — Pub/sub system for cross-service communication using Redis streams\n4. **Cache Layer** — Multi-level caching with L1 (in-memory) and L2 (Redis) fallback\n\n### Performance Metrics\n- Average response time: **142ms** (p95: 380ms)\n- Cache hit ratio: **87.3%**\n- Error rate: **0.02%** over the last 30 days\n\n### Recommendations\n1. Implement circuit breakers for external API calls (currently missing)\n2. Add structured logging with correlation IDs for better tracing\n3. Consider migrating from JWT to PASETO for smaller token size\n4. The `UserService` has N+1 query issues — use DataLoader pattern";

const CITATIONS = [
  { id: 1, title: "src/services/UserService.ts", snippet: "Lines 45-62: findById method queries user individually", type: "code", relevance: 0.94 },
  { id: 2, title: "API Performance Report Q3 2024", snippet: "p95 latency increased by 18% after v2.3 release", type: "doc", relevance: 0.91 },
  { id: 3, title: "src/middleware/rateLimiter.ts", snippet: "Sliding window implementation using Redis ZSET", type: "code", relevance: 0.88 },
  { id: 4, title: "Architecture Decision Record #12", snippet: "Chose modular monolith over microservices for team size", type: "doc", relevance: 0.85 },
];

const IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", prompt: "Dashboard analytics chart" },
  { id: 2, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", prompt: "Growth metrics visualization" },
  { id: 3, url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80", prompt: "Data flow architecture" },
  { id: 4, url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80", prompt: "Team collaboration diagram" },
];

type GenerationType = "text" | "image" | "code";

export function AIGenerationResult() {
  const [isDark, setIsDark] = useState(false);
  const [genType, setGenType] = useState<GenerationType>("text");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState(RESPONSE_TEXT); // Show completed by default
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean | null>(true);
  const [expandedCitation, setExpandedCitation] = useState<number | null>(null);
  const [showCitations, setShowCitations] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const streamRef = useRef<NodeJS.Timeout | null>(null);
  const thinkingRef = useRef<NodeJS.Timeout | null>(null);

  const thinkingPhases = [
    "Analyzing query...",
    "Searching documents...",
    "Synthesizing response...",
    "Formatting output...",
  ];

  // Theme
  const bg = isDark ? "#0a0a0f" : "#ffffff";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const cardBg = isDark ? "#0d0d12" : "#fafafa";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const accent = MODEL.color;

  useEffect(() => {
    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
      if (thinkingRef.current) clearInterval(thinkingRef.current);
    };
  }, []);

  const startThinking = () => {
    setShowThinking(true);
    setThinkingPhase(0);
    let phase = 0;
    thinkingRef.current = setInterval(() => {
      phase = (phase + 1) % thinkingPhases.length;
      setThinkingPhase(phase);
    }, 700);
  };

  const stopThinking = () => {
    if (thinkingRef.current) clearInterval(thinkingRef.current);
    setShowThinking(false);
  };

  const handleRegenerate = useCallback(() => {
    setStreamingText("");
    setIsStreaming(true);
    setLiked(null);
    startThinking();

    setTimeout(() => {
      stopThinking();
      let i = 0;
      const chunkSize = 5;
      streamRef.current = setInterval(() => {
        if (i >= RESPONSE_TEXT.length) {
          if (streamRef.current) clearInterval(streamRef.current);
          setStreamingText(RESPONSE_TEXT);
          setIsStreaming(false);
          return;
        }
        setStreamingText(RESPONSE_TEXT.slice(0, i + chunkSize));
        i += chunkSize;
      }, 15);
    }, 2400);
  }, []);

  const handleStop = useCallback(() => {
    if (streamRef.current) clearInterval(streamRef.current);
    stopThinking();
    setIsStreaming(false);
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const tokenCount = Math.ceil(streamingText.length / 4);
  const elapsedTime = "2.3s";

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          {/* Generation type tabs */}
          <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
            {[
              { id: "text" as GenerationType, label: "Text", icon: FileText },
              { id: "image" as GenerationType, label: "Image", icon: Image },
              { id: "code" as GenerationType, label: "Code", icon: Code2 },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = genType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setGenType(tab.id)}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition"
                  style={{
                    background: isActive ? panelBg : "transparent",
                    color: isActive ? textPrimary : textMuted,
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px" style={{ background: border }} />

          {/* Model badge */}
          <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: `${accent}10` }}>
            <MODEL.Icon className="h-3.5 w-3.5" style={{ color: accent }} />
            <span className="text-[11px] font-semibold" style={{ color: textPrimary }}>{MODEL.name}</span>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-3 text-[10px]" style={{ color: textMuted }}>
            <span className="flex items-center gap-1"><Cpu className="h-3 w-3" />{tokenCount} tokens</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{elapsedTime}</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" />${(tokenCount / 1000 * MODEL.price / 1000).toFixed(4)}</span>
          </div>

          <div className="flex-1" />

          <button onClick={() => setShowCitations(!showCitations)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: showCitations ? accent : textMuted }} title="Toggle citations">
            <Quote className="h-4 w-4" />
          </button>
          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main result */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              <div className="mx-auto max-w-3xl px-6 py-6">
                {/* Prompt */}
                <div className="mb-6 flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden">
                    <img loading="lazy" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-[12px] font-semibold" style={{ color: textPrimary }}>You</p>
                    <p className="text-[14px] leading-relaxed" style={{ color: textSecondary }}>
                      Analyze the codebase architecture and suggest improvements for performance and maintainability.
                    </p>
                  </div>
                </div>

                {/* Response */}
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                    <MODEL.Icon className="h-4 w-4" style={{ color: accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[12px] font-semibold" style={{ color: textPrimary }}>{MODEL.name}</p>
                      {isStreaming && (
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: accent }}>
                          <span className="flex gap-0.5">
                            {[0, 1, 2].map(i => (
                              <motion.span
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                className="h-1 w-1 rounded-full"
                                style={{ background: accent }}
                              />
                            ))}
                          </span>
                          streaming
                        </span>
                      )}
                    </div>

                    {/* Thinking indicator */}
                    {showThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 rounded-xl border p-3"
                        style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Brain className="h-4 w-4" style={{ color: accent }} />
                          </motion.div>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={thinkingPhase}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.3 }}
                              className="text-[12px] font-medium"
                              style={{ color: textSecondary }}
                            >
                              {thinkingPhases[thinkingPhase]}
                            </motion.span>
                          </AnimatePresence>
                          <div className="ml-auto flex gap-1">
                            {[0, 1, 2].map(i => (
                              <motion.span
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: accent }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Response content */}
                    {genType === "text" && (
                      <div className="rounded-2xl border p-4 text-[14px] leading-relaxed" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                        <div className="whitespace-pre-wrap" style={{ color: textPrimary }}>
                          {streamingText}
                          {isStreaming && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-0.5 inline-block h-4 w-0.5" style={{ background: accent }} />}
                        </div>
                      </div>
                    )}

                    {genType === "image" && (
                      <div className="grid grid-cols-2 gap-3">
                        {IMAGES.map((img, i) => (
                          <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative cursor-pointer overflow-hidden rounded-xl border"
                            style={{ borderColor: border }}
                            onClick={() => setSelectedImage(img.id)}
                          >
                            <img loading="lazy" src={img.url} alt={img.prompt} className="aspect-square w-full object-cover transition group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100">
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-[10px] text-white">{img.prompt}</p>
                              </div>
                              <div className="absolute right-2 top-2 flex gap-1">
                                <button onClick={(e) => { e.stopPropagation(); handleCopy(`img-${img.id}`, img.prompt); }} className="flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur">
                                  {copiedId === `img-${img.id}` ? <Check className="h-3 w-3" /> : <Download className="h-3 w-3" />}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {genType === "code" && (
                      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border }}>
                        <div className="flex items-center justify-between px-3 py-2" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderBottom: `1px solid ${border}` }}>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ef4444" }} />
                              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#f59e0b" }} />
                              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#10b981" }} />
                            </div>
                            <span className="text-[11px] font-mono" style={{ color: textMuted }}>rate-limiter.ts</span>
                          </div>
                          <button onClick={() => handleCopy("code", "code snippet")} className="flex h-6 w-6 items-center justify-center rounded transition hover:bg-black/10" style={{ color: textMuted }}>
                            {copiedId === "code" ? <Check className="h-3.5 w-3.5" style={{ color: "#10b981" }} /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed" style={{ background: isDark ? "#0d0d12" : "#fafafa", scrollbarWidth: "thin" }}>
                          <code style={{ color: textPrimary, fontFamily: "monospace" }}>{`import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

export async function rateLimit(userId: string) {
  const { success, remaining } = await ratelimit.limit(userId);
  if (!success) throw new Error('Rate limit exceeded');
  return { remaining };
}`}</code>
                        </pre>
                      </div>
                    )}

                    {/* Actions */}
                    {!isStreaming && !showThinking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex items-center gap-0.5"
                      >
                        <button onClick={() => handleCopy("resp", streamingText)} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Copy">
                          {copiedId === "resp" ? <Check className="h-3.5 w-3.5" style={{ color: "#10b981" }} /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                        <button onClick={handleRegenerate} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Regenerate">
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setLiked(true)} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: liked === true ? "#10b981" : textMuted }} title="Good">
                          <ThumbsUp className="h-3.5 w-3.5" fill={liked === true ? "currentColor" : "none"} />
                        </button>
                        <button onClick={() => setLiked(false)} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: liked === false ? "#ef4444" : textMuted }} title="Bad">
                          <ThumbsDown className="h-3.5 w-3.5" fill={liked === false ? "currentColor" : "none"} />
                        </button>
                        <div className="mx-1 h-4 w-px" style={{ background: border }} />
                        <button className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Share"><Share2 className="h-3.5 w-3.5" /></button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Save"><Bookmark className="h-3.5 w-3.5" /></button>
                        {isStreaming ? (
                          <button onClick={handleStop} className="ml-auto flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "#ef4444" }}>
                            <span className="h-2 w-2 rounded-sm bg-current" /> Stop
                          </button>
                        ) : (
                          <button onClick={handleRegenerate} className="ml-auto flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition" style={{ background: `${accent}15`, color: accent }}>
                            <RefreshCw className="h-3 w-3" /> Regenerate
                          </button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence + meta bar */}
            {!isStreaming && (
              <div className="shrink-0 flex items-center gap-3 px-6 py-2" style={{ borderTop: `1px solid ${border}`, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#10b981" }} />
                  <span className="text-[10px] font-medium" style={{ color: textMuted }}>Generated successfully</span>
                </div>
                <div className="h-3 w-px" style={{ background: border }} />
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]" style={{ color: textMuted }}>Confidence:</span>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: "92%", background: "#10b981" }} />
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: "#10b981" }}>92%</span>
                </div>
              </div>
            )}
          </div>

          {/* Citations panel */}
          <AnimatePresence>
            {showCitations && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 288, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="hidden lg:flex shrink-0 flex-col overflow-hidden"
                style={{ background: panelBg, borderLeft: `1px solid ${border}` }}
              >
                <div className="w-72 flex flex-col h-full">
                  <div className="flex h-10 shrink-0 items-center gap-2 px-3" style={{ borderBottom: `1px solid ${border}` }}>
                    <Quote className="h-4 w-4" style={{ color: accent }} />
                    <span className="text-[12px] font-bold" style={{ color: textPrimary }}>Sources</span>
                    <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: `${accent}15`, color: accent }}>{CITATIONS.length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ scrollbarWidth: "none" }}>
                    {CITATIONS.map((citation, i) => {
                      const isExpanded = expandedCitation === citation.id;
                      return (
                        <motion.div
                          key={citation.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-xl border overflow-hidden"
                          style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}
                        >
                          <button
                            onClick={() => setExpandedCitation(isExpanded ? null : citation.id)}
                            className="flex w-full items-center gap-2.5 p-2.5 text-left"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded" style={{ background: citation.type === "code" ? "#8b5cf615" : "#06b6d415" }}>
                              {citation.type === "code" ? <Code2 className="h-3.5 w-3.5" style={{ color: "#8b5cf6" }} /> : <FileText className="h-3.5 w-3.5" style={{ color: "#06b6d4" }} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[11px] font-semibold" style={{ color: textPrimary }}>{citation.title}</p>
                              <p className="text-[9px]" style={{ color: textMuted }}>Relevance: {(citation.relevance * 100).toFixed(0)}%</p>
                            </div>
                            {isExpanded ? <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: textMuted }} /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: textMuted }} />}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-2.5 pb-2.5">
                                  <p className="text-[10px] leading-relaxed mb-2" style={{ color: textSecondary }}>{citation.snippet}</p>
                                  <button className="flex items-center gap-1 text-[10px] font-medium transition" style={{ color: accent }}>
                                    <ExternalLink className="h-3 w-3" />
                                    View source
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Image lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[80%] max-w-[80%]"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" src={IMAGES.find(i => i.id === selectedImage)?.url} alt="" className="rounded-xl max-h-full max-w-full" />
              <button onClick={() => setSelectedImage(null)} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
