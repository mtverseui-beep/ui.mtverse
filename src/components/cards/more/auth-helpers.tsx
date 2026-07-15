"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// auth-helpers.tsx — Shared auth primitives for Auth002-021
// ════════════════════════════════════════════════════════════════════════════

// ── Password input with show/hide toggle ──
export function PasswordInput({
  value = "",
  onChange,
  placeholder = "Enter password",
  className = "",
  style,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative ${className}`} style={style}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10"
        style={{ outline: "none" }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 transition-opacity"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

// ── Social button row (Google, GitHub, Apple) ──
export function SocialButtons({
  variant = "light",
  onGoogle,
  onGithub,
  onApple,
}: {
  variant?: "light" | "dark";
  onGoogle?: () => void;
  onGithub?: () => void;
  onApple?: () => void;
}) {
  const border = variant === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const hoverBg = variant === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const btnStyle: React.CSSProperties = {
    border: `1px solid ${border}`,
    background: "transparent",
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={onGoogle}
        style={btnStyle}
        className="flex items-center justify-center rounded-lg py-2.5 transition-colors hover:bg-[var(--hover)]"
        aria-label="Sign in with Google"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </button>
      <button
        onClick={onGithub}
        style={btnStyle}
        className="flex items-center justify-center rounded-lg py-2.5 transition-colors hover:bg-[var(--hover)]"
        aria-label="Sign in with GitHub"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: variant === "dark" ? "#fff" : "#181717" }}>
          <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 22 12.3C22 6.6 17.5 2 12 2z" />
        </svg>
      </button>
      <button
        onClick={onApple}
        style={btnStyle}
        className="flex items-center justify-center rounded-lg py-2.5 transition-colors hover:bg-[var(--hover)]"
        aria-label="Sign in with Apple"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: variant === "dark" ? "#fff" : "#181717" }}>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      </button>
    </div>
  );
}

// ── Divider with "or" text ──
export function OrDivider({ variant = "light" }: { variant?: "light" | "dark" }) {
  const color = variant === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const textColor = variant === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: color }} />
      <span className="text-xs" style={{ color: textColor }}>or continue with email</span>
      <div className="h-px flex-1" style={{ background: color }} />
    </div>
  );
}
