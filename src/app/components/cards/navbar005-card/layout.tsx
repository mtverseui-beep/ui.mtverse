import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floating Beige Expandable Search - Navbar React Component",
  description: "Floating Beige Expandable Search is a production-ready navbar React component featuring Floating beige pill + expandable search + scroll morph + staggered...",
  keywords: ["Floating Beige Expandable Search","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar005" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar005",
    title: "Floating Beige Expandable Search - Navbar React Component",
    description: "Floating Beige Expandable Search is a production-ready navbar React component featuring Floating beige pill + expandable search + scroll morph + staggered...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Floating Beige Expandable Search - Navbar React Component",
    description: "Floating Beige Expandable Search is a production-ready navbar React component featuring Floating beige pill + expandable search + scroll morph + staggered...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Floating Beige Expandable Search",
  "description": "Floating Beige Expandable Search is a production-ready navbar React component featuring Floating beige pill + expandable search + scroll morph + staggered...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar005",
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
