import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expandable Search Takeover - Navbar React Component",
  description: "Expandable Search Takeover is a production-ready navbar React component featuring Search focused — expandable search takeover + trending suggestions...",
  keywords: ["Expandable Search Takeover","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar020" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar020",
    title: "Expandable Search Takeover - Navbar React Component",
    description: "Expandable Search Takeover is a production-ready navbar React component featuring Search focused — expandable search takeover + trending suggestions...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Expandable Search Takeover - Navbar React Component",
    description: "Expandable Search Takeover is a production-ready navbar React component featuring Search focused — expandable search takeover + trending suggestions...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Expandable Search Takeover",
  "description": "Expandable Search Takeover is a production-ready navbar React component featuring Search focused — expandable search takeover + trending suggestions...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar020",
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
