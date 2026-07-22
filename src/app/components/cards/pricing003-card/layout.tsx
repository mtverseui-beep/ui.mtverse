import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Border Beam Shimmer - Pricing React Component",
  description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,...",
  keywords: ["Nexus Border Beam Shimmer","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing003" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing003",
    title: "Nexus Border Beam Shimmer - Pricing React Component",
    description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Nexus Border Beam Shimmer - Pricing React Component",
    description: "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Nexus Border Beam Shimmer",
  "description": "Nexus Border Beam Shimmer is a production-ready pricing React component featuring Border beam + shimmer CTA + monthly/yearly toggle (Nexus). Copy,...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing003",
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
