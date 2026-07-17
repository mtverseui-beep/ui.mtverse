import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linear Feature Cards – Agents React Component",
  description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use…",
  keywords: ["Linear Feature Cards","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/linear-feature-cards-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/linear-feature-cards-card",
    title: "Linear Feature Cards – Agents React Component",
    description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linear Feature Cards – Agents React Component",
    description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Linear Feature Cards",
  "description": "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use…",
  "url": "https://www.mtverse.dev/components/cards/linear-feature-cards-card",
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
