import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dual Panel Sidebar - Sidebar React Component",
  description: "Dual Panel Sidebar is a production-ready sidebar React component featuring Two-level expandable · searchable parent groups · smooth height animation ·...",
  keywords: ["Dual Panel Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/dual-panel-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/dual-panel-sidebar",
    title: "Dual Panel Sidebar - Sidebar React Component",
    description: "Dual Panel Sidebar is a production-ready sidebar React component featuring Two-level expandable · searchable parent groups · smooth height animation ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dual Panel Sidebar - Sidebar React Component",
    description: "Dual Panel Sidebar is a production-ready sidebar React component featuring Two-level expandable · searchable parent groups · smooth height animation ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dual Panel Sidebar",
  "description": "Dual Panel Sidebar is a production-ready sidebar React component featuring Two-level expandable · searchable parent groups · smooth height animation ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/dual-panel-sidebar",
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
