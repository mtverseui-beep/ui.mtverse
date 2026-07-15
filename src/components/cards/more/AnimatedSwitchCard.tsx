"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Bluetooth,
  BluetoothOff,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// AnimatedSwitchCard — premium settings panel with animated toggle switches.
// Each switch has icon rotation, spring thumb slide, and color-coded active
// states. Clean glassmorphism container with soft shadows. Theme-aware via
// cs-* tokens.

interface SwitchConfig {
  label: string;
  description: string;
  onIcon: React.ComponentType<{ size?: number; className?: string }>;
  offIcon: React.ComponentType<{ size?: number; className?: string }>;
  activeColor: string;
  activeGlow: string;
  defaultState?: boolean;
}

const SWITCHES: SwitchConfig[] = [
  {
    label: "Dark Mode",
    description: "Switch between light and dark themes",
    onIcon: Moon,
    offIcon: Sun,
    activeColor: "bg-slate-800 dark:bg-slate-200",
    activeGlow: "rgba(148, 163, 184, 0.4)",
    defaultState: false,
  },
  {
    label: "Notifications",
    description: "Receive push notifications",
    onIcon: Bell,
    offIcon: BellOff,
    activeColor: "bg-blue-500",
    activeGlow: "rgba(59, 130, 246, 0.4)",
    defaultState: true,
  },
  {
    label: "Wi-Fi",
    description: "Connect to wireless networks",
    onIcon: Wifi,
    offIcon: WifiOff,
    activeColor: "bg-emerald-500",
    activeGlow: "rgba(16, 185, 129, 0.4)",
    defaultState: true,
  },
  {
    label: "Sound",
    description: "System sounds and alerts",
    onIcon: Volume2,
    offIcon: VolumeX,
    activeColor: "bg-orange-500",
    activeGlow: "rgba(249, 115, 22, 0.4)",
    defaultState: false,
  },
  {
    label: "Bluetooth",
    description: "Connect to nearby devices",
    onIcon: Bluetooth,
    offIcon: BluetoothOff,
    activeColor: "bg-indigo-500",
    activeGlow: "rgba(99, 102, 241, 0.4)",
    defaultState: false,
  },
];

export function AnimatedSwitchCard() {
  return (
    <motion.div
      className="w-[clamp(300px,92vw,400px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 55%), radial-gradient(circle at 70% 80%, rgba(14,165,233,0.08), transparent 60%)",
        }}
      />

      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="border-b cs-border px-6 py-5 text-center">
          <h2 className="text-[18px] font-bold tracking-tight cs-text">Settings</h2>
          <p className="mt-1 text-[12.5px] cs-muted">Customize your preferences</p>
        </div>

        {/* Switches */}
        <div className="space-y-5 p-6">
          {SWITCHES.map((config, i) => (
            <motion.div
              key={config.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06, ease: EASE }}
            >
              <AnimatedSwitch {...config} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t cs-border px-6 py-3 text-center">
          <p className="text-[10.5px] cs-subtle">Changes are saved automatically</p>
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
  defaultState = false,
}: SwitchConfig) {
  const [isOn, setIsOn] = useState(defaultState);

  return (
    <div className="group flex items-center justify-between">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3">
          {/* Icon with rotation animation */}
          <div className="relative flex h-5 w-5 items-center justify-center">
            <AnimatePresence mode="wait">
              {isOn ? (
                <motion.div
                  key="on"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <OnIcon size={18} className="cs-text" />
                </motion.div>
              ) : (
                <motion.div
                  key="off"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <OffIcon size={18} className="cs-subtle" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <h3 className="text-[13.5px] font-medium cs-text">{label}</h3>
        </div>
        <p className="ml-8 text-[11.5px] cs-muted">{description}</p>
      </div>

      {/* Toggle switch */}
      <motion.button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400/40 ${
          isOn ? `${activeColor} shadow-sm` : "cs-input hover:opacity-80"
        }`}
        style={isOn ? { boxShadow: `0 4px 14px ${activeGlow}` } : undefined}
        onClick={() => setIsOn(!isOn)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
          animate={{ x: isOn ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            animate={{ scale: isOn ? 1 : 0.8, opacity: isOn ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isOn ? (
                <motion.div
                  key="switch-on"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <OnIcon size={12} className="text-slate-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="switch-off"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <OffIcon size={12} className="text-slate-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.button>
    </div>
  );
}
