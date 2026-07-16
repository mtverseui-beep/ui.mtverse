"use client";

import { useId, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { BarChart3, Mail, Settings, User, type LucideIcon } from "lucide-react";

type TabData = { id: string; label: string; icon: LucideIcon; accent: string; title: string; subtitle: string; description: string; metrics: { label: string; value: string; trend?: string }[] };
const TAB_DATA: TabData[] = [
  { id: "profile", label: "Profile", icon: User, accent: "#6366f1", title: "Alex Morgan", subtitle: "Product Designer · San Francisco", description: "Senior product designer leading accessible design systems and product craft.", metrics: [{ label: "Projects", value: "24", trend: "+3" }, { label: "Followers", value: "1.8K", trend: "+124" }, { label: "Rating", value: "4.9" }] },
  { id: "settings", label: "Settings", icon: Settings, accent: "#0ea5e9", title: "Account Preferences", subtitle: "Security and notifications", description: "Configure notifications, privacy controls, and active sessions in one place.", metrics: [{ label: "2FA", value: "On" }, { label: "Sessions", value: "3" }, { label: "Storage", value: "12 GB" }] },
  { id: "messages", label: "Messages", icon: Mail, accent: "#ec4899", title: "Inbox", subtitle: "3 unread · 12 total", description: "Review recent conversations, drafts, and starred messages.", metrics: [{ label: "Unread", value: "3" }, { label: "Starred", value: "8" }, { label: "Drafts", value: "2" }] },
  { id: "analytics", label: "Analytics", icon: BarChart3, accent: "#10b981", title: "Performance Overview", subtitle: "Last 30 days", description: "Content performance is up from last month across key engagement metrics.", metrics: [{ label: "Views", value: "12.4K", trend: "+24%" }, { label: "Clicks", value: "892", trend: "+12%" }, { label: "CTR", value: "7.2%" }] },
];
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--card-text-muted)]";

export function TabsCard() {
  return <div className="w-[min(100%,640px)] space-y-10"><TabsDemo variant="underline" defaultValue="profile" title="Underline" detail="automatic activation" /><TabsDemo variant="pill" defaultValue="settings" title="Pill" detail="responsive navigation" /><TabsDemo variant="vertical" defaultValue="analytics" title="Vertical" detail="manual activation" /></div>;
}

type Variant = "underline" | "pill" | "vertical";
function TabsDemo({ variant, defaultValue, title, detail }: { variant: Variant; defaultValue: string; title: string; detail: string }) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const vertical = variant === "vertical";
  return <section aria-labelledby={`${id}-heading`}><header className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1"><span className="flex h-6 items-center rounded-md bg-indigo-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{variant === "underline" ? "01" : variant === "pill" ? "02" : "03"}</span><h3 id={`${id}-heading`} className="text-[12px] font-bold cs-text">{title}</h3><span className="text-[10.5px] cs-subtle">— {detail}</span></header><Tabs.Root value={value} onValueChange={setValue} orientation={vertical ? "vertical" : "horizontal"} activationMode={vertical ? "manual" : "automatic"} className={vertical ? "grid grid-cols-[minmax(88px,auto)_minmax(0,1fr)] gap-2 sm:gap-3" : ""}>
      <Tabs.List aria-label={`${title} account sections`} className={vertical ? "flex min-w-0 flex-col gap-1 rounded-xl border cs-border cs-input p-1" : variant === "pill" ? "flex max-w-full gap-1 overflow-x-auto rounded-xl border cs-border cs-input p-1" : "flex max-w-full overflow-x-auto border-b cs-border"}>{TAB_DATA.map((tab) => { const Icon = tab.icon; return <Tabs.Trigger key={tab.id} value={tab.id} className={`${variant === "underline" ? "relative flex min-w-fit flex-1 items-center justify-center gap-1.5 px-2 py-2.5 text-[11px] font-semibold cs-muted transition after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:scale-x-0 after:rounded-full after:bg-[var(--card-text-muted)] after:transition-transform data-[state=active]:cs-text data-[state=active]:after:scale-x-100" : "flex min-w-fit flex-1 items-center gap-1.5 rounded-lg px-2 py-2.5 text-[11px] font-semibold cs-muted transition data-[state=active]:bg-[var(--card-surface)] data-[state=active]:cs-text data-[state=active]:shadow-sm"} ${focus} motion-reduce:transition-none`}><Icon aria-hidden className="h-3.5 w-3.5 shrink-0" /><span className={vertical ? "truncate" : ""}>{tab.label}</span></Tabs.Trigger>; })}</Tabs.List><div className="min-w-0">{TAB_DATA.map((tab) => <TabPanel key={tab.id} tab={tab} vertical={vertical} />)}</div></Tabs.Root></section>;
}

function TabPanel({ tab, vertical }: { tab: TabData; vertical: boolean }) {
  const Icon = tab.icon;
  return <Tabs.Content value={tab.id} tabIndex={0} className={`${vertical ? "mt-0" : "mt-3"} rounded-xl border border-[var(--card-border-subtle)] cs-input p-3 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:animate-none sm:p-4`}><div className="flex min-w-0 items-start gap-3"><span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `${tab.accent}18` }}><Icon className="h-4 w-4" style={{ color: tab.accent }} /></span><div className="min-w-0"><h4 className="truncate text-[13px] font-bold cs-text">{tab.title}</h4><p className="text-[11px] cs-muted">{tab.subtitle}</p></div></div><p className="mt-3 text-[11.5px] leading-relaxed cs-muted">{tab.description}</p><dl className="mt-3 grid grid-cols-1 gap-2 min-[380px]:grid-cols-3">{tab.metrics.map((metric) => <div key={metric.label} className="min-w-0 rounded-lg border border-[var(--card-border-subtle)] cs-surface p-2"><dt className="truncate text-[9px] uppercase tracking-wider cs-subtle">{metric.label}</dt><dd className="whitespace-nowrap text-[14px] font-bold tabular-nums cs-text">{metric.value}{metric.trend && <span className="ml-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">{metric.trend}</span>}</dd></div>)}</dl></Tabs.Content>;
}
