import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Border Sidebar - Sidebar React Component",
  description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style....",
  keywords: ["Gradient Border Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/gradient-border-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/gradient-border-sidebar",
    title: "Gradient Border Sidebar - Sidebar React Component",
    description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Gradient Border Sidebar - Sidebar React Component",
    description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Gradient Border Sidebar",
  "description": "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style....",
  "url": "https://ui.mtverse.dev/components/sidebars/gradient-border-sidebar",
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
