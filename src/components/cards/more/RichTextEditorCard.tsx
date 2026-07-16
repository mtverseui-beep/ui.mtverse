"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bold, Code, Eye, Italic, Link2, List, Pencil } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-text-muted)]";

export function RichTextEditorCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      aria-labelledby="rich-text-title"
      className="relative w-[min(100%,32.5rem)] select-none"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-violet-500/[0.06] blur-3xl" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"><Pencil aria-hidden className="h-4 w-4 text-violet-600 dark:text-violet-400" /></div>
            <div className="min-w-0"><h2 id="rich-text-title" className="text-sm font-bold cs-text">Rich Text Editor</h2><p className="text-[10.5px] cs-muted">Safe preview · formatting · commands</p></div>
          </div>
        </header>
        <div className="space-y-7 p-4 sm:p-5"><MarkdownEditor /><FormattedEditor /><SlashCommandEditor /></div>
      </div>
    </motion.section>
  );
}

function MarkdownEditor() {
  const [text, setText] = useState("# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  return (
    <section aria-labelledby="markdown-label">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h3 id="markdown-label" className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Markdown</h3>
        <div role="tablist" aria-label="Markdown view" className="flex gap-1 rounded-lg cs-input p-0.5">
          {(["edit", "preview"] as const).map(value => {
            const Icon = value === "edit" ? Pencil : Eye;
            return <button key={value} role="tab" aria-selected={mode === value} type="button" onClick={() => setMode(value)} className={`flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold capitalize ${FOCUS}`} style={{ background: mode === value ? "var(--card-surface)" : "transparent", color: mode === value ? "var(--card-text)" : "var(--card-text-muted)" }}><Icon aria-hidden className="h-2.5 w-2.5" />{value}</button>;
          })}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border cs-border">
        {mode === "edit" ? <textarea aria-label="Markdown content" value={text} onChange={event => setText(event.target.value)} rows={5} className={`block w-full resize-y cs-input p-3 font-mono text-[11px] leading-relaxed cs-text ${FOCUS}`} /> :
          <div role="tabpanel" aria-label="Safe Markdown preview" className="min-h-32 cs-input p-3 text-[11px] leading-relaxed cs-text">
            <ReactMarkdown
              skipHtml
              urlTransform={url => /^(https?:|mailto:)/i.test(url) ? url : ""}
              components={{ h1: ({ children }) => <h4 className="mb-2 text-base font-bold">{children}</h4>, p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>, ul: ({ children }) => <ul className="ml-4 list-disc">{children}</ul>, code: ({ children }) => <code className="rounded cs-surface px-1 font-mono">{children}</code>, a: ({ children, href }) => <a className="underline underline-offset-2" href={href} rel="noreferrer" target="_blank">{children}</a> }}
            >{text}</ReactMarkdown>
          </div>}
      </div>
      <p className="mt-1.5 text-[9px] cs-subtle">Raw HTML is ignored in preview.</p>
    </section>
  );
}

type Format = { id: string; label: string; icon: typeof Bold; before: string; after: string; block?: boolean };
const FORMATS: Format[] = [
  { id: "bold", label: "Bold", icon: Bold, before: "**", after: "**" },
  { id: "italic", label: "Italic", icon: Italic, before: "*", after: "*" },
  { id: "list", label: "Bullet list", icon: List, before: "- ", after: "", block: true },
  { id: "link", label: "Link", icon: Link2, before: "[", after: "](https://example.com)" },
  { id: "code", label: "Inline code", icon: Code, before: "`", after: "`" },
];

