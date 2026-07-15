"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

// ════════════════════════════════════════════════════════════════════════════
// OVERLAYS — shared primitives
// ════════════════════════════════════════════════════════════════════════════

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 300, damping: 28 };

// ─── DemoButton ─────────────────────────────────────────────────────────────
export function DemoButton({
  children,
  onClick,
  color = "#6366f1",
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const base = `inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition-all active:scale-[0.97] ${className}`;
  const styles =
    variant === "solid"
      ? { background: color, color: "#fff", boxShadow: `0 4px 14px ${color}30` }
      : variant === "outline"
      ? { background: "rgba(255,255,255,0.6)", color, border: `1.5px solid ${color}40`, backdropFilter: "blur(8px)" }
      : { background: "rgba(255,255,255,0.5)", color: "#6b7280", border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(8px)" };
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className={base} style={styles}>
      {children}
    </motion.button>
  );
}

// ─── Backdrop ───────────────────────────────────────────────────────────────
export function Backdrop({ onClick, opacity = 0.5 }: { onClick?: () => void; opacity?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="absolute inset-0 z-40"
      style={{ background: `rgba(0,0,0,${opacity})`, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    />
  );
}

// ─── CloseButton ────────────────────────────────────────────────────────────
export function CloseButton({ onClick, color }: { onClick: () => void; color?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5" style={{ color: color ?? "#9ca3af" }}>
      <X className="h-4 w-4" strokeWidth={2.2} />
    </button>
  );
}

// ─── OverlayStage — fills the full content area ─────────────────────────────
// IMPORTANT: NO overflow-hidden here! This allows ModalOverlay to scroll
// when the modal is taller than the container.
export function OverlayStage({
  children,
  gradient = "radial-gradient(circle at 15% 25%, rgba(196,181,253,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(165,243,252,0.15), transparent 45%), radial-gradient(circle at 50% 85%, rgba(254,202,232,0.12), transparent 45%)",
  bg = "#f4f5f7",
}: {
  children: ReactNode;
  gradient?: string;
  bg?: string;
}) {
  return (
    <div
      className="relative h-full min-h-full w-full rounded-2xl"
      style={{ background: `${bg}`, backgroundImage: gradient, overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

// ─── TriggerCenter ──────────────────────────────────────────────────────────
export function TriggerCenter({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 flex items-center justify-center">{children}</div>;
}

// ─── ModalOverlay — scrollable overlay that wraps modal content ─────────────
// Uses absolute inset-0 with overflow-y-auto so the modal scrolls naturally.
// The modal content has py-8 padding (top + bottom) so there's always space
// above and below the modal card, even when scrolled to the very top/bottom.
export function ModalOverlay({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop — dark semi-transparent with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      {/* Modal content — with top+bottom padding so it never touches edges */}
      <div className="relative z-10 w-full max-w-md px-4 py-8" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}
