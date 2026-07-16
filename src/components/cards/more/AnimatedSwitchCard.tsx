"use client";

import type React from "react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Bell,
  BellOff,
  Bluetooth,
  BluetoothOff,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const emptySubscribe = () => () => {};

export type AnimatedSwitchPreference = "notifications" | "wifi" | "sound" | "bluetooth";
export type AnimatedSwitchValues = Record<AnimatedSwitchPreference, boolean>;

export interface AnimatedSwitchCardProps {
  darkMode?: boolean;
  values?: Partial<AnimatedSwitchValues>;
  defaultValues?: Partial<AnimatedSwitchValues>;
  onDarkModeChange?: (enabled: boolean) => void;
  onValueChange?: (preference: AnimatedSwitchPreference, enabled: boolean) => void;
}

interface SwitchConfig {
  id: "darkMode" | AnimatedSwitchPreference;
  label: string;
  description: string;
  onIcon: React.ComponentType<{ size?: number; className?: string }>;
  offIcon: React.ComponentType<{ size?: number; className?: string }>;
  activeColor: string;
  activeGlow: string;
}

const SWITCHES: SwitchConfig[] = [
  { id: "darkMode", label: "Dark Mode", description: "Switch between light and dark themes", onIcon: Moon, offIcon: Sun, activeColor: "bg-slate-800 dark:bg-slate-200", activeGlow: "rgba(148, 163, 184, 0.4)" },
  { id: "notifications", label: "Notifications", description: "Receive push notifications", onIcon: Bell, offIcon: BellOff, activeColor: "bg-blue-500", activeGlow: "rgba(59, 130, 246, 0.4)" },
  { id: "wifi", label: "Wi-Fi", description: "Connect to wireless networks", onIcon: Wifi, offIcon: WifiOff, activeColor: "bg-emerald-500", activeGlow: "rgba(16, 185, 129, 0.4)" },
  { id: "sound", label: "Sound", description: "System sounds and alerts", onIcon: Volume2, offIcon: VolumeX, activeColor: "bg-orange-500", activeGlow: "rgba(249, 115, 22, 0.4)" },
  { id: "bluetooth", label: "Bluetooth", description: "Connect to nearby devices", onIcon: Bluetooth, offIcon: BluetoothOff, activeColor: "bg-indigo-500", activeGlow: "rgba(99, 102, 241, 0.4)" },
];

const DEFAULT_VALUES: AnimatedSwitchValues = {
  notifications: true,
  wifi: true,
  sound: false,
  bluetooth: false,
};

