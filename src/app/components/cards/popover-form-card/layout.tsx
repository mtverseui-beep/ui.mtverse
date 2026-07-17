import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popover Form – Modals React Component",
  description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use…",
  keywords: ["Popover Form","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/popover-form-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/popover-form-card",
    title: "Popover Form – Modals React Component",
    description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Popover Form – Modals React Component",
    description: "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Popover Form",
  "description": "Popover Form is a production-ready modals React component featuring Inline popover form with arrow pointer + outside click close. Copy, customize, and use…",
  "url": "https://www.mtverse.dev/components/cards/popover-form-card",
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
