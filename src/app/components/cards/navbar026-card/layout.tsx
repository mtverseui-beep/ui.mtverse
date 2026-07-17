import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Dropdown Cards – Navbar React Component",
  description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions…",
  keywords: ["Bento Grid Dropdown Cards","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar026-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar026-card",
    title: "Bento Grid Dropdown Cards – Navbar React Component",
    description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bento Grid Dropdown Cards – Navbar React Component",
    description: "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Dropdown Cards",
  "description": "Bento Grid Dropdown Cards is a production-ready navbar React component featuring Bento style — grid dropdown with mixed-size cards + hover transitions…",
  "url": "https://www.mtverse.dev/components/cards/navbar026-card",
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
