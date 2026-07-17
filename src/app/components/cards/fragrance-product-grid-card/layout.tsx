import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragrance Product Grid – Agents React Component",
  description: "Fragrance Product Grid is a production-ready agents React component featuring 3 tabs x 4 product cards + segmented control + staggered entrance (Lumina).…",
  keywords: ["Fragrance Product Grid","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/fragrance-product-grid-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/fragrance-product-grid-card",
    title: "Fragrance Product Grid – Agents React Component",
    description: "Fragrance Product Grid is a production-ready agents React component featuring 3 tabs x 4 product cards + segmented control + staggered entrance (Lumina).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fragrance Product Grid – Agents React Component",
    description: "Fragrance Product Grid is a production-ready agents React component featuring 3 tabs x 4 product cards + segmented control + staggered entrance (Lumina).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Fragrance Product Grid",
  "description": "Fragrance Product Grid is a production-ready agents React component featuring 3 tabs x 4 product cards + segmented control + staggered entrance (Lumina).…",
  "url": "https://www.mtverse.dev/components/cards/fragrance-product-grid-card",
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
