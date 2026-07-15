"use client";
// Counter for deterministic ID generation (avoids Date.now() hydration mismatch)
let idCounter = 1000;

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Square, Copy, Check, RefreshCw, Edit3, Trash2, ThumbsUp, ThumbsDown,
  ChevronDown, Sparkles, User, Bot, Paperclip, Mic, Globe, Zap, Plus,
  Settings, Share2, Bookmark, Code2, MessageSquare, Sun, Moon, Cpu,
  Search, MoreHorizontal, Pencil, Archive, X, ChevronLeft, PanelLeft,
  Brain, Wand2, FileText, Lightbulb, ArrowUp, ImageIcon, Calculator,
} from "lucide-react";
import { AI_MODELS, type AIModel } from "./model-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

// Curated shortlist — one flagship per vendor (keeps the dropdown clean)
const MODELS = [
  AI_MODELS[0],  // GPT-4o (OpenAI)
  AI_MODELS[3],  // Claude 3.5 Sonnet (Anthropic)
  AI_MODELS[5],  // Gemini 1.5 Pro (Google)
  AI_MODELS[7],  // Llama 3.1 405B (Meta)
];

type Role = "user" | "assistant" | "system";
interface Message {
  id: string;
  role: Role;
  content: string;
  model?: string;
  tokens?: number;
  liked?: boolean | null;
  timestamp: number;
  isThinking?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

// ── Mock conversations (multiple) ──
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Vector embeddings in RAG",
    createdAt: 1752700000000,
    messages: [
      {
        id: "1",
        role: "user",
        content: "Can you explain how vector embeddings work in RAG systems?",
        timestamp: 1752700000000,
      },
      {
        id: "2",
        role: "assistant",
        content: "Vector embeddings are numerical representations of text that capture semantic meaning. In RAG systems, they work in three key steps:\n\n1. **Embedding**: Documents are split into chunks, then passed through an embedding model that converts each chunk into a high-dimensional vector (e.g., 1536 dimensions).\n\n2. **Storage**: These vectors are stored in a vector database (Pinecone, Weaviate, Chroma) along with the original text.\n\n3. **Retrieval**: When a user asks a question, the query is embedded using the same model, then the database finds the closest vectors using cosine similarity. The top-K results are injected into the LLM's context window.\n\nThis allows the LLM to access up-to-date or private data without retraining.",
        model: "claude-3.5-sonnet",
        tokens: 184,
        liked: null,
        timestamp: 1752700015000,
      },
      {
        id: "3",
        role: "user",
        content: "What's the typical latency for a retrieval step?",
        timestamp: 1752700030000,
      },
      {
        id: "4",
        role: "assistant",
        content: "Retrieval latency depends on the database and index size:\n\n• **Pinecone** (managed): ~20-50ms for 1M vectors\n• **Weaviate** (self-hosted): ~30-80ms\n• **Chroma** (local): ~5-15ms for <100K vectors\n• **pgvector** (Postgres): ~50-200ms\n\nHNSW (Hierarchical Navigable Small World) indexes are the standard — they trade a small accuracy loss for O(log N) search speed. For production RAG, budget ~100ms total for embedding + retrieval.",
        model: "claude-3.5-sonnet",
        tokens: 156,
        liked: true,
        timestamp: 1752700045000,
      },
    ],
  },
  {
    id: "conv-2",
    title: "React performance optimization",
    createdAt: 1752696600000,
    messages: [
      {
        id: "1",
        role: "user",
        content: "How do I prevent unnecessary re-renders in React?",
        timestamp: 1752696600000,
      },
      {
        id: "2",
        role: "assistant",
        content: "Here are the key strategies to prevent unnecessary re-renders:\n\n1. **React.memo()** — Wrap child components to skip re-renders when props haven't changed\n2. **useMemo()** — Memoize expensive calculations\n3. **useCallback()** — Memoize callback functions passed as props\n4. **State colocation** — Keep state as close to where it's used as possible\n5. **Key props** — Use stable keys in lists, not array indices\n\nThe most impactful is usually React.memo + useCallback together for list items.",
        model: "gpt-4o",
        tokens: 142,
        liked: null,
        timestamp: 1752696700000,
      },
    ],
  },
  {
    id: "conv-3",
    title: "TypeScript generics explained",
    createdAt: 1752614000000,
    messages: [
      {
        id: "1",
        role: "user",
        content: "Can you explain TypeScript generics with examples?",
        timestamp: 1752614000000,
      },
      {
        id: "2",
        role: "assistant",
        content: "Generics allow you to write reusable, type-safe code. Think of them as 'type variables'.\n\n```typescript\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst num = identity<number>(42);    // T = number\nconst str = identity<string>('hi'); // T = string\n```\n\nYou can also constrain generics with `extends`:\n```typescript\nfunction getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}\n```",
        model: "claude-3.5-sonnet",
        tokens: 128,
        liked: null,
        timestamp: 1752614400000,
      },
    ],
  },
];

