"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronDown, MessageSquare, Sparkles, Layers, Wand2, Bot, BarChart3, Megaphone, Zap, Lock, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Navbar002Card — Upgraded Electric navbar (advanced)
// ════════════════════════════════════════════════════════════════════════════
// Upgrades over the original:
//   • Scroll-aware morph: transparent → glass pill on scroll
//   • Animated logo: Zap icon pulses
//   • Command-style search bar with ⌘K hint
//   • Mega menu with staggered item entrance (framer-motion)
//   • Hover glow on nav links
//   • Spring-animated mobile menu
//   • Cyan accent, cs-* tokens for dark + light

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Docs" },
];

const WORKFLOW_ITEMS = [
  { href: "#", label: "Chat Support", icon: MessageSquare },
  { href: "#", label: "Ticket Routing", icon: Sparkles },
  { href: "#", label: "Multi-Channel", icon: Layers },
  { href: "#", label: "Custom Agents", icon: Wand2 },
];

const TOOLS_MENU = {
  free: [
    { category: "Chat", items: [{ href: "#", label: "Chat Widget", icon: MessageSquare }, { href: "#", label: "Response Templates", icon: Bot }] },
    { category: "Analytics", items: [{ href: "#", label: "Basic Analytics", icon: BarChart3 }, { href: "#", label: "Satisfaction Surveys", icon: BarChart3 }] },
  ],
  paid: [
    { category: "AI Agents", items: [{ href: "#", label: "AI Agent Builder", icon: Bot }, { href: "#", label: "Intent Detection", icon: Sparkles }] },
    { category: "Automation", items: [{ href: "#", label: "Workflow Automation", icon: Zap }, { href: "#", label: "Smart Escalation", icon: Zap }] },
    { category: "Campaigns", items: [{ href: "#", label: "Proactive Chat", icon: Megaphone }, { href: "#", label: "Targeted Messages", icon: Megaphone }] },
    { category: "Insights", items: [{ href: "#", label: "Sentiment Analysis", icon: BarChart3 }, { href: "#", label: "Conversation Insights", icon: BarChart3 }] },
  ],
};

const ACCENT = "#06b6d4";
const ACCENT_RGB = "6, 182, 212";

