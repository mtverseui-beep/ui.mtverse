import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Palette Takeover – Navbar React Component",
  description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav…",
  keywords: ["Command Palette Takeover","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar019-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar019-card",
    title: "Command Palette Takeover – Navbar React Component",
    description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Command Palette Takeover – Navbar React Component",
    description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Command Palette Takeover",
  "description": "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav…",
  "url": "https://www.mtverse.dev/components/cards/navbar019-card",
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
