import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compact Pill Sidebar - Sidebar React Component",
  description: "Compact Pill Sidebar is a production-ready sidebar React component featuring Ultra-minimal pill rail · labels expand on hover, focus, or tap · pinned touch...",
  keywords: ["Compact Pill Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/compact-pill-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/compact-pill-sidebar",
    title: "Compact Pill Sidebar - Sidebar React Component",
    description: "Compact Pill Sidebar is a production-ready sidebar React component featuring Ultra-minimal pill rail · labels expand on hover, focus, or tap · pinned touch...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Compact Pill Sidebar - Sidebar React Component",
    description: "Compact Pill Sidebar is a production-ready sidebar React component featuring Ultra-minimal pill rail · labels expand on hover, focus, or tap · pinned touch...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Compact Pill Sidebar",
  "description": "Compact Pill Sidebar is a production-ready sidebar React component featuring Ultra-minimal pill rail · labels expand on hover, focus, or tap · pinned touch...",
  "url": "https://ui.mtverse.dev/components/sidebars/compact-pill-sidebar",
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
