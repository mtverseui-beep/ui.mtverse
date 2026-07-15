"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  User, Settings, Mail, BarChart3, CreditCard, Bell, Lock, Palette,
  CheckCircle2, MessageSquare, TrendingUp, Lock as LockIcon,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Mock data: rich content per tab ──
type Profile = {
  id: string; label: string; icon: typeof User;
  title: string; subtitle: string;
  metrics: { label: string; value: string; trend?: string }[];
  description: string;
  accent: string;
};

const TABS: Profile[] = [
  {
    id: "profile", label: "Profile", icon: User, accent: "#6366f1",
    title: "Alex Morgan", subtitle: "Product Designer · San Francisco",
    metrics: [
      { label: "Projects", value: "24", trend: "+3" },
      { label: "Followers", value: "1.8K", trend: "+124" },
      { label: "Rating", value: "4.9" },
    ],
    description: "Senior product designer with 8 years of experience. Currently leading design systems at mtverse.",
  },
  {
    id: "settings", label: "Settings", icon: Settings, accent: "#0ea5e9",
    title: "Account Preferences", subtitle: "Manage your account configuration",
    metrics: [
      { label: "2FA", value: "On" },
      { label: "Sessions", value: "3" },
      { label: "Storage", value: "12 GB" },
    ],
    description: "Configure notifications, privacy controls, and security settings. Changes save automatically.",
  },
  {
    id: "messages", label: "Messages", icon: Mail, accent: "#ec4899",
    title: "Inbox", subtitle: "3 unread · 12 total",
    metrics: [
      { label: "Unread", value: "3" },
      { label: "Starred", value: "8" },
      { label: "Drafts", value: "2" },
    ],
    description: "Your latest conversations. Tap any message to reply or archive.",
  },
  {
    id: "analytics", label: "Analytics", icon: BarChart3, accent: "#10b981",
    title: "Performance Overview", subtitle: "Last 30 days",
    metrics: [
      { label: "Views", value: "12.4K", trend: "+24%" },
      { label: "Clicks", value: "892", trend: "+12%" },
      { label: "CTR", value: "7.2%" },
    ],
    description: "Your content is performing 24% better than last month. Keep shipping!",
  },
];

export function TabsCard() {
  return (
    <motion.div
      className="w-[clamp(340px,95vw,640px)] select-none space-y-10"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <UnderlineTabs />
      <PillTabs />
      <VerticalTabs />
    </motion.div>
  );
}

// ── 1. Underline — animated line slides beneath active tab ──
function UnderlineTabs() {
  const [active, setActive] = useState("profile");
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-indigo-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">01</span>
        <h3 className="text-[12px] font-bold cs-text">Underline Slide</h3>
        <span className="text-[10.5px] cs-subtle">— animated indicator</span>
      </header>
      <LayoutGroup id="tabs-underline">
        <div className="flex gap-0 border-b cs-border">
          {TABS.map(tab => {
            const Icon = tab.icon; const sel = active === tab.id;
            return (
              <button key={tab.id} type="button" onClick={() => setActive(tab.id)}
                className="relative flex items-center gap-1.5 px-3.5 py-2.5 text-[12px] font-semibold transition focus-visible:outline-none"
                style={{ color: sel ? tab.accent : "var(--card-text-muted)" }}>
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />{tab.label}
                {sel && <motion.div layoutId="ul-line" className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full"
                  style={{ background: tab.accent }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <TabContent active={active} />
    </section>
  );
}

// ── 2. Pill — sliding pill background ──
function PillTabs() {
  const [active, setActive] = useState("settings");
  const activeTab = TABS.find(t => t.id === active)!;
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-sky-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">02</span>
        <h3 className="text-[12px] font-bold cs-text">Pill Slide</h3>
        <span className="text-[10.5px] cs-subtle">— spring background</span>
      </header>
      <LayoutGroup id="tabs-pill">
        <div className="relative flex gap-1 rounded-xl p-1" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)" }}>
          {TABS.map(tab => {
            const Icon = tab.icon; const sel = active === tab.id;
            return (
              <button key={tab.id} type="button" onClick={() => setActive(tab.id)}
                className="relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-semibold transition focus-visible:outline-none"
                style={{ color: sel ? activeTab.accent : "var(--card-text-muted)" }}>
                {sel && <motion.div layoutId="pill-bg" className="absolute inset-0 rounded-lg"
                  style={{ background: "var(--card-surface)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", border: "1px solid var(--card-border)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }} />}
                <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <TabContent active={active} />
    </section>
  );
}

// ── 3. Vertical — side tabs with sliding indicator ──
function VerticalTabs() {
  const [active, setActive] = useState("analytics");
  const activeTab = TABS.find(t => t.id === active)!;
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-emerald-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">03</span>
        <h3 className="text-[12px] font-bold cs-text">Vertical Tabs</h3>
        <span className="text-[10.5px] cs-subtle">— side navigation</span>
      </header>
      <div className="flex gap-3">
        <LayoutGroup id="tabs-vertical">
          <div className="flex flex-col gap-1 rounded-xl p-1" style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border)", minWidth: "110px" }}>
            {TABS.map(tab => {
              const Icon = tab.icon; const sel = active === tab.id;
              return (
                <button key={tab.id} type="button" onClick={() => setActive(tab.id)}
                  className="relative flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[11px] font-semibold transition focus-visible:outline-none"
                  style={{ color: sel ? activeTab.accent : "var(--card-text-muted)" }}>
                  {sel && <motion.div layoutId="v-tab-bg" className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--card-surface)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", border: "1px solid var(--card-border)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }} />}
                  <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <div className="flex-1 min-w-0">
          <TabContent active={active} />
        </div>
      </div>
    </section>
  );
}

// ── Shared content panel with rich mock data ──
function TabContent({ active }: { active: string }) {
  const tab = TABS.find(t => t.id === active);
  if (!tab) return null;
  const Icon = tab.icon;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="mt-3 rounded-xl p-4"
        style={{ background: "var(--card-input-bg)", border: "1px solid var(--card-border-subtle)" }}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${tab.accent}15` }}>
            <Icon className="h-4 w-4" style={{ color: tab.accent }} strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[13px] font-bold cs-text">{tab.title}</h4>
            <p className="text-[11px] cs-muted">{tab.subtitle}</p>
          </div>
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed cs-muted">{tab.description}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {tab.metrics.map(m => (
            <div key={m.label} className="rounded-lg p-2" style={{ background: "var(--card-surface)", border: "1px solid var(--card-border-subtle)" }}>
              <div className="text-[9.5px] uppercase tracking-wider cs-subtle">{m.label}</div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-[14px] font-bold cs-text tabular-nums">{m.value}</span>
                {m.trend && (
                  <span className="text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">{m.trend}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
