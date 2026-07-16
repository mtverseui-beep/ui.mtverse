"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, FileArchive, FileImage, FileText, FolderUp, Loader2, UploadCloud, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 8;
const ACCEPT = ".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.md,.csv,.zip";
const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-text-muted)]";

type FileStatus = "reading" | "ready" | "cancelled" | "error";
interface UploadedFile { id: string; name: string; bytes: number; type: "image" | "archive" | "document"; progress: number; status: FileStatus; message?: string; }
const TYPE_ICON = { image: FileImage, archive: FileArchive, document: FileText };
const TYPE_COLOR = { image: "#8b5cf6", archive: "#10b981", document: "#64748b" };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function classify(file: File): UploadedFile["type"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/zip" || file.name.toLowerCase().endsWith(".zip")) return "archive";
  return "document";
}

function validate(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowed = ["png", "jpg", "jpeg", "gif", "webp", "pdf", "txt", "md", "csv", "zip"];
  if (!extension || !allowed.includes(extension)) return "Unsupported file type";
  if (file.size === 0) return "The file is empty";
  if (file.size > MAX_SIZE) return "File exceeds 10 MB";
  return null;
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function useFileQueue() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const readers = useRef(new Map<string, FileReader>());
  useEffect(() => () => { readers.current.forEach(reader => reader.abort()); readers.current.clear(); }, []);

  const addFiles = useCallback((incoming: File[]) => {
    setErrors([]);
    setFiles(current => {
      const available = Math.max(0, MAX_FILES - current.length);
      const accepted = incoming.slice(0, available);
      const nextErrors = incoming.length > available ? [`Only ${MAX_FILES} files can be queued`] : [];
      const additions: UploadedFile[] = [];
      accepted.forEach(file => {
        const problem = validate(file);
        if (problem) { nextErrors.push(`${file.name}: ${problem}`); return; }
        const id = makeId();
        additions.push({ id, name: file.name, bytes: file.size, type: classify(file), progress: 0, status: "reading" });
        const reader = new FileReader();
        readers.current.set(id, reader);
        reader.onprogress = event => {
          if (!event.lengthComputable) return;
          setFiles(items => items.map(item => item.id === id ? { ...item, progress: Math.round((event.loaded / event.total) * 100) } : item));
        };
        reader.onload = () => { readers.current.delete(id); setFiles(items => items.map(item => item.id === id ? { ...item, progress: 100, status: "ready" } : item)); };
        reader.onerror = () => { readers.current.delete(id); setFiles(items => items.map(item => item.id === id ? { ...item, status: "error", message: "Could not read file" } : item)); };
        reader.onabort = () => { readers.current.delete(id); setFiles(items => items.map(item => item.id === id ? { ...item, status: "cancelled", message: "Cancelled" } : item)); };
        reader.readAsArrayBuffer(file);
      });
      setErrors(nextErrors);
      return [...current, ...additions];
    });
  }, []);

  const cancel = useCallback((id: string) => readers.current.get(id)?.abort(), []);
  const remove = useCallback((id: string) => { readers.current.get(id)?.abort(); readers.current.delete(id); setFiles(items => items.filter(item => item.id !== id)); }, []);
  return { files, errors, addFiles, cancel, remove };
}

export function FileDropzoneCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section aria-labelledby="dropzone-title" className="relative w-[min(100%,26.25rem)] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-indigo-500/[0.06] blur-3xl" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20"><UploadCloud aria-hidden className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /></div><div><h2 id="dropzone-title" className="text-sm font-bold cs-text">File Dropzone</h2><p className="text-[10.5px] cs-muted">Validated local file queue · up to 10 MB</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><DragZoneVariant /><UploadButtonVariant /><MiniUploaderVariant /></div>
      </div>
    </motion.section>
  );
}

