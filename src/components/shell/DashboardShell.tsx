"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Layers,
  PanelLeftClose,
  PanelLeft,
  PanelBottom,
  Sparkle,
  Bot,
  Image,
  Fingerprint,
  MessageSquareQuote,
  Crown,
  CreditCard,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  ChevronRight,
  Heart,
  Home,
  MousePointerClick,
  Github,
  BarChart3,
  SquareStack,
} from "lucide-react";
import {
  cardRoutes,
  buttonRoutes,
  formRoutes,
  navbarRoutes,
  footerRoutes,
  heroRoutes,
  pricingRoutes,
  authRoutes,
  testimonialsRoutes,
  featuresRoutes,
  ctaRoutes,
  chartsRoutes,
  overlaysRoutes,
  sidebarRoutes,
  aiRoutes,
  backgroundRoutes,
  tableRoutes,
  premiumRoutes,
  cardRoutesOnly,
  cardOnlyCategories,
} from "@/components/cards-data/cards";
import type { CardCategory, CardMeta } from "@/components/cards-data/cards";

// ── Motion tokens ──
const EASE = [0.16, 1, 0.3, 1] as const;
const DUR_BASE = 0.24;

type SectionId =
  | "premium"
  | "cards"
  | "buttons"
  | "forms"
  | "navbar"
  | "footer"
  | "hero"
  | "pricing"
  | "auth"
  | "testimonials"
  | "features"
  | "cta"
  | "charts"
  | "overlays"
  | "sidebar"
  | "ai"
  | "backgrounds"
  | "tables";

type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;

interface NavItem {
  id: SectionId;
  label: string;
  icon: IconComponent;
  accent: string;
  routes: CardMeta[];
  pro?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// Data-driven nav config. Target hrefs come straight from the route data, so
// any change to the URL scheme (see cards.ts) flows through automatically.
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Featured",
    items: [
      { id: "premium", label: "Premium", icon: Crown, accent: "#f59e0b", routes: premiumRoutes },
      { id: "ai", label: "AI", icon: Bot, accent: "#8b5cf6", routes: aiRoutes, pro: true },
      { id: "cards", label: "Cards", icon: Layers, accent: "#06b6d4", routes: cardRoutesOnly },
      { id: "charts", label: "Charts", icon: BarChart3, accent: "#8B5CF6", routes: chartsRoutes, pro: true },
    ],
  },
  {
    label: "Components",
    items: [
      { id: "overlays", label: "Modals", icon: SquareStack, accent: "#8b5cf6", routes: overlaysRoutes },
      { id: "sidebar", label: "Sidebar", icon: PanelLeft, accent: "#7c3aed", routes: sidebarRoutes },
      { id: "backgrounds", label: "Backgrounds", icon: Image, accent: "#ec4899", routes: backgroundRoutes },
      { id: "tables", label: "Tables", icon: Layers, accent: "6366f1", routes: tableRoutes },
      { id: "buttons", label: "Buttons", icon: MousePointerClick, accent: "#6366f1", routes: buttonRoutes },
      { id: "forms", label: "Forms", icon: FormIcon, accent: "#10b981", routes: formRoutes },
      { id: "navbar", label: "Navbar", icon: Menu, accent: "#0ea5e9", routes: navbarRoutes },
      { id: "footer", label: "Footer", icon: PanelBottom, accent: "#06b6d4", routes: footerRoutes },
      { id: "hero", label: "Hero", icon: Sparkle, accent: "#8b5cf6", routes: heroRoutes },
      { id: "pricing", label: "Pricing", icon: CreditCard, accent: "#10b981", routes: pricingRoutes },
    ],
  },
  {
    label: "Pages",
    items: [
      { id: "auth", label: "Auth", icon: Fingerprint, accent: "#7c3aed", routes: authRoutes },
      { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, accent: "#a855f7", routes: testimonialsRoutes },
      { id: "features", label: "Features", icon: Layers, accent: "#06b6d4", routes: featuresRoutes },
      { id: "cta", label: "CTA", icon: Sparkle, accent: "#f43f5e", routes: ctaRoutes },
    ],
  },
];

