import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Glass Floating Orbs Glow - Pricing React Component",
  description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow...",
  keywords: ["Aurora Glass Floating Orbs Glow","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing006" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing006",
    title: "Aurora Glass Floating Orbs Glow - Pricing React Component",
    description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Aurora Glass Floating Orbs Glow - Pricing React Component",
    description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Glass Floating Orbs Glow",
  "description": "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing006",
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
