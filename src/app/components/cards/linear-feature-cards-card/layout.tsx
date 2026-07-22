import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linear Feature Cards - Agents React Component",
  description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use...",
  keywords: ["Linear Feature Cards","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/linear-feature-cards" },
  openGraph: {
    type: "website",
    url: "/components/premium/linear-feature-cards",
    title: "Linear Feature Cards - Agents React Component",
    description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Linear Feature Cards - Agents React Component",
    description: "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Linear Feature Cards",
  "description": "Linear Feature Cards is a production-ready agents React component featuring 3 expandable feature cards with layoutId modal morph. Copy, customize, and use...",
  "url": "https://ui.mtverse.dev/components/premium/linear-feature-cards",
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
