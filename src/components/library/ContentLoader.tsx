"use client";

import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// ContentLoader — premium blur loading overlay for the content area ONLY
// ════════════════════════════════════════════════════════════════════════════
// Covers only the parent container (absolute inset-0). The sidebar and header
// live outside this container, so they stay sharp and interactive.
//
// Spinner design: dual concentric rings — outer ring spins clockwise with a
// gradient arc, inner ring spins counter-clockwise with a different gradient.
// A center dot pulses softly. The whole thing sits on a blurred backdrop.

export function ContentLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          style={{
            background: "var(--card-surface)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Spinner — dual ring with gradient arcs */}
          <div className="relative flex h-12 w-12 items-center justify-center">
            {/* Outer ring — clockwise, cyan→blue gradient arc */}
            <svg className="absolute inset-0 h-full w-full content-spinner-outer" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="spinner-outer-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle cx="24" cy="24" r="20" stroke="var(--card-border)" strokeWidth="2.5" fill="none" opacity="0.5" />
              {/* Arc — 270° sweep */}
              <circle
                cx="24" cy="24" r="20"
                stroke="url(#spinner-outer-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="94.2 125.6"
                strokeDashoffset="0"
              />
            </svg>
            {/* Inner ring — counter-clockwise, violet→pink gradient arc */}
            <svg className="absolute inset-0 h-full w-full content-spinner-inner" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="spinner-inner-grad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle
                cx="24" cy="24" r="13"
                stroke="url(#spinner-inner-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="40.8 81.6"
                strokeDashoffset="0"
              />
            </svg>
            {/* Center dot — soft pulse */}
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--card-text-muted)" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
