import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple-Style Hover Mega Menu – Navbar React Component",
  description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard).…",
  keywords: ["Apple-Style Hover Mega Menu","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar008-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar008-card",
    title: "Apple-Style Hover Mega Menu – Navbar React Component",
    description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple-Style Hover Mega Menu – Navbar React Component",
    description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple-Style Hover Mega Menu",
  "description": "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard).…",
  "url": "https://www.mtverse.dev/components/cards/navbar008-card",
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
