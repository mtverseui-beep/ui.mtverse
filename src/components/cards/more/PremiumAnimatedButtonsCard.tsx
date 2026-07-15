"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, Trash2, Upload } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// PremiumAnimatedButtonsCard — a showcase of premium animated buttons with
// professional color schemes. Each button has a left-to-right color wipe
// animation, shine sweep, arrow rotation, and text shift on click.
// Colors are professional: slate, blue, emerald, amber, rose — no bright
// purple/pink gradients. Theme-aware via cs-* tokens.

export function PremiumAnimatedButtonsCard() {
  return (
    <motion.div
      className="w-[clamp(320px,95vw,520px)] select-none"
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
            "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08), transparent 55%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />

      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="border-b cs-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold tracking-tight cs-text">Premium Animated Buttons</h2>
              <p className="text-[11px] cs-muted">Click to see the color wipe animation</p>
            </div>
          </div>
        </div>

        {/* Button groups */}
        <div className="space-y-6 p-6">
          {/* Primary — professional slate → blue */}
          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider cs-subtle">Primary Actions</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                primaryColor="bg-slate-900"
                secondaryColor="bg-blue-600"
                textColor="text-white"
                activeTextColor="text-white"
                size="sm"
                icon={<Upload className="h-3.5 w-3.5" strokeWidth={2.2} />}
              >
                Upload
              </AnimatedButton>
              <AnimatedButton
                primaryColor="bg-slate-900"
                secondaryColor="bg-blue-600"
                textColor="text-white"
                size="md"
                icon={<Download className="h-4 w-4" strokeWidth={2.2} />}
              >
                Download
              </AnimatedButton>
              <AnimatedButton
                primaryColor="bg-slate-900"
                secondaryColor="bg-blue-600"
                textColor="text-white"
                size="lg"
              >
                Get Started
              </AnimatedButton>
            </div>
          </div>

          {/* Success — emerald */}
          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider cs-subtle">Success Actions</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                primaryColor="bg-emerald-600"
                secondaryColor="bg-emerald-500"
                textColor="text-white"
                activeTextColor="text-white"
                size="md"
                icon={<Check className="h-4 w-4" strokeWidth={2.4} />}
              >
                Confirm
              </AnimatedButton>
              <AnimatedButton
                primaryColor="bg-emerald-600"
                secondaryColor="bg-teal-500"
                textColor="text-white"
                size="md"
              >
                Save Changes
              </AnimatedButton>
            </div>
          </div>

          {/* Danger — rose */}
          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider cs-subtle">Destructive Actions</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                primaryColor="bg-rose-600"
                secondaryColor="bg-rose-500"
                textColor="text-white"
                activeTextColor="text-white"
                size="md"
                icon={<Trash2 className="h-4 w-4" strokeWidth={2.2} />}
              >
                Delete
              </AnimatedButton>
              <AnimatedButton
                primaryColor="bg-rose-600"
                secondaryColor="bg-red-500"
                textColor="text-white"
                size="md"
                arrowPosition="left"
              >
                Remove
              </AnimatedButton>
            </div>
          </div>

          {/* Outline / Ghost — theme-aware */}
          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider cs-subtle">Outline Variants</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                variant="outline"
                size="md"
                primaryColor="cs-surface"
                secondaryColor="bg-slate-100 dark:bg-white/10"
                textColor="cs-text"
                activeTextColor="cs-text"
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="md"
                primaryColor="cs-surface"
                secondaryColor="bg-blue-50 dark:bg-blue-500/10"
                textColor="text-blue-600 dark:text-blue-400"
                activeTextColor="text-blue-700 dark:text-blue-300"
                showArrow={false}
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>

          {/* Animation speed */}
          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider cs-subtle">Animation Speed</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton
                primaryColor="bg-slate-900"
                secondaryColor="bg-blue-600"
                textColor="text-white"
                size="md"
                animationDuration={0.3}
              >
                Fast (0.3s)
              </AnimatedButton>
              <AnimatedButton
                primaryColor="bg-slate-900"
                secondaryColor="bg-blue-600"
                textColor="text-white"
                size="md"
                animationDuration={1.2}
              >
                Slow (1.2s)
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t cs-border px-6 py-2.5 text-center">
          <p className="text-[10px] cs-subtle">Color wipe · shine sweep · arrow rotation · text shift</p>
        </div>
      </div>
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  arrowPosition?: "left" | "right";
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  activeTextColor?: string;
  animationDuration?: number;
  icon?: React.ReactNode;
  className?: string;
}

function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  showArrow = true,
  arrowPosition = "right",
  primaryColor = "bg-slate-900",
  secondaryColor = "bg-blue-600",
  textColor = "text-white",
  activeTextColor = "text-white",
  animationDuration = 0.6,
  icon,
  className = "",
}: AnimatedButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), animationDuration * 1000);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-[12.5px]",
    md: "px-5 py-2.5 text-[13px]",
    lg: "px-7 py-3 text-[14px]",
  };

  const variantClasses = {
    primary: `${primaryColor} ${textColor} border-transparent`,
    outline: `border cs-border ${primaryColor} ${textColor}`,
  };

  return (
    <motion.button
      type="button"
      className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background color wipe — slides in from left on click */}
      <motion.div
        className={`absolute inset-0 z-0 ${secondaryColor}`}
        initial={{ x: "-100%" }}
        animate={{ x: isAnimating ? "0%" : "-100%" }}
        transition={{ duration: animationDuration, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 flex items-center gap-2"
        animate={{ color: isAnimating ? activeTextColor : textColor }}
        transition={{ duration: animationDuration * 0.3, delay: animationDuration * 0.2 }}
      >
        {/* Left arrow or icon */}
        {showArrow && arrowPosition === "left" && !icon && (
          <motion.div
            animate={{ x: isAnimating ? 4 : 0, rotate: isAnimating ? 360 : 0 }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={2.2} />
          </motion.div>
        )}

        {/* Icon (if provided) */}
        {icon && (
          <motion.div
            animate={{ x: isAnimating ? 2 : 0 }}
            transition={{ duration: animationDuration * 0.5, ease: "easeOut" }}
          >
            {icon}
          </motion.div>
        )}

        {/* Label */}
        <motion.span
          animate={{ x: isAnimating ? (arrowPosition === "right" ? -2 : 2) : 0 }}
          transition={{ duration: animationDuration * 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.span>

        {/* Right arrow */}
        {showArrow && arrowPosition === "right" && !icon && (
          <motion.div
            animate={{ x: isAnimating ? 4 : 0, rotate: isAnimating ? 360 : 0 }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </motion.div>
        )}
      </motion.div>

      {/* Shine sweep — travels left to right on click */}
      <motion.div
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isAnimating ? "200%" : "-100%" }}
        transition={{ duration: animationDuration * 0.8, delay: animationDuration * 0.1, ease: "easeOut" }}
      />
    </motion.button>
  );
}
