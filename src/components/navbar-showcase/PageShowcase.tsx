"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsivePreviewToolbar } from "./ResponsivePreviewToolbar";
import { CodePanelLoader } from "@/components/library/CodePanelLoader";
import { ComponentDocs } from "@/components/library/ComponentDocs";

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = "preview" | "code" | "docs";

interface PageShowcaseProps {
  slug: string;
  children: React.ReactNode;
}

export function PageShowcase({ slug, children }: PageShowcaseProps) {
  const [tab, setTab] = useState<TabId>("preview");

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setTab(next);
    },
    [tab],
  );

  const docsPanel = <ComponentDocs slug={slug} />;

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
              <PagePreviewCanvas>{children}</PagePreviewCanvas>
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
                <CodePanelLoader slug={slug} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="docs"
              className="absolute inset-0 overflow-y-auto scrollbar-modern p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <div className="mx-auto max-w-3xl">
                {docsPanel || (
                  <div className="rounded-xl border cs-border p-8 text-center cs-muted">
                    Documentation not available for this component.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── PagePreviewCanvas — full-width, scrollable, browser-style frame ──
function PagePreviewCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 items-stretch overflow-hidden p-3 sm:p-4">
      <div
        className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border cs-border bg-background shadow-sm"
        style={{ width: "100%", maxWidth: "none" }}
      >
        <div
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="component-theme-scope flex h-full min-h-[400px] shrink-0 flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
