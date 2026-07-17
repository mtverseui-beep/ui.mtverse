import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Bottom Sheet – Modals React Component",
  description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,…",
  keywords: ["Mobile Bottom Sheet","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/mobile-bottom-sheet-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/mobile-bottom-sheet-card",
    title: "Mobile Bottom Sheet – Modals React Component",
    description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Bottom Sheet – Modals React Component",
    description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Mobile Bottom Sheet",
  "description": "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/mobile-bottom-sheet-card",
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
