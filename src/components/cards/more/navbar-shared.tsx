"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, CreditCard, LogOut, ChevronDown, Bell, Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// navbar-shared.tsx — Shared hooks + reusable ProfileDropdown + NotificationDropdown
// ════════════════════════════════════════════════════════════════════════════

export function findScrollParent(el: Element | null): Element | null {
  if (!el) return null;
  let node: Element | null = el;
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
}

export function useScrolled(threshold = 20, dataAttr?: string): boolean {
  const [scrolled, setScrolled] = useState(false);
  const scrollParentRef = useRef<Element | null>(null);
  useEffect(() => {
    function onScroll() { const el = scrollParentRef.current; if (!el) return; setScrolled(el.scrollTop > threshold); }
    let attempts = 0;
    const tryFind = () => {
      const el = findScrollParent(dataAttr ? document.querySelector(`[data-${dataAttr}]`) : document.querySelector("[data-navbar-root]"));
      if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }
      else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); }
    };
    tryFind();
    return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); };
  }, [threshold, dataAttr]);
  return scrolled;
}

export function useDismissable(isOpen: boolean, onClose: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [isOpen, onClose, ref]);
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

// ── ProfileDropdown ──
interface ProfileDropdownProps {
  dark?: boolean;
  initials?: string;
  align?: "left" | "right";
  accent?: string;
  name?: string;
  email?: string;
}

export function ProfileDropdown({
  dark = false, initials = "SC", align = "right", accent = "#0f172a",
  name = "Sarah Chen", email = "sarah@example.com",
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismissable(open, () => setOpen(false), ref);

  const bg = dark ? "#1c2128" : "#ffffff";
  const border = dark ? "#30363d" : "#e2e8f0";
  const text = dark ? "#c9d1d9" : "#334155";
  const textHover = dark ? "#ffffff" : "#0f172a";
  const hoverBg = dark ? "#21262d" : "#f8fafc";
  const subText = dark ? "#8b949e" : "#94a3b8";

  const menuItems = [
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
    { icon: CreditCard, label: "Billing" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 p-0.5 rounded-full transition-opacity hover:opacity-80"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>{initials}</div>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: subText }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 w-60 rounded-xl border shadow-xl py-1.5 overflow-hidden z-50"
            style={{ background: bg, borderColor: border, [align === "right" ? "right" : "left"]: 0 } as React.CSSProperties}
          >
            <div className="px-3 py-2.5 border-b" style={{ borderColor: border }}>
              <p className="text-sm font-semibold" style={{ color: textHover }}>{name}</p>
              <p className="text-xs truncate" style={{ color: subText }}>{email}</p>
            </div>
            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left"
                  style={{ color: text }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = textHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = text; }}
                >
                  <item.icon className="w-4 h-4" style={{ color: subText }} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t" style={{ borderColor: border }}>
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left"
                style={{ color: "#ef4444" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── NotificationDropdown ──
interface NotificationDropdownProps {
  dark?: boolean;
  align?: "left" | "right";
  accent?: string;
  count?: number;
}

const DEFAULT_NOTIFS = [
  { title: "New comment on your post", time: "2m ago", unread: true },
  { title: "Sarah shared a document with you", time: "1h ago", unread: true },
  { title: "Your subscription renews tomorrow", time: "3h ago", unread: true },
  { title: "Weekly digest is ready to read", time: "1d ago", unread: false },
];

export function NotificationDropdown({ dark = false, align = "right", accent = "#0f172a", count = 3 }: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismissable(open, () => setOpen(false), ref);

  const bg = dark ? "#1c2128" : "#ffffff";
  const border = dark ? "#30363d" : "#e2e8f0";
  const text = dark ? "#c9d1d9" : "#334155";
  const textHover = dark ? "#ffffff" : "#0f172a";
  const hoverBg = dark ? "#21262d" : "#f8fafc";
  const subText = dark ? "#8b949e" : "#94a3b8";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg transition-colors"
        style={{ color: subText }}
        onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = textHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = subText; }}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="w-[18px] h-[18px]" />
        {count > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ background: "#ef4444", boxShadow: "0 0 0 2px " + bg }}>{count}</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 w-80 rounded-xl border shadow-xl overflow-hidden z-50"
            style={{ background: bg, borderColor: border, [align === "right" ? "right" : "left"]: 0 } as React.CSSProperties}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: border }}>
              <span className="text-sm font-semibold" style={{ color: textHover }}>Notifications</span>
              <button className="text-xs font-medium" style={{ color: accent }}>Mark all read</button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {DEFAULT_NOTIFS.map((n, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(false)}
                  className="w-full flex gap-3 px-4 py-3 text-left transition-colors border-b last:border-0"
                  style={{ borderColor: dark ? "#21262d" : "#f1f5f9" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.unread ? accent : "transparent", border: n.unread ? "none" : `1px solid ${subText}` }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm" style={{ color: n.unread ? textHover : text }}>{n.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: subText }}>{n.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium border-t transition-colors"
              style={{ color: accent, borderColor: border }}
              onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              View all notifications
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
