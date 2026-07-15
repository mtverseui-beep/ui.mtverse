"use client";

import {
  type ComponentType,
  type SVGProps,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export interface AIPalette {
  background: string;
  panel: string;
  surface: string;
  elevated: string;
  border: string;
  text: string;
  secondary: string;
  muted: string;
}

export interface ModernSelectOption {
  value: string;
  label: string;
  meta?: string;
  color?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

interface ModernSelectProps {
  value: string;
  options: ModernSelectOption[];
  onChange: (value: string) => void;
  palette: AIPalette;
  accent: string;
  label?: string;
  compact?: boolean;
  align?: "left" | "right";
  className?: string;
}

export const AI_FOCUS_RESET =
  "outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0";

export function usePreviewTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isDark, setIsDark };
}

export function getAIPalette(isDark: boolean): AIPalette {
  return {
    background: isDark ? "#09090b" : "#ffffff",
    panel: isDark ? "#0f0f13" : "#fafafa",
    surface: isDark ? "#17171c" : "#f4f4f5",
    elevated: isDark ? "#1d1d23" : "#ffffff",
    border: isDark ? "#2a2a31" : "#e4e4e7",
    text: isDark ? "#fafafa" : "#18181b",
    secondary: isDark ? "#b4b4bc" : "#52525b",
    muted: isDark ? "#777780" : "#9a9aa3",
  };
}

export function ProfileAvatar({
  name = "Aarav Kumar",
  size = "md",
  showStatus = true,
}: {
  name?: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}) {
  const dimensions =
    size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <span
      className={"relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-full border-2 border-white bg-[#f2d0b5] shadow-sm dark:border-[#18181b] " + dimensions}
      title={name}
      aria-label={name + " profile"}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full rounded-full" aria-hidden="true">
        <rect width="40" height="40" rx="20" fill="#F1C7A5" />
        <path d="M5 40c1.8-8.1 7.2-12.2 15-12.2S33.2 31.9 35 40" fill="#4C3D36" />
        <path d="M11.2 17.4c0-7 3.5-11 9.2-11 5.4 0 8.7 4.1 8.4 10.7-.3 7.7-3.4 12-8.8 12-5.5 0-8.8-4.2-8.8-11.7Z" fill="#D9966D" />
        <path d="M10.3 17.7c-.5-8.1 3.8-13 10.8-13 6.3 0 9.4 4.7 8.4 11.8-1.5-1.3-2.7-3.6-3-5.8-3 2.9-7.9 4.2-14.7 3.8l-1.5 3.2Z" fill="#29211D" />
        <circle cx="16.4" cy="18.3" r="1" fill="#29211D" />
        <circle cx="24.3" cy="18.3" r="1" fill="#29211D" />
        <path d="M17.5 23.2c1.7 1.3 3.8 1.3 5.5 0" fill="none" stroke="#7A3E32" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M15.2 28.5c2.8 2.3 6.6 2.3 9.6 0l1.1 2.2c-3.5 2.5-8.3 2.5-11.8 0l1.1-2.2Z" fill="#F5F5F4" />
      </svg>
      {showStatus && (
        <span className="absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#18181b]" />
      )}
    </span>
  );
}

export function ModernSelect({
  value,
  options,
  onChange,
  palette,
  accent,
  label,
  compact = false,
  align = "left",
  className = "",
}: ModernSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];
  const SelectedIcon = selected?.Icon;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {label && (
        <span
          className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{ color: palette.muted }}
        >
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center rounded-xl border text-left transition ${AI_FOCUS_RESET} ${compact ? "gap-2 px-2.5 py-2" : "gap-3 px-3 py-2.5"}`}
        style={{
          color: palette.text,
          background: palette.elevated,
          borderColor: open ? `${accent}80` : palette.border,
          boxShadow: open ? `0 0 0 3px ${accent}12` : "none",
        }}
        aria-expanded={open}
        aria-controls={menuId}
      >
        {SelectedIcon && (
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${selected.color ?? accent}16` }}
          >
            <SelectedIcon
              className="h-4 w-4"
              style={{ color: selected.color ?? accent }}
            />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[10.5px] font-semibold">
            {selected?.label ?? "Select"}
          </span>
          {!compact && selected?.meta && (
            <span
              className="mt-0.5 block truncate text-[8.5px]"
              style={{ color: palette.muted }}
            >
              {selected.meta}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition ${open ? "rotate-180" : ""}`}
          style={{ color: palette.muted }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className={`absolute z-[80] mt-1.5 min-w-full overflow-hidden rounded-xl border p-1.5 shadow-2xl ${align === "right" ? "right-0" : "left-0"}`}
            style={{
              width: "max-content",
              maxWidth: "min(290px, calc(100vw - 32px))",
              background: palette.elevated,
              borderColor: palette.border,
            }}
          >
            {options.map((option) => {
              const OptionIcon = option.Icon;
              const active = option.value === value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${AI_FOCUS_RESET}`}
                  style={{
                    color: palette.text,
                    background: active ? `${option.color ?? accent}12` : "transparent",
                  }}
                >
                  {OptionIcon && (
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${option.color ?? accent}16` }}
                    >
                      <OptionIcon
                        className="h-4 w-4"
                        style={{ color: option.color ?? accent }}
                      />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10.5px] font-semibold">
                      {option.label}
                    </span>
                    {option.meta && (
                      <span
                        className="block truncate text-[8.5px]"
                        style={{ color: palette.muted }}
                      >
                        {option.meta}
                      </span>
                    )}
                  </span>
                  {active && <Check className="h-3.5 w-3.5" style={{ color: option.color ?? accent }} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
