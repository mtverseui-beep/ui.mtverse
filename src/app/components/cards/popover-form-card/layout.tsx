import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popover Form - Modals React Component",
  description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use...",
  keywords: ["Popover Form","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/popover-form" },
  openGraph: {
    type: "website",
    url: "/components/modals/popover-form",
    title: "Popover Form - Modals React Component",
    description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Popover Form - Modals React Component",
    description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Popover Form",
  "description": "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use...",
  "url": "https://ui.mtverse.dev/components/modals/popover-form",
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
