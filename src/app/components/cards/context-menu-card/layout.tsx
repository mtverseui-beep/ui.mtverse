import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Menu – Modals React Component",
  description: "Context Menu is a production-ready modals React component featuring Right-click menu with cut/copy/paste + dividers + sub-menus. Copy, customize, and use it…",
  keywords: ["Context Menu","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/context-menu-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/context-menu-card",
    title: "Context Menu – Modals React Component",
    description: "Context Menu is a production-ready modals React component featuring Right-click menu with cut/copy/paste + dividers + sub-menus. Copy, customize, and use it…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Menu – Modals React Component",
    description: "Context Menu is a production-ready modals React component featuring Right-click menu with cut/copy/paste + dividers + sub-menus. Copy, customize, and use it…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Context Menu",
  "description": "Context Menu is a production-ready modals React component featuring Right-click menu with cut/copy/paste + dividers + sub-menus. Copy, customize, and use it…",
  "url": "https://www.mtverse.dev/components/cards/context-menu-card",
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
