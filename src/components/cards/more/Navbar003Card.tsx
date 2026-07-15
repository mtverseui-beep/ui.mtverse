"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Bell, Command, ArrowUpRight, Sparkle, Grid3x3, Settings, User, Zap } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Navbar003Card — Advanced premium navbar (unique design)
// ════════════════════════════════════════════════════════════════════════════
// Brand: "Vortex" — different from all other navbars
// Color: Violet/purple accent (#8b5cf6) — different from Navbar 001 (blue) and 002 (cyan)
// Design: Full-width bar with frosted glass, command palette trigger,
//   sliding active indicator, notification badge, avatar, mega menu with icons
//
// Unique features:
//   • Full-width frosted glass bar (not a pill)
//   • Animated sliding active indicator under nav links (LayoutGroup)
//   • Command palette trigger (⌘K) with glow
//   • Notification bell with red dot badge
//   • Avatar with online status ring
//   • Mega menu with icon grid (not list)
//   • Mobile: slide-in drawer from right (not fullscreen)

const ACCENT = "#8b5cf6";
const ACCENT_RGB = "139, 92, 246";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#" },
  { id: "products", label: "Products", href: "#", hasMega: true },
  { id: "solutions", label: "Solutions", href: "#" },
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "docs", label: "Docs", href: "#" },
];

const MEGA_ITEMS = [
  { label: "Analytics", desc: "Real-time data insights", icon: Grid3x3 },
  { label: "Automation", desc: "Workflow builder", icon: Zap },
  { label: "AI Assistant", desc: "Smart suggestions", icon: Sparkle },
  { label: "Settings", desc: "Configure workspace", icon: Settings },
  { label: "Team", desc: "Manage members", icon: User },
  { label: "Integrations", desc: "Connect tools", icon: ArrowUpRight },
];

