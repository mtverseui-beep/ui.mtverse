import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Glass Floating Orbs Glow – Pricing React Component",
  description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow…",
  keywords: ["Aurora Glass Floating Orbs Glow","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing006-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing006-card",
    title: "Aurora Glass Floating Orbs Glow – Pricing React Component",
    description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Glass Floating Orbs Glow – Pricing React Component",
    description: "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Glass Floating Orbs Glow",
  "description": "Aurora Glass Floating Orbs Glow is a production-ready pricing React component featuring Aurora glassmorphism + floating gradient orbs + mouse-tracking glow…",
  "url": "https://www.mtverse.dev/components/cards/pricing006-card",
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
