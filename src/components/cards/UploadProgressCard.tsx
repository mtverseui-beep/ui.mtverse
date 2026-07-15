"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileVideo,
  FileAudio,
  FileText,
  FileArchive,
  Image as ImageIcon,
  Check,
  X,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { uploadFiles as initialFiles } from "./data/card-data";
import type { UploadFile } from "./types";

const EASE = [0.16, 1, 0.3, 1] as const;

const TYPE_ICON = {
  image: ImageIcon,
  video: FileVideo,
  audio: FileAudio,
  document: FileText,
  archive: FileArchive,
} as const;

const TYPE_COLOR = {
  image: "text-cyan-600 dark:text-cyan-300",
  video: "text-violet-600 dark:text-violet-300",
  audio: "text-amber-600 dark:text-amber-300",
  document: "text-sky-600 dark:text-sky-300",
  archive: "text-rose-600 dark:text-rose-300",
} as const;

export function UploadProgressCard() {
  const [files, setFiles] = useState<UploadFile[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const tickFile = useCallback((id: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        if (f.status === "failed") return { ...f, status: "uploading", progress: Math.min(f.progress, 40) };
        return f;
      }),
    );
    const handle = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id) return f;
          if (f.status === "success" || f.status === "processing") return f;
          const next = Math.min(100, f.progress + 8);
          if (next >= 100) return { ...f, progress: 100, status: "processing" };
          return { ...f, progress: next };
        }),
      );
    }, 200);
    setTimeout(() => {
      clearInterval(handle);
      setFiles((prev) => prev.map((f) => (f.id === id && f.status === "processing" ? { ...f, status: "success" } : f)));
    }, 2200);
  }, []);

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const total = files.length;
  const completed = files.filter((f) => f.status === "success").length;
  const failed = files.filter((f) => f.status === "failed").length;
  const inProgress = total - completed - failed;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const newFile: UploadFile = {
      id: `f${Date.now()}`,
      name: "new-asset.psd",
      size: "24.6 MB",
      type: "image",
      status: "uploading",
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80",
    };
    setFiles((prev) => [...prev, newFile]);
    tickFile(newFile.id);
  };

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,420px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 75% 80%, rgba(99,102,241,0.14), transparent 60%)",
        }}
      />

      <article className="cs-surface relative overflow-hidden rounded-xl cs-border shadow-[0_40px_90px_-40px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        {/* Soft radial backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.4), transparent 55%), radial-gradient(circle at 75% 80%, rgba(99,102,241,0.3), transparent 60%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.55), rgba(99,102,241,0.55), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />

        {/* Header */}
        <header className="relative flex items-center justify-between cs-border-b-subtle px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-cyan-700 dark:text-cyan-200">Upload Queue</h2>
            <p className="mt-0.5 text-[11.5px] cs-muted">
              {completed}/{total} complete{failed > 0 ? ` · ${failed} failed` : ""}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {inProgress > 0 && (
              <motion.span
                layout
                className="inline-flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10.5px] font-medium text-cyan-700 dark:text-cyan-200"
              >
                <Loader2 className="h-2.5 w-2.5 animate-spin" strokeWidth={2.5} />
                {inProgress} active
              </motion.span>
            )}
            {completed > 0 && (
              <motion.span
                layout
                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700 dark:text-emerald-200"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                {completed}
              </motion.span>
            )}
          </div>
        </header>

        {/* Drop zone — premium dashed border with smooth drag state */}
        <div className="px-5 pt-4">
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Drop files to upload, or click to browse"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            animate={dragging ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${
              dragging
                ? "border-cyan-500 bg-cyan-500/[0.08]"
                : "border-cyan-500/25 bg-cyan-50/40 hover:border-cyan-500/45 hover:bg-cyan-50/70 dark:bg-cyan-950/10 dark:hover:bg-cyan-950/20"
            }`}
          >
            <input ref={inputRef} type="file" multiple className="sr-only" aria-hidden tabIndex={-1} onChange={() => {}} />
            {/* Dragging glow halo */}
            <AnimatePresence>
              {dragging && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.35), transparent 70%)" }}
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={dragging ? { y: -5, scale: 1.08 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/15 to-cyan-500/5 text-cyan-600 shadow-sm dark:text-cyan-300"
            >
              <UploadCloud className="h-5 w-5" strokeWidth={1.9} />
              <motion.div
                aria-hidden
                className="absolute -inset-1 -z-10 rounded-xl blur-md"
                animate={{ opacity: dragging ? 0.9 : 0.4 }}
                transition={{ duration: 0.3 }}
                style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)" }}
              />
            </motion.div>
            <p className="mt-2.5 text-[12.5px] font-medium cs-text">
              {dragging ? "Drop to upload" : "Drag & drop files here"}
            </p>
            <p className="mt-0.5 font-mono text-[10.5px] cs-subtle">
              or <span className="text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-300">browse</span> · max 2 GB/file
            </p>
          </motion.div>
        </div>

        {/* File list — refined spacing, premium rows */}
        <div className="scrollbar-modern max-h-[260px] overflow-y-auto overflow-x-hidden px-3 py-3">
          <AnimatePresence initial={false}>
            {files.map((file) => {
              const Icon = TYPE_ICON[file.type];
              const colorClass = TYPE_COLOR[file.type];
              return (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mb-2 last:mb-0"
                >
                  <div className="group/file flex items-center gap-3 rounded-lg cs-border-subtle cs-input p-2.5 transition-colors hover:cs-hover">
                    {/* Thumbnail — refined border + smoother status overlay */}
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg cs-border cs-surface-3 shadow-sm">
                      {file.thumbnail ? (
                        <Image src={file.thumbnail} alt={file.name} fill sizes="44px" className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Icon className={`h-4 w-4 ${colorClass}`} strokeWidth={1.9} />
                        </div>
                      )}
                      <AnimatePresence>
                        {file.status === "processing" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm dark:bg-black/65"
                          >
                            <Loader2 className="h-4 w-4 animate-spin text-cyan-300" strokeWidth={2.5} />
                          </motion.div>
                        )}
                        {file.status === "success" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                            className="absolute inset-0 flex items-center justify-center bg-emerald-500/95"
                          >
                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                        {file.status === "failed" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                            className="absolute inset-0 flex items-center justify-center bg-rose-500/95"
                          >
                            <X className="h-4 w-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-mono text-[12px] cs-text">{file.name}</p>
                        <span className="shrink-0 font-mono text-[10.5px] cs-subtle tabular-nums">{file.size}</span>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10.5px]">
                        {file.status === "uploading" && <span className="text-cyan-600 dark:text-cyan-300">{file.progress}%</span>}
                        {file.status === "processing" && <span className="text-violet-600 dark:text-violet-300">processing…</span>}
                        {file.status === "success" && <span className="text-emerald-600 dark:text-emerald-300">ready</span>}
                        {file.status === "failed" && (
                          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-300">
                            <AlertCircle className="h-2.5 w-2.5" strokeWidth={2.5} />network timeout
                          </span>
                        )}
                      </div>

                      {file.status !== "success" && (
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-cyan-950/60">
                          <motion.div
                            className={`relative h-full rounded-full ${
                              file.status === "failed"
                                ? "bg-rose-400"
                                : file.status === "processing"
                                ? "bg-gradient-to-r from-violet-400 to-fuchsia-400"
                                : "bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-300"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.5, ease: EASE }}
                          >
                            {/* Animated shimmer overlay for in-flight progress */}
                            {(file.status === "uploading" || file.status === "processing") && (
                              <motion.span
                                aria-hidden
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                                  backgroundSize: "200% 100%",
                                }}
                                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                              />
                            )}
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-hover/file:opacity-100">
                      {file.status === "failed" && (
                        <motion.button
                          type="button"
                          aria-label={`Retry ${file.name}`}
                          onClick={() => tickFile(file.id)}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-7 w-7 items-center justify-center rounded-md cs-border cs-input cs-muted transition cs-hover hover:text-cyan-600 dark:hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                        >
                          <RefreshCw className="h-3 w-3" strokeWidth={2.2} />
                        </motion.button>
                      )}
                      <motion.button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => removeFile(file.id)}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-7 w-7 items-center justify-center rounded-md cs-border cs-input cs-muted transition cs-hover hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                      >
                        <X className="h-3 w-3" strokeWidth={2.4} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {files.length === 0 && (
            <div className="px-3 py-8 text-center font-mono text-[12px] cs-subtle">queue.empty</div>
          )}
        </div>

        <footer className="relative flex items-center justify-between cs-border-t-subtle px-5 py-3 font-mono">
          <span className="text-[11px] cs-muted">{total} item{total !== 1 ? "s" : ""} · {completed} ready</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            className="rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(34,211,238,0.7)] transition hover:shadow-[0_8px_20px_-6px_rgba(34,211,238,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          >
            share_folder
          </motion.button>
        </footer>
      </article>
    </motion.div>
  );
}
