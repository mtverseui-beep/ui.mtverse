"use client";
import { motion } from "framer-motion";
import { ArrowRight, Key, Terminal } from "lucide-react";
export function CtaDeveloperApiCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#000000", fontFamily: "var(--font-jetbrains), ui-monospace, monospace", color: "#22c55e" }}>
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 3px)" }} />
      <div className="relative mx-auto max-w-3xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div><p className="text-xs uppercase tracking-[0.3em] text-emerald-500/60">{"// developer_api"}</p><h2 className="mt-3 text-3xl font-bold" style={{ color: "#22c55e", textShadow: "0 0 15px rgba(34,197,94,0.3)", letterSpacing: "-0.03em" }}>Build with our API.</h2><p className="mt-2 text-xs text-emerald-500/60">Full REST + GraphQL. SDKs in 5 languages. 99.99% uptime SLA.</p><div className="mt-4 space-y-2">{[{icon:Key,t:"Get free API key"},{icon:Terminal,t:"CLI tools included"}].map((f,i) => <div key={i} className="flex items-center gap-2 text-xs text-emerald-400"><f.icon className="h-3.5 w-3.5" />{f.t}</div>)}<a href="#" onClick={(e)=>e.preventDefault()} className="group mt-3 inline-flex items-center gap-1.5 rounded bg-emerald-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-emerald-400">Get API key <ArrowRight className="h-3 w-3" /></a></div></div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-emerald-500/20 bg-black/50 p-4"><div className="mb-2 flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" /></div><pre className="text-xs leading-relaxed text-emerald-400">{`$ curl https://api.dev.sh/v1 \\
  -H "Authorization: Bearer sk_..." \\
  -d '{"action":"create"}'

{ "id": "obj_8x2k",
  "status": "created" }`}</pre></motion.div>
        </div>
      </div>
    </section>
  );
}
