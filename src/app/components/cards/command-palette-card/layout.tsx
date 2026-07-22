import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Palette - Modals React Component",
  description: "Command Palette is a production-ready modals React component featuring ⌘K fuzzy search + keyboard nav + grouped results + arrow keys. Copy, customize, and...",
  keywords: ["Command Palette","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/command-palette" },
  openGraph: {
    type: "website",
    url: "/components/modals/command-palette",
    title: "Command Palette - Modals React Component",
    description: "Command Palette is a production-ready modals React component featuring ⌘K fuzzy search + keyboard nav + grouped results + arrow keys. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Command Palette - Modals React Component",
    description: "Command Palette is a production-ready modals React component featuring ⌘K fuzzy search + keyboard nav + grouped results + arrow keys. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Command Palette",
  "description": "Command Palette is a production-ready modals React component featuring ⌘K fuzzy search + keyboard nav + grouped results + arrow keys. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/modals/command-palette",
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
