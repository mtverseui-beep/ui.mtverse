"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Archive, Check, ChevronDown, ChevronRight, Copy, Download, Edit3, Eye, FileText, FolderOpen, Image as ImageIcon, Link2, Mail, MessageCircle, MoreHorizontal, Share2, Star, Trash2, Video } from "lucide-react";

const contentClass = "z-50 max-h-[min(320px,var(--radix-dropdown-menu-content-available-height))] min-w-52 overflow-y-auto rounded-xl border cs-border cs-surface p-1.5 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 motion-reduce:animate-none";
const itemClass = "flex min-h-9 cursor-default select-none items-center gap-2.5 rounded-lg px-2.5 text-[12px] font-medium cs-muted outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-black/[.06] data-[highlighted]:cs-text dark:data-[highlighted]:bg-white/[.08]";
const triggerClass = "flex min-h-10 items-center gap-2 rounded-xl border cs-border cs-input px-4 py-2 text-[12px] font-semibold cs-text shadow-sm transition cs-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none";

export function DropdownMenuCard() {
  return <div className="w-[min(100%,640px)] space-y-10"><ActionMenu /><PreferenceMenu /><NestedMenu /></div>;
}

function Heading({ number, title, detail, tone }: { number: string; title: string; detail: string; tone: string }) {
  return <header className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1"><span className={`flex h-6 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-wider ${tone}`}>{number}</span><h3 className="text-[12px] font-bold cs-text">{title}</h3><span className="text-[10.5px] cs-subtle">— {detail}</span></header>;
}

function MenuPortal({ children, align = "center" }: { children: React.ReactNode; align?: "start" | "center" | "end" }) {
  return <DropdownMenu.Portal><DropdownMenu.Content align={align} sideOffset={8} collisionPadding={12} avoidCollisions sticky="partial" className={contentClass}>{children}<DropdownMenu.Arrow className="fill-[var(--card-surface)]" /></DropdownMenu.Content></DropdownMenu.Portal>;
}

function ActionMenu() {
  const [open, setOpen] = useState(false);
  const [starred, setStarred] = useState(true);
  const [status, setStatus] = useState("No action selected");
  return <section><Heading number="01" title="Action Menu" detail="selection and shortcuts" tone="bg-blue-500/10 text-blue-600 dark:text-blue-400" /><div className="flex justify-center py-4"><DropdownMenu.Root open={open} onOpenChange={setOpen}><DropdownMenu.Trigger className={triggerClass}>Actions<ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} /></DropdownMenu.Trigger>
<MenuPortal><DropdownMenu.Label className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider cs-subtle">Document</DropdownMenu.Label><DropdownMenu.Item className={itemClass} onSelect={() => setStatus("Viewed document details")}><Eye aria-hidden className="h-3.5 w-3.5" />View details</DropdownMenu.Item><DropdownMenu.Item className={itemClass} onSelect={() => setStatus("Opened document editor")}><Edit3 aria-hidden className="h-3.5 w-3.5" />Edit</DropdownMenu.Item><DropdownMenu.Item className={itemClass} onSelect={() => setStatus("Link ready to copy")}><Copy aria-hidden className="h-3.5 w-3.5" />Copy link</DropdownMenu.Item><DropdownMenu.Separator className="my-1 h-px bg-[var(--card-border)]" /><DropdownMenu.CheckboxItem className={itemClass} checked={starred} onCheckedChange={(value) => { const next = value === true; setStarred(next); setStatus(next ? "Document starred" : "Star removed"); }}><span className="flex h-4 w-4 items-center justify-center"><DropdownMenu.ItemIndicator><Check aria-hidden className="h-3.5 w-3.5" /></DropdownMenu.ItemIndicator></span><Star aria-hidden className="h-3.5 w-3.5 text-amber-500" />Keep starred</DropdownMenu.CheckboxItem><DropdownMenu.Separator className="my-1 h-px bg-[var(--card-border)]" /><DropdownMenu.Item className={`${itemClass} text-rose-600 data-[highlighted]:text-rose-700 dark:text-rose-400`} onSelect={() => setStatus("Delete action selected")}><Trash2 aria-hidden className="h-3.5 w-3.5" />Delete</DropdownMenu.Item></MenuPortal></DropdownMenu.Root></div><p aria-live="polite" className="text-center text-[10.5px] cs-subtle">{status}</p></section>;
}

