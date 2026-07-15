import { cardRoutes } from "@/components/cards-data/cards";
import type { CardCategory } from "@/components/cards-data/cards";

export interface CardMetadata {
  slug: string;
  title: string;
  category: CardCategory;
  description: string;
  useCase: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  framework: string[];
  dependencies: string[];
  responsive: boolean;
  tags: string[];
}

export const cardMetadata: Record<string, CardMetadata> = {
  "kanban-board-card": {
    slug: "kanban-board-card",
    title: "Kanban Board",
    category: "Agents",
    description:
      "A premium drag-and-drop project board (Linear/Trello-tier). Cards reorder within a column and move across columns with a lifted, rotated drag overlay; columns show live WIP counts and a drop-target highlight. Includes an inline task composer, live search, and full keyboard-drag accessibility. State is managed in a zustand store using the canonical @dnd-kit multi-container pattern (moveOver during drag + reorder on drop).",
    useCase:
      "Use for project management tools, sprint boards, CRM pipelines, applicant tracking, or any workflow where items flow through stages. The modular store + column/card split makes it straightforward to wire to a real backend.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities", "zustand", "lucide-react"],
    responsive: true,
    tags: ["kanban", "drag-and-drop", "dnd-kit", "board", "zustand", "sortable", "keyboard-a11y", "project-management"],
  },
  "cinematic-folder-card": {
    slug: "cinematic-folder-card",
    title: "Cinematic Folder Card",
    category: "Core",
    description:
      "A 3D folder card with a cinematic image stack that fans out on hover. Features inline title editing, a status pill, and a context menu via a portaled popover. Built with Framer Motion springs and CSS preserve-3d transforms.",
    useCase:
      "Use in file managers, project galleries, media libraries, or dashboard sidebars where a rich folder preview adds delight. The 3D image fan creates a premium content-discovery moment.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["3D", "hover", "folder", "file-manager", "image-stack", "edit-in-place"],
  },
  "glass-feature-card": {
    slug: "glass-feature-card",
    title: "Glass Feature Card",
    category: "Core",
    description:
      "A glassmorphism feature card with a light-sweep animation, pointer-tracking tilt, and an expandable details section. Uses backdrop-blur, motion values for parallax, and a spring-based expand/collapse.",
    useCase:
      "Ideal for landing page feature grids, product highlight sections, or SaaS marketing pages where each card showcases a key capability with a visual.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["glassmorphism", "tilt", "expandable", "feature", "landing-page"],
  },
  "pricing-plan-card": {
    slug: "pricing-plan-card",
    title: "Pricing Plan Card",
    category: "Core",
    description:
      "A premium pricing card with a monthly/yearly billing toggle, animated price transitions, a ticket-perforation divider, and a pulsing CTA with a moving sheen. Includes a feature checklist with included/excluded states.",
    useCase:
      "Drop into any SaaS pricing page. The billing toggle and animated price give users instant feedback on their selection, while the ticket aesthetic makes the plan feel tangible.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["pricing", "billing-toggle", "ticket", "CTA", "checklist"],
  },
  "login-auth-card": {
    slug: "login-auth-card",
    title: "Login Auth Card",
    category: "Core",
    description:
      "A two-column authentication card with a branded image panel on desktop and a form-only layout on mobile. Includes social login buttons, password visibility toggle, loading state, and trust badges.",
    useCase:
      "Production-ready login screen for SaaS apps, dashboards, or any authenticated product. The split layout maximizes brand presence on desktop without sacrificing mobile usability.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["auth", "login", "social-login", "split-layout", "form"],
  },
  "electric-border-card": {
    slug: "electric-border-card",
    title: "Security Status Card",
    category: "Core",
    description:
      "A security dashboard card with an animated SVG turbulence border, a circular gauge with count-up animation, threat feed, and scan/quarantine actions. The border displacement is subtle — not overpowering.",
    useCase:
      "Use in antivirus dashboards, DevSecOps panels, or system health monitoring interfaces where a live security score needs prominent visual treatment.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["security", "gauge", "count-up", "SVG", "turbulence", "dashboard"],
  },
  "blog-post-card": {
    slug: "blog-post-card",
    title: "Blog Post Card",
    category: "Content",
    description:
      "An editorial blog post card with cover image, category badge, reading time, author avatar, and bookmark/share actions. Subtle hover lift and image scale create a polished content-grid feel.",
    useCase:
      "Perfect for blog indexes, content aggregators, news feeds, or documentation article lists. The clean layout prioritizes readability while maintaining visual interest.",
    complexity: "Beginner",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["blog", "article", "editorial", "content-grid", "bookmark"],
  },
  "flashcard-stack-card": {
    slug: "flashcard-stack-card",
    title: "Flashcard Deck Card",
    category: "Content",
    description:
      "An interactive flashcard deck with a 3D flip animation, peek-out fan of upcoming cards, and confidence-rating buttons. Tracks progress through the deck with a streak counter.",
    useCase:
      "Use in ed-tech apps, language learning platforms, or study tools. The tactile flip and fan interactions make spaced repetition feel engaging rather than mechanical.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["education", "flashcard", "3D-flip", "deck", "study", "spaced-repetition"],
  },
  "ai-generation-result-card": {
    slug: "ai-generation-result-card",
    title: "AI Generation Result Card",
    category: "Content",
    description:
      "An AI image generation result card with a holographic shimmer, prompt display, quality score, generation time, and action buttons (copy prompt, download, save). Shows completed and loading states.",
    useCase:
      "Designed for AI image generators, creative tools, or any platform that displays AI-generated content with metadata. The holographic effect signals 'AI-created' visually.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["AI", "image-generation", "holographic", "prompt", "result"],
  },
  "upload-progress-card": {
    slug: "upload-progress-card",
    title: "Upload Progress Card",
    category: "Content",
    description:
      "A multi-file upload card with per-file progress bars, status icons (uploading/processing/success/failed), thumbnails, retry actions, and an overall progress summary. Supports image, video, audio, document, and archive types.",
    useCase:
      "Drop into file-sharing apps, CMS platforms, media managers, or any interface that handles batch uploads. The granular status feedback prevents user anxiety during long uploads.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["upload", "progress", "file-manager", "drag-drop", "multi-file"],
  },
  "ecommerce-product-card": {
    slug: "ecommerce-product-card",
    title: "Ecommerce Product Card",
    category: "Product",
    description:
      "A full-featured ecommerce product card with image gallery, discount badge, stock indicator, wishlist toggle with ripple, color variant selector, star rating, price comparison, and add-to-cart with 'Added' confirmation state.",
    useCase:
      "Production-ready for online stores, product catalogs, or marketplace grids. Every interaction (wishlist, color change, add to cart) has tactile feedback that drives conversion.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["ecommerce", "product", "gallery", "wishlist", "add-to-cart", "rating"],
  },
  "hover-video-product-card": {
    slug: "hover-video-product-card",
    title: "Media Product Card",
    category: "Product",
    description:
      "A luxury media product card with a hover 'video preview' overlay (animated sheen + play affordance), limited-edition badge, quick-view button, finish selector, and price + add-to-cart action. Compact height fits any grid.",
    useCase:
      "Use in premium product showcases, electronics stores, or media marketplaces where a hover preview elevates the browsing experience without requiring actual video assets.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["product", "hover-video", "preview", "luxury", "media"],
  },
  "product-feature-showcase-card": {
    slug: "product-feature-showcase-card",
    title: "Feature Showcase Card",
    category: "Product",
    description:
      "An accordion-style product feature showcase with crossfading hero images, spec readouts, and a sliding indicator pill. Each feature expands to reveal technical details with smooth layout animations.",
    useCase:
      "Ideal for product detail pages, feature comparison sections, or hardware showcase pages where multiple features need to be presented in an interactive, space-efficient format.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["accordion", "feature", "crossfade", "product-detail", "specs"],
  },
  "event-booking-card": {
    slug: "event-booking-card",
    title: "Event Booking Card",
    category: "Product",
    description:
      "An event ticket card with a date stub, cover image, location, seat availability bar, attendee avatars, and an RSVP action. The perforated ticket design makes the event feel bookable.",
    useCase:
      "Use in event platforms, conference sites, concert booking apps, or meetup pages. The seat-availability bar creates urgency and the attendee avatars build social proof.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["event", "booking", "ticket", "RSVP", "calendar"],
  },
  "mountain-hike-card": {
    slug: "mountain-hike-card",
    title: "Adventure Trip Card",
    category: "Product",
    description:
      "A premium adventure booking card with a hero destination image, photo-fan gallery reveal on hover, difficulty badge, duration/distance/weather stats, guide rating, and a 'Book this trek' CTA with animated arrow.",
    useCase:
      "Designed for travel platforms, tour booking sites, or outdoor adventure marketplaces. The photo-fan reveal and stat grid give users enough information to make a booking decision in one glance.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["travel", "adventure", "booking", "photo-fan", "guide", "trek"],
  },
  "creator-profile-card": {
    slug: "creator-profile-card",
    title: "Creator Profile Card",
    category: "Profile",
    description:
      "An editorial creator profile card with cover parallax, pointer-tracking tilt, avatar, verified badge, skills, stats, work thumbnails, and follow/message actions. Expandable message composer with auto-resizing textarea.",
    useCase:
      "Use in creator platforms, portfolio sites, social networks, or community directories. The parallax and tilt create a premium feel that matches high-value creator profiles.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["profile", "creator", "parallax", "tilt", "portfolio", "follow"],
  },
  "profile-flip-card": {
    slug: "profile-flip-card",
    title: "Profile Flip Card",
    category: "Profile",
    description:
      "A 3D flip profile card with a front (identity, stats, socials) and back (portfolio thumbnails, contact rows, résumé download). Pointer parallax tilts the card ±6°. Tap to flip with rotateY animation.",
    useCase:
      "Perfect for team pages, speaker directories, or business card showcases. The flip interaction doubles the information density without cluttering the initial view.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["profile", "3D-flip", "portfolio", "contact", "business-card"],
  },
  "liquid-metal-id-card": {
    slug: "liquid-metal-id-card",
    title: "Access Pass Card",
    category: "Profile",
    description:
      "A futuristic access pass with a liquid-metal gradient, pointer-following iridescent sheen, conic hue drift, grid texture, QR-style code block, and credential details. Flips 180° on tap with ±8° pointer parallax.",
    useCase:
      "Use in event access passes, employee ID systems, security dashboards, or sci-fi themed interfaces. The iridescent sheen and QR code create a believable 'physical pass' feel.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["ID-card", "access-pass", "liquid-metal", "3D-flip", "QR", "futuristic"],
  },
  "team-directory-card": {
    slug: "team-directory-card",
    title: "Team Availability Card",
    category: "Profile",
    description:
      "A team directory with status dots (online/away/busy/offline), role filters with a sliding pill, hover profile preview via portal, timezone display, and a 'Start standup' CTA. Filterable by Design, Engineering, or PM.",
    useCase:
      "Drop into Slack-alternative dashboards, project management tools, or internal team pages. The status dots and filter pills make finding the right person fast.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["team", "directory", "status", "filter", "standup", "portal"],
  },
  "analytics-insight-card": {
    slug: "analytics-insight-card",
    title: "Analytics Insight Card",
    category: "Data",
    description:
      "A KPI analytics card with a count-up animation, delta badge, Catmull-Rom spline sparkline with gradient area fill, pulsing end-dot, hover tooltip, and a segmented time-range selector with a sliding active pill.",
    useCase:
      "Use in analytics dashboards, revenue monitoring panels, or any data-driven interface where a single KPI needs context (comparison, trend, time-range). The count-up creates a premium data-reveal moment.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["analytics", "KPI", "sparkline", "count-up", "dashboard", "chart"],
  },
  "year-in-review-card": {
    slug: "year-in-review-card",
    title: "Year in Review Card",
    category: "Data",
    description:
      "A year-in-review summary card with a circular progress ring, count-up stats, milestone timeline, and achievement badges. The ring fills as the count-up runs, creating a satisfying data-reveal sequence.",
    useCase:
      "Use in annual reports, personal stats pages (Spotify Wrapped style), productivity apps, or any platform that summarizes yearly activity. The milestone timeline adds narrative to raw numbers.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["year-in-review", "stats", "timeline", "circular-progress", "achievements"],
  },
  "notification-inbox-card": {
    slug: "notification-inbox-card",
    title: "Notification Inbox Card",
    category: "Data",
    description:
      "A notification inbox with priority badges, unread rails, sender avatars, thread counts, hover-to-mark-read, slide-out archive/done animations, a filter toggle (All/Unread), and an action toast. Scrollable list with custom scrollbar.",
    useCase:
      "Production-ready for any app with a notification system — SaaS dashboards, social platforms, collaboration tools. The priority badges and unread rails make triage fast.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["notification", "inbox", "priority", "archive", "unread", "filter"],
  },
  "notification-styles-card": {
    slug: "notification-styles-card",
    title: "Notification Center Card",
    category: "Data",
    description:
      "A notification center with priority filter tabs (All/High/Normal/Low) using a layoutId sliding pill, per-kind icons (mention/follow/alert/like/system/success), unread pulse dots, and per-row quick actions (mark read, archive, delete).",
    useCase:
      "Use in social apps, dev tools, or community platforms where notifications span multiple kinds. The kind-specific icons and priority filters help users focus on what matters.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["notification", "center", "filter-tabs", "priority", "icons"],
  },
  "domain-category-stack-card": {
    slug: "domain-category-stack-card",
    title: "Domain Intelligence Card",
    category: "Stack",
    description:
      "A swipeable domain intelligence card with a category score gauge, drag-to-dismiss, save action, and domain metadata. The stack advances with spring physics when a card is swiped away.",
    useCase:
      "Use in domain research tools, SEO platforms, or lead qualification interfaces where domains need quick scoring and triage. The swipe interaction makes high-volume processing efficient.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: ["stack", "swipe", "domain", "score", "drag", "intelligence"],
  },
  "real-estate-stack-card": {
    slug: "real-estate-stack-card",
    title: "Property Discovery Card",
    category: "Stack",
    description:
      "A luxury property carousel with drag-to-swipe, crossfade transitions, save/share actions, dot indicators, arrow navigation, price, bed/bath/sqft stats, and a 'Request a private tour' CTA. Editorial sand + charcoal palette.",
    useCase:
      "Designed for real estate platforms, property management apps, or rental marketplaces. The swipe interaction and stat grid give buyers enough info to decide whether to request a tour.",
    complexity: "Intermediate",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["real-estate", "property", "carousel", "swipe", "tour", "editorial"],
  },
  "art-content-stack-card": {
    slug: "art-content-stack-card",
    title: "Gallery Collection Card",
    category: "Stack",
    description:
      "A spring-physics stack of art pieces that advance when the top card is swiped. Each card shows the artwork, title, artist, palette extraction, and bookmark/download actions. The stack visually reduces as cards are dismissed.",
    useCase:
      "Use in art discovery apps, Pinterest-style galleries, curated content feeds, or collection browsers. The spring physics make the swipe feel organic and satisfying.",
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react", "next/image"],
    responsive: true,
    tags: ["gallery", "art", "stack", "swipe", "spring", "collection", "discovery"],
  },
};

