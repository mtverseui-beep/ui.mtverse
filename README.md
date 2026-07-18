# mtverse UI

A production-ready component library with more than 360 responsive React components across navigation, forms, dashboards, charts, authentication, pricing, hero, footer, modal, AI, background, table, and content categories.

Public previews are available at [ui.mtverse.dev](https://ui.mtverse.dev). Component source access is protected by a lifetime mtverse purchase and is not public repository content.

## Stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- Framer Motion and Motion
- Radix UI primitives and Lucide icons
- Bun for registry generation and local workflows

## Local development

```bash
bun install
bun run gen:all
bun run dev
```

Open `http://localhost:3000`. To test protected code access locally, set the values documented in `.env.example` and use the matching `UI_LIBRARY_ACCESS_SECRET` in the main mtverse application.

## Verification

```bash
bun run audit:library
bun run lint
bunx tsc --noEmit
bun run build
```

The production build regenerates the source registry and all component route metadata before compiling.

## Source access architecture

- Component previews and documentation are public.
- Source-code API responses require a short-lived signed entitlement token.
- `www.mtverse.dev` owns customer authentication, Paddle checkout, and purchase records.
- `ui.mtverse.dev` verifies the signed token before returning component source.
- Source responses use private, no-store caching.

## Environment

```env
NEXT_PUBLIC_SITE_URL=https://ui.mtverse.dev
NEXT_PUBLIC_MAIN_SITE_URL=https://www.mtverse.dev
UI_LIBRARY_ACCESS_SECRET=
```

`UI_LIBRARY_ACCESS_SECRET` must be separate from authentication and payment secrets and must match the value in the main mtverse deployment.

## License

The source is provided under the [mtverse UI Commercial License](./LICENSE.md). Redistribution, resale, public mirroring, and use in competing component or template libraries are prohibited.
