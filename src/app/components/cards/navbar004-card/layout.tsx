import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frosted Expandable Search Cart - Navbar React Component",
  description: "Frosted Expandable Search Cart is a production-ready navbar React component featuring Frosted glass + expandable search spring + cart badge + slide-down...",
  keywords: ["Frosted Expandable Search Cart","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar004" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar004",
    title: "Frosted Expandable Search Cart - Navbar React Component",
    description: "Frosted Expandable Search Cart is a production-ready navbar React component featuring Frosted glass + expandable search spring + cart badge + slide-down...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Frosted Expandable Search Cart - Navbar React Component",
    description: "Frosted Expandable Search Cart is a production-ready navbar React component featuring Frosted glass + expandable search spring + cart badge + slide-down...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Frosted Expandable Search Cart",
  "description": "Frosted Expandable Search Cart is a production-ready navbar React component featuring Frosted glass + expandable search spring + cart badge + slide-down...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar004",
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
