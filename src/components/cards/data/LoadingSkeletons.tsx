"use client";
import { motion } from "framer-motion";
import { Sun, Moon, FileText, Image, MessageSquare, Layout, User } from "lucide-react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LoadingSkeletons() {
  const [isDark, setIsDark] = useState(false);
  const bg = isDark ? "#0a0a0f" : "#f8fafc";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const skeletonBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const skeletonHighlight = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const accent = "#6366f1";

  const shimmer = {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  };

  return (
    <div className="h-full w-full overflow-y-auto font-sans" style={{ background: bg, color: textPrimary }}>
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
          <Layout className="h-4 w-4" style={{ color: accent }} />
        </div>
        <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Loading Skeletons</h1>
        <div className="flex-1" />
        <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      <div className="mx-auto max-w-5xl p-6 space-y-6">
        {/* Card skeleton */}
        <Section title="Card" icon={FileText} textMuted={textMuted}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-2xl border p-4" style={{ borderColor: border, background: panelBg }}>
                <motion.div {...shimmer} className="mb-3 h-32 rounded-xl" style={{ background: skeletonBg }} />
                <motion.div {...shimmer} className="mb-2 h-4 w-3/4 rounded" style={{ background: skeletonBg }} />
                <motion.div {...shimmer} className="mb-3 h-3 w-full rounded" style={{ background: skeletonHighlight }} />
                <motion.div {...shimmer} className="h-3 w-2/3 rounded" style={{ background: skeletonHighlight }} />
              </div>
            ))}
          </div>
        </Section>

        {/* Table skeleton */}
        <Section title="Table" icon={Layout} textMuted={textMuted}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, background: panelBg }}>
            <div className="flex gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${border}` }}>
              {[0, 1, 2, 3, 4].map(i => <motion.div key={i} {...shimmer} className="h-3 flex-1 rounded" style={{ background: skeletonHighlight }} />)}
            </div>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${border}` }}>
                <motion.div {...shimmer} className="h-8 w-8 rounded-full" style={{ background: skeletonBg }} />
                <motion.div {...shimmer} className="h-3 flex-1 rounded" style={{ background: skeletonBg }} />
                <motion.div {...shimmer} className="h-3 w-20 rounded" style={{ background: skeletonHighlight }} />
                <motion.div {...shimmer} className="h-3 w-16 rounded" style={{ background: skeletonHighlight }} />
                <motion.div {...shimmer} className="h-5 w-12 rounded-md" style={{ background: skeletonBg }} />
              </div>
            ))}
          </div>
        </Section>

        {/* Profile skeleton */}
        <Section title="Profile" icon={User} textMuted={textMuted}>
          <div className="rounded-2xl border p-6" style={{ borderColor: border, background: panelBg }}>
            <div className="flex items-center gap-4">
              <motion.div {...shimmer} className="h-16 w-16 rounded-full" style={{ background: skeletonBg }} />
              <div className="flex-1">
                <motion.div {...shimmer} className="mb-2 h-5 w-40 rounded" style={{ background: skeletonBg }} />
                <motion.div {...shimmer} className="h-3 w-28 rounded" style={{ background: skeletonHighlight }} />
              </div>
              <motion.div {...shimmer} className="h-9 w-24 rounded-lg" style={{ background: skeletonBg }} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-xl border p-4" style={{ borderColor: border }}>
                  <motion.div {...shimmer} className="mb-2 h-2 w-12 rounded" style={{ background: skeletonHighlight }} />
                  <motion.div {...shimmer} className="h-5 w-16 rounded" style={{ background: skeletonBg }} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Chat skeleton */}
        <Section title="Chat" icon={MessageSquare} textMuted={textMuted}>
          <div className="rounded-2xl border p-4 space-y-4" style={{ borderColor: border, background: panelBg }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <motion.div {...shimmer} className="h-8 w-8 shrink-0 rounded-full" style={{ background: skeletonBg }} />
                <div className={`max-w-[60%] ${i % 2 === 0 ? "" : "items-end flex flex-col"}`}>
                  <motion.div {...shimmer} className="mb-1 h-3 w-20 rounded" style={{ background: skeletonHighlight }} />
                  <motion.div {...shimmer} className="h-8 w-full rounded-xl" style={{ background: skeletonBg }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Article skeleton */}
        <Section title="Article" icon={FileText} textMuted={textMuted}>
          <div className="rounded-2xl border p-6" style={{ borderColor: border, background: panelBg }}>
            <motion.div {...shimmer} className="mb-3 h-6 w-3/4 rounded" style={{ background: skeletonBg }} />
            <motion.div {...shimmer} className="mb-4 h-4 w-1/2 rounded" style={{ background: skeletonHighlight }} />
            <motion.div {...shimmer} className="mb-2 h-3 w-full rounded" style={{ background: skeletonHighlight }} />
            <motion.div {...shimmer} className="mb-2 h-3 w-full rounded" style={{ background: skeletonHighlight }} />
            <motion.div {...shimmer} className="mb-2 h-3 w-4/5 rounded" style={{ background: skeletonHighlight }} />
            <motion.div {...shimmer} className="mb-4 h-48 rounded-xl" style={{ background: skeletonBg }} />
            <motion.div {...shimmer} className="mb-2 h-3 w-full rounded" style={{ background: skeletonHighlight }} />
            <motion.div {...shimmer} className="h-3 w-3/5 rounded" style={{ background: skeletonHighlight }} />
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, textMuted }: { title: string; icon: typeof FileText; children: React.ReactNode; textMuted: string }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
        <Icon className="h-3.5 w-3.5" />
        {title}
      </p>
      {children}
    </div>
  );
}
