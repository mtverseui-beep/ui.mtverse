"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
const SLOTS = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
export function CtaDemoBookingCard() {
  const [slot, setSlot] = useState("2:00 PM");
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-emerald-500" /><span className="text-xs font-bold uppercase tracking-widest text-emerald-600" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Book a Demo</span></div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">See it live. 30 minutes.</h2>
        <p className="mt-1 text-sm text-slate-500">Pick a time that works for you. We'll show you the platform and answer your questions.</p>
        <div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-600"><Clock className="h-3.5 w-3.5" /> Tomorrow · {slot}</div><div className="grid grid-cols-3 gap-2">{SLOTS.map(s => <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border py-2 text-xs font-medium transition-all ${slot === s ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s}</button>)}</div></div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">Book demo <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
