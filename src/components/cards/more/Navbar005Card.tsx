"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, User, ChevronDown, Sparkles, FlaskConical, Leaf, Wind, Sun } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Navbar005Card — Lumina navbar (advanced + unique)
// ════════════════════════════════════════════════════════════════════════════
// Upgraded Lumina fragrance navbar with:
//   • Floating frosted glass pill (warm beige #F7F1E8)
//   • Centered serif "Lumina" logo
//   • Modern dropdown mega menu (Shop category with scent-type sub-items)
//   • Command-style search overlay (⌘K — slides down from navbar)
//   • Scroll-aware morph (transparent → frosted)
//   • Sliding active indicator (LayoutGroup)
//   • Cart badge + account icon with dropdown
//   • Mobile slide-down menu with staggered links
//   • Warm beige/amber accent (#92400e)

const ACCENT = "#92400e";
const ACCENT_RGB = "146, 64, 14";

const NAV_ITEMS = [
  { id: "shop", label: "Shop", href: "#", hasMega: true },
  { id: "about", label: "About", href: "#" },
  { id: "scents", label: "Scents", href: "#" },
];

const SHOP_MEGA = [
  { label: "Body Mists", desc: "Soft, everyday fragrance", icon: Wind },
  { label: "Hair Perfumes", desc: "Scent that lingers", icon: Sparkles },
  { label: "Room Sprays", desc: "Ambient rituals", icon: Leaf },
  { label: "Discovery Sets", desc: "Try before you commit", icon: FlaskConical },
  { label: "Gift Sets", desc: "Curated scent journeys", icon: Sun },
  { label: "Bestsellers", desc: "Community favorites", icon: Sparkles },
];

