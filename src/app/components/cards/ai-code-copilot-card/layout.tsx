import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Copilot – AI React Component",
  description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·…",
  keywords: ["AI Code Copilot","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ai-code-copilot-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/ai-code-copilot-card",
    title: "AI Code Copilot – AI React Component",
    description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Code Copilot – AI React Component",
    description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Code Copilot",
  "description": "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·…",
  "url": "https://www.mtverse.dev/components/cards/ai-code-copilot-card",
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
