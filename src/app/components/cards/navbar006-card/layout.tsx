import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "macOS Dock Magnification - Navbar React Component",
  description: "macOS Dock Magnification is a production-ready navbar React component featuring Bottom-anchored floating dock + icon magnification + tooltip labels...",
  keywords: ["macOS Dock Magnification","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar006" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar006",
    title: "macOS Dock Magnification - Navbar React Component",
    description: "macOS Dock Magnification is a production-ready navbar React component featuring Bottom-anchored floating dock + icon magnification + tooltip labels...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "macOS Dock Magnification - Navbar React Component",
    description: "macOS Dock Magnification is a production-ready navbar React component featuring Bottom-anchored floating dock + icon magnification + tooltip labels...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "macOS Dock Magnification",
  "description": "macOS Dock Magnification is a production-ready navbar React component featuring Bottom-anchored floating dock + icon magnification + tooltip labels...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar006",
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