// ── FAQ entries (shared across all card pages + landing page) ──
export const libraryFAQ = [
  {
    q: "What frameworks and libraries are these card components built with?",
    a: "Every card is built with React 19, Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion (now `motion`) for animations. Icons come from `lucide-react` and images use `next/image` for automatic optimization. No additional UI framework is required — the cards are self-contained.",
  },
  {
    q: "Can I copy and paste a card into my existing Next.js project?",
    a: "Yes. Each card's Code tab includes the full component source, any local data/type files it depends on, the npm install command for external packages, and the shared CSS utility classes (cs-* tokens) needed for theme-aware dark/light mode. Copy the component file, create the data file if the card uses one, add the CSS tokens to your globals.css, and install the listed npm packages.",
  },
  {
    q: "Do these cards support dark mode out of the box?",
    a: "Yes. All cards use a set of semantic CSS custom properties (--card-surface, --card-text, --card-border, etc.) defined in :root and .dark. When your app toggles the `dark` class on <html>, every card automatically flips its surface, text, and border colors. Accent colors (cyan, emerald, amber, etc.) are hardcoded per-card because they read well on both light and dark backgrounds.",
  },
  {
    q: "Are the cards responsive and mobile-friendly?",
    a: "Every card uses clamp()-based width constraints (e.g., w-[clamp(280px,90vw,380px)]) so it scales fluidly from mobile to desktop. Hover interactions degrade gracefully — on touch devices, cards show their default state and all interactive elements (buttons, toggles, selectors) work with tap gestures.",
  },
  {
    q: "How do I handle the Unsplash images used in the mock data?",
    a: "The mock data uses Unsplash URLs for demonstration. In production, replace these with your own image URLs or local imports. The `next/image` component is already configured — just update the `images.remotePatterns` array in `next.config.ts` to allow your image hostname, or swap to static imports for local images.",
  },
  {
    q: "Can I use these cards in a non-Next.js React project (Vite, CRA, Remix)?",
    a: "Yes, with minor adjustments. Replace `next/image` with a standard `<img>` tag (or your framework's image component), replace `next/link` with your router's `<Link>`, and ensure Framer Motion is installed. The card components themselves are pure React + Tailwind + Framer Motion with no Next.js-specific APIs.",
  },
  {
    q: "What is the cs-* class system and why do I need it?",
    a: "The cs-* classes (.cs-surface, .cs-text, .cs-muted, .cs-border, etc.) are semantic utility classes that read CSS custom properties for card surfaces, text, and borders. Instead of adding `dark:` variants to 100+ class strings, every card uses these classes and the theme flips automatically. You need to add the CSS token definitions (provided in the Code tab under 'CSS Notes') to your globals.css.",
  },
  {
    q: "Do the cards respect prefers-reduced-motion?",
    a: "Cards with heavy motion (count-up animations, 3D flips, parallax tilt) include `useReducedMotion()` guards that skip or simplify animations for users who prefer reduced motion. A global CSS rule in globals.css also disables CSS-driven animations for reduced-motion users.",
  },
];

