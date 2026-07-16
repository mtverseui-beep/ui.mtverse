"use client";

import type { LucideIcon } from "lucide-react";
import {
  FolderOpen,
  Sparkles,
  CreditCard,
  BarChart3,
  UserCircle,
  ShoppingBag,
  UploadCloud,
  Bell,
  Calendar,
  Wand2,
  PartyPopper,
  BellRing,
  Globe,
  Home,
  ImageIcon,
  IdCard,
  UserSquare,
  Smartphone,
  Zap,
  Users,
  PlayCircle,
  GraduationCap,
  Newspaper,
  Mountain,
  LogIn,
  CloudSun,
  Grid3x3,
  RotateCw,
  ToggleRight,
  ArrowRight,
  LayoutGrid,
  Loader2,
  Heart,
  Plus,
  Share2,
  Mic,
  Phone,
  Check,
  ChevronLeft,
  Mail,
  ShieldCheck,
  Command,
  FileText,
  BookOpen,
  Code2,
  Inbox,
  ChevronDown,
  Search,
  Menu,
  Layers,
  PanelBottom,
  PanelLeft,
  Sparkle,
  UserPlus,
  KeyRound,
  RotateCcw,
  FileQuestion,
  ServerCrash,
  WifiOff,
  MessageSquareQuote,
  Crown,
  Bot,
  Fingerprint,
  Lock,
  AlertTriangle,
  UserX,
  Clock,
  MailCheck,
  Building2,
  AlertCircle,
  Ban,
  UserCheck,
  Link2,
  CheckCircle2,
  Hammer,
  RefreshCw,
  ShieldAlert,
  MapPinOff,
  ServerCog,
  Database,
  Gauge,
  ShieldX,
  LockKeyhole,
  AlertOctagon,
  Compass,
  Construction,
  SquareStack,
} from "lucide-react";

export type CardCategory =
  | "Premium"
  | "Buttons"
  | "Forms"
  | "Navbar"
  | "Footer"
  | "Hero"
  | "Pricing"
  | "SignIn"
  | "SignUp"
  | "ForgotPassword"
  | "ResetPassword"
  | "Error404"
  | "Error500"
  | "Offline"
  | "Testimonials"
  | "Agents"
  | "Core"
  | "Content"
  | "Product"
  | "Profile"
  | "Data"
  | "Stack"
  | "Auth"
  | "ErrorPages"
  | "Features"
  | "CTA"
  | "Charts"
  | "Modals"
  | "Sidebar"
  | "AI"
  | "Backgrounds"
  | "Tables";

export interface CardMeta {
  slug: string;
  href: string;
  title: string;
  category: CardCategory;
  icon: LucideIcon;
  accent: string;
  animation: string;
  source: "original" | "more";
}

