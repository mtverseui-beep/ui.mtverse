"use client";
import { motion } from "framer-motion";
import { Terminal, Code2, GitBranch, Webhook } from "lucide-react";
const ITEMS = [{ icon: Code2, title: "REST + GraphQL API", desc: "Full programmatic access to every feature." }, { icon: Terminal, title: "CLI Tools", desc: "Deploy, manage, and debug from your terminal." }, { icon: GitBranch, title: "Git-native", desc: "Auto-deploy on push. Preview branches built-in." }, { icon: Webhook, title: "Webhooks", desc: "Real-time events delivered to your endpoint." }];
export function FeatureDeveloperCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#000000", fontFamily: "var(--font-jetbrains), ui-monospace, monospace", color: "#22c55e" }}>
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 3px)" }} />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-10"><p className="text-xs uppercase tracking-[0.3em] text-emerald-500/60">{"// developer_features"}</p><h2 className="mt-3 text-4xl font-bold tracking-tight" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.4)", letterSpacing: "-0.03em" }}>$ ./deploy --features</h2></div>
        <div className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-lg border border-emerald-500/20 bg-black/50 p-5"><item.icon className="h-4 w-4 text-emerald-500" /><h3 className="mt-2 text-sm font-bold text-emerald-400">{item.title}</h3><p className="mt-1 text-xs text-emerald-500/50">{item.desc}</p></motion.div>))}
        </div>
        <div className="mt-6 rounded-lg border border-emerald-500/20 bg-black/50 p-4"><p className="text-xs text-emerald-500/60">$ curl https://api.devkit.sh/v1/features</p><p className="mt-1 text-xs text-emerald-400">{`{ "status": "ok", "features": 24, "api": "v1" }`}</p></div>
      </div>
    </section>
  );
}
