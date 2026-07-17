import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sticky Agent Cards – Agents React Component",
  description: "Sticky Agent Cards is a production-ready agents React component featuring 4 sticky-stacking agent cards with scroll scale (Agentic). Copy, customize, and…",
  keywords: ["Sticky Agent Cards","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/sticky-agent-cards-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/sticky-agent-cards-card",
    title: "Sticky Agent Cards – Agents React Component",
    description: "Sticky Agent Cards is a production-ready agents React component featuring 4 sticky-stacking agent cards with scroll scale (Agentic). Copy, customize, and…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sticky Agent Cards – Agents React Component",
    description: "Sticky Agent Cards is a production-ready agents React component featuring 4 sticky-stacking agent cards with scroll scale (Agentic). Copy, customize, and…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sticky Agent Cards",
  "description": "Sticky Agent Cards is a production-ready agents React component featuring 4 sticky-stacking agent cards with scroll scale (Agentic). Copy, customize, and…",
  "url": "https://www.mtverse.dev/components/cards/sticky-agent-cards-card",
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
