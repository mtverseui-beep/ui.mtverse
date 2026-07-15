"use client";

import { motion } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Feature011 — Integration Features with REAL brand SVG logos
// ════════════════════════════════════════════════════════════════════════════

const INTEGRATIONS = [
  { name: "Slack", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><path fill="#E01E5A" d="M5 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5z" /><path fill="#36C5F0" d="M9 5a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5z" /><path fill="#2EB67D" d="M19 9a2 2 0 1 1 2 2v2h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5z" /><path fill="#ECB22E" d="M15 19a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5z" /></svg>, category: "Communication", users: "500K+" },
  { name: "GitHub", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#181717"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 22 12.3C22 6.6 17.5 2 12 2z" /></svg>, category: "Developer", users: "1.2M+" },
  { name: "Notion", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#000"><path d="M4 4h12l4 4v12H4V4zm2 2v12h12V9.8L14.2 6H6zm3 3h2v6l3-6h2v8h-2v-4l-2 4h-3V9z" /></svg>, category: "Productivity", users: "300K+" },
  { name: "Linear", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><defs><linearGradient id="lin-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5E6AD2" /><stop offset="100%" stopColor="#4750B5" /></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#lin-grad)" /><path fill="#fff" d="M5 14.5L9.5 19H7L5 17v-2.5zM5 11l8 8h-2.5L5 13.5V11zm0-3.5L16.5 19H14L5 10.5V7.5zM5 4l15 15v-3L8 4H5z" opacity="0.95" /></svg>, category: "Project Mgmt", users: "150K+" },
  { name: "Figma", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><path fill="#F24E1E" d="M8 2h4v6H8a3 3 0 1 1 0-6z" /><path fill="#FF7262" d="M12 2h4a3 3 0 1 1 0 6h-4V2z" /><path fill="#A259FF" d="M12 8h4a3 3 0 1 1 0 6h-4V8z" /><path fill="#1ABCFE" d="M8 8h4v6H8a3 3 0 1 1 0-6z" /><path fill="#0ACF83" d="M8 14h4v3a3 3 0 1 1-4-3z" /></svg>, category: "Design", users: "400K+" },
  { name: "Vercel", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#000"><path d="M12 4L2 20h20L12 4z" /></svg>, category: "DevOps", users: "200K+" },
  { name: "Stripe", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><path fill="#635BFF" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" opacity="0.1" /><path fill="#635BFF" d="M13.5 9.5c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V5.7C17.8 5.1 16.4 4.9 15 4.9c-3.5 0-5.8 1.8-5.8 4.8 0 4.7 6.5 3.9 6.5 5.9 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.4v3.9c1.7.7 3.4 1 4.9 1 3.6 0 6-1.8 6-4.8 0-5-6.5-4.1-6.5-5.9z" /></svg>, category: "Payments", users: "800K+" },
  { name: "Zapier", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#FF4A00"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" /></svg>, category: "Automation", users: "600K+" },
  { name: "Discord", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#5865F2"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5c1.5.4 2.7.9 3.9 1.6a13.3 13.3 0 0 0-11.8 0c1.2-.7 2.5-1.2 3.9-1.6L11 3a19.8 19.8 0 0 0-5 1.4C2.9 7.5 2.2 10.6 2.3 13.6a14 14 0 0 0 4.3 2.2l.5-.8c-.8-.3-1.6-.7-2.3-1.2l.5-.4a10 10 0 0 0 8.5 0l.5.4c-.7.5-1.5.9-2.3 1.2l.5.8a14 14 0 0 0 4.3-2.2c.2-3.5-.6-6.6-2.8-9.2zM9 12c-.8 0-1.5-.8-1.5-1.7S8.2 8.6 9 8.6s1.5.8 1.5 1.7S9.8 12 9 12zm6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z" /></svg>, category: "Community", users: "350K+" },
  { name: "Jira", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><path fill="#2684FF" d="M12 2L2 12h5v5l5-5 5 5v-5h5L12 2z" opacity="0.9" /><path fill="#0052CC" d="M12 12l5 5v3l-5-5-5 5v-3l5-5z" /></svg>, category: "Project Mgmt", users: "900K+" },
  { name: "Asana", svg: <svg viewBox="0 0 24 24" className="h-7 w-7"><circle cx="12" cy="12" r="10" fill="#F06A6A" /><circle cx="8" cy="13" r="2.5" fill="#fff" /><circle cx="14" cy="9" r="2.5" fill="#fff" /><circle cx="15" cy="15" r="2.5" fill="#fff" /></svg>, category: "Project Mgmt", users: "250K+" },
  { name: "HubSpot", svg: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#FF7A59"><circle cx="12" cy="14" r="4" fill="none" stroke="#FF7A59" strokeWidth="2" /><circle cx="17" cy="6" r="2" /><path d="M15 8L12 11" stroke="#FF7A59" strokeWidth="2" /><circle cx="6" cy="9" r="1.5" /></svg>, category: "Marketing", users: "180K+" },
];

const CATEGORIES = ["All", "Communication", "Developer", "Productivity", "Project Mgmt", "Design", "DevOps", "Payments", "Automation", "Community", "Marketing"];

export function FeatureIntegrationCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">200+ Integrations</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Works with your stack.</h2>
          <p className="mt-3 text-base text-slate-500">Connect your favorite tools in one click. Real brands, real data, real workflows.</p>
        </div>

        {/* Category pills */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.slice(0, 6).map((cat, i) => (
            <button key={cat} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${i === 0 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Integration grid with REAL brand logos */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {INTEGRATIONS.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-shadow hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-100">
                {integration.svg}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{integration.name}</p>
                <p className="text-[10px] text-slate-400">{integration.category}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {integration.users} users
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>200+</p>
            <p className="text-xs text-slate-500">Integrations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>5.8M</p>
            <p className="text-xs text-slate-500">Active connections</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>99.9%</p>
            <p className="text-xs text-slate-500">Uptime</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="text-sm font-semibold text-indigo-600 hover:underline">Browse all 200+ integrations →</button>
        </div>
      </div>
    </section>
  );
}
