import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permissions Matrix Table - Tables React Component",
  description: "Permissions Matrix Table is a production-ready tables React component featuring Role access matrix · protected admin policy · keyboard-ready permission...",
  keywords: ["Permissions Matrix Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/permissions-matrix-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/permissions-matrix-table",
    title: "Permissions Matrix Table - Tables React Component",
    description: "Permissions Matrix Table is a production-ready tables React component featuring Role access matrix · protected admin policy · keyboard-ready permission...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Permissions Matrix Table - Tables React Component",
    description: "Permissions Matrix Table is a production-ready tables React component featuring Role access matrix · protected admin policy · keyboard-ready permission...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Permissions Matrix Table",
  "description": "Permissions Matrix Table is a production-ready tables React component featuring Role access matrix · protected admin policy · keyboard-ready permission...",
  "url": "https://ui.mtverse.dev/components/tables/permissions-matrix-table",
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
