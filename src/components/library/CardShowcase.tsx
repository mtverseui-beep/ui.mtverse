"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ResponsivePreviewToolbar } from "@/components/navbar-showcase/ResponsivePreviewToolbar";
import { CodePanelLoader } from "./CodePanelLoader";
import { DocsPanelLoader } from "./DocsPanelLoader";
import { cardRoutes } from "@/components/cards-data/cards";


const EASE = [0.16, 1, 0.3, 1] as const;
const FULL_CANVAS_CATEGORIES = new Set([
  "Agents",
  "AI",
  "Auth",
  "Navbar",
  "Footer",
  "Pricing",
  "Hero",
  "Testimonials",
  "Features",
  "CTA",
  "Backgrounds",
  "Charts",
  "Modals",
  "Sidebar",
  "Tables",
]);

type TabId = "preview" | "code" | "docs";

interface CardShowcaseProps {

  slug: string;
  children: React.ReactNode;
}

export function CardShowcase({ slug, children }: CardShowcaseProps) {
  const [tab, setTab] = useState<TabId>("preview");

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setTab(next);
    },
    [tab],
  );

  const cardMeta = cardRoutes.find((card) => card.slug === slug);
  const fullCanvas = cardMeta
    ? FULL_CANVAS_CATEGORIES.has(cardMeta.category)
    : false;
  const docsPanel = <DocsPanelLoader slug={slug} />;

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
              role="tabpanel"
              aria-label="Preview"
              className="absolute inset-0 flex min-h-0 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <MotionConfig reducedMotion="user">
                <CardPreviewCanvas
                  fullCanvas={fullCanvas}
                  category={cardMeta?.category}
                >
                  {children}
                </CardPreviewCanvas>
              </MotionConfig>
            </motion.div>
          ) : tab === "code" ? (
            <motion.div
              key="code"
              role="tabpanel"
              aria-label="Raw code"
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
              role="tabpanel"
              aria-label="Documentation"
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

function CardPreviewCanvas({
  children,
  fullCanvas,
  category,
}: {
  children: React.ReactNode;
  fullCanvas: boolean;
  category?: string;
}) {
  const previewPadding =
    category === "Forms" ? "p-5 sm:p-8 lg:p-10" : "p-3 sm:p-6";

  return (
    <div className="flex min-h-0 flex-1 items-stretch overflow-hidden p-3 sm:p-4">
      <div
        className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border cs-border bg-background shadow-sm"
        style={{ contain: "paint" }}
      >
        <div className="@container relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden scrollbar-modern">
          {fullCanvas ? (
            <div data-component-category={category} className="component-theme-scope relative h-full min-h-[440px] w-full">{children}</div>
          ) : (
            <div className={`relative flex min-h-full w-full ${previewPadding}`}>
              <div data-component-category={category} className="component-theme-scope my-auto flex w-full min-w-0 shrink-0 justify-center [&>*]:max-w-full">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
