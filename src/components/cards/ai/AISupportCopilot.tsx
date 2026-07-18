"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Archive,
  BellOff,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Copy,
  ExternalLink,
  FileText,
  Inbox,
  LoaderCircle,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  ThumbsDown,
  ThumbsUp,
  UserRoundCheck,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";
import {
  AI_FOCUS_RESET,
  getAIPalette,
  ModernSelect,
  type ModernSelectOption,
  ProfileAvatar,
} from "./ai-ui";

type TicketStatus = "open" | "pending" | "resolved";

interface Ticket {
  id: string;
  customer: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  priority: "High" | "Normal" | "Low";
  status: TicketStatus;
  unread: boolean;
  channel: "Email" | "Chat";
}

interface SupportMessage {
  id: string;
  role: "customer" | "agent" | "note";
  content: string;
  time: string;
}

const MODEL = AI_MODELS[3];
const STATUS_OPTIONS: ModernSelectOption[] = [
  { value: "all", label: "All conversations", meta: "Open, pending and resolved", Icon: Inbox },
  { value: "open", label: "Open", meta: "Needs a reply", Icon: Mail },
  { value: "pending", label: "Pending", meta: "Waiting on customer", Icon: Clock3 },
  { value: "resolved", label: "Resolved", meta: "Completed conversations", Icon: CheckCircle2 },
];
const TONE_OPTIONS: ModernSelectOption[] = [
  { value: "warm", label: "Warm and clear", meta: "Empathetic, concise, helpful", Icon: MessageCircle },
  { value: "concise", label: "Concise", meta: "Direct answer with next step", Icon: Zap },
  { value: "formal", label: "Formal", meta: "Professional enterprise tone", Icon: ShieldCheck },
];
const ASSIGNEE_OPTIONS: ModernSelectOption[] = [
  { value: "aarav", label: "Aarav Kumar", meta: "You · online", Icon: UserRoundCheck },
  { value: "maya", label: "Maya Chen", meta: "Billing specialist", Icon: UserRoundCheck },
  { value: "tier2", label: "Tier 2 support", meta: "Technical queue", Icon: ShieldCheck },
];

const INITIAL_TICKETS: Ticket[] = [
  { id: "t1", customer: "Lena Ortiz", initials: "LO", subject: "Charged twice after plan upgrade", preview: "I upgraded this morning and can see two charges…", time: "2m", priority: "High", status: "open", unread: true, channel: "Email" },
  { id: "t2", customer: "Marcus Lee", initials: "ML", subject: "Invite link expired", preview: "The invite sent to our designer no longer works.", time: "18m", priority: "Normal", status: "open", unread: true, channel: "Chat" },
  { id: "t3", customer: "Nora Systems", initials: "NS", subject: "SSO metadata update", preview: "We need to rotate the certificate before Friday.", time: "1h", priority: "High", status: "pending", unread: false, channel: "Email" },
  { id: "t4", customer: "Sofia Patel", initials: "SP", subject: "Export completed", preview: "Perfect, the CSV includes everything we needed.", time: "3h", priority: "Low", status: "resolved", unread: false, channel: "Chat" },
  { id: "t5", customer: "Acme Design", initials: "AD", subject: "Workspace member limit", preview: "Can we temporarily add five contractors?", time: "5h", priority: "Normal", status: "open", unread: false, channel: "Email" },
];

const INITIAL_MESSAGES: Record<string, SupportMessage[]> = {
  t1: [
    { id: "m1", role: "customer", content: "Hi, I upgraded from Starter to Pro this morning. My card shows the expected $29 charge, but there is another $29 pending charge too. Can you check whether I was billed twice?", time: "10:31 AM" },
    { id: "m2", role: "agent", content: "Thanks for flagging this, Lena. I’m checking the billing events now and will confirm exactly what happened.", time: "10:34 AM" },
    { id: "m3", role: "customer", content: "Thank you. I only clicked upgrade once, so I was worried the second charge would settle.", time: "10:36 AM" },
  ],
  t2: [{ id: "m4", role: "customer", content: "The invite link for our designer says it has expired. Could you send a fresh one?", time: "10:18 AM" }],
  t3: [{ id: "m5", role: "customer", content: "Our identity team needs to rotate the SAML certificate. Where should we upload the new metadata?", time: "9:20 AM" }],
  t4: [{ id: "m6", role: "customer", content: "Perfect, the CSV includes everything we needed. Thanks!", time: "Yesterday" }],
  t5: [{ id: "m7", role: "customer", content: "We have five contractors joining for two weeks. Is there a way to increase the member limit temporarily?", time: "Yesterday" }],
};

