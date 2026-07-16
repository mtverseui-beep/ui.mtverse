"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

export function BentoCard({
  children,
  className,
  delay = 0,
  onMenuClick,
  showMenu = false,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onMenuClick?: () => void;
  showMenu?: boolean;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "masonry-item relative rounded-card bg-white dark:bg-ink-800 p-5 shadow-card transition-shadow duration-300 hover:shadow-cardHover card-enter",
        className
      )}
      style={{
        // CSS animation delay (s) — replaces Framer Motion stagger
        animationDelay: `${Math.min(delay, 0.5)}s`,
        // Paint containment avoids cross-card repaints without masonry reflow.
        contain: "paint",
      }}
    >
      {accent && (
        <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-card"
          style={{ background: accent }}
        />
      )}
      {showMenu && (
        <button
          onClick={onMenuClick}
          className="absolute right-4 top-4 text-ink-300 hover:text-ink-700 transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      )}
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-bold text-ink-900 dark:text-white leading-snug truncate">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-300 truncate">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
