import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ink Dark Sidebar - Sidebar React Component",
  description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·...",
  keywords: ["Ink Dark Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/ink-dark-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/ink-dark-sidebar",
    title: "Ink Dark Sidebar - Sidebar React Component",
    description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Ink Dark Sidebar - Sidebar React Component",
    description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ink Dark Sidebar",
  "description": "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/ink-dark-sidebar",
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
