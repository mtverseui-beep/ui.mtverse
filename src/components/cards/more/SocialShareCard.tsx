"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Link2, Send, Share2, TriangleAlert } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const DEFAULT_URL = "https://card-showcase.pro";

export type SocialSharePlatform = "x" | "linkedin" | "facebook" | "reddit";

export interface SocialShareCardProps {
  url?: string;
  title?: string;
  onShare?: (platform: SocialSharePlatform, url: string) => void;
  onCopy?: (success: boolean, error?: Error) => void;
}

type Feedback = { kind: "idle" | "success" | "error" | "info"; message: string };

function toError(cause: unknown, fallback: string) {
  return cause instanceof Error ? cause : new Error(fallback);
}

function copyWithExecCommand(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);

  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);
    if (!document.execCommand("copy")) throw new Error("The browser rejected the copy command.");
  } finally {
    textarea.remove();
  }
}

export function SocialShareCard({
  url = DEFAULT_URL,
  title = "Take a look at this",
  onShare,
  onCopy,
}: SocialShareCardProps = {}) {
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle", message: "Choose a destination or copy the link." });
  const [copying, setCopying] = useState(false);
  const [nativeSharing, setNativeSharing] = useState(false);
  const [nativeShareAvailable, setNativeShareAvailable] = useState(false);
  const mountedRef = useRef(true);
  const copyLock = useRef(false);
  const shareLock = useRef(false);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    mountedRef.current = true;
    setNativeShareAvailable(typeof navigator !== "undefined" && typeof navigator.share === "function");
    return () => {
      mountedRef.current = false;
      copyLock.current = false;
      shareLock.current = false;
    };
  }, []);

  const handleCopy = async () => {
    if (copyLock.current) return;
    copyLock.current = true;
    setCopying(true);

    try {
      let clipboardError: unknown;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
        } catch (cause) {
          clipboardError = cause;
          copyWithExecCommand(url);
        }
      } else {
        copyWithExecCommand(url);
      }

      if (mountedRef.current) {
        setFeedback({ kind: "success", message: clipboardError ? "Link copied using the browser fallback." : "Link copied to the clipboard." });
      }
      onCopy?.(true);
    } catch (cause) {
      const error = toError(cause, "The link could not be copied.");
      if (mountedRef.current) {
        setFeedback({ kind: "error", message: "Copy failed. Select the URL and copy it manually." });
      }
      onCopy?.(false, error);
    } finally {
      copyLock.current = false;
      if (mountedRef.current) setCopying(false);
    }
  };

  const handlePlatformShare = (platform: SocialSharePlatform) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const destinations: Record<SocialSharePlatform, string> = {
      x: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    };

    let popup: Window | null;
    try {
      popup = window.open(
        destinations[platform],
        `share-${platform}`,
        "popup=yes,width=720,height=640,scrollbars=yes,resizable=yes",
      );
    } catch (cause) {
      const error = toError(cause, "The share window could not be opened.");
      setFeedback({ kind: "error", message: `${error.message} Allow popups and try again.` });
      return;
    }

    if (!popup) {
      setFeedback({ kind: "error", message: "The share popup was blocked. Allow popups and try again." });
      return;
    }

    try {
      popup.opener = null;
      popup.focus();
    } catch {
      // The popup is already open; browser privacy controls may block access to its WindowProxy.
    }
    setFeedback({ kind: "success", message: `${platform === "x" ? "X" : platform[0].toUpperCase() + platform.slice(1)} share window opened.` });
    onShare?.(platform, url);
  };

  const handleNativeShare = async () => {
    if (shareLock.current || !navigator.share) return;
    shareLock.current = true;
    setNativeSharing(true);

    try {
      await navigator.share({ title, url });
      if (mountedRef.current) setFeedback({ kind: "success", message: "Shared successfully with your device." });
    } catch (cause) {
      if (mountedRef.current) {
        const cancelled = cause instanceof DOMException && cause.name === "AbortError";
        setFeedback({
          kind: cancelled ? "info" : "error",
          message: cancelled ? "Native sharing was cancelled." : "Native sharing failed. Try a platform or copy the link.",
        });
      }
    } finally {
      shareLock.current = false;
      if (mountedRef.current) setNativeSharing(false);
    }
  };

  const copyLabel = copying ? "Copying…" : feedback.kind === "success" && feedback.message.startsWith("Link copied") ? "Link Copied" : "Copy Link";

  return (
    <motion.div className="relative w-[min(92vw,380px)] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-blue-500/10 blur-3xl dark:bg-blue-400/5" />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)]">
        <div className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><ShareIcon /></div>
            <div className="min-w-0"><h2 className="text-[14px] font-bold tracking-tight cs-text">Social Share</h2><p className="truncate text-[10.5px] cs-muted">Share securely or copy the direct link</p></div>
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {nativeShareAvailable && (
            <motion.button type="button" onClick={() => void handleNativeShare()} disabled={nativeSharing} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 motion-reduce:transition-none dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-offset-slate-950">
              <Send className="h-4 w-4" strokeWidth={2.2} />{nativeSharing ? "Opening Share…" : "Share with Your Device"}
            </motion.button>
          )}

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] cs-muted">Share to a platform</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <TwitterButton onShare={() => handlePlatformShare("x")} reduceMotion={reduceMotion} />
              <LinkedInButton onShare={() => handlePlatformShare("linkedin")} reduceMotion={reduceMotion} />
              <FacebookButton onShare={() => handlePlatformShare("facebook")} reduceMotion={reduceMotion} />
              <RedditButton onShare={() => handlePlatformShare("reddit")} reduceMotion={reduceMotion} />
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-xl border cs-border p-2 cs-surface">
            <input aria-label="Share URL" value={url} readOnly onFocus={(event) => event.currentTarget.select()} className="min-w-0 flex-1 bg-transparent px-1 text-[11px] cs-text outline-none" />
            <motion.button type="button" onClick={() => void handleCopy()} disabled={copying} whileTap={reduceMotion ? undefined : { scale: 0.96 }} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 motion-reduce:transition-none dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white">
              {copyLabel === "Link Copied" ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}{copyLabel}
            </motion.button>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${feedback.kind}-${feedback.message}`} role="status" aria-live={feedback.kind === "error" ? "assertive" : "polite"} aria-atomic="true" initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[11px] font-medium ${feedback.kind === "error" ? "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300" : feedback.kind === "success" ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "cs-border cs-surface cs-muted"}`}>
              {feedback.kind === "error" ? <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : feedback.kind === "success" ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <Share2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
              <span>{feedback.message}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t cs-border px-4 py-2.5 text-center sm:px-5"><p className="text-[9.5px] cs-subtle">Platform actions open their official share dialogs</p></div>
      </div>
    </motion.div>
  );
}

