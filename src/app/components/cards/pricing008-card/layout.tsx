import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Magazine Serif Rule Lines – Pricing React Component",
  description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans…",
  keywords: ["Editorial Magazine Serif Rule Lines","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing008-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing008-card",
    title: "Editorial Magazine Serif Rule Lines – Pricing React Component",
    description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Magazine Serif Rule Lines – Pricing React Component",
    description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Editorial Magazine Serif Rule Lines",
  "description": "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans…",
  "url": "https://www.mtverse.dev/components/cards/pricing008-card",
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
