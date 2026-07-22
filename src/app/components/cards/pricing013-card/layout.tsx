import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holographic Conic Gradient Borders - Pricing React Component",
  description: "Holographic Conic Gradient Borders is a production-ready pricing React component featuring Holographic iridescent + rotating conic-gradient borders...",
  keywords: ["Holographic Conic Gradient Borders","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing013" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing013",
    title: "Holographic Conic Gradient Borders - Pricing React Component",
    description: "Holographic Conic Gradient Borders is a production-ready pricing React component featuring Holographic iridescent + rotating conic-gradient borders...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Holographic Conic Gradient Borders - Pricing React Component",
    description: "Holographic Conic Gradient Borders is a production-ready pricing React component featuring Holographic iridescent + rotating conic-gradient borders...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Holographic Conic Gradient Borders",
  "description": "Holographic Conic Gradient Borders is a production-ready pricing React component featuring Holographic iridescent + rotating conic-gradient borders...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing013",
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
