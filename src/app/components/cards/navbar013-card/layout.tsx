import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detached Glass Pill Bottom Sheet – Navbar React Component",
  description: "Detached Glass Pill Bottom Sheet is a production-ready navbar React component featuring Floating glass pill detached + inline search expand + bottom sheet…",
  keywords: ["Detached Glass Pill Bottom Sheet","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar013-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar013-card",
    title: "Detached Glass Pill Bottom Sheet – Navbar React Component",
    description: "Detached Glass Pill Bottom Sheet is a production-ready navbar React component featuring Floating glass pill detached + inline search expand + bottom sheet…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detached Glass Pill Bottom Sheet – Navbar React Component",
    description: "Detached Glass Pill Bottom Sheet is a production-ready navbar React component featuring Floating glass pill detached + inline search expand + bottom sheet…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Detached Glass Pill Bottom Sheet",
  "description": "Detached Glass Pill Bottom Sheet is a production-ready navbar React component featuring Floating glass pill detached + inline search expand + bottom sheet…",
  "url": "https://www.mtverse.dev/components/cards/navbar013-card",
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
