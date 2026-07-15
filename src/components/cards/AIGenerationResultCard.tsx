"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Copy, Download, Heart, Check, Sparkles, AlertCircle, Loader2, Clock, Cpu, Wand2,
} from "lucide-react";
import { aiGenerationResult as initialResult } from "./data/card-data";
import type { AIGenerationResult } from "./types";

const EASE = [0.16, 1, 0.3, 1] as const;

type State = AIGenerationResult["state"];

export function AIGenerationResultCard() {
  const [result, setResult] = useState<AIGenerationResult>(initialResult);
  const [favorited, setFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [scanning, setScanning] = useState(true);

  const handleRegenerate = () => {
    setResult((r) => ({ ...r, state: "refining" }));
    setScanning(true);
    setTimeout(() => {
      setResult((r) => ({
        ...r,
        state: "completed",
        qualityScore: Math.min(99, r.qualityScore + Math.floor(Math.random() * 3)),
        generationTime: `${(7 + Math.random() * 3).toFixed(1)}s`,
      }));
      setTimeout(() => setScanning(false), 1200);
    }, 2400);
  };

  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const handleDownload = () => { setDownloaded(true); setTimeout(() => setDownloaded(false), 1800); };

  const stateMeta: Record<State, { label: string; color: string; icon: typeof Sparkles; ring: string; dot: string }> = {
    completed: {
      label: "Completed",
      color: "text-emerald-600 dark:text-emerald-300",
      icon: Check,
      ring: "ring-emerald-400/30 bg-emerald-500/10",
      dot: "bg-emerald-500",
    },
    refining: {
      label: "Refining",
      color: "text-fuchsia-600 dark:text-fuchsia-300",
      icon: Loader2,
      ring: "ring-fuchsia-400/30 bg-fuchsia-500/10",
      dot: "bg-fuchsia-500",
    },
    failed: {
      label: "Failed",
      color: "text-rose-600 dark:text-rose-300",
      icon: AlertCircle,
      ring: "ring-rose-400/30 bg-rose-500/10",
      dot: "bg-rose-500",
    },
  };
  const meta = stateMeta[result.state];

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,400px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[48px] blur-3xl"
        animate={{
          background:
            result.state === "completed"
              ? "radial-gradient(circle at 30% 20%, rgba(217,70,239,0.22), transparent 55%), radial-gradient(circle at 75% 80%, rgba(34,211,238,0.18), transparent 60%)"
              : result.state === "refining"
              ? "radial-gradient(circle at 50% 40%, rgba(217,70,239,0.28), transparent 60%)"
              : "radial-gradient(circle at 50% 40%, rgba(244,63,94,0.22), transparent 60%)",
        }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Iridescent animated border */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[28px]"
        style={{
          background: "conic-gradient(from 0deg, #d946ef, #22d3ee, #a855f7, #ec4899, #d946ef)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(217,70,239,0.6) 25%, transparent 50%, rgba(34,211,238,0.6) 75%, transparent 100%)" }}
        />
      </div>

      <article className="cs-surface relative overflow-hidden rounded-[28px] cs-border shadow-[0_40px_90px_-40px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.5), rgba(34,211,238,0.5), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />

        <div className="relative p-5">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-fuchsia-500/30 bg-gradient-to-b from-fuchsia-500/15 to-fuchsia-500/5 text-fuchsia-600 shadow-sm dark:text-fuchsia-300"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              >
                <Wand2 className="h-3.5 w-3.5" strokeWidth={2} />
              </motion.div>
              <span className="text-[11.5px] font-medium uppercase tracking-wider cs-muted">Generation result</span>
            </div>
            {/* Status badge — clearer visual difference per state */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ring-1 ${meta.ring} ${meta.color}`}
            >
              <motion.span
                className="relative flex h-2 w-2"
                animate={result.state === "refining" ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {result.state !== "refining" && (
                  <motion.span
                    aria-hidden
                    className={`absolute inline-flex h-full w-full rounded-full ${meta.dot}`}
                    animate={{ opacity: [0, 0.6, 0], scale: [1, 2.2, 2.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${meta.dot}`} />
              </motion.span>
              <meta.icon
                className={`h-2.5 w-2.5 ${result.state === "refining" ? "animate-spin" : ""}`}
                strokeWidth={2.6}
              />
              {meta.label}
            </span>
          </header>

          {/* Prompt — better typography */}
          <div className="mt-4 rounded-xl cs-border cs-input p-3 shadow-inner">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider cs-subtle">Prompt</span>
              <motion.button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Prompt copied" : "Copy prompt"}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-medium cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/30"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-300" strokeWidth={3} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-2.5 w-2.5" strokeWidth={2.4} />
                        Copy
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
            <p
              className="text-[12.5px] leading-relaxed cs-text"
              style={{ fontFamily: "ui-serif, Georgia, Cambria, serif", fontStyle: "italic" }}
            >
              &ldquo;{result.prompt}&rdquo;
            </p>
          </div>

          {/* Result image — premium frame */}
          <div className="relative mt-4 h-[200px] overflow-hidden rounded-xl cs-border cs-surface-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]">
            {/* Premium inner frame ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-white/10"
            />
            <motion.div
              key={result.resultImage + result.state}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: result.state === "failed" ? 0.35 : 1,
                scale: 1,
                filter:
                  result.state === "refining"
                    ? "blur(6px) brightness(0.7)"
                    : result.state === "failed"
                    ? "grayscale(1) blur(2px)"
                    : "blur(0px) brightness(1)",
              }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              <Image src={result.resultImage} alt="AI-generated result preview" fill sizes="360px" className="object-cover" />
            </motion.div>

            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--card-surface)] to-transparent" />

            {/* Scanning shimmer — premium color + smoother sweep */}
            <AnimatePresence>
              {scanning && result.state !== "failed" && (
                <>
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-20"
                    initial={{ top: "-20%" }}
                    animate={{ top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: result.state === "refining" ? 1.6 : 1.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(217,70,239,0.45) 45%, rgba(34,211,238,0.35) 55%, transparent 100%)",
                      filter: "blur(6px)",
                    }}
                  />
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-px"
                    initial={{ top: "-5%" }}
                    animate={{ top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: result.state === "refining" ? 1.6 : 1.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.95), rgba(34,211,238,0.85), transparent)",
                      boxShadow: "0 0 12px rgba(217,70,239,0.6)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {result.state === "failed" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/15 text-rose-600 shadow-lg dark:text-rose-300"
                >
                  <AlertCircle className="h-5 w-5" strokeWidth={2} />
                </motion.div>
                <p className="mt-2 text-[12.5px] font-semibold cs-text">Generation failed</p>
                <p className="mt-0.5 text-[11px] cs-muted">Safety filter triggered · try a different prompt</p>
              </div>
            )}

            {/* Model badge — clearer */}
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full cs-border bg-[var(--card-overlay)] px-2.5 py-1 text-[10.5px] font-semibold cs-text backdrop-blur-md shadow-sm">
              <Cpu className="h-2.5 w-2.5 text-fuchsia-500 dark:text-fuchsia-300" strokeWidth={2.4} />
              {result.model}
            </span>

            {/* Quality score — premium styling */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div className="relative flex items-center gap-1.5 overflow-hidden rounded-full cs-border bg-[var(--card-overlay)] px-2.5 py-1 backdrop-blur-md shadow-sm">
                <Sparkles className="h-2.5 w-2.5 text-amber-500 dark:text-amber-300" strokeWidth={2.4} />
                <span className="text-[10.5px] font-semibold cs-text">Quality</span>
                <motion.span
                  key={result.qualityScore}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-[11.5px] font-bold text-amber-600 dark:text-amber-300 tabular-nums"
                >
                  {result.qualityScore}
                </motion.span>
                <span className="text-[10px] cs-subtle">/ 100</span>
              </div>
              <div className="flex items-center gap-1 rounded-full cs-border bg-[var(--card-overlay)] px-2.5 py-1 text-[10.5px] cs-muted backdrop-blur-md shadow-sm">
                <Clock className="h-2.5 w-2.5 cs-subtle" strokeWidth={2.2} />
                <span className="font-mono">{result.generationTime}</span>
              </div>
            </div>

            {/* Favorite button */}
            <motion.button
              type="button"
              aria-pressed={favorited}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              onClick={() => setFavorited((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full cs-border bg-[var(--card-overlay)] backdrop-blur-md transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/40"
            >
              <motion.span animate={{ scale: favorited ? [1, 1.3, 0.9, 1.15, 1] : 1 }} transition={{ duration: 0.45, ease: EASE }}>
                <Heart className={`h-3.5 w-3.5 transition-colors ${favorited ? "fill-rose-500 text-rose-500" : "cs-muted"}`} strokeWidth={2} />
              </motion.span>
            </motion.button>
          </div>

          {/* Action row — better grid, smoother tap */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            <motion.button
              type="button"
              onClick={handleRegenerate}
              disabled={result.state === "refining"}
              whileTap={{ scale: 0.96 }}
              aria-label="Regenerate"
              className="group/regen relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border border-fuchsia-500/30 bg-gradient-to-b from-fuchsia-500/15 to-fuchsia-500/5 py-2.5 text-[10.5px] font-semibold text-fuchsia-600 transition cs-hover hover:from-fuchsia-500/20 hover:to-fuchsia-500/10 disabled:opacity-50 dark:text-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/30"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/regen:translate-x-full"
              />
              <RefreshCw className={`relative h-3.5 w-3.5 ${result.state === "refining" ? "animate-spin" : ""}`} strokeWidth={2.2} />
              <span className="relative">Regenerate</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={handleCopy}
              whileTap={{ scale: 0.96 }}
              aria-label="Copy prompt"
              className="flex flex-col items-center justify-center gap-1 rounded-xl cs-border cs-input py-2.5 text-[10.5px] font-semibold cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/30"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col items-center gap-1"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" strokeWidth={2.4} />
                  ) : (
                    <Copy className="h-3.5 w-3.5" strokeWidth={2.2} />
                  )}
                  {copied ? "Copied" : "Copy"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              type="button"
              onClick={handleDownload}
              whileTap={{ scale: 0.96 }}
              aria-label="Download result"
              className="flex flex-col items-center justify-center gap-1 rounded-xl cs-border cs-input py-2.5 text-[10.5px] font-semibold cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/30"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={downloaded ? "saved" : "download"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col items-center gap-1"
                >
                  {downloaded ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" strokeWidth={2.4} />
                  ) : (
                    <Download className="h-3.5 w-3.5" strokeWidth={2.2} />
                  )}
                  {downloaded ? "Saved" : "Download"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setFavorited((v) => !v)}
              whileTap={{ scale: 0.96 }}
              aria-pressed={favorited}
              aria-label={favorited ? "Remove favorite" : "Add to favorites"}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 text-[10.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/30 ${
                favorited
                  ? "border-rose-500/40 bg-gradient-to-b from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-200"
                  : "cs-border cs-input cs-muted cs-hover hover:cs-text"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${favorited ? "fill-rose-500 text-rose-500" : ""}`} strokeWidth={2.2} />
              {favorited ? "Saved" : "Favorite"}
            </motion.button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