function HiddenInput({ id, inputRef, onFiles }: { id: string; inputRef: React.RefObject<HTMLInputElement | null>; onFiles: (files: File[]) => void }) {
  return <input id={id} ref={inputRef} type="file" multiple accept={ACCEPT} className="sr-only" onChange={event => { onFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} />;
}

function ErrorList({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return <ul role="alert" className="mt-2 space-y-0.5 text-[9px] text-rose-600 dark:text-rose-400">{errors.map(error => <li key={error}>{error}</li>)}</ul>;
}

function DragZoneVariant() {
  const queue = useFileQueue();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  return (
    <section aria-labelledby="drag-zone-label">
      <h3 id="drag-zone-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Drag Zone</h3>
      <HiddenInput id="drag-zone-input" inputRef={inputRef} onFiles={queue.addFiles} />
      <button type="button" onClick={() => inputRef.current?.click()} onDragEnter={event => { event.preventDefault(); setDragging(true); }} onDragOver={event => event.preventDefault()} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false); }} onDrop={event => { event.preventDefault(); setDragging(false); queue.addFiles(Array.from(event.dataTransfer.files)); }} className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed py-5 cs-input transition-colors motion-reduce:transition-none ${FOCUS}`} style={{ borderColor: dragging ? "var(--card-text-muted)" : "var(--card-border)" }} aria-describedby="drag-zone-help">
        <UploadCloud aria-hidden className="h-7 w-7 cs-muted" /><span className="text-[11px] font-semibold cs-text">{dragging ? "Drop files here" : "Choose files or drag them here"}</span><span id="drag-zone-help" className="text-[9px] cs-subtle">PNG, JPG, GIF, WebP, PDF, text, CSV or ZIP</span>
      </button>
      <ErrorList errors={queue.errors} /><FileList {...queue} />
    </section>
  );
}

function UploadButtonVariant() {
  const queue = useFileQueue();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <section aria-labelledby="upload-button-label">
      <h3 id="upload-button-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Browse Button</h3>
      <HiddenInput id="browse-files-input" inputRef={inputRef} onFiles={queue.addFiles} />
      <button type="button" onClick={() => inputRef.current?.click()} className={`flex w-full items-center justify-center gap-2 rounded-xl border cs-border cs-input py-2.5 text-xs font-semibold cs-text cs-hover ${FOCUS}`}><FolderUp aria-hidden className="h-4 w-4" />Browse files</button>
      <ErrorList errors={queue.errors} /><FileList {...queue} />
    </section>
  );
}

function MiniUploaderVariant() {
  const queue = useFileQueue();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <section aria-labelledby="mini-upload-label">
      <h3 id="mini-upload-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Compact Queue</h3>
      <HiddenInput id="mini-files-input" inputRef={inputRef} onFiles={queue.addFiles} />
      <div className="flex flex-wrap gap-1.5" aria-live="polite">
        <AnimatePresence initial={false}>{queue.files.map(file => { const Icon = TYPE_ICON[file.type]; return <motion.div key={file.id} layout className="flex max-w-full items-center gap-1.5 rounded-full border cs-border cs-input py-1 pl-2 pr-1"><Icon aria-hidden className="h-3 w-3 cs-muted" /><span className="max-w-28 truncate text-[10px] cs-text">{file.name}</span>{file.status === "reading" && <Loader2 aria-label="Reading" className="h-3 w-3 animate-spin cs-muted motion-reduce:animate-none" />}<button type="button" onClick={() => queue.remove(file.id)} aria-label={`Remove ${file.name}`} className={`flex h-5 w-5 items-center justify-center rounded-full cs-muted cs-hover ${FOCUS}`}><X aria-hidden className="h-3 w-3" /></button></motion.div>; })}</AnimatePresence>
        <button type="button" onClick={() => inputRef.current?.click()} className={`flex items-center gap-1 rounded-full border cs-border cs-input px-2.5 py-1 text-[10px] font-semibold cs-muted cs-hover ${FOCUS}`}><UploadCloud aria-hidden className="h-3 w-3" />Add</button>
      </div>
      <ErrorList errors={queue.errors} />
    </section>
  );
}

function FileList({ files, cancel, remove }: { files: UploadedFile[]; cancel: (id: string) => void; remove: (id: string) => void }) {
  if (!files.length) return null;
  return (
    <ul aria-label="File queue" aria-live="polite" className="mt-3 space-y-1.5">
      <AnimatePresence initial={false}>{files.map(file => {
        const Icon = TYPE_ICON[file.type];
        const color = TYPE_COLOR[file.type];
        const statusText = file.status === "reading" ? `Reading ${file.progress}%` : file.status === "ready" ? "Ready" : file.message ?? file.status;
        return (
          <motion.li key={file.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-w-0 items-center gap-2 rounded-lg border cs-border cs-input p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}16` }}><Icon aria-hidden className="h-4 w-4" style={{ color }} /></div>
            <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="truncate text-[10.5px] font-medium cs-text">{file.name}</span><span className="shrink-0 text-[8.5px] cs-subtle">{formatSize(file.bytes)}</span></div>
              <div className="mt-1 flex items-center gap-2"><div role="progressbar" aria-label={`Read progress for ${file.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={file.progress} className="h-1 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"><div className="h-full rounded-full transition-[width] motion-reduce:transition-none" style={{ width: `${file.progress}%`, background: file.status === "ready" ? "#10b981" : color }} /></div><span className="text-[8px] cs-subtle">{statusText}</span></div>
            </div>
            {file.status === "ready" && <Check aria-label="Ready" className="h-3.5 w-3.5 shrink-0 text-emerald-500" />}
            {file.status === "reading" && <button type="button" onClick={() => cancel(file.id)} aria-label={`Cancel reading ${file.name}`} className={`rounded px-1.5 py-1 text-[9px] cs-muted cs-hover ${FOCUS}`}>Cancel</button>}
            <button type="button" onClick={() => remove(file.id)} aria-label={`Remove ${file.name}`} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded cs-muted cs-hover ${FOCUS}`}><X aria-hidden className="h-3 w-3" /></button>
          </motion.li>
        );
      })}</AnimatePresence>
    </ul>
  );
}
