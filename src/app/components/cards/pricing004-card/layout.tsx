import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic Bento Glow Reveal Text – Pricing React Component",
  description: "Agentic Bento Glow Reveal Text is a production-ready pricing React component featuring BentoCard hover glow + RevealText + staggered entrance (Agentic).…",
  keywords: ["Agentic Bento Glow Reveal Text","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing004-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing004-card",
    title: "Agentic Bento Glow Reveal Text – Pricing React Component",
    description: "Agentic Bento Glow Reveal Text is a production-ready pricing React component featuring BentoCard hover glow + RevealText + staggered entrance (Agentic).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Bento Glow Reveal Text – Pricing React Component",
    description: "Agentic Bento Glow Reveal Text is a production-ready pricing React component featuring BentoCard hover glow + RevealText + staggered entrance (Agentic).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Agentic Bento Glow Reveal Text",
  "description": "Agentic Bento Glow Reveal Text is a production-ready pricing React component featuring BentoCard hover glow + RevealText + staggered entrance (Agentic).…",
  "url": "https://www.mtverse.dev/components/cards/pricing004-card",
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
