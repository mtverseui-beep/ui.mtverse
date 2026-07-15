"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronDown, Globe, Instagram, Twitter, Facebook, Youtube, Mail, MapPin } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 008 — Marketly (Ecommerce Marketplace)
// Off-white + category grid + payment rail + currency/lang selector
// ════════════════════════════════════════════════════════════════════════════

const CATEGORIES: { title: string; items: string[] }[] = [
  { title: "Shop", items: ["New Arrivals", "Bestsellers", "Deals & Clearance", "Gift Cards", "Brand Directory"] },
  { title: "Sell", items: ["Start Selling", "Seller Dashboard", "Fees & Pricing", "Seller Protection", "Logistics"] },
  { title: "Help", items: ["Order Status", "Shipping & Returns", "Size Guide", "Help Center", "Contact Us"] },
  { title: "Company", items: ["About Marketly", "Careers", "Press", "Sustainability", "Investor Relations"] },
];

const PAYMENTS = ["VISA", "MC", "AMEX", "DISC", "PYPL", "APAY", "GPAY", "KLARNA", "AFRM", "SHOP"];

export function Footer008Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#faf9f6",
        color: "#1a1a1a",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Subtle shopping bag pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%231a1a1a' stroke-width='1.5'><path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z'/><path d='M3 6h18'/><path d='M16 10a4 4 0 01-8 0'/></svg>\")",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Service band */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          {[
            { icon: Truck, title: "Free Shipping", sub: "On orders over $50" },
            { icon: RotateCcw, title: "30-Day Returns", sub: "No questions asked" },
            { icon: ShieldCheck, title: "Buyer Protection", sub: "100% secure" },
            { icon: Globe, title: "Worldwide", sub: "Ship to 190+ countries" },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#10b98115", color: "#059669" }}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-black/60">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <MarketlyLogo />
              <span className="text-2xl font-bold tracking-tight">Marketly</span>
            </a>
            <p className="text-sm text-black/60 mb-6 max-w-xs leading-relaxed">
              The marketplace for everything. Shop millions of products from independent sellers and global brands.
            </p>
            <div className="space-y-2 text-sm text-black/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>548 Market St, San Francisco, CA 94104</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-emerald-600" />
                <a href="mailto:help@marketly.com" className="hover:text-emerald-700 transition-colors">help@marketly.com</a>
              </div>
            </div>
            {/* App badges */}
            <div className="mt-6 flex gap-2">
              {["App Store", "Google Play"].map((p) => (
                <a
                  key={p}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: "#1a1a1a", color: "#faf9f6" }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> {p}
                </a>
              ))}
            </div>
          </div>

          {/* Category columns */}
          {CATEGORIES.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/50 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center text-sm text-black/70 hover:text-emerald-700 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-emerald-600 transition-all duration-300 mr-0 group-hover:mr-2" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Currency / Language selectors + Newsletter */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex flex-wrap items-center gap-3">
            <Dropdown label="Ship to" value="United States" options={["United States", "United Kingdom", "Germany", "Japan", "India", "Brazil"]} />
            <Dropdown label="Currency" value="USD $" options={["USD $", "EUR €", "GBP £", "JPY ¥", "INR ₹", "BRL R$"]} />
            <Dropdown label="Language" value="English" options={["English", "Español", "Deutsch", "Français", "日本語", "中文"]} />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 md:justify-end">
            <input
              type="email"
              placeholder="Email for 10% off your first order"
              className="h-11 px-4 rounded-lg text-sm bg-white border outline-none focus:border-emerald-600 transition-colors md:w-72"
              style={{ borderColor: "rgba(0,0,0,0.15)" }}
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-lg text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap"
              style={{ background: "#059669", color: "#fff" }}
            >
              Get 10% off
            </button>
          </form>
        </div>

        {/* Payment rail */}
        <div className="py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-xs text-black/50">© {new Date().getFullYear()} Marketly, Inc. We accept:</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {PAYMENTS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="px-2 py-1 rounded text-[10px] font-bold tracking-wider"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#1a1a1a",
                  fontFamily: "var(--font-jetbrains), monospace",
                  minWidth: "44px",
                  textAlign: "center",
                }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-5 text-xs text-black/60">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">Cookie Settings</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-700 transition-colors">Do Not Sell My Info</a>
          </div>
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Dropdown ───────────────────────────────────────────────────────────────
function Dropdown({ label, value, options }: { label: string; value: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border text-xs font-medium transition-colors"
        style={{ background: "#fff", borderColor: "rgba(0,0,0,0.15)", color: "#1a1a1a" }}
      >
        <span className="text-black/50">{label}:</span>
        {selected}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 left-0 w-56 rounded-lg border shadow-lg py-1 z-20"
              style={{ background: "#fff", borderColor: "rgba(0,0,0,0.1)" }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSelected(opt); setOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-black/5 transition-colors"
                  style={{ color: opt === selected ? "#059669" : "#1a1a1a" }}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Marketly logo — shopping bag glyph ─────────────────────────────────────
function MarketlyLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="mk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path d="M14 18 L10 56 h44 l-4 -38 z" fill="url(#mk-grad)" />
      <path d="M22 24 v-4 a10 10 0 0 1 20 0 v 4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="38" r="3" fill="#fff" />
    </svg>
  );
}