// ── Buttons section ──
cardMetadata["animated-switch-card"] = {
  slug: "animated-switch-card",
  title: "Animated Switches",
  category: "Buttons",
  description:
    "A premium settings panel with animated toggle switches. Each switch has icon rotation, spring thumb slide, and color-coded active states with glow. Clean glassmorphism container with soft shadows. Theme-aware via cs-* tokens.",
  useCase:
    "Use in settings pages, preference panels, dashboard sidebars, or any interface where users toggle features on/off. The spring animation and icon rotation make each toggle feel tactile and premium.",
  complexity: "Intermediate",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["switch", "toggle", "settings", "animated", "spring", "icon-rotate", "preferences"],
};

cardMetadata["liquid-metal-buttons-card"] = {
  slug: "liquid-metal-buttons-card",
  title: "Liquid Metal Buttons",
  category: "Buttons",
  description:
    "A grid of 24 premium liquid-metal icon buttons, each with a unique click animation (slide, bounce, zoom, spin, shake, heartbeat, flash, spark, fly, and more). Mouse-tracking glow highlight, press depth with inset shadows, and a brushed-metal gradient surface. Dark-only aesthetic — the metallic effect needs a dark backdrop.",
  useCase:
    "Use in creative toolbars, media players, action panels, or any interface where icon buttons need a premium tactile feel. Each of the 24 animations is triggered on click, giving users delightful feedback for common actions.",
  complexity: "Advanced",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["buttons", "liquid-metal", "icon", "click-animation", "mouse-tracking", "metallic", "grid", "premium"],
};

