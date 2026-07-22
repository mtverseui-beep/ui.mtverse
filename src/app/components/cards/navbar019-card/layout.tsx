import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Palette Takeover - Navbar React Component",
  description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav...",
  keywords: ["Command Palette Takeover","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar019" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar019",
    title: "Command Palette Takeover - Navbar React Component",
    description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Command Palette Takeover - Navbar React Component",
    description: "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Command Palette Takeover",
  "description": "Command Palette Takeover is a production-ready navbar React component featuring Command palette — minimal bar + ⌘K overlay + grouped results + keyboard nav...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar019",
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
