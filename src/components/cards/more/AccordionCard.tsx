"use client";

import { useId, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, CreditCard, RefreshCw, Shield, Truck, type LucideIcon } from "lucide-react";

type Entry = { id: string; question: string; answer: string; meta: string; icon?: LucideIcon; color?: string };
const FAQS: Entry[] = [
  { id: "trial", question: "How does the free trial work?", answer: "You get 14 days of full access with no credit card required. We send a reminder before the trial expires.", meta: "14-day trial · No card required" },
  { id: "plan", question: "Can I change my plan later?", answer: "Upgrade or downgrade at any time. Changes take effect immediately and billing differences are prorated.", meta: "Prorated · Instant" },
  { id: "payment", question: "What payment methods do you accept?", answer: "We accept major cards, PayPal, Apple Pay, Google Pay, and bank transfers for annual plans.", meta: "Cards · PayPal · ACH" },
];
const POLICIES: Entry[] = [
  { id: "shipping", question: "Free Shipping", answer: "Orders over $50 ship free. Standard delivery takes 3–5 business days.", meta: "3–5 days · $50+", icon: Truck, color: "#10b981" },
  { id: "secure", question: "Secure Payment", answer: "Payments use encrypted connections and card details are never stored by us.", meta: "SSL · PCI DSS L1", icon: Shield, color: "#3b82f6" },
  { id: "billing", question: "Flexible Billing", answer: "Choose monthly or annual billing, and cancel without cancellation fees.", meta: "Monthly · Annual", icon: CreditCard, color: "#8b5cf6" },
  { id: "returns", question: "30-Day Returns", answer: "Return eligible items within 30 days for a full refund with return shipping covered.", meta: "30 days · Free returns", icon: RefreshCw, color: "#f59e0b" },
];

export function AccordionCard() {
  return <div className="w-[min(100%,640px)] space-y-10"><AccordionDemo entries={FAQS} defaultValue="trial" title="Chevron" detail="single, collapsible" tone="text-sky-600 bg-sky-500/10 dark:text-sky-400" /><AccordionDemo entries={FAQS} defaultValue="plan" title="Plus / Minus" detail="controlled state" tone="text-indigo-600 bg-indigo-500/10 dark:text-indigo-400" plusMinus /><AccordionDemo entries={POLICIES} defaultValue="shipping" title="Policy Cards" detail="icons and highlights" tone="text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" cards /></div>;
}

function AccordionDemo({ entries, defaultValue, title, detail, tone, plusMinus = false, cards = false }: { entries: Entry[]; defaultValue: string; title: string; detail: string; tone: string; plusMinus?: boolean; cards?: boolean }) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  return <section aria-labelledby={`${id}-heading`}><header className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1"><span className={`flex h-6 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-wider ${tone}`}>{cards ? "03" : plusMinus ? "02" : "01"}</span><h3 id={`${id}-heading`} className="text-[12px] font-bold cs-text">{title}</h3><span className="text-[10.5px] cs-subtle">— {detail}</span></header><Accordion.Root type="single" collapsible value={value} onValueChange={setValue} className="space-y-2">
        {entries.map((entry) => { const open = value === entry.id; const Icon = entry.icon; return <Accordion.Item key={entry.id} value={entry.id} className={`overflow-hidden rounded-xl border transition-colors motion-reduce:transition-none ${cards ? "border-2" : "cs-border"}`} style={{ background: open && entry.color ? `${entry.color}0d` : "var(--card-input-bg)", borderColor: cards ? (open ? entry.color : "var(--card-border)") : undefined }}><Accordion.Header><Accordion.Trigger className="group flex w-full items-center gap-3 px-3 py-3 text-left transition cs-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none">{Icon && <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors motion-reduce:transition-none" style={{ background: open ? entry.color : `${entry.color}18` }}><Icon className="h-4 w-4" style={{ color: open ? "white" : entry.color }} /></span>}<span className="min-w-0 flex-1"><span className="block text-[12.5px] font-semibold cs-text">{entry.question}</span>{cards && <span className="block text-[10px] cs-subtle">{entry.meta}</span>}</span>{plusMinus ? <span aria-hidden className="relative h-4 w-4 shrink-0 cs-muted before:absolute before:left-0 before:top-[7px] before:h-0.5 before:w-4 before:bg-current after:absolute after:left-[7px] after:top-0 after:h-4 after:w-0.5 after:bg-current after:transition-transform group-data-[state=open]:after:scale-y-0 motion-reduce:after:transition-none" /> : <ChevronDown aria-hidden className="h-4 w-4 shrink-0 cs-subtle transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none" />}</Accordion.Trigger></Accordion.Header><Accordion.Content className="overflow-hidden text-[11.5px] cs-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"><div className={Icon ? "pb-3 pl-3 pr-3 sm:pl-[60px]" : "px-4 pb-3"}><p className="leading-relaxed">{entry.answer}</p>{!cards && <span className="mt-2 inline-flex max-w-full rounded-md bg-black/[.05] px-2 py-0.5 text-[9.5px] font-semibold cs-muted dark:bg-white/[.06]">{entry.meta}</span>}</div></Accordion.Content></Accordion.Item>; })}
      </Accordion.Root><p aria-live="polite" className="sr-only">{value ? `${entries.find((entry) => entry.id === value)?.question} expanded` : "All sections collapsed"}</p></section>;
}
