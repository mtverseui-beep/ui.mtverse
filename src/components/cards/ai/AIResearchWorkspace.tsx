"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Link2,
  LoaderCircle,
  Menu,
  Moon,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Send,
  Sparkles,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";
import {
  AI_FOCUS_RESET,
  getAIPalette,
  ModernSelect,
  type ModernSelectOption,
  ProfileAvatar,
  usePreviewTheme,
} from "./ai-ui";

type SourceKind = "Web" | "Paper" | "Document";
type ResearchState = "idle" | "researching" | "complete";

interface ResearchSource {
  id: string;
  title: string;
  domain: string;
  kind: SourceKind;
  relevance: number;
  selected: boolean;
}

const MODELS = [AI_MODELS[10], AI_MODELS[3], AI_MODELS[0], AI_MODELS[5]];
const MODEL_OPTIONS: ModernSelectOption[] = MODELS.map((model) => ({
  value: model.id,
  label: model.name,
  meta: `${model.vendor} · ${model.context} context`,
  color: model.color,
  Icon: model.Icon,
}));

const DEPTH_OPTIONS: ModernSelectOption[] = [
  { value: "quick", label: "Quick scan", meta: "5–8 sources · about 30 sec" },
  { value: "deep", label: "Deep research", meta: "15–25 sources · multi-step" },
  { value: "academic", label: "Academic review", meta: "Papers first · strict citations" },
];

