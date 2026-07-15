"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, ChevronRight, ChevronLeft, Maximize2, Minimize2, Save,
  GripHorizontal, Scissors, Copy, Clipboard, ArrowRight, Sparkles,
  User, Star, TrendingUp, Mail, MoreHorizontal, FolderOpen, Folder,
  Archive, Trash2, Edit3, Move,
} from "lucide-react";
import { DemoButton, Backdrop, CloseButton, OverlayStage, TriggerCenter, EASE, SPRING } from "./primitives";
import { ModalOverlay } from "./primitives";

// ════════════════════════════════════════════════════════════════════════════
// BATCH 3 — Components 17-24
// ════════════════════════════════════════════════════════════════════════════

// ─── 17. Onboarding Dialog (multi-step welcome) ─────────────────────────────
export function OnboardingDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Welcome to mtverse!", desc: "Let's set up your workspace in 3 quick steps.", icon: Sparkles, color: "#8b5cf6" },
    { title: "Choose your role", desc: "We'll customize your experience based on your role.", icon: User, color: "#3b82f6" },
    { title: "You're all set!", desc: "Your workspace is ready. Let's build something amazing.", icon: Check, color: "#10b981" },
  ];
  const s = steps[step];
  const Icon = s.icon;
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => { setOpen(true); setStep(0); }} color="#8b5cf6">Start Onboarding</DemoButton>
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
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 pt-4">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ width: i === step ? 24 : 8, opacity: i <= step ? 1 : 0.3 }}
                    transition={SPRING}
                    className="h-2 rounded-full"
                    style={{ background: i <= step ? s.color : "#e2e8f0" }}
                  />
                ))}
              </div>
              {/* Content */}
              <div className="p-6 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `${s.color}15` }}>
                      <Icon className="h-8 w-8" style={{ color: s.color }} strokeWidth={2} />
                    </div>
                    <h3 className="mt-3 text-[16px] font-bold text-[#1e293b]">{s.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">{s.desc}</p>
                    {step === 1 && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {["Designer", "Developer", "Manager", "Other"].map(role => (
                          <button key={role} className="rounded-lg border bg-white/10 p-2.5 text-[11px] font-semibold text-[#1e293b] transition hover:bg-[#f1f5f9]">
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between border-t bg-white/10 p-4">
                <button onClick={() => setOpen(false)} className="text-[11px] font-medium text-[#64748b] hover:text-[#1e293b]">
                  Skip
                </button>
                <div className="flex gap-2">
                  {step > 0 && (
                    <DemoButton onClick={() => setStep(s => s - 1)} variant="ghost">
                      <ChevronLeft className="h-3.5 w-3.5" /> Back
                    </DemoButton>
                  )}
                  <DemoButton
                    onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : setOpen(false)}
                    color={s.color}
                  >
                    {step < steps.length - 1 ? "Next" : "Get Started"}
                    {step < steps.length - 1 ? <ChevronRight className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                  </DemoButton>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 18. Multi-Step Modal (wizard form) ─────────────────────────────────────
export function MultiStepModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ["Account", "Profile", "Preferences", "Review"];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => { setOpen(true); setStep(0); }} color="#3b82f6">Create Account</DemoButton>
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
                <h3 className="text-[14px] font-bold text-[#1e293b]">Create Account</h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              {/* Step indicator */}
              <div className="flex items-center px-4 pt-4">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          background: i <= step ? "#3b82f6" : "#e2e8f0",
                          scale: i === step ? 1.1 : 1,
                        }}
                        transition={SPRING}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      >
                        {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                      </motion.div>
                      <span className="mt-1 text-[8.5px] font-semibold text-[#64748b]">{label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mx-1 h-0.5 flex-1 rounded-full transition-colors" style={{ background: i < step ? "#3b82f6" : "#e2e8f0" }} />
                    )}
                  </div>
                ))}
              </div>
              {/* Content */}
              <div className="min-h-[140px] p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2.5"
                  >
                    {step === 0 && (
                      <>
                        <input placeholder="Email" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                        <input type="password" placeholder="Password" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <input placeholder="Full name" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                        <input placeholder="Company" className="w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                      </>
                    )}
                    {step === 2 && (
                      <div className="space-y-1.5">
                        {["Email notifications", "Push alerts", "Weekly digest"].map(opt => (
                          <label key={opt} className="flex items-center gap-2.5 rounded-lg border bg-white/10 p-2.5">
                            <input type="checkbox" className="accent-blue-500" />
                            <span className="text-[12px] text-[#1e293b]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {step === 3 && (
                      <div className="rounded-lg bg-[#f8fafc] p-3 text-center">
                        <Check className="mx-auto h-8 w-8 text-emerald-500" strokeWidth={2.5} />
                        <p className="mt-1.5 text-[12px] font-semibold text-[#1e293b]">Ready to create!</p>
                        <p className="text-[10.5px] text-[#64748b]">Review your information and click finish.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Footer */}
              <div className="flex justify-between border-t bg-white/10 p-4">
                <DemoButton onClick={() => step > 0 ? setStep(s => s - 1) : setOpen(false)} variant="ghost">
                  {step > 0 ? "Back" : "Cancel"}
                </DemoButton>
                <DemoButton onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : setOpen(false)} color="#3b82f6">
                  {step < steps.length - 1 ? "Next" : "Finish"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </DemoButton>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 19. Fullscreen Editor ──────────────────────────────────────────────────
export function FullscreenEditor() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("# Welcome to mtverse\n\nStart writing your masterpiece here...\n\n- Use markdown\n- Stay focused\n- Ship faster");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#10b981" variant="outline">
          <Maximize2 className="h-4 w-4" /> Fullscreen Editor
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: "#ffffff" }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b bg-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9]">
                  <Minimize2 className="h-4 w-4" />
                </button>
                <span className="text-[12px] font-bold text-[#1e293b]">Untitled.md</span>
                <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[8.5px] font-bold text-amber-600">DRAFT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#64748b]">{words} words</span>
                <DemoButton onClick={() => setOpen(false)} color="#10b981" variant="ghost">
                  <Save className="h-3.5 w-3.5" /> Save
                </DemoButton>
              </div>
            </div>
            {/* Editor area */}
            <div className="flex-1 overflow-auto p-6">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="mx-auto h-full w-full max-w-2xl resize-none bg-transparent text-[14px] leading-relaxed text-[#1e293b] outline-none"
                style={{ fontFamily: "var(--font-mono), monospace" }}
                autoFocus
              />
            </div>
            {/* Status bar */}
            <div className="flex items-center justify-between border-t bg-white/10 px-4 py-1.5 text-[10px] text-[#64748b]">
              <span>Markdown · UTF-8</span>
              <span>Ln 1, Col 1</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 20. Mobile Bottom Sheet ────────────────────────────────────────────────
export function MobileBottomSheet() {
  const [open, setOpen] = useState(false);
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => setOpen(true)} color="#06b6d4">
          Open Bottom Sheet
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 38 }}
              className="absolute bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-2xl bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0", borderBottom: "none" }}>
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-[#e2e8f0]" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2">
                <h3 className="text-[14px] font-bold text-[#1e293b]">Sort & Filter</h3>
                <CloseButton onClick={() => setOpen(false)} />
              </div>
              {/* Options */}
              <div className="space-y-1 p-3">
                {[
                  { label: "Newest first", icon: TrendingUp, selected: true },
                  { label: "Oldest first", icon: TrendingUp, selected: false },
                  { label: "Price: Low to High", icon: TrendingUp, selected: false },
                  { label: "Price: High to Low", icon: TrendingUp, selected: false },
                  { label: "Most popular", icon: Star, selected: false },
                ].map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#f1f5f9]"
                    >
                      <Icon className="h-4 w-4 text-[#64748b]" />
                      <span className="flex-1 text-[12.5px] font-medium text-[#1e293b]">{opt.label}</span>
                      {opt.selected && <Check className="h-4 w-4 text-cyan-500" strokeWidth={2.6} />}
                    </button>
                  );
                })}
              </div>
              {/* Safe area spacer */}
              <div className="h-3" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 21. Context Menu (right-click) ─────────────────────────────────────────
