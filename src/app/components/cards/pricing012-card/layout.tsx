import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Soft Embossed Cards – Pricing React Component",
  description: "Neumorphic Soft Embossed Cards is a production-ready pricing React component featuring Neumorphic soft UI + embossed dual-shadow cards + sunken toggle…",
  keywords: ["Neumorphic Soft Embossed Cards","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing012-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing012-card",
    title: "Neumorphic Soft Embossed Cards – Pricing React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready pricing React component featuring Neumorphic soft UI + embossed dual-shadow cards + sunken toggle…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neumorphic Soft Embossed Cards – Pricing React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready pricing React component featuring Neumorphic soft UI + embossed dual-shadow cards + sunken toggle…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Soft Embossed Cards",
  "description": "Neumorphic Soft Embossed Cards is a production-ready pricing React component featuring Neumorphic soft UI + embossed dual-shadow cards + sunken toggle…",
  "url": "https://www.mtverse.dev/components/cards/pricing012-card",
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
