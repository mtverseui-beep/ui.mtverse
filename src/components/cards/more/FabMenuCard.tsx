"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, PenLine, Plus, RotateCcw, Share2, Trash2, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type ActionId = "edit" | "share" | "download" | "delete" | "restore";
type Action = {
  id: ActionId;
  icon: typeof PenLine;
  label: string;
  color: string;
};

const ACTIONS: Action[] = [
  { id: "edit", icon: PenLine, label: "Edit", color: "#2563eb" },
  { id: "share", icon: Share2, label: "Share", color: "#7c3aed" },
  { id: "download", icon: Download, label: "Download", color: "#059669" },
  { id: "delete", icon: Trash2, label: "Delete", color: "#dc2626" },
];
const RESTORE_ACTION: Action = { id: "restore", icon: RotateCcw, label: "Restore", color: "#059669" };

function copyTextFallback(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  try {
    input.select();
    input.setSelectionRange(0, value.length);
    return document.execCommand("copy");
  } finally {
    input.remove();
  }
}

export function FabMenuCard() {
  const [open, setOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [feedback, setFeedback] = useState("Ready. Open the action menu to manage the local draft.");
  const reduceMotion = Boolean(useReducedMotion());
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const actionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusFrameRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const visibleActions = deleted ? [RESTORE_ACTION] : ACTIONS;

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    if (focusFrameRef.current !== null) cancelAnimationFrame(focusFrameRef.current);
    if (returnFocus) {
      focusFrameRef.current = requestAnimationFrame(() => {
        focusFrameRef.current = null;
        toggleRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (focusFrameRef.current !== null) cancelAnimationFrame(focusFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => actionRefs.current[0]?.focus());
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const count = visibleActions.length;
    const current = Math.max(0, actionRefs.current.findIndex((item) => item === document.activeElement));
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % count;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current - 1 + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;

    if (next !== null) {
      event.preventDefault();
      actionRefs.current[next]?.focus();
    }
  };

  const handleAction = async (id: ActionId) => {
    closeMenu(true);

    if (id === "edit") {
      setRevision((value) => value + 1);
      setFeedback(`Local draft updated to revision ${revision + 1}.`);
      return;
    }

    if (id === "delete") {
      setDeleted(true);
      setFeedback("Local draft deleted. Use Restore to bring it back.");
      return;
    }

    if (id === "restore") {
      setDeleted(false);
      setFeedback(`Local draft restored at revision ${revision}.`);
      return;
    }

    const shareUrl = window.location.href;
    if (id === "share") {
      try {
        if (navigator.share) {
          await navigator.share({ title: "Local draft", text: `Local draft, revision ${revision}`, url: shareUrl });
          if (mountedRef.current) setFeedback("Local draft shared successfully.");
          return;
        }

        try {
          await navigator.clipboard?.writeText(shareUrl);
          if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
        } catch {
          if (!copyTextFallback(shareUrl)) throw new Error("Copy command was rejected");
        }
        if (mountedRef.current) setFeedback("Share link copied to the clipboard.");
      } catch (cause) {
        if (!mountedRef.current) return;
        const cancelled = cause instanceof DOMException && cause.name === "AbortError";
        setFeedback(cancelled ? "Sharing was cancelled; no content was shared." : "The draft could not be shared or copied.");
      }
      return;
    }

    try {
      const blob = new Blob(
        [JSON.stringify({ name: "Local draft", revision, url: shareUrl }, null, 2)],
        { type: "application/json" },
      );
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `local-draft-r${revision}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      setFeedback(`Downloaded local-draft-r${revision}.json.`);
    } catch {
      setFeedback("The local draft download could not be started.");
    }
  };

  return (
    <motion.div ref={rootRef} className="relative w-[min(92vw,380px)] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-blue-500/10 blur-3xl dark:bg-blue-400/5" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)]">
        <div className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Plus className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div className="min-w-0"><h2 className="text-[14px] font-bold tracking-tight cs-text">FAB Action Menu</h2><p className="truncate text-[10.5px] cs-muted">Keyboard-ready local draft actions</p></div>
          </div>
        </div>

        <div className="border-b cs-border px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3 rounded-xl border cs-border px-3 py-2 cs-surface">
            <div className="min-w-0"><p className="truncate text-xs font-semibold cs-text">{deleted ? "Local draft deleted" : "Local draft"}</p><p className="text-[10px] cs-muted">Revision {revision}</p></div>
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${deleted ? "bg-red-500" : "bg-emerald-500"}`} aria-label={deleted ? "Deleted" : "Available"} />
          </div>
        </div>

        <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden p-6 sm:min-h-[270px] sm:p-8">
          <AnimatePresence>
            {open && <motion.div aria-hidden className="absolute inset-0 z-0 bg-slate-950/35 dark:bg-black/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} onClick={() => closeMenu(true)} />}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={feedback} role="status" aria-live="polite" aria-atomic="true" initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="absolute inset-x-4 top-4 z-20 rounded-lg border cs-border px-3 py-2 text-center text-[10.5px] font-medium cs-surface cs-text shadow-sm">
              {feedback}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence>
            {open && (
              <motion.div id={menuId} role="menu" aria-label="Local draft actions" className="pointer-events-none absolute inset-0 z-10" onKeyDown={handleMenuKeyDown} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.15 }}>
                {visibleActions.map((action, index) => {
                  const Icon = action.icon;
                  const angle = -90 + (index - (visibleActions.length - 1) / 2) * 65;
                  const radians = (angle * Math.PI) / 180;
                  const distance = 78;
                  return (
                    <motion.button
                      ref={(element) => { actionRefs.current[index] = element; }}
                      key={action.id}
                      type="button"
                      role="menuitem"
                      aria-label={`${action.label} local draft`}
                      onClick={() => void handleAction(action.id)}
                      className="pointer-events-auto absolute left-[calc(50%_-_2rem)] top-[calc(50%_-_1.5rem)] flex w-16 flex-col items-center gap-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                      initial={reduceMotion ? { opacity: 0 } : { x: 0, y: 0, opacity: 0, scale: 0.5 }}
                      animate={{ x: Math.cos(radians) * distance, y: Math.sin(radians) * distance, opacity: 1, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { x: 0, y: 0, opacity: 0, scale: 0.5 }}
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 22, delay: index * 0.04 }}
                      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg" style={{ backgroundColor: action.color, boxShadow: `0 4px 14px ${action.color}40` }}><Icon className="h-4 w-4" strokeWidth={2.2} /></span>
                      <span className="rounded bg-white/90 px-1 text-[9px] font-semibold text-slate-900 dark:bg-slate-950/90 dark:text-slate-100">{action.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close local draft action menu" : "Open local draft action menu"}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 motion-reduce:transition-none dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-offset-slate-950"
          >
            <motion.span aria-hidden animate={{ rotate: open ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>{open ? <X className="h-6 w-6" strokeWidth={2.4} /> : <Plus className="h-6 w-6" strokeWidth={2.4} />}</motion.span>
          </motion.button>
        </div>

        <div className="border-t cs-border px-4 py-2.5 text-center sm:px-5"><p className="text-[9.5px] cs-subtle">Use arrows, Home, End, or Escape when the menu is open</p></div>
      </div>
    </motion.div>
  );
}
