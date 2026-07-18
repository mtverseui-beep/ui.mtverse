"use client";

import { motion, LayoutGroup } from "framer-motion";
import { Loader2, Eye, Code2, FileText } from "lucide-react";

type TabId = "preview" | "code" | "docs";

interface ResponsivePreviewToolbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  loadingTab: TabId | null;
}

export function ResponsivePreviewToolbar({
  activeTab,
  onTabChange,
  loadingTab,
}: ResponsivePreviewToolbarProps) {
  return (
    <div className="flex shrink-0 items-center justify-center border-b cs-border bg-[var(--card-surface)] px-4 py-2">
      <LayoutGroup id="navbar-toolbar-segmented">
        <div
          role="tablist"
          aria-label="Component view"
          className="inline-flex items-center gap-0.5 p-0.5"
        >
          <SegmentButton
            id="preview"
            active={activeTab === "preview"}
            loading={loadingTab === "preview"}
            onClick={() => onTabChange("preview")}
            icon={<Eye className="h-3.5 w-3.5" strokeWidth={2.4} />}
            label="Preview"
          />
          <SegmentButton
            id="code"
            active={activeTab === "code"}
            loading={loadingTab === "code"}
            onClick={() => onTabChange("code")}
            icon={<Code2 className="h-3.5 w-3.5" strokeWidth={2.4} />}
            label="Raw code"
          />
          <SegmentButton
            id="docs"
            active={activeTab === "docs"}
            loading={loadingTab === "docs"}
            onClick={() => onTabChange("docs")}
            icon={<FileText className="h-3.5 w-3.5" strokeWidth={2.4} />}
            label="Docs"
          />
        </div>
      </LayoutGroup>
    </div>
  );
}

function SegmentButton({
  id,
  active,
  loading,
  onClick,
  icon,
  label,
}: {
  id: TabId;
  active: boolean;
  loading: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
    >
      {active && (
        <motion.span
          layoutId="segment-active-pill"
          className="absolute inset-0 rounded-md bg-[var(--card-input-bg)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className={`relative z-10 flex items-center gap-1.5 transition-colors ${
          active ? "cs-text" : "cs-muted hover:cs-text"
        }`}
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : icon}
        {label}
      </span>
    </button>
  );
}