export function Navbar005Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("shop");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(2);

  // Scroll-aware morph — driven by the preview scroll container (or window).
  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const target: Element | Window = el ?? window;
    const onScroll = () => setIsScrolled((el ? el.scrollTop : window.scrollY) > 20);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!megaOpen && !accountOpen) return;
    const onClick = () => { setMegaOpen(false); setAccountOpen(false); };
    const timer = setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener("click", onClick); };
  }, [megaOpen, accountOpen]);

  // Escape closes everything
  useEffect(() => {
    if (!mobileOpen && !megaOpen && !searchOpen && !accountOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); setMegaOpen(false); setSearchOpen(false); setAccountOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, megaOpen, searchOpen, accountOpen]);

  // Body lock for mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @keyframes lumina-scale-fade-in { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .lumina-scale-fade-in { animation: lumina-scale-fade-in 0.6s ease-out; }
        .lumina-transition { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .lumina-shadow { box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px; }
      `}</style>

      <div className="bg-[#EDE3D3] min-h-full">
        <header data-navbar005 className="sticky top-0 left-0 right-0 z-50 px-4 pt-4">
          <nav
            className={`max-w-7xl mx-auto px-6 lg:px-8 rounded-lg lumina-transition lumina-scale-fade-in border ${
              isScrolled
                ? "bg-[rgba(247,241,232,0.9)] backdrop-blur-xl border-[rgba(247,241,232,0.5)]"
                : "bg-[rgba(247,241,232,0.4)] backdrop-blur-md border-[rgba(247,241,232,0.32)]"
            }`}
            style={{ boxShadow: "rgba(43, 26, 18, 0.08) 0px 10px 50px" }}
          >
            <div className="flex items-center justify-between h-[68px]">
              {/* Mobile menu */}
              <button
                type="button"
                className="lg:hidden p-2 text-[#2B1A12]/80 hover:text-[#2B1A12] lumina-transition"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Desktop nav with sliding active indicator */}
              <LayoutGroup id="nav005-indicator">
                <div className="hidden lg:flex items-center gap-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.id} className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          if (item.hasMega) { e.stopPropagation(); setMegaOpen(!megaOpen); setAccountOpen(false); }
                          setActiveNav(item.id);
                        }}
                        className={`relative flex items-center gap-1 px-3.5 py-2 text-sm tracking-wide lumina-transition rounded-md ${
                          activeNav === item.id ? "text-[#2B1A12]" : "text-[#2B1A12]/70 hover:text-[#2B1A12]"
                        }`}
                        style={activeNav === item.id ? { color: ACCENT } : undefined}
                      >
                        {item.label}
                        {item.hasMega && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} style={activeNav === item.id ? { color: ACCENT } : undefined} />}
                        {activeNav === item.id && (
                          <motion.span
                            layoutId="nav005-active"
                            className="absolute inset-0 rounded-md"
                            style={{ background: `rgba(${ACCENT_RGB}, 0.1)` }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Mega menu for Shop */}
                      {item.hasMega && (
                        <AnimatePresence>
                          {megaOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.97 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-0 top-full mt-2 w-[480px] max-w-[calc(100vw-2rem)] bg-[rgba(247,241,232,0.98)] backdrop-blur-xl border border-[#2B1A12]/10 rounded-2xl p-5 lumina-shadow overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="grid grid-cols-2 gap-2">
                                {SHOP_MEGA.map((mi, i) => (
                                  <motion.a
                                    key={mi.label}
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(146,64,14,0.06)] transition-colors cursor-pointer"
                                  >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `rgba(${ACCENT_RGB}, 0.1)` }}>
                                      <mi.icon className="h-4 w-4" style={{ color: ACCENT }} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-[#2B1A12]">{mi.label}</div>
                                      <div className="text-xs text-[#2B1A12]/50 mt-0.5">{mi.desc}</div>
                                    </div>
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </div>
              </LayoutGroup>

              {/* Logo */}
              <a href="#" onClick={(e) => e.preventDefault()} className="absolute left-1/2 -translate-x-1/2">
                <h1 className="font-serif text-3xl tracking-wider text-[#2B1A12]">Lumina</h1>
              </a>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {/* Modern inline search input */}
                <div className="hidden md:flex items-center relative">
                  <Search className="absolute left-3 w-4 h-4 text-[#2B1A12]/40 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setSearchOpen(false)}
                    className="w-32 lg:w-40 pl-9 pr-3 py-2 rounded-lg border border-[#2B1A12]/10 bg-white/50 text-xs text-[#2B1A12] focus:outline-none focus:border-[#92400e]/30 focus:w-48 lg:focus:w-56 lumina-transition placeholder:text-[#2B1A12]/40"
                  />
                  <kbd className="absolute right-2 hidden lg:inline-flex items-center rounded border border-[#2B1A12]/10 px-1 py-0.5 text-[9px] font-mono text-[#2B1A12]/40 pointer-events-none">⌘K</kbd>
                </div>
                {/* Mobile search icon */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="md:hidden p-2 text-[#2B1A12]/70 hover:text-[#2B1A12] lumina-transition"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Account with dropdown */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => { setAccountOpen(!accountOpen); setMegaOpen(false); }}
                    className="p-2 text-[#2B1A12]/70 hover:text-[#2B1A12] lumina-transition"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-full mt-2 w-56 bg-[rgba(247,241,232,0.98)] backdrop-blur-xl border border-[#2B1A12]/10 rounded-xl p-2 lumina-shadow"
                      >
                        {[
                          { label: "My Account", href: "#" },
                          { label: "My Orders", href: "#" },
                          { label: "Wishlist", href: "#" },
                          { label: "Scent Profile", href: "#" },
                        ].map((item, i) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => e.preventDefault()}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="block px-3 py-2 rounded-lg text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] hover:bg-[rgba(146,64,14,0.06)] lumina-transition cursor-pointer"
                          >
                            {item.label}
                          </motion.a>
                        ))}
                        <div className="border-t border-[#2B1A12]/10 my-1" />
                        <a href="#" onClick={(e) => e.preventDefault()} className="block px-3 py-2 rounded-lg text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] hover:bg-[rgba(146,64,14,0.06)] lumina-transition cursor-pointer">
                          Sign Out
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cart */}
                <button type="button" className="relative p-2 text-[#2B1A12]/70 hover:text-[#2B1A12] lumina-transition" aria-label="Cart">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0 -right-0 w-4 h-4 text-white text-[10px] flex items-center justify-center rounded-full" style={{ background: ACCENT }}>{cartCount}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Search overlay (slides down from navbar) */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-4 py-3 border-t border-[#2B1A12]/10">
                    <Search className="w-4 h-4 text-[#2B1A12]/50" />
                    <input
                      type="text"
                      placeholder="Search fragrances, scents, collections..."
                      className="flex-1 bg-transparent text-sm text-[#2B1A12] focus:outline-none placeholder:text-[#2B1A12]/40"
                      autoFocus
                    />
                    {/* Suggested searches */}
                    <div className="hidden md:flex gap-2">
                      {["Body Mist", "Hair Perfume", "Room Spray"].map((s) => (
                        <button key={s} className="px-2.5 py-1 rounded-full text-xs border border-[#2B1A12]/10 text-[#2B1A12]/60 hover:text-[#2B1A12] hover:border-[#2B1A12]/20 lumina-transition">
                          {s}
                        </button>
                      ))}
                    </div>
                    <kbd className="rounded border border-[#2B1A12]/10 px-1.5 py-0.5 text-[9px] font-mono text-[#2B1A12]/50">ESC</kbd>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ maxHeight: 0, opacity: 0 }}
                  animate={{ maxHeight: 400, opacity: 1 }}
                  exit={{ maxHeight: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:hidden overflow-hidden"
                >
                  <div className="flex flex-col gap-4 pt-4 pb-6 border-t border-[#2B1A12]/10">
                    {NAV_ITEMS.map((link, i) => (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm tracking-wide text-[#2B1A12]/70 hover:text-[#2B1A12] lumina-transition"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                    <motion.div
                      key="search"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 pt-2 border-t border-[#2B1A12]/10"
                    >
                      <Search className="w-5 h-5 text-[#2B1A12]/70" />
                      <input type="text" placeholder="Search..." className="flex-1 bg-transparent text-sm text-[#2B1A12] focus:outline-none placeholder:text-[#2B1A12]/40" />
                    </motion.div>
                    {["My Account", "My Orders", "Wishlist"].map((item, i) => (
                      <motion.a
                        key={item}
                        href="#"
                        onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className="text-sm tracking-wide text-[#2B1A12]/70 hover:text-[#2B1A12] lumina-transition"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </header>

        {/* Spacer */}
        <div className="h-32 flex items-center justify-center">
          <p className="text-sm text-[#2B1A12]/40">Lumina — advanced navbar with mega menu + search overlay + account dropdown</p>
        </div>
      </div>
    </>
  );
}
