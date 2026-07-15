"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, HelpCircle, Shield, CreditCard, Truck, RefreshCw, Headphones } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Mock data: rich FAQ content ──
const FAQS = [
  {
    q: "How does the free trial work?",
    a: "You get 14 days of full access to all features with no credit card required. Cancel anytime before the trial ends and you won't be charged. We'll send you a reminder email 3 days before the trial expires.",
    meta: "14-day trial · No card required",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes, you can upgrade or downgrade at any time from your account settings. Changes take effect immediately and we prorate the difference. Annual plan changes are refunded on a prorated basis too.",
    meta: "Prorated · Instant",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, Google Pay, and bank transfers for annual plans. Invoicing is available for Enterprise customers.",
    meta: "Cards · PayPal · ACH",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest with AES-256 and in transit with TLS 1.3. We're SOC 2 Type II certified, GDPR compliant, and undergo quarterly third-party security audits. We never sell your data.",
    meta: "SOC 2 · GDPR · AES-256",
  },
];

export function AccordionCard() {
  return (
    <motion.div
      className="w-[clamp(340px,95vw,640px)] select-none space-y-10"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <ChevronAccordion />
      <PlusMinusAccordion />
      <CardAccordion />
    </motion.div>
  );
}

// ── 1. Chevron — classic with rotating chevron ──
function ChevronAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-sky-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">01</span>
        <h3 className="text-[12px] font-bold cs-text">Chevron Rotate</h3>
        <span className="text-[10.5px] cs-subtle">— classic pattern</span>
      </header>
      <div className="space-y-2">
        {FAQS.slice(0, 3).map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl border cs-border" style={{ background: "var(--card-input-bg)" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[12.5px] font-semibold cs-text transition cs-hover focus-visible:outline-none"
              >
                <span className="flex-1">{faq.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 cs-subtle" strokeWidth={2.2} />
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3">
                      <p className="text-[11.5px] leading-relaxed cs-muted">{faq.a}</p>
                      <span className="mt-2 inline-flex rounded-md bg-sky-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-sky-600 dark:text-sky-400">
                        {faq.meta}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── 2. Plus/Minus — icon morphs from + to - ──
function PlusMinusAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-indigo-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">02</span>
        <h3 className="text-[12px] font-bold cs-text">Plus / Minus Morph</h3>
        <span className="text-[10.5px] cs-subtle">— icon swap</span>
      </header>
      <div className="space-y-2">
        {FAQS.slice(0, 3).map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl border cs-border" style={{ background: "var(--card-input-bg)" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[12.5px] font-semibold cs-text transition cs-hover focus-visible:outline-none"
              >
                <span className="flex-1">{faq.q}</span>
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <Plus
                    className={`absolute h-4 w-4 transition-all duration-200 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"} text-indigo-500`}
                    strokeWidth={2.2}
                  />
                  <Minus
                    className={`absolute h-4 w-4 transition-all duration-200 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"} text-indigo-500`}
                    strokeWidth={2.2}
                  />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3">
                      <p className="text-[11.5px] leading-relaxed cs-muted">{faq.a}</p>
                      <span className="mt-2 inline-flex rounded-md bg-indigo-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {faq.meta}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── 3. Card — each item is a card with icon + border highlight ──
const POLICY_ITEMS = [
  {
    q: "Free Shipping",
    a: "Free shipping on all orders over $50. Standard delivery takes 3-5 business days. Express delivery (1-2 days) available for an additional fee.",
    icon: Truck,
    color: "#10b981",
    meta: "3-5 days · $50+",
  },
  {
    q: "Secure Payment",
    a: "All payments are processed through encrypted SSL connections. We never store your card details. PCI DSS Level 1 compliant.",
    icon: Shield,
    color: "#3b82f6",
    meta: "SSL · PCI DSS L1",
  },
  {
    q: "Flexible Billing",
    a: "Choose monthly or annual billing. Annual saves you 2 months. Cancel anytime — no questions asked, no cancellation fees.",
    icon: CreditCard,
    color: "#8b5cf6",
    meta: "Monthly · Annual",
  },
  {
    q: "30-Day Returns",
    a: "Not satisfied? Return any item within 30 days for a full refund. We'll even cover the return shipping cost.",
    icon: RefreshCw,
    color: "#f59e0b",
    meta: "30 days · Free returns",
  },
];

function CardAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-6 items-center rounded-md bg-emerald-500/10 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">03</span>
        <h3 className="text-[12px] font-bold cs-text">Card Style</h3>
        <span className="text-[10.5px] cs-subtle">— icon + border highlight</span>
      </header>
      <div className="space-y-2">
        {POLICY_ITEMS.map((item, i) => {
          const isOpen = open === i;
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-xl border-2 transition-colors"
              style={{
                borderColor: isOpen ? item.color : "var(--card-border)",
                background: isOpen ? `${item.color}08` : "var(--card-input-bg)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-3 py-3 text-left focus-visible:outline-none"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{ background: isOpen ? item.color : `${item.color}15` }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: isOpen ? "#fff" : item.color }}
                    strokeWidth={2.2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[12.5px] font-semibold cs-text">{item.q}</span>
                  <span className="block text-[10px] cs-subtle">{item.meta}</span>
                </div>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-3.5 w-3.5 cs-subtle" strokeWidth={2.2} />
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-3 pb-3 pl-15 text-[11.5px] leading-relaxed cs-muted" style={{ paddingLeft: "60px" }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
