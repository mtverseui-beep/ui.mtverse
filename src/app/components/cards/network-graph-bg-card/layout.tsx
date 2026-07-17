import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neural Network – Backgrounds React Component",
  description: "Neural Network is a production-ready backgrounds React component featuring Deterministic SVG network · AI hero focal balance · no O(n²) canvas loop. Copy,…",
  keywords: ["Neural Network","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/network-graph-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/network-graph-bg-card",
    title: "Neural Network – Backgrounds React Component",
    description: "Neural Network is a production-ready backgrounds React component featuring Deterministic SVG network · AI hero focal balance · no O(n²) canvas loop. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Network – Backgrounds React Component",
    description: "Neural Network is a production-ready backgrounds React component featuring Deterministic SVG network · AI hero focal balance · no O(n²) canvas loop. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neural Network",
  "description": "Neural Network is a production-ready backgrounds React component featuring Deterministic SVG network · AI hero focal balance · no O(n²) canvas loop. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/network-graph-bg-card",
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
