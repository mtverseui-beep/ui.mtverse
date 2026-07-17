import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinner Patterns – Agents React Component",
  description: "Spinner Patterns is a production-ready agents React component featuring 15 CSS loading spinner patterns. Copy, customize, and use it in Next.js projects.",
  keywords: ["Spinner Patterns","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/spinner-patterns-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/spinner-patterns-card",
    title: "Spinner Patterns – Agents React Component",
    description: "Spinner Patterns is a production-ready agents React component featuring 15 CSS loading spinner patterns. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinner Patterns – Agents React Component",
    description: "Spinner Patterns is a production-ready agents React component featuring 15 CSS loading spinner patterns. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Spinner Patterns",
  "description": "Spinner Patterns is a production-ready agents React component featuring 15 CSS loading spinner patterns. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/spinner-patterns-card",
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
