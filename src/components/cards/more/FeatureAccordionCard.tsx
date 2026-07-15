"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
const ITEMS = [{ q: "How does the AI work?", a: "Our AI uses GPT-4 to analyze your data, identify patterns, and generate actionable insights automatically. It learns from your team's behavior to improve suggestions over time." }, { q: "Can I integrate with my existing tools?", a: "Yes! We support 200+ integrations including Slack, GitHub, Notion, Linear, Jira, and more. You can also use our REST API and webhooks for custom integrations." }, { q: "Is my data secure?", a: "Absolutely. We're SOC 2 Type II certified, use AES-256 encryption at rest, TLS 1.3 in transit, and offer SSO/SAML, audit logs, and data residency options." }, { q: "What's the pricing?", a: "We offer flexible plans starting at $0 for individuals. Team plans start at $29/month, and enterprise plans include dedicated support, SSO, and custom SLAs." }];
export function FeatureAccordionCard() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-6 py-20" style={{ background: "#fafafa", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-2xl"><h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Frequently asked.</h2>
        <div className="space-y-3">{ITEMS.map((item, i) => (<div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between p-4 text-left"><span className="text-sm font-semibold text-slate-900">{item.q}</span><motion.span animate={{ rotate: open === i ? 45 : 0 }}><Plus className="h-4 w-4 text-slate-400" /></motion.span></button><AnimatePresence initial={false}>{open === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><p className="p-4 pt-0 text-sm text-slate-600">{item.a}</p></motion.div>)}</AnimatePresence></div>))}</div>
      </div>
    </section>
  );
}
