import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Magazine Serif Rule Lines - Pricing React Component",
  description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans...",
  keywords: ["Editorial Magazine Serif Rule Lines","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing008" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing008",
    title: "Editorial Magazine Serif Rule Lines - Pricing React Component",
    description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Editorial Magazine Serif Rule Lines - Pricing React Component",
    description: "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Editorial Magazine Serif Rule Lines",
  "description": "Editorial Magazine Serif Rule Lines is a production-ready pricing React component featuring Editorial magazine serif + rule lines + numbered plans...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing008",
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