const KNOWLEDGE = [
  { title: "Duplicate card authorizations", detail: "Pending authorizations usually disappear within 3–5 business days.", confidence: 98 },
  { title: "Plan upgrade billing flow", detail: "A successful upgrade creates one settled invoice and may refresh authorization.", confidence: 94 },
  { title: "Refund and reversal policy", detail: "Support can escalate settled duplicates directly to Billing Ops.", confidence: 91 },
];

let supportMessageCounter = 20;

function TicketAvatar({ initials, active = false }: { initials: string; active?: boolean }) {
  return <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7e5e4] text-[9px] font-bold text-[#44403c] dark:bg-[#292524] dark:text-[#fed7aa]">{initials}{active && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#18181b]" />}</span>;
}

export function AISupportCopilot() {
  const palette = getAIPalette();
  const accent = MODEL.color;
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState("t1");
  const [messagesByTicket, setMessagesByTicket] = useState(INITIAL_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tone, setTone] = useState("warm");
  const [assignee, setAssignee] = useState("aarav");
  const [draft, setDraft] = useState("");
  const [noteMode, setNoteMode] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [listOpen, setListOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const activeTicket = tickets.find((ticket) => ticket.id === activeTicketId) ?? tickets[0];
  const messages = messagesByTicket[activeTicket.id] ?? [];
  const filteredTickets = useMemo(() => tickets.filter((ticket) => {
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const search = searchQuery.trim().toLowerCase();
    return matchesStatus && (!search || `${ticket.customer} ${ticket.subject}`.toLowerCase().includes(search));
  }), [searchQuery, statusFilter, tickets]);

  const selectTicket = (ticketId: string) => {
    setActiveTicketId(ticketId);
    setDraft("");
    setTickets((current) => current.map((ticket) => ticket.id === ticketId ? { ...ticket, unread: false } : ticket));
  };

  const generateReply = () => {
    if (generating) return;
    setGenerating(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const response = tone === "concise"
        ? "I checked the billing events. One $29 charge is the completed Pro upgrade; the second is a temporary authorization and should disappear within 3–5 business days. If it settles, reply here and I’ll escalate it immediately."
        : tone === "formal"
          ? "I reviewed the billing events associated with your account. The first $29 entry is the completed Pro invoice, while the second is a temporary card authorization rather than a settled charge. It should be released by your bank within three to five business days."
          : "I checked the billing events, Lena. Good news: you weren’t billed twice. One $29 entry is the completed Pro upgrade, and the other is a temporary card authorization that should disappear within 3–5 business days. If it does settle, reply here and I’ll get Billing Ops involved right away.";
      setDraft(response);
      setGenerating(false);
    }, 720);
  };

  const sendReply = () => {
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    window.setTimeout(() => {
      supportMessageCounter += 1;
      setMessagesByTicket((current) => ({ ...current, [activeTicket.id]: [...(current[activeTicket.id] ?? []), { id: `m${supportMessageCounter}`, role: noteMode ? "note" : "agent", content, time: "Now" }] }));
      setDraft("");
      setSending(false);
      if (!noteMode) setTickets((current) => current.map((ticket) => ticket.id === activeTicket.id ? { ...ticket, status: "pending" } : ticket));
    }, 420);
  };

  const setTicketStatus = (status: TicketStatus) => setTickets((current) => current.map((ticket) => ticket.id === activeTicket.id ? { ...ticket, status } : ticket));

  const copyLastCustomerMessage = async () => {
    const latest = [...messages].reverse().find((message) => message.role === "customer");
    if (!latest) return;
    await navigator.clipboard?.writeText(latest.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: palette.background, color: palette.text }}>
      {listOpen && <aside className="hidden w-[292px] shrink-0 flex-col border-r md:flex" style={{ background: palette.panel, borderColor: palette.border }}>
        <div className="flex h-[60px] items-center gap-2.5 border-b px-3.5" style={{ borderColor: palette.border }}><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#18181b] text-white dark:bg-white dark:text-black"><Inbox className="h-4 w-4" /></span><div><p className="text-[11px] font-bold">Support inbox</p><p className="text-[8.5px]" style={{ color: palette.muted }}>12 open · 3 high priority</p></div><button onClick={() => setListOpen(false)} className={`ml-auto ${AI_FOCUS_RESET}`} style={{ color: palette.muted }} aria-label="Close inbox"><ChevronLeft className="h-4 w-4" /></button></div>
        <div className="space-y-2 p-3"><ModernSelect value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} palette={palette} accent={accent} compact /><div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: palette.border, background: palette.elevated }}><Search className="h-3.5 w-3.5" style={{ color: palette.muted }} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search conversations" className={`min-w-0 flex-1 bg-transparent text-[9.5px] ${AI_FOCUS_RESET}`} style={{ color: palette.text }} /></div></div>
        <div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto px-2.5 pb-3"><div className="space-y-1">{filteredTickets.map((ticket) => <button key={ticket.id} onClick={() => selectTicket(ticket.id)} className={`w-full rounded-xl border p-3 text-left transition ${AI_FOCUS_RESET}`} style={{ borderColor: activeTicketId === ticket.id ? `${accent}55` : "transparent", background: activeTicketId === ticket.id ? `${accent}0d` : "transparent" }}><div className="flex items-start gap-2.5"><TicketAvatar initials={ticket.initials} active={ticket.status === "open"} /><div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><span className="truncate text-[10px] font-bold">{ticket.customer}</span>{ticket.unread && <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />}{ticket.priority === "High" && <AlertCircle className="h-3 w-3 text-red-500" />}<span className="ml-auto text-[7.5px]" style={{ color: palette.muted }}>{ticket.time}</span></div><p className="mt-1 truncate text-[9.5px] font-semibold" style={{ color: palette.secondary }}>{ticket.subject}</p><p className="mt-0.5 truncate text-[8.5px]" style={{ color: palette.muted }}>{ticket.preview}</p><div className="mt-2 flex items-center gap-1.5"><span className="rounded-md px-1.5 py-0.5 text-[7px] font-semibold capitalize" style={{ background: palette.surface, color: ticket.status === "open" ? "#10b981" : palette.muted }}>{ticket.status}</span><span className="text-[7px]" style={{ color: palette.muted }}>{ticket.channel}</span></div></div></div></button>)}</div></div>
      </aside>}

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="relative z-40 flex h-[60px] shrink-0 items-center gap-2 border-b px-3 sm:px-4" style={{ borderColor: palette.border, background: palette.panel }}>
          {!listOpen && <button onClick={() => setListOpen(true)} className={`flex h-8 w-8 items-center justify-center rounded-lg border ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: palette.muted }}><Menu className="h-4 w-4" /></button>}
          <TicketAvatar initials={activeTicket.initials} active />
          <div className="min-w-0"><div className="flex items-center gap-1.5"><p className="truncate text-[11px] font-bold">{activeTicket.subject}</p><span className="hidden rounded-md px-1.5 py-0.5 text-[7px] font-bold sm:inline" style={{ background: activeTicket.priority === "High" ? "rgba(239,68,68,0.12)" : palette.surface, color: activeTicket.priority === "High" ? "#ef4444" : palette.muted }}>{activeTicket.priority}</span></div><p className="text-[8.5px]" style={{ color: palette.muted }}>#{activeTicket.id.toUpperCase()} · {activeTicket.customer} · {activeTicket.channel}</p></div>
          <div className="ml-auto flex items-center gap-1.5"><button onClick={() => setTicketStatus("pending")} className={`hidden items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[8.5px] font-semibold sm:flex ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, color: palette.secondary }}><BellOff className="h-3.5 w-3.5" />Snooze</button><button onClick={() => setTicketStatus(activeTicket.status === "resolved" ? "open" : "resolved")} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[8.5px] font-semibold ${AI_FOCUS_RESET}`} style={{ borderColor: activeTicket.status === "resolved" ? "rgba(16,185,129,0.45)" : palette.border, color: activeTicket.status === "resolved" ? "#10b981" : palette.secondary }}><CheckCircle2 className="h-3.5 w-3.5" />{activeTicket.status === "resolved" ? "Reopen" : "Resolve"}</button><ProfileAvatar /></div>
        </header>

        <div className="flex min-h-0 flex-1">
          <section className="flex min-w-0 flex-1 flex-col">
            <div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
                <div className="mb-5 flex items-center gap-2"><span className="h-px flex-1" style={{ background: palette.border }} /><span className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: palette.muted }}>Today</span><span className="h-px flex-1" style={{ background: palette.border }} /></div>
                <div className="space-y-5">{messages.map((message) => <motion.div key={message.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 ${message.role === "agent" ? "flex-row-reverse" : ""}`}>{message.role === "customer" ? <TicketAvatar initials={activeTicket.initials} /> : message.role === "agent" ? <ProfileAvatar /> : <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"><FileText className="h-3.5 w-3.5" /></span>}<div className={`min-w-0 ${message.role === "agent" ? "max-w-[82%]" : "max-w-[86%]"}`}><div className={`mb-1 flex items-center gap-2 ${message.role === "agent" ? "justify-end" : ""}`}><span className="text-[9.5px] font-bold">{message.role === "customer" ? activeTicket.customer : message.role === "agent" ? "Aarav Kumar" : "Internal note"}</span><span className="text-[7.5px]" style={{ color: palette.muted }}>{message.time}</span></div><div className="rounded-2xl border px-4 py-3 text-[10.5px] leading-5" style={{ borderColor: message.role === "note" ? "rgba(245,158,11,0.35)" : palette.border, background: message.role === "agent" ? palette.surface : message.role === "note" ? "rgba(245,158,11,0.08)" : palette.elevated, color: palette.secondary }}>{message.content}</div></div></motion.div>)}</div>

                <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: `${accent}40`, background: `${accent}08` }}><div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${accent}16`, color: accent }}><MODEL.Icon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-[10px] font-bold">AI case brief</p><span className="rounded-full px-1.5 py-0.5 text-[7px] font-bold" style={{ background: `${accent}16`, color: accent }}>98% confidence</span></div><p className="mt-1.5 text-[9.5px] leading-relaxed" style={{ color: palette.secondary }}>Billing events show one settled Pro invoice and one temporary authorization. No duplicate invoice exists. Recommended action: explain the authorization window and invite the customer to reply if it settles.</p><div className="mt-3 flex flex-wrap gap-1.5"><span className="rounded-lg border px-2 py-1 text-[7.5px]" style={{ borderColor: palette.border, color: palette.muted }}>Intent: duplicate charge</span><span className="rounded-lg border px-2 py-1 text-[7.5px]" style={{ borderColor: palette.border, color: palette.muted }}>Sentiment: concerned</span><span className="rounded-lg border px-2 py-1 text-[7.5px]" style={{ borderColor: palette.border, color: palette.muted }}>Refund risk: low</span></div></div></div></div>
              </div>
            </div>

            <div className="shrink-0 border-t p-3 sm:p-4" style={{ borderColor: palette.border, background: palette.panel }}><div className="mx-auto max-w-3xl"><div className="mb-2 flex items-center gap-2"><button onClick={() => setNoteMode(false)} className={`rounded-lg px-2.5 py-1.5 text-[8.5px] font-bold ${AI_FOCUS_RESET}`} style={{ background: !noteMode ? palette.elevated : "transparent", color: !noteMode ? palette.text : palette.muted }}>Reply</button><button onClick={() => setNoteMode(true)} className={`rounded-lg px-2.5 py-1.5 text-[8.5px] font-bold ${AI_FOCUS_RESET}`} style={{ background: noteMode ? "rgba(245,158,11,0.12)" : "transparent", color: noteMode ? "#f59e0b" : palette.muted }}>Internal note</button><div className="ml-auto w-[165px]"><ModernSelect value={tone} options={TONE_OPTIONS} onChange={setTone} palette={palette} accent={accent} compact align="right" /></div></div><div className="rounded-2xl border p-2 transition" style={{ borderColor: composerFocused ? `${accent}75` : noteMode ? "rgba(245,158,11,0.45)" : palette.border, background: palette.elevated, boxShadow: composerFocused ? `0 0 0 3px ${accent}10` : "none" }}><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onFocus={() => setComposerFocused(true)} onBlur={() => setComposerFocused(false)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") sendReply(); }} rows={3} placeholder={noteMode ? "Add a private note for your team…" : `Reply to ${activeTicket.customer}…`} style={{ color: palette.text, outline: "none", boxShadow: "none" }} className={`max-h-32 min-h-[64px] w-full resize-none bg-transparent px-2 py-2 text-[10.5px] ${AI_FOCUS_RESET}`} /><div className="flex items-center gap-1"><button className={`flex h-8 w-8 items-center justify-center rounded-lg ${AI_FOCUS_RESET}`} style={{ color: palette.muted }} aria-label="Attach file"><Paperclip className="h-3.5 w-3.5" /></button><button onClick={generateReply} disabled={generating || noteMode} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[8.5px] font-bold disabled:opacity-35 ${AI_FOCUS_RESET}`} style={{ background: `${accent}14`, color: accent }}>{generating ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}AI draft</button><span className="ml-auto hidden text-[7.5px] sm:inline" style={{ color: palette.muted }}>Ctrl + Enter to send</span><button onClick={sendReply} disabled={!draft.trim() || sending} className={`ml-1 flex h-9 items-center gap-2 rounded-xl px-3 text-[9px] font-bold text-white disabled:opacity-30 ${AI_FOCUS_RESET}`} style={{ background: noteMode ? "#d97706" : accent }}>{sending ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}{noteMode ? "Add note" : "Send"}</button></div></div></div></div>
          </section>

          {detailsOpen && <aside className="hidden w-[270px] shrink-0 flex-col border-l xl:flex" style={{ borderColor: palette.border, background: palette.panel }}><div className="flex h-[48px] items-center border-b px-4" style={{ borderColor: palette.border }}><p className="text-[10px] font-bold">Customer context</p><button onClick={() => setDetailsOpen(false)} className={`ml-auto ${AI_FOCUS_RESET}`} style={{ color: palette.muted }}><PanelRightClose className="h-4 w-4" /></button></div><div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto p-4"><div className="flex items-center gap-3"><TicketAvatar initials={activeTicket.initials} active /><div><p className="text-[10.5px] font-bold">{activeTicket.customer}</p><p className="text-[8.5px]" style={{ color: palette.muted }}>lena@northstar.studio</p></div></div><div className="my-4 h-px" style={{ background: palette.border }} /><ModernSelect value={assignee} options={ASSIGNEE_OPTIONS} onChange={setAssignee} palette={palette} accent={accent} label="Assigned to" /><div className="mt-4 grid grid-cols-2 gap-2">{[["Plan", "Pro"], ["MRR", "$29"], ["Customer", "14 months"], ["CSAT", "4.9 / 5"]].map(([label, value]) => <div key={label} className="rounded-xl border p-2.5" style={{ borderColor: palette.border, background: palette.elevated }}><p className="text-[7.5px]" style={{ color: palette.muted }}>{label}</p><p className="mt-1 text-[9.5px] font-bold">{value}</p></div>)}</div><div className="my-4 h-px" style={{ background: palette.border }} /><div className="mb-2 flex items-center justify-between"><p className="text-[8px] font-bold uppercase tracking-[0.12em]" style={{ color: palette.muted }}>AI knowledge</p><BookOpen className="h-3.5 w-3.5" style={{ color: accent }} /></div><div className="space-y-2">{KNOWLEDGE.map((article) => <button key={article.title} className={`w-full rounded-xl border p-3 text-left ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, background: palette.elevated }}><div className="flex items-start gap-2"><FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} /><div><p className="text-[9px] font-bold leading-snug">{article.title}</p><p className="mt-1 text-[8px] leading-relaxed" style={{ color: palette.muted }}>{article.detail}</p><p className="mt-1.5 text-[7.5px] text-emerald-500">{article.confidence}% relevance</p></div></div></button>)}</div><div className="my-4 h-px" style={{ background: palette.border }} /><div className="space-y-2"><button onClick={() => void copyLastCustomerMessage()} className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[8.5px] ${AI_FOCUS_RESET}`} style={{ color: copied ? "#10b981" : palette.secondary }}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy latest message"}</button><button onClick={() => setTicketStatus("resolved")} className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[8.5px] ${AI_FOCUS_RESET}`} style={{ color: palette.secondary }}><Archive className="h-3.5 w-3.5" />Close conversation</button></div></div></aside>}
        </div>
      </main>

      {!detailsOpen && <button onClick={() => setDetailsOpen(true)} className={`absolute right-3 top-[70px] z-50 flex items-center gap-2 rounded-xl border px-3 py-2 text-[8.5px] font-bold shadow-lg ${AI_FOCUS_RESET}`} style={{ borderColor: palette.border, background: palette.elevated, color: palette.secondary }}><PanelRightOpen className="h-3.5 w-3.5" />Customer</button>}
    </div>
  );
}
