"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsivePreviewToolbar } from "./ResponsivePreviewToolbar";
import { CodePanelLoader } from "@/components/library/CodePanelLoader";
import { DocsPanelLoader } from "@/components/library/DocsPanelLoader";
import type { FooterVariant } from "./footer-variants";

// ──────────────────────────────────────────────────────────────────────────
// FooterShowcase
// ──────────────────────────────────────────────────────────────────────────
// Same pattern as NavbarShowcase: a segmented switch (Preview | Code).

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = "preview" | "code" | "docs";

interface FooterShowcaseProps {
  variant: FooterVariant;
}

export function FooterShowcase({ variant }: FooterShowcaseProps) {
  const [tab, setTab] = useState<TabId>("preview");

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setTab(next);
    },
    [tab],
  );

  const FooterComponent = variant.component;

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
              <FooterPreviewCanvas>
                <FooterComponent />
              </FooterPreviewCanvas>
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
                <DocsPanelLoader slug={variant.slug} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// FooterPreviewCanvas
// ──────────────────────────────────────────────────────────────────────────
// Renders the footer at the BOTTOM of the viewport (like a real page).
// Above the footer is blank space — no fake page content.
function FooterPreviewCanvas({ children }: { children: React.ReactNode }) {
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
        <div
          className="@container flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="flex-1" aria-hidden="true" />
          <div className="component-theme-scope shrink-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