cardMetadata["morphing-sign-in-card"] = {
  slug: "morphing-sign-in-card",
  title: "Morphing Sign In Button",
  category: "Buttons",
  description:
    "A 'Sign In' button that morphs into a full sign-in modal on click. The button expands with a spring animation into a card with email/password fields, password visibility toggle, OAuth buttons (Google, GitHub, Apple with real SVG icons), loading state, and trust badges. Click outside or the X to close — the card shrinks back. Theme-aware via cs-* tokens.",
  useCase:
    "Use in navbars, headers, or landing pages where a full sign-in page is too heavy. The morphing animation creates a premium, app-like feel. Drop into any Next.js or React project — fully self-contained with no external UI dependencies.",
  complexity: "Advanced",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["signin", "morph", "modal", "oauth", "google", "github", "apple", "spring", "animation", "auth"],
};

cardMetadata["premium-animated-buttons-card"] = {
  slug: "premium-animated-buttons-card",
  title: "Premium Animated Buttons",
  category: "Buttons",
  description:
    "A showcase of premium animated buttons with professional color schemes. Each button features a left-to-right color wipe animation, shine sweep, arrow rotation, and text shift on click. Includes primary (slate→blue), success (emerald), destructive (rose), outline, and speed variants. Professional colors only — no bright gradients.",
  useCase:
    "Use in SaaS dashboards, enterprise apps, or any professional interface where buttons need premium click feedback. The color wipe + shine + arrow rotation combo makes every click feel satisfying without being flashy. Configurable size, color, icon, arrow position, and animation speed.",
  complexity: "Intermediate",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["buttons", "animated", "color-wipe", "shine", "professional", "slate", "blue", "emerald", "rose", "premium"],
};

cardMetadata["segmented-control-card"] = {
  slug: "segmented-control-card",
  title: "Segmented Controls",
  category: "Buttons",
  description:
    "Advanced glassmorphic segmented control with a sliding 3D pill indicator. Each segment has an icon + label, and the active pill slides between them with a spring animation. The pill has a subtle inner glow + top highlight for 3D depth. Includes 4 showcase groups: view toggle, time range, price filter, and a compact icon-only variant.",
  useCase:
    "Use for view mode toggles (grid/list), time range filters (day/week/month), pricing filters, or any mutually exclusive option group. The sliding pill gives instant visual feedback on which option is active. The glassmorphic surface + 3D depth make it feel like a native iOS/macOS control.",
  complexity: "Intermediate",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["segmented", "control", "tabs", "toggle", "sliding-pill", "glassmorphic", "3d", "filter", "ios-style"],
};

