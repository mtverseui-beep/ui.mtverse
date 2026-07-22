import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Dropdown Cards - Navbar React Component",
  description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions...",
  keywords: ["Bento Grid Dropdown Cards","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar026" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar026",
    title: "Bento Grid Dropdown Cards - Navbar React Component",
    description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bento Grid Dropdown Cards - Navbar React Component",
    description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Dropdown Cards",
  "description": "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar026",
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
