"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsivePreviewToolbar } from "./ResponsivePreviewToolbar";
import { NavbarPreviewCanvas } from "./NavbarPreviewCanvas";
import { CodePanelLoader } from "@/components/library/CodePanelLoader";
import type { NavbarVariant } from "./navbar-variants";

// ──────────────────────────────────────────────────────────────────────────
// NavbarShowcase
// ──────────────────────────────────────────────────────────────────────────
// Top-level orchestrator. A simple segmented switch toggles between:
//
//   Preview — navbar rendered at full desktop width inside a scroll canvas
//   Code    — complete responsive source code (desktop + tablet + mobile)

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = "preview" | "code" | "docs";

interface NavbarShowcaseProps {
  variant: NavbarVariant;
}

export function NavbarShowcase({ variant }: NavbarShowcaseProps) {
  const [tab, setTab] = useState<TabId>("preview");

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setTab(next);
    },
    [tab],
  );

  const NavbarComponent = variant.component;

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <ResponsivePreviewToolbar
        activeTab={tab}
        onTabChange={handleTabChange}
        loadingTab={null}
      />

      {/* ── Content area ── */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          {tab === "preview" ? (
            <motion.div
              key="preview"
              className="absolute inset-0 flex min-h-0 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <NavbarPreviewCanvas
                scrollSpaceHeight={variant.scrollSpaceHeight}
              >
                {(scrollRef) => (
                  <NavbarComponent scrollContainerRef={scrollRef} />
                )}
              </NavbarPreviewCanvas>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              className="absolute inset-0 overflow-y-auto scrollbar-modern p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <div className="mx-auto max-w-4xl">
                <CodePanelLoader slug={variant.slug} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
