"use client";

import { useState, type ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { HelpCircle, Info, Star, TrendingUp, User, Zap } from "lucide-react";

const contentClass = "z-50 max-w-[min(260px,var(--radix-tooltip-content-available-width))] rounded-lg bg-slate-950 px-2.5 py-1.5 text-[10.5px] font-medium text-white shadow-xl data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 motion-reduce:animate-none dark:bg-slate-700";
const triggerClass = "flex min-h-10 items-center gap-2 rounded-lg border cs-border cs-input px-3.5 text-[11px] font-semibold cs-text transition cs-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none";
const iconClass = "flex h-11 w-11 items-center justify-center rounded-full border cs-border cs-surface cs-muted transition cs-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none";

export function TooltipCard() {
  return <Tooltip.Provider delayDuration={350} skipDelayDuration={100}><div className="w-[min(100%,640px)] space-y-10"><PositionTooltips /><IconTooltips /><RichTooltip /></div></Tooltip.Provider>;
}

function Heading({ number, title, detail, tone }: { number: string; title: string; detail: string; tone: string }) {
  return <header className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1"><span className={`flex h-6 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-wider ${tone}`}>{number}</span><h3 className="text-[12px] font-bold cs-text">{title}</h3><span className="text-[10.5px] cs-subtle">— {detail}</span></header>;
}

function Tip({ label, children, side = "top", rich = false }: { label: ReactNode; children: ReactNode; side?: "top" | "right" | "bottom" | "left"; rich?: boolean }) {
  return <Tooltip.Root><Tooltip.Trigger asChild>{children}</Tooltip.Trigger><Tooltip.Portal><Tooltip.Content side={side} sideOffset={8} collisionPadding={12} avoidCollisions sticky="partial" className={rich ? "z-50 w-[min(256px,var(--radix-tooltip-content-available-width))] outline-none" : contentClass}>{label}{!rich && <Tooltip.Arrow className="fill-slate-950 dark:fill-slate-700" />}</Tooltip.Content></Tooltip.Portal></Tooltip.Root>;
}

function PositionTooltips() {
  const positions = ["top", "right", "bottom", "left"] as const;
  const [status, setStatus] = useState("Choose a position");
  return <section><Heading number="01" title="Four Positions" detail="hover or keyboard focus" tone="bg-slate-500/10 text-slate-600 dark:text-slate-300" /><div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border cs-border cs-input px-2 py-8">{positions.map((side) => <Tip key={side} side={side} label={`Tooltip on ${side}`}><button type="button" onClick={() => setStatus(`${side} selected`)} className={triggerClass}>{side[0].toUpperCase() + side.slice(1)}</button></Tip>)}</div><p aria-live="polite" className="mt-2 text-center text-[10px] cs-subtle">{status}</p></section>;
}

function IconTooltips() {
  const [status, setStatus] = useState("No action selected");
  const actions = [{ label: "Opened help documentation", tip: "View help documentation", icon: HelpCircle }, { label: "Opened feature details", tip: "Read feature details", icon: Info }, { label: "Opened quick actions", tip: "Explore quick actions", icon: Zap }];
  return <section><Heading number="02" title="Icon Actions" detail="concise accessible labels" tone="bg-amber-500/10 text-amber-600 dark:text-amber-400" /><div className="flex items-center justify-center gap-3 rounded-xl border cs-border cs-input py-8">{actions.map(({ label, tip, icon: Icon }) => <Tip key={tip} label={tip}><button type="button" aria-label={tip} onClick={() => setStatus(label)} className={iconClass}><Icon aria-hidden className="h-5 w-5" /></button></Tip>)}</div><p aria-live="polite" className="mt-2 text-center text-[10px] cs-subtle">{status}</p></section>;
}

function RichTooltip() {
  const [following, setFollowing] = useState(false);
  const card = <div className="overflow-hidden rounded-xl border cs-border cs-surface shadow-2xl"><div className="flex items-center gap-3 border-b cs-border cs-input p-3"><span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-[12px] font-bold text-white">AM</span><span className="min-w-0 flex-1"><strong className="block text-[12px] cs-text">Alex Morgan</strong><span className="block text-[10px] cs-muted">Product Designer · San Francisco</span></span><span className="h-2 w-2 rounded-full bg-emerald-500"><span className="sr-only">Online</span></span></div><div className="grid grid-cols-3 gap-1 p-3 text-center"><span><strong className="block text-[13px] cs-text">24</strong><span className="text-[9px] uppercase cs-subtle">Projects</span></span><span><strong className="block text-[13px] cs-text">1.8K</strong><span className="text-[9px] uppercase cs-subtle">Followers</span></span><span><strong className="flex items-center justify-center gap-1 text-[13px] cs-text"><TrendingUp aria-hidden className="h-3 w-3 text-emerald-500" />4.9</strong><span className="text-[9px] uppercase cs-subtle">Rating</span></span></div><div className="flex items-center justify-center gap-0.5 border-t cs-border p-2">{[1, 2, 3, 4, 5].map((star) => <Star key={star} aria-hidden className="h-3 w-3 fill-amber-400 text-amber-400" />)}<span className="ml-1.5 text-[9.5px] cs-subtle">482 reviews</span></div></div>;
  return <section><Heading number="03" title="Rich Profile" detail="collision-aware detail" tone="bg-rose-500/10 text-rose-600 dark:text-rose-400" /><div className="flex justify-center rounded-xl border cs-border cs-input px-2 py-8"><Tip rich label={card}><button type="button" onClick={() => setFollowing((current) => !current)} aria-pressed={following} className={triggerClass}><User aria-hidden className="h-3.5 w-3.5" />{following ? "Following Alex" : "View Alex"}</button></Tip></div><p aria-live="polite" className="mt-2 text-center text-[10px] cs-subtle">{following ? "You are following Alex." : "Select the profile to follow Alex."}</p></section>;
}