cardMetadata["loading-state-buttons-card"] = {
  slug: "loading-state-buttons-card",
  title: "Loading State Buttons",
  category: "Buttons",
  description:
    "Async state machine buttons with progress fill. Each button cycles through states: idle → loading (with progress bar) → success/error → auto-reset. 4 unique designs: (1) Upload with internal progress bar fill, (2) Delete with hold-to-confirm + loading, (3) Payment with amount + processing state, (4) Retry with error shake animation. No two share the same design.",
  useCase:
    "Essential for any app with async actions — file uploads, deletions, payments, data syncing. The progress fill shows real-time feedback during long operations, the hold-to-delete prevents accidental deletions, and the error shake gives tactile feedback when something goes wrong. Each button auto-resets after completion.",
  complexity: "Advanced",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["loading", "async", "progress", "state-machine", "upload", "delete", "payment", "retry", "shake", "hold-to-confirm"],
};

cardMetadata["premium-cta-buttons-card"] = {
  slug: "premium-cta-buttons-card",
  title: "Premium CTA Buttons",
  category: "Buttons",
  description:
    "Four unique high-impact call-to-action button designs: (1) Animated gradient border with a rotating conic-gradient ring, (2) Glow pulse with breathing shadow layers that expand/contract, (3) 3D press with physical depth shadow that compresses on click, (4) Text reveal where the label slides up and a new label slides in on hover. Each design is completely distinct — no shared patterns.",
  useCase:
    "Use on landing pages, pricing sections, hero areas, or any conversion-critical surface where the CTA button needs to grab attention. The gradient border is for premium/Pro CTAs, glow pulse for free/download CTAs, 3D press for tactile action buttons, and text reveal for discoverable secondary actions.",
  complexity: "Advanced",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["cta", "gradient-border", "glow", "pulse", "3d-press", "text-reveal", "landing", "conversion", "premium"],
};

// ── New cards (batch 2) ──
cardMetadata["animated-border-weather-card"] = {
  slug: "animated-border-weather-card",
  title: "Weather Dashboard Card",
  category: "Core",
  description:
    "A weather dashboard with spinning conic-gradient borders. Each card has an absolutely-positioned conic gradient that rotates behind a dark inner panel, creating a living, premium border effect. Shows hourly forecast, current weather, time/location, and daily forecast.",
  useCase:
    "Use in weather apps, dashboards, or smart home interfaces where a premium animated border draws attention to key data. The spinning conic gradient technique works for any content that needs a 'living' frame.",
  complexity: "Intermediate",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react"],
  responsive: true,
  tags: ["weather", "animated-border", "conic-gradient", "spinning", "dashboard", "premium"],
};

cardMetadata["neumorphic-profile-grid-card"] = {
  slug: "neumorphic-profile-grid-card",
  title: "Neumorphic Team Grid Card",
  category: "Profile",
  description:
    "A neumorphic profile grid with dual-shadow surfaces (light from top-left, shadow bottom-right) creating a tactile, premium feel. Filter by All/Premium/Guest. Each card has a memoji avatar, status dot, verified badge, followers count, and follow/message actions. Includes an 'Add Member' CTA card.",
  useCase:
    "Use in team directories, community pages, or member showcases where a soft, tactile aesthetic stands out from typical flat card grids. The neumorphic design system works best in light mode.",
  complexity: "Intermediate",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react", "next/image"],
  responsive: true,
  tags: ["neumorphic", "profile", "grid", "team", "filter", "memoji", "soft-ui"],
};

cardMetadata["editable-3d-profile-card"] = {
  slug: "editable-3d-profile-card",
  title: "Editable 3D Profile Card",
  category: "Profile",
  description:
    "An interactive 3D profile card with drag-to-rotate physics and inline edit mode. Front shows avatar, name, title, bio, action buttons (Products, Portfolio, Support), payment options (UPI/Stripe/Link), and social links. Back shows an edit form with image upload via FileReader. Drag anywhere to rotate in 3D; release to snap back.",
  useCase:
    "Use in creator platforms, portfolio sites, or payment-enabled profile pages where users need to customize their card. The drag-to-rotate interaction and payment fields (UPI, Stripe, custom link) make it ideal for creator monetization.",
  complexity: "Advanced",
  framework: ["React 19", "Next.js 16", "TypeScript"],
  dependencies: ["framer-motion", "lucide-react", "next/image"],
  responsive: true,
  tags: ["profile", "3D", "drag-to-rotate", "editable", "payment", "UPI", "Stripe", "creator"],
};

