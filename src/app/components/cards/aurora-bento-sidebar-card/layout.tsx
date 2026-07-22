import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Bento Sidebar - Sidebar React Component",
  description: "Aurora Bento Sidebar is a production-ready sidebar React component featuring Container-aware bento navigation · mixed-size tiles · narrow full-width mode ·...",
  keywords: ["Aurora Bento Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/aurora-bento-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/aurora-bento-sidebar",
    title: "Aurora Bento Sidebar - Sidebar React Component",
    description: "Aurora Bento Sidebar is a production-ready sidebar React component featuring Container-aware bento navigation · mixed-size tiles · narrow full-width mode ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Aurora Bento Sidebar - Sidebar React Component",
    description: "Aurora Bento Sidebar is a production-ready sidebar React component featuring Container-aware bento navigation · mixed-size tiles · narrow full-width mode ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Bento Sidebar",
  "description": "Aurora Bento Sidebar is a production-ready sidebar React component featuring Container-aware bento navigation · mixed-size tiles · narrow full-width mode ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/aurora-bento-sidebar",
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
