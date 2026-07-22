import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Pass - Profile React Component",
  description: "Access Pass is a production-ready profile React component featuring Liquid shader + flip. Copy, customize, and use it in Next.js projects.",
  keywords: ["Access Pass","Profile component","Profile React component","Profile Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/liquid-metal-id" },
  openGraph: {
    type: "website",
    url: "/components/cards/liquid-metal-id",
    title: "Access Pass - Profile React Component",
    description: "Access Pass is a production-ready profile React component featuring Liquid shader + flip. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Access Pass - Profile React Component",
    description: "Access Pass is a production-ready profile React component featuring Liquid shader + flip. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Access Pass",
  "description": "Access Pass is a production-ready profile React component featuring Liquid shader + flip. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/liquid-metal-id",
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
