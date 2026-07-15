"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Square, Plus, Zap, GitBranch, Terminal, FileOutput, Brain,
  Settings, Trash2, Copy, Check, ChevronDown,
  Sun, Moon, Workflow, Cpu, Clock, CheckCircle2, AlertCircle,
  Loader2, MousePointer2, Sparkles, Search, Download, Share2, Save,
  Hand, Maximize2, Layers, Webhook, Database, Code, Filter, GitMerge,
  Type, Image, Mail, MessageSquare, Bell,
} from "lucide-react";
import { AI_MODELS, type AIModel } from "./model-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

type NodeType = "trigger" | "llm" | "tool" | "condition" | "output" | "input";
type NodeStatus = "idle" | "running" | "done" | "error";

interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  status: NodeStatus;
  modelId?: string;
  config?: Record<string, string>;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

const NODE_TYPES: Record<NodeType, { color: string; icon: typeof Zap; label: string; description: string }> = {
  trigger: { color: "#10b981", icon: Zap, label: "Trigger", description: "Start workflow on event" },
  input: { color: "#06b6d4", icon: Type, label: "Input", description: "User input or data source" },
  llm: { color: "#8b5cf6", icon: Brain, label: "LLM Call", description: "AI model invocation" },
  tool: { color: "#f59e0b", icon: Terminal, label: "Tool", description: "Execute external tool" },
  condition: { color: "#ec4899", icon: GitBranch, label: "Condition", description: "Branch on logic" },
  output: { color: "#3b82f6", icon: FileOutput, label: "Output", description: "Send result" },
};

const NODE_TEMPLATES: Record<NodeType, { title: string; subtitle: string; config: Record<string, string> }> = {
  trigger: { title: "Webhook", subtitle: "POST /api/trigger", config: { url: "/api/trigger", method: "POST" } },
  input: { title: "User Message", subtitle: "Text input", config: { type: "text", required: "true" } },
  llm: { title: "AI Model", subtitle: "Generate response", config: { model: "claude-3.5-sonnet", temperature: "0.7" } },
  tool: { title: "Search Tool", subtitle: "Vector search", config: { db: "pinecone", topK: "5" } },
  condition: { title: "If / Else", subtitle: "Branch logic", config: { operator: ">", threshold: "0.8" } },
  output: { title: "Send Response", subtitle: "WebSocket push", config: { channel: "websocket" } },
};

const INITIAL_NODES: WorkflowNode[] = [
  { id: "n1", type: "trigger", title: "Webhook", subtitle: "POST /api/chat", x: 40, y: 120, status: "done", config: { url: "/api/chat", method: "POST" } },
  { id: "n2", type: "input", title: "User Message", subtitle: "Chat input", x: 260, y: 120, status: "done", config: { type: "text", required: "true" } },
  { id: "n3", type: "llm", title: "Classify Intent", subtitle: "GPT-4o · 0.3 temp", x: 480, y: 60, status: "done", modelId: "gpt-4o", config: { model: "gpt-4o", temperature: "0.3" } },
  { id: "n4", type: "tool", title: "Search Knowledge", subtitle: "Pinecone · top-5", x: 480, y: 220, status: "done", config: { db: "pinecone", topK: "5" } },
  { id: "n5", type: "condition", title: "Confidence > 0.8?", subtitle: "Branch on score", x: 700, y: 140, status: "done", config: { operator: ">", threshold: "0.8" } },
  { id: "n6", type: "llm", title: "Generate Response", subtitle: "Claude 3.5 · 0.7", x: 920, y: 60, status: "running", modelId: "claude-3.5-sonnet", config: { model: "claude-3.5-sonnet", temperature: "0.7" } },
  { id: "n7", type: "output", title: "Send Reply", subtitle: "WebSocket push", x: 920, y: 220, status: "idle", config: { channel: "websocket" } },
];

const INITIAL_CONNECTIONS: Connection[] = [
  { id: "c1", from: "n1", to: "n2" },
  { id: "c2", from: "n2", to: "n3" },
  { id: "c3", from: "n2", to: "n4" },
  { id: "c4", from: "n3", to: "n5" },
  { id: "c5", from: "n4", to: "n5" },
  { id: "c6", from: "n5", to: "n6" },
  { id: "c7", from: "n5", to: "n7" },
];

