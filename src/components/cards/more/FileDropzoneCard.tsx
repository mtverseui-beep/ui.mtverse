"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, FileImage, FileVideo, FileArchive, X, Check, Loader2, FolderUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// FileDropzoneCard — 3 unique upload variants:
// 1. Drag zone — large dashed dropzone with drag-over animation
// 2. Upload button — compact button that opens file picker + file list below
// 3. Mini uploader — inline chip-style files with progress dots

interface UploadedFile { id: string; name: string; size: string; type: string; progress: number; status: "uploading" | "done"; }
const TYPE_ICON: Record<string, typeof FileText> = { image: FileImage, video: FileVideo, document: FileText, archive: FileArchive };
const TYPE_COLOR: Record<string, string> = { image: "#8b5cf6", video: "#ec4899", document: "#3b82f6", archive: "#10b981" };

function getType(name: string) { const ext = name.split(".").pop()?.toLowerCase() || ""; if (["jpg","png","gif","webp","svg"].includes(ext)) return "image"; if (["mp4","mov","avi"].includes(ext)) return "video"; if (["zip","rar","7z"].includes(ext)) return "archive"; return "document"; }
function formatSize(b: number) { return b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`; }

export function FileDropzoneCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20"><UploadCloud className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">File Dropzone</h2><p className="text-[10.5px] cs-muted">Drag zone · upload button · mini uploader — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <DragZoneVariant />
          <UploadButtonVariant />
          <MiniUploaderVariant />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">3 completely different upload patterns</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Drag zone — large dashed dropzone ──
function DragZoneVariant() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addFiles = useCallback((list: File[]) => {
    const newFiles: UploadedFile[] = list.map(f => ({ id: `${Date.now()}-${f.name}`, name: f.name, size: formatSize(f.size), type: getType(f.name), progress: 0, status: "uploading" as const }));
    setFiles(prev => [...prev, ...newFiles]);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    intervalRef.current = setInterval(() => {
      setFiles(prev => { let done = true; return prev.map(f => { if (f.status === "uploading") { const p = Math.min(100, f.progress + 25); if (p >= 100) return { ...f, progress: 100, status: "done" as const }; done = false; return { ...f, progress: p }; } return f; }); if (done && intervalRef.current) { clearInterval(intervalRef.current as ReturnType<typeof setInterval>); intervalRef.current = null; } return prev; });
    }, 300);
  }, []);

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Drag Zone</span></div>
      <motion.div onClick={() => inputRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }} animate={{ scale: dragging ? 1.02 : 1, borderColor: dragging ? "#6366f1" : "var(--card-border)" }} className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed py-6 transition" style={{ background: dragging ? "rgba(99,102,241,0.05)" : "var(--card-input-bg)" }}>
        <motion.div animate={{ y: dragging ? -6 : 0, scale: dragging ? 1.15 : 1, rotate: dragging ? [0, -5, 5, 0] : 0 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}><UploadCloud className={`h-7 w-7 ${dragging ? "text-indigo-500" : "cs-subtle"}`} strokeWidth={1.5} /></motion.div>
        <p className="text-[11px] font-semibold cs-text">{dragging ? "Drop here" : "Drag files or click"}</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = ""; }} />
      </motion.div>
      <FileList files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />
    </div>
  );
}

// ── 2. Upload button — compact button + file list ──
function UploadButtonVariant() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addFiles = (list: File[]) => {
    const newFiles: UploadedFile[] = list.map(f => ({ id: `${Date.now()}-${f.name}`, name: f.name, size: formatSize(f.size), type: getType(f.name), progress: 0, status: "uploading" as const }));
    setFiles(prev => [...prev, ...newFiles]);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    intervalRef.current = setInterval(() => { setFiles(prev => { let done = true; return prev.map(f => { if (f.status === "uploading") { const p = Math.min(100, f.progress + 22); if (p >= 100) return { ...f, progress: 100, status: "done" as const }; done = false; return { ...f, progress: p }; } return f; }); if (done && intervalRef.current) { clearInterval(intervalRef.current as ReturnType<typeof setInterval>); intervalRef.current = null; } return prev; }); }, 300);
  };

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Upload Button</span></div>
      <motion.button type="button" onClick={() => inputRef.current?.click()} whileTap={{ scale: 0.97 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-[12.5px] font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40">
        <FolderUp className="h-4 w-4" strokeWidth={2.2} /> Browse Files
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = ""; }} />
      </motion.button>
      <FileList files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />
    </div>
  );
}

// ── 3. Mini uploader — inline chip-style ──
function MiniUploaderVariant() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: File[]) => {
    const newFiles: UploadedFile[] = list.map(f => ({ id: `${Date.now()}-${f.name}`, name: f.name, size: formatSize(f.size), type: getType(f.name), progress: 100, status: "done" as const }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div>
      <div className="mb-3"><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Mini Chip Uploader</span></div>
      <div className="flex flex-wrap gap-1.5">
        <AnimatePresence>
          {files.map(f => {
            const Icon = TYPE_ICON[f.type] || FileText;
            const color = TYPE_COLOR[f.type] || "#3b82f6";
            return (
              <motion.div key={f.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1.5 rounded-full py-1 pl-2 pr-1" style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                <Icon className="h-3 w-3" style={{ color }} strokeWidth={2} />
                <span className="max-w-[80px] truncate text-[10px] font-medium cs-text">{f.name}</span>
                <button type="button" onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))} className="flex h-3.5 w-3.5 items-center justify-center rounded-full cs-muted hover:text-rose-500"><X className="h-2.5 w-2.5" strokeWidth={2.4} /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <motion.button type="button" onClick={() => inputRef.current?.click()} whileTap={{ scale: 0.92 }} className="flex items-center gap-1 rounded-full border cs-border cs-input px-2.5 py-1 text-[10px] font-semibold cs-muted transition cs-hover">
          <UploadCloud className="h-3 w-3" strokeWidth={2.2} /> Add
          <input ref={inputRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = ""; }} />
        </motion.button>
      </div>
    </div>
  );
}

// ── Shared file list component ──
function FileList({ files, onRemove }: { files: UploadedFile[]; onRemove: (id: string) => void }) {
  return (
    <AnimatePresence>
      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 space-y-1.5">
          {files.map(f => {
            const Icon = TYPE_ICON[f.type] || FileText;
            const color = TYPE_COLOR[f.type] || "#3b82f6";
            return (
              <motion.div key={f.id} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8, transition: { duration: 0.15 } }} className="flex items-center gap-2.5 rounded-lg border cs-border cs-input p-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}15` }}><Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={2} /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1"><p className="truncate text-[10.5px] font-medium cs-text">{f.name}</p><span className="shrink-0 text-[8.5px] cs-subtle">{f.size}</span></div>
                  <div className="mt-0.5 h-1 overflow-hidden rounded-full" style={{ background: "var(--card-border)" }}><motion.div className="h-full rounded-full" animate={{ width: `${f.progress}%`, background: f.status === "done" ? "#10b981" : color }} transition={{ duration: 0.3 }} /></div>
                </div>
                <div className="shrink-0">{f.status === "uploading" ? <Loader2 className="h-3 w-3 animate-spin cs-subtle" strokeWidth={2.2} /> : <Check className="h-3 w-3 text-emerald-500" strokeWidth={2.4} />}</div>
                <button type="button" onClick={() => onRemove(f.id)} className="shrink-0 flex h-4 w-4 items-center justify-center rounded cs-muted hover:text-rose-500"><X className="h-2.5 w-2.5" strokeWidth={2.4} /></button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
