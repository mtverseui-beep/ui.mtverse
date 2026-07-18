import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinned Enterprise Table - Tables React Component",
  description: "Pinned Enterprise Table is a production-ready tables React component featuring Pinned identity column · stable zebra surfaces · wide-data scrolling ·...",
  keywords: ["Pinned Enterprise Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/enterprise-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/enterprise-table",
    title: "Pinned Enterprise Table - Tables React Component",
    description: "Pinned Enterprise Table is a production-ready tables React component featuring Pinned identity column · stable zebra surfaces · wide-data scrolling ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Pinned Enterprise Table - Tables React Component",
    description: "Pinned Enterprise Table is a production-ready tables React component featuring Pinned identity column · stable zebra surfaces · wide-data scrolling ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pinned Enterprise Table",
  "description": "Pinned Enterprise Table is a production-ready tables React component featuring Pinned identity column · stable zebra surfaces · wide-data scrolling ·...",
  "url": "https://ui.mtverse.dev/components/tables/enterprise-table",
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