export function Navbar003Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> } = {}) {
  const [activeNav, setActiveNav] = useState("home");
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll-aware — driven by the preview scroll container (or window).
  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const target: Element | Window = el ?? window;
    const onScroll = () => setIsScrolled((el ? el.scrollTop : window.scrollY) > 20);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Escape closes everything
  useEffect(() => {
    if (!megaOpen && !mobileOpen && !cmdOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(false); setMobileOpen(false); setCmdOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, mobileOpen, cmdOpen]);

  // Body lock for mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mega on outside click
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = () => setMegaOpen(false);
    const timer = setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener("click", onClick); };
  }, [megaOpen]);

  return (
    <>
      <header data-navbar003 className="sticky top-0 left-0 right-0 z-50">
        {/* Full-width frosted glass bar */}
        <div
          className={`w-full transition-all duration-500 ${
            isScrolled
              ? "bg-[var(--card-surface)]/85 backdrop-blur-xl border-b cs-border"
              : "bg-[var(--card-surface)]/50 backdrop-blur-md border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-14" : "h-16"}`}>

              {/* Logo — Vortex with gradient icon */}
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2.5 group" aria-label="Vortex home">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #6366f1)` }}>
                    <Sparkle className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #6366f1)` }} />
                </div>
                <span className="text-lg font-bold tracking-tight cs-text">Vortex</span>
              </a>

              {/* Desktop nav with sliding active indicator */}
              <LayoutGroup id="nav003-indicator">
                <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.id} className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          if (item.hasMega) { e.stopPropagation(); setMegaOpen(!megaOpen); }
                          setActiveNav(item.id);
                        }}
                        className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                          activeNav === item.id ? "" : "cs-muted hover:cs-text"
                        }`}
                        style={activeNav === item.id ? { color: ACCENT } : undefined}
                      >
                        {item.label}
                        {item.hasMega && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} style={activeNav === item.id ? { color: ACCENT } : undefined} />}
                        {/* Active indicator — accent-tinted bg for visibility in both modes */}
                        {activeNav === item.id && (
                          <motion.span
                            layoutId="nav003-active"
                            className="absolute inset-0 rounded-lg"
                            style={{ background: `rgba(${ACCENT_RGB}, 0.12)` }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {/* Hover glow */}
                        <span className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity" style={{ background: `rgba(${ACCENT_RGB}, 0.06)` }} />
                      </button>

                      {/* Mega menu for Products */}
                      {item.hasMega && (
                        <AnimatePresence>
                          {megaOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.97 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[560px] max-w-[calc(100vw-2rem)] cs-surface border cs-border rounded-2xl p-5 shadow-2xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="grid grid-cols-2 gap-2">
                                {MEGA_ITEMS.map((mi, i) => (
                                  <motion.a
                                    key={mi.label}
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                                  >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                                      style={{ background: `rgba(${ACCENT_RGB}, 0.1)` }}>
                                      <mi.icon className="h-4 w-4" style={{ color: ACCENT }} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium cs-text">{mi.label}</div>
                                      <div className="text-xs cs-subtle mt-0.5">{mi.desc}</div>
                                    </div>
                                  </motion.a>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t cs-border flex items-center justify-between">
                                <span className="text-xs cs-subtle">Explore all products</span>
                                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: ACCENT }}>
                                  View all <ArrowUpRight className="w-3 h-3" />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </nav>
              </LayoutGroup>

              {/* Right side: search, notifications, avatar, CTA */}
              <div className="flex items-center gap-2">
                {/* Command palette trigger */}
                <button
                  type="button"
                  onClick={() => setCmdOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg cs-border bg-[var(--card-input-bg)] text-xs cs-subtle hover:cs-text transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Search</span>
                  <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border cs-border px-1 py-0.5 text-[9px] font-mono">⌘K</kbd>
                </button>

                {/* Notification bell with badge */}
                <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-lg cs-muted hover:cs-text hover:bg-[var(--card-hover)] transition-colors" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[var(--card-surface)]" />
                </button>

                {/* Avatar with online ring */}
                <button type="button" className="relative" aria-label="Account menu">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-[var(--card-surface)]">
                    VX
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--card-surface)]" />
                </button>

                {/* CTA */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-white rounded-lg px-4 py-2 transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #6366f1)`, boxShadow: `0 2px 12px rgba(${ACCENT_RGB}, 0.3)` }}
                >
                  Launch App
                </motion.button>

                {/* Mobile menu */}
                <button
                  type="button"
                  className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg cs-muted hover:cs-text"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Command palette overlay */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl cs-surface border cs-border rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b cs-border">
                <Search className="w-4 h-4 cs-subtle" />
                <input type="text" placeholder="Search products, docs, settings..." className="flex-1 bg-transparent text-sm cs-text focus:outline-none placeholder:cs-subtle" autoFocus />
                <kbd className="rounded border cs-border px-1.5 py-0.5 text-[9px] font-mono cs-subtle">ESC</kbd>
              </div>
              <div className="p-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider cs-subtle">Quick Actions</div>
                {MEGA_ITEMS.map((mi, i) => (
                  <motion.a
                    key={mi.label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--card-hover)] cursor-pointer transition-colors group"
                  >
                    <mi.icon className="w-4 h-4 cs-muted group-hover:cs-text" style={{ color: ACCENT }} />
                    <span className="text-sm cs-text">{mi.label}</span>
                    <span className="text-xs cs-subtle ml-auto">{mi.desc}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer (slides from right) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-[56] w-80 max-w-[85vw] cs-surface border-l cs-border md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b cs-border">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, #6366f1)` }}>
                    <Sparkle className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold cs-text">Vortex</span>
                </div>
                <button type="button" onClick={() => setMobileOpen(false)} className="p-1.5 cs-muted hover:cs-text" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="block px-4 py-3 text-base font-medium cs-muted hover:cs-text rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <div className="mt-4 pt-4 border-t cs-border">
                  <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider cs-subtle">Products</div>
                  {MEGA_ITEMS.map((mi, i) => (
                    <motion.a
                      key={mi.label}
                      href="#"
                      onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                    >
                      <mi.icon className="w-4 h-4" style={{ color: ACCENT }} />
                      <span className="text-sm cs-text">{mi.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 border-t cs-border">
                <button type="button" className="w-full py-3 rounded-xl text-white text-sm font-medium" style={{ background: `linear-gradient(135deg, ${ACCENT}, #6366f1)` }}>
                  Launch App
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
