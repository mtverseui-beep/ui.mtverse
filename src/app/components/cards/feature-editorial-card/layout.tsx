import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal Editorial Features – Features React Component",
  description: "Minimal Editorial Features is a production-ready features React component featuring Serif typography + generous whitespace + numbered features + rule lines.…",
  keywords: ["Minimal Editorial Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-editorial-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-editorial-card",
    title: "Minimal Editorial Features – Features React Component",
    description: "Minimal Editorial Features is a production-ready features React component featuring Serif typography + generous whitespace + numbered features + rule lines.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimal Editorial Features – Features React Component",
    description: "Minimal Editorial Features is a production-ready features React component featuring Serif typography + generous whitespace + numbered features + rule lines.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Minimal Editorial Features",
  "description": "Minimal Editorial Features is a production-ready features React component featuring Serif typography + generous whitespace + numbered features + rule lines.…",
  "url": "https://www.mtverse.dev/components/cards/feature-editorial-card",
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