function PreferenceMenu() {
  const [view, setView] = useState("comfortable");
  const [downloaded, setDownloaded] = useState(false);
  return <section><Heading number="02" title="View Menu" detail="radio and checkbox items" tone="bg-violet-500/10 text-violet-600 dark:text-violet-400" /><div className="flex justify-center py-4"><DropdownMenu.Root><DropdownMenu.Trigger className={triggerClass}><MoreHorizontal aria-hidden className="h-4 w-4" />Preferences</DropdownMenu.Trigger><MenuPortal><DropdownMenu.Label className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider cs-subtle">Layout density</DropdownMenu.Label><DropdownMenu.RadioGroup value={view} onValueChange={setView}>{["compact", "comfortable", "spacious"].map((option) => <DropdownMenu.RadioItem key={option} value={option} className={itemClass}><span className="flex h-4 w-4 items-center justify-center"><DropdownMenu.ItemIndicator><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /></DropdownMenu.ItemIndicator></span><span className="capitalize">{option}</span></DropdownMenu.RadioItem>)}</DropdownMenu.RadioGroup><DropdownMenu.Separator className="my-1 h-px bg-[var(--card-border)]" /><DropdownMenu.CheckboxItem checked={downloaded} onCheckedChange={(value) => setDownloaded(value === true)} className={itemClass}><span className="flex h-4 w-4 items-center justify-center"><DropdownMenu.ItemIndicator><Check aria-hidden className="h-3.5 w-3.5" /></DropdownMenu.ItemIndicator></span><Download aria-hidden className="h-3.5 w-3.5" />Download automatically</DropdownMenu.CheckboxItem></MenuPortal></DropdownMenu.Root></div><p aria-live="polite" className="text-center text-[10.5px] cs-subtle"><span className="capitalize">{view}</span> density · Auto-download {downloaded ? "on" : "off"}</p></section>;
}

const destinations = [{ label: "Email", icon: Mail }, { label: "Messages", icon: MessageCircle }, { label: "Copy link", icon: Link2 }];
const exportTypes = [{ label: "Document", icon: FileText }, { label: "Image", icon: ImageIcon }, { label: "Video", icon: Video }];

function NestedMenu() {
  const [status, setStatus] = useState("Choose a nested action");
  const sub = (label: string, icon: React.ReactNode, items: { label: string; icon: typeof FileText }[]) => <DropdownMenu.Sub><DropdownMenu.SubTrigger className={itemClass}>{icon}{label}<ChevronRight aria-hidden className="ml-auto h-3.5 w-3.5" /></DropdownMenu.SubTrigger><DropdownMenu.Portal><DropdownMenu.SubContent sideOffset={6} alignOffset={-5} collisionPadding={12} avoidCollisions className={contentClass}>{items.map(({ label: itemLabel, icon: Icon }) => <DropdownMenu.Item key={itemLabel} className={itemClass} onSelect={() => setStatus(`${label}: ${itemLabel}`)}><Icon aria-hidden className="h-3.5 w-3.5" />{itemLabel}</DropdownMenu.Item>)}</DropdownMenu.SubContent></DropdownMenu.Portal></DropdownMenu.Sub>;
  return <section><Heading number="03" title="Nested Menu" detail="portal and collision-aware submenus" tone="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" /><div className="flex justify-center py-4"><DropdownMenu.Root><DropdownMenu.Trigger className={triggerClass}><Share2 aria-hidden className="h-4 w-4" />Share or export</DropdownMenu.Trigger><MenuPortal>{sub("Share", <Share2 aria-hidden className="h-3.5 w-3.5" />, destinations)}{sub("Export", <FolderOpen aria-hidden className="h-3.5 w-3.5" />, exportTypes)}<DropdownMenu.Separator className="my-1 h-px bg-[var(--card-border)]" /><DropdownMenu.Item className={itemClass} onSelect={() => setStatus("Archived")}><Archive aria-hidden className="h-3.5 w-3.5" />Archive</DropdownMenu.Item></MenuPortal></DropdownMenu.Root></div><p aria-live="polite" className="text-center text-[10.5px] cs-subtle">{status}</p></section>;
}
