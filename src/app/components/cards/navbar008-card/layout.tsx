import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple-Style Hover Mega Menu - Navbar React Component",
  description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard)....",
  keywords: ["Apple-Style Hover Mega Menu","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar008" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar008",
    title: "Apple-Style Hover Mega Menu - Navbar React Component",
    description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Apple-Style Hover Mega Menu - Navbar React Component",
    description: "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple-Style Hover Mega Menu",
  "description": "Apple-Style Hover Mega Menu is a production-ready navbar React component featuring Apple-style full-width hover mega menu + 3-column categories (Orchard)....",
  "url": "https://ui.mtverse.dev/components/navbars/navbar008",
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
