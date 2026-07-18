import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Symmetric Center Logo - Navbar React Component",
  description: "Luxury Symmetric Center Logo is a production-ready navbar React component featuring Luxury symmetric center logo + split nav + hairline underlines (Maison...",
  keywords: ["Luxury Symmetric Center Logo","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar010" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar010",
    title: "Luxury Symmetric Center Logo - Navbar React Component",
    description: "Luxury Symmetric Center Logo is a production-ready navbar React component featuring Luxury symmetric center logo + split nav + hairline underlines (Maison...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Luxury Symmetric Center Logo - Navbar React Component",
    description: "Luxury Symmetric Center Logo is a production-ready navbar React component featuring Luxury symmetric center logo + split nav + hairline underlines (Maison...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Luxury Symmetric Center Logo",
  "description": "Luxury Symmetric Center Logo is a production-ready navbar React component featuring Luxury symmetric center logo + split nav + hairline underlines (Maison...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar010",
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