export function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  const items: Array<{ label?: string; icon?: any; hint?: string; divider?: boolean; danger?: boolean }> = [
    { label: "Cut", icon: Scissors, hint: "⌘X" },
    { label: "Copy", icon: Copy, hint: "⌘C" },
    { label: "Paste", icon: Clipboard, hint: "⌘V" },
    { divider: true },
    { label: "Rename", icon: Edit3, hint: "F2" },
    { label: "Move to…", icon: Move, hint: "" },
    { divider: true },
    { label: "Delete", icon: Trash2, hint: "⌫", danger: true },
  ];
  return (
    <OverlayStage>
      <div
        className="absolute inset-0 flex items-center justify-center"
        onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); setOpen(true); }}
      >
        <div className="rounded-xl border-2 border-dashed bg-white/10 p-6 text-center">
          <p className="text-[12px] font-semibold text-[#64748b]">Right-click anywhere here</p>
          <p className="mt-1 text-[10px] text-[#94a3b8]">Opens context menu at cursor</p>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 w-48 overflow-hidden rounded-xl border bg-white/10 bg-[#ffffff] py-1 shadow-2xl"
            style={{ left: Math.min(pos.x, 300), top: Math.min(pos.y, 250) }}
          >
            {items.map((item, i) => item.divider ? (
              <div key={i} className="my-1 h-px bg-[#e2e8f0]" />
            ) : (
              <button
                key={i}
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12px] font-medium transition hover:bg-[#f1f5f9]"
                style={{ color: item.danger ? "#ef4444" : "#1e293b" }}
              >
                <item.icon className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="flex-1">{item.label}</span>
                {item.hint && <kbd className="text-[9px] font-mono text-[#94a3b8]">{item.hint}</kbd>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}

// ─── 22. Hover Card (rich preview) ──────────────────────────────────────────
export function HoverCard() {
  const [show, setShow] = useState(false);
  return (
    <OverlayStage>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="flex items-center gap-2 rounded-xl border bg-slate-50 border border-slate-200 px-4 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[11px] font-bold text-white">AM</div>
            <div>
              <p className="text-[12px] font-bold text-[#1e293b]">Alex Morgan</p>
              <p className="text-[9.5px] text-[#64748b]">@alexmorgan</p>
            </div>
          </div>
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border bg-white/10 bg-[#ffffff] shadow-2xl"
              >
                <div className="h-14" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }} />
                <div className="px-4 pb-3">
                  <div className="-mt-6 mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[14px] font-bold text-white ring-4 ring-[#ffffff]">AM</div>
                  <p className="text-[13px] font-bold text-[#1e293b]">Alex Morgan</p>
                  <p className="text-[10.5px] text-[#64748b]">@alexmorgan · Product Designer</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#64748b]">Designing beautiful interfaces at mtverse. Previously at Figma and Linear.</p>
                  <div className="mt-2.5 flex gap-4">
                    <div><span className="text-[13px] font-bold text-[#1e293b]">24</span> <span className="text-[9.5px] text-[#64748b]">Projects</span></div>
                    <div><span className="text-[13px] font-bold text-[#1e293b]">1.8K</span> <span className="text-[9.5px] text-[#64748b]">Followers</span></div>
                    <div className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[13px] font-bold text-[#1e293b]">4.9</span></div>
                  </div>
                  <DemoButton onClick={() => {}} color="#8b5cf6" className="mt-3 w-full">Follow</DemoButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </OverlayStage>
  );
}

// ─── 23. Popover Form ───────────────────────────────────────────────────────
export function PopoverForm() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <OverlayStage>
      <TriggerCenter>
        <div ref={ref} className="relative">
          <DemoButton onClick={() => setOpen(o => !o)} color="#ec4899">
            <Mail className="h-4 w-4" /> Subscribe
          </DemoButton>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={SPRING}
                className="mt-3 w-64 overflow-visible rounded-2xl border border-slate-200 bg-white shadow-2xl"
              >
                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t bg-white/10" style={{ background: "#ffffff" }} />
                <div className="p-4">
                  <h3 className="text-[13px] font-bold text-[#1e293b]">Subscribe to Newsletter</h3>
                  <p className="mt-0.5 text-[10.5px] text-[#64748b]">Get weekly updates in your inbox.</p>
                  <input type="email" placeholder="email@example.com" className="mt-2.5 w-full rounded-lg border bg-slate-50 border border-slate-200 px-3 py-2 text-[12px] text-[#1e293b] outline-none" />
                  <DemoButton onClick={() => setOpen(false)} color="#ec4899" className="mt-2 w-full">Subscribe</DemoButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TriggerCenter>
    </OverlayStage>
  );
}

// ─── 24. Nested Drawer (drawer within drawer) ───────────────────────────────
export function NestedDrawer() {
  const [open, setOpen] = useState(false);
  const [subView, setSubView] = useState<"main" | "files" | "settings">("main");
  const folders = [
    { name: "Documents", count: 24, icon: FolderOpen, color: "#3b82f6" },
    { name: "Images", count: 156, icon: Folder, color: "#8b5cf6" },
    { name: "Archive", count: 8, icon: Archive, color: "#f59e0b" },
  ];
  const settings = [
    { label: "General", icon: Folder },
    { label: "Sharing", icon: Folder },
    { label: "Advanced", icon: Folder },
  ];
  return (
    <OverlayStage>
      <TriggerCenter>
        <DemoButton onClick={() => { setOpen(true); setSubView("main"); }} color="#f59e0b">
          <FolderOpen className="h-4 w-4" /> Browse Files
        </DemoButton>
      </TriggerCenter>
      <AnimatePresence>
        {open && (
          <>
            <Backdrop onClick={() => { setOpen(false); setSubView("main"); }} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              className="absolute right-0 top-0 z-50 flex h-full w-[300px] flex-col overflow-hidden bg-[#ffffff] shadow-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Header with breadcrumb */}
              <div className="flex items-center gap-2 border-b bg-white/10 p-4">
                {subView !== "main" && (
                  <button
                    onClick={() => setSubView("main")}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                <h3 className="flex-1 text-[13px] font-bold text-[#1e293b]">
                  {subView === "main" ? "My Files" : subView === "files" ? "Folders" : "Settings"}
                </h3>
                <CloseButton onClick={() => { setOpen(false); setSubView("main"); }} />
              </div>
              {/* Content with slide transition */}
              <div className="flex-1 overflow-y-auto p-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={subView}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {subView === "main" && (
                      <div className="space-y-1.5">
                        {folders.map(f => (
                          <button
                            key={f.name}
                            onClick={() => setSubView("files")}
                            className="flex w-full items-center gap-3 rounded-xl border bg-white/10 p-3 text-left transition hover:bg-[#f1f5f9]"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${f.color}15` }}>
                              <f.icon className="h-4 w-4" style={{ color: f.color }} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[12px] font-semibold text-[#1e293b]">{f.name}</p>
                              <p className="text-[10px] text-[#64748b]">{f.count} items</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-[#94a3b8]" />
                          </button>
                        ))}
                        <button
                          onClick={() => setSubView("settings")}
                          className="flex w-full items-center gap-3 rounded-xl border bg-white/10 p-3 text-left transition hover:bg-[#f1f5f9]"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-500/10">
                            <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-[#1e293b]">Settings</p>
                            <p className="text-[10px] text-[#64748b]">Preferences & config</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-[#94a3b8]" />
                        </button>
                      </div>
                    )}
                    {subView === "files" && (
                      <div className="space-y-1">
                        {["proposal.pdf", "design.fig", "budget.xlsx", "notes.md", "demo.mp4"].map(file => (
                          <div key={file} className="flex items-center gap-2.5 rounded-lg p-2 transition hover:bg-[#f1f5f9]">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500/10">
                              <FolderOpen className="h-3.5 w-3.5 text-rose-500" />
                            </div>
                            <span className="flex-1 text-[11.5px] text-[#1e293b]">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {subView === "settings" && (
                      <div className="space-y-1">
                        {settings.map(s => (
                          <button key={s.label} className="flex w-full items-center gap-2.5 rounded-lg p-2.5 text-left transition hover:bg-[#f1f5f9]">
                            <s.icon className="h-4 w-4 text-[#64748b]" />
                            <span className="flex-1 text-[12px] text-[#1e293b]">{s.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-[#94a3b8]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayStage>
  );
}