export function AnimatedSwitchCard({
  darkMode,
  values,
  defaultValues,
  onDarkModeChange,
  onValueChange,
}: AnimatedSwitchCardProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const actualDarkMode = mounted && resolvedTheme === "dark";
  const [announcement, setAnnouncement] = useState("Preferences ready.");
  const [internalValues, setInternalValues] = useState<AnimatedSwitchValues>(() => ({
    ...DEFAULT_VALUES,
    ...defaultValues,
  }));

  useEffect(() => {
    if (mounted && darkMode !== undefined && darkMode !== actualDarkMode) {
      setTheme(darkMode ? "dark" : "light");
    }
  }, [actualDarkMode, darkMode, mounted, setTheme]);

  const updatePreference = (preference: AnimatedSwitchPreference, enabled: boolean) => {
    if (values?.[preference] === undefined) {
      setInternalValues((current) => ({ ...current, [preference]: enabled }));
    }
    const label = SWITCHES.find((item) => item.id === preference)?.label ?? preference;
    setAnnouncement(`${label} ${enabled ? "enabled" : "disabled"}.`);
    onValueChange?.(preference, enabled);
  };

  const updateDarkMode = (enabled: boolean) => {
    if (darkMode === undefined) setTheme(enabled ? "dark" : "light");
    setAnnouncement(`Dark mode ${enabled ? "enabled" : "disabled"}.`);
    onDarkModeChange?.(enabled);
  };

  const moveSwitchFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const switches = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="switch"]:not(:disabled)'));
    const currentIndex = switches.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex < 0 || switches.length === 0) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? switches.length - 1
        : (currentIndex + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + switches.length) % switches.length;
    switches[nextIndex]?.focus();
  };

  return (
    <motion.div
      className="relative w-[clamp(300px,92vw,400px)] select-none"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 55%), radial-gradient(circle at 70% 80%, rgba(14,165,233,0.08), transparent 60%)" }} />

      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-6 py-5 text-center">
          <h2 className="text-[18px] font-bold tracking-tight cs-text">Settings</h2>
          <p className="mt-1 text-[12.5px] cs-muted">Customize your preferences</p>
        </div>

        <div className="space-y-5 p-6" onKeyDown={moveSwitchFocus}>
          {SWITCHES.map((config, index) => {
            const isDarkMode = config.id === "darkMode";
            const isOn = isDarkMode
              ? darkMode ?? actualDarkMode
              : values?.[config.id] ?? internalValues[config.id];
            return (
              <motion.div
                key={config.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, delay: 0.1 + index * 0.06, ease: EASE }}
              >
                <AnimatedSwitch
                  {...config}
                  isOn={isOn}
                  disabled={isDarkMode && !mounted}
                  onChange={isDarkMode ? updateDarkMode : (enabled) => updatePreference(config.id as AnimatedSwitchPreference, enabled)}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="border-t cs-border px-6 py-3 text-center">
          <p aria-live="polite" aria-atomic="true" className="text-[10.5px] cs-subtle">{announcement}</p>
          <p className="mt-0.5 text-[9.5px] cs-subtle">Use arrow keys to move between switches.</p>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedSwitch({
  label,
  description,
  onIcon: OnIcon,
  offIcon: OffIcon,
  activeColor,
  activeGlow,
  isOn,
  disabled,
  onChange,
  shouldReduceMotion,
}: SwitchConfig & {
  isOn: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
  shouldReduceMotion: boolean;
}) {
  const descriptionId = useId();
  const iconMotion = shouldReduceMotion ? { duration: 0 } : { duration: 0.2 };

  return (
    <div className="group flex items-center justify-between">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3">
          <div aria-hidden className="relative flex h-5 w-5 items-center justify-center">
            <AnimatePresence mode="wait" initial={!shouldReduceMotion}>
              <motion.div
                key={isOn ? "on" : "off"}
                initial={shouldReduceMotion ? false : { scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={shouldReduceMotion ? undefined : { scale: 0, rotate: 180 }}
                transition={iconMotion}
              >
                {isOn ? <OnIcon size={18} className="cs-text" /> : <OffIcon size={18} className="cs-subtle" />}
              </motion.div>
            </AnimatePresence>
          </div>
          <h3 className="text-[13.5px] font-medium cs-text">{label}</h3>
        </div>
        <p id={descriptionId} className="ml-8 text-[11.5px] cs-muted">{description}</p>
      </div>

      <motion.button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        aria-describedby={descriptionId}
        disabled={disabled}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-wait disabled:opacity-60 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 ${isOn ? `${activeColor} shadow-sm` : "cs-input hover:opacity-80"}`}
        style={isOn ? { boxShadow: `0 4px 14px ${activeGlow}` } : undefined}
        onClick={() => onChange(!isOn)}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      >
        <motion.span
          aria-hidden
          className="absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
          animate={{ x: isOn ? 20 : 2 }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.span animate={{ scale: isOn ? 1 : 0.8, opacity: isOn ? 1 : 0.6 }} transition={iconMotion}>
            {isOn ? <OnIcon size={12} className="text-slate-700" /> : <OffIcon size={12} className="text-slate-400" />}
          </motion.span>
        </motion.span>
      </motion.button>
    </div>
  );
}
