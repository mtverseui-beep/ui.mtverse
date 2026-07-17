import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization Tree Grid – Tables React Component",
  description: "Organization Tree Grid is a production-ready tables React component featuring Semantic treegrid · nested ownership · expand/collapse all · hierarchy search…",
  keywords: ["Organization Tree Grid","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/tree-table-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/tree-table-card",
    title: "Organization Tree Grid – Tables React Component",
    description: "Organization Tree Grid is a production-ready tables React component featuring Semantic treegrid · nested ownership · expand/collapse all · hierarchy search…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organization Tree Grid – Tables React Component",
    description: "Organization Tree Grid is a production-ready tables React component featuring Semantic treegrid · nested ownership · expand/collapse all · hierarchy search…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Organization Tree Grid",
  "description": "Organization Tree Grid is a production-ready tables React component featuring Semantic treegrid · nested ownership · expand/collapse all · hierarchy search…",
  "url": "https://www.mtverse.dev/components/cards/tree-table-card",
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