function FormattedEditor() {
  const [text, setText] = useState("Start typing, select text, then use the toolbar.");
  const [preview, setPreview] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const applyFormat = (format: Format) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = text.slice(start, end) || (format.id === "link" ? "link text" : "text");
    const content = format.block ? selected.split("\n").map(line => `- ${line.replace(/^[-*]\s+/, "")}`).join("\n") : `${format.before}${selected}${format.after}`;
    setText(`${text.slice(0, start)}${content}${text.slice(end)}`);
    requestAnimationFrame(() => { input.focus(); input.setSelectionRange(start, start + content.length); });
  };
  return (
    <section aria-labelledby="formatted-label">
      <div className="mb-2 flex items-center justify-between"><h3 id="formatted-label" className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Formatting Toolbar</h3><button type="button" aria-pressed={preview} onClick={() => setPreview(value => !value)} className={`rounded-md px-2 py-1 text-[9px] font-semibold cs-muted cs-hover ${FOCUS}`}>{preview ? "Edit" : "Preview"}</button></div>
      <div className="overflow-hidden rounded-xl border cs-border">
        <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap items-center gap-0.5 border-b cs-border cs-input px-2 py-1.5">
          {FORMATS.map(format => { const Icon = format.icon; return <button key={format.id} type="button" onMouseDown={event => event.preventDefault()} onClick={() => applyFormat(format)} aria-label={format.label} className={`flex h-8 w-8 items-center justify-center rounded-md cs-muted cs-hover ${FOCUS}`}><Icon aria-hidden className="h-3.5 w-3.5" /></button>; })}
        </div>
        {preview ? <div className="min-h-24 cs-input p-3 text-[11px] cs-text"><ReactMarkdown skipHtml>{text}</ReactMarkdown></div> : <textarea ref={inputRef} aria-label="Formatted text content" rows={4} value={text} onChange={event => setText(event.target.value)} className={`block w-full resize-y cs-input p-3 text-[11px] leading-relaxed cs-text ${FOCUS}`} />}
      </div>
    </section>
  );
}

const COMMANDS = [
  { id: "heading", label: "Heading", icon: Bold, description: "Add a section heading", value: "## Heading\n" },
  { id: "list", label: "Bullet list", icon: List, description: "Start an unordered list", value: "- List item\n" },
  { id: "code", label: "Code block", icon: Code, description: "Insert a fenced code block", value: "```\ncode\n```\n" },
  { id: "link", label: "Link", icon: Link2, description: "Insert a safe Markdown link", value: "[link text](https://example.com)" },
];

function SlashCommandEditor() {
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);
  const match = text.match(/(?:^|\n)\/([^\n]*)$/);
  const query = match?.[1].toLowerCase() ?? "";
  const options = match ? COMMANDS.filter(command => `${command.label} ${command.description}`.toLowerCase().includes(query)) : [];
  const open = options.length > 0;
  const insert = (value: string) => {
    if (!match || match.index === undefined) return;
    const slashIndex = match.index + (match[0].startsWith("\n") ? 1 : 0);
    setText(`${text.slice(0, slashIndex)}${value}${text.slice(slashIndex + match[0].replace(/^\n/, "").length)}`);
    setActive(0);
  };
  return (
    <section aria-labelledby="command-label">
      <h3 id="command-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Slash Commands</h3>
      <div
        className="relative"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="slash-command-list"
      >
        <textarea
          aria-label="Command editor"
          aria-autocomplete="list"
          aria-controls={open ? "slash-command-list" : undefined}
          aria-activedescendant={open ? `slash-option-${options[Math.min(active, options.length - 1)]?.id}` : undefined}
          value={text}
          onChange={event => { setText(event.target.value); setActive(0); }}
          onKeyDown={event => {
            if (!open) return;
            if (event.key === "ArrowDown") { event.preventDefault(); setActive(value => Math.min(value + 1, options.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive(value => Math.max(value - 1, 0)); }
            if (event.key === "Enter") { event.preventDefault(); insert(options[active].value); }
            if (event.key === "Escape") { event.preventDefault(); setText(value => value.replace(/\/[^\n]*$/, "")); }
          }}
          rows={3}
          placeholder="Type / to insert a block…"
          className={`block w-full resize-y rounded-xl border cs-border cs-input p-3 text-[11px] cs-text placeholder:cs-subtle ${FOCUS}`}
        />
        <AnimatePresence>
          {open && <motion.div id="slash-command-list" role="listbox" aria-label="Insert block" initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border cs-border cs-surface p-1 shadow-xl motion-reduce:transition-none">
            {options.map((command, index) => { const Icon = command.icon; return <button id={`slash-option-${command.id}`} role="option" aria-selected={index === active} key={command.id} type="button" onMouseEnter={() => setActive(index)} onClick={() => insert(command.value)} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left cs-hover ${FOCUS}`} style={{ background: index === active ? "var(--card-input-bg)" : "transparent" }}><Icon aria-hidden className="h-4 w-4 cs-muted" /><span><span className="block text-[11px] font-semibold cs-text">{command.label}</span><span className="block text-[9px] cs-muted">{command.description}</span></span></button>; })}
          </motion.div>}
        </AnimatePresence>
      </div>
      <p className="mt-1.5 text-[9px] cs-subtle">Type /, filter by name, then use arrows and Enter.</p>
    </section>
  );
}
