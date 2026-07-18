import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Comparison Matrix - Tables React Component",
  description: "Plan Comparison Matrix is a production-ready tables React component featuring Feature comparison · sticky capability labels · billing switch · plan emphasis...",
  keywords: ["Plan Comparison Matrix","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/comparison-matrix-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/comparison-matrix-table",
    title: "Plan Comparison Matrix - Tables React Component",
    description: "Plan Comparison Matrix is a production-ready tables React component featuring Feature comparison · sticky capability labels · billing switch · plan emphasis...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Plan Comparison Matrix - Tables React Component",
    description: "Plan Comparison Matrix is a production-ready tables React component featuring Feature comparison · sticky capability labels · billing switch · plan emphasis...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Plan Comparison Matrix",
  "description": "Plan Comparison Matrix is a production-ready tables React component featuring Feature comparison · sticky capability labels · billing switch · plan emphasis...",
  "url": "https://ui.mtverse.dev/components/tables/comparison-matrix-table",
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
