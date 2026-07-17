import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Card – Modals React Component",
  description: "Hover Card is a production-ready modals React component featuring Rich hover card with avatar + stats + rating + delay show/hide. Copy, customize, and use…",
  keywords: ["Hover Card","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hover-card-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hover-card-card",
    title: "Hover Card – Modals React Component",
    description: "Hover Card is a production-ready modals React component featuring Rich hover card with avatar + stats + rating + delay show/hide. Copy, customize, and use…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hover Card – Modals React Component",
    description: "Hover Card is a production-ready modals React component featuring Rich hover card with avatar + stats + rating + delay show/hide. Copy, customize, and use…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Hover Card",
  "description": "Hover Card is a production-ready modals React component featuring Rich hover card with avatar + stats + rating + delay show/hide. Copy, customize, and use…",
  "url": "https://www.mtverse.dev/components/cards/hover-card-card",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
  "codeRepository": "https://github.com/mtverse",
  "author": {
    "@type": "Organization",
    "name": "mtverse",
    "url": "https://www.mtverse.dev"
  }
};

export default function ComponentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
      />
      {children}
    </>
  );
}
