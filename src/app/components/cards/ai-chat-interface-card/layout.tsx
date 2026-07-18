import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat Interface - AI React Component",
  description: "AI Chat Interface is a production-ready ai React component featuring Full ChatGPT-style chat · streaming typewriter · model selector · token/cost ·...",
  keywords: ["AI Chat Interface","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/ai/ai-chat-interface" },
  openGraph: {
    type: "website",
    url: "/components/ai/ai-chat-interface",
    title: "AI Chat Interface - AI React Component",
    description: "AI Chat Interface is a production-ready ai React component featuring Full ChatGPT-style chat · streaming typewriter · model selector · token/cost ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Chat Interface - AI React Component",
    description: "AI Chat Interface is a production-ready ai React component featuring Full ChatGPT-style chat · streaming typewriter · model selector · token/cost ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Chat Interface",
  "description": "AI Chat Interface is a production-ready ai React component featuring Full ChatGPT-style chat · streaming typewriter · model selector · token/cost ·...",
  "url": "https://ui.mtverse.dev/components/ai/ai-chat-interface",
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