interface LogEntry {
  id: string;
  nodeId: string;
  nodeTitle: string;
  status: NodeStatus;
  message: string;
  timestamp: number;
  duration?: number;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: "l1", nodeId: "n1", nodeTitle: "Webhook", status: "done", message: "Received POST /api/chat", timestamp: Date.now() - 5000, duration: 12 },
  { id: "l2", nodeId: "n2", nodeTitle: "User Message", status: "done", message: "Input: 'How do I reset password?'", timestamp: Date.now() - 4800, duration: 2 },
  { id: "l3", nodeTitle: "Classify Intent", nodeId: "n3", status: "done", message: "Intent: 'question' · confidence: 0.94", timestamp: Date.now() - 4400, duration: 340 },
  { id: "l4", nodeId: "n4", nodeTitle: "Search Knowledge", status: "done", message: "Found 5 results · top score: 0.91", timestamp: Date.now() - 4000, duration: 87 },
  { id: "l5", nodeId: "n5", nodeTitle: "Confidence Check", status: "done", message: "0.94 > 0.8 → true branch", timestamp: Date.now() - 3900, duration: 2 },
  { id: "l6", nodeId: "n6", nodeTitle: "Generate Response", status: "running", message: "Streaming tokens... 142/200", timestamp: Date.now() - 1000 },
];

const NODE_WIDTH = 180;
const NODE_HEIGHT = 72;

