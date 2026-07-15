"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  Search, Bell, Plus, ChevronDown, GitBranch, Star, GitFork, Eye, Code2, CircleDot,
  GitPullRequest, Play, BookMarked, Shield,
} from "lucide-react";
import { UnsplashAvatar } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar015 — devkit (Code-host style — global bar + repo tabs + branch)
// Three tiers: global bar (logo/search/+/avatar), repo header with breadcrumb,
// Watch/Star/Fork counts, branch selector, and tab row with layoutId underline.
// ════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "code", label: "Code", icon: Code2 },
  { id: "issues", label: "Issues", icon: CircleDot, count: 42 },
  { id: "pr", label: "Pull requests", icon: GitPullRequest, count: 7 },
  { id: "actions", label: "Actions", icon: Play },
  { id: "wiki", label: "Wiki", icon: BookMarked },
  { id: "security", label: "Security", icon: Shield },
];

const BLUE = "#2f81f7";

export function Navbar015Card() {
  const [tab, setTab] = useState("code");

  return (
    <div
      data-navbar015
      className="min-h-full"
      style={{ background: "#0d1117", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#e6edf3" }}
    >
      {/* Global bar */}
      <header className="sticky top-0 z-40 border-b border-[#30363d] bg-[#0d1117]">
        <div className="flex h-14 items-center gap-4 px-4">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="devkit" className="text-white">
            <OctocatLogo />
          </a>
          <div className="flex items-center gap-2 text-sm">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#7d8590] hover:text-white">acme</a>
            <span className="text-[#7d8590]">/</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-white hover:text-[#2f81f7]">design-system</a>
            <span className="ml-1 rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] font-medium text-[#7d8590]">Public</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-md border border-[#30363d] px-2.5 py-1 text-xs hover:bg-[#21262d]">
              <Eye className="h-3.5 w-3.5" /> Watch
              <span className="ml-1 rounded-full bg-[#21262d] px-1.5 text-[10px]">128</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-md border border-[#30363d] px-2.5 py-1 text-xs hover:bg-[#21262d]">
              <GitFork className="h-3.5 w-3.5" /> Fork
              <span className="ml-1 rounded-full bg-[#21262d] px-1.5 text-[10px]">34</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-md border border-[#30363d] px-2.5 py-1 text-xs hover:bg-[#21262d]">
              <Star className="h-3.5 w-3.5" /> Star
              <span className="ml-1 rounded-full bg-[#21262d] px-1.5 text-[10px]">2.4k</span>
            </button>
          </div>
          <div className="ml-2 flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#21262d]" aria-label="Notifications">
              <Bell className="h-4 w-4 text-[#7d8590]" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#238636] text-white hover:bg-[#2ea043]" aria-label="New">
              <Plus className="h-4 w-4" />
            </button>
            <UnsplashAvatar seed="photo-1607746882042-944635dfe10e" alt="User" size={28} className="rounded-full" />
          </div>
        </div>

        {/* Repo toolbar: branch + path */}
        <div className="flex items-center gap-3 px-4 pb-3">
          <button className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs font-medium hover:bg-[#30363d]">
            <GitBranch className="h-3.5 w-3.5" /> main
            <ChevronDown className="h-3 w-3 text-[#7d8590]" />
          </button>
          <div className="flex items-center gap-1 text-xs text-[#7d8590]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <span>design-system</span>
            <span>/</span>
            <span>src</span>
            <span>/</span>
            <span>components</span>
            <span>/</span>
            <span className="text-white">Button.tsx</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-[#7d8590]">
            <Search className="h-3.5 w-3.5" />
            <kbd className="rounded border border-[#30363d] px-1.5 py-0.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>/</kbd>
          </div>
        </div>

        {/* Tab row */}
        <LayoutGroup>
          <nav className="relative flex items-center gap-1 px-4">
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative flex items-center gap-1.5 px-3 py-2.5 text-sm transition-colors"
                  style={{ color: isActive ? "#fff" : "#7d8590", fontWeight: isActive ? 600 : 400 }}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {t.count && (
                    <span className="ml-1 rounded-full bg-[#21262d] px-1.5 py-0.5 text-[10px] text-[#7d8590]">{t.count}</span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="navbar015-tab"
                      className="absolute inset-x-0 -bottom-px h-0.5"
                      style={{ background: "#f78166" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </LayoutGroup>
      </header>

      {/* Body */}
      <div className="px-4 py-6">
        <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-5">
          <pre className="overflow-x-auto text-xs leading-relaxed text-[#e6edf3]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
{`import { Button } from "@acme/design-system";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function OctocatLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 22 12.3C22 6.6 17.5 2 12 2z" />
    </svg>
  );
}
