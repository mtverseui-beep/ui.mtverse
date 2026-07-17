import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Border Beam Shimmer – Pricing React Component",
  description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,…",
  keywords: ["Nexus Border Beam Shimmer","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing003-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing003-card",
    title: "Nexus Border Beam Shimmer – Pricing React Component",
    description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Border Beam Shimmer – Pricing React Component",
    description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Nexus Border Beam Shimmer",
  "description": "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/pricing003-card",
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
