"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Inbox, FileQuestion, WifiOff, Lock,
  CheckCircle2, PackageOpen, FolderOpen, Trash2, BellOff,
  Sun, Moon, ArrowRight, RefreshCw, Mail, Home, CloudOff,
  UserX, HeartOff, ShoppingCart, CalendarX, Star,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface EmptyState {
  icon: typeof Inbox;
  color: string;
  title: string;
  message: string;
  action?: string;
  actionIcon?: typeof ArrowRight;
  bgStyle: "gradient" | "pattern" | "blob" | "grid" | "dots" | "glow";
}

const EMPTY_STATES: EmptyState[] = [
  {
    icon: Inbox, color: "#6366f1", title: "No messages yet",
    message: "When you receive messages, they'll appear here. Start a conversation with your team.",
    action: "Compose message", actionIcon: Mail,
    bgStyle: "gradient",
  },
  {
    icon: Search, color: "#8b5cf6", title: "No results found",
    message: "Try adjusting your search or filters to find what you're looking for.",
    action: "Clear filters", actionIcon: RefreshCw,
    bgStyle: "dots",
  },
  {
    icon: PackageOpen, color: "#06b6d4", title: "No orders yet",
    message: "Your orders will show up here once you make your first purchase.",
    action: "Browse products", actionIcon: ArrowRight,
    bgStyle: "blob",
  },
  {
    icon: FolderOpen, color: "#f59e0b", title: "Folder is empty",
    message: "Upload files or create new documents to get started.",
    action: "Upload file", actionIcon: ArrowRight,
    bgStyle: "grid",
  },
  {
    icon: CheckCircle2, color: "#10b981", title: "All caught up!",
    message: "You've completed all your tasks. Great work today!",
    action: "View completed", actionIcon: ArrowRight,
    bgStyle: "glow",
  },
  {
    icon: WifiOff, color: "#ef4444", title: "Connection lost",
    message: "Please check your internet connection and try again.",
    action: "Retry", actionIcon: RefreshCw,
    bgStyle: "pattern",
  },
  {
    icon: Lock, color: "#64748b", title: "Access restricted",
    message: "You don't have permission to view this content. Contact your admin.",
    action: "Request access", actionIcon: Mail,
    bgStyle: "grid",
  },
  {
    icon: FileQuestion, color: "#a855f7", title: "Page not found",
    message: "The page you're looking for doesn't exist or has been moved.",
    action: "Go home", actionIcon: Home,
    bgStyle: "gradient",
  },
  {
    icon: BellOff, color: "#94a3b8", title: "No notifications",
    message: "You're all caught up! We'll notify you when something new arrives.",
    bgStyle: "dots",
  },
  {
    icon: CloudOff, color: "#3b82f6", title: "Cloud sync failed",
    message: "We couldn't sync your data. Check your connection and try again.",
    action: "Retry sync", actionIcon: RefreshCw,
    bgStyle: "pattern",
  },
  {
    icon: UserX, color: "#ec4899", title: "User not found",
    message: "This user doesn't exist or has been removed from the workspace.",
    action: "Go back", actionIcon: ArrowRight,
    bgStyle: "blob",
  },
  {
    icon: ShoppingCart, color: "#f43f5e", title: "Cart is empty",
    message: "Looks like you haven't added anything to your cart yet.",
    action: "Start shopping", actionIcon: ArrowRight,
    bgStyle: "glow",
  },
  {
    icon: CalendarX, color: "#14b8a6", title: "No events scheduled",
    message: "Your calendar is clear. Schedule a meeting or add an event.",
    action: "Add event", actionIcon: ArrowRight,
    bgStyle: "grid",
  },
  {
    icon: HeartOff, color: "#d946ef", title: "No favorites yet",
    message: "Items you favorite will appear here for quick access.",
    action: "Browse items", actionIcon: ArrowRight,
    bgStyle: "gradient",
  },
  {
    icon: Star, color: "#eab308", title: "No reviews yet",
    message: "Be the first to review this product and help others decide.",
    action: "Write a review", actionIcon: ArrowRight,
    bgStyle: "glow",
  },
];

function getBgStyle(style: EmptyState["bgStyle"], color: string, isDark: boolean) {
  switch (style) {
    case "gradient":
      return { background: `radial-gradient(circle at 50% 30%, ${color}15, transparent 70%)` };
    case "pattern":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${color}08, ${color}08 10px, transparent 10px, transparent 20px)`,
      };
    case "blob":
      return {
        background: `radial-gradient(ellipse at 30% 20%, ${color}12, transparent 50%), radial-gradient(ellipse at 70% 80%, ${color}08, transparent 50%)`,
      };
    case "grid":
      return {
        backgroundImage: `linear-gradient(${color}10 1px, transparent 1px), linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      };
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${color}15 1.5px, transparent 1.5px)`,
        backgroundSize: "16px 16px",
      };
    case "glow":
      return {
        background: `radial-gradient(circle at 50% 50%, ${color}20, transparent 60%)`,
      };
    default:
      return {};
  }
}

export function EmptyStates() {
  const [isDark, setIsDark] = useState(false);
  const bg = isDark ? "#0a0a0f" : "#f8fafc";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const accent = "#6366f1";

  return (
    <div className="h-full w-full overflow-y-auto font-sans" style={{ background: bg, color: textPrimary }}>
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
          <Inbox className="h-4 w-4" style={{ color: accent }} />
        </div>
        <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Empty States</h1>
        <p className="text-[10px]" style={{ color: textMuted }}>{EMPTY_STATES.length} variants · 6 bg designs</p>
        <div className="flex-1" />
        <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EMPTY_STATES.map((state, i) => {
            const Icon = state.icon;
            const ActionIcon = state.actionIcon;
            const bgStyle = getBgStyle(state.bgStyle, state.color, isDark);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2, ease: EASE }}
                className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-8 text-center"
                style={{ borderColor: border, background: panelBg, minHeight: 300 }}
              >
                {/* Background design layer */}
                <div className="pointer-events-none absolute inset-0" style={bgStyle} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon with glow ring */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: `${state.color}30` }} />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border" style={{ background: `${state.color}15`, borderColor: `${state.color}30` }}>
                      <Icon className="h-8 w-8" style={{ color: state.color }} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="mb-1.5 text-[15px] font-bold" style={{ color: textPrimary }}>{state.title}</h3>
                  <p className="mb-5 max-w-[240px] text-[12px] leading-relaxed" style={{ color: textSecondary }}>{state.message}</p>

                  {state.action && ActionIcon && (
                    <button
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-[12px] font-semibold text-white transition hover:scale-105"
                      style={{ background: state.color, boxShadow: `0 4px 12px ${state.color}40` }}
                    >
                      <ActionIcon className="h-3.5 w-3.5" />
                      {state.action}
                    </button>
                  )}

                  {/* Bg style label */}
                  <span className="mt-4 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider" style={{ background: `${state.color}10`, color: state.color, opacity: 0.6 }}>
                    {state.bgStyle} bg
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
