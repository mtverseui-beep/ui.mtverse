import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Border Sidebar – Sidebar React Component",
  description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style.…",
  keywords: ["Gradient Border Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/gradient-border-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/gradient-border-sidebar-card",
    title: "Gradient Border Sidebar – Sidebar React Component",
    description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Border Sidebar – Sidebar React Component",
    description: "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Gradient Border Sidebar",
  "description": "Gradient Border Sidebar is a production-ready sidebar React component featuring Dark sidebar · animated gradient border · neon icon glow · cyberpunk style.…",
  "url": "https://www.mtverse.dev/components/cards/gradient-border-sidebar-card",
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
