"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bold, Italic, List, Link2, Code, Eye, Pencil, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// RichTextEditorCard — 3 unique editor variants:
// 1. Markdown — type markdown, live preview toggle
// 2. WYSIWYG — toolbar buttons that format text inline
// 3. Command — slash command menu (type / to open)

export function RichTextEditorCard() {
  return (
    <motion.div className="w-[clamp(320px,95vw,520px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"><Pencil className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Rich Text Editor</h2><p className="text-[10.5px] cs-muted">Markdown · WYSIWYG · slash — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <MarkdownEditor />
          <WysiwygEditor />
          <SlashCommandEditor />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">3 completely different editing experiences</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Markdown — type + live preview toggle ──
function MarkdownEditor() {
  const [text, setText] = useState("# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2");
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const renderPreview = (md: string) => {
    return md
      .replace(/^# (.+)$/gm, '<h1 class="text-[16px] font-bold cs-text mb-1">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold cs-text">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic cs-text">$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-3 cs-text">• $1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Markdown</span>
        <div className="flex gap-1 rounded-lg cs-input p-0.5">
          <button type="button" onClick={() => setMode("edit")} className="flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold transition" style={{ background: mode === "edit" ? "var(--card-surface)" : "transparent", color: mode === "edit" ? "var(--card-text)" : "var(--card-text-muted)", boxShadow: mode === "edit" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}><Pencil className="h-2.5 w-2.5" strokeWidth={2.2} />Edit</button>
          <button type="button" onClick={() => setMode("preview")} className="flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold transition" style={{ background: mode === "preview" ? "var(--card-surface)" : "transparent", color: mode === "preview" ? "var(--card-text)" : "var(--card-text-muted)", boxShadow: mode === "preview" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}><Eye className="h-2.5 w-2.5" strokeWidth={2.2} />Preview</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border cs-border">
        <AnimatePresence mode="wait">
          {mode === "edit" ? (
            <motion.textarea key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} value={text} onChange={e => setText(e.target.value)} rows={5} className="w-full resize-none bg-transparent p-3 font-mono text-[11px] leading-relaxed cs-text focus:outline-none" style={{ background: "var(--card-input-bg)" }} />
          ) : (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 text-[11px] leading-relaxed" style={{ background: "var(--card-input-bg)" }} dangerouslySetInnerHTML={{ __html: renderPreview(text) }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── 2. WYSIWYG — toolbar + contenteditable ──
function WysiwygEditor() {
  const [active, setActive] = useState<Set<string>>(new Set());
  const tools = [
    { id: "bold", icon: Bold, label: "Bold" },
    { id: "italic", icon: Italic, label: "Italic" },
    { id: "list", icon: List, label: "List" },
    { id: "link", icon: Link2, label: "Link" },
    { id: "code", icon: Code, label: "Code" },
  ];

  const toggle = (id: string) => setActive(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · WYSIWYG Toolbar</span>
      <div className="overflow-hidden rounded-xl border cs-border">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 border-b cs-border px-2 py-1.5" style={{ background: "var(--card-input-bg)" }}>
          {tools.map(t => { const Icon = t.icon; const isOn = active.has(t.id); return (
            <motion.button key={t.id} type="button" onClick={() => toggle(t.id)} whileTap={{ scale: 0.9 }} className="flex h-7 w-7 items-center justify-center rounded-md transition focus-visible:outline-none" style={{ background: isOn ? "rgba(139,92,246,0.15)" : "transparent", color: isOn ? "#8b5cf6" : "var(--card-text-muted)" }} aria-label={t.label}>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.button>
          ); })}
          <div className="ml-auto text-[8px] font-bold cs-subtle">WYSIWYG</div>
        </div>
        {/* Content area */}
        <div contentEditable suppressContentEditableWarning className="min-h-[80px] p-3 text-[11px] leading-relaxed cs-text focus:outline-none" style={{ background: "var(--card-input-bg)" }}>
          Start typing... use the toolbar above to format.
        </div>
      </div>
    </div>
  );
}

// ── 3. Slash command — type / to open command menu ──
function SlashCommandEditor() {
  const [text, setText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState(0);
  const commands = [
    { id: "h1", label: "Heading 1", icon: Bold, desc: "Large section title" },
    { id: "list", label: "Bullet List", icon: List, desc: "Unordered list" },
    { id: "code", label: "Code Block", icon: Code, desc: "Inline or block code" },
    { id: "link", label: "Link", icon: Link2, desc: "Insert a hyperlink" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setShowMenu(val.endsWith("/"));
  };

  const insert = (cmd: typeof commands[0]) => { setText(text.slice(0, -1) + `[${cmd.label}] `); setShowMenu(false); };

  return (
    <div>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Slash Command</span>
      <div className="relative">
        <textarea value={text} onChange={handleChange} onKeyDown={e => { if (showMenu) { if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, commands.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); } else if (e.key === "Enter" && commands[active]) { e.preventDefault(); insert(commands[active]); } else if (e.key === "Escape") setShowMenu(false); } }} rows={3} placeholder="Type / to insert commands..." className="w-full resize-none rounded-xl border cs-border cs-input p-3 text-[11px] cs-text placeholder:cs-subtle focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30" />
        <AnimatePresence>
          {showMenu && (
            <motion.div initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.97 }} className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border cs-border shadow-xl" style={{ background: "var(--card-surface)" }}>
              <p className="px-3 py-1 text-[8px] font-bold uppercase tracking-wider cs-subtle">Insert Block</p>
              {commands.map((cmd, i) => { const Icon = cmd.icon; return (
                <button key={cmd.id} type="button" onMouseEnter={() => setActive(i)} onClick={() => insert(cmd)} className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition" style={{ background: i === active ? "rgba(139,92,246,0.08)" : "transparent" }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(139,92,246,0.1)" }}><Icon className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" strokeWidth={2} /></div>
                  <div><p className="text-[11px] font-semibold cs-text">{cmd.label}</p><p className="text-[9px] cs-muted">{cmd.desc}</p></div>
                </button>
              ); })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-1.5 text-[9px] cs-subtle">Type / then use arrow keys + Enter</p>
    </div>
  );
}