export function Navbar002Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll-aware morph — driven by the preview scroll container (or window).
  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const target: Element | Window = el ?? window;
    const onScroll = () => setIsScrolled((el ? el.scrollTop : window.scrollY) > 30);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!toolsOpen && !workflowsOpen) return;
    const onClick = () => { setToolsOpen(false); setWorkflowsOpen(false); };
    const timer = setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener("click", onClick); };
  }, [toolsOpen, workflowsOpen]);

  // Escape closes everything
  useEffect(() => {
    if (!mobileMenuOpen && !toolsOpen && !workflowsOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileMenuOpen(false); setToolsOpen(false); setWorkflowsOpen(false); setSearchOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, toolsOpen, workflowsOpen, searchOpen]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header data-navbar002 className="sticky top-0 left-0 right-0 z-50 px-2 sm:px-4 transition-all duration-500"
      style={{ paddingTop: isScrolled ? "8px" : "16px" }}>
      <nav aria-label="Main navigation">
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between border rounded-full px-4 sm:px-6 transition-all duration-500 ${
            isScrolled
              ? "bg-[var(--card-surface)]/90 backdrop-blur-xl border-[var(--card-border)] shadow-lg"
              : "bg-[var(--card-surface)]/40 backdrop-blur-md border-[var(--card-border)]/50"
          }`}
          style={isScrolled ? { boxShadow: `0 4px 30px rgba(${ACCENT_RGB}, 0.08)` } : undefined}
        >
          {/* Logo with pulse */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 group" aria-label="Electric home">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <Zap className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: ACCENT }} aria-hidden="true" />
            </motion.div>
            <span className="font-mono font-bold text-base sm:text-lg cs-text" style={{ letterSpacing: "-0.05em" }}>Electric</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Tools Mega Menu */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => { setToolsOpen((v) => !v); setWorkflowsOpen(false); }}
                className="flex items-center gap-1 text-sm cs-muted hover:cs-text transition-colors outline-none group"
              >
                Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`} />
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300" style={{ background: ACCENT, width: toolsOpen ? "100%" : "0%" }} />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-2 w-[480px] max-w-[calc(100vw-2rem)] cs-surface border cs-border rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: ACCENT }}>Free Tools</div>
                        {TOOLS_MENU.free.map((cat, ci) => (
                          <div key={cat.category} className="mb-3">
                            <div className="text-xs font-medium cs-subtle uppercase tracking-wider mb-1 px-2">{cat.category}</div>
                            {cat.items.map((item, ii) => (
                              <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => e.preventDefault()}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + (ci * 0.3 + ii) * 0.04 }}
                                className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--card-hover)] cursor-pointer"
                              >
                                <item.icon className="w-4 h-4" style={{ color: ACCENT }} />
                                <span className="text-sm cs-muted group-hover:cs-text">{item.label}</span>
                              </motion.a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: ACCENT }}>
                          <Lock className="w-3.5 h-3.5" /> Pro Tools
                        </div>
                        {TOOLS_MENU.paid.map((cat, ci) => (
                          <div key={cat.category} className="mb-3">
                            <div className="text-xs font-medium cs-subtle uppercase tracking-wider mb-1 px-2">{cat.category}</div>
                            {cat.items.map((item, ii) => (
                              <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => e.preventDefault()}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + (ci * 0.3 + ii) * 0.04 }}
                                className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--card-hover)] cursor-pointer"
                              >
                                <item.icon className="w-4 h-4" style={{ color: ACCENT }} />
                                <span className="text-sm cs-muted group-hover:cs-text">{item.label}</span>
                              </motion.a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Workflows Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => { setWorkflowsOpen((v) => !v); setToolsOpen(false); }}
                className="flex items-center gap-1 text-sm cs-muted hover:cs-text transition-colors outline-none group relative"
              >
                Workflows
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${workflowsOpen ? "rotate-180" : ""}`} />
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300" style={{ background: ACCENT, width: workflowsOpen ? "100%" : "0%" }} />
              </button>
              <AnimatePresence>
                {workflowsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-2 w-56 cs-surface border cs-border rounded-2xl p-2 shadow-2xl"
                  >
                    {WORKFLOW_ITEMS.map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => e.preventDefault()}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--card-hover)] cursor-pointer"
                      >
                        <item.icon className="w-4 h-4" style={{ color: ACCENT }} />
                        <span className="text-sm cs-muted group-hover:cs-text">{item.label}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav Links with hover underline */}
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => e.preventDefault()} className="relative text-sm cs-muted hover:cs-text transition-colors group">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full" style={{ background: ACCENT, width: "0%" }} />
              </a>
            ))}

            {/* Search button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg cs-border bg-[var(--card-input-bg)] text-xs cs-subtle hover:cs-text transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 rounded border cs-border px-1 py-0.5 text-[9px] font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button type="button" className="text-sm font-medium cs-muted hover:cs-text transition-colors px-3 py-1.5">Log in</button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white rounded-full px-4 py-1.5 transition-opacity hover:opacity-90"
              style={{ background: ACCENT, boxShadow: `0 2px 12px rgba(${ACCENT_RGB}, 0.3)` }}
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 cs-muted hover:cs-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="hidden lg:block mx-auto max-w-6xl mt-2 cs-surface border cs-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 cs-subtle" />
                <input
                  type="text"
                  placeholder="Search tools, workflows, docs..."
                  className="flex-1 bg-transparent text-sm cs-text focus:outline-none placeholder:cs-subtle"
                  autoFocus
                />
                <kbd className="rounded border cs-border px-1.5 py-0.5 text-[9px] font-mono cs-subtle">ESC</kbd>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-0 left-0 w-dvw h-dvh bg-background z-40 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b cs-border bg-background">
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
                  <Zap className="w-5 h-5" style={{ color: ACCENT }} />
                  <span className="font-mono font-bold text-base cs-text" style={{ letterSpacing: "-0.05em" }}>Electric</span>
                </a>
                <button type="button" className="p-2 cs-text" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 overflow-y-auto px-6 pt-4 pb-4"
              >
                <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider" style={{ color: ACCENT }}>Free Tools</div>
                {TOOLS_MENU.free.map((cat) => (
                  <div key={cat.category}>
                    <div className="px-4 py-1 text-xs cs-subtle">{cat.category}</div>
                    {cat.items.map((item) => (
                      <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="group flex items-center gap-2 px-4 py-3 text-base cs-muted hover:cs-text transition-colors rounded-lg hover:bg-[var(--card-hover)]">
                        <item.icon className="w-5 h-5" style={{ color: ACCENT }} />
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
                <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider flex items-center gap-1" style={{ color: ACCENT }}>
                  <Lock className="w-3 h-3" /> Pro Tools
                </div>
                {TOOLS_MENU.paid.map((cat) => (
                  <div key={cat.category}>
                    <div className="px-4 py-1 text-xs cs-subtle">{cat.category}</div>
                    {cat.items.map((item) => (
                      <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="group flex items-center gap-2 px-4 py-3 text-base cs-muted hover:cs-text transition-colors rounded-lg hover:bg-[var(--card-hover)]">
                        <item.icon className="w-5 h-5" style={{ color: ACCENT }} />
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
                <div className="border-t cs-border my-3" />
                <div className="px-4 py-2 text-xs font-medium cs-subtle uppercase tracking-wider">Workflows</div>
                {WORKFLOW_ITEMS.map((item) => (
                  <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="group flex items-center gap-2 px-4 py-3 text-base cs-muted hover:cs-text transition-colors rounded-lg hover:bg-[var(--card-hover)]">
                    <item.icon className="w-5 h-5" style={{ color: ACCENT }} />
                    {item.label}
                  </a>
                ))}
                <div className="border-t cs-border my-3" />
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block px-4 py-3 text-base cs-muted hover:cs-text transition-colors rounded-lg hover:bg-[var(--card-hover)]">
                    {link.label}
                  </a>
                ))}
              </motion.div>

              <div className="px-6 py-4 border-t cs-border flex flex-col gap-3">
                <button type="button" className="justify-center text-base py-4 w-full border cs-border rounded-lg cs-text">Log in</button>
                <button type="button" className="py-4 text-base w-full rounded-full text-white font-medium" style={{ background: ACCENT, boxShadow: `0 2px 12px rgba(${ACCENT_RGB}, 0.3)` }}>Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
