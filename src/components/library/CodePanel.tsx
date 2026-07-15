"use client";

import { useState } from "react";
import { Terminal, FileCode2, Package, Palette } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import type { PublicCodeEntry } from "./code-types";

interface CodePanelProps {
  entry: PublicCodeEntry;
  sharedCssNotes: string;
}

export function CodePanel({ entry, sharedCssNotes }: CodePanelProps) {
  // Build the list of files to show: install command, main file, deps, CSS notes.
  const files = [
    {
      id: "install",
      label: "install.sh",
      icon: Terminal,
      language: "bash",
      code: entry.installCommand,
    },
    {
      id: "main",
      label: `${entry.componentName}.tsx`,
      icon: FileCode2,
      language: "tsx",
      code: entry.mainFile.content,
    },
    ...entry.dependencies.map((dep, i) => ({
      id: `dep-${i}`,
      label: dep.label,
      icon: FileCode2,
      language: dep.label.endsWith("ts") || dep.label.includes("data") || dep.label.includes("type")
        ? "typescript"
        : "tsx",
      code: dep.content,
    })),
    {
      id: "css",
      label: "globals.css",
      icon: Palette,
      language: "css",
      code: sharedCssNotes,
    },
  ];

  const [activeFile, setActiveFile] = useState(files[1].id); // Default to main component file
  const current = files.find((f) => f.id === activeFile) ?? files[1];

  return (
    <div className="space-y-3">
      {/* ── Dependency badges ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Package className="h-3.5 w-3.5" strokeWidth={2.2} />
          Dependencies
        </span>
        {entry.npmPackages
          .filter((p) => !["react", "react-dom", "next"].includes(p))
          .map((pkg) => (
            <span
              key={pkg}
              className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10.5px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {pkg}
            </span>
          ))}
      </div>

      {/* ── File selector tabs ── */}
      <div className="scrollbar-modern flex gap-1 overflow-x-auto border-b border-slate-200 pb-px dark:border-white/10">
        {files.map((file) => {
          const Icon = file.icon;
          const isActive = file.id === activeFile;
          return (
            <button
              key={file.id}
              type="button"
              onClick={() => setActiveFile(file.id)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-[11.5px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
                isActive
                  ? "border-cyan-500 text-slate-900 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {file.label}
            </button>
          );
        })}
      </div>

      {/* ── Code block ── */}
      <CodeBlock
        code={current.code}
        language={current.language}
        label={current.label}
        maxHeight={560}
      />

      {/* ── Usage note ── */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.02]">
        <p className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Usage:</span>{" "}
          Import the component and render it in your page. All mock data is included
          in the data file (if applicable). Add the <code className="rounded bg-slate-200 px-1 py-0.5 font-mono text-[11px] dark:bg-white/10">cs-*</code> CSS
          utility classes from <code className="rounded bg-slate-200 px-1 py-0.5 font-mono text-[11px] dark:bg-white/10">globals.css</code> to
          your stylesheet for theme-aware dark/light mode.
        </p>
      </div>
    </div>
  );
}