const INITIAL_SOURCES: ResearchSource[] = [
  { id: "s1", title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", domain: "arxiv.org", kind: "Paper", relevance: 98, selected: true },
  { id: "s2", title: "Production RAG: evaluation, observability and reliability", domain: "research.google", kind: "Web", relevance: 94, selected: true },
  { id: "s3", title: "A practical guide to hybrid search", domain: "pinecone.io", kind: "Web", relevance: 89, selected: true },
  { id: "s4", title: "Q2 knowledge platform architecture notes", domain: "Workspace PDF", kind: "Document", relevance: 86, selected: true },
  { id: "s5", title: "Reranking strategies for enterprise search", domain: "cohere.com", kind: "Web", relevance: 82, selected: false },
];

const STEPS = [
  "Understanding the research question",
  "Searching trusted sources",
  "Comparing claims and evidence",
  "Writing a cited synthesis",
];

const REPORT = [
  {
    title: "Executive summary",
    body: "Production RAG quality depends less on the vector database brand and more on retrieval evaluation, source freshness, reranking, and clear fallback behavior. Strong systems measure whether the correct evidence was retrieved before scoring the generated answer.",
  },
  {
    title: "What consistently works",
    body: "Hybrid retrieval combines semantic vectors with keyword matching, then reranks a wider candidate set. Chunking should follow document structure instead of fixed token windows, while metadata filters keep access control and tenant boundaries deterministic.",
  },
  {
    title: "Recommended operating model",
    body: "Start with a small golden dataset, track retrieval recall and citation correctness, and inspect failed queries weekly. Add query rewriting only after the baseline is measurable. Route low-confidence requests to clarification or human review instead of forcing an answer.",
  },
];

let sourceCounter = 20;

export function AIResearchWorkspace() {
  const { isDark, setIsDark } = usePreviewTheme();
  const palette = getAIPalette(isDark);
  const [sources, setSources] = useState(INITIAL_SOURCES);
  const [sourceSearch, setSourceSearch] = useState("");
  const [query, setQuery] = useState("What makes a production RAG system reliable and how should a team evaluate it?");
  const [lastQuery, setLastQuery] = useState(query);
  const [selectedModelId, setSelectedModelId] = useState<string>(MODELS[0].id);
  const [depth, setDepth] = useState("deep");
  const [researchState, setResearchState] = useState<ResearchState>("complete");
  const [activeStep, setActiveStep] = useState(STEPS.length);
  const [activeTab, setActiveTab] = useState<"report" | "notes" | "sources">("report");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [addSourceOpen, setAddSourceOpen] = useState(false);
  const [sourceDraft, setSourceDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(true);
  const [composerFocused, setComposerFocused] = useState(false);
  const timersRef = useRef<number[]>([]);

  const selectedModel = MODELS.find((model) => model.id === selectedModelId) ?? MODELS[0];
  const accent = selectedModel.color;
  const filteredSources = useMemo(() => {
    const normalized = sourceSearch.trim().toLowerCase();
    return normalized
      ? sources.filter((source) => `${source.title} ${source.domain}`.toLowerCase().includes(normalized))
      : sources;
  }, [sourceSearch, sources]);
  const selectedCount = sources.filter((source) => source.selected).length;

  useEffect(() => {
    return () => timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const runResearch = () => {
    if (!query.trim() || researchState === "researching") return;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setLastQuery(query.trim());
    setResearchState("researching");
    setActiveStep(0);
    setActiveTab("report");
    setSaved(false);
    STEPS.forEach((_, index) => {
      const timer = window.setTimeout(() => setActiveStep(index + 1), 620 * (index + 1));
      timersRef.current.push(timer);
    });
    const doneTimer = window.setTimeout(() => {
      setResearchState("complete");
      setActiveStep(STEPS.length);
    }, 620 * STEPS.length + 280);
    timersRef.current.push(doneTimer);
  };

  const stopResearch = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setResearchState("idle");
  };

  const addSource = () => {
    const value = sourceDraft.trim();
    if (!value) return;
    let domain = "Custom source";
    try {
      domain = new URL(value.startsWith("http") ? value : `https://${value}`).hostname.replace("www.", "");
    } catch {
      domain = "Pasted research note";
    }
    sourceCounter += 1;
    setSources((current) => [
      { id: `s${sourceCounter}`, title: value.length > 52 ? `${value.slice(0, 52)}…` : value, domain, kind: value.includes(".") ? "Web" : "Document", relevance: 80, selected: true },
      ...current,
    ]);
    setSourceDraft("");
    setAddSourceOpen(false);
  };

  const copyReport = async () => {
    const text = `${lastQuery}\n\n${REPORT.map((section) => `${section.title}\n${section.body}`).join("\n\n")}`;
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const exportReport = () => {
    const body = `# Research brief\n\n## Question\n${lastQuery}\n\n${REPORT.map((section) => `## ${section.title}\n${section.body}`).join("\n\n")}\n\n## Sources\n${sources.filter((source) => source.selected).map((source) => `- ${source.title} (${source.domain})`).join("\n")}`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/markdown" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-research-brief.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: palette.background, color: palette.text }}>
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="relative z-20 hidden shrink-0 overflow-hidden border-r md:block"
            style={{ background: palette.panel, borderColor: palette.border }}
          >
            <div className="flex h-full w-[280px] flex-col">
              <div className="flex h-[60px] items-center justify-between border-b px-4" style={{ borderColor: palette.border }}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#18181b] text-white dark:bg-white dark:text-[#18181b]">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold">Research desk</p>
                    <p className="text-[8.5px]" style={{ color: palette.muted }}>Evidence-first workspace</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className={`flex h-7 w-7 items-center justify-center rounded-lg ${AI_FOCUS_RESET}`} style={{ color: palette.muted }} aria-label="Close sources panel">
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: palette.border, background: palette.elevated }}>
                  <Search className="h-3.5 w-3.5" style={{ color: palette.muted }} />
                  <input value={sourceSearch} onChange={(event) => setSourceSearch(event.target.value)} placeholder="Search sources" className={`min-w-0 flex-1 bg-transparent text-[10px] ${AI_FOCUS_RESET}`} style={{ color: palette.text }} />
                </div>
                <button onClick={() => setAddSourceOpen(true)} className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-semibold ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, background: palette.elevated, color: palette.secondary }}>
                  <Plus className="h-3.5 w-3.5" /> Add source
                </button>
              </div>

              <div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto px-3 pb-3">
                <div className="mb-2 flex items-center justify-between px-1 text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: palette.muted }}>
                  <span>Sources</span><span>{selectedCount} active</span>
                </div>
                <div className="space-y-1.5">
                  {filteredSources.map((source) => (
                    <button key={source.id} onClick={() => setSources((current) => current.map((item) => item.id === source.id ? { ...item, selected: !item.selected } : item))} className={`w-full rounded-xl border p-3 text-left transition ${AI_FOCUS_RESET}`} style={{ borderColor: source.selected ? `${accent}50` : palette.border, background: source.selected ? `${accent}0d` : palette.elevated }}>
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: palette.surface, color: source.selected ? accent : palette.muted }}>
                          {source.kind === "Paper" ? <FileText className="h-3.5 w-3.5" /> : source.kind === "Document" ? <Archive className="h-3.5 w-3.5" /> : <Globe2 className="h-3.5 w-3.5" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 block text-[10px] font-semibold leading-snug">{source.title}</span>
                          <span className="mt-1 flex items-center gap-1 text-[8px]" style={{ color: palette.muted }}>{source.domain}<span>·</span>{source.relevance}% match</span>
                        </span>
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: source.selected ? accent : palette.border, background: source.selected ? accent : "transparent" }}>
                          {source.selected && <Check className="h-2.5 w-2.5 text-white" />}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="relative z-30 flex h-[60px] shrink-0 items-center gap-2 border-b px-3 sm:px-4" style={{ borderColor: palette.border, background: palette.panel }}>
          {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className={`flex h-8 w-8 items-center justify-center rounded-lg border ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: palette.muted }} aria-label="Open sources panel"><PanelLeftOpen className="h-4 w-4" /></button>}
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold">Production RAG reliability</p>
            <p className="text-[8.5px]" style={{ color: palette.muted }}>{selectedCount} sources · cited report</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden w-[190px] sm:block"><ModernSelect value={selectedModelId} options={MODEL_OPTIONS} onChange={setSelectedModelId} palette={palette} accent={accent} compact align="right" /></div>
            <button onClick={() => setSaved((current) => !current)} className={`hidden items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[9px] font-semibold sm:flex ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: saved ? "#10b981" : palette.secondary }}><CheckCircle2 className="h-3.5 w-3.5" />{saved ? "Saved" : "Save"}</button>
            <button onClick={() => setIsDark(!isDark)} className={`flex h-8 w-8 items-center justify-center rounded-lg border ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: palette.muted }} aria-label="Toggle theme">{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <ProfileAvatar />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center gap-1 border-b px-3 py-2 sm:px-5" style={{ borderColor: palette.border, background: palette.background }}>
            {(["report", "notes", "sources"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-3 py-1.5 text-[9.5px] font-semibold capitalize ${AI_FOCUS_RESET}`} style={{ background: activeTab === tab ? palette.surface : "transparent", color: activeTab === tab ? palette.text : palette.muted }}>{tab}</button>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <button onClick={() => void copyReport()} className={`flex h-7 w-7 items-center justify-center rounded-lg ${AI_FOCUS_RESET}`} style={{ color: copied ? "#10b981" : palette.muted }} aria-label="Copy report">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}</button>
              <button onClick={exportReport} className={`flex h-7 w-7 items-center justify-center rounded-lg ${AI_FOCUS_RESET}`} style={{ color: palette.muted }} aria-label="Export report"><Download className="h-3.5 w-3.5" /></button>
              <button className={`flex h-7 w-7 items-center justify-center rounded-lg ${AI_FOCUS_RESET}`} style={{ color: palette.muted }} aria-label="More actions"><MoreHorizontal className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          <section className="scrollbar-modern min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-7">
              <div className="mb-5 flex items-start gap-3">
                <ProfileAvatar size="lg" />
                <div className="min-w-0 rounded-2xl border px-4 py-3 text-[12px] leading-relaxed" style={{ borderColor: palette.border, background: palette.elevated }}>{lastQuery}</div>
              </div>

              {researchState === "researching" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-2xl border p-4" style={{ borderColor: palette.border, background: palette.panel }}>
                  <div className="mb-3 flex items-center gap-2"><LoaderCircle className="h-4 w-4 animate-spin" style={{ color: accent }} /><span className="text-[11px] font-bold">Researching across {selectedCount} sources</span><span className="ml-auto text-[9px]" style={{ color: palette.muted }}>{Math.round((activeStep / STEPS.length) * 100)}%</span></div>
                  <div className="h-1 overflow-hidden rounded-full" style={{ background: palette.surface }}><motion.div animate={{ width: `${(activeStep / STEPS.length) * 100}%` }} className="h-full rounded-full" style={{ background: accent }} /></div>
                  <div className="mt-3 grid gap-1.5 sm:grid-cols-2">{STEPS.map((step, index) => <div key={step} className="flex items-center gap-2 text-[9px]" style={{ color: index < activeStep ? palette.secondary : palette.muted }}>{index < activeStep ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : index === activeStep ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" style={{ color: accent }} /> : <span className="h-3.5 w-3.5 rounded-full border" style={{ borderColor: palette.border }} />}{step}</div>)}</div>
                </motion.div>
              )}

              {activeTab === "report" && researchState !== "idle" && (
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${accent}16`, color: accent }}><selectedModel.Icon className="h-5 w-5" /></span>
                  <article className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2"><span className="text-[11px] font-bold">Research synthesis</span><span className="rounded-full px-2 py-0.5 text-[8px] font-semibold" style={{ color: accent, background: `${accent}14` }}>{selectedModel.name}</span></div>
                    <div className="space-y-3">{REPORT.map((section, index) => <motion.section key={section.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: palette.border, background: palette.elevated }}><h3 className="mb-2 text-[12px] font-bold">{section.title}</h3><p className="text-[11px] leading-6" style={{ color: palette.secondary }}>{section.body}</p><div className="mt-3 flex flex-wrap gap-1.5">{sources.filter((source) => source.selected).slice(index, index + 2).map((source, citeIndex) => <button key={source.id} onClick={() => setActiveTab("sources")} className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[8px] ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: palette.muted }}><span style={{ color: accent }}>[{index + citeIndex + 1}]</span>{source.domain}<ExternalLink className="h-2.5 w-2.5" /></button>)}</div></motion.section>)}</div>
                  </article>
                </div>
              )}

              {activeTab === "notes" && <div className="grid gap-3 sm:grid-cols-2">{["Evaluation before generation", "Hybrid retrieval", "Confidence-aware fallback", "Weekly failure review"].map((note, index) => <button key={note} className={`rounded-2xl border p-4 text-left ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, background: palette.elevated }}><span className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${accent}14`, color: accent }}><Clipboard className="h-3.5 w-3.5" /></span><p className="text-[11px] font-bold">{note}</p><p className="mt-1 text-[9.5px] leading-relaxed" style={{ color: palette.muted }}>Captured from source {index + 1} and linked to the final recommendation.</p></button>)}</div>}
              {activeTab === "sources" && <div className="space-y-2">{sources.filter((source) => source.selected).map((source, index) => <div key={source.id} className="flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: palette.border, background: palette.elevated }}><span className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold" style={{ background: `${accent}14`, color: accent }}>{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-[10.5px] font-semibold">{source.title}</p><p className="text-[8.5px]" style={{ color: palette.muted }}>{source.domain} · {source.kind} · {source.relevance}% relevance</p></div><ChevronRight className="h-4 w-4" style={{ color: palette.muted }} /></div>)}</div>}
              {researchState === "idle" && <div className="flex flex-col items-center justify-center py-20 text-center"><Search className="mb-3 h-8 w-8" style={{ color: palette.muted }} /><p className="text-[12px] font-bold">Research stopped</p><p className="mt-1 text-[10px]" style={{ color: palette.muted }}>Edit the question and run it again when ready.</p></div>}
            </div>
          </section>

          <div className="shrink-0 border-t p-3 sm:p-4" style={{ borderColor: palette.border, background: palette.panel }}>
            <div className="mx-auto max-w-4xl">
              <div className="mb-2 flex items-center gap-2"><div className="w-[170px]"><ModernSelect value={depth} options={DEPTH_OPTIONS} onChange={setDepth} palette={palette} accent={accent} compact /></div><span className="text-[8.5px]" style={{ color: palette.muted }}>{selectedCount} selected sources</span></div>
              <div className="flex items-end gap-2 rounded-2xl border p-2 transition" style={{ borderColor: composerFocused ? `${accent}80` : palette.border, background: palette.elevated, boxShadow: composerFocused ? `0 0 0 3px ${accent}10` : "none" }}>
                <textarea value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setComposerFocused(true)} onBlur={() => setComposerFocused(false)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); runResearch(); } }} rows={1} placeholder="Ask a research question…" style={{ color: palette.text, outline: "none", boxShadow: "none" }} className={`max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2.5 text-[11px] ${AI_FOCUS_RESET}`} />
                {researchState === "researching" ? <button onClick={stopResearch} className={`flex h-10 items-center gap-2 rounded-xl bg-red-500 px-3 text-[10px] font-bold text-white ${AI_FOCUS_RESET}`}><X className="h-3.5 w-3.5" />Stop</button> : <button onClick={runResearch} disabled={!query.trim()} className={`flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-bold text-white disabled:opacity-30 ${AI_FOCUS_RESET}`} style={{ background: accent }}><Sparkles className="h-3.5 w-3.5" />Research</button>}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {addSourceOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-center justify-center bg-black/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setAddSourceOpen(false); }}><motion.div initial={{ scale: 0.96, y: 8 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-sm rounded-2xl border p-4 shadow-2xl" style={{ borderColor: palette.border, background: palette.elevated }}><div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${accent}14`, color: accent }}><Link2 className="h-4 w-4" /></span><div><p className="text-[11px] font-bold">Add research source</p><p className="text-[9px]" style={{ color: palette.muted }}>Paste a URL or a short evidence note</p></div><button onClick={() => setAddSourceOpen(false)} className={`ml-auto ${AI_FOCUS_RESET}`} style={{ color: palette.muted }}><X className="h-4 w-4" /></button></div><input autoFocus value={sourceDraft} onChange={(event) => setSourceDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addSource(); }} placeholder="https://example.com/research" className={`w-full rounded-xl border px-3 py-3 text-[10px] ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, background: palette.surface, color: palette.text }} /><button onClick={addSource} disabled={!sourceDraft.trim()} className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-bold text-white disabled:opacity-30 ${AI_FOCUS_RESET}`} style={{ background: accent }}><Plus className="h-3.5 w-3.5" />Add to workspace</button></motion.div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