const SECTION_LABELS: Record<SectionId, string> = {
  premium: "Premium",
  cards: "Components",
  buttons: "Buttons",
  forms: "Forms",
  navbar: "Navbar",
  footer: "Footer",
  hero: "Hero",
  pricing: "Pricing",
  auth: "Auth",
  testimonials: "Testimonials",
  features: "Features",
  cta: "CTA",
  charts: "Charts",
  overlays: "Modals",
  sidebar: "Sidebar",
  ai: "AI",
  backgrounds: "Backgrounds",
  tables: "Tables",
};

// Map a route category → the section that owns it.
function sectionForCategory(cat: CardCategory | undefined): SectionId {
  switch (cat) {
    case "Agents": return "premium";
    case "Buttons": return "buttons";
    case "Forms": return "forms";
    case "Navbar": return "navbar";
    case "Footer": return "footer";
    case "Hero": return "hero";
    case "Pricing": return "pricing";
    case "Auth": return "auth";
    case "Testimonials": return "testimonials";
    case "Features": return "features";
    case "CTA": return "cta";
    case "Charts": return "charts";
    
    case "Modals": return "overlays";
    case "Sidebar": return "sidebar";
    case "AI": return "ai";
    case "Backgrounds": return "backgrounds";
    case "Tables": return "tables";
    default: return "cards";
  }
}

const HOME_HREF = cardRoutesOnly[0]?.href ?? "/components/cards/cinematic-folder-card";

