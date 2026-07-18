import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Dialog - Modals React Component",
  description: "Share Dialog is a production-ready modals React component featuring Social share buttons + access levels + copy link with feedback. Copy, customize, and use...",
  keywords: ["Share Dialog","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/share-dialog" },
  openGraph: {
    type: "website",
    url: "/components/modals/share-dialog",
    title: "Share Dialog - Modals React Component",
    description: "Share Dialog is a production-ready modals React component featuring Social share buttons + access levels + copy link with feedback. Copy, customize, and use...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Share Dialog - Modals React Component",
    description: "Share Dialog is a production-ready modals React component featuring Social share buttons + access levels + copy link with feedback. Copy, customize, and use...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Share Dialog",
  "description": "Share Dialog is a production-ready modals React component featuring Social share buttons + access levels + copy link with feedback. Copy, customize, and use...",
  "url": "https://ui.mtverse.dev/components/modals/share-dialog",
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
