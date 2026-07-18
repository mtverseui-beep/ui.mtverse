import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent Hero Solid Scroll - Navbar React Component",
  description: "Transparent Hero Solid Scroll is a production-ready navbar React component featuring Transparent hero — overlay on hero image + solid white on scroll + text...",
  keywords: ["Transparent Hero Solid Scroll","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar023" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar023",
    title: "Transparent Hero Solid Scroll - Navbar React Component",
    description: "Transparent Hero Solid Scroll is a production-ready navbar React component featuring Transparent hero — overlay on hero image + solid white on scroll + text...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Transparent Hero Solid Scroll - Navbar React Component",
    description: "Transparent Hero Solid Scroll is a production-ready navbar React component featuring Transparent hero — overlay on hero image + solid white on scroll + text...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Transparent Hero Solid Scroll",
  "description": "Transparent Hero Solid Scroll is a production-ready navbar React component featuring Transparent hero — overlay on hero image + solid white on scroll + text...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar023",
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
