"use client";

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";

// ════════════════════════════════════════════════════════════════════════════
// navbar-helpers.tsx — Shared navbar primitives
// ════════════════════════════════════════════════════════════════════════════

// ── useScrollAware: tracks scroll position of provided container or window ──
export function useScrollAware(threshold = 20, scrollContainerRef?: React.RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const tickingRef = useRef(false);
  const lastTopRef = useRef(0);
  const lastScrolledRef = useRef(false);
  const lastHiddenRef = useRef(false);

  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const top = el ? el.scrollTop : window.scrollY;
        const max = el ? el.scrollHeight - el.clientHeight : document.body.scrollHeight - window.innerHeight;
        const should = top > threshold;
        if (should !== lastScrolledRef.current) {
          lastScrolledRef.current = should;
          setScrolled(should);
        }
        if (max > 0) {
          const p = Math.min(1, Math.max(0, top / max));
          setProgress(p);
        }
        // Hide on scroll down, reveal on scroll up (only after threshold)
        if (top > threshold + 40) {
          const isDown = top > lastTopRef.current;
          if (isDown !== lastHiddenRef.current) {
            lastHiddenRef.current = isDown;
            setHidden(isDown);
          }
        } else {
          if (lastHiddenRef.current) {
            lastHiddenRef.current = false;
            setHidden(false);
          }
        }
        lastTopRef.current = top;
        tickingRef.current = false;
      });
    };
    const target: Element | Window = el ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [threshold, scrollContainerRef]);

  return { scrolled, progress, hidden };
}

// ── useDismissable: outside-click + escape to close ──
export function useDismissable(open: boolean, onClose: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, ref]);
}

// ── UnsplashAvatar: real photo avatar with deterministic seed ──
export function UnsplashAvatar({ seed, alt, size = 32, className = "" }: { seed: string; alt: string; size?: number; className?: string }) {
  return (
     
    <img
      src={`https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${size * 2}&h=${size * 2}&q=80`}
      alt={alt}
      width={size}
      height={size}
      className={`object-cover ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}

// ── useMediaQuery: reactive media query hook (avoid hydration mismatch) ──
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onStoreChange);
    return () => mql.removeEventListener("change", onStoreChange);
  }, [query]);

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
