"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type PopoverProps = {
  open: boolean;
  onClose: () => void;
  /** Element the popover anchors to. The popover renders at the anchor's
   * top-right, growing downward. */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** Optional aria-label for the popover region. */
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * Anchored popover rendered via a portal to document.body.
 *
 * Why a portal: any element that lives inside a `transform-style: preserve-3d`
 * subtree (e.g. the CinematicFolderCard) gets trapped in a new stacking
 * context. `z-index` cannot lift it above siblings of the 3D root, which is
 * exactly why dropdowns "opened inside the card" and got visually clipped.
 *
 * By portaling to document.body the popover escapes the 3D subtree entirely
 * and always renders on top. Position is recomputed on every open + on scroll
 * + on resize so it stays glued to its anchor.
 */
export function Popover({
  open,
  onClose,
  anchorRef,
  ariaLabel,
  children,
}: PopoverProps) {
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(
    null,
  );

  const reposition = React.useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    // Align popover's right edge with the anchor's right edge, place it
    // just below the anchor. The popover width is fixed by its content
    // (w-44 in callers), so we shift left by that width to right-align.
    const POPOVER_WIDTH = 176; // w-44 = 11rem = 176px
    setCoords({
      top: r.bottom + 6,
      left: Math.max(8, r.right - POPOVER_WIDTH),
    });
  }, [anchorRef]);

  React.useEffect(() => {
    if (!open) return;
    reposition();
    const onScroll = () => reposition();
    const onDown = (e: MouseEvent) => {
      // Close on outside click. The popover content is portaled to body, so
      // any click outside the popover element itself counts as "outside".
      const target = e.target as Node;
      const anchor = anchorRef.current;
      // If the click landed on the anchor (the trigger button), let the
      // caller handle the toggle — don't close here.
      if (anchor && anchor.contains(target)) return;
      // Otherwise, if it's not inside the popover, close.
      const popover = document.getElementById("popover-content");
      if (popover && !popover.contains(target)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        anchorRef.current?.focus();
        return;
      }
      // Arrow-key navigation for menuitems (WAI-ARIA menu pattern).
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const popover = document.getElementById("popover-content");
        if (!popover) return;
        const items = Array.from(
          popover.querySelectorAll<HTMLElement>('[role="menuitem"]'),
        );
        if (items.length === 0) return;
        const currentIndex = items.findIndex(
          (el) => el === document.activeElement,
        );
        const nextIndex =
          e.key === "ArrowDown"
            ? currentIndex < 0
              ? 0
              : (currentIndex + 1) % items.length
            : currentIndex <= 0
              ? items.length - 1
              : currentIndex - 1;
        items[nextIndex]?.focus();
      }
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    document.addEventListener("keydown", onKey);
    // Delay registering mousedown so the same click that opened the popover
    // doesn't immediately close it.
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
    }, 10);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose, anchorRef, reposition]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && coords && (
        <motion.div
          id="popover-content"
          role="menu"
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.18, ease: EASE }}
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            zIndex: 9999,
          }}
          className="cs-surface w-44 overflow-hidden rounded-xl cs-border p-1 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
