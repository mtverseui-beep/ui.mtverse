import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search-First Command Palette - Navbar React Component",
  description: "Search-First Command Palette is a production-ready navbar React component featuring Search-first center command bar + breadcrumbs + ⌘K palette (Vector)....",
  keywords: ["Search-First Command Palette","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar007" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar007",
    title: "Search-First Command Palette - Navbar React Component",
    description: "Search-First Command Palette is a production-ready navbar React component featuring Search-first center command bar + breadcrumbs + ⌘K palette (Vector)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Search-First Command Palette - Navbar React Component",
    description: "Search-First Command Palette is a production-ready navbar React component featuring Search-first center command bar + breadcrumbs + ⌘K palette (Vector)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Search-First Command Palette",
  "description": "Search-First Command Palette is a production-ready navbar React component featuring Search-first center command bar + breadcrumbs + ⌘K palette (Vector)....",
  "url": "https://ui.mtverse.dev/components/navbars/navbar007",
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
