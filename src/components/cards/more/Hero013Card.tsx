"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Inbox, BarChart3, Settings, Star } from "lucide-react";
const ACCENT = "#4f46e5";
const TABS = [{ id: "inbox", label: "Inbox", icon: Inbox }, { id: "analytics", label: "Analytics", icon: BarChart3 }, { id: "settings", label: "Settings", icon: Settings }];
const INBOX_ITEMS = [{ from: "Sarah Chen", subject: "Q4 roadmap review", time: "2m", unread: true }, { from: "GitHub", subject: "PR #482 merged", time: "1h", unread: true }, { from: "Marcus Lee", subject: "Design feedback", time: "3h", unread: false }, { from: "Stripe", subject: "Invoice paid", time: "5h", unread: false }];
export function Hero013Card() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="relative min-h-full bg-white overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 mb-6"><span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />New: Flowstate 3.0</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-5">The workspace<br />that <span style={{ color: ACCENT }}>flows</span> with you</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base md:text-lg text-slate-500 max-w-md mb-8">Unify your inbox, analytics, and settings in one beautiful interface. Try the live demo →</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
              <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 24px ${ACCENT}30` }}>Get started free<ArrowRight className="w-4 h-4" /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Book a demo</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-center gap-4">
              <div className="flex -space-x-2">{["#4f46e5","#06b6d4","#10b981","#f59e0b","#ef4444"].map((c, i) => (<div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>{String.fromCharCode(65 + i)}</div>))}</div>
              <div><div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div><p className="text-xs text-slate-500 mt-0.5">Rated 4.9/5 by 3,200+ teams</p></div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100"><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /></div><span className="text-xs text-slate-400 font-mono">app.flowstate.io</span><div className="w-12" /></div>
              <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-100 bg-slate-50/50">{TABS.map((tab) => { const Icon = tab.icon; const isActive = activeTab === tab.id; return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${isActive ? "text-white" : "text-slate-500 hover:text-slate-800"}`} style={isActive ? { background: ACCENT } : {}}><Icon className="w-3.5 h-3.5" />{tab.label}</button>); })}</div>
              <div className="p-4 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {activeTab === "inbox" && (<motion.div key="inbox" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-1">{INBOX_ITEMS.map((item, i) => (<div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"><div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold flex-shrink-0">{item.from[0]}</div><div className="flex-1 min-w-0"><p className={`text-sm truncate ${item.unread ? "font-semibold text-slate-900" : "text-slate-600"}`}>{item.from}</p><p className={`text-xs truncate ${item.unread ? "text-slate-700" : "text-slate-400"}`}>{item.subject}</p></div><span className="text-[10px] text-slate-400 flex-shrink-0">{item.time}</span>{item.unread && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />}</div>))}</motion.div>)}
                  {activeTab === "analytics" && (<motion.div key="analytics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}><div className="grid grid-cols-3 gap-3 mb-4">{[{ label: "Revenue", value: "$84.2K", change: "+12%" }, { label: "Users", value: "12.8K", change: "+8%" }, { label: "Churn", value: "1.2%", change: "-0.3%" }].map((stat) => (<div key={stat.label} className="rounded-lg border border-slate-100 p-3"><p className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</p><p className="text-lg font-bold text-slate-900 mt-1">{stat.value}</p><p className="text-[10px] text-emerald-600 mt-0.5">{stat.change}</p></div>))}</div><div className="rounded-lg border border-slate-100 p-4 h-32 flex items-end gap-1.5">{[40,65,45,80,55,70,90,60,75,85,50,95,70,80].map((h, i) => (<div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i > 10 ? ACCENT : `${ACCENT}30` }} />))}</div></motion.div>)}
                  {activeTab === "settings" && (<motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">{[{ label: "Email notifications", desc: "Get notified about new messages", enabled: true }, { label: "Dark mode", desc: "Use dark theme across the app", enabled: false }, { label: "Two-factor auth", desc: "Extra security for your account", enabled: true }, { label: "Weekly digest", desc: "Summary every Monday", enabled: true }].map((setting) => (<div key={setting.label} className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-900">{setting.label}</p><p className="text-xs text-slate-400">{setting.desc}</p></div><div className="w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer" style={{ background: setting.enabled ? ACCENT : "#e2e8f0" }}><div className={`w-5 h-5 rounded-full bg-white transition-transform ${setting.enabled ? "translate-x-4" : ""}`} /></div></div>))}</motion.div>)}
                </AnimatePresence>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }} transition={{ duration: 0.5, delay: 0.8 }} className="absolute -bottom-4 -left-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-600" /></div><div><p className="text-xs font-semibold text-slate-900">All synced</p><p className="text-[10px] text-slate-400">Just now</p></div></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
