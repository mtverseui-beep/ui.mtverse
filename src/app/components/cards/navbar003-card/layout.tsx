import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Width Glass Sliding Indicator - Navbar React Component",
  description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer...",
  keywords: ["Full-Width Glass Sliding Indicator","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar003" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar003",
    title: "Full-Width Glass Sliding Indicator - Navbar React Component",
    description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Full-Width Glass Sliding Indicator - Navbar React Component",
    description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Width Glass Sliding Indicator",
  "description": "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar003",
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
