import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Support Copilot – AI React Component",
  description: "AI Support Copilot is a production-ready ai React component featuring Support inbox · customer timeline · AI case brief · tone-aware drafts · internal notes…",
  keywords: ["AI Support Copilot","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ai-support-copilot-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/ai-support-copilot-card",
    title: "AI Support Copilot – AI React Component",
    description: "AI Support Copilot is a production-ready ai React component featuring Support inbox · customer timeline · AI case brief · tone-aware drafts · internal notes…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Support Copilot – AI React Component",
    description: "AI Support Copilot is a production-ready ai React component featuring Support inbox · customer timeline · AI case brief · tone-aware drafts · internal notes…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Support Copilot",
  "description": "AI Support Copilot is a production-ready ai React component featuring Support inbox · customer timeline · AI case brief · tone-aware drafts · internal notes…",
  "url": "https://www.mtverse.dev/components/cards/ai-support-copilot-card",
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
