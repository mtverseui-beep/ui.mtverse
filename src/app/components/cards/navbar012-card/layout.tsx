import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal SaaS Underline Hover - Navbar React Component",
  description: "Minimal SaaS Underline Hover is a production-ready navbar React component featuring Minimal SaaS — sparse layout + underline hover + slide-down mobile...",
  keywords: ["Minimal SaaS Underline Hover","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar012" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar012",
    title: "Minimal SaaS Underline Hover - Navbar React Component",
    description: "Minimal SaaS Underline Hover is a production-ready navbar React component featuring Minimal SaaS — sparse layout + underline hover + slide-down mobile...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Minimal SaaS Underline Hover - Navbar React Component",
    description: "Minimal SaaS Underline Hover is a production-ready navbar React component featuring Minimal SaaS — sparse layout + underline hover + slide-down mobile...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Minimal SaaS Underline Hover",
  "description": "Minimal SaaS Underline Hover is a production-ready navbar React component featuring Minimal SaaS — sparse layout + underline hover + slide-down mobile...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar012",
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