// ── Mock responses for different prompts ──
const MOCK_RESPONSES: Record<string, string> = {
  default: "Great question! Let me break this down for you.\n\nThe key insight here is understanding the underlying architecture. When you think about it from first principles, there are three main components to consider:\n\n1. **Input processing** — How data enters the system and gets normalized\n2. **Core logic** — The main computation or transformation\n3. **Output handling** — How results are formatted and returned\n\nEach of these can be optimized independently. The most common bottleneck is usually in step 2, where you can apply caching, batching, or parallelization strategies.\n\nWould you like me to dive deeper into any of these areas?",
};

const SUGGESTIONS = [
  { icon: Code2, label: "Write a function", prompt: "Write a TypeScript function to debounce API calls with cancellation", color: "#8b5cf6" },
  { icon: Lightbulb, label: "Brainstorm ideas", prompt: "Brainstorm 5 product ideas for AI-powered productivity tools", color: "#ec4899" },
  { icon: FileText, label: "Explain a concept", prompt: "Explain how transformers work in simple terms", color: "#06b6d4" },
  { icon: Wand2, label: "Optimize code", prompt: "How do I optimize React component re-renders?", color: "#f59e0b" },
];

function getMockResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("react") || p.includes("render")) {
    return "React re-render optimization is crucial for performance. Here are the most effective techniques:\n\n1. **React.memo()** — Wraps a component to prevent re-renders when props are unchanged\n2. **useMemo()** — Caches expensive computed values between renders\n3. **useCallback()** — Stabilizes function references passed as props\n4. **State colocation** — Move state down to where it's needed most\n5. **Virtualization** — Use react-window for large lists\n\nThe biggest wins usually come from React.memo on list items + useCallback for handlers passed to those items.";
  }
  if (p.includes("typescript") || p.includes("generic")) {
    return "TypeScript generics let you write flexible, type-safe code. Here's the progression:\n\n```typescript\n// Basic generic\nfunction identity<T>(val: T): T { return val; }\n\n// Constrained generic\nfunction len<T extends { length: number }>(v: T): number { return v.length; }\n\n// Generic with default\ntype Box<T = string> = { value: T };\n```\n\nGenerics shine in collections, API wrappers, and utility functions where the exact type isn't known until use.";
  }
  if (p.includes("debounce")) {
    return "Here's a TypeScript debounce function with cancellation support:\n\n```typescript\nfunction debounce<T extends (...args: any[]) => void>(\n  fn: T,\n  delay: number\n): { call: (...args: Parameters<T>) => void; cancel: () => void } {\n  let timer: ReturnType<typeof setTimeout> | null = null;\n  return {\n    call: (...args: Parameters<T>) => {\n      if (timer) clearTimeout(timer);\n      timer = setTimeout(() => fn(...args), delay);\n    },\n    cancel: () => {\n      if (timer) { clearTimeout(timer); timer = null; }\n    },\n  };\n}\n```\n\nUsage: `const d = debounce(search, 300); d.call('query'); d.cancel();`";
  }
  if (p.includes("transformer")) {
    return "Transformers are neural networks that process sequences using **attention** — a mechanism that lets each position 'look at' all other positions.\n\n**Key idea:** Instead of processing words one-by-one (like RNNs), transformers process all words simultaneously and learn which words are relevant to each other.\n\n**How attention works:**\n- Each word becomes a Query, Key, and Value vector\n- Query × Key = 'relevance score' between word pairs\n- Softmax normalizes these scores\n- Weighted sum of Values = the new representation\n\n**Multi-head attention** runs this process multiple times in parallel, capturing different relationship types (syntax, semantics, coreference).\n\nThis architecture powers GPT, BERT, Claude, and virtually all modern LLMs.";
  }
  if (p.includes("latency") || p.includes("rag") || p.includes("vector") || p.includes("retrieval")) {
    return "In production RAG systems, retrieval is rarely the bottleneck. Here's the latency breakdown:\n\n• **Embedding the query**: ~50-100ms\n• **Vector search**: ~20-50ms (Pinecone/Weaviate)\n• **LLM generation**: 1-5s (the real bottleneck)\n\n**Optimization tips:**\n1. Cache embeddings for repeated queries\n2. Use streaming so users see tokens immediately\n3. Parallelize embedding + retrieval\n4. Re-rank results with a cross-encoder for better quality\n\nDon't over-optimize retrieval until you've addressed LLM streaming and caching.";
  }
  // Counter for deterministic ID generation (avoids Date.now() hydration mismatch)

  if (p.includes("product") || p.includes("idea") || p.includes("brainstorm")) {
    return "Here are 5 AI-powered productivity product ideas:\n\n1. **AI Meeting Concierge** — Automatically captures action items, assigns owners, and follows up via Slack\n2. **Smart Email Triage** — Categorizes, drafts replies, and schedules emails based on learned patterns\n3. **Code Review Bot** — Reviews PRs for bugs, security issues, and suggests optimizations with context\n4. **Research Assistant** — Ingests papers/docs, answers questions with citations, generates summaries\n5. **Calendar Optimizer** — Analyzes your work patterns, suggests focus blocks, auto-declines low-value meetings\n\nEach solves a specific workflow pain point with measurable time savings. Would you like me to flesh out any of these?";
  }
  return MOCK_RESPONSES.default;
}

