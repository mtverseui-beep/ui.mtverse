import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Minimal Auth - Auth React Component",
  description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,...",
  keywords: ["Apple Minimal Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth011" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth011",
    title: "Apple Minimal Auth - Auth React Component",
    description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Apple Minimal Auth - Auth React Component",
    description: "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple Minimal Auth",
  "description": "Apple Minimal Auth is a production-ready auth React component featuring Apple-style minimal spacious centered + pill CTA + Apple logo + SF Pro. Copy,...",
  "url": "https://ui.mtverse.dev/components/auth/auth011",
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
