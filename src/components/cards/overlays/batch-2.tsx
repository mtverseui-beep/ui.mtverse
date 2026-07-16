"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, UserPlus, Share2, FileText, Search, Bell, Mail, Zap,
  Copy, Check, Link2, Twitter, Facebook, Linkedin, MessageCircle,
  Download, RotateCw, X, ChevronRight, Send, Lock, Globe,
} from "lucide-react";
import { DemoButton, Backdrop, CloseButton, OverlayStage, TriggerCenter, ModalOverlay, PremiumSelect, EASE, SPRING } from "./primitives";

// ════════════════════════════════════════════════════════════════════════════
// BATCH 2 — Components 9-16
// ════════════════════════════════════════════════════════════════════════════

// ─── 9. Settings Modal (tabbed) ─────────────────────────────────────────────
export function SettingsModal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"general" | "notifications" | "appearance">("general");
  const [notif, setNotif] = useState({ email: true, push: false, sms: true });
  const [theme, setTheme] = useState("dark");
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <Settings className="h-4 w-4" /> Settings
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row"
              style={{ border: "1px solid var(--overlay-border)" }}
            >
              {/* Sidebar tabs */}
              <div className="grid w-full shrink-0 grid-cols-3 gap-1 border-b bg-white/10 bg-[#f8fafc] p-2 sm:block sm:w-32 sm:border-b-0 sm:border-r">
                <p className="hidden px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8] sm:block">Settings</p>
                {([
                  { id: "general", label: "General" },
                  { id: "notifications", label: "Notifications" },
                  { id: "appearance", label: "Appearance" },
                ] as const).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative flex w-full items-center rounded-lg px-2.5 py-2 text-[11.5px] font-medium transition"
                    style={{ background: tab === t.id ? "var(--overlay-surface)" : "transparent", color: tab === t.id ? "var(--overlay-text)" : "var(--overlay-muted)" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {/* Content */}
              <div className="flex-1 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-[#1e293b]">Settings</h3>
                  <CloseButton onClick={() => setOpen(false)} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {tab === "general" && (
                      <>
                        <div>
                          <label className="mb-1 block text-[10.5px] font-semibold text-[#64748b]">Display Name</label>
                          <input defaultValue="Alex Morgan" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10.5px] font-semibold text-[#64748b]">Email</label>
                          <input defaultValue="alex@mtverse.dev" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10.5px] font-semibold text-[#64748b]">Bio</label>
                          <textarea defaultValue="Product designer at mtverse." rows={2} className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none resize-none" />
                        </div>
                      </>
                    )}
                    {tab === "notifications" && (
                      <>
                        {([
                          { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                          { key: "push", label: "Push Notifications", desc: "Get alerts on your device" },
                          { key: "sms", label: "SMS Alerts", desc: "Critical alerts via text" },
                        ] as const).map(n => (
                          <div key={n.key} className="flex items-center justify-between rounded-lg border bg-white/10 p-2.5">
                            <div>
                              <p className="text-[12px] font-semibold text-[#1e293b]">{n.label}</p>
                              <p className="text-[10px] text-[#64748b]">{n.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotif(s => ({ ...s, [n.key]: !s[n.key] }))}
                              className="relative h-5 w-9 rounded-full transition"
                              style={{ background: notif[n.key] ? "#10b981" : "var(--overlay-border)" }}
                            >
                              <motion.span layout transition={SPRING} className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow" style={{ left: notif[n.key] ? 18 : 2 }} />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                    {tab === "appearance" && (
                      <>
                        <p className="text-[10.5px] font-semibold text-[#64748b]">Theme</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "light", label: "Light", bg: "#ffffff", fg: "#171717" },
                            { id: "dark", label: "Dark", bg: "#0a0a14", fg: "#ededed" },
                            { id: "system", label: "System", bg: "linear-gradient(135deg, #fff 50%, #0a0a14 50%)", fg: "#888" },
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => setTheme(t.id)}
                              className="overflow-hidden rounded-xl border-2 transition"
                              style={{ borderColor: theme === t.id ? "#8b5cf6" : "var(--overlay-border)" }}
                            >
                              <div className="h-12 w-full" style={{ background: t.bg }} />
                              <p className="py-1 text-center text-[10.5px] font-semibold text-[#1e293b]">{t.label}</p>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-4 flex justify-end gap-2 border-t bg-white/10 pt-3">
                  <DemoButton onClick={() => setOpen(false)} variant="ghost">Cancel</DemoButton>
                  <DemoButton onClick={() => setOpen(false)} color="#8b5cf6">Save Changes</DemoButton>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 10. Invite Team Dialog ─────────────────────────────────────────────────
export function InviteTeamDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const [invited, setInvited] = useState<string[]>(["sarah@mtverse.dev", "john@mtverse.dev"]);
  const [copied, setCopied] = useState(false);
  const link = "https://mtverse.dev/invite/abc123";

  const invite = () => {
    if (email && !invited.includes(email)) {
      setInvited([...invited, email]);
      setEmail("");
    }
  };

  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#3b82f6">
          <UserPlus className="h-4 w-4" /> Invite Team
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15">
                    <UserPlus className="h-4 w-4 text-blue-500" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#1e293b]">Invite to Workspace</h3>
                    <p className="text-[10.5px] text-[#64748b]">{invited.length} members invited</p>
                  </div>
                </div>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              <div className="space-y-3 p-4">
                {/* Email input + role + invite */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && invite()}
                    placeholder="email@company.com"
                    className="flex-1 rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none"
                  />
                  <PremiumSelect
                    value={role}
                    options={["Viewer", "Editor", "Admin"]}
                    onChange={setRole}
                    label="Workspace role"
                  />
                  <DemoButton onClick={invite} color="#3b82f6"><Send className="h-3.5 w-3.5" /></DemoButton>
                </div>
                {/* Invited list */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Pending Invites</p>
                  <AnimatePresence>
                    {invited.map((em, i) => (
                      <motion.div
                        key={em}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2.5 rounded-lg border bg-white/10 p-2"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-[10px] font-bold text-white">
                          {em[0].toUpperCase()}
                        </div>
                        <span className="flex-1 truncate text-[11.5px] text-[#1e293b]">{em}</span>
                        <span className="rounded bg-[#f8fafc] px-1.5 py-0.5 text-[9px] font-semibold text-[#64748b]">{role}</span>
                        <button onClick={() => setInvited(invited.filter(x => x !== em))} className="text-[#64748b] hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {/* Share link */}
                <div className="rounded-lg border bg-white/10 p-2.5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Or share invite link</p>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-1.5 rounded-md bg-[#f8fafc] px-2 py-1.5">
                      <Link2 className="h-3 w-3 text-[#64748b]" />
                      <span className="truncate text-[10.5px] font-mono text-[#64748b]">{link}</span>
                    </div>
                    <button
                      onClick={() => { navigator.clipboard?.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f8fafc] text-[#64748b] transition hover:text-[#1e293b]"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 11. Share Dialog ───────────────────────────────────────────────────────
export function ShareDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [access, setAccess] = useState<"private" | "public" | "link">("link");
  const socials = [
    { icon: Twitter, color: "#1da1f2", label: "Twitter" },
    { icon: Facebook, color: "#1877f2", label: "Facebook" },
    { icon: Linkedin, color: "#0a66c2", label: "LinkedIn" },
    { icon: MessageCircle, color: "#25d366", label: "WhatsApp" },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#8b5cf6">
          <Share2 className="h-4 w-4" /> Share
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <h3 className="text-[14px] font-bold text-[#1e293b]">Share "Project Apollo"</h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              <div className="space-y-4 p-4">
                {/* Social buttons */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Share to</p>
                  <div className="grid grid-cols-4 gap-2">
                    {socials.map(s => {
                      const Icon = s.icon;
                      return (
                        <motion.button
                          key={s.label}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md" style={{ background: s.color }}>
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <span className="text-[9px] font-medium text-[#64748b]">{s.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                {/* Access level */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Access</p>
                  <div className="space-y-1">
                    {([
                      { id: "private", label: "Private — only you", icon: Lock },
                      { id: "link", label: "Anyone with link", icon: Link2 },
                      { id: "public", label: "Public — searchable", icon: Globe },
                    ] as const).map(a => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.id}
                          onClick={() => setAccess(a.id)}
                          className="flex w-full items-center gap-2.5 rounded-lg p-2 transition hover:bg-[#f1f5f9]"
                          style={{ background: access === a.id ? "var(--overlay-surface-2)" : "transparent" }}
                        >
                          <Icon className="h-4 w-4" style={{ color: access === a.id ? "#8b5cf6" : "var(--overlay-muted)" }} />
                          <span className="flex-1 text-left text-[11.5px] font-medium text-[#1e293b]">{a.label}</span>
                          {access === a.id && <Check className="h-3.5 w-3.5 text-violet-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Link copy */}
                <div className="flex items-center gap-2 rounded-lg border bg-white/10 p-2">
                  <input
                    readOnly
                    value="https://mtverse.dev/p/apollo"
                    className="flex-1 bg-transparent text-[11px] font-mono text-[#1e293b] outline-none"
                  />
                  <button
                    onClick={() => { navigator.clipboard?.writeText("https://mtverse.dev/p/apollo"); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                    className="flex items-center gap-1 rounded-md bg-violet-500 px-2.5 py-1.5 text-[10.5px] font-semibold text-white"
                  >
                    {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 12. File Preview Modal ─────────────────────────────────────────────────
export function FilePreviewModal() {
  const [open, setOpen] = useState(false);
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <FileText className="h-4 w-4" /> Preview File
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={SPRING}
              className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid var(--overlay-border)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/15">
                    <FileText className="h-3.5 w-3.5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#1e293b]">proposal.pdf</p>
                    <p className="text-[9.5px] text-[#64748b]">2.4 MB · Modified 2h ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9]"><Download className="h-3.5 w-3.5" /></button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9]"><RotateCw className="h-3.5 w-3.5" /></button>
                  <CloseButton onClick={() => setOpen(false)} />
                </div>
              </div>
              {/* Preview area */}
              <div className="relative flex-1 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="aspect-[8.5/11] h-full max-h-full rounded-md bg-white shadow-xl dark:bg-zinc-800" style={{ width: "auto" }}>
                    <div className="p-6">
                      <div className="mb-3 h-2 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
                      <div className="mb-2 h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mb-2 h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mb-2 h-1.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mb-4 h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mb-2 h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mb-2 h-1.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-20 w-full rounded bg-zinc-100 dark:bg-zinc-700/50" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer pagination */}
              <div className="flex items-center justify-between border-t bg-white/10 px-4 py-2">
                <span className="text-[10.5px] text-[#64748b]">Page 1 of 12</span>
                <div className="flex items-center gap-1">
                  <button className="flex h-6 w-6 items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9] disabled:opacity-30" disabled>‹</button>
                  <span className="text-[10.5px] font-semibold text-[#1e293b]">1 / 12</span>
                  <button className="flex h-6 w-6 items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">›</button>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 13. Search Overlay (fullscreen) ────────────────────────────────────────
export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const recent = ["React hooks", "Tailwind animations", "Framer Motion layout", "Auth patterns"];
  const suggestions = ["Components", "Documentation", "Blog posts", "Showcase"];
  useEffect(() => {
    if (!open) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(focusTimer);
  }, [open]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <Search className="h-4 w-4" /> Search
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col items-center pt-12 bg-black/50 backdrop-blur-md"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={SPRING}
              onClick={e => e.stopPropagation()}
              className="w-[460px] max-w-[92%] overflow-hidden rounded-2xl bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b bg-white/10 px-4 py-3.5">
                <Search className="h-5 w-5 text-[#64748b]" strokeWidth={2} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search anything…"
                  className="flex-1 bg-transparent text-[14px] text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
                />
                <kbd className="rounded border bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-[#64748b]">ESC</kbd>
              </div>
              {/* Results / suggestions */}
              <div className="max-h-[280px] overflow-y-auto p-2">
                {!query && (
                  <>
                    <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8]">Recent</p>
                    {recent.map(r => (
                      <button key={r} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-[#f1f5f9]">
                        <RotateCw className="h-3.5 w-3.5 text-[#94a3b8]" />
                        <span className="flex-1 text-[12px] text-[#1e293b]">{r}</span>
                      </button>
                    ))}
                    <p className="mt-2 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8]">Browse</p>
                    {suggestions.map(s => (
                      <button key={s} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-[#f1f5f9]">
                        <ChevronRight className="h-3.5 w-3.5 text-[#94a3b8]" />
                        <span className="flex-1 text-[12px] text-[#1e293b]">{s}</span>
                      </button>
                    ))}
                  </>
                )}
                {query && (
                  <div className="py-6 text-center">
                    <p className="text-[12px] text-[#64748b]">Search results for</p>
                    <p className="text-[14px] font-bold text-[#1e293b]">"{query}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 14. Notification Panel (right drawer) ──────────────────────────────────
export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: "New comment on your post", desc: "Sarah Chen replied to \"Design System v2\"", time: "2m ago", color: "#3b82f6", unread: true },
    { id: 2, title: "Payment received", desc: "$249.00 from Alex Morgan", time: "1h ago", color: "#10b981", unread: true },
    { id: 3, title: "New follower", desc: "John Doe started following you", time: "3h ago", color: "#8b5cf6", unread: true },
    { id: 4, title: "Weekly report ready", desc: "Your analytics summary is available", time: "1d ago", color: "#f59e0b", unread: false },
    { id: 5, title: "Security alert", desc: "New login from San Francisco", time: "2d ago", color: "#ef4444", unread: false },
  ]);
  const unreadCount = notifs.filter(n => n.unread).length;
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} variant="outline">
          <Bell className="h-4 w-4" /> Notifications {unreadCount > 0 && <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] text-white">{unreadCount}</span>}
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Notifications"
              className="absolute right-0 top-0 z-50 flex h-full w-full max-w-[320px] flex-col bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between border-b bg-white/10 p-4">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                  <Bell className="h-4 w-4" /> Notifications
                  {unreadCount > 0 && <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">{unreadCount}</span>}
                </h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <AnimatePresence>
                  {notifs.map((n, i) => (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, height: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                      className="relative mb-1.5 flex gap-2.5 rounded-xl p-2.5 transition hover:bg-[#f1f5f9]"
                      style={{ background: n.unread ? "var(--overlay-surface-2)" : "transparent" }}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${n.color}20` }}>
                        <div className="h-2 w-2 rounded-full" style={{ background: n.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11.5px] font-semibold text-[#1e293b]">{n.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-[10px] text-[#64748b]">{n.desc}</p>
                        <p className="mt-0.5 text-[9px] text-[#94a3b8]">{n.time}</p>
                      </div>
                      {n.unread && <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-rose-500" />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="border-t bg-white/10 p-3">
                <button
                  onClick={() => setNotifs(n => n.map(x => ({ ...x, unread: false })))}
                  className="w-full rounded-lg py-2 text-center text-[11px] font-semibold text-violet-500 transition hover:bg-[#f1f5f9]"
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 15. Contact Form Modal ─────────────────────────────────────────────────
export function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const canSend = form.name.trim().length > 1 && form.email.includes("@") && form.message.trim().length > 4;
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#06b6d4">
          <Mail className="h-4 w-4" /> Contact Us
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid var(--overlay-border)" }}
            >
              {/* Gradient header */}
              <div className="relative h-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4), transparent 50%)" }} />
                <button onClick={() => setOpen(false)} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-white/80 hover:bg-white/20">
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-white">Get in Touch</h3>
                    <p className="text-[9.5px] text-white/70">We'll respond within 24h</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-6 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                        <Check className="h-7 w-7 text-emerald-500" strokeWidth={2.5} />
                      </div>
                      <p className="mt-3 text-[14px] font-bold text-[#1e293b]">Message Sent!</p>
                      <p className="mt-1 text-[11px] text-[#64748b]">We'll get back to you soon.</p>
                      <DemoButton onClick={() => { setOpen(false); setSent(false); }} color="#10b981" className="mt-4">Done</DemoButton>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <input
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none"
                      />
                      <input
                        type="email"
                        placeholder="email@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none"
                      />
                      <textarea
                        placeholder="Your message…"
                        rows={3}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none"
                      />
                      <DemoButton
                        onClick={() => { if (canSend) setSent(true); }}
                        color="#06b6d4"
                        className={`w-full ${canSend ? "" : "pointer-events-none opacity-45"}`}
                      >
                        <Send className="h-3.5 w-3.5" /> Send Message
                      </DemoButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 16. Upgrade Plan Modal ─────────────────────────────────────────────────
export function UpgradePlanModal() {
  const [open, setOpen] = useState(false);
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  const plans = [
    { name: "Pro", monthly: 19, yearly: 15, color: "#3b82f6", features: ["100 projects", "Advanced analytics", "Priority support"] },
    { name: "Team", monthly: 49, yearly: 39, color: "#8b5cf6", features: ["Unlimited projects", "Team collaboration", "Custom integrations", "Dedicated manager"], popular: true },
    { name: "Enterprise", monthly: 99, yearly: 79, color: "#f59e0b", features: ["Everything in Team", "SSO + SAML", "99.9% SLA", "Custom contracts"] },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#f59e0b">
          <Zap className="h-4 w-4" /> Upgrade
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={() => setOpen(false)} size="wide">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              className="overflow-hidden rounded-2xl bg-white shadow-2xl"
              style={{ border: "1px solid var(--overlay-border)" }}
            >
              <div className="relative overflow-hidden p-5 text-center" style={{ background: "linear-gradient(135deg, #f59e0b20, #ec489920)" }}>
                <div className="absolute right-3 top-3"><CloseButton onClick={() => setOpen(false)} /></div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)" }}>
                  <Zap className="h-6 w-6 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="mt-2 text-[16px] font-bold text-[#1e293b]">Upgrade Your Plan</h3>
                <p className="text-[11px] text-[#64748b]">Unlock premium features and scale faster</p>
                {/* Billing toggle */}
                <div className="mt-3 inline-flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: "var(--overlay-surface-2)", border: "1px solid var(--overlay-border)" }}>
                  {(["monthly", "yearly"] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setCycle(c)}
                      className="rounded-md px-3 py-1 text-[10.5px] font-semibold capitalize transition"
                      style={{ background: cycle === c ? "var(--overlay-surface)" : "transparent", color: cycle === c ? "var(--overlay-text)" : "var(--overlay-muted)" }}
                    >
                      {c} {c === "yearly" && <span className="text-emerald-500">-20%</span>}
                    </button>
                  ))}
                </div>
              </div>
              {/* Plans grid */}
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
                {plans.map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="relative overflow-hidden rounded-xl border-2 p-3"
                    style={{ borderColor: plan.popular ? plan.color : "var(--overlay-border)" }}
                  >
                    {plan.popular && (
                      <span className="absolute right-2 top-2 rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white" style={{ background: plan.color }}>POPULAR</span>
                    )}
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: plan.color }}>{plan.name}</p>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-[22px] font-bold text-[#1e293b]">${cycle === "monthly" ? plan.monthly : plan.yearly}</span>
                      <span className="text-[10px] text-[#64748b]">/mo</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-1 text-[9.5px] text-[#64748b]">
                          <Check className="mt-0.5 h-2.5 w-2.5 shrink-0" style={{ color: plan.color }} strokeWidth={3} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <DemoButton
                      onClick={() => setOpen(false)}
                      color={plan.color}
                      variant={plan.popular ? "solid" : "outline"}
                      className="mt-3 w-full"
                    >
                      Choose {plan.name}
                    </DemoButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}
