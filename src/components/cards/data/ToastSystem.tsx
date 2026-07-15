"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, AlertCircle, AlertTriangle, Info, X, Bell,
  Sun, Moon, Mail, MessageSquare, ShoppingCart, UserPlus, Heart,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type ToastType = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  icon?: typeof CheckCircle2;
}

const TOAST_STYLES: Record<ToastType, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  success: { color: "#10b981", bg: "#10b98115", icon: CheckCircle2 },
  error: { color: "#ef4444", bg: "#ef444415", icon: AlertCircle },
  warning: { color: "#f59e0b", bg: "#f59e0b15", icon: AlertTriangle },
  info: { color: "#3b82f6", bg: "#3b82f615", icon: Info },
};

const PRESETS = [
  { type: "success" as ToastType, title: "Payment received", message: "Your subscription has been activated successfully.", icon: CheckCircle2 },
  { type: "error" as ToastType, title: "Upload failed", message: "The file exceeds the maximum size of 10MB.", icon: AlertCircle },
  { type: "warning" as ToastType, title: "Storage almost full", message: "You've used 92% of your storage limit.", icon: AlertTriangle },
  { type: "info" as ToastType, title: "New feature available", message: "Dark mode is now supported across all pages.", icon: Info },
  { type: "success" as ToastType, title: "Welcome aboard!", message: "Your account has been created. Check your email.", icon: UserPlus },
  { type: "info" as ToastType, title: "New message", message: "Sarah sent you a message in #design-team.", icon: MessageSquare },
  { type: "success" as ToastType, title: "Added to cart", message: "Wireless Headphones Pro added to your cart.", icon: ShoppingCart },
  { type: "info" as ToastType, title: "New like", message: "Your post received 50+ likes in the last hour.", icon: Heart },
];

export function ToastSystem() {
  const [isDark, setIsDark] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");

  const bg = isDark ? "#0a0a0f" : "#f8fafc";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const toastBg = isDark ? "#14141c" : "#ffffff";
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const accent = "#6366f1";

  const addToast = useCallback((preset: typeof PRESETS[0]) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...preset, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4 flex-col",
    "top-left": "top-4 left-4 flex-col",
    "bottom-right": "bottom-4 right-4 flex-col-reverse",
    "bottom-left": "bottom-4 left-4 flex-col-reverse",
    "top-center": "top-4 left-1/2 -translate-x-1/2 flex-col",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
  };

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }}>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 px-6" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
            <Bell className="h-4 w-4" style={{ color: accent }} />
          </div>
          <div>
            <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Toast Notifications</h1>
            <p className="text-[10px]" style={{ color: textMuted }}>Click any preset to trigger a toast</p>
          </div>
          <div className="flex-1" />

          {/* Position selector */}
          <div className="flex items-center gap-1 rounded-lg p-0.5" style={{ background: inputBg }}>
            {(["top-right", "bottom-right", "top-left", "bottom-left", "top-center", "bottom-center"] as ToastPosition[]).map(pos => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className="rounded-md px-2 py-1 text-[9px] font-medium transition"
                style={{
                  background: position === pos ? accent : "transparent",
                  color: position === pos ? "#fff" : textMuted,
                }}
              >
                {pos.split("-").map(w => w[0]).join("")}
              </button>
            ))}
          </div>

          <div className="h-5 w-px" style={{ background: border }} />
          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {/* Preset buttons grid */}
        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Toast Types</p>
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(["success", "error", "warning", "info"] as ToastType[]).map(type => {
              const style = TOAST_STYLES[type];
              const Icon = style.icon;
              const preset = PRESETS.find(p => p.type === type)!;
              return (
                <button
                  key={type}
                  onClick={() => addToast(preset)}
                  className="flex flex-col items-center gap-2 rounded-xl border p-4 transition hover:scale-105"
                  style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: style.bg }}>
                    <Icon className="h-5 w-5" style={{ color: style.color }} />
                  </div>
                  <span className="text-[12px] font-semibold capitalize" style={{ color: textPrimary }}>{type}</span>
                </button>
              );
            })}
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Common Scenarios</p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {PRESETS.slice(4).map((preset, i) => {
              const style = TOAST_STYLES[preset.type];
              const Icon = preset.icon!;
              return (
                <button
                  key={i}
                  onClick={() => addToast(preset)}
                  className="flex items-center gap-3 rounded-xl border p-3 text-left transition hover:scale-[1.02]"
                  style={{ borderColor: border, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: style.bg }}>
                    <Icon className="h-4 w-4" style={{ color: style.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>{preset.title}</p>
                    <p className="truncate text-[10px]" style={{ color: textMuted }}>{preset.message}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <div className={`pointer-events-none absolute z-50 flex gap-2 ${positionClasses[position]}`}>
        <AnimatePresence>
          {toasts.map(toast => {
            const style = TOAST_STYLES[toast.type];
            const Icon = toast.icon || style.icon;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, scale: 0.9, x: position.includes("right") ? 100 : position.includes("left") ? -100 : 0, y: position.includes("top") ? -20 : position.includes("bottom") ? 20 : 0 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: position.includes("right") ? 100 : position.includes("left") ? -100 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="pointer-events-auto flex w-80 items-start gap-3 rounded-xl border p-3 shadow-2xl"
                style={{ background: toastBg, borderColor: border }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: style.bg }}>
                  <Icon className="h-4 w-4" style={{ color: style.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: textPrimary }}>{toast.title}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: textSecondary }}>{toast.message}</p>
                  {/* Progress bar */}
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="mt-2 h-0.5 rounded-full"
                    style={{ background: style.color }}
                  />
                </div>
                <button onClick={() => removeToast(toast.id)} className="flex h-6 w-6 shrink-0 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
