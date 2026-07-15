"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar001 — Production-ready marketing navbar
// ════════════════════════════════════════════════════════════════════════════
// A fully responsive marketing navbar with:
//   • Desktop (≥768px): full nav links + theme toggle + sign in + CTA
//   • Mobile  (<768px): logo + theme toggle + hamburger → fullscreen drawer
//   • Scroll-aware morph: transparent full-bleed bar → floating glass pill
//   • Animated underline on nav links (active + hover)
//   • Mobile drawer with staggered link reveal + body scroll lock
//   • Escape key closes drawer, focus returns to hamburger
//   • Outside click closes drawer
//   • Full ARIA support (aria-expanded, aria-controls, aria-label, role)
//
// BREAKPOINTS use Tailwind's `md:` (768px). Override via the `md` value in
// your tailwind config if you need a different breakpoint.
//
// PROPS:
//   scrollContainerRef — optional ref to the scrollable element that drives
//   the scroll-aware morph. If omitted, falls back to window scroll. This
//   makes the component work both inside a scroll-sandbox (showcase) and on
//   a real page (window scroll).
// ════════════════════════════════════════════════════════════════════════════

const PRIMARY_NAV = [
  { name: "Features", href: "#features" },
  { name: "Web Vitals", href: "#web-vitals" },
  { name: "Developers", href: "#developers" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "#docs" },
];

interface Navbar001CardProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

export function Navbar001Card({ scrollContainerRef }: Navbar001CardProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>("Features");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const tickingRef = useRef(false);
  const lastScrolledRef = useRef(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // ── Mount flag (avoids hydration mismatch with next-themes) ──
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // ── Scroll-aware morph ──
  // Listens to either the provided scroll container or the window.
  // rAF-throttled + passive. Only updates state when the boolean flips to
  // avoid needless re-renders.
  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const should = el ? el.scrollTop > 20 : window.scrollY > 20;
        if (should !== lastScrolledRef.current) {
          lastScrolledRef.current = should;
          setIsScrolled(should);
        }
        tickingRef.current = false;
      });
    };
    const target: Element | Window = el ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  // ── Lock body scroll while the mobile drawer is open ──
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  // ── Focus management: when drawer opens, focus first link; on close, return to hamburger ──
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Slight delay so the transition + stagger can start before we yank focus
      const t = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 120);
      return () => clearTimeout(t);
    } else {
      // Returning focus to the hamburger button on close
      hamburgerRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // ── Escape key closes drawer ──
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  // ── Outside-click closes drawer ──
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onPointer = (e: MouseEvent) => {
      const drawer = drawerRef.current;
      const hamburger = hamburgerRef.current;
      if (!drawer) return;
      // If the click is inside the drawer or on the hamburger, ignore.
      if (drawer.contains(e.target as Node)) return;
      if (hamburger?.contains(e.target as Node)) return;
      setIsMobileMenuOpen(false);
    };
    // Use mousedown so we catch the click before any link inside the drawer
    // navigates (prevents accidental close-then-navigate race).
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
      e.preventDefault();
      setActiveRoute(name);
      setIsMobileMenuOpen(false);
      // In a real app you'd route here. The href is preserved for
      // middle-click / right-click / SEO.
    },
    [],
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((v) => !v);
  }, []);

  const drawerId = "navbar001-mobile-drawer";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4 px-4" : "py-0 px-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          <Logo scrolled={isScrolled} onClick={(e) => e.preventDefault()} />

          {/* ── Desktop nav (≥768px) ── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {PRIMARY_NAV.map((link) => {
              const isActive = activeRoute === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm transition-colors duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* ── Desktop actions (≥768px) ── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle scrolled={isScrolled} mounted={isMounted} />
            <a
              href="#sign-in"
              onClick={(e) => e.preventDefault()}
              className={`text-foreground/70 hover:text-foreground transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-sm ${
                isScrolled ? "text-xs" : "text-sm"
              }`}
            >
              Sign in
            </a>
            <a
              href="#start"
              onClick={(e) => e.preventDefault()}
              className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isScrolled ? "px-4 h-8 text-xs" : "px-6 h-10 text-sm"
              } inline-flex items-center justify-center`}
            >
              Start monitoring
            </a>
          </div>

          {/* ── Mobile actions (<768px) ── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle mounted={isMounted} />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 -mr-2 text-foreground rounded-md transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls={drawerId}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════
          Mobile drawer (<768px)
          ────────────────────────────────────────────────────────────────
          Fullscreen overlay with staggered link reveal. position:fixed
          inset:0 so it covers the viewport. When rendered inside a
          container with `contain: paint` or `transform`, it's scoped to
          that container instead of the browser window.
          ════════════════════════════════════════════════════════════════ */}
      <div
        id={drawerId}
        ref={drawerRef}
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {PRIMARY_NAV.map((link, i) => (
              <a
                key={link.name}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.name)}
                aria-current={activeRoute === link.name ? "page" : undefined}
                className={`text-5xl font-bold tracking-tight text-foreground hover:text-muted-foreground transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-sm ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <a
              href="#sign-in"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 rounded-full h-14 text-base inline-flex items-center justify-center border border-foreground/20 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              Sign in
            </a>
            <a
              href="#start"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start monitoring
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Logo — PagePulse wordmark + waveform glyph
// ════════════════════════════════════════════════════════════════════════════
function Logo({
  scrolled,
  onClick,
}: {
  scrolled: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href="#"
      onClick={onClick}
      className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-sm"
      aria-label="PagePulse home"
    >
      <svg
        viewBox="0 0 64 64"
        className={`transition-all duration-500 ${
          scrolled ? "w-7 h-7" : "w-8 h-8"
        }`}
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="12" fill="currentColor" />
        <path
          d="M8 40 L18 28 L26 36 L34 18 L46 32 L56 22"
          fill="none"
          stroke="var(--background)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="56" cy="22" r="3.5" fill="var(--background)" />
      </svg>
      <span
        className={`font-bold tracking-tight transition-all duration-500 ${
          scrolled ? "text-xl" : "text-2xl"
        }`}
      >
        PagePulse
      </span>
      <span
        className={`text-muted-foreground font-mono transition-all duration-500 ${
          scrolled ? "text-[10px] mt-0.5" : "text-xs mt-1"
        }`}
      >
        TM
      </span>
    </a>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ThemeToggle — wired to next-themes (light/dark)
// ════════════════════════════════════════════════════════════════════════════
function ThemeToggle({
  scrolled,
  mounted,
}: {
  scrolled?: boolean;
  mounted: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex items-center justify-center rounded-full border border-foreground/15 ${
          scrolled ? "w-8 h-8" : "w-9 h-9"
        }`}
      >
        <Sun className={`${scrolled ? "w-3.5 h-3.5" : "w-4 h-4"} opacity-50`} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex items-center justify-center rounded-full border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/5 transition-colors text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
        scrolled ? "w-8 h-8" : "w-9 h-9"
      }`}
    >
      {isDark ? (
        <Sun className={scrolled ? "w-3.5 h-3.5" : "w-4 h-4"} />
      ) : (
        <Moon className={scrolled ? "w-3.5 h-3.5" : "w-4 h-4"} />
      )}
    </button>
  );
}
