import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empty States – Core React Component",
  description: "Empty States is a production-ready core React component featuring 9 empty state variants · icons · CTA buttons · dark/light · production-ready. Copy,…",
  keywords: ["Empty States","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/empty-states-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/empty-states-card",
    title: "Empty States – Core React Component",
    description: "Empty States is a production-ready core React component featuring 9 empty state variants · icons · CTA buttons · dark/light · production-ready. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empty States – Core React Component",
    description: "Empty States is a production-ready core React component featuring 9 empty state variants · icons · CTA buttons · dark/light · production-ready. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Empty States",
  "description": "Empty States is a production-ready core React component featuring 9 empty state variants · icons · CTA buttons · dark/light · production-ready. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/empty-states-card",
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