// Client-only mounted flag — avoids hydration mismatch with next-themes.
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = theme === "dark";

  const [mainCollapsed, setMainCollapsed] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<SectionId>("cards");
  const [mobileCardsOpen, setMobileCardsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  const activeCard = cardRoutes.find((c) => c.href === pathname) || null;

  // Auto-switch section based on the active route's category.
  React.useEffect(() => {
    setActiveSection(sectionForCategory(activeCard?.category));
  }, [pathname, activeCard]);

  // The 2nd sidebar shows routes based on the active section.
  const activeNavItem = React.useMemo(
    () => NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === activeSection),
    [activeSection],
  );
  const sectionRoutes = activeNavItem?.routes ?? cardRoutesOnly;
  const sectionCategories = React.useMemo<CardCategory[]>(() => {
    if (activeSection === "premium") return ["Agents", "Pricing", "Footer"];
    if (activeSection === "cards") return cardOnlyCategories;
    // Single-category sections use the category of their first route.
    const cat = sectionRoutes[0]?.category;
    return cat ? [cat] : [];
  }, [activeSection, sectionRoutes]);

  // Persist favorites across navigations via localStorage.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("mtverse:favorites");
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch {
      /* ignore — malformed or unavailable */
    }
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem("mtverse:favorites", JSON.stringify([...favorites]));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  // Close the mobile drawer on route change.
  React.useEffect(() => {
    setMobileCardsOpen(false);
  }, [pathname]);

  // ESC closes the mobile drawer.
  React.useEffect(() => {
    if (!mobileCardsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileCardsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileCardsOpen]);

  // ⌘K / Ctrl+K focuses the sidebar search.
  const focusSearch = React.useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setMobileCardsOpen(true);
    }
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("mtverse:focus-search"));
    });
  }, []);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusSearch]);

  // Filter + group cards (respects the active section).
  const filtered = React.useMemo(() => {
    if (!search.trim()) return sectionRoutes;
    const q = search.toLowerCase();
    return sectionRoutes.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
    );
  }, [search, sectionRoutes]);

  const byCategory = React.useMemo(() => {
    const map = new Map<CardCategory, CardMeta[]>();
    for (const cat of sectionCategories) {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length > 0) map.set(cat, items);
    }
    return map;
  }, [filtered, sectionCategories]);

  // Stabilize isActive so the memoized CardsSidebar doesn't re-render on
  // every pathname change — only the active highlight updates.
  const isActive = React.useCallback((href: string) => pathname === href, [pathname]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  // Breadcrumb segments — hierarchical: Components > <Group> > <Name>
  const breadcrumb = React.useMemo(() => {
    const segs = pathname.split("/").filter(Boolean);
    const titleCase = (s: string) =>
      s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return segs.map((seg, i) => {
      const path = "/" + segs.slice(0, i + 1).join("/");
      const isLast = i === segs.length - 1;
      const card = cardRoutes.find((c) => c.href === path || c.slug === seg);
      let label: string;
      let href: string;
      if (i === 0) {
        // "components" root
        label = "Components";
        href = HOME_HREF;
      } else if (card) {
        // leaf → the component's title
        label = card.title;
        href = card.href;
      } else {
        // intermediate group segment → link to its first card
        label = titleCase(seg);
        href = cardRoutes.find((c) => c.href.startsWith(path + "/"))?.href ?? path;
      }
      // `path` is unique per depth, so it is a stable React key even when the
      // group link resolves to the same href as the leaf (first item in group).
      return { label, href, isLast, path };
    });
  }, [pathname]);

  const onSectionClick = (item: NavItem) => {
    setActiveSection(item.id);
    if (activeSection !== item.id) {
      const target = item.routes[0]?.href;
      if (target) router.push(target);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: isDark
      ? "linear-gradient(135deg, #0a0a12 0%, #11111c 50%, #161624 100%)"
      : "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 50%, #fdf2f8 100%)" }}>
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: isDark ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0.15)" }} />
      <div className="pointer-events-none absolute right-10 top-1/3 h-80 w-80 rounded-full blur-3xl" style={{ background: isDark ? "rgba(34,211,238,0.08)" : "rgba(34,211,238,0.10)" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: isDark ? "rgba(236,72,153,0.08)" : "rgba(236,72,153,0.10)" }} />

      {/* ══════════ MAIN SIDEBAR (1st) — Glass Float style ══════════ */}
      <motion.aside
        animate={{ width: mainCollapsed ? 64 : 208 }}
        transition={{ duration: DUR_BASE, ease: EASE }}
        className="relative z-30 hidden m-2 shrink-0 flex-col rounded-2xl overflow-hidden md:flex"
        style={{
          background: isDark ? "rgba(20,20,28,0.60)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.40)" : "0 8px 32px rgba(31,38,135,0.10)",
        }}
      >
        {/* Brand — modernized: real logo + wordmark */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 border-b cs-border px-3">
          <Link
            href={HOME_HREF}
            className="flex shrink-0 items-center gap-2.5 overflow-hidden"
            aria-label="mtverse — home"
          >
            { }
            <img
              src="/mtverse-logo.png"
              alt="mtverse logo"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-lg object-contain"
            />
            {!mainCollapsed && (
              <span className="flex flex-col leading-none">
                <span className="text-[14px] font-bold cs-text tracking-tight">mtverse</span>
                <span className="mt-0.5 text-[9.5px] font-medium cs-subtle tracking-wide">UI Library</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav — grouped, data-driven, animated active pill */}
        <LayoutGroup id="sidebar-nav">
          <nav className="scrollbar-modern flex flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden p-2">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5">
                {!mainCollapsed && (
                  <span
                    className="mx-1 mb-1 mt-1.5 flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] cs-subtle"
                    style={{ background: "var(--card-surface-2)" }}
                  >
                    {group.label}
                  </span>
                )}
                {mainCollapsed && group.label !== NAV_GROUPS[0].label && (
                  <span className="mx-auto my-1 h-px w-6 bg-[var(--card-border)]" />
                )}
                {group.items.map((item) => {
                  const active = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={item.label}
                      aria-pressed={active}
                      onClick={() => onSectionClick(item)}
                      className={`group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12.5px] font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
                        active ? "cs-text" : "cs-muted hover:cs-text"
                      } ${mainCollapsed ? "justify-center" : ""}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-active-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: `${item.accent}1f`,
                            boxShadow: `inset 0 0 0 1px ${item.accent}33`,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      {active && !mainCollapsed && (
                        <motion.span
                          layoutId="sidebar-active-bar"
                          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                          style={{ background: item.accent }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span
                        className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center transition-colors"
                        style={{ color: active ? item.accent : undefined }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      {!mainCollapsed && <span className="relative z-10 truncate">{item.label}</span>}
                      {!mainCollapsed && (
                        <span className="relative z-10 ml-auto flex items-center gap-1">
                          {item.pro && (
                            <span
                              className="rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                              style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "#fff" }}
                            >PRO</span>
                          )}
                          <span
                            className="rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums"
                            style={{
                              background: active ? `${item.accent}25` : "var(--cs-surface-2)",
                              color: active ? item.accent : "var(--cs-muted)",
                            }}
                          >
                            {item.routes.length}
                          </span>
                        </span>
                      )}
                      {mainCollapsed && <Tooltip label={`${item.label} (${item.routes.length})`} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </LayoutGroup>

        {/* Collapse toggle */}
        <div className="shrink-0 border-t cs-border p-2">
          <button
            type="button"
            aria-label={mainCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setMainCollapsed((v) => !v)}
            className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-[12px] font-medium cs-muted outline-none transition hover:bg-[var(--card-hover)] hover:cs-text focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
              mainCollapsed ? "justify-center" : ""
            }`}
          >
            {mainCollapsed ? <PanelLeft className="h-4 w-4" strokeWidth={2} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={2} />}
            {!mainCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* ══════════ SECOND SIDEBAR (2nd) — card / component list ══════════ */}
      <aside
        className="relative z-20 hidden m-2 w-60 shrink-0 rounded-2xl overflow-hidden lg:flex"
        style={{
          background: isDark ? "rgba(20,20,28,0.60)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.40)" : "0 8px 32px rgba(31,38,135,0.10)",
        }}
        aria-label={`${SECTION_LABELS[activeSection]} list`}
      >
        <CardsSidebar
          byCategory={byCategory}
          search={search}
          setSearch={setSearch}
          isActive={isActive}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          sectionLabel={SECTION_LABELS[activeSection]}
        />
      </aside>

      {/* ══════════ MOBILE DRAWER — combined section nav + card list ══════════ */}
      <AnimatePresence>
        {mobileCardsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileCardsOpen(false)}
              aria-hidden
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: DUR_BASE, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="fixed inset-y-0 left-0 z-60 flex w-[300px] max-w-[88vw] flex-col border-r cs-border bg-[var(--card-surface)] lg:hidden"
            >
              {/* Mobile drawer header — branded */}
              <div className="flex h-12 shrink-0 items-center gap-2 border-b cs-border px-3">
                { }
                <img src="/mtverse-logo.png" alt="mtverse" width={20} height={20} className="h-5 w-5 rounded object-contain" />
                <span className="text-[12.5px] font-semibold cs-text tracking-tight">mtverse</span>
                <div className="flex-1" />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMobileCardsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg cs-border cs-input cs-muted"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>

              {/* Section navigation — horizontal scroll chips (1st sidebar content) */}
              <div className="shrink-0 border-b cs-border p-2">
                <div className="flex flex-wrap gap-1">
                  {NAV_GROUPS.flatMap((g) => g.items).map((item) => {
                    const active = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSectionClick(item)}
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] font-medium transition ${
                          active ? "text-white" : "cs-muted hover:cs-text cs-border cs-input"
                        }`}
                        style={active ? { background: item.accent } : undefined}
                      >
                        <Icon className="h-3 w-3" strokeWidth={2} />
                        <span>{item.label}</span>
                        {item.pro && (
                          <span
                            className="rounded px-1 py-0.5 text-[7.5px] font-bold uppercase tracking-wider"
                            style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "#fff" }}
                          >PRO</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card list (2nd sidebar content) */}
              <div className="flex-1 min-h-0">
                <CardsSidebar
                  byCategory={byCategory}
                  search={search}
                  setSearch={setSearch}
                  isActive={isActive}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  sectionLabel={SECTION_LABELS[activeSection]}
                  onClose={() => setMobileCardsOpen(false)}
                  hideHeader
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══════════ MAIN AREA ══════════ */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top nav — modern, compact, subtle blur backdrop */}
        <header className="z-40 flex h-14 shrink-0 items-center gap-2.5 m-2 rounded-2xl px-4 backdrop-blur-xl sm:px-4"
          style={{
            background: isDark ? "rgba(20,20,28,0.60)" : "rgba(255,255,255,0.55)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.40)" : "0 8px 32px rgba(31,38,135,0.08)",
          }}>
          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileCardsOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl cs-border cs-input transition cs-hover lg:hidden"
          >
            <Menu className="h-4 w-4 cs-muted" strokeWidth={2} />
          </button>

          {/* Brand (mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            { }
            <img
              src="/mtverse-logo.png"
              alt="mtverse logo"
              width={24}
              height={24}
              className="h-6 w-6 rounded-md object-contain"
            />
            <span className="text-[13px] font-bold cs-text tracking-tight">mtverse</span>
          </div>

          {/* Breadcrumb — desktop */}
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1 md:flex">
            <Link
              href={HOME_HREF}
              className="flex h-7 w-7 items-center justify-center rounded-lg cs-subtle transition hover:bg-[var(--card-hover)] hover:cs-text"
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            {breadcrumb.map((seg) => (
              <React.Fragment key={seg.path}>
                <ChevronRight className="h-3 w-3 cs-subtle" strokeWidth={2} />
                {seg.isLast ? (
                  <span className="rounded-lg bg-[var(--card-input-bg)] px-2 py-1 text-[11.5px] font-semibold cs-text">
                    {seg.label}
                  </span>
                ) : (
                  <Link
                    href={seg.href}
                    className="rounded-lg px-1.5 py-1 text-[11.5px] font-medium cs-subtle transition hover:bg-[var(--card-hover)] hover:cs-text"
                  >
                    {seg.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Command search pill — modernized */}
          <button
            type="button"
            aria-label="Search components"
            onClick={focusSearch}
            className="hidden h-8 items-center gap-2 rounded-lg border cs-border cs-input px-2.5 text-[12px] cs-subtle transition hover:cs-text sm:flex"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="hidden lg:inline">Search components…</span>
            <kbd className="ml-1 hidden items-center gap-0.5 rounded-md border cs-border bg-[var(--card-surface)] px-1.5 py-0.5 text-[10px] font-semibold cs-subtle lg:inline-flex">
              ⌘K
            </kbd>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="flex h-9 w-9 items-center justify-center rounded-xl cs-muted transition hover:bg-[var(--card-hover)] hover:cs-text"
          >
            <Github className="h-4 w-4" strokeWidth={2} />
          </a>

          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => {
              document.documentElement.classList.add("theme-transition");
              setTimeout(() => document.documentElement.classList.remove("theme-transition"), 350);
              setTheme(isDark ? "light" : "dark");
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl cs-muted outline-none transition hover:bg-[var(--card-hover)] hover:cs-text focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          >
            <motion.span
              key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: DUR_BASE, ease: EASE }}
            >
              {mounted ? (
                isDark ? <Moon className="h-4 w-4" strokeWidth={2} /> : <Sun className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Moon className="h-4 w-4 opacity-0" strokeWidth={2} aria-hidden />
              )}
            </motion.span>
          </button>

          {/* User avatar */}
          <button
            type="button"
            aria-label="Account menu"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden outline-none ring-2 ring-transparent transition hover:opacity-90 focus-visible:ring-violet-400/40"
          >
            { }
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Account" className="h-full w-full object-cover" />
            <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full bg-emerald-500" style={{ border: `2px solid ${isDark ? "#14141c" : "#ffffff"}` }} />
          </button>
        </header>

        {/* Breadcrumb — mobile */}
        <div className="flex h-9 shrink-0 items-center gap-1.5 m-2 rounded-xl px-3 md:hidden"
          style={{ background: isDark ? "rgba(20,20,28,0.60)" : "rgba(255,255,255,0.55)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)" }}>
          <Link href={HOME_HREF} className="text-[11px] font-medium cs-subtle">
            Home
          </Link>
          {activeCard && (
            <>
              <ChevronRight className="h-3 w-3 cs-subtle" strokeWidth={2} />
              <span className="truncate text-[11px] font-semibold cs-text">{activeCard.title}</span>
            </>
          )}
        </div>

        {/* Card preview canvas */}
        <main className="relative flex flex-1 flex-col overflow-hidden m-2 rounded-2xl"
          style={{
            background: isDark ? "rgba(15,15,22,0.50)" : "rgba(255,255,255,0.40)",
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          {children}
        </main>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// FormIcon — lucide TextCursorInput-style icon for the Forms nav item
// ──────────────────────────────────────────────────────────────────────────
function FormIcon({ className = "h-4 w-4", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3a2 2 0 0 0-2 2" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M21 19a2 2 0 0 1-2 2" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M9 3h1" />
      <path d="M9 21h1" />
      <path d="M14 3h1" />
      <path d="M14 21h1" />
      <path d="M3 9v1" />
      <path d="M21 9v1" />
      <path d="M3 14v1" />
      <path d="M21 14v1" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Tooltip — shown in collapsed sidebar mode
// Positioned absolutely OUTSIDE the parent's scroll width by using `fixed`-
// like positioning via `left-full` + `pointer-events-none`. Critically, we
// wrap the tooltip in a container with `overflow: hidden` so it doesn't
// expand the parent's scrollWidth when invisible.
// ──────────────────────────────────────────────────────────────────────────
function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute left-1/2 top-full z-80 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-700">
      {label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Cards sidebar — 2nd sidebar with grouped card list + search
// Memoized so it doesn't re-render on every pathname change.
// ──────────────────────────────────────────────────────────────────────────
const CardsSidebar = React.memo(function CardsSidebar({
  byCategory,
  search,
  setSearch,
  isActive,
  favorites,
  onToggleFavorite,
  sectionLabel = "Components",
  onClose,
  hideHeader = false,
}: {
  byCategory: Map<CardCategory, CardMeta[]>;
  search: string;
  setSearch: (v: string) => void;
  isActive: (href: string) => boolean;
  favorites: Set<string>;
  onToggleFavorite?: (slug: string) => void;
  sectionLabel?: string;
  onClose?: () => void;
  hideHeader?: boolean;
}) {
  const totalCount = Array.from(byCategory.values()).reduce((sum, items) => sum + items.length, 0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Listen for the global ⌘K focus event dispatched from the header.
  React.useEffect(() => {
    const handler = () => inputRef.current?.focus();
    window.addEventListener("mtverse:focus-search", handler);
    return () => window.removeEventListener("mtverse:focus-search", handler);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header — modernized: slimmer, accent dot, refined typography */}
      {!hideHeader && (
        <div className="flex h-12 shrink-0 items-center gap-2 border-b cs-border px-3">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)" }}
            aria-hidden
          />
          <span className="text-[12.5px] font-semibold cs-text tracking-tight truncate">{sectionLabel}</span>
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums cs-subtle"
            style={{ background: "var(--cs-surface-2)" }}
          >
            {totalCount}
          </span>
          <div className="flex-1" />
          {onClose && (
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg cs-border cs-input cs-muted lg:hidden"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      )}

      {/* Search */}
      <div className="shrink-0 p-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 cs-subtle" strokeWidth={2} />
          <input
            ref={inputRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            aria-label="Search components"
            className="w-full rounded-xl border cs-border cs-input py-2 pl-8 pr-3 text-[12.5px] cs-text placeholder:cs-subtle outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          />
        </div>
      </div>

      {/* Grouped card list */}
      <nav className="scrollbar-modern flex-1 overflow-y-auto overflow-x-hidden px-1.5 pb-3">
        {Array.from(byCategory.entries()).map(([category, items]) => (
          <div key={category} className="mb-2">
            <h3 className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] cs-subtle">
              {category}
            </h3>
            <ul>
              {items.map((card) => {
                const active = isActive(card.href);
                const isFav = favorites.has(card.slug);
                return (
                  <li key={card.slug}>
                    <Link
                      href={card.href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
                        active
                          ? "bg-[var(--card-hover)] ring-1 ring-cyan-500/20"
                          : "hover:bg-[var(--card-hover)]"
                      }`}
                    >
                      {/* Active indicator dot (replaces the icon box) */}
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors"
                        style={{
                          background: active ? card.accent : "var(--cs-border)",
                        }}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-[12px] font-medium ${active ? "cs-text" : "cs-muted"}`}>
                          {card.title}
                        </span>
                      </span>
                      {isFav ? (
                        <button
                          type="button"
                          aria-label={`Unfavorite ${card.title}`}
                          aria-pressed={true}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleFavorite?.(card.slug);
                          }}
                          className="shrink-0 rounded-full text-rose-500 outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-rose-400/40"
                        >
                          <Heart className="h-3 w-3 fill-rose-500" strokeWidth={2} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Favorite ${card.title}`}
                          aria-pressed={false}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleFavorite?.(card.slug);
                          }}
                          className="shrink-0 rounded-full cs-subtle opacity-0 outline-none transition hover:scale-110 hover:text-rose-500 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rose-400/40 group-hover:opacity-100"
                        >
                          <Heart className="h-3 w-3" strokeWidth={2} />
                        </button>
                      )}
                      {active && <ChevronRight className="h-3 w-3 shrink-0 text-cyan-500" strokeWidth={2.4} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {byCategory.size === 0 && (
          <p className="px-3 py-8 text-center text-[12px] cs-subtle">
            No components match &ldquo;{search}&rdquo;
          </p>
        )}
      </nav>
    </div>
  );
});