type ShareButtonProps = { onShare: () => void; reduceMotion: boolean };
const focusClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950";

function TwitterButton({ onShare, reduceMotion }: ShareButtonProps) {
  return (
    <motion.button type="button" aria-label="Share on X (opens in a popup)" onClick={onShare} whileTap={reduceMotion ? undefined : { scale: 0.92 }} className={`group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface [perspective:400px] ${focusClass}`}>
      <div className="absolute inset-0 rounded-xl bg-black opacity-0 transition-all duration-300 [transform:rotateY(90deg)] motion-reduce:transition-none group-hover:[transform:rotateY(0deg)] group-hover:opacity-100 group-focus-visible:[transform:rotateY(0deg)] group-focus-visible:opacity-100" />
      <TwitterSvg className="relative z-10 h-4 w-4 text-slate-500 transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white dark:text-slate-400" />
    </motion.button>
  );
}

function LinkedInButton({ onShare, reduceMotion }: ShareButtonProps) {
  return (
    <motion.button type="button" aria-label="Share on LinkedIn (opens in a popup)" onClick={onShare} whileTap={reduceMotion ? undefined : { scale: 0.92 }} className={`group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface ${focusClass}`}>
      <div className="absolute inset-0 scale-0 rounded-full bg-[#0a66c2] transition-all duration-300 ease-out motion-reduce:transition-none group-hover:scale-100 group-hover:rounded-xl group-focus-visible:scale-100 group-focus-visible:rounded-xl" />
      <LinkedInSvg className="relative z-10 h-4 w-4 text-slate-500 transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white dark:text-slate-400" />
    </motion.button>
  );
}

function FacebookButton({ onShare, reduceMotion }: ShareButtonProps) {
  return (
    <motion.button type="button" aria-label="Share on Facebook (opens in a popup)" onClick={onShare} whileTap={reduceMotion ? undefined : { scale: 0.92 }} className={`group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface ${focusClass}`}>
      <div className="absolute inset-0 translate-y-full bg-[#1877f2] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0" />
      <FacebookSvg className="relative z-10 h-4 w-4 text-slate-500 transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white dark:text-slate-400" />
    </motion.button>
  );
}

function RedditButton({ onShare, reduceMotion }: ShareButtonProps) {
  return (
    <motion.button type="button" aria-label="Share on Reddit (opens in a popup)" onClick={onShare} whileTap={reduceMotion ? undefined : { scale: 0.92 }} className={`group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface ${focusClass}`}>
      <div className="absolute inset-0 scale-0 bg-[#ff4500] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-100 group-focus-visible:scale-100" />
      <div className="relative z-10 transition-transform duration-300 motion-reduce:transition-none group-hover:-rotate-6 group-hover:scale-125 group-focus-visible:-rotate-6 group-focus-visible:scale-125"><RedditSvg className="h-4 w-4 text-slate-500 transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white dark:text-slate-400" /></div>
    </motion.button>
  );
}

function ShareIcon() {
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>;
}
function TwitterSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}
function LinkedInSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>;
}
function FacebookSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" /></svg>;
}
function RedditSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M24 11.78c0-1.46-1.19-2.64-2.64-2.64-.71 0-1.35.28-1.83.74-1.81-1.23-4.28-2.02-7.02-2.11l1.2-3.75 3.24.76c.03.99.84 1.78 1.84 1.78a1.85 1.85 0 001.85-1.85A1.85 1.85 0 0018.79 2.9c-.72 0-1.35.41-1.66 1.01l-3.61-.85a.5.5 0 00-.59.34l-1.34 4.2c-2.79.07-5.3.87-7.14 2.12-.48-.46-1.12-.74-1.83-.74C1.19 9.14 0 10.32 0 11.78c0 1.07.64 1.99 1.55 2.4a4.5 4.5 0 00-.06.74c0 3.77 4.39 6.83 9.81 6.83s9.81-3.06 9.81-6.83a4.5 4.5 0 00-.06-.74c.91-.41 1.55-1.33 1.55-2.4z" /></svg>;
}
