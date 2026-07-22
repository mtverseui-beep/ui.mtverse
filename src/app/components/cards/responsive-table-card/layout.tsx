import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsive Records Table - Tables React Component",
  description: "Responsive Records Table is a production-ready tables React component featuring Preview-container aware · semantic desktop table · touch-friendly mobile...",
  keywords: ["Responsive Records Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/responsive-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/responsive-table",
    title: "Responsive Records Table - Tables React Component",
    description: "Responsive Records Table is a production-ready tables React component featuring Preview-container aware · semantic desktop table · touch-friendly mobile...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Responsive Records Table - Tables React Component",
    description: "Responsive Records Table is a production-ready tables React component featuring Preview-container aware · semantic desktop table · touch-friendly mobile...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Responsive Records Table",
  "description": "Responsive Records Table is a production-ready tables React component featuring Preview-container aware · semantic desktop table · touch-friendly mobile...",
  "url": "https://ui.mtverse.dev/components/tables/responsive-table",
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
