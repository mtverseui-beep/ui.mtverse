import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ink Dark Sidebar – Sidebar React Component",
  description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·…",
  keywords: ["Ink Dark Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ink-dark-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/ink-dark-sidebar-card",
    title: "Ink Dark Sidebar – Sidebar React Component",
    description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ink Dark Sidebar – Sidebar React Component",
    description: "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ink Dark Sidebar",
  "description": "Ink Dark Sidebar is a production-ready sidebar React component featuring Pure dark minimal · neon-green accent · monospace · ultra-narrow collapse ·…",
  "url": "https://www.mtverse.dev/components/cards/ink-dark-sidebar-card",
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
