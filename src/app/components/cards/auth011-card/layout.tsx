import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Minimal Auth – Auth React Component",
  description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,…",
  keywords: ["Apple Minimal Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/auth011-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/auth011-card",
    title: "Apple Minimal Auth – Auth React Component",
    description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Minimal Auth – Auth React Component",
    description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple Minimal Auth",
  "description": "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/auth011-card",
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
