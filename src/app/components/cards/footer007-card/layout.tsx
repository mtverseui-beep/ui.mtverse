import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Mega Compliance Ticker - Footer React Component",
  description: "Enterprise Mega Compliance Ticker is a production-ready footer React component featuring Large enterprise — 5-col mega grid + trust badges + dot-grid bg...",
  keywords: ["Enterprise Mega Compliance Ticker","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer007" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer007",
    title: "Enterprise Mega Compliance Ticker - Footer React Component",
    description: "Enterprise Mega Compliance Ticker is a production-ready footer React component featuring Large enterprise — 5-col mega grid + trust badges + dot-grid bg...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Enterprise Mega Compliance Ticker - Footer React Component",
    description: "Enterprise Mega Compliance Ticker is a production-ready footer React component featuring Large enterprise — 5-col mega grid + trust badges + dot-grid bg...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Enterprise Mega Compliance Ticker",
  "description": "Enterprise Mega Compliance Ticker is a production-ready footer React component featuring Large enterprise — 5-col mega grid + trust badges + dot-grid bg...",
  "url": "https://ui.mtverse.dev/components/footers/footer007",
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