export function AgentWorkflowBuilder() {
  const [isDark, setIsDark] = useState(true); // dark default for premium feel
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [selectedNode, setSelectedNode] = useState<string | null>("n6");
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rightTab, setRightTab] = useState<"inspector" | "logs">("inspector");
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 400 });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      setCanvasSize({ width: canvas.clientWidth, height: canvas.clientHeight });
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Theme
  const bg = isDark ? "#0a0a0f" : "#f4f4f5";
  const canvasBg = isDark ? "#0d0d12" : "#ffffff";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const sidebarBg = isDark ? "#0d0d12" : "#fafafa";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const hoverBg = isDark ? "#1a1a24" : "#f4f4f5";
  const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";

  const selectedNodeData = nodes.find(n => n.id === selectedNode);
  const selectedModel = selectedNodeData?.modelId ? AI_MODELS.find(m => m.id === selectedNodeData.modelId) : null;

  // Drag node
  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    setDraggingNode(nodeId);
    setDragOffset({
      x: (e.clientX - canvasRect.left - pan.x) / zoom - node.x,
      y: (e.clientY - canvasRect.top - pan.y) / zoom - node.y,
    });
    setSelectedNode(nodeId);
  }, [nodes, pan, zoom]);

  // Mouse move for dragging + connecting
  useEffect(() => {
    if (!draggingNode && !isPanning) return;
    const handleMove = (e: MouseEvent) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      if (draggingNode) {
        const x = (e.clientX - canvasRect.left - pan.x) / zoom - dragOffset.x;
        const y = (e.clientY - canvasRect.top - pan.y) / zoom - dragOffset.y;
        setNodes(prev => prev.map(n => n.id === draggingNode ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n));
      } else if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
      }
    };
    const handleUp = () => {
      setDraggingNode(null);
      setIsPanning(false);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [draggingNode, isPanning, pan, panStart, dragOffset, zoom]);

  // Track mouse for connection preview
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (!connectingFrom) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    setMousePos({
      x: (e.clientX - canvasRect.left - pan.x) / zoom,
      y: (e.clientY - canvasRect.top - pan.y) / zoom,
    });
  }, [connectingFrom, pan, zoom]);

  // Start connection
  const handleConnectionStart = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingFrom(nodeId);
  }, []);

  // Complete connection
  const handleNodeMouseUp = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (connectingFrom && connectingFrom !== nodeId) {
      const exists = connections.some(c => c.from === connectingFrom && c.to === nodeId);
      if (!exists) {
        setConnections(prev => [...prev, { id: `c${Date.now()}`, from: connectingFrom!, to: nodeId }]);
      }
    }
    setConnectingFrom(null);
  }, [connectingFrom, connections]);

  // Canvas pan
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.canvas === "true") {
      setSelectedNode(null);
      setSelectedConnection(null);
      if (e.button === 0) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    }
  }, [pan]);

  // Add node from palette
  const handleAddNode = useCallback((type: NodeType) => {
    const template = NODE_TEMPLATES[type];
    const newNode: WorkflowNode = {
      id: `n${Date.now()}`,
      type,
      title: template.title,
      subtitle: template.subtitle,
      x: 200 - pan.x / zoom + Math.random() * 100,
      y: 200 - pan.y / zoom + Math.random() * 100,
      status: "idle",
      config: template.config,
      modelId: type === "llm" ? "gpt-4o" : undefined,
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
  }, [pan, zoom]);

  // Delete node
  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) setSelectedNode(null);
  }, [selectedNode]);

  // Delete connection
  const handleDeleteConnection = useCallback((connId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connId));
    setSelectedConnection(null);
  }, []);

  // Run single node
  const handleRunNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: "running" } : n));
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: "done" } : n));
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setLogs(prev => [...prev, {
          id: `l${Date.now()}`,
          nodeId,
          nodeTitle: node.title,
          status: "done",
          message: "Execution completed",
          timestamp: Date.now(),
          duration: Math.floor(Math.random() * 400 + 50),
        }]);
      }
    }, 2000);
  }, [nodes]);

  // Run all
  const handleRunAll = useCallback(() => {
    setIsRunning(true);
    setNodes(prev => prev.map(n => ({ ...n, status: "idle" as NodeStatus })));
    const order = ["n1", "n2", "n3", "n4", "n5", "n6", "n7"];
    order.forEach((id, i) => {
      setTimeout(() => handleRunNode(id), i * 700);
    });
    setTimeout(() => setIsRunning(false), order.length * 700 + 2000);
  }, [handleRunNode]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    setNodes(prev => prev.map(n => n.status === "running" ? { ...n, status: "idle" } : n));
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Get connection path
  const getConnectionPath = (from: WorkflowNode, to: WorkflowNode) => {
    const x1 = from.x + NODE_WIDTH;
    const y1 = from.y + NODE_HEIGHT / 2;
    const x2 = to.x;
    const y2 = to.y + NODE_HEIGHT / 2;
    const dx = Math.max(50, (x2 - x1) / 2);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      {/* ── LEFT: Node Palette ── */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col" style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}>
        <div className="flex h-12 shrink-0 items-center gap-2 px-3" style={{ borderBottom: `1px solid ${border}` }}>
          <Workflow className="h-4 w-4" style={{ color: "#8b5cf6" }} />
          <span className="text-[13px] font-bold" style={{ color: textPrimary }}>Nodes</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4" style={{ scrollbarWidth: "none" }}>
          {/* Node types */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Add Node</p>
            <div className="space-y-1.5">
              {(Object.keys(NODE_TYPES) as NodeType[]).map(type => {
                const style = NODE_TYPES[type];
                const Icon = style.icon;
                return (
                  <button
                    key={type}
                    onClick={() => handleAddNode(type)}
                    className="group flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left transition hover:scale-[1.02]"
                    style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition group-hover:scale-110" style={{ background: `${style.color}15` }}>
                      <Icon className="h-4 w-4" style={{ color: style.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold" style={{ color: textPrimary }}>{style.label}</p>
                      <p className="truncate text-[9px]" style={{ color: textMuted }}>{style.description}</p>
                    </div>
                    <Plus className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" style={{ color: textMuted }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Templates */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Templates</p>
            <div className="space-y-1">
              {[
                { name: "RAG Pipeline", icon: Database, color: "#10b981" },
                { name: "Chat Agent", icon: MessageSquare, color: "#8b5cf6" },
                { name: "Code Review", icon: Code, color: "#f59e0b" },
                { name: "Data Extract", icon: Filter, color: "#06b6d4" },
                { name: "Notification", icon: Bell, color: "#ec4899" },
              ].map(tpl => {
                const Icon = tpl.icon;
                return (
                  <button key={tpl.name} className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textSecondary }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: tpl.color }} />
                    <span className="flex-1">{tpl.name}</span>
                    <ChevronDown className="h-3 w-3 -rotate-90 opacity-0 transition group-hover:opacity-50" />
                  </button>
                );
              })}
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

      {/* ── MAIN: Canvas + Right Panel ── */}
      <div className="flex min-w-0 flex-1">
        {/* Canvas area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Toolbar */}
          <header className="flex h-12 shrink-0 items-center gap-2 px-4" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold" style={{ color: textPrimary }}>Customer Support Agent</span>
              <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)", color: "#8b5cf6" }}>v2.4</span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: isRunning ? "#f59e0b" : textMuted }}>
                {isRunning && <Loader2 className="h-3 w-3 animate-spin" />}
                {isRunning ? "Running" : "Idle"}
              </span>
            </div>

            <div className="flex-1" />

            {/* Zoom */}
            <div className="flex items-center gap-1 rounded-lg border px-1.5 py-1" style={{ borderColor: border }}>
              <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="flex h-6 w-6 items-center justify-center rounded text-[14px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>−</button>
              <span className="min-w-[36px] text-center text-[11px] font-medium tabular-nums" style={{ color: textSecondary }}>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="flex h-6 w-6 items-center justify-center rounded text-[14px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>+</button>
            </div>

            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Reset view">
              <Maximize2 className="h-4 w-4" />
            </button>

            <div className="h-5 w-px" style={{ background: border }} />

            <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Save"><Save className="h-4 w-4" /></button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Share"><Share2 className="h-4 w-4" /></button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }} title="Export"><Download className="h-4 w-4" /></button>

            <div className="h-5 w-px" style={{ background: border }} />

            {isRunning ? (
              <button onClick={handleStop} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition" style={{ background: "#ef4444" }}>
                <Square className="h-3.5 w-3.5 fill-current" />
                Stop
              </button>
            ) : (
              <button onClick={handleRunAll} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition" style={{ background: "#10b981", boxShadow: "0 2px 8px rgba(16,185,129,0.3)" }}>
                <Play className="h-3.5 w-3.5 fill-current" />
                Run
              </button>
            )}
          </header>

          {/* Canvas */}
          <div
            ref={canvasRef}
            data-canvas="true"
            className="relative flex-1 overflow-hidden"
            style={{ background: canvasBg, cursor: isPanning ? "grabbing" : draggingNode ? "grabbing" : "default" }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
          >
            {/* Grid */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, ${gridColor} 1px, transparent 0)`,
                backgroundSize: "20px 20px",
                backgroundPosition: `${pan.x}px ${pan.y}px`,
                transform: `scale(${zoom})`,
                transformOrigin: "0 0",
              }}
            />

            {/* Pannable content */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
              }}
            >
              {/* SVG connections */}
              <svg
                className="pointer-events-none absolute"
                style={{ width: "2000px", height: "1000px", top: 0, left: 0, overflow: "visible" }}
              >
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill={isDark ? "#525252" : "#a1a1aa"} />
                  </marker>
                </defs>
                {connections.map(conn => {
                  const from = nodes.find(n => n.id === conn.from);
                  const to = nodes.find(n => n.id === conn.to);
                  if (!from || !to) return null;
                  const path = getConnectionPath(from, to);
                  const isSelected = selectedConnection === conn.id;
                  return (
                    <g key={conn.id} className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedConnection(conn.id); }}>
                      {/* Invisible thick path for easier clicking */}
                      <path d={path} fill="none" stroke="transparent" strokeWidth={16} />
                      {/* Visible path */}
                      <path
                        d={path}
                        fill="none"
                        stroke={isSelected ? "#8b5cf6" : isDark ? "#2a2a35" : "#d4d4d8"}
                        strokeWidth={isSelected ? 2.5 : 2}
                        markerEnd="url(#arrowhead)"
                      />
                      {/* Animated flow particle */}
                      {isRunning && from.status === "done" && to.status !== "idle" && (
                        <circle r="3" fill={NODE_TYPES[from.type].color}>
                          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                        </circle>
                      )}
                      {/* Delete button on selected */}
                      {isSelected && (
                        <g>
                          <circle cx={(from.x + NODE_WIDTH + to.x) / 2} cy={(from.y + to.y) / 2 + NODE_HEIGHT / 2 - 10} r="10" fill="#ef4444" />
                          <text x={(from.x + NODE_WIDTH + to.x) / 2} y={(from.y + to.y) / 2 + NODE_HEIGHT / 2 - 7} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDeleteConnection(conn.id); }}>×</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Connection preview line while dragging */}
                {connectingFrom && (() => {
                  const from = nodes.find(n => n.id === connectingFrom);
                  if (!from) return null;
                  const x1 = from.x + NODE_WIDTH;
                  const y1 = from.y + NODE_HEIGHT / 2;
                  return (
                    <path
                      d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${mousePos.x - 50} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  );
                })()}
              </svg>

              {/* Nodes */}
              {nodes.map(node => {
                const nodeType = NODE_TYPES[node.type];
                const Icon = nodeType.icon;
                const isSelected = selectedNode === node.id;
                const model = node.modelId ? AI_MODELS.find(m => m.id === node.modelId) : null;
                const ModelIcon = model?.Icon;
                return (
                  <div
                    key={node.id}
                    data-node={node.id}
                    className="absolute select-none"
                    style={{ left: node.x, top: node.y, width: NODE_WIDTH, cursor: draggingNode === node.id ? "grabbing" : "grab" }}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    onMouseUp={(e) => handleNodeMouseUp(e, node.id)}
                    onClick={(e) => { e.stopPropagation(); setSelectedNode(node.id); }}
                  >
                    <motion.div
                      layout
                      className="relative rounded-xl border transition"
                      style={{
                        background: isDark ? "#14141c" : "#ffffff",
                        borderColor: isSelected ? nodeType.color : isDark ? "#2a2a35" : "#e4e4e7",
                        boxShadow: isSelected
                          ? `0 0 0 2px ${nodeType.color}40, 0 12px 32px rgba(0,0,0,0.3)`
                          : "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* Status bar at top */}
                      <div className="h-1 rounded-t-xl" style={{ background: node.status === "running" ? nodeType.color : node.status === "done" ? "#10b981" : node.status === "error" ? "#ef4444" : isDark ? "#2a2a35" : "#e4e4e7" }} />

                      <div className="p-2.5">
                        {/* Header */}
                        <div className="mb-1.5 flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: `${nodeType.color}15` }}>
                            <Icon className="h-3.5 w-3.5" style={{ color: nodeType.color }} />
                          </div>
                          <p className="min-w-0 flex-1 truncate text-[11.5px] font-bold" style={{ color: textPrimary }}>{node.title}</p>
                          {node.status === "running" && <Loader2 className="h-3 w-3 animate-spin" style={{ color: nodeType.color }} />}
                          {node.status === "done" && <CheckCircle2 className="h-3 w-3" style={{ color: "#10b981" }} />}
                          {node.status === "error" && <AlertCircle className="h-3 w-3" style={{ color: "#ef4444" }} />}
                        </div>
                        {/* Subtitle with model icon */}
                        <div className="flex items-center gap-1">
                          {ModelIcon && <ModelIcon className="h-2.5 w-2.5" style={{ color: model?.color }} />}
                          <p className="truncate text-[9px]" style={{ color: textMuted }}>{node.subtitle}</p>
                        </div>
                      </div>

                      {/* Input port (left) */}
                      <div
                        className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 transition hover:scale-125"
                        style={{ background: isDark ? "#0d0d12" : "#fff", borderColor: nodeType.color }}
                      />
                      {/* Output port (right) */}
                      <div
                        onMouseDown={(e) => handleConnectionStart(e, node.id)}
                        className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 cursor-crosshair rounded-full border-2 transition hover:scale-125"
                        style={{ background: isDark ? "#0d0d12" : "#fff", borderColor: nodeType.color }}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Minimap */}
            <div className="absolute bottom-3 right-3 rounded-lg border p-2" style={{ background: isDark ? "rgba(15,15,23,0.9)" : "rgba(255,255,255,0.9)", borderColor: border, backdropFilter: "blur(8px)" }}>
              <div className="relative" style={{ width: 120, height: 70, background: isDark ? "#0a0a0f" : "#f4f4f5", borderRadius: 4, overflow: "hidden" }}>
                {nodes.map(n => {
                  const nodeType = NODE_TYPES[n.type];
                  return (
                    <div
                      key={n.id}
                      className="absolute rounded-sm"
                      style={{
                        left: (n.x / 12) + 5,
                        top: (n.y / 12) + 5,
                        width: 6,
                        height: 4,
                        background: nodeType.color,
                      }}
                    />
                  );
                })}
                {/* Viewport indicator */}
                <div
                  className="absolute border"
                  style={{
                    left: (-pan.x / zoom) / 12 + 5,
                    top: (-pan.y / zoom) / 12 + 5,
                    width: canvasSize.width / zoom / 12,
                    height: canvasSize.height / zoom / 12,
                    borderColor: "#8b5cf6",
                    background: "rgba(139,92,246,0.1)",
                  }}
                />
              </div>
              <p className="mt-1 text-center text-[8px] font-medium" style={{ color: textMuted }}>Mini-map</p>
            </div>

            {/* Canvas info overlay */}
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border px-2.5 py-1.5" style={{ background: isDark ? "rgba(15,15,23,0.9)" : "rgba(255,255,255,0.9)", borderColor: border, backdropFilter: "blur(8px)" }}>
              <MousePointer2 className="h-3 w-3" style={{ color: textMuted }} />
              <span className="text-[10px] font-medium" style={{ color: textSecondary }}>Drag nodes · Scroll canvas · Click port to connect</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Inspector + Logs ── */}
        <aside className="hidden lg:flex w-80 shrink-0 flex-col" style={{ background: panelBg, borderLeft: `1px solid ${border}` }}>
          {/* Tabs */}
          <div className="flex h-10 shrink-0 items-center gap-1 px-2" style={{ borderBottom: `1px solid ${border}` }}>
            <button
              onClick={() => setRightTab("inspector")}
              className="flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold transition"
              style={rightTab === "inspector" ? { background: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)", color: "#8b5cf6" } : { color: textMuted }}
            >
              Inspector
            </button>
            <button
              onClick={() => setRightTab("logs")}
              className="flex-1 rounded-md px-3 py-1.5 text-[12px] font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              style={rightTab === "logs" ? { background: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)", color: "#8b5cf6" } : { color: textMuted }}
            >
              Logs
              <span className="ml-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}>{logs.length}</span>
            </button>
          </div>

          {rightTab === "inspector" ? (
            <div className="flex-1 overflow-y-auto p-3" style={{ scrollbarWidth: "none" }}>
              {selectedNodeData ? (
                <>
                  {/* Node header */}
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${NODE_TYPES[selectedNodeData.type].color}15` }}>
                      {(() => {
                        const Icon = NODE_TYPES[selectedNodeData.type].icon;
                        return <Icon className="h-4.5 w-4.5" style={{ color: NODE_TYPES[selectedNodeData.type].color }} />;
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-bold" style={{ color: textPrimary }}>{selectedNodeData.title}</p>
                      <p className="truncate text-[10px]" style={{ color: textMuted }}>{selectedNodeData.subtitle}</p>
                    </div>
                    <StatusBadge status={selectedNodeData.status} isDark={isDark} />
                  </div>

                  {/* Type + ID */}
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: `${NODE_TYPES[selectedNodeData.type].color}15`, color: NODE_TYPES[selectedNodeData.type].color }}>{NODE_TYPES[selectedNodeData.type].label}</span>
                    <span className="text-[10px] font-mono" style={{ color: textMuted }}>{selectedNodeData.id}</span>
                  </div>

                  {/* Title input */}
                  <div className="mb-3">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Title</label>
                    <input
                      value={selectedNodeData.title}
                      onChange={(e) => setNodes(prev => prev.map(n => n.id === selectedNodeData.id ? { ...n, title: e.target.value } : n))}
                      className="w-full rounded-lg border px-2.5 py-1.5 text-[12px] outline-none focus:ring-1"
                      style={{ background: inputBg, borderColor: border, color: textPrimary }}
                    />
                  </div>

                  {/* Model selector (for LLM nodes) */}
                  {selectedNodeData.type === "llm" && (
                    <div className="mb-3">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Model</label>
                      <ModelSelector
                        selectedModelId={selectedNodeData.modelId || "gpt-4o"}
                        onSelect={(modelId) => setNodes(prev => prev.map(n => n.id === selectedNodeData.id ? { ...n, modelId, subtitle: `${AI_MODELS.find(m => m.id === modelId)?.name} · ${n.config?.temperature || "0.7"} temp` } : n))}
                        isDark={isDark}
                        textPrimary={textPrimary}
                        textMuted={textMuted}
                        border={border}
                        inputBg={inputBg}
                      />
                    </div>
                  )}

                  {/* Config fields */}
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Configuration</p>
                  <div className="space-y-2">
                    {selectedNodeData.config && Object.entries(selectedNodeData.config).map(([key, value]) => (
                      <div key={key} className="rounded-lg border p-2" style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider" style={{ color: textMuted }}>{key}</p>
                        <p className="text-[12px] font-mono" style={{ color: textPrimary }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleRunNode(selectedNodeData.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white transition"
                      style={{ background: NODE_TYPES[selectedNodeData.type].color }}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Test node
                    </button>
                    <button
                      onClick={() => handleDeleteNode(selectedNodeData.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/20"
                      style={{ borderColor: border, color: textMuted }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-4">
                  <div className="text-center">
                    <MousePointer2 className="mx-auto mb-2 h-8 w-8" style={{ color: textMuted }} />
                    <p className="text-[12px]" style={{ color: textMuted }}>Select a node to inspect</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth: "none" }}>
              {logs.slice().reverse().map(log => {
                const node = nodes.find(n => n.id === log.nodeId);
                return (
                  <div key={log.id} className="group mb-1 flex items-start gap-2 rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/5">
                    <StatusIcon status={log.status} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[11px] font-semibold" style={{ color: textPrimary }}>{log.nodeTitle}</span>
                        {log.duration && (
                          <span className="text-[9px] font-medium" style={{ color: textMuted }}>{log.duration}ms</span>
                        )}
                      </div>
                      <p className="truncate text-[10px]" style={{ color: textSecondary }}>{log.message}</p>
                    </div>
                    <button
                      onClick={() => handleCopyLog(log.id, log.message)}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition group-hover:opacity-100"
                      style={{ color: textMuted }}
                    >
                      {copiedId === log.id ? <Check className="h-3 w-3" style={{ color: "#10b981" }} /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

// ── Status Badge ──
function StatusBadge({ status, isDark }: { status: NodeStatus; isDark: boolean }) {
  const styles: Record<NodeStatus, { color: string; label: string; icon: typeof CheckCircle2 }> = {
    idle: { color: "#71717a", label: "Idle", icon: Clock },
    running: { color: "#f59e0b", label: "Running", icon: Loader2 },
    done: { color: "#10b981", label: "Done", icon: CheckCircle2 },
    error: { color: "#ef4444", label: "Error", icon: AlertCircle },
  };
  const s = styles[status];
  const Icon = s.icon;
  return (
    <span className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase" style={{ background: `${s.color}15`, color: s.color }}>
      <Icon className={`h-2.5 w-2.5 ${status === "running" ? "animate-spin" : ""}`} />
      {s.label}
    </span>
  );
}

// ── Status Icon ──
function StatusIcon({ status }: { status: NodeStatus }) {
  const styles: Record<NodeStatus, { color: string; icon: typeof CheckCircle2 }> = {
    idle: { color: "#71717a", icon: Clock },
    running: { color: "#f59e0b", icon: Loader2 },
    done: { color: "#10b981", icon: CheckCircle2 },
    error: { color: "#ef4444", icon: AlertCircle },
  };
  const s = styles[status];
  const Icon = s.icon;
  return <Icon className={`h-3.5 w-3.5 shrink-0 ${status === "running" ? "animate-spin" : ""}`} style={{ color: s.color }} />;
}

// ── Model Selector with real brand icons ──
function ModelSelector({
  selectedModelId, onSelect, isDark, textPrimary, textMuted, border, inputBg,
}: {
  selectedModelId: string; onSelect: (id: string) => void;
  isDark: boolean; textPrimary: string; textMuted: string; border: string; inputBg: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];
  const SelectedIcon = selected.Icon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-[12px] font-medium outline-none transition hover:bg-black/5 dark:hover:bg-white/5"
        style={{ background: inputBg, borderColor: border, color: textPrimary }}
      >
        <SelectedIcon className="h-4 w-4 shrink-0" style={{ color: selected.color }} />
        <span className="flex-1 text-left truncate">{selected.name}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: textMuted }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: EASE }}
            className="fixed z-[9999] mt-1 max-h-64 overflow-y-auto rounded-xl border p-1.5 shadow-2xl"
            style={{ background: isDark ? "#14141c" : "#ffffff", borderColor: border, scrollbarWidth: "none" }}
          >
            {AI_MODELS.map(model => {
              const Icon = model.Icon;
              return (
                <button
                  key={model.id}
                  onClick={() => { onSelect(model.id); setOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: model.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold" style={{ color: textPrimary }}>{model.name}</span>
                      <span className="rounded px-1 py-0.5 text-[7px] font-bold uppercase" style={{ background: `${model.color}20`, color: model.color }}>{model.badge}</span>
                    </div>
                    <p className="text-[9px]" style={{ color: textMuted }}>{model.vendor} · {model.context} · ${model.price}/M</p>
                  </div>
                  {selectedModelId === model.id && <Check className="h-3.5 w-3.5 shrink-0" style={{ color: "#8b5cf6" }} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function handleCopyLog(id: string, text: string) {
  navigator.clipboard?.writeText(text);
}
