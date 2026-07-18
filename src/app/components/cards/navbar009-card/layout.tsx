import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notion-Style Nested Sidebar - Navbar React Component",
  description: "Notion-Style Nested Sidebar is a production-ready navbar React component featuring Notion-style slide-in sidebar + nested tree + search + profile...",
  keywords: ["Notion-Style Nested Sidebar","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar009" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar009",
    title: "Notion-Style Nested Sidebar - Navbar React Component",
    description: "Notion-Style Nested Sidebar is a production-ready navbar React component featuring Notion-style slide-in sidebar + nested tree + search + profile...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Notion-Style Nested Sidebar - Navbar React Component",
    description: "Notion-Style Nested Sidebar is a production-ready navbar React component featuring Notion-style slide-in sidebar + nested tree + search + profile...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Notion-Style Nested Sidebar",
  "description": "Notion-Style Nested Sidebar is a production-ready navbar React component featuring Notion-style slide-in sidebar + nested tree + search + profile...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar009",
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
