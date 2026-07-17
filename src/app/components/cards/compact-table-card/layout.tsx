import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compact Density Table – Tables React Component",
  description: "Compact Density Table is a production-ready tables React component featuring High-density professional rows · search · accessible sort · premium surfaces ·…",
  keywords: ["Compact Density Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/compact-table-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/compact-table-card",
    title: "Compact Density Table – Tables React Component",
    description: "Compact Density Table is a production-ready tables React component featuring High-density professional rows · search · accessible sort · premium surfaces ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compact Density Table – Tables React Component",
    description: "Compact Density Table is a production-ready tables React component featuring High-density professional rows · search · accessible sort · premium surfaces ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Compact Density Table",
  "description": "Compact Density Table is a production-ready tables React component featuring High-density professional rows · search · accessible sort · premium surfaces ·…",
  "url": "https://www.mtverse.dev/components/cards/compact-table-card",
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
