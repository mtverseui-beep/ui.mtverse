import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Generation Result - Content React Component",
  description: "AI Generation Result is a production-ready content React component featuring Holographic shimmer. Copy, customize, and use it in Next.js projects.",
  keywords: ["AI Generation Result","Content component","Content React component","Content Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ai-generation-result" },
  openGraph: {
    type: "website",
    url: "/components/cards/ai-generation-result",
    title: "AI Generation Result - Content React Component",
    description: "AI Generation Result is a production-ready content React component featuring Holographic shimmer. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Generation Result - Content React Component",
    description: "AI Generation Result is a production-ready content React component featuring Holographic shimmer. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Generation Result",
  "description": "AI Generation Result is a production-ready content React component featuring Holographic shimmer. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/ai-generation-result",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
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
