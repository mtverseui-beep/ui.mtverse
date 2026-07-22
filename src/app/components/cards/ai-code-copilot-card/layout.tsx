import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Copilot - AI React Component",
  description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·...",
  keywords: ["AI Code Copilot","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/ai/ai-code-copilot" },
  openGraph: {
    type: "website",
    url: "/components/ai/ai-code-copilot",
    title: "AI Code Copilot - AI React Component",
    description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Code Copilot - AI React Component",
    description: "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Code Copilot",
  "description": "AI Code Copilot is a production-ready ai React component featuring Editable code workspace · agent chat · review diff · apply/reject patch · terminal ·...",
  "url": "https://ui.mtverse.dev/components/ai/ai-code-copilot",
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