// ── New button cards (batch 3) ──
const newButtonMeta: Record<string, { slug: string; title: string; description: string; useCase: string; tags: string[] }> = {
  "bookmark-favorite-card": { slug: "bookmark-favorite-card", title: "Favorite & Bookmark", description: "3 unique favorite interactions: heart burst with particle explosion, 5-star rating with hover preview and spring fill, and 3D bookmark page-flip toggle. Each uses a completely different animation engine.", useCase: "Use in social feeds, content galleries, bookmark managers, or review systems. The heart burst gives satisfying feedback for likes, the star rating is perfect for reviews, and the bookmark flip works for save-for-later.", tags: ["favorite", "bookmark", "heart", "star", "rating", "burst", "flip", "like", "save"] },
  "fab-menu-card": { slug: "fab-menu-card", title: "FAB Action Menu", description: "Expandable floating action button that opens into a radial menu of action buttons. Each sub-button springs out with stagger and rotation. Backdrop dim + close on outside click. 4 actions with color-coded icons.", useCase: "Use in mobile apps, dashboards, or content editors where multiple actions need to be accessible from a single FAB. The radial expand with spring stagger creates a premium Material Design feel.", tags: ["fab", "floating", "radial", "menu", "expand", "spring", "stagger", "actions", "material"] },
  "social-share-card": { slug: "social-share-card", title: "Social Share", description: "Social share buttons with brand color wipe on hover + copy link with 'Copied!' feedback. Includes Twitter/X, LinkedIn, Facebook, Reddit with real SVG brand icons. Each button has a color sweep that slides up from below on hover.", useCase: "Use in blog posts, product pages, or any content that users share. The brand color wipe gives instant visual recognition of each platform. The copy link button provides clipboard feedback.", tags: ["social", "share", "twitter", "linkedin", "facebook", "reddit", "copy-link", "clipboard", "brand"] },
  "voice-audio-card": { slug: "voice-audio-card", title: "Voice & Audio", description: "3 unique voice/audio button interactions: hold-to-talk with radiating sound waves, mute toggle with morphing speaker icon and animated volume bars, and volume slider button that expands on click with draggable thumb.", useCase: "Use in voice chat apps, audio players, podcast apps, or accessibility tools. The hold-to-talk gives tactile recording feedback, the mute toggle is essential for calls, and the volume slider expands without taking extra space.", tags: ["voice", "audio", "hold-to-talk", "mute", "volume", "slider", "mic", "sound-wave", "recording"] },
  "otp-verification-card": { slug: "otp-verification-card", title: "OTP Verification", description: "Send code button with 60-second countdown timer and circular SVG progress ring. Button disables during countdown, shows ticking number inside the ring, then auto-enables resend with a breathing pulse animation when done.", useCase: "Use in authentication flows, phone verification, 2FA setup, or any OTP/verification code flow. The countdown ring prevents spamming, the number inside gives instant time feedback, and the resend pulse signals readiness.", tags: ["otp", "verification", "countdown", "timer", "resend", "ring", "auth", "code", "2fa"] },
  "stepper-quantity-card": { slug: "stepper-quantity-card", title: "Stepper & Quantity", description: "3 unique quantity selectors: classic +/- with number flip animation and shake at limits, long-press accelerate (hold to fast-increment with speed ramp), and compact pill with circular buttons and spring number bounce.", useCase: "Use in e-commerce quantity selectors, cart items, booking flows, or any numeric input. The shake at limits prevents invalid values, the long-press accelerate handles large numbers efficiently, and the pill is compact for mobile.", tags: ["stepper", "quantity", "counter", "increment", "long-press", "accelerate", "pill", "flip", "shake"] },
  "filter-chip-card": { slug: "filter-chip-card", title: "Filter Chips", description: "3 unique chip/filter interactions: removable chips with exit animation, toggle chips with color shift (5 professional colors), and add chip input with type + enter to add and spring entrance. Each chip type uses a different layout and animation.", useCase: "Use in search filters, tag inputs, category selectors, or skill pickers. The removable chips work for managing tags, toggle chips for filtering, and the add input for user-generated tags. Layout animations keep the flow smooth.", tags: ["filter", "chip", "tag", "removable", "toggle", "input", "add", "spring", "exit-animation"] },
  "swipe-action-card": { slug: "swipe-action-card", title: "Swipe Actions", description: "iOS-style swipe-to-reveal action buttons. Swipe left to reveal Archive (blue) + Delete (red). Swipe right to reveal Reply (green) + Snooze (amber). Drag the card content to reveal actions behind it. Items exit with directional animation on action.", useCase: "Use in email clients, task managers, notification lists, or any list where users triage items. The swipe gesture is natural on mobile, and the color-coded actions give instant visual feedback. Directional exit animations indicate which action was taken.", tags: ["swipe", "action", "ios", "drag", "reveal", "archive", "delete", "reply", "snooze", "gesture"] },
};

for (const [slug, meta] of Object.entries(newButtonMeta)) {
  cardMetadata[slug] = {
    slug: meta.slug,
    title: meta.title,
    category: "Buttons",
    description: meta.description,
    useCase: meta.useCase,
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: meta.tags,
  };
}

