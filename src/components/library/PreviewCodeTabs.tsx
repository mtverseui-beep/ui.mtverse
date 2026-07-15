"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Eye, Code2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const TAB_SWITCH_DELAY = 150;

type TabId = "preview" | "code";

interface PreviewCodeTabsProps {
  preview: React.ReactNode;
  codePanel: React.ReactNode;
  defaultTab?: TabId;
}

export function PreviewCodeTabs({
  preview,
  codePanel,
  defaultTab = "preview",
}: PreviewCodeTabsProps) {
  const [tab, setTab] = useState<TabId>(defaultTab);
  const [switching, setSwitching] = useState(false);

  const handleTabChange = useCallback(
    (next: TabId) => {
      if (next === tab) return;
      setSwitching(true);
      setTimeout(() => {
        setTab(next);
        setSwitching(false);
      }, TAB_SWITCH_DELAY);
    },
    [tab],
  );

  return (
    <div className="relative h-full min-h-0 w-full">
      {/* ── Floating tab pill — top-left corner, absolute positioned ──
          Takes ZERO vertical space from the preview. The preview centers
          in the full available height, exactly like the original dashboard. */}
      <div className="absolute left-4 top-3 z-20 sm:left-5 sm:top-4">
        <LayoutGroup id="preview-code-tabs">
          <div
            role="tablist"
            aria-label="Component view"
            className="inline-flex items-center gap-0.5 rounded-lg cs-border bg-[var(--card-surface)] p-0.5 shadow-sm"
          >
            <TabButton
              id="preview"
              active={tab === "preview"}
              onClick={() => handleTabChange("preview")}
              icon={<Eye className="h-3 w-3" strokeWidth={2.4} />}
              label="Preview"
            />
            <TabButton
              id="code"
              active={tab === "code"}
              onClick={() => handleTabChange("code")}
              icon={<Code2 className="h-3 w-3" strokeWidth={2.4} />}
              label="Code"
            />
          </div>
        </LayoutGroup>
      </div>

      {/* ── Content — fills the ENTIRE area, scrollable if needed ── */}
      <AnimatePresence mode="wait">
        {switching ? (
          <motion.div
            key="skeleton"
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <TabSkeleton />
          </motion.div>
        ) : tab === "preview" ? (
          <motion.div
            key="preview"
            role="tabpanel"
            aria-label="Preview"
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-modern"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {/* Content centered in the full workspace with balanced padding.
                No fixed max-w — uses percentage-based padding so it's
                visually centered regardless of sidebar widths. */}
            <div className="flex min-h-full w-full items-center justify-center px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex w-full shrink-0 justify-center">{preview}</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            role="tabpanel"
            aria-label="Code"
            className="absolute inset-0 overflow-y-auto scrollbar-modern p-4 pt-16 sm:p-6 sm:pt-16 lg:p-8 lg:pt-16"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <div className="mx-auto max-w-4xl">{codePanel}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  id,
  active,
  onClick,
  icon,
  label,
}: {
  id: TabId;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      onClick={onClick}
      className="relative flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
    >
      {active && (
        <motion.span
          layoutId="tab-active-pill"
          className="absolute inset-0 rounded-md bg-[var(--card-input-bg)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className={`relative z-10 flex items-center gap-1 transition-colors ${
          active ? "cs-text" : "cs-muted hover:cs-text"
        }`}
      >
        {icon}
        {label}
      </span>
    </button>
  );
}

function TabSkeleton() {
  return (
    <div className="w-full max-w-md space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded animate-pulse"
          style={{
            width: `${40 + (i % 3) * 20}%`,
            background: "var(--card-border)",
          }}
        />
      ))}
      <div
        className="h-32 rounded-xl animate-pulse"
        style={{ background: "var(--card-input-bg)" }}
      />
    </div>
  );
}
