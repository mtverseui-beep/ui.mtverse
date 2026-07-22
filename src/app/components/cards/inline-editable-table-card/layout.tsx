import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validated Inline Edit Table - Tables React Component",
  description: "Validated Inline Edit Table is a production-ready tables React component featuring Explicit cell editing · email and numeric validation · keyboard...",
  keywords: ["Validated Inline Edit Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/inline-editable-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/inline-editable-table",
    title: "Validated Inline Edit Table - Tables React Component",
    description: "Validated Inline Edit Table is a production-ready tables React component featuring Explicit cell editing · email and numeric validation · keyboard...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Validated Inline Edit Table - Tables React Component",
    description: "Validated Inline Edit Table is a production-ready tables React component featuring Explicit cell editing · email and numeric validation · keyboard...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Validated Inline Edit Table",
  "description": "Validated Inline Edit Table is a production-ready tables React component featuring Explicit cell editing · email and numeric validation · keyboard...",
  "url": "https://ui.mtverse.dev/components/tables/inline-editable-table",
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