export const cardRoutes: CardMeta[] = [
  // ── Premium (1st section — top of sidebar) ──
  { slug: "sticky-agent-cards-card", href: "/components/cards/sticky-agent-cards-card", title: "Sticky Agent Cards", category: "Agents", icon: Crown, accent: "#f59e0b", animation: "4 sticky-stacking agent cards with scroll scale (Agentic)", source: "more" },
  { slug: "kanban-board-card", href: "/components/cards/kanban-board-card", title: "Kanban Board", category: "Agents", icon: LayoutGrid, accent: "#6366f1", animation: "Drag-and-drop project board with cross-column moves + reorder (@dnd-kit)", source: "more" },
  { slug: "animated-beam-card", href: "/components/cards/animated-beam-card", title: "Animated Beam", category: "Agents", icon: Crown, accent: "#9c40ff", animation: "Animated SVG beams connecting brand logos + OpenAI hub + gradient flow", source: "more" },
  { slug: "fluid-cta-card", href: "/components/cards/fluid-cta-card", title: "Fluid CTA", category: "Agents", icon: Crown, accent: "#004FE5", animation: "Fluid layout morph CTA → expanding form card + mesh gradient bg + spring", source: "more" },
  { slug: "gallery-3d-card", href: "/components/cards/gallery-3d-card", title: "3D Infinite Gallery", category: "Agents", icon: Crown, accent: "#8b5cf6", animation: "Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play", source: "more" },
  { slug: "ai-chatbot-card", href: "/components/cards/ai-chatbot-card", title: "AI Chatbot Orb", category: "Agents", icon: Crown, accent: "#9bc761", animation: "Animated orb → morph to chat panel · hue-rotate · direct debit card · message bubbles", source: "more" },
  { slug: "auth001-card", href: "/components/cards/auth001-card", title: "Meridian Split-Panel Auth", category: "Auth", icon: Fingerprint, accent: "#334155", animation: "Meridian split-panel auth set: sign in/up, forgot, reset, OTP, two-step", source: "more" },
  { slug: "auth002-card", href: "/components/cards/auth002-card", title: "Aurora Glassmorphism Auth", category: "Auth", icon: Fingerprint, accent: "#a855f7", animation: "Aurora glassmorphism centered card + floating gradient orbs + staggered fields", source: "more" },
  { slug: "auth003-card", href: "/components/cards/auth003-card", title: "Brutalist Offset Shadow Auth", category: "Auth", icon: Fingerprint, accent: "#facc15", animation: "Brutalist black/yellow offset shadow card + square inputs + Archivo Black", source: "more" },
  { slug: "auth004-card", href: "/components/cards/auth004-card", title: "Editorial Magazine Auth", category: "Auth", icon: Fingerprint, accent: "#92400e", animation: "Editorial magazine serif centered + paper grain + masthead + Fraunces", source: "more" },
  { slug: "auth005-card", href: "/components/cards/auth005-card", title: "Photo Split-Panel Auth", category: "Auth", icon: Fingerprint, accent: "#0a0a0a", animation: "Unsplash photo split-panel + testimonial overlay + clean white form right", source: "more" },
  { slug: "auth006-card", href: "/components/cards/auth006-card", title: "Dark Luxury Gold Auth", category: "Auth", icon: Fingerprint, accent: "#d4af37", animation: "Dark luxury gold serif centered + Cormorant Garamond + gold sweep CTA + monogram", source: "more" },
  { slug: "auth007-card", href: "/components/cards/auth007-card", title: "Neumorphic Soft UI Auth", category: "Auth", icon: Fingerprint, accent: "#6366f1", animation: "Neumorphic soft UI embossed card + sunken inputs + raised CTA + dual shadows", source: "more" },
  { slug: "auth008-card", href: "/components/cards/auth008-card", title: "Holographic Iridescent Auth", category: "Auth", icon: Fingerprint, accent: "#8338ec", animation: "Holographic iridescent rotating conic-gradient border + dark glass interior", source: "more" },
  { slug: "auth009-card", href: "/components/cards/auth009-card", title: "Terminal CLI Auth", category: "Auth", icon: Fingerprint, accent: "#22c55e", animation: "Terminal/CLI green phosphor CRT + typing prompt + JetBrains Mono + scanlines", source: "more" },
  { slug: "auth010-card", href: "/components/cards/auth010-card", title: "Cyberpunk Neon Auth", category: "Auth", icon: Fingerprint, accent: "#ec4899", animation: "Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan", source: "more" },
  { slug: "auth011-card", href: "/components/cards/auth011-card", title: "Apple Minimal Auth", category: "Auth", icon: Fingerprint, accent: "#0071e3", animation: "Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro", source: "more" },
  { slug: "auth012-card", href: "/components/cards/auth012-card", title: "Warm Earthy Verdant Auth", category: "Auth", icon: Fingerprint, accent: "#92400e", animation: "Warm earthy beige Fraunces serif + paper grain + leaf logo + stem underline inputs", source: "more" },
  { slug: "auth013-card", href: "/components/cards/auth013-card", title: "Origami Folded Auth", category: "Auth", icon: Fingerprint, accent: "#ec4899", animation: "Origami folded card 3D perspective hover + diagonal corner accents + Space Grotesk", source: "more" },
  { slug: "auth014-card", href: "/components/cards/auth014-card", title: "Glass Mesh Tilt Auth", category: "Auth", icon: Fingerprint, accent: "#8b5cf6", animation: "Glassmorphism mesh gradient + 3D tilt-on-hover card + backdrop blur + violet/cyan", source: "more" },
  { slug: "auth015-card", href: "/components/cards/auth015-card", title: "Stripe Floating Label Auth", category: "Auth", icon: Fingerprint, accent: "#635bff", animation: "Stripe-style minimal + floating label inputs that slide up on focus + indigo gradient CTA", source: "more" },
  { slug: "auth016-card", href: "/components/cards/auth016-card", title: "Bento Grid Split Auth", category: "Auth", icon: Fingerprint, accent: "#8b5cf6", animation: "Bento grid split + 4 feature tiles left + sign-in form right + mixed card sizes", source: "more" },
  { slug: "auth017-card", href: "/components/cards/auth017-card", title: "Aurora Wave Centered Auth", category: "Auth", icon: Fingerprint, accent: "#6366f1", animation: "Vertical centered card + animated SVG aurora waves bg + indigo gradient + white card", source: "more" },
  { slug: "auth018-card", href: "/components/cards/auth018-card", title: "Floating Shapes Illustration Auth", category: "Auth", icon: Fingerprint, accent: "#d946ef", animation: "Side-by-side + animated floating SVG shapes illustration + playful fuchsia/blue", source: "more" },
  { slug: "auth019-card", href: "/components/cards/auth019-card", title: "Full-Screen Image Glass Auth", category: "Auth", icon: Fingerprint, accent: "#06b6d4", animation: "Full-screen Unsplash tech image bg + dark overlay + centered glass form + backdrop blur", source: "more" },
  { slug: "auth020-card", href: "/components/cards/auth020-card", title: "Dot Grid Minimal Auth", category: "Auth", icon: Fingerprint, accent: "#10b981", animation: "Minimal dot grid + ultra-narrow centered form + emerald accent + clean focused", source: "more" },
  { slug: "auth021-card", href: "/components/cards/auth021-card", title: "Gradient Mesh Stats Auth", category: "Auth", icon: Fingerprint, accent: "#f97316", animation: "Orange/rose gradient mesh + glass card + social proof stats (users/rating/growth) + form", source: "more" },
  { slug: "fragrance-product-grid-card", href: "/components/cards/fragrance-product-grid-card", title: "Fragrance Product Grid", category: "Agents", icon: Crown, accent: "#92400e", animation: "3 tabs x 4 product cards + segmented control + staggered entrance (Lumina)", source: "more" },

  // ── Buttons (2nd section) ──
  { slug: "animated-switch-card", href: "/components/cards/animated-switch-card", title: "Animated Switches", category: "Buttons", icon: ToggleRight, accent: "#6366f1", animation: "Spring toggle + icon rotate", source: "more" },
  { slug: "liquid-metal-buttons-card", href: "/components/cards/liquid-metal-buttons-card", title: "Liquid Metal Buttons", category: "Buttons", icon: Zap, accent: "#a855f7", animation: "24 click animations + mouse glow", source: "more" },
  { slug: "morphing-sign-in-card", href: "/components/cards/morphing-sign-in-card", title: "Morphing Sign In", category: "Buttons", icon: LogIn, accent: "#8b5cf6", animation: "Button-to-modal spring morph", source: "more" },
  { slug: "premium-animated-buttons-card", href: "/components/cards/premium-animated-buttons-card", title: "Premium Animated Buttons", category: "Buttons", icon: ArrowRight, accent: "#3b82f6", animation: "Color wipe + shine + arrow rotate", source: "more" },
  { slug: "segmented-control-card", href: "/components/cards/segmented-control-card", title: "Segmented Controls", category: "Buttons", icon: LayoutGrid, accent: "#0ea5e9", animation: "Glassmorphic sliding pill + 3D depth", source: "more" },
  { slug: "loading-state-buttons-card", href: "/components/cards/loading-state-buttons-card", title: "Loading State Buttons", category: "Buttons", icon: Loader2, accent: "#10b981", animation: "Async state machine + progress fill", source: "more" },
  { slug: "premium-cta-buttons-card", href: "/components/cards/premium-cta-buttons-card", title: "Premium CTA Buttons", category: "Buttons", icon: Sparkles, accent: "#8b5cf6", animation: "Gradient border + glow pulse + 3D press + text reveal", source: "more" },
  { slug: "bookmark-favorite-card", href: "/components/cards/bookmark-favorite-card", title: "Favorite & Bookmark", category: "Buttons", icon: Heart, accent: "#f43f5e", animation: "Heart burst + star rating + bookmark flip", source: "more" },
  { slug: "fab-menu-card", href: "/components/cards/fab-menu-card", title: "FAB Action Menu", category: "Buttons", icon: Plus, accent: "#2563eb", animation: "Radial expand + spring stagger + backdrop", source: "more" },
  { slug: "social-share-card", href: "/components/cards/social-share-card", title: "Social Share", category: "Buttons", icon: Share2, accent: "#0ea5e9", animation: "Brand color wipe + copy link feedback", source: "more" },
  { slug: "voice-audio-card", href: "/components/cards/voice-audio-card", title: "Voice & Audio", category: "Buttons", icon: Mic, accent: "#7c3aed", animation: "Hold-to-talk + mute morph + volume slider", source: "more" },
  { slug: "otp-verification-card", href: "/components/cards/otp-verification-card", title: "OTP Verification", category: "Buttons", icon: Phone, accent: "#059669", animation: "Send code + countdown ring + resend", source: "more" },
  { slug: "stepper-quantity-card", href: "/components/cards/stepper-quantity-card", title: "Stepper & Quantity", category: "Buttons", icon: Plus, accent: "#d97706", animation: "Number flip + long-press accelerate + pill", source: "more" },
  { slug: "filter-chip-card", href: "/components/cards/filter-chip-card", title: "Filter Chips", category: "Buttons", icon: Check, accent: "#2563eb", animation: "Removable + toggle + add input", source: "more" },

  // ── Forms (3rd section) ──
  { slug: "animated-floating-input-card", href: "/components/cards/animated-floating-input-card", title: "Floating Inputs", category: "Forms", icon: Mail, accent: "#3b82f6", animation: "Float labels + focus glow + validation + strength", source: "more" },
  { slug: "otp-input-card", href: "/components/cards/otp-input-card", title: "OTP Input", category: "Forms", icon: ShieldCheck, accent: "#059669", animation: "Auto-advance + paste + backspace + verify", source: "more" },
  { slug: "file-dropzone-card", href: "/components/cards/file-dropzone-card", title: "File Dropzone", category: "Forms", icon: UploadCloud, accent: "#6366f1", animation: "Drag-drop + progress + type icons + remove", source: "more" },
  { slug: "slider-range-card", href: "/components/cards/slider-range-card", title: "Range Slider", category: "Forms", icon: ChevronDown, accent: "#8b5cf6", animation: "Dual handle + gradient track + spring tooltip", source: "more" },
  { slug: "radio-card-group-card", href: "/components/cards/radio-card-group-card", title: "Radio Card Group", category: "Forms", icon: Check, accent: "#3b82f6", animation: "Spring checkmark + layout slide + color tint", source: "more" },
  { slug: "search-bar-card", href: "/components/cards/search-bar-card", title: "Search Bar", category: "Forms", icon: Search, accent: "#0ea5e9", animation: "Live results + highlight + keyboard nav", source: "more" },
  { slug: "select-dropdown-card", href: "/components/cards/select-dropdown-card", title: "Select Dropdown", category: "Forms", icon: ChevronDown, accent: "#2563eb", animation: "Searchable + grouped + animated checkmark", source: "more" },
  { slug: "color-picker-card", href: "/components/cards/color-picker-card", title: "Color Picker", category: "Forms", icon: Search, accent: "#ec4899", animation: "Swatch grid + hue slider + hex input", source: "more" },
  { slug: "date-time-picker-card", href: "/components/cards/date-time-picker-card", title: "Date & Time Picker", category: "Forms", icon: ChevronDown, accent: "#0ea5e9", animation: "Calendar + time wheel + range picker", source: "more" },
  { slug: "rich-text-editor-card", href: "/components/cards/rich-text-editor-card", title: "Rich Text Editor", category: "Forms", icon: Mail, accent: "#8b5cf6", animation: "Markdown + WYSIWYG + slash command", source: "more" },
  { slug: "tag-input-card", href: "/components/cards/tag-input-card", title: "Tag Input", category: "Forms", icon: Check, accent: "#10b981", animation: "Chips + autocomplete + drag reorder", source: "more" },
  { slug: "emoji-picker-card", href: "/components/cards/emoji-picker-card", title: "Emoji Picker", category: "Forms", icon: Mail, accent: "#f59e0b", animation: "Category grid + search + recent", source: "more" },
  { slug: "dropdown-menu-card", href: "/components/cards/dropdown-menu-card", title: "Dropdown Menu", category: "Forms", icon: ChevronDown, accent: "#2563eb", animation: "Action menu + hover + nested", source: "more" },
  { slug: "tabs-card", href: "/components/cards/tabs-card", title: "Tabs", category: "Forms", icon: ChevronDown, accent: "#6366f1", animation: "Underline + pill + vertical", source: "more" },
  { slug: "accordion-card", href: "/components/cards/accordion-card", title: "Accordion", category: "Forms", icon: ChevronDown, accent: "#0ea5e9", animation: "Chevron + plus/minus + card", source: "more" },
  { slug: "tooltip-card", href: "/components/cards/tooltip-card", title: "Tooltip", category: "Forms", icon: Search, accent: "#64748b", animation: "Hover + click + rich content", source: "more" },
  { slug: "progress-bar-card", href: "/components/cards/progress-bar-card", title: "Progress Bar", category: "Forms", icon: Check, accent: "#10b981", animation: "Linear shimmer + circular + segmented", source: "more" },

  // ── Navbar (4th section) ──
  { slug: "navbar001-card", href: "/components/cards/navbar001-card", title: "Scroll-Aware Floating Glass Pill", category: "Navbar", icon: Menu, accent: "#3b82f6", animation: "Scroll-aware floating glass pill + mobile menu", source: "more" },
  { slug: "navbar002-card", href: "/components/cards/navbar002-card", title: "Glass Pill Mega Menu Search", category: "Navbar", icon: Menu, accent: "#06b6d4", animation: "Scroll-aware glass pill + search + staggered mega menu (Electric Upgraded)", source: "more" },
  { slug: "navbar003-card", href: "/components/cards/navbar003-card", title: "Full-Width Glass Sliding Indicator", category: "Navbar", icon: Menu, accent: "#8b5cf6", animation: "Full-width glass + sliding indicator + cmd palette + drawer (Vortex)", source: "more" },
  { slug: "navbar004-card", href: "/components/cards/navbar004-card", title: "Frosted Expandable Search Cart", category: "Navbar", icon: Menu, accent: "#ff4d8c", animation: "Frosted glass + expandable search spring + cart badge + slide-down mobile (Glow)", source: "more" },
  { slug: "navbar005-card", href: "/components/cards/navbar005-card", title: "Floating Beige Expandable Search", category: "Navbar", icon: Menu, accent: "#92400e", animation: "Floating beige pill + expandable search + scroll morph + staggered mobile (Lumina)", source: "more" },
  { slug: "navbar006-card", href: "/components/cards/navbar006-card", title: "macOS Dock Magnification", category: "Navbar", icon: Menu, accent: "#6366f1", animation: "Bottom-anchored floating dock + icon magnification + tooltip labels (Docked)", source: "more" },
  { slug: "navbar007-card", href: "/components/cards/navbar007-card", title: "Search-First Command Palette", category: "Navbar", icon: Search, accent: "#3b82f6", animation: "Search-first center command bar + breadcrumbs + ⌘K palette (Vector)", source: "more" },
  { slug: "navbar008-card", href: "/components/cards/navbar008-card", title: "Apple-Style Hover Mega Menu", category: "Navbar", icon: Menu, accent: "#1d1d1f", animation: "Apple-style full-width hover mega menu + 3-column categories (Orchard)", source: "more" },
  { slug: "navbar009-card", href: "/components/cards/navbar009-card", title: "Notion-Style Nested Sidebar", category: "Navbar", icon: Menu, accent: "#37352f", animation: "Notion-style slide-in sidebar + nested tree + search + profile (Notional)", source: "more" },
  { slug: "navbar010-card", href: "/components/cards/navbar010-card", title: "Luxury Symmetric Center Logo", category: "Navbar", icon: Menu, accent: "#000000", animation: "Luxury symmetric center logo + split nav + hairline underlines (Maison Noir)", source: "more" },
  { slug: "navbar011-card", href: "/components/cards/navbar011-card", title: "Dashboard Icon Rail Switcher", category: "Navbar", icon: Menu, accent: "#4f46e5", animation: "Dashboard product — icon rail + workspace switcher + breadcrumb + notif dropdown", source: "more" },
  { slug: "navbar012-card", href: "/components/cards/navbar012-card", title: "Minimal SaaS Underline Hover", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Minimal SaaS — sparse layout + underline hover + slide-down mobile (Lumio)", source: "more" },
  { slug: "navbar013-card", href: "/components/cards/navbar013-card", title: "Detached Glass Pill Bottom Sheet", category: "Navbar", icon: Menu, accent: "#6366f1", animation: "Floating glass pill detached + inline search expand + bottom sheet mobile (Aether)", source: "more" },
  { slug: "navbar014-card", href: "/components/cards/navbar014-card", title: "Ecommerce Mega Promo Column", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Mega menu ecommerce — full-width category panels + promo column + accordion drawer (MARQUE)", source: "more" },
  { slug: "navbar015-card", href: "/components/cards/navbar015-card", title: "Code-Host Repo Tabs Branch", category: "Navbar", icon: Menu, accent: "#238636", animation: "Developer tools — dense dark + branch selector + icon nav + ⌘K search (devkit)", source: "more" },
  { slug: "navbar016-card", href: "/components/cards/navbar016-card", title: "Creative Agency Numbered Links", category: "Navbar", icon: Menu, accent: "#1a1a1a", animation: "Creative agency — asymmetric wordmark + numbered links + fullscreen overlay (Monolith)", source: "more" },
  { slug: "navbar017-card", href: "/components/cards/navbar017-card", title: "Split Navigation Scroll Shrink", category: "Navbar", icon: Menu, accent: "#059669", animation: "Split navigation — two groups + center divider + scroll shrink (Verdant)", source: "more" },
  { slug: "navbar018-card", href: "/components/cards/navbar018-card", title: "Centered Serif Split Nav", category: "Navbar", icon: Menu, accent: "#1a1a1a", animation: "Centered logo — symmetric split nav + serif typography + hairline underline (AURÉLIE)", source: "more" },
  { slug: "navbar019-card", href: "/components/cards/navbar019-card", title: "Command Palette Takeover", category: "Navbar", icon: Search, accent: "#0f172a", animation: "Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav (Cmdr)", source: "more" },
  { slug: "navbar020-card", href: "/components/cards/navbar020-card", title: "Expandable Search Takeover", category: "Navbar", icon: Search, accent: "#0f172a", animation: "Search focused — expandable search takeover + trending suggestions (Seekr)", source: "more" },
  { slug: "navbar021-card", href: "/components/cards/navbar021-card", title: "Cascading Multi-Level Dropdown", category: "Navbar", icon: Menu, accent: "#4f46e5", animation: "Multi-level dropdown — cascading 3-level menus + nested accordion mobile (Cascader)", source: "more" },
  { slug: "navbar022-card", href: "/components/cards/navbar022-card", title: "Dismissible Cycling Announcement", category: "Navbar", icon: Menu, accent: "#e11d48", animation: "Announcement bar — dismissible cycling promos + sliding indicator dots (Bloom)", source: "more" },
  { slug: "navbar023-card", href: "/components/cards/navbar023-card", title: "Transparent Hero Solid Scroll", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Transparent hero — overlay on hero image + solid white on scroll + text invert (Summit)", source: "more" },
  { slug: "navbar024-card", href: "/components/cards/navbar024-card", title: "Sticky Shrinking Progress Bar", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Sticky shrinking — tall→compact on scroll + tagline hide + size morph (Pinpoint)", source: "more" },
  { slug: "navbar025-card", href: "/components/cards/navbar025-card", title: "Fullscreen Takeover Staggered", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Full screen menu — minimal bar + fullscreen takeover + staggered large links (GRID)", source: "more" },
  { slug: "navbar026-card", href: "/components/cards/navbar026-card", title: "Bento Grid Dropdown Cards", category: "Navbar", icon: Menu, accent: "#7c3aed", animation: "Bento style — grid dropdown with mixed-size cards + hover transitions (Bento)", source: "more" },
  { slug: "navbar027-card", href: "/components/cards/navbar027-card", title: "Mobile Bottom Tab FAB", category: "Navbar", icon: Menu, accent: "#6366f1", animation: "Mobile first app — bottom tab bar + center FAB + active pill indicator (Mobily)", source: "more" },
  { slug: "navbar028-card", href: "/components/cards/navbar028-card", title: "Documentation Version Selector", category: "Navbar", icon: Menu, accent: "#059669", animation: "Documentation — version selector + prominent search + sidebar drawer (Docflow)", source: "more" },
  { slug: "navbar029-card", href: "/components/cards/navbar029-card", title: "Marketplace Category Search", category: "Navbar", icon: Menu, accent: "#0f172a", animation: "Marketplace — category-prefixed search + category bar + cart/wishlist (Marketly)", source: "more" },
  { slug: "navbar030-card", href: "/components/cards/navbar030-card", title: "Floating Dock Radial FAB", category: "Navbar", icon: Menu, accent: "#06b6d4", animation: "Announcement + dock hybrid — dismissible promo + floating pill dock + FAB (Orbit)", source: "more" },
  { slug: "navbar031-card", href: "/components/cards/navbar031-card", title: "Startup Gradient CTA Dropdown", category: "Navbar", icon: Menu, accent: "#f97316", animation: "Startup landing — CTA + dropdown nav + scroll shrink + slide-down mobile (Launch)", source: "more" },

  // ── Footer (5th section) ──
  { slug: "footer001-card", href: "/components/cards/footer001-card", title: "DevOps Topographic Contours", category: "Footer", icon: PanelBottom, accent: "#0ea5e9", animation: "6-column grid + animated status pill + dot-grid bg", source: "more" },
  { slug: "footer002-card", href: "/components/cards/footer002-card", title: "Portfolio Magnetic Typewriter", category: "Footer", icon: PanelBottom, accent: "#203eec", animation: "Brand + pages + newsletter + social glow (AI Portfolio)", source: "more" },
  { slug: "footer003-card", href: "/components/cards/footer003-card", title: "AI Neural Mesh Glass Cards", category: "Footer", icon: PanelBottom, accent: "#64748b", animation: "Full CTA email section + bg image + blur + minimal footer (Agentic)", source: "more" },
  { slug: "footer004-card", href: "/components/cards/footer004-card", title: "Aurora Glow Tilt Cards", category: "Footer", icon: PanelBottom, accent: "#ff4d8c", animation: "Dark gradient + pink blur + 4 columns + social hover scale (Glow)", source: "more" },
  { slug: "footer005-card", href: "/components/cards/footer005-card", title: "Warm Editorial Grain Outlined", category: "Footer", icon: PanelBottom, accent: "#92400e", animation: "Giant bg text + warm beige + 4 columns + social icons (Lumina)", source: "more" },
  { slug: "footer006-card", href: "/components/cards/footer006-card", title: "Minimal SaaS Hairline Pill", category: "Footer", icon: PanelBottom, accent: "#0f172a", animation: "Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio)", source: "more" },
  { slug: "footer007-card", href: "/components/cards/footer007-card", title: "Enterprise Mega Compliance Ticker", category: "Footer", icon: PanelBottom, accent: "#3b82f6", animation: "Large enterprise — 5-col mega grid + trust badges + dot-grid bg (Nexcorp)", source: "more" },
  { slug: "footer008-card", href: "/components/cards/footer008-card", title: "Ecommerce Payment Rail Selector", category: "Footer", icon: PanelBottom, accent: "#e11d48", animation: "Ecommerce marketplace — payment badges + currency/lang selectors (Marketly)", source: "more" },
  { slug: "footer009-card", href: "/components/cards/footer009-card", title: "Developer Terminal ASCII CRT", category: "Footer", icon: PanelBottom, accent: "#238636", animation: "Developer tools — dark terminal aesthetic + GitHub stars + status (devkit)", source: "more" },
  { slug: "footer010-card", href: "/components/cards/footer010-card", title: "Agency Marquee Brutalist Blob", category: "Footer", icon: PanelBottom, accent: "#1a1a1a", animation: "Creative agency — oversized heading + floating blobs + marquee (Monolith)", source: "more" },
  { slug: "footer011-card", href: "/components/cards/footer011-card", title: "Magazine Serif Masthead Archive", category: "Footer", icon: PanelBottom, accent: "#1a1a1a", animation: "Editorial magazine — serif masthead + issue archive + ISSN (The Quarterly)", source: "more" },
  { slug: "footer012-card", href: "/components/cards/footer012-card", title: "Documentation Sidebar Edit GitHub", category: "Footer", icon: PanelBottom, accent: "#059669", animation: "Documentation — edit-on-GitHub link + 3 link cols + version (Docflow)", source: "more" },
  { slug: "footer013-card", href: "/components/cards/footer013-card", title: "Dashboard Uptime Grid Metrics", category: "Footer", icon: PanelBottom, accent: "#4f46e5", animation: "Dashboard product — uptime indicator + animated grid bg (Pinpoint)", source: "more" },
  { slug: "footer014-card", href: "/components/cards/footer014-card", title: "Centered Concentric Rings Brand", category: "Footer", icon: PanelBottom, accent: "#6366f1", animation: "Centered brand — perfectly symmetric + concentric rings bg (Aether)", source: "more" },
  { slug: "footer015-card", href: "/components/cards/footer015-card", title: "Asymmetric Split Dark Panel", category: "Footer", icon: PanelBottom, accent: "#059669", animation: "Asymmetric split — dark brand panel + white links panel (Verdant)", source: "more" },
  { slug: "footer016-card", href: "/components/cards/footer016-card", title: "Newsletter Waveform Counter", category: "Footer", icon: PanelBottom, accent: "#f59e0b", animation: "Newsletter focused — giant form + subscriber count + wave bg (Pulse)", source: "more" },
  { slug: "footer017-card", href: "/components/cards/footer017-card", title: "App Download QR Phone Mockup", category: "Footer", icon: PanelBottom, accent: "#0f172a", animation: "App download — QR code + store badges + phone mockup (Mobily)", source: "more" },
  { slug: "footer018-card", href: "/components/cards/footer018-card", title: "Community Particle Discord Stats", category: "Footer", icon: PanelBottom, accent: "#8b5cf6", animation: "Community platform — stats + Discord CTA + floating particles (Gather)", source: "more" },
  { slug: "footer019-card", href: "/components/cards/footer019-card", title: "Portfolio Cursor Blink Project Tiles", category: "Footer", icon: PanelBottom, accent: "#f59e0b", animation: "Portfolio — personal name brand + status badge + cursor blink (Sarah Chen)", source: "more" },
  { slug: "footer020-card", href: "/components/cards/footer020-card", title: "Startup Dot Grid CTA Band", category: "Footer", icon: PanelBottom, accent: "#f97316", animation: "Startup landing — CTA band + 3 cols + animated dots bg (Launch)", source: "more" },
  { slug: "footer021-card", href: "/components/cards/footer021-card", title: "Dark Luxury Gold Sweep Serif", category: "Footer", icon: PanelBottom, accent: "#c4a35a", animation: "Dark luxury — black + gold serif + minimal links + gold sweep (MAISON)", source: "more" },
  { slug: "footer022-card", href: "/components/cards/footer022-card", title: "Compact Utility Marquee Strip", category: "Footer", icon: PanelBottom, accent: "#0ea5e9", animation: "Compact utility — single row nav + 2 rows total (Swift)", source: "more" },
  { slug: "footer023-card", href: "/components/cards/footer023-card", title: "Multi-Level Accordion Mega", category: "Footer", icon: PanelBottom, accent: "#4f46e5", animation: "Multi-level mega — expandable accordion categories + newsletter (Cascader)", source: "more" },

  // ── Hero (6th section) ──
  { slug: "hero001-card", href: "/components/cards/hero001-card", title: "Staggered Text Reveal Isometric", category: "Hero", icon: Sparkle, accent: "#8b5cf6", animation: "Staggered text reveal + char-by-char blur + static isometric SVG", source: "more" },
  { slug: "hero002-card", href: "/components/cards/hero002-card", title: "Badge Gradient Headline Avatars", category: "Hero", icon: Sparkle, accent: "#6366f1", animation: "Badge + gradient headline + CTAs + avatar social proof", source: "more" },
  { slug: "hero003-card", href: "/components/cards/hero003-card", title: "Particle Constellation Polygon", category: "Hero", icon: Sparkle, accent: "#EBB800", animation: "Particle constellation + polygon pill + serif headline (SKAL)", source: "more" },
  { slug: "hero004-card", href: "/components/cards/hero004-card", title: "Word Blur Reveal Gradient AI Orb", category: "Hero", icon: Sparkle, accent: "#203eec", animation: "Word blur reveal + gradient AI + orb rotation + scroll mask", source: "more" },
  { slug: "hero005-card", href: "/components/cards/hero005-card", title: "Typewriter Gradient Trusted Logos", category: "Hero", icon: Sparkle, accent: "#06b6d4", animation: "Typewriter input + gradient headline + CTAs + trusted logos (Electric)", source: "more" },
  { slug: "hero006-card", href: "/components/cards/hero006-card", title: "Staggered Fade Avatar Stack Stars", category: "Hero", icon: Sparkle, accent: "#f59e0b", animation: "Staggered fade-up + avatar stack + star rating (Minimalist)", source: "more" },
  { slug: "hero007-card", href: "/components/cards/hero007-card", title: "Pastel Animated Birds Butterflies", category: "Hero", icon: Sparkle, accent: "#f43f5e", animation: "Pastel bg + animated birds/butterflies/leaves/clouds + stats (Design)", source: "more" },
  { slug: "hero008-card", href: "/components/cards/hero008-card", title: "Split Interactive Demo Tabs", category: "Hero", icon: Sparkle, accent: "#f59e0b", animation: "Bg image + word blur reveal + CTAs (Skydda)", source: "more" },
  { slug: "hero009-card", href: "/components/cards/hero009-card", title: "Parallax SVG Draw Floating Icons", category: "Hero", icon: Sparkle, accent: "#14b8a6", animation: "Parallax blobs + SVG draw + floating icons + slide-in (Olea)", source: "more" },
  { slug: "hero010-card", href: "/components/cards/hero010-card", title: "Blob Bg Floating Glass Marquee", category: "Hero", icon: Sparkle, accent: "#ff4d8c", animation: "Blob bg + floating glass cards + marquee ticker + sticker (Glow)", source: "more" },
  { slug: "hero011-card", href: "/components/cards/hero011-card", title: "Bg Image Staggered Blur Serif", category: "Hero", icon: Sparkle, accent: "#92400e", animation: "Bg image + staggered blur-in + serif headline + scroll indicator (Lumina)", source: "more" },
  { slug: "hero012-card", href: "/components/cards/hero012-card", title: "3D Mouse-Tilt Parallax Dot Grid", category: "Hero", icon: Sparkle, accent: "#a855f7", animation: "3D mouse-tilt scene + parallax dot grid + layered depth cards (Dimension)", source: "more" },
  { slug: "hero013-card", href: "/components/cards/hero013-card", title: "Split Interactive Demo Tabbed", category: "Hero", icon: Sparkle, accent: "#4f46e5", animation: "Split interactive demo + tabbed panel (Inbox/Analytics/Settings) + social proof (Flowstate)", source: "more" },
  { slug: "hero014-card", href: "/components/cards/hero014-card", title: "Terminal Typing Matrix Code", category: "Hero", icon: Sparkle, accent: "#238636", animation: "Terminal typing animation + matrix code bg + GitHub stars (Stacktrace)", source: "more" },
  { slug: "hero015-card", href: "/components/cards/hero015-card", title: "Scroll-Driven Cinematic Parallax", category: "Hero", icon: Sparkle, accent: "#f59e0b", animation: "Scroll-driven cinematic — parallax layers + scale heading + morphing CTA (Vista)", source: "more" },
  { slug: "hero016-card", href: "/components/cards/hero016-card", title: "Bento Grid Hero Live Counter", category: "Hero", icon: Sparkle, accent: "#7c3aed", animation: "Bento grid hero — 6 content cards + live counter + code snippet + testimonial (Mosaic)", source: "more" },
  { slug: "hero017-card", href: "/components/cards/hero017-card", title: "Aurora Wave SVG Ribbons Starfield", category: "Hero", icon: Sparkle, accent: "#06b6d4", animation: "Aurora wave — 5 animated SVG sine-wave ribbons + starfield + scroll hue shift (Polaris)", source: "more" },
  { slug: "hero018-card", href: "/components/cards/hero018-card", title: "3D Product Carousel Auto-Rotate", category: "Hero", icon: Sparkle, accent: "#e11d48", animation: "3D product carousel — auto-rotate + arrows + product cards w/ images + dots (Showcase)", source: "more" },
  { slug: "hero019-card", href: "/components/cards/hero019-card", title: "Bold Typography Floating Tags", category: "Hero", icon: Sparkle, accent: "#8b5cf6", animation: "Magnetic field — 80 particles attracted to cursor + connection lines + scroll disperse (Flux)", source: "more" },
  { slug: "hero020-card", href: "/components/cards/hero020-card", title: "Gradient Mesh Bold Stat Cards", category: "Hero", icon: Sparkle, accent: "#f97316", animation: "Scroll reveal — 4 pinned full-height sections that slide over each other (Layered)", source: "more" },
  { slug: "hero021-card", href: "/components/cards/hero021-card", title: "Minimal Split Headline Cards", category: "Hero", icon: Sparkle, accent: "#ff006e", animation: "Synthwave retro — perspective grid + neon sun + palm silhouettes + neon glow text (Synthwave)", source: "more" },

  // ── Pricing (7th section) ──
  { slug: "pricing001-card", href: "/components/cards/pricing001-card", title: "Vertex Monthly Annual Toggle", category: "Pricing", icon: CreditCard, accent: "#10b981", animation: "Monthly/annual toggle + 3-tier grid + popular badge (Vertex)", source: "more" },
  { slug: "pricing002-card", href: "/components/cards/pricing002-card", title: "Clean Centered Highlighted Pro", category: "Pricing", icon: CreditCard, accent: "#0ea5e9", animation: "3-tier grid + highlighted Pro plan + clean centered layout", source: "more" },
  { slug: "pricing003-card", href: "/components/cards/pricing003-card", title: "Nexus Border Beam Shimmer", category: "Pricing", icon: CreditCard, accent: "#10b981", animation: "Border beam + shimmer CTA + monthly/yearly toggle (Nexus)", source: "more" },
  { slug: "pricing004-card", href: "/components/cards/pricing004-card", title: "Agentic Bento Glow Reveal Text", category: "Pricing", icon: CreditCard, accent: "#f59e0b", animation: "BentoCard hover glow + RevealText + staggered entrance (Agentic)", source: "more" },
  { slug: "pricing005-card", href: "/components/cards/pricing005-card", title: "Skydda Blur Reveal Hover Scale", category: "Pricing", icon: CreditCard, accent: "#f59e0b", animation: "Monthly/yearly spring toggle + blur reveal + hover scale (Skydda)", source: "more" },
  { slug: "pricing006-card", href: "/components/cards/pricing006-card", title: "Aurora Glass Floating Orbs Glow", category: "Pricing", icon: CreditCard, accent: "#a855f7", animation: "Aurora glassmorphism + floating gradient orbs + mouse-tracking glow (Aurora)", source: "more" },
  { slug: "pricing007-card", href: "/components/cards/pricing007-card", title: "Brutalist Black Yellow Offset Shadow", category: "Pricing", icon: CreditCard, accent: "#facc15", animation: "Brutalist black/yellow + offset hard shadows + rotated badge (Brutalist)", source: "more" },
  { slug: "pricing008-card", href: "/components/cards/pricing008-card", title: "Editorial Magazine Serif Rule Lines", category: "Pricing", icon: CreditCard, accent: "#92400e", animation: "Editorial magazine serif + rule lines + numbered plans (Quarterly)", source: "more" },
  { slug: "pricing009-card", href: "/components/cards/pricing009-card", title: "Glass Mesh Gradient Tilt Hover", category: "Pricing", icon: CreditCard, accent: "#06b6d4", animation: "Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt)", source: "more" },
  { slug: "pricing010-card", href: "/components/cards/pricing010-card", title: "Dark Luxury Gold Cormorant Serif", category: "Pricing", icon: CreditCard, accent: "#d4af37", animation: "Dark luxury gold sweep + Cormorant serif + corner flourishes (Maison)", source: "more" },
  { slug: "pricing011-card", href: "/components/cards/pricing011-card", title: "Stripe Minimal Sliding Feature Rows", category: "Pricing", icon: CreditCard, accent: "#635bff", animation: "Stripe-style minimal + sliding feature rows + gradient pill toggle (Stripe)", source: "more" },
  { slug: "pricing012-card", href: "/components/cards/pricing012-card", title: "Neumorphic Soft Embossed Cards", category: "Pricing", icon: CreditCard, accent: "#6366f1", animation: "Neumorphic soft UI + embossed dual-shadow cards + sunken toggle (Soft)", source: "more" },
  { slug: "pricing013-card", href: "/components/cards/pricing013-card", title: "Holographic Conic Gradient Borders", category: "Pricing", icon: CreditCard, accent: "#8338ec", animation: "Holographic iridescent + rotating conic-gradient borders (Hologram)", source: "more" },
  { slug: "pricing014-card", href: "/components/cards/pricing014-card", title: "Terminal CLI Green Typing Price", category: "Pricing", icon: CreditCard, accent: "#22c55e", animation: "Terminal/CLI developer + CRT scanlines + typing price display (devkit)", source: "more" },
  { slug: "pricing015-card", href: "/components/cards/pricing015-card", title: "Comparison Table Sticky Column", category: "Pricing", icon: CreditCard, accent: "#4f46e5", animation: "Single-column comparison table + sticky feature col + checkmarks (Compare)", source: "more" },
  { slug: "pricing016-card", href: "/components/cards/pricing016-card", title: "Bento Grid Tab Switcher Mixed", category: "Pricing", icon: CreditCard, accent: "#8b5cf6", animation: "Bento grid mixed-size cards + tab switcher (Individual/Team/Ent) (Bento)", source: "more" },
  { slug: "pricing017-card", href: "/components/cards/pricing017-card", title: "Origami Folded 3D Perspective", category: "Pricing", icon: CreditCard, accent: "#ec4899", animation: "Origami folded cards + 3D perspective hover + diagonal accents (Origami)", source: "more" },
  { slug: "pricing018-card", href: "/components/cards/pricing018-card", title: "Warm Earthy Beige Fraunces Grain", category: "Pricing", icon: CreditCard, accent: "#92400e", animation: "Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant)", source: "more" },
  { slug: "pricing019-card", href: "/components/cards/pricing019-card", title: "Cyberpunk Neon Grid Glitch Price", category: "Pricing", icon: CreditCard, accent: "#ec4899", animation: "Cyberpunk neon + grid floor + scanlines + glitch RGB-split price (Neon)", source: "more" },
  { slug: "pricing020-card", href: "/components/cards/pricing020-card", title: "Apple Style Feature Matrix Gradient", category: "Pricing", icon: CreditCard, accent: "#0071e3", animation: "Apple-style clean + tiered feature matrix + gradient price text (Apple)", source: "more" },

  // ── Sign In (8th section) ──

  // ── Sign Up (9th section) ──

  // ── Forgot Password (10th section) ──

  // ── Reset Password (11th section) ──

  // ── 404 (12th section) ──

  // ── 500 (13th section) ──

  // ── Offline (14th section) ──

  // ── Testimonials (15th section) ──
  { slug: "testimonials-card", href: "/components/cards/testimonials-card", title: "Infinite Scroll Columns Marquee", category: "Testimonials", icon: MessageSquareQuote, accent: "#a855f7", animation: "3-column infinite scroll + logo marquee", source: "more" },
  { slug: "testimonials002-card", href: "/components/cards/testimonials002-card", title: "Dual-Row Scroll Blur Reveal Glow", category: "Testimonials", icon: MessageSquareQuote, accent: "#203eec", animation: "Dual-row scroll + blur reveal title + colored glow cards", source: "more" },
  { slug: "testimonials003-card", href: "/components/cards/testimonials003-card", title: "Carousel Prev Next Blur Title", category: "Testimonials", icon: MessageSquareQuote, accent: "#f59e0b", animation: "Carousel with prev/next + blur reveal title (Skydda)", source: "more" },
  { slug: "testimonials004-card", href: "/components/cards/testimonials004-card", title: "Hover Lift Gradient Avatar Stars", category: "Testimonials", icon: MessageSquareQuote, accent: "#ff4d8c", animation: "Hover lift cards + gradient avatars + star ratings (Glow)", source: "more" },
  { slug: "testimonials005-card", href: "/components/cards/testimonials005-card", title: "Masonry Pinterest Staggered Columns", category: "Testimonials", icon: MessageSquareQuote, accent: "#f59e0b", animation: "Masonry Pinterest-style staggered columns + Unsplash avatars + hover lift", source: "more" },
  { slug: "testimonials006-card", href: "/components/cards/testimonials006-card", title: "Single Featured Auto-Rotate Quote", category: "Testimonials", icon: MessageSquareQuote, accent: "#a855f7", animation: "Single large featured auto-rotating quote + dark bg + dots navigation", source: "more" },
  { slug: "testimonials007-card", href: "/components/cards/testimonials007-card", title: "Brutalist Offset Shadow Grid", category: "Testimonials", icon: MessageSquareQuote, accent: "#facc15", animation: "Brutalist black/yellow offset shadow grid + Archivo Black + dashed dividers", source: "more" },
  { slug: "testimonials008-card", href: "/components/cards/testimonials008-card", title: "Editorial Magazine Pull Quotes", category: "Testimonials", icon: MessageSquareQuote, accent: "#92400e", animation: "Editorial magazine pull quotes + Fraunces serif + paper grain + numbered", source: "more" },
  { slug: "testimonials009-card", href: "/components/cards/testimonials009-card", title: "Video Testimonial Play Buttons", category: "Testimonials", icon: MessageSquareQuote, accent: "#6366f1", animation: "Video testimonial cards with play buttons + Unsplash thumbnails + duration", source: "more" },
  { slug: "testimonials010-card", href: "/components/cards/testimonials010-card", title: "Stats Big Numbers Hybrid Grid", category: "Testimonials", icon: MessageSquareQuote, accent: "#6366f1", animation: "Stats + testimonials hybrid with big numbers + indigo gradient bg", source: "more" },
  { slug: "testimonials011-card", href: "/components/cards/testimonials011-card", title: "Aurora Glass 3D Tilt Cards", category: "Testimonials", icon: MessageSquareQuote, accent: "#a855f7", animation: "Glassmorphism aurora blobs + 3D tilt-on-hover cards + backdrop blur", source: "more" },
  { slug: "testimonials012-card", href: "/components/cards/testimonials012-card", title: "Logo Wall Compact Quote Grid", category: "Testimonials", icon: MessageSquareQuote, accent: "#3b82f6", animation: "Logo wall (top) + compact quote grid (bottom) + gradient avatar circles", source: "more" },
  { slug: "testimonials013-card", href: "/components/cards/testimonials013-card", title: "Horizontal Scroll-Snap Carousel", category: "Testimonials", icon: MessageSquareQuote, accent: "#06b6d4", animation: "Horizontal scroll-snap carousel + prev/next arrows + dark slate bg", source: "more" },
  { slug: "testimonials014-card", href: "/components/cards/testimonials014-card", title: "Terminal CLI Green Phosphor", category: "Testimonials", icon: MessageSquareQuote, accent: "#22c55e", animation: "Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono + comment style", source: "more" },
  { slug: "testimonials015-card", href: "/components/cards/testimonials015-card", title: "Apple Minimal Spacious Large Quotes", category: "Testimonials", icon: MessageSquareQuote, accent: "#0071e3", animation: "Apple-style minimal spacious large quotes + SF Pro-like + centered", source: "more" },
  { slug: "testimonials016-card", href: "/components/cards/testimonials016-card", title: "Warm Earthy Fraunces Grain Leaf", category: "Testimonials", icon: MessageSquareQuote, accent: "#92400e", animation: "Warm earthy beige + Fraunces serif + paper grain + leaf badge + italic", source: "more" },
  { slug: "testimonials017-card", href: "/components/cards/testimonials017-card", title: "Dark Luxury Gold Cormorant Italic", category: "Testimonials", icon: MessageSquareQuote, accent: "#d4af37", animation: "Dark luxury gold serif + Cormorant Garamond + gold gradient text + italic", source: "more" },
  { slug: "testimonials018-card", href: "/components/cards/testimonials018-card", title: "Bento Grid Mixed Size Tiles", category: "Testimonials", icon: MessageSquareQuote, accent: "#8b5cf6", animation: "Bento grid mixed-size tiles + featured large + hover glow + Quote icons", source: "more" },
  { slug: "testimonials019-card", href: "/components/cards/testimonials019-card", title: "Holographic Iridescent Conic Border", category: "Testimonials", icon: MessageSquareQuote, accent: "#8338ec", animation: "Holographic iridescent rotating conic-gradient borders + dark glass interior", source: "more" },
  { slug: "testimonials020-card", href: "/components/cards/testimonials020-card", title: "Industry Verticals Comparison", category: "Testimonials", icon: MessageSquareQuote, accent: "#3b82f6", animation: "Industry verticals comparison + 4 categories with icons + sub-testimonials", source: "more" },
  { slug: "testimonials021-card", href: "/components/cards/testimonials021-card", title: "Origami Folded 3D Perspective", category: "Testimonials", icon: MessageSquareQuote, accent: "#ec4899", animation: "Origami folded cards + 3D perspective hover + diagonal corner accents", source: "more" },
  { slug: "testimonials022-card", href: "/components/cards/testimonials022-card", title: "Neumorphic Soft Embossed Cards", category: "Testimonials", icon: MessageSquareQuote, accent: "#6366f1", animation: "Neumorphic soft UI embossed cards + dual shadows + raised avatar wells", source: "more" },
  { slug: "testimonials023-card", href: "/components/cards/testimonials023-card", title: "Cyberpunk Neon Grid Floor Glitch", category: "Testimonials", icon: MessageSquareQuote, accent: "#ec4899", animation: "Cyberpunk neon grid floor + scanlines + neon glowing border cards", source: "more" },
  { slug: "testimonials024-card", href: "/components/cards/testimonials024-card", title: "Stripe Minimal Sliding Quote Rows", category: "Testimonials", icon: MessageSquareQuote, accent: "#635bff", animation: "Stripe-style minimal sliding quote rows + indigo accent + arrow hover slide", source: "more" },
  { slug: "feature-bento-card", href: "/components/cards/feature-bento-card", title: "Bento Features", category: "Features", icon: Layers, accent: "#8b5cf6", animation: "Mixed-size bento grid + hover glow + staggered entrance + icon cards", source: "more" },
  { slug: "feature-icon-grid-card", href: "/components/cards/feature-icon-grid-card", title: "Icon Grid Features", category: "Features", icon: Layers, accent: "#06b6d4", animation: "4-column icon grid + hover lift + colored icon wells + fade-up", source: "more" },
  { slug: "feature-alternating-card", href: "/components/cards/feature-alternating-card", title: "Alternating Image Text", category: "Features", icon: Layers, accent: "#f59e0b", animation: "Alternating left/right image+text rows + scroll reveal + Unsplash images", source: "more" },
  { slug: "feature-screenshot-card", href: "/components/cards/feature-screenshot-card", title: "Product Screenshot", category: "Features", icon: Layers, accent: "#6366f1", animation: "Large product screenshot mockup + floating annotations + browser chrome", source: "more" },
  { slug: "feature-sticky-scroll-card", href: "/components/cards/feature-sticky-scroll-card", title: "Sticky Scroll Features", category: "Features", icon: Layers, accent: "#ec4899", animation: "Sticky left panel + scrolling right panels + intersection reveal", source: "more" },
  { slug: "feature-tabbed-card", href: "/components/cards/feature-tabbed-card", title: "Tabbed Features", category: "Features", icon: Layers, accent: "#10b981", animation: "Tab switcher + animated content panels + layoutId indicator", source: "more" },
  { slug: "feature-comparison-card", href: "/components/cards/feature-comparison-card", title: "Feature Comparison", category: "Features", icon: Layers, accent: "#0ea5e9", animation: "Side-by-side comparison table + checkmarks + highlighted column", source: "more" },
  { slug: "feature-timeline-card", href: "/components/cards/feature-timeline-card", title: "Timeline Features", category: "Features", icon: Layers, accent: "#7c3aed", animation: "Vertical timeline + alternating cards + scroll-triggered animation", source: "more" },
  { slug: "feature-metrics-card", href: "/components/cards/feature-metrics-card", title: "Metrics Features", category: "Features", icon: Layers, accent: "#f97316", animation: "Big animated counters + feature cards + gradient stat blocks", source: "more" },
  { slug: "feature-video-card", href: "/components/cards/feature-video-card", title: "Video Feature Showcase", category: "Features", icon: Layers, accent: "#dc2626", animation: "Video player mockup + play button + feature bullets + dark theme", source: "more" },
  { slug: "feature-integration-card", href: "/components/cards/feature-integration-card", title: "Integration Features", category: "Features", icon: Layers, accent: "#059669", animation: "Logo grid + integration cards + hover zoom + API badges", source: "more" },
  { slug: "feature-security-card", href: "/components/cards/feature-security-card", title: "Security Features", category: "Features", icon: Layers, accent: "#475569", animation: "Dark security theme + shield icons + compliance badges + lock animations", source: "more" },
  { slug: "feature-developer-card", href: "/components/cards/feature-developer-card", title: "Developer Features", category: "Features", icon: Layers, accent: "#22c55e", animation: "Terminal theme + code blocks + syntax highlight + CLI feature cards", source: "more" },
  { slug: "feature-ai-card", href: "/components/cards/feature-ai-card", title: "AI Product Features", category: "Features", icon: Layers, accent: "#a855f7", animation: "AI gradient + chat mockup + model cards + neural network bg", source: "more" },
  { slug: "feature-mobile-card", href: "/components/cards/feature-mobile-card", title: "Mobile App Features", category: "Features", icon: Layers, accent: "#3b82f6", animation: "Phone mockup + feature bullets + app store badges + floating cards", source: "more" },
  { slug: "feature-dashboard-preview-card", href: "/components/cards/feature-dashboard-preview-card", title: "Dashboard Preview", category: "Features", icon: Layers, accent: "#6366f1", animation: "Dashboard UI mockup + chart cards + sidebar + stat tiles", source: "more" },
  { slug: "feature-horizontal-scroll-card", href: "/components/cards/feature-horizontal-scroll-card", title: "Horizontal Scroll Features", category: "Features", icon: Layers, accent: "#f43f5e", animation: "Horizontal scroll-snap carousel + drag + feature cards", source: "more" },
  { slug: "feature-accordion-card", href: "/components/cards/feature-accordion-card", title: "Accordion Features", category: "Features", icon: Layers, accent: "#0ea5e9", animation: "Expandable accordion + smooth height animation + icon rotation", source: "more" },
  { slug: "feature-hotspot-card", href: "/components/cards/feature-hotspot-card", title: "Interactive Hotspot", category: "Features", icon: Layers, accent: "#8b5cf6", animation: "Product image + clickable hotspots + tooltip popovers + pulse dots", source: "more" },
  { slug: "feature-before-after-card", href: "/components/cards/feature-before-after-card", title: "Before After Features", category: "Features", icon: Layers, accent: "#f59e0b", animation: "Before/after slider + drag handle + feature comparison", source: "more" },
  { slug: "feature-hover-preview-card", href: "/components/cards/feature-hover-preview-card", title: "Hover Preview Cards", category: "Features", icon: Layers, accent: "#ec4899", animation: "Feature cards with hover video preview + overlay + play button", source: "more" },
  { slug: "feature-editorial-card", href: "/components/cards/feature-editorial-card", title: "Minimal Editorial Features", category: "Features", icon: Layers, accent: "#92400e", animation: "Serif typography + generous whitespace + numbered features + rule lines", source: "more" },
  { slug: "feature-dark-product-card", href: "/components/cards/feature-dark-product-card", title: "Dark Product Features", category: "Features", icon: Layers, accent: "#06b6d4", animation: "Dark theme + glow accents + product cards + neon borders", source: "more" },
  { slug: "feature-full-width-card", href: "/components/cards/feature-full-width-card", title: "Full-Width Feature Story", category: "Features", icon: Layers, accent: "#7c3aed", animation: "Full-bleed image + overlay text + scroll parallax + feature pillars", source: "more" },
  { slug: "cta-minimal-centered-card", href: "/components/cards/cta-minimal-centered-card", title: "Minimal Centered CTA", category: "CTA", icon: Sparkle, accent: "#6366f1", animation: "Centered headline + single CTA + minimal white bg", source: "more" },
  { slug: "cta-split-image-card", href: "/components/cards/cta-split-image-card", title: "Split Image CTA", category: "CTA", icon: Sparkle, accent: "#f59e0b", animation: "Left image + right CTA panel + Unsplash photo", source: "more" },
  { slug: "cta-product-screenshot-card", href: "/components/cards/cta-product-screenshot-card", title: "Product Screenshot CTA", category: "CTA", icon: Sparkle, accent: "#0ea5e9", animation: "Browser mockup + CTA below + dark bg", source: "more" },
  { slug: "cta-floating-card-card", href: "/components/cards/cta-floating-card-card", title: "Floating Card CTA", category: "CTA", icon: Sparkle, accent: "#8b5cf6", animation: "Glassmorphism floating card + gradient bg + glow", source: "more" },
  { slug: "cta-full-width-dark-card", href: "/components/cards/cta-full-width-dark-card", title: "Full-Width Dark CTA", category: "CTA", icon: Sparkle, accent: "#06b6d4", animation: "Full-bleed dark section + gradient text + dual CTA", source: "more" },
  { slug: "cta-newsletter-card", href: "/components/cards/cta-newsletter-card", title: "Newsletter Signup CTA", category: "CTA", icon: Sparkle, accent: "#10b981", animation: "Email input + subscribe button + subscriber count", source: "more" },
  { slug: "cta-app-download-card", href: "/components/cards/cta-app-download-card", title: "App Download CTA", category: "CTA", icon: Sparkle, accent: "#3b82f6", animation: "Phone mockup + app store badges + QR code", source: "more" },
  { slug: "cta-dual-action-card", href: "/components/cards/cta-dual-action-card", title: "Dual Action CTA", category: "CTA", icon: Sparkle, accent: "#ec4899", animation: "Two side-by-side CTA buttons + comparison", source: "more" },
  { slug: "cta-pricing-upgrade-card", href: "/components/cards/cta-pricing-upgrade-card", title: "Pricing Upgrade CTA", category: "CTA", icon: Sparkle, accent: "#f97316", animation: "Upgrade prompt + plan comparison + CTA", source: "more" },
  { slug: "cta-free-trial-card", href: "/components/cards/cta-free-trial-card", title: "Free Trial CTA", category: "CTA", icon: Sparkle, accent: "#7c3aed", animation: "14-day trial + no credit card + benefits list", source: "more" },
  { slug: "cta-contact-sales-card", href: "/components/cards/cta-contact-sales-card", title: "Contact Sales CTA", category: "CTA", icon: Sparkle, accent: "#475569", animation: "Enterprise CTA + form teaser + phone number", source: "more" },
  { slug: "cta-waitlist-card", href: "/components/cards/cta-waitlist-card", title: "Waitlist CTA", category: "CTA", icon: Sparkle, accent: "#dc2626", animation: "Limited spots + email input + countdown", source: "more" },
  { slug: "cta-demo-booking-card", href: "/components/cards/cta-demo-booking-card", title: "Demo Booking CTA", category: "CTA", icon: Sparkle, accent: "#059669", animation: "Calendar mockup + book demo + time slots", source: "more" },
  { slug: "cta-community-join-card", href: "/components/cards/cta-community-join-card", title: "Community Join CTA", category: "CTA", icon: Sparkle, accent: "#5865F2", animation: "Discord + member count + join button + dark", source: "more" },
  { slug: "cta-integration-cta-card", href: "/components/cards/cta-integration-cta-card", title: "Integration CTA", category: "CTA", icon: Sparkle, accent: "#0ea5e9", animation: "Logo grid + connect your stack + API badge", source: "more" },
  { slug: "cta-statistics-card", href: "/components/cards/cta-statistics-card", title: "Statistics CTA", category: "CTA", icon: Sparkle, accent: "#f59e0b", animation: "Big numbers + animated counters + CTA below", source: "more" },
  { slug: "cta-testimonial-cta-card", href: "/components/cards/cta-testimonial-cta-card", title: "Testimonial CTA", category: "CTA", icon: Sparkle, accent: "#a855f7", animation: "Quote + avatar + rating + CTA + social proof", source: "more" },
  { slug: "cta-sticky-bottom-card", href: "/components/cards/cta-sticky-bottom-card", title: "Sticky Bottom CTA", category: "CTA", icon: Sparkle, accent: "#18181b", animation: "Fixed bottom bar + dismiss + CTA + dark", source: "more" },
  { slug: "cta-mobile-app-card", href: "/components/cards/cta-mobile-app-card", title: "Mobile App CTA", category: "CTA", icon: Sparkle, accent: "#2563eb", animation: "App screenshot + features + download buttons", source: "more" },

  // ── Charts (PRO) ── Insight Bento Dashboard — 35 animated bento cards
  { slug: "insight-bento-dashboard-card", href: "/components/cards/insight-bento-dashboard-card", title: "Insight Bento Dashboard", category: "Charts", icon: BarChart3, accent: "#ec1e79", animation: "35 animated bento cards · bar/line/area/donut/radial/wave/contribution · masonry grid", source: "more" },
  { slug: "insight-bento-monochrome-blue-card", href: "/components/cards/insight-bento-monochrome-blue-card", title: "Insight Bento Monochrome Blue", category: "Charts", icon: BarChart3, accent: "#2563eb", animation: "Monochrome blue palette · navy → royal → sky → cyan · 35 animated bento cards", source: "more" },

  // ── Modals & Drawers (24 components) ──
  { slug: "confirmation-dialog-card", href: "/components/cards/confirmation-dialog-card", title: "Task Creation Modal", category: "Modals", icon: SquareStack, accent: "#6366f1", animation: "Form with char counter + color label swatches + assignee dropdown + date pickers + auto-save", source: "more" },
  { slug: "delete-alert-card", href: "/components/cards/delete-alert-card", title: "Delete Alert", category: "Modals", icon: SquareStack, accent: "#ef4444", animation: "Destructive alert with type-to-confirm + red gradient header", source: "more" },
  { slug: "command-palette-card", href: "/components/cards/command-palette-card", title: "Command Palette", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "⌘K fuzzy search + keyboard nav + grouped results + arrow keys", source: "more" },
  { slug: "quick-view-modal-card", href: "/components/cards/quick-view-modal-card", title: "Quick View Modal", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "Product quick view with image + price + color swatches + add to cart", source: "more" },
  { slug: "product-preview-card", href: "/components/cards/product-preview-card", title: "Product Preview", category: "Modals", icon: SquareStack, accent: "#ec4899", animation: "Fullscreen gallery with thumbnails + crossfade transitions", source: "more" },
  { slug: "checkout-drawer-card", href: "/components/cards/checkout-drawer-card", title: "Checkout Drawer", category: "Modals", icon: SquareStack, accent: "#10b981", animation: "Right slide drawer with order items + totals + purchase CTA", source: "more" },
  { slug: "cart-drawer-card", href: "/components/cards/cart-drawer-card", title: "Cart Drawer", category: "Modals", icon: SquareStack, accent: "#3b82f6", animation: "Right slide cart with quantity steppers + running total", source: "more" },
  { slug: "filter-drawer-card", href: "/components/cards/filter-drawer-card", title: "Filter Drawer", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "Left slide filter with price range + categories + rating stars", source: "more" },
  { slug: "settings-modal-card", href: "/components/cards/settings-modal-card", title: "Settings Modal", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "Tabbed settings with general/notifications/appearance + toggle switches", source: "more" },
  { slug: "invite-team-dialog-card", href: "/components/cards/invite-team-dialog-card", title: "Invite Team Dialog", category: "Modals", icon: SquareStack, accent: "#3b82f6", animation: "Email invite + role select + pending list + copy invite link", source: "more" },
  { slug: "share-dialog-card", href: "/components/cards/share-dialog-card", title: "Share Dialog", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "Social share buttons + access levels + copy link with feedback", source: "more" },
  { slug: "file-preview-modal-card", href: "/components/cards/file-preview-modal-card", title: "File Preview Modal", category: "Modals", icon: SquareStack, accent: "#f43f5e", animation: "PDF preview with page navigation + download + rotate controls", source: "more" },
  { slug: "search-overlay-card", href: "/components/cards/search-overlay-card", title: "Search Overlay", category: "Modals", icon: SquareStack, accent: "#06b6d4", animation: "Fullscreen blurred search with recent + suggestions + ESC to close", source: "more" },
  { slug: "notification-panel-card", href: "/components/cards/notification-panel-card", title: "Notification Panel", category: "Modals", icon: SquareStack, accent: "#f59e0b", animation: "Right slide panel with unread badges + mark all as read + layout animations", source: "more" },
  { slug: "contact-form-modal-card", href: "/components/cards/contact-form-modal-card", title: "Contact Form Modal", category: "Modals", icon: SquareStack, accent: "#06b6d4", animation: "Gradient header form with name/email/message + success state animation", source: "more" },
  { slug: "upgrade-plan-modal-card", href: "/components/cards/upgrade-plan-modal-card", title: "Upgrade Plan Modal", category: "Modals", icon: SquareStack, accent: "#f59e0b", animation: "3-tier pricing with monthly/yearly toggle + popular badge + feature lists", source: "more" },
  { slug: "onboarding-dialog-card", href: "/components/cards/onboarding-dialog-card", title: "Onboarding Dialog", category: "Modals", icon: SquareStack, accent: "#8b5cf6", animation: "Multi-step welcome flow with progress dots + skip + finish", source: "more" },
  { slug: "multi-step-modal-card", href: "/components/cards/multi-step-modal-card", title: "Multi-Step Modal", category: "Modals", icon: SquareStack, accent: "#3b82f6", animation: "Wizard form with step indicator + back/next + slide transitions", source: "more" },
  { slug: "fullscreen-editor-card", href: "/components/cards/fullscreen-editor-card", title: "Fullscreen Editor", category: "Modals", icon: SquareStack, accent: "#10b981", animation: "Immersive code editor with toolbar + word count + save/exit", source: "more" },
  { slug: "mobile-bottom-sheet-card", href: "/components/cards/mobile-bottom-sheet-card", title: "Mobile Bottom Sheet", category: "Modals", icon: SquareStack, accent: "#06b6d4", animation: "Bottom slide-up sheet with drag handle + snap points + swipe to dismiss", source: "more" },
  { slug: "context-menu-card", href: "/components/cards/context-menu-card", title: "Context Menu", category: "Modals", icon: SquareStack, accent: "#64748b", animation: "Right-click menu with cut/copy/paste + dividers + sub-menus", source: "more" },
  { slug: "hover-card-card", href: "/components/cards/hover-card-card", title: "Hover Card", category: "Modals", icon: SquareStack, accent: "#a855f7", animation: "Rich hover card with avatar + stats + rating + delay show/hide", source: "more" },
  { slug: "popover-form-card", href: "/components/cards/popover-form-card", title: "Popover Form", category: "Modals", icon: SquareStack, accent: "#ec4899", animation: "Inline popover form with arrow pointer + outside click close", source: "more" },
  { slug: "nested-drawer-card", href: "/components/cards/nested-drawer-card", title: "Nested Drawer", category: "Modals", icon: SquareStack, accent: "#f59e0b", animation: "Drawer within drawer with breadcrumb + back navigation + slide transitions", source: "more" },

  // ── Sidebar (22 components) ──
  { slug: "aurora-sidebar-card", href: "/components/cards/aurora-sidebar-card", title: "Aurora Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#7c3aed", animation: "Collapsible sidebar · smooth width transition · active pill · hover glow · search · user profile · dark/light", source: "more" },
  { slug: "glass-float-sidebar-card", href: "/components/cards/glass-float-sidebar-card", title: "Glass Float Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#8b5cf6", animation: "Floating glassmorphism · backdrop-blur · ambient gradient blobs · glass pills", source: "more" },
  { slug: "ink-dark-sidebar-card", href: "/components/cards/ink-dark-sidebar-card", title: "Ink Dark Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#10b981", animation: "Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse · Linear-style", source: "more" },
  { slug: "pastel-soft-sidebar-card", href: "/components/cards/pastel-soft-sidebar-card", title: "Pastel Soft Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#ec4899", animation: "Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles · pill search", source: "more" },
  { slug: "gradient-border-sidebar-card", href: "/components/cards/gradient-border-sidebar-card", title: "Gradient Border Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#a855f7", animation: "Dark sidebar · animated gradient border · neon icon glow · cyberpunk style", source: "more" },
  { slug: "aurora-bento-sidebar-card", href: "/components/cards/aurora-bento-sidebar-card", title: "Aurora Bento Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#6366f1", animation: "Container-aware bento navigation · mixed-size tiles · narrow full-width mode · reduced-motion staggered entrance", source: "more" },
  { slug: "rail-dock-sidebar-card", href: "/components/cards/rail-dock-sidebar-card", title: "Rail Dock Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#06b6d4", animation: "macOS dock · hover and focus magnification · rail-relative tooltips · active bar · searchable navigation", source: "more" },
  { slug: "neumorphic-sidebar-card", href: "/components/cards/neumorphic-sidebar-card", title: "Neumorphic Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#6366f1", animation: "Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised search input", source: "more" },
  { slug: "compact-pill-sidebar-card", href: "/components/cards/compact-pill-sidebar-card", title: "Compact Pill Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#ec4899", animation: "Ultra-minimal pill rail · labels expand on hover, focus, or tap · pinned touch disclosure · spring width animation", source: "more" },
  { slug: "dual-panel-sidebar-card", href: "/components/cards/dual-panel-sidebar-card", title: "Dual Panel Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#3b82f6", animation: "Two-level expandable · searchable parent groups · smooth height animation · labeled child icon navigation when collapsed", source: "more" },
  { slug: "magnetic-sidebar-card", href: "/components/cards/magnetic-sidebar-card", title: "Magnetic Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#818cf8", animation: "Icons pull toward cursor · animated gradient active bg · radial glow · neon icon drop-shadow", source: "more" },
  { slug: "command-center-sidebar-card", href: "/components/cards/command-center-sidebar-card", title: "Command Center Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#3b82f6", animation: "DevOps terminal style · monospace · status indicators · CPU sparkline · dark ops dashboard", source: "more" },
  { slug: "sage-forest-sidebar-card", href: "/components/cards/sage-forest-sidebar-card", title: "Sage Forest Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#4a7c3a", animation: "Earthy sage green · organic rounded shapes · section-colored gradients · eco/wellness vibe", source: "more" },
  { slug: "crimson-pro-sidebar-card", href: "/components/cards/crimson-pro-sidebar-card", title: "Crimson Pro Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#dc2626", animation: "Bold executive · crimson red accents · uppercase typography · solid active bar · enterprise", source: "more" },
  { slug: "midnight-velvet-sidebar-card", href: "/components/cards/midnight-velvet-sidebar-card", title: "Midnight Velvet Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#f59e0b", animation: "Luxury dark purple · gold accents · Georgia serif · velvet texture · VIP/premium feel", source: "more" },
  { slug: "arctic-frost-sidebar-card", href: "/components/cards/arctic-frost-sidebar-card", title: "Arctic Frost Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#0ea5e9", animation: "Icy frost blue · snow texture · glassmorphism · rounded organic · winter/cloud app", source: "more" },
  { slug: "sunset-blvd-sidebar-card", href: "/components/cards/sunset-blvd-sidebar-card", title: "Sunset Blvd Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#f97316", animation: "Warm sunset gradient · time-of-day greeting · orange-pink-purple · creative/lifestyle", source: "more" },
  { slug: "mono-editorial-sidebar-card", href: "/components/cards/mono-editorial-sidebar-card", title: "Mono Editorial Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#000000", animation: "Pure black & white · Georgia serif · newspaper masthead · no color · editorial/publication", source: "more" },
  { slug: "cyber-grid-sidebar-card", href: "/components/cards/cyber-grid-sidebar-card", title: "Cyber Grid Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#00ff88", animation: "Neon green matrix · monospace · scanline overlay · CRT glow · hacker/terminal dashboard", source: "more" },
  { slug: "rose-quartz-sidebar-card", href: "/components/cards/rose-quartz-sidebar-card", title: "Rose Quartz Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#e11d48", animation: "Soft rose pink · Georgia serif · premium boutique · gem accents · beauty/fashion luxury", source: "more" },
  { slug: "carbon-fiber-sidebar-card", href: "/components/cards/carbon-fiber-sidebar-card", title: "Carbon Fiber Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#fb923c", animation: "Carbon weave texture · industrial orange · telemetry gauge · automotive/engineering", source: "more" },
  { slug: "lavender-mist-sidebar-card", href: "/components/cards/lavender-mist-sidebar-card", title: "Lavender Mist Sidebar", category: "Sidebar", icon: PanelLeft, accent: "#8b5cf6", animation: "Soft lavender purple · misty fog overlay · glassmorphism · calming wellness vibe", source: "more" },
  // ── AI & Agents ──
  { slug: "ai-chat-interface-card", href: "/components/cards/ai-chat-interface-card", title: "AI Chat Interface", category: "AI", icon: Sparkle, accent: "#8b5cf6", animation: "Full ChatGPT-style chat · streaming typewriter · model selector · token/cost · regenerate/edit/copy/like · conversation sidebar", source: "more" },
  { slug: "ai-voice-assistant-card", href: "/components/cards/ai-voice-assistant-card", title: "AI Voice Assistant", category: "AI", icon: Mic, accent: "#d97757", animation: "Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end controls · device and voice selectors · transcript export", source: "more" },
  { slug: "ai-research-workspace-card", href: "/components/cards/ai-research-workspace-card", title: "AI Research Workspace", category: "AI", icon: BookOpen, accent: "#20808d", animation: "Evidence-first research · source management · staged analysis · cited report · notes · copy and Markdown export", source: "more" },
  { slug: "ai-code-copilot-card", href: "/components/cards/ai-code-copilot-card", title: "AI Code Copilot", category: "AI", icon: Code2, accent: "#d97757", animation: "Editable code workspace · agent chat · review diff · apply/reject patch · terminal · problems · simulated test runner", source: "more" },
  { slug: "ai-support-copilot-card", href: "/components/cards/ai-support-copilot-card", title: "AI Support Copilot", category: "AI", icon: Inbox, accent: "#d97757", animation: "Support inbox · customer timeline · AI case brief · tone-aware drafts · internal notes · assignment and resolution controls", source: "more" },
  { slug: "cta-developer-api-card", href: "/components/cards/cta-developer-api-card", title: "Developer API CTA", category: "CTA", icon: Sparkle, accent: "#22c55e", animation: "Code block + API endpoint + get API key + dark", source: "more" },
  { slug: "cta-ecommerce-offer-card", href: "/components/cards/cta-ecommerce-offer-card", title: "Ecommerce Offer CTA", category: "CTA", icon: Sparkle, accent: "#e11d48", animation: "Discount + countdown timer + shop now + sale", source: "more" },
  { slug: "cta-background-video-card", href: "/components/cards/cta-background-video-card", title: "Background Video CTA", category: "CTA", icon: Sparkle, accent: "#1e1b4b", animation: "Video bg + overlay text + CTA + immersive", source: "more" },
  { slug: "cta-bento-card", href: "/components/cards/cta-bento-card", title: "Bento CTA", category: "CTA", icon: Sparkle, accent: "#8338ec", animation: "Mixed-size bento grid + CTA tiles + hover glow", source: "more" },
  { slug: "cta-final-conversion-card", href: "/components/cards/cta-final-conversion-card", title: "Final Conversion CTA", category: "CTA", icon: Sparkle, accent: "#0a0a0f", animation: "Last-chance CTA + urgency + gradient + full-width", source: "more" },

  // ── Core Cards ──
  { slug: "cinematic-folder-card", href: "/components/cards/cinematic-folder-card", title: "Cinematic Folder", category: "Core", icon: FolderOpen, accent: "#22d3ee", animation: "3D folder open", source: "original" },
  { slug: "glass-feature-card", href: "/components/cards/glass-feature-card", title: "Glass Feature", category: "Core", icon: Sparkles, accent: "#818cf8", animation: "Light sweep + tilt", source: "original" },
  { slug: "pricing-plan-card", href: "/components/cards/pricing-plan-card", title: "Pricing Plan", category: "Core", icon: CreditCard, accent: "#34d399", animation: "Border pulse + CTA glow", source: "original" },
  { slug: "login-auth-card", href: "/components/cards/login-auth-card", title: "Login Auth", category: "Core", icon: LogIn, accent: "#6366f1", animation: "Two-column split", source: "more" },
  { slug: "electric-border-card", href: "/components/cards/electric-border-card", title: "Security Status", category: "Core", icon: Zap, accent: "#a3e635", animation: "SVG turbulence border", source: "more" },

  // ── Content Cards ──
  { slug: "blog-post-card", href: "/components/cards/blog-post-card", title: "Blog Post", category: "Content", icon: Newspaper, accent: "#10b981", animation: "Hover lift + scale", source: "more" },
  { slug: "flashcard-stack-card", href: "/components/cards/flashcard-stack-card", title: "Flashcard Deck", category: "Content", icon: GraduationCap, accent: "#d4a574", animation: "Peek-out fan + flip", source: "more" },
  { slug: "ai-generation-result-card", href: "/components/cards/ai-generation-result-card", title: "AI Generation Result", category: "Content", icon: Wand2, accent: "#d946ef", animation: "Holographic shimmer", source: "original" },
  { slug: "upload-progress-card", href: "/components/cards/upload-progress-card", title: "Upload Progress", category: "Content", icon: UploadCloud, accent: "#06b6d4", animation: "Progress states + drag", source: "original" },

  // ── Product Cards ──
  { slug: "ecommerce-product-card", href: "/components/cards/ecommerce-product-card", title: "Ecommerce Product", category: "Product", icon: ShoppingBag, accent: "#fbbf24", animation: "Zoom + quick view", source: "original" },
  { slug: "hover-video-product-card", href: "/components/cards/hover-video-product-card", title: "Media Product", category: "Product", icon: PlayCircle, accent: "#f59e0b", animation: "Hover video reveal", source: "more" },
  { slug: "product-feature-showcase-card", href: "/components/cards/product-feature-showcase-card", title: "Feature Showcase", category: "Product", icon: Smartphone, accent: "#3b82f6", animation: "Accordion + crossfade", source: "more" },
  { slug: "event-booking-card", href: "/components/cards/event-booking-card", title: "Event Booking", category: "Product", icon: Calendar, accent: "#a855f7", animation: "Ticket stub + RSVP", source: "original" },
  { slug: "mountain-hike-card", href: "/components/cards/mountain-hike-card", title: "Adventure Trip", category: "Product", icon: Mountain, accent: "#059669", animation: "Photo fan + stats", source: "more" },

  // ── Profile Cards ──
  { slug: "creator-profile-card", href: "/components/cards/creator-profile-card", title: "Creator Profile", category: "Profile", icon: UserCircle, accent: "#f59e0b", animation: "Tilt + cover parallax", source: "original" },
  { slug: "profile-flip-card", href: "/components/cards/profile-flip-card", title: "Profile Flip", category: "Profile", icon: UserSquare, accent: "#8b5cf6", animation: "3D flip + edit", source: "more" },
  { slug: "liquid-metal-id-card", href: "/components/cards/liquid-metal-id-card", title: "Access Pass", category: "Profile", icon: IdCard, accent: "#22d3ee", animation: "Liquid shader + flip", source: "more" },
  { slug: "team-directory-card", href: "/components/cards/team-directory-card", title: "Team Availability", category: "Profile", icon: Users, accent: "#fb7185", animation: "Filter + hover preview", source: "more" },

  // ── Data Cards ──
  { slug: "analytics-insight-card", href: "/components/cards/analytics-insight-card", title: "Analytics Insight", category: "Data", icon: BarChart3, accent: "#10b981", animation: "Count-up + sparkline", source: "original" },
  { slug: "year-in-review-card", href: "/components/cards/year-in-review-card", title: "Year in Review", category: "Data", icon: PartyPopper, accent: "#a78bfa", animation: "KPI ring + timeline", source: "more" },
  { slug: "notification-inbox-card", href: "/components/cards/notification-inbox-card", title: "Notification Inbox", category: "Data", icon: Bell, accent: "#6366f1", animation: "Swipe + slide actions", source: "original" },
  { slug: "notification-styles-card", href: "/components/cards/notification-styles-card", title: "Notification Center", category: "Data", icon: BellRing, accent: "#3b82f6", animation: "Priority filter + reveal", source: "more" },

  // ── Stack Cards ──
  { slug: "domain-category-stack-card", href: "/components/cards/domain-category-stack-card", title: "Domain Intelligence", category: "Stack", icon: Globe, accent: "#0ea5e9", animation: "Swipe stack + score", source: "more" },
  { slug: "real-estate-stack-card", href: "/components/cards/real-estate-stack-card", title: "Property Discovery", category: "Stack", icon: Home, accent: "#a8a29e", animation: "Swipe + save", source: "more" },
  { slug: "art-content-stack-card", href: "/components/cards/art-content-stack-card", title: "Gallery Collection", category: "Stack", icon: ImageIcon, accent: "#d4a574", animation: "Spring stack advance", source: "more" },

  // ── More Cards (new batch) ──
  { slug: "animated-border-weather-card", href: "/components/cards/animated-border-weather-card", title: "Weather Dashboard", category: "Core", icon: CloudSun, accent: "#0968e5", animation: "Spinning conic-gradient border", source: "more" },
  { slug: "neumorphic-profile-grid-card", href: "/components/cards/neumorphic-profile-grid-card", title: "Neumorphic Team Grid", category: "Profile", icon: Grid3x3, accent: "#3b82f6", animation: "Neumorphic shadows + filter", source: "more" },
  { slug: "editable-3d-profile-card", href: "/components/cards/editable-3d-profile-card", title: "Editable 3D Profile", category: "Profile", icon: RotateCw, accent: "#06b6d4", animation: "Drag-to-rotate + edit flip", source: "more" },
  { slug: "cat-slider-card", href: "/components/cards/cat-slider-card", title: "Cat Slider", category: "Agents", icon: Crown, accent: "#ED5565", animation: "5 expandable cat cards (Docked)", source: "more" },
  { slug: "animated-card-stack-card", href: "/components/cards/animated-card-stack-card", title: "Animated Card Stack", category: "Agents", icon: Crown, accent: "#a855f7", animation: "Infinite card stack with framer-motion spring", source: "more" },
  { slug: "art-gallery-slider-card", href: "/components/cards/art-gallery-slider-card", title: "Art Gallery Slider", category: "Agents", icon: Crown, accent: "#1a1a2e", animation: "Full-screen art gallery + drag/wheel/keyboard nav", source: "more" },
  { slug: "linear-feature-cards-card", href: "/components/cards/linear-feature-cards-card", title: "Linear Feature Cards", category: "Agents", icon: Crown, accent: "#0d0d0d", animation: "3 expandable feature cards with layoutId modal morph", source: "more" },
  { slug: "spinner-patterns-card", href: "/components/cards/spinner-patterns-card", title: "Spinner Patterns", category: "Agents", icon: Crown, accent: "#3b82f6", animation: "15 CSS loading spinner patterns", source: "more" },
  { slug: "year-wrapped-dashboard-card", href: "/components/cards/year-wrapped-dashboard-card", title: "Year Wrapped Dashboard", category: "Agents", icon: Crown, accent: "#10b981", animation: "Multi-style responsive dashboard", source: "more" },
  { slug: "supabase-theme-card", href: "/components/cards/supabase-theme-card", title: "Supabase Theme", category: "Agents", icon: Crown, accent: "#3ecf8e", animation: "Tinte Supabase theme demo", source: "more" },
  { slug: "chatgpt-theme-card", href: "/components/cards/chatgpt-theme-card", title: "ChatGPT Theme", category: "Agents", icon: Crown, accent: "#19c37d", animation: "Tinte ChatGPT theme demo", source: "more" },

  // ── Auth Set 002 (auth-flows inspired)

  // ── Auth Set 003 (liquid glass)

  // ── Auth Set 004 (image panel)

  // ── Auth Set 005 (animated split, dark)

  // ── Auth Set 006 (dark modern)

  // ── Auth Standalone Specials

  // ── Error Set 002 (Minimal Monochrome)

  // ── Error Set 003 (Illustrated Playful)

  // ── Error Set 004 (Dark Cinematic Glitch)

  // ── Error Set 005 (Gradient Brand-themed)

  // ── Error Standalone Specials
  // ── Backgrounds ──
  { slug: "aurora-mesh-bg-card", href: "/components/cards/aurora-mesh-bg-card", title: "Aurora Commerce", category: "Backgrounds", icon: ImageIcon, accent: "#7c3aed", animation: "Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark", source: "more" },
  { slug: "particle-constellation-bg-card", href: "/components/cards/particle-constellation-bg-card", title: "Executive Constellation", category: "Backgrounds", icon: ImageIcon, accent: "#4f46e5", animation: "Deterministic SVG network · technical depth · no canvas loop · light/dark", source: "more" },
  { slug: "liquid-metal-bg-card", href: "/components/cards/liquid-metal-bg-card", title: "Liquid Chrome", category: "Backgrounds", icon: ImageIcon, accent: "#64748b", animation: "Controlled metallic halo · luxury product lighting · reduced-motion safe", source: "more" },
  { slug: "geometric-grid-bg-card", href: "/components/cards/geometric-grid-bg-card", title: "Precision Grid", category: "Backgrounds", icon: ImageIcon, accent: "#4f46e5", animation: "Architectural CSS grid · enterprise hero contrast · subtle background-position drift", source: "more" },
  { slug: "neon-wave-bg-card", href: "/components/cards/neon-wave-bg-card", title: "Electric Silk", category: "Backgrounds", icon: ImageIcon, accent: "#2563eb", animation: "Elegant SVG ribbons · restrained luminous color · CTA-ready contrast", source: "more" },
  { slug: "floating-orbs-bg-card", href: "/components/cards/floating-orbs-bg-card", title: "Ambient Orbs", category: "Backgrounds", icon: ImageIcon, accent: "#8b5cf6", animation: "Soft dimensional color fields · transform-only motion · universal hero layout", source: "more" },
  { slug: "matrix-rain-bg-card", href: "/components/cards/matrix-rain-bg-card", title: "Emerald Data Veil", category: "Backgrounds", icon: ImageIcon, accent: "#059669", animation: "Enterprise data rhythm · refined gradient columns · replaces novelty code rain", source: "more" },
  { slug: "gradient-mesh-bg-card", href: "/components/cards/gradient-mesh-bg-card", title: "Editorial Mesh", category: "Backgrounds", icon: ImageIcon, accent: "#db2777", animation: "Art-directed warm mesh · campaign typography contrast · premium grain", source: "more" },
  { slug: "dot-matrix-bg-card", href: "/components/cards/dot-matrix-bg-card", title: "Product Dot Field", category: "Backgrounds", icon: ImageIcon, accent: "#6366f1", animation: "Disciplined CSS dot field · screenshot-ready focal lighting · non-interactive", source: "more" },
  { slug: "starfield-bg-card", href: "/components/cards/starfield-bg-card", title: "Midnight Spotlight", category: "Backgrounds", icon: ImageIcon, accent: "#818cf8", animation: "Cinematic depth · calm celestial dots · replaces warp-speed canvas trails", source: "more" },
  { slug: "bokeh-lights-bg-card", href: "/components/cards/bokeh-lights-bg-card", title: "Luxe Bokeh", category: "Backgrounds", icon: ImageIcon, accent: "#e11d48", animation: "Editorial optical color · generous negative space · luxury campaign ready", source: "more" },
  { slug: "topographic-bg-card", href: "/components/cards/topographic-bg-card", title: "Topographic Lines", category: "Backgrounds", icon: ImageIcon, accent: "#059669", animation: "Measured contour rhythm · static-first CSS lines · outdoor and finance heroes", source: "more" },
  { slug: "holographic-bg-card", href: "/components/cards/holographic-bg-card", title: "Iridescent Foil", category: "Backgrounds", icon: ImageIcon, accent: "#7c3aed", animation: "Tasteful foil facets · premium identity lighting · accessible foreground scrim", source: "more" },
  { slug: "vortex-spiral-bg-card", href: "/components/cards/vortex-spiral-bg-card", title: "Radial Focus", category: "Backgrounds", icon: ImageIcon, accent: "#4f46e5", animation: "Concentric focal depth · conversion-ready composition · no particle vortex", source: "more" },
  { slug: "crystal-shards-bg-card", href: "/components/cards/crystal-shards-bg-card", title: "Faceted Glass", category: "Backgrounds", icon: ImageIcon, accent: "#0891b2", animation: "Architectural SVG facets · translucent premium depth · no rotating shards", source: "more" },
  { slug: "lava-lamp-bg-card", href: "/components/cards/lava-lamp-bg-card", title: "Organic Gradient", category: "Backgrounds", icon: ImageIcon, accent: "#e879f9", animation: "Calm organic color fields · lifestyle hero composition · no metaball loop", source: "more" },
  { slug: "cyber-grid-bg-card", href: "/components/cards/cyber-grid-bg-card", title: "Horizon Grid", category: "Backgrounds", icon: ImageIcon, accent: "#06b6d4", animation: "Clean future-facing grid · true light/dark themes · restrained motion", source: "more" },
  { slug: "origami-folds-bg-card", href: "/components/cards/origami-folds-bg-card", title: "Architectural Folds", category: "Backgrounds", icon: ImageIcon, accent: "#7c3aed", animation: "Quiet geometric planes · editorial hierarchy · no floating paper animation", source: "more" },
  { slug: "mesh-gradient-bg-card", href: "/components/cards/mesh-gradient-bg-card", title: "Signature Mesh", category: "Backgrounds", icon: ImageIcon, accent: "#6366f1", animation: "Flagship SaaS mesh · art-directed radial light · slow composited drift", source: "more" },
  { slug: "aurora-borealis-bg-card", href: "/components/cards/aurora-borealis-bg-card", title: "Northern Gradient", category: "Backgrounds", icon: ImageIcon, accent: "#10b981", animation: "Deterministic northern ribbons · climate-tech palette · no random render output", source: "more" },
  { slug: "noise-texture-bg-card", href: "/components/cards/noise-texture-bg-card", title: "Studio Grain", category: "Backgrounds", icon: ImageIcon, accent: "#475569", animation: "Subtle studio grain · tonal vignette · timeless editorial depth", source: "more" },
  { slug: "animated-grid-glow-bg-card", href: "/components/cards/animated-grid-glow-bg-card", title: "Grid Spotlight", category: "Backgrounds", icon: ImageIcon, accent: "#4f46e5", animation: "Enterprise grid illumination · fixed focal balance · no pointer-state rerenders", source: "more" },
  { slug: "floating-code-bg-card", href: "/components/cards/floating-code-bg-card", title: "Developer Blueprint", category: "Backgrounds", icon: ImageIcon, accent: "#2563eb", animation: "Technical blueprint lines · API and SDK hero system · decorative-only layer", source: "more" },
  { slug: "network-graph-bg-card", href: "/components/cards/network-graph-bg-card", title: "Neural Network", category: "Backgrounds", icon: ImageIcon, accent: "#3b82f6", animation: "Deterministic SVG network · AI hero focal balance · no O(n²) canvas loop", source: "more" },
  { slug: "color-audio-bars-bg-card", href: "/components/cards/color-audio-bars-bg-card", title: "Rhythm Columns", category: "Backgrounds", icon: ImageIcon, accent: "#7c3aed", animation: "Editorial media rhythm · controlled gradient columns · reduced-motion fallback", source: "more" },
  { slug: "glassmorphism-blur-bg-card", href: "/components/cards/glassmorphism-blur-bg-card", title: "Glass Atmosphere", category: "Backgrounds", icon: ImageIcon, accent: "#0ea5e9", animation: "Atmospheric color · refined glass facets · premium software hero", source: "more" },
  { slug: "particle-vortex-bg-card", href: "/components/cards/particle-vortex-bg-card", title: "Orbital Halo", category: "Backgrounds", icon: ImageIcon, accent: "#0891b2", animation: "Measured orbital rings · fintech focal system · replaces particle tornado", source: "more" },
  { slug: "gradient-waves-bg-card", href: "/components/cards/gradient-waves-bg-card", title: "Layered Waves", category: "Backgrounds", icon: ImageIcon, accent: "#4f46e5", animation: "Layered SVG curves · fintech and services CTA · slow transform-only motion", source: "more" },
  // ── Data & Utility ──
  { slug: "enterprise-data-grid-card", href: "/components/cards/enterprise-data-grid-card", title: "Enterprise Data Grid", category: "Tables", icon: Layers, accent: "#6366f1", animation: "Ecommerce orders · global search · multi-sort · advanced filters · saved views · date+amount range · column hide · sticky header+columns · row select · bulk actions · inline edit · expandable details · pagination · density · live updates · keyboard shortcuts · context menu · loading/empty/error states · dark/light", source: "more" },
  { slug: "data-table-card", href: "/components/cards/data-table-card", title: "Data Table", category: "Tables", icon: Layers, accent: "#6366f1", animation: "Sortable columns · search · filter · pagination · row select · bulk actions · add/edit user modal · dark/light · action menu", source: "more" },
  { slug: "toast-system-card", href: "/components/cards/toast-system-card", title: "Toast Notifications", category: "Core", icon: Layers, accent: "#6366f1", animation: "4 toast types · 8 presets · 6 positions · auto-dismiss · progress bar · dark/light", source: "more" },
  { slug: "loading-skeletons-card", href: "/components/cards/loading-skeletons-card", title: "Loading Skeletons", category: "Core", icon: Layers, accent: "#6366f1", animation: "Card · table · profile · chat · article skeletons · shimmer animation · dark/light", source: "more" },
  { slug: "calendar-date-picker-card", href: "/components/cards/calendar-date-picker-card", title: "Calendar & Date Picker", category: "Core", icon: Layers, accent: "#6366f1", animation: "Single + range mode · month navigation · time picker · quick actions · dark/light", source: "more" },
  { slug: "empty-states-card", href: "/components/cards/empty-states-card", title: "Empty States", category: "Core", icon: Layers, accent: "#6366f1", animation: "9 empty state variants · icons · CTA buttons · dark/light · production-ready", source: "more" },
  { slug: "compact-table-card", href: "/components/cards/compact-table-card", title: "Compact Table", category: "Tables", icon: Layers, accent: "#6366f1", animation: "Dense rows · minimal padding · high data density · dark/light", source: "more" },
  { slug: "expandable-rows-table-card", href: "/components/cards/expandable-rows-table-card", title: "Expandable Rows Table", category: "Tables", icon: Layers, accent: "#8b5cf6", animation: "Click row to expand · detail panel · nested info · smooth animation", source: "more" },
  { slug: "inline-editable-table-card", href: "/components/cards/inline-editable-table-card", title: "Inline Editable Table", category: "Tables", icon: Layers, accent: "#06b6d4", animation: "Click cell to edit · inline input · save/cancel · no modal needed", source: "more" },
  { slug: "card-table-switcher-card", href: "/components/cards/card-table-switcher-card", title: "Card/Table Switcher", category: "Tables", icon: Layers, accent: "#f59e0b", animation: "Toggle between table and card grid views · animated transition", source: "more" },
  { slug: "financial-table-card", href: "/components/cards/financial-table-card", title: "Financial Table", category: "Tables", icon: Layers, accent: "#10b981", animation: "Colored cells · trend arrows · mini bars · stock-style display", source: "more" },
  { slug: "column-toggle-table-card", href: "/components/cards/column-toggle-table-card", title: "Column Toggle Table", category: "Tables", icon: Layers, accent: "#ec4899", animation: "Show/hide columns dynamically · column manager dropdown", source: "more" },
  { slug: "tree-table-card", href: "/components/cards/tree-table-card", title: "Tree/Hierarchical Table", category: "Tables", icon: Layers, accent: "#a855f7", animation: "Expandable parent-child rows · indent levels · tree structure", source: "more" },
  { slug: "virtual-scroll-table-card", href: "/components/cards/virtual-scroll-table-card", title: "Virtual Scroll Table", category: "Tables", icon: Layers, accent: "#3b82f6", animation: "Handles 1000+ rows · smooth scroll · performant rendering", source: "more" },
  { slug: "enterprise-table-card", href: "/components/cards/enterprise-table-card", title: "Enterprise Striped Table", category: "Tables", icon: Layers, accent: "#64748b", animation: "Zebra stripes · sticky first column · large dataset · corporate", source: "more" },
  { slug: "responsive-table-card", href: "/components/cards/responsive-table-card", title: "Responsive Table", category: "Tables", icon: Layers, accent: "#14b8a6", animation: "Collapses to cards on narrow screens · mobile-first · adaptive", source: "more" },
];

// ──────────────────────────────────────────────────────────────────────────
// Hierarchical URL scheme:  /components/<group>/<name>
// e.g. navbar001-card (category "Navbar") → /components/navbars/navbar001
// ──────────────────────────────────────────────────────────────────────────
// The physical route files still live at src/app/components/cards/[slug]. A
// rewrite in next.config.ts maps the pretty URL back to the physical page, so
// no routes need to be moved. Every href below is normalized to the pretty
// scheme so all links + breadcrumbs use it automatically.
const CATEGORY_URL_SEGMENT: Record<CardCategory, string> = {
  Premium: "premium",
  Agents: "premium",
  Buttons: "buttons",
  Forms: "forms",
  Navbar: "navbars",
  Footer: "footers",
  Hero: "heroes",
  Pricing: "pricing",
  SignIn: "sign-in",
  SignUp: "sign-up",
  ForgotPassword: "forgot-password",
  ResetPassword: "reset-password",
  Error404: "error-404",
  Error500: "error-500",
  Offline: "offline",
  Testimonials: "testimonials",
  Auth: "auth",
  ErrorPages: "errors",
  Core: "cards",
  Content: "cards",
  Product: "cards",
  Profile: "cards",
  Data: "cards",
  Stack: "cards",
  Features: "features",
  CTA: "cta",
  Charts: "charts",
  Modals: "modals",
  Sidebar: "sidebars",
  AI: "ai",
  Backgrounds: "backgrounds",
  Tables: "tables",
};

/** URL group segment for a card category (e.g. "Navbar" → "navbars"). */
export function categoryUrlSegment(category: CardCategory): string {
  return CATEGORY_URL_SEGMENT[category] ?? "cards";
}

/** Clean URL name for a slug (drops the trailing "-card"). */
export function cardUrlName(slug: string): string {
  return slug.replace(/-card$/, "");
}

/** Build the hierarchical href for a card. */
export function cardHref(category: CardCategory, slug: string): string {
  return `/components/${categoryUrlSegment(category)}/${cardUrlName(slug)}`;
}

// Normalize every route's href to the hierarchical scheme. The derived arrays
// below (buttonRoutes, navbarRoutes, …) filter these same object references,
// so they all pick up the updated href automatically.
for (const c of cardRoutes) {
  c.href = cardHref(c.category, c.slug);
}

export const cardCategories: CardCategory[] = ["Premium", "Buttons", "Forms", "Navbar", "Footer", "Hero", "Pricing", "SignIn", "SignUp", "ForgotPassword", "ResetPassword", "Error404", "Error500", "Offline", "Testimonials", "Agents", "Core", "Content", "Product", "Profile", "Data", "Stack", "Auth", "ErrorPages", "Features", "CTA", "Charts", "Modals", "Sidebar", "AI", "Backgrounds", "Tables"];

// ── Section helpers ──
// The first sidebar has four sections: "Buttons", "Forms", "Navbar", and "Cards".

export const buttonRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Buttons",
);
export const formRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Forms",
);
export const navbarRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Navbar",
);
export const footerRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Footer",
);
export const heroRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Hero",
);
export const pricingRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Pricing",
);
export const signInRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "SignIn",
);
export const signUpRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "SignUp",
);
export const forgotPasswordRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "ForgotPassword",
);
export const resetPasswordRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "ResetPassword",
);
export const error404Routes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Error404",
);
export const error500Routes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Error500",
);
export const offlineRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Offline",
);
export const testimonialsRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Testimonials",
);
export const agentsRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Agents",
);
export const premiumRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Agents",
);
export const authRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Auth",
);
export const featuresRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Features",
);
export const ctaRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "CTA",
);
export const chartsRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Charts",
);
export const overlaysRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Modals",
);
export const sidebarRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Sidebar",
);
export const aiRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "AI",
);
export const backgroundRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Backgrounds",
);
export const tableRoutes: CardMeta[] = cardRoutes.filter(
  (c) => c.category === "Tables",
);
export const cardRoutesOnly: CardMeta[] = cardRoutes.filter(
  (c) => c.category !== "Buttons" && c.category !== "Forms" && c.category !== "Navbar" && c.category !== "Footer" && c.category !== "Hero" && c.category !== "Pricing" && c.category !== "SignIn" && c.category !== "SignUp" && c.category !== "ForgotPassword" && c.category !== "ResetPassword" && c.category !== "Error404" && c.category !== "Error500" && c.category !== "Offline" && c.category !== "Testimonials" && c.category !== "Agents" && c.category !== "Auth" && c.category !== "Features" && c.category !== "CTA" && c.category !== "Charts" && c.category !== "Modals" && c.category !== "Sidebar" && c.category !== "AI" && c.category !== "Backgrounds" && c.category !== "Tables",
);

