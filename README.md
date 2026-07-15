# Card Showcase Pro

A production-ready Next.js 16 UI library showcasing **71 animated, interactive React components** across **14 categories** — Buttons, Forms, Navbar, Footer, Hero, Pricing, Sign In, Sign Up, Forgot Password, Reset Password, 404, 500, Offline, and Cards. Each component ships with live preview + copy-paste source code, dark/light theming, and Tailwind CSS v4 styling.

Built with the New-York shadcn/ui style, React 19, and the modern Bun toolchain.

---

## Highlights

- **71 components** across 14 categories
- **8 page-level components** extracted from PagePulse — each with unique branding, animated right-side visuals, and text/icon animations
- **Live code registry** — every card's full source is shown in-app and copyable
- **Dark / light theme** with next-themes + CSS variables
- **Framer Motion** animations throughout
- **Tailwind CSS v4** with custom `cs-*` utility classes
- **Standalone Next.js build** — output is a single self-contained server bundle
- **Responsive** — mobile-first, mobile drawers, desktop hover states

---

## Tech Stack

| Layer | Tech |
|------|------|
| Framework | Next.js 16 (App Router, standalone output) |
| Runtime | Bun 1.3+ |
| UI | React 19, shadcn/ui (new-york), Tailwind CSS v4, lucide-react |
| Animation | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| Theming | next-themes |
| Deployment | Vercel / standalone Node / Docker / Caddy |

---

## Prerequisites

- [Bun](https://bun.sh/) ≥ 1.3 (recommended) — or Node 20+ with npm/pnpm

---

## Quick Start

```bash
bun install
bun run gen:all
bun run dev
# → http://localhost:3000
```

---

## Production Build

```bash
bun run build
bun run start
```

The `start` script uses `node` (not `bun`) — Bun crashes silently on the standalone Next.js server.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Most cards work without any env vars.

---

## Project Structure

```
├── public/
├── scripts/
│   ├── generate-code-registry.ts
│   ├── generate-card-pages.ts
│   └── create_routes.py
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Redirects to first card
│   │   ├── globals.css
│   │   └── components/cards/*/page.tsx  # 71 card routes
│   ├── components/
│   │   ├── cards/               # Original flagship cards
│   │   ├── cards/more/          # Extended cards (incl. 8 PagePulse-extracted)
│   │   ├── cards-data/cards.ts  # Master registry + categories
│   │   ├── library/             # CardShowcase, CodePanel, code-registry
│   │   ├── navbar-showcase/     # Navbar/Footer/Hero/Page showcases
│   │   ├── shell/DashboardShell.tsx  # 14-section sidebar + topbar
│   │   └── ui/                  # shadcn/ui primitives
│   ├── hooks/
│   └── lib/
├── next.config.ts
├── package.json
└── bun.lock
```

---

## 14 Sidebar Categories

| # | Category | Components |
|---|----------|-----------|
| 1 | Cards | 30+ core/content/product/profile/data/stack cards |
| 2 | Buttons | 14 button components |
| 3 | Forms | 18 form components |
| 4 | Navbar | Navbar 001 (PagePulse, scroll-aware floating glass pill) |
| 5 | Footer | Footer 001 (Northwind, canvas wave animation) |
| 6 | Hero | Animated Typography Split Hero (char-by-char reveal) |
| 7 | Pricing | Pricing Section (Vertex, monthly/annual toggle) |
| 8 | Sign In | Meridian (light beam + orbiting dots) |
| 9 | Sign Up | Flux Labs (flowing dots grid wave) |
| 10 | Forgot Password | Beacon (rotating lighthouse beam) |
| 11 | Reset Password | Prism (refracted light rays) |
| 12 | 404 | Drift (glitch text + floating chips) |
| 13 | 500 | Crash (pulse glow + shake icon) |
| 14 | Offline | Tether (wifi ripple + floating cards) |

All 8 PagePulse-extracted components have **unique branding** (no PagePulse name/logo), unique animated right-side visuals (auth pages), and text/icon animations.

---

## Deployment

### Vercel
```bash
vercel deploy --prod
```

### Docker
```bash
docker build -t card-showcase-pro .
docker run -p 3000:3000 card-showcase-pro
```

### Docker Compose
```bash
docker compose up --build -d
```

### Bare metal (standalone)
```bash
bun run build
NODE_ENV=production node .next/standalone/server.js
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Production build (runs gen:all first) |
| `bun run start` | Run standalone production server (node) |
| `bun run gen:all` | Regenerate code registry + card pages |
| `bun run lint` | ESLint check |

---

## License

MIT
