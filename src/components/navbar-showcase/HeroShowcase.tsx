"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsivePreviewToolbar } from "./ResponsivePreviewToolbar";
import { CodePanelLoader } from "@/components/library/CodePanelLoader";
import { ComponentDocs } from "@/components/library/ComponentDocs";
import type { HeroVariant } from "./hero-variants";

// ──────────────────────────────────────────────────────────────────────────
// HeroShowcase
// ──────────────────────────────────────────────────────────────────────────
// Same pattern as Navbar/Footer: segmented switch (Preview | Code).
// The hero preview is full-width desktop, with enough height to show the
// full hero without clipping.

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = "preview" | "code" | "docs";

interface HeroShowcaseProps {
  variant: HeroVariant;
}

export function HeroShowcase({ variant }: HeroShowcaseProps) {
  const [tab, setTab] = useState<TabId>("preview");

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setTab(next);
    },
    [tab],
  );

  const HeroComponent = variant.component;

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <ResponsivePreviewToolbar
        activeTab={tab}
        onTabChange={handleTabChange}
        loadingTab={null}
      />

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
              <HeroPreviewCanvas>
                <HeroComponent />
              </HeroPreviewCanvas>
            </motion.div>
          ) : tab === "code" ? (
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
          ) : (
            <motion.div
              key="docs"
              role="tabpanel"
              aria-label="Documentation"
              className="absolute inset-0 overflow-y-auto scrollbar-modern p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <div className="mx-auto max-w-3xl">
                <ComponentDocs slug={variant.slug} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// HeroPreviewCanvas
// ──────────────────────────────────────────────────────────────────────────
// Full-width, full-height canvas. The hero fills the entire canvas so its
// min-h-full + flex centering works correctly. No scroll — the hero is
// sized to fit. contain: paint scopes any positioned descendants.
function HeroPreviewCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 items-stretch overflow-hidden p-3 sm:p-4">
      <div
        className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border cs-border bg-background shadow-sm"
        style={{
          width: "100%",
          maxWidth: "none",
          contain: "paint",
        }}
      >
        <div className="@container component-theme-scope min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