// ── Forms section ──
const formMeta: Record<string, { title: string; description: string; useCase: string; tags: string[] }> = {
  "animated-floating-input-card": { title: "Floating Inputs", description: "Premium floating-label inputs with focus glow ring, real-time email validation, password strength meter with color shift (weak/fair/good/strong), success/error icon morph, and password visibility toggle. Each input has an icon that changes color on focus.", useCase: "Use in login forms, signup forms, settings pages, or any form that needs premium input feedback. The floating labels save space, the validation gives instant feedback, and the strength meter guides password creation.", tags: ["input", "floating-label", "validation", "password-strength", "focus-glow", "form"] },
  "otp-input-card": { title: "OTP Input", description: "6-digit OTP input with auto-advance on type, backspace navigation to previous box, paste support (paste 6 digits fills all boxes), spring-scale animation on input, and a verify button with loading/success/error states. Try code 123456 for success.", useCase: "Use in 2FA flows, phone verification, email verification, or any OTP-based authentication. The auto-advance and paste support make it effortless on mobile and desktop.", tags: ["otp", "verification", "input", "auto-advance", "paste", "2fa", "auth"] },
  "file-dropzone-card": { title: "File Dropzone", description: "Drag-and-drop file upload with animated dashed border on drag-over, file type detection (image, video, audio, document, archive) with color-coded icons, per-file upload progress bars, success/error states, and remove buttons with exit animation.", useCase: "Use in file managers, media uploaders, document submission forms, or any interface that handles file uploads. The drag-drop + progress + type icons give users complete feedback during uploads.", tags: ["file", "upload", "dropzone", "drag-drop", "progress", "file-type", "upload"] },
  "command-palette-card": { title: "Command Palette", description: "Cmd+K style command palette with fuzzy search filter, keyboard navigation (arrow up/down + enter), category grouping with Recent section, highlighted matching text, and result count. Click the trigger to open, type to filter.", useCase: "Use in dashboards, IDEs, or any power-user interface where keyboard navigation is essential. The fuzzy search + keyboard nav + recent commands create a premium Linear/Raycast-style experience.", tags: ["command", "palette", "cmd-k", "fuzzy-search", "keyboard", "raycast", "linear"] },
  "slider-range-card": { title: "Range Slider", description: "Dual-handle range slider with draggable min/max thumbs, gradient track between thumbs, spring-animated tooltips showing values above the active thumb, click-to-set on track, and min/max labels. Professional violet/indigo color scheme.", useCase: "Use in price filters, date range pickers, or any numeric range selector. The dual handles + gradient track + tooltips give users precise control over both ends of a range simultaneously.", tags: ["slider", "range", "dual-handle", "tooltip", "gradient-track", "filter"] },
  "radio-card-group-card": { title: "Radio Card Group", description: "Selectable radio cards with spring-animated checkmark (slides in with layoutId), colored border + bg tint on selection, each card has icon, title, description, and price. Layout animation when selection changes. Three plan options: Starter, Professional, Enterprise.", useCase: "Use in pricing plan selectors, feature pickers, or any mutually exclusive card-based selection. The spring checkmark + color tint make selection state instantly clear.", tags: ["radio", "card", "selectable", "checkmark", "pricing", "plan", "spring"] },
  "search-bar-card": { title: "Search Bar", description: "Live search bar with real-time results dropdown, highlighted matching text, category badges on each result, keyboard navigation (up/down/enter/esc), empty state when no results, and clear button. Results show icon + label + category.", useCase: "Use in navbars, sidebars, or any interface with searchable content. The live filtering + highlight + keyboard nav create a fast, accessible search experience.", tags: ["search", "input", "dropdown", "live-results", "highlight", "keyboard"] },
  "select-dropdown-card": { title: "Select Dropdown", description: "Custom searchable select dropdown with grouped options (by continent), animated open/close spring, checkmark that slides to the selected item via layoutId, search filter inside the dropdown, click-outside to close, and highlighted matching text.", useCase: "Use in forms, filters, or settings where native select is too limited. The search + grouping + animated checkmark make it easy to find and select from large option lists.", tags: ["select", "dropdown", "searchable", "grouped", "checkmark", "animated", "custom-select"] },
};

for (const [slug, meta] of Object.entries(formMeta)) {
  cardMetadata[slug] = {
    slug,
    title: meta.title,
    category: "Forms",
    description: meta.description,
    useCase: meta.useCase,
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: meta.tags,
  };
}

// ── New form cards (batch 2) ──
const formMeta2: Record<string, { title: string; description: string; useCase: string; tags: string[] }> = {
  "toggle-switches-card": { title: "Toggle Switches", description: "3 unique toggle variants: (1) iOS-style pill toggle with sliding thumb + icon swap (4 settings rows with color-coded icons), (2) Checkbox cards with spring checkmark + description text, (3) Slide toggle with OFF/ON labels + thumb slides horizontally.", useCase: "Use in settings panels, preference pages, or feature toggles. The iOS toggle is for quick on/off, checkbox cards for opt-in choices with descriptions, and slide toggle for prominent binary switches.", tags: ["toggle", "switch", "ios", "checkbox", "slide", "settings", "preferences"] },
  "color-picker-card": { title: "Color Picker", description: "3 unique color picker variants: (1) Swatch grid with 12 preset colors + ring selection + hex display, (2) HSL hue slider with live color preview + draggable thumb, (3) Hex input with live color preview + copy button + preset row.", useCase: "Use in design tools, theme settings, or any interface where users pick colors. The swatch grid is for quick preset selection, hue slider for precise hue control, and hex input for exact color codes.", tags: ["color", "picker", "swatch", "hue", "hex", "palette", "gradient"] },
  "date-time-picker-card": { title: "Date & Time Picker", description: "3 unique date/time variants: (1) Calendar with month grid, prev/next navigation, today highlight, day selection, (2) Time wheel with scrollable hour/minute columns + AM/PM toggle + center highlight, (3) Date range picker with click-to-set start/end + highlighted range.", useCase: "Use in booking flows, event creation, scheduling, or any date/time selection. The calendar is for single dates, time wheel for precise time selection, and range picker for start-end periods.", tags: ["date", "time", "calendar", "picker", "range", "wheel", "schedule"] },
  "rich-text-editor-card": { title: "Rich Text Editor", description: "3 unique editor variants: (1) Markdown editor with live preview toggle (edit/preview tabs), (2) WYSIWYG with toolbar buttons (bold/italic/list/link/code) + contenteditable, (3) Slash command editor — type / to open a command menu with keyboard navigation.", useCase: "Use in note apps, blog editors, comment boxes, or any text editing interface. The markdown editor is for developers, WYSIWYG for non-technical users, and slash command for Notion-style editing.", tags: ["editor", "markdown", "wysiwyg", "slash", "rich-text", "toolbar", "notion"] },
  "tag-input-card": { title: "Tag Input", description: "3 unique tag input variants: (1) Chips input — type + Enter to add, backspace to remove last, spring entrance/exit, (2) Autocomplete — type to filter suggestions, arrow keys + Enter/Tab to select, (3) Drag reorder — drag tags to reorder + up/down buttons + remove.", useCase: "Use in skill pickers, tag managers, keyword inputs, or any multi-value input. Chips is for free-form tags, autocomplete for guided selection from a list, and drag reorder for prioritized ordering.", tags: ["tag", "input", "chips", "autocomplete", "drag", "reorder", "keywords"] },
};