export function AIChatInterface() {
  const [isDark, setIsDark] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(INITIAL_CONVERSATIONS[0].id);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[1]); // Claude 3.5 Sonnet
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [convMenuId, setConvMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState("");
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const thinkingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId);
  const messages = activeConversation?.messages || [];

  // Theme palette
  const bg = isDark ? "#0a0a0f" : "#ffffff";
  const sidebarBg = isDark ? "#0d0d14" : "#fafafa";
  const chatBg = isDark ? "#0f0f17" : "#ffffff";
  const userBubbleBg = isDark ? "#1a1a24" : "#f4f4f5";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const hoverBg = isDark ? "#1a1a24" : "#f4f4f5";
  const accent = selectedModel.color;

  const thinkingPhases = [
    "Analyzing your question...",
    "Searching knowledge base...",
    "Synthesizing response...",
    "Formatting output...",
  ];

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText, showThinking]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
    };
  }, []);

  // ── Conversation management ──
  const handleNewChat = useCallback(() => {
    const newConv: Conversation = {
      id: `conv-${++idCounter}`,
      title: "New chat",
      messages: [],
      createdAt: 1752700000000,
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    setInput("");
    setModelMenuOpen(false);
    setConvMenuId(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConvId(id);
    setConvMenuId(null);
    setIsStreaming(false);
    setStreamingText("");
    setShowThinking(false);
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
  }, []);

  const handleDeleteConversation = useCallback((id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (id === activeConvId && filtered.length > 0) {
        setActiveConvId(filtered[0].id);
      } else if (filtered.length === 0) {
        const newConv: Conversation = {
          id: `conv-${++idCounter}`,
          title: "New chat",
          messages: [],
          createdAt: 1752700000000,
        };
        setActiveConvId(newConv.id);
        return [newConv];
      }
      return filtered;
    });
    setConvMenuId(null);
  }, [activeConvId]);

  const handleRenameConversation = useCallback((id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setRenamingId(id);
      setRenameText(conv.title);
      setConvMenuId(null);
    }
  }, [conversations]);

  const handleSaveRename = useCallback(() => {
    if (renamingId && renameText.trim()) {
      setConversations(prev => prev.map(c => c.id === renamingId ? { ...c, title: renameText.trim() } : c));
    }
    setRenamingId(null);
    setRenameText("");
  }, [renamingId, renameText]);

  const handleArchiveConversation = useCallback((id: string) => {
    // Mock: just delete for now
    handleDeleteConversation(id);
  }, [handleDeleteConversation]);

  // ── Message management ──
  const startThinking = useCallback(() => {
    setShowThinking(true);
    setThinkingPhase(0);
    let phase = 0;
    thinkingIntervalRef.current = setInterval(() => {
      phase = (phase + 1) % thinkingPhases.length;
      setThinkingPhase(phase);
    }, 800);
  }, [thinkingPhases.length]);

  const stopThinking = useCallback(() => {
    if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
    setShowThinking(false);
  }, []);

  const handleSend = useCallback(() => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: String(++idCounter),
      role: "user",
      content: input.trim(),
      timestamp: 1752700000000,
    };

    const prompt = input.trim();
    const response = getMockResponse(prompt);

    // Update conversation
    setConversations(prev => prev.map(c => {
      if (c.id !== activeConvId) return c;
      const updatedMessages = [...c.messages, userMsg];
      // Auto-title if it's a new chat
      const title = c.title === "New chat" ? prompt.slice(0, 40) + (prompt.length > 40 ? "..." : "") : c.title;
      return { ...c, messages: updatedMessages, title };
    }));

    setInput("");
    setIsStreaming(true);
    setStreamingText("");

    // Start thinking animation
    startThinking();

    // After thinking, start streaming
    setTimeout(() => {
      stopThinking();
      setStreamingText("");

      let i = 0;
      const chunkSize = 4;
      streamIntervalRef.current = setInterval(() => {
        if (i >= response.length) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          const assistantMsg: Message = {
            id: String(++idCounter),
            role: "assistant",
            content: response,
            model: selectedModel.id,
            tokens: Math.ceil(response.length / 4),
            liked: null,
            timestamp: 1752700000000,
          };
          setConversations(prev => prev.map(c => {
            if (c.id !== activeConvId) return c;
            return { ...c, messages: [...c.messages, assistantMsg] };
          }));
          setStreamingText("");
          setIsStreaming(false);
          return;
        }
        setStreamingText(response.slice(0, i + chunkSize));
        i += chunkSize;
      }, 15);
    }, 2400); // 2.4s thinking phase
  }, [input, isStreaming, activeConvId, selectedModel, startThinking, stopThinking]);

  const handleStop = useCallback(() => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
    stopThinking();
    if (streamingText) {
      const partialMsg: Message = {
        id: String(++idCounter),
        role: "assistant",
        content: streamingText + "... [stopped]",
        model: selectedModel.id,
        tokens: Math.ceil(streamingText.length / 4),
        liked: null,
        timestamp: 1752700000000,
      };
      setConversations(prev => prev.map(c => {
        if (c.id !== activeConvId) return c;
        return { ...c, messages: [...c.messages, partialMsg] };
      }));
    }
    setStreamingText("");
    setIsStreaming(false);
  }, [streamingText, selectedModel, activeConvId, stopThinking]);

  const handleCopy = useCallback((id: string, content: string) => {
    navigator.clipboard?.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleRegenerate = useCallback((id: string) => {
    // Find the user message before this assistant message
    const conv = conversations.find(c => c.id === activeConvId);
    if (!conv) return;
    const idx = conv.messages.findIndex(m => m.id === id);
    if (idx === -1) return;
    const userMsg = conv.messages[idx - 1];
    if (!userMsg || userMsg.role !== "user") return;

    const response = getMockResponse(userMsg.content);

    // Remove the assistant message
    setConversations(prev => prev.map(c => {
      if (c.id !== activeConvId) return c;
      return { ...c, messages: c.messages.filter(m => m.id !== id) };
    }));

    setIsStreaming(true);
    setStreamingText("");
    startThinking();

    setTimeout(() => {
      stopThinking();
      let i = 0;
      streamIntervalRef.current = setInterval(() => {
        if (i >= response.length) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          const newMsg: Message = {
            id: String(++idCounter),
            role: "assistant",
            content: response,
            model: selectedModel.id,
            tokens: Math.ceil(response.length / 4),
            liked: null,
            timestamp: 1752700000000,
          };
          setConversations(prev => prev.map(c => {
            if (c.id !== activeConvId) return c;
            return { ...c, messages: [...c.messages, newMsg] };
          }));
          setStreamingText("");
          setIsStreaming(false);
          return;
        }
        setStreamingText(response.slice(0, i + 4));
        i += 4;
      }, 15);
    }, 2400);
  }, [conversations, activeConvId, selectedModel, startThinking, stopThinking]);

  const handleLike = useCallback((id: string, liked: boolean) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== activeConvId) return c;
      return { ...c, messages: c.messages.map(m => m.id === id ? { ...m, liked: m.liked === liked ? null : liked } : m) };
    }));
  }, [activeConvId]);

  const handleEdit = useCallback((id: string, content: string) => {
    setEditingId(id);
    setEditText(content);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingId && editText.trim()) {
      // Edit the user message, then regenerate the assistant response after it
      const conv = conversations.find(c => c.id === activeConvId);
      if (conv) {
        const idx = conv.messages.findIndex(m => m.id === editingId);
        const editedContent = editText.trim();
        const response = getMockResponse(editedContent);

        // Remove all messages after the edited one (including old assistant response)
        setConversations(prev => prev.map(c => {
          if (c.id !== activeConvId) return c;
          const updated = c.messages.slice(0, idx + 1).map(m => m.id === editingId ? { ...m, content: editedContent } : m);
          return { ...c, messages: updated };
        }));

        setEditingId(null);
        setEditText("");

        // Regenerate response
        setIsStreaming(true);
        setStreamingText("");
        startThinking();

        setTimeout(() => {
          stopThinking();
          let i = 0;
          streamIntervalRef.current = setInterval(() => {
            if (i >= response.length) {
              if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
              const newMsg: Message = {
                id: String(++idCounter),
                role: "assistant",
                content: response,
                model: selectedModel.id,
                tokens: Math.ceil(response.length / 4),
                liked: null,
                timestamp: 1752700000000,
              };
              setConversations(prev => prev.map(c => {
                if (c.id !== activeConvId) return c;
                return { ...c, messages: [...c.messages, newMsg] };
              }));
              setStreamingText("");
              setIsStreaming(false);
              return;
            }
            setStreamingText(response.slice(0, i + 4));
            i += 4;
          }, 15);
        }, 2400);
      }
    } else {
      setEditingId(null);
      setEditText("");
    }
  }, [editingId, editText, conversations, activeConvId, selectedModel, startThinking, stopThinking]);

  const handleDeleteMessage = useCallback((id: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== activeConvId) return c;
      return { ...c, messages: c.messages.filter(m => m.id !== id) };
    }));
  }, [activeConvId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const totalTokens = messages.reduce((sum, m) => sum + (m.tokens || 0), 0);
  const totalCost = (totalTokens / 1000 * selectedModel.price / 1000).toFixed(4);

  // Filter conversations by search
  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const todayConvs = filteredConversations.filter(c => (1752700000000 - c.createdAt) < 86400000);
  const olderConvs = filteredConversations.filter(c => (1752700000000 - c.createdAt) >= 86400000);

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      {/* ── LEFT SIDEBAR: Conversations ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative shrink-0 overflow-hidden"
            style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}
          >
            <div className="flex h-full w-64 flex-col">
              {/* New chat */}
              <div className="p-3">
                <button
                  onClick={handleNewChat}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90"
                  style={{ background: accent, boxShadow: `0 4px 12px ${accent}30` }}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  New chat
                </button>
              </div>

              {/* Search */}
              <div className="px-3 pb-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chats..."
                    className="w-full rounded-lg border py-2 pl-8 pr-3 text-[12px] outline-none focus:ring-1"
                    style={{ background: inputBg, borderColor: border, color: textPrimary }}
                  />
                </div>
              </div>

              {/* Conversation list */}
              <div className="flex-1 overflow-y-auto px-2" style={{ scrollbarWidth: "none" }}>
                {todayConvs.length > 0 && (
                  <>
                    <p className="px-2 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Today</p>
                    {todayConvs.map(conv => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        isActive={conv.id === activeConvId}
                        isDark={isDark}
                        textPrimary={textPrimary}
                        textSecondary={textSecondary}
                        textMuted={textMuted}
                        hoverBg={hoverBg}
                        accent={accent}
                        border={border}
                        menuOpen={convMenuId === conv.id}
                        renamingId={renamingId}
                        renameText={renameText}
                        setRenameText={setRenameText}
                        onSaveRename={handleSaveRename}
                        onSelect={() => handleSelectConversation(conv.id)}
                        onMenuToggle={() => setConvMenuId(convMenuId === conv.id ? null : conv.id)}
                        onDelete={() => handleDeleteConversation(conv.id)}
                        onRename={() => handleRenameConversation(conv.id)}
                        onArchive={() => handleArchiveConversation(conv.id)}
                      />
                    ))}
                  </>
                )}
                {olderConvs.length > 0 && (
                  <>
                    <p className="px-2 py-2 mt-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Previous 7 Days</p>
                    {olderConvs.map(conv => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        isActive={conv.id === activeConvId}
                        isDark={isDark}
                        textPrimary={textPrimary}
                        textSecondary={textSecondary}
                        textMuted={textMuted}
                        hoverBg={hoverBg}
                        accent={accent}
                        border={border}
                        menuOpen={convMenuId === conv.id}
                        renamingId={renamingId}
                        renameText={renameText}
                        setRenameText={setRenameText}
                        onSaveRename={handleSaveRename}
                        onSelect={() => handleSelectConversation(conv.id)}
                        onMenuToggle={() => setConvMenuId(convMenuId === conv.id ? null : conv.id)}
                        onDelete={() => handleDeleteConversation(conv.id)}
                        onRename={() => handleRenameConversation(conv.id)}
                        onArchive={() => handleArchiveConversation(conv.id)}
                      />
                    ))}
                  </>
                )}
                {filteredConversations.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[12px]" style={{ color: textMuted }}>No conversations found</p>
                  </div>
                )}
              </div>

              {/* Bottom: user + settings */}
              <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/5">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="User" className="h-8 w-8 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>Alex Morgan</p>
                    <p className="truncate text-[10px]" style={{ color: textMuted }}>Pro plan</p>
                  </div>
                  <button onClick={() => setIsDark(!isDark)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
                    {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CHAT AREA ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${border}`, background: chatBg }}>
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: textMuted }}
          >
            <PanelLeft className="h-4 w-4" />
          </button>

          {/* Model selector */}
          <div className="relative">
            <button
              onClick={() => setModelMenuOpen(!modelMenuOpen)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: textPrimary }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `${selectedModel.color}15` }}>
                <selectedModel.Icon className="h-4 w-4" style={{ color: selectedModel.color }} />
              </div>
              {selectedModel.name}
              <ChevronDown className="h-3.5 w-3.5" style={{ color: textMuted }} />
            </button>
            <AnimatePresence>
              {modelMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="fixed z-[9999] mt-1 w-72 rounded-xl border p-1.5 shadow-2xl" style={{ background: chatBg, borderColor: border }}
                >
                  {MODELS.map(model => {
                    const ModelIcon = model.Icon;
                    return (
                    <button
                      key={model.id}
                      onClick={() => { setSelectedModel(model); setModelMenuOpen(false); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${model.color}15` }}>
                        <ModelIcon className="h-5 w-5" style={{ color: model.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold" style={{ color: textPrimary }}>{model.name}</span>
                          <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase" style={{ background: `${model.color}20`, color: model.color }}>{model.badge}</span>
                        </div>
                        <p className="text-[10px]" style={{ color: textMuted }}>{model.vendor} · {model.context} context · ${model.price}/M tokens</p>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check className="h-4 w-4 shrink-0" style={{ color: accent }} />
                      )}
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
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" />
              {totalTokens.toLocaleString()} tokens
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              ${totalCost}
            </span>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Share">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Bookmark">
            <Bookmark className="h-4 w-4" />
          </button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          <div className="mx-auto max-w-3xl px-4 py-6">
            {messages.length === 0 && !isStreaming && (
              <div className="flex flex-col items-center justify-center py-16">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)`, boxShadow: `0 8px 24px ${accent}40` }}
                >
                  <Sparkles className="h-8 w-8 text-white" />
                </motion.div>
                <h2 className="text-[20px] font-bold" style={{ color: textPrimary }}>How can I help you today?</h2>
                <p className="mt-1 text-[13px]" style={{ color: textMuted }}>Ask anything, or try a suggestion below</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {SUGGESTIONS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => { setInput(s.prompt); setTimeout(() => inputRef.current?.focus(), 50); }}
                        className="flex items-center gap-2.5 rounded-xl border p-3 text-left transition hover:scale-[1.02]"
                        style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${s.color}15` }}>
                          <Icon className="h-4 w-4" style={{ color: s.color }} />
                        </div>
                        <span className="text-[12px] font-medium" style={{ color: textPrimary }}>{s.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isDark={isDark}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                textMuted={textMuted}
                userBubbleBg={userBubbleBg}
                border={border}
                accent={accent}
                inputBg={inputBg}
                copiedId={copiedId}
                editingId={editingId}
                editText={editText}
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                onLike={handleLike}
                onEdit={handleEdit}
                onSaveEdit={handleSaveEdit}
                onDelete={handleDeleteMessage}
                setEditText={setEditText}
                models={MODELS}
              />
            ))}

            {/* AI Thinking indicator */}
            {showThinking && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                  <selectedModel.Icon className="h-4 w-4" style={{ color: accent }} />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[12px] font-semibold" style={{ color: textPrimary }}>{selectedModel.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl border px-4 py-3" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                    {/* Animated thinking brain */}
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
                        className="text-[13px] font-medium"
                        style={{ color: textSecondary }}
                      >
                        {thinkingPhases[thinkingPhase]}
                      </motion.span>
                    </AnimatePresence>
                    {/* Pulsing dots */}
                    <div className="flex gap-1 ml-auto">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: accent }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Streaming message */}
            {isStreaming && !showThinking && streamingText && (
              <div className="mb-6 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                  <selectedModel.Icon className="h-4 w-4" style={{ color: accent }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[12px] font-semibold" style={{ color: textPrimary }}>{selectedModel.name}</span>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: accent }}>
                      <span className="flex gap-0.5">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="h-1 w-1 rounded-full" style={{ background: accent }} />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.15 }} className="h-1 w-1 rounded-full" style={{ background: accent }} />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} className="h-1 w-1 rounded-full" style={{ background: accent }} />
                      </span>
                      streaming...
                    </span>
                  </div>
                  <div className="text-[14px] leading-relaxed whitespace-pre-wrap" style={{ color: textPrimary }}>
                    {streamingText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-0.5 inline-block h-4 w-0.5"
                      style={{ background: accent }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="shrink-0 px-4 pb-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-2xl border transition focus-within:ring-2" style={{ background: inputBg, borderColor: border, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI..."
                rows={1}
                className="w-full resize-none rounded-2xl bg-transparent px-4 py-3.5 text-[14px] outline-none"
                style={{ color: textPrimary, maxHeight: "200px" }}
                disabled={isStreaming}
              />
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-3 pb-2.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Attach file">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Voice input">
                  <Mic className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Web search">
                  <Globe className="h-4 w-4" />
                </button>
                <div className="flex-1" />
                {isStreaming ? (
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition hover:opacity-90"
                    style={{ background: "#ef4444" }}
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition disabled:opacity-30"
                    style={{ background: accent }}
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2 text-center text-[10px]" style={{ color: textMuted }}>
              AI can make mistakes. Verify important info. Press Enter to send, Shift+Enter for new line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Conversation Item ──
function ConversationItem({
  conv, isActive, isDark, textPrimary, textSecondary, textMuted, hoverBg, accent, border,
  menuOpen, renamingId, renameText, setRenameText, onSaveRename,
  onSelect, onMenuToggle, onDelete, onRename, onArchive,
}: {
  conv: Conversation; isActive: boolean; isDark: boolean;
  textPrimary: string; textSecondary: string; textMuted: string; hoverBg: string; accent: string; border: string;
  menuOpen: boolean; renamingId: string | null; renameText: string;
  setRenameText: (s: string) => void; onSaveRename: () => void;
  onSelect: () => void; onMenuToggle: () => void; onDelete: () => void; onRename: () => void; onArchive: () => void;
}) {
  const isRenaming = renamingId === conv.id;

  return (
    <div className="relative mb-0.5">
      {isRenaming ? (
        <div className="flex items-center gap-1 rounded-lg px-2 py-1.5" style={{ background: hoverBg }}>
          <input
            value={renameText}
            onChange={(e) => setRenameText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onSaveRename(); if (e.key === "Escape") onSaveRename(); }}
            onBlur={onSaveRename}
            autoFocus
            className="flex-1 bg-transparent text-[12.5px] outline-none"
            style={{ color: textPrimary }}
          />
          <button onClick={onSaveRename} className="flex h-6 w-6 items-center justify-center rounded" style={{ color: accent }}>
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={onSelect}
          className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12.5px] transition"
          style={{
            background: isActive ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
            color: isActive ? textPrimary : textSecondary,
            borderLeft: isActive ? `2px solid ${accent}` : "2px solid transparent",
          }}
        >
          <MessageSquare className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? accent : textMuted }} />
          <span className="truncate flex-1">{conv.title}</span>
          {/* Menu button */}
          <span
            onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition group-hover:opacity-100"
            style={{ color: textMuted }}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </span>
        </button>
      )}

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="fixed z-[9999] mt-1 w-40 rounded-xl border p-1 shadow-xl"
            style={{ background: isDark ? "#1a1a24" : "#ffffff", borderColor: border }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onRename(); }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: textPrimary }}
            >
              <Pencil className="h-3.5 w-3.5" style={{ color: textMuted }} />
              Rename
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onArchive(); }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: textPrimary }}
            >
              <Archive className="h-3.5 w-3.5" style={{ color: textMuted }} />
              Archive
            </button>
            <div className="my-1 h-px" style={{ background: border }} />
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition hover:bg-rose-50 dark:hover:bg-rose-950/20"
              style={{ color: "#ef4444" }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Message Bubble ──
function MessageBubble({
  msg, isDark, textPrimary, textSecondary, textMuted, userBubbleBg, border, accent, inputBg,
  copiedId, editingId, editText, onCopy, onRegenerate, onLike, onEdit, onSaveEdit, onDelete, setEditText, models,
}: {
  msg: Message; isDark: boolean; textPrimary: string; textSecondary: string; textMuted: string;
  userBubbleBg: string; border: string; accent: string; inputBg: string;
  copiedId: string | null; editingId: string | null; editText: string;
  onCopy: (id: string, content: string) => void;
  onRegenerate: (id: string) => void;
  onLike: (id: string, liked: boolean) => void;
  onEdit: (id: string, content: string) => void;
  onSaveEdit: () => void;
  onDelete: (id: string) => void;
  setEditText: (s: string) => void;
  models: typeof MODELS;
}) {
  const isUser = msg.role === "user";
  const isEditing = editingId === msg.id;
  const model = models.find(m => m.id === msg.model);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={`mb-6 flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: isUser ? userBubbleBg : `${model?.color || accent}15`,
          border: isUser ? `1px solid ${border}` : "none",
        }}
      >
        {isUser ? (
          <User className="h-4 w-4" style={{ color: textSecondary }} />
        ) : model?.Icon ? (
          <model.Icon className="h-4 w-4" style={{ color: model.color }} />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={`min-w-0 flex-1 ${isUser ? "max-w-[85%]" : ""}`}>
        {/* Header */}
        <div className={`mb-1 flex items-center gap-2 ${isUser ? "justify-end" : ""}`}>
          <span className="text-[12px] font-semibold" style={{ color: textPrimary }}>
            {isUser ? "You" : model?.name || "AI"}
          </span>
          {!isUser && msg.tokens && (
            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: textMuted }}>
              {msg.tokens} tokens
            </span>
          )}
        </div>

        {/* Message body */}
        {isEditing ? (
          <div className="rounded-xl border p-2" style={{ background: inputBg, borderColor: border }}>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg bg-transparent px-2 py-1 text-[14px] outline-none"
              style={{ color: textPrimary }}
              autoFocus
            />
            <div className="flex justify-end gap-2 px-2 pb-1">
              <button onClick={() => { onDelete(editingId!); }} className="rounded-md px-2.5 py-1 text-[11px] font-medium transition" style={{ color: textMuted }}>
                Cancel
              </button>
              <button onClick={onSaveEdit} className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: accent }}>
                Save &amp; Submit
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl px-4 py-3 text-[14px] leading-relaxed"
            style={{
              background: isUser ? userBubbleBg : "transparent",
              color: textPrimary,
              border: isUser ? "none" : `1px solid ${border}`,
            }}
          >
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className={`mt-1.5 flex items-center gap-0.5 ${isUser ? "justify-end" : ""}`}>
            <button
              onClick={() => onCopy(msg.id, msg.content)}
              className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: textMuted }}
              title="Copy"
            >
              {copiedId === msg.id ? <Check className="h-3.5 w-3.5" style={{ color: "#10b981" }} /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            {isUser ? (
              <button
                onClick={() => onEdit(msg.id, msg.content)}
                className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: textMuted }}
                title="Edit & resubmit"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onRegenerate(msg.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: textMuted }}
                  title="Regenerate"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onLike(msg.id, true)}
                  className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: msg.liked === true ? "#10b981" : textMuted }}
                  title="Good response"
                >
                  <ThumbsUp className="h-3.5 w-3.5" fill={msg.liked === true ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => onLike(msg.id, false)}
                  className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: msg.liked === false ? "#ef4444" : textMuted }}
                  title="Bad response"
                >
                  <ThumbsDown className="h-3.5 w-3.5" fill={msg.liked === false ? "currentColor" : "none"} />
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(msg.id)}
              className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/20"
              style={{ color: textMuted }}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
