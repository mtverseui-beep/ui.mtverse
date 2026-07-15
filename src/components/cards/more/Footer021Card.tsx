"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 021 — MAISON (Dark Luxury)
// True black + gold gradient serif + thin gold line + sweep hover
// Cormorant Garamond display + uppercase tracking
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Maison", links: ["Heritage", "Savoir-Faire", "Ateliers", "Sustainability", "Press"] },
  { title: "Collections", links: ["Haute Couture", "Ready-to-Wear", "Leather Goods", "Fine Jewelry", "Fragrances"] },
  { title: "Client", links: ["Book an Appointment", "Personal Shopper", "Repairs & Care", "Bespoke Orders", "Shipping"] },
  { title: "Discover", links: ["The Journal", "Campaigns", "Events", "Careers", "Contact"] },
];

export function Footer021Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#000000",
        color: "#e5e2d9",
        fontFamily: "var(--font-cormorant), Georgia, serif",
      }}
    >
      {/* Subtle gold radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(196,163,90,0.1) 0%, transparent 70%)" }} />

      {/* Top gold hairline */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.6), transparent)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top: brand monogram + tagline */}
        <div className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <MaisonMonogram />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-[0.15em] mt-6" style={{ letterSpacing: "0.2em", backgroundImage: "linear-gradient(135deg, #d4af37 0%, #f4e5b1 50%, #c4a35a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              MAISON
            </h1>
            <p className="text-sm md:text-base uppercase tracking-[0.5em] mt-4" style={{ color: "#a89968", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.5em" }}>
              Paris · Est. MCMXIV
            </p>
          </motion.div>
        </div>

        {/* Thin gold divider */}
        <div className="mx-auto w-24 h-px" style={{ background: "linear-gradient(90deg, transparent, #c4a35a, transparent)" }} />

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Newsletter */}
          <div className="col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#a89968", fontFamily: "var(--font-jetbrains), monospace" }}>
              The Private List
            </p>
            <p className="text-2xl md:text-3xl leading-tight mb-6 italic" style={{ color: "#e5e2d9" }}>
              Receive private invitations,<br />advanced previews, and the journal.
            </p>
            <LuxurySubscribe />
            <div className="mt-8 space-y-2 text-sm" style={{ color: "#a89968", fontFamily: "var(--font-jetbrains), monospace" }}>
              <p className="flex items-start gap-2.5"><Mail className="w-3.5 h-3.5 mt-1" style={{ color: "#c4a35a" }} /> client.relations@maison-paris.com</p>
              <p className="flex items-start gap-2.5"><Phone className="w-3.5 h-3.5 mt-1" style={{ color: "#c4a35a" }} /> +33 (0)1 47 03 12 14</p>
              <p className="flex items-start gap-2.5"><MapPin className="w-3.5 h-3.5 mt-1" style={{ color: "#c4a35a" }} /> 12 Avenue Montaigne, 75008 Paris</p>
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <h4 className="text-xs uppercase tracking-[0.3em] mb-5" style={{ color: "#a89968", fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group relative inline-block text-base tracking-wide transition-colors"
                      style={{ color: "#e5e2d9" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#c4a35a"; e.currentTarget.style.fontStyle = "italic"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#e5e2d9"; e.currentTarget.style.fontStyle = "normal"; }}
                    >
                      <span className="relative">
                        {link}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-500"
                          style={{ background: "linear-gradient(90deg, #c4a35a, transparent)" }}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.4), transparent)" }} />

        {/* Boutiques row */}
        <div className="py-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: "#a89968", fontFamily: "var(--font-jetbrains), monospace" }}>
            Maisons Around the World
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {["Paris", "London", "Milan", "New York", "Tokyo", "Dubai"].map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <p className="text-xl md:text-2xl font-medium tracking-wider transition-colors group-hover:italic" style={{ color: "#e5e2d9" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#c4a35a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#e5e2d9"; }}
                >
                  {city}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "#6b5e3d", fontFamily: "var(--font-jetbrains), monospace" }}>
                  By Appointment
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t flex flex-col md:flex-row items-center justify-between gap-5" style={{ borderColor: "rgba(196,163,90,0.15)" }}>
          <p className="text-xs" style={{ color: "#6b5e3d", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} MAISON PARIS. ALL RIGHTS RESERVED. CRAFTED IN FRANCE.
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: "1px solid rgba(196,163,90,0.3)", color: "#c4a35a" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#c4a35a"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#c4a35a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c4a35a"; e.currentTarget.style.borderColor = "rgba(196,163,90,0.3)"; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]" style={{ color: "#6b5e3d", fontFamily: "var(--font-jetbrains), monospace" }}>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-200 transition-colors">Legal</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-200 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-200 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Luxury subscribe (golden underline) ────────────────────────────────────
function LuxurySubscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) { setDone(true); setEmail(""); setTimeout(() => setDone(false), 3000); } }}
      className="relative inline-flex items-center gap-4 pb-2 border-b transition-colors"
      style={{ borderColor: "rgba(196,163,90,0.4)" }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email address"
        className="bg-transparent outline-none text-base placeholder:text-stone-600 min-w-[200px]"
        style={{ color: "#e5e2d9", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
      />
      <button
        type="submit"
        className="group inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] transition-all"
        style={{ color: done ? "#c4a35a" : "#a89968", fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {done ? "Merci" : "Subscribe"}
        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </form>
  );
}

// ── MAISON monogram — entwined M glyph ─────────────────────────────────────
function MaisonMonogram() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="ms-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e5b1" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#c4a35a" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="none" stroke="url(#ms-grad)" strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="40" r="34" fill="none" stroke="url(#ms-grad)" strokeWidth="0.5" opacity="0.6" />
      <path d="M22 56 L22 24 L40 42 L58 24 L58 56" fill="none" stroke="url(#ms-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="2" fill="url(#ms-grad)" />
    </svg>
  );
}
