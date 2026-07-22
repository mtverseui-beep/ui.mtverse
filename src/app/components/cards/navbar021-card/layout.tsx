import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cascading Multi-Level Dropdown - Navbar React Component",
  description: "Cascading Multi-Level Dropdown is a production-ready navbar React component featuring Multi-level dropdown — cascading 3-level menus + nested accordion...",
  keywords: ["Cascading Multi-Level Dropdown","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar021" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar021",
    title: "Cascading Multi-Level Dropdown - Navbar React Component",
    description: "Cascading Multi-Level Dropdown is a production-ready navbar React component featuring Multi-level dropdown — cascading 3-level menus + nested accordion...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Cascading Multi-Level Dropdown - Navbar React Component",
    description: "Cascading Multi-Level Dropdown is a production-ready navbar React component featuring Multi-level dropdown — cascading 3-level menus + nested accordion...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cascading Multi-Level Dropdown",
  "description": "Cascading Multi-Level Dropdown is a production-ready navbar React component featuring Multi-level dropdown — cascading 3-level menus + nested accordion...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar021",
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
