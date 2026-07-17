import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sticky Shrinking Progress Bar – Navbar React Component",
  description: "Sticky Shrinking Progress Bar is a production-ready navbar React component featuring Sticky shrinking — tall→compact on scroll + tagline hide + size morph…",
  keywords: ["Sticky Shrinking Progress Bar","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar024-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar024-card",
    title: "Sticky Shrinking Progress Bar – Navbar React Component",
    description: "Sticky Shrinking Progress Bar is a production-ready navbar React component featuring Sticky shrinking — tall→compact on scroll + tagline hide + size morph…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sticky Shrinking Progress Bar – Navbar React Component",
    description: "Sticky Shrinking Progress Bar is a production-ready navbar React component featuring Sticky shrinking — tall→compact on scroll + tagline hide + size morph…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sticky Shrinking Progress Bar",
  "description": "Sticky Shrinking Progress Bar is a production-ready navbar React component featuring Sticky shrinking — tall→compact on scroll + tagline hide + size morph…",
  "url": "https://www.mtverse.dev/components/cards/navbar024-card",
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
