import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plan - Core React Component",
  description: "Pricing Plan is a production-ready core React component featuring Border pulse + CTA glow. Copy, customize, and use it in Next.js projects.",
  keywords: ["Pricing Plan","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing-plan" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing-plan",
    title: "Pricing Plan - Core React Component",
    description: "Pricing Plan is a production-ready core React component featuring Border pulse + CTA glow. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Pricing Plan - Core React Component",
    description: "Pricing Plan is a production-ready core React component featuring Border pulse + CTA glow. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pricing Plan",
  "description": "Pricing Plan is a production-ready core React component featuring Border pulse + CTA glow. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/pricing-plan",
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