export const buttonCategories: CardCategory[] = ["Buttons"];
export const formCategories: CardCategory[] = ["Forms"];
export const navbarCategories: CardCategory[] = ["Navbar"];
export const footerCategories: CardCategory[] = ["Footer"];
export const heroCategories: CardCategory[] = ["Hero"];
export const pricingCategories: CardCategory[] = ["Pricing"];
export const signInCategories: CardCategory[] = ["SignIn"];
export const signUpCategories: CardCategory[] = ["SignUp"];
export const forgotPasswordCategories: CardCategory[] = ["ForgotPassword"];
export const resetPasswordCategories: CardCategory[] = ["ResetPassword"];
export const error404Categories: CardCategory[] = ["Error404"];
export const error500Categories: CardCategory[] = ["Error500"];
export const offlineCategories: CardCategory[] = ["Offline"];
export const testimonialsCategories: CardCategory[] = ["Testimonials"];
export const agentsCategories: CardCategory[] = ["Agents"];
export const premiumCategories: CardCategory[] = ["Agents", "Pricing", "Footer"];
export const cardOnlyCategories: CardCategory[] = cardCategories.filter(
  (c) => c !== "Buttons" && c !== "Forms" && c !== "Navbar" && c !== "Footer" && c !== "Hero" && c !== "Pricing" && c !== "SignIn" && c !== "SignUp" && c !== "ForgotPassword" && c !== "ResetPassword" && c !== "Error404" && c !== "Error500" && c !== "Offline" && c !== "Testimonials" && c !== "Agents" && c !== "Auth",
);
  // ── Tables (10 advanced variants) ──
