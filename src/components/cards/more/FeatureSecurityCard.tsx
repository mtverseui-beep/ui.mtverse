"use client";
import { motion } from "framer-motion";
import { Shield, Lock, Key, FileCheck, Eye, Server } from "lucide-react";
const ITEMS = [{ icon: Shield, title: "SOC 2 Type II", desc: "Audited and certified annually." }, { icon: Lock, title: "End-to-end encryption", desc: "AES-256 at rest, TLS 1.3 in transit." }, { icon: Key, title: "SSO + SAML", desc: "Okta, Azure AD, Google Workspace." }, { icon: FileCheck, title: "Audit logs", desc: "Every action tracked and exportable." }, { icon: Eye, title: "Privacy first", desc: "GDPR, CCPA, and HIPAA compliant." }, { icon: Server, title: "Data residency", desc: "EU, US, or APAC data regions." }];
export function FeatureSecurityCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center"><span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"><Shield className="h-3 w-3" /> Security</span><h2 className="mt-4 text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Security is not optional.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400"><item.icon className="h-4 w-4" /></div><h3 className="mt-3 text-sm font-bold text-white">{item.title}</h3><p className="mt-1 text-xs text-white/50">{item.desc}</p></motion.div>))}
        </div>
      </div>
    </section>
  );
}
