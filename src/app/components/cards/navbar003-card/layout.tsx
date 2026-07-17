import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Width Glass Sliding Indicator – Navbar React Component",
  description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer…",
  keywords: ["Full-Width Glass Sliding Indicator","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar003-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar003-card",
    title: "Full-Width Glass Sliding Indicator – Navbar React Component",
    description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Width Glass Sliding Indicator – Navbar React Component",
    description: "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Width Glass Sliding Indicator",
  "description": "Full-Width Glass Sliding Indicator is a production-ready navbar React component featuring Full-width glass + sliding indicator + cmd palette + drawer…",
  "url": "https://www.mtverse.dev/components/cards/navbar003-card",
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
