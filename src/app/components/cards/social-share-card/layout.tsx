import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Share - Buttons React Component",
  description: "Social Share is a production-ready buttons React component featuring Brand color wipe + copy link feedback. Copy, customize, and use it in Next.js projects.",
  keywords: ["Social Share","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/buttons/social-share" },
  openGraph: {
    type: "website",
    url: "/components/buttons/social-share",
    title: "Social Share - Buttons React Component",
    description: "Social Share is a production-ready buttons React component featuring Brand color wipe + copy link feedback. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Social Share - Buttons React Component",
    description: "Social Share is a production-ready buttons React component featuring Brand color wipe + copy link feedback. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Social Share",
  "description": "Social Share is a production-ready buttons React component featuring Brand color wipe + copy link feedback. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/buttons/social-share",
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