for (const [slug, meta] of Object.entries(formMeta2)) {
  cardMetadata[slug] = {
    slug,
    title: meta.title,
    category: "Forms",
    description: meta.description,
    useCase: meta.useCase,
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: meta.tags,
  };
}

// ── New form cards (batch 3) ──
const formMeta3: Record<string, { title: string; description: string; useCase: string; tags: string[] }> = {
  "emoji-picker-card": { title: "Emoji Picker", description: "3 variants: (1) Category grid with 8 categories (Smileys, Gestures, Hearts, Animals, Food, Activities, Travel, Objects) + tab navigation, (2) Search filter with live results, (3) Recent + quick pick with memory. Each emoji has hover scale + tap animation.", useCase: "Use in chat apps, comment boxes, reaction pickers, or any text input that supports emoji. The category grid is for browsing, search for finding specific emojis, and recent for quick access to favorites.", tags: ["emoji", "picker", "search", "categories", "recent", "reactions", "chat"] },
  "dropdown-menu-card": { title: "Dropdown Menu", description: "3 variants: (1) Action menu — click trigger with spring open + staggered item reveal + color-coded icons, (2) Hover menu — opens on hover with delay + stagger, (3) Nested menu — items with sub-menus that slide out horizontally with spring. All close on outside click.", useCase: "Use in action menus, context menus, or any interface where users select from a list of actions. The action menu is for button triggers, hover menu for nav items, and nested for hierarchical options.", tags: ["dropdown", "menu", "action", "hover", "nested", "context", "popover"] },
  "tabs-card": { title: "Tabs", description: "3 variants: (1) Underline tabs — animated line slides beneath active tab with spring, (2) Pill tabs — sliding pill background with layoutId, (3) Vertical tabs — side tabs with sliding indicator. All have content area with fade/slide transition on tab change.", useCase: "Use in settings pages, dashboards, product pages, or any interface with multiple views. The underline is classic/minimal, pill is modern/iOS-style, and vertical is for side navigation layouts.", tags: ["tabs", "underline", "pill", "vertical", "navigation", "layout", "animated"] },
  "accordion-card": { title: "Accordion", description: "3 variants: (1) Chevron — classic accordion with rotating chevron icon + smooth height animation, (2) Plus/Minus — icon morphs from + to - with rotation, (3) Card style — each item is a card with icon + colored border highlight on open. All have smooth expand/collapse.", useCase: "Use in FAQ sections, settings panels, filters, or any collapsible content. The chevron is classic, plus/minus is modern, and card style is for feature lists with visual hierarchy.", tags: ["accordion", "faq", "chevron", "plus-minus", "card", "collapse", "expand"] },
  "tooltip-card": { title: "Tooltip", description: "3 variants: (1) Hover tooltips — 4 positions (top/bottom/left/right) with CSS group-hover + smooth opacity, (2) Click tooltip — toggles on click, closes on outside click, with spring animation, (3) Rich tooltip — icon + title + description + star rating, styled as a mini card.", useCase: "Use for help text, contextual info, action confirmations, or any secondary information that shouldn't take permanent space. The hover is for quick hints, click for persistent info, and rich for detailed previews.", tags: ["tooltip", "hover", "click", "rich", "popover", "hint", "help"] },
  "progress-bar-card": { title: "Progress Bar", description: "3 variants: (1) Linear with shimmer — animated fill with moving shimmer sweep + download button with idle/loading/done states, (2) Circular — SVG ring with count-up + preset buttons (25/50/75/100%), (3) Segmented — checkout-style steps with checkmarks + connectors + click to navigate.", useCase: "Use in file uploads, checkout flows, onboarding, or any multi-step process. The linear is for continuous progress, circular for single-value display, and segmented for discrete steps.", tags: ["progress", "linear", "circular", "segmented", "shimmer", "steps", "checkout"] },
};

for (const [slug, meta] of Object.entries(formMeta3)) {
  cardMetadata[slug] = {
    slug,
    title: meta.title,
    category: "Forms",
    description: meta.description,
    useCase: meta.useCase,
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: meta.tags,
  };
}

// ── Navbar section ──
const navbarMeta: Record<string, { title: string; description: string; useCase: string; tags: string[] }> = {
  "navbar001-card": { title: "Navbar 001", description: "A single, full-width marketing navbar lifted from the PagePulse landing page. Scroll-aware morph: starts transparent and full-bleed (h-20), then on scroll > 20px transitions into a floating glass pill (backdrop-blur-xl + border + shadow + rounded-2xl, h-14, inset by 16px, max-w-[1200px] centered). Includes the PagePulse waveform logo, 5 nav links with animated underline, a theme toggle wired to next-themes, a sign-in link, and a rounded-full CTA. Full mobile menu overlay with staggered link reveal. Shown inside a self-contained 560px scrollable demo frame so the scroll effect is visible in-place.", useCase: "Use as the primary navbar on a marketing/landing page for a SaaS or dev-tool product. The scroll-aware floating pill keeps the brand visible while reclaiming vertical space as the user reads. Pair with a hero section immediately below.", tags: ["navbar", "marketing", "scroll-aware", "glass", "floating-pill", "backdrop-blur", "mobile-menu", "theme-toggle", "pagepulse", "sticky", "full-width"] },
};

for (const [slug, meta] of Object.entries(navbarMeta)) {
  cardMetadata[slug] = {
    slug,
    title: meta.title,
    category: "Navbar",
    description: meta.description,
    useCase: meta.useCase,
    complexity: "Advanced",
    framework: ["React 19", "Next.js 16", "TypeScript"],
    dependencies: ["framer-motion", "lucide-react"],
    responsive: true,
    tags: meta.tags,
  };
}
