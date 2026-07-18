import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean Centered Highlighted Pro - Pricing React Component",
  description: "Clean Centered Highlighted Pro is a production-ready pricing React component featuring 3-tier grid + highlighted Pro plan + clean centered layout. Copy,...",
  keywords: ["Clean Centered Highlighted Pro","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing002" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing002",
    title: "Clean Centered Highlighted Pro - Pricing React Component",
    description: "Clean Centered Highlighted Pro is a production-ready pricing React component featuring 3-tier grid + highlighted Pro plan + clean centered layout. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Clean Centered Highlighted Pro - Pricing React Component",
    description: "Clean Centered Highlighted Pro is a production-ready pricing React component featuring 3-tier grid + highlighted Pro plan + clean centered layout. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Clean Centered Highlighted Pro",
  "description": "Clean Centered Highlighted Pro is a production-ready pricing React component featuring 3-tier grid + highlighted Pro plan + clean centered layout. Copy,...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing002",
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
