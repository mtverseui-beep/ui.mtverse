import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium CTA Buttons – Buttons React Component",
  description: "Premium CTA Buttons is a production-ready buttons React component featuring Gradient border + glow pulse + 3D press + text reveal. Copy, customize, and use…",
  keywords: ["Premium CTA Buttons","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/premium-cta-buttons-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/premium-cta-buttons-card",
    title: "Premium CTA Buttons – Buttons React Component",
    description: "Premium CTA Buttons is a production-ready buttons React component featuring Gradient border + glow pulse + 3D press + text reveal. Copy, customize, and use…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium CTA Buttons – Buttons React Component",
    description: "Premium CTA Buttons is a production-ready buttons React component featuring Gradient border + glow pulse + 3D press + text reveal. Copy, customize, and use…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Premium CTA Buttons",
  "description": "Premium CTA Buttons is a production-ready buttons React component featuring Gradient border + glow pulse + 3D press + text reveal. Copy, customize, and use…",
  "url": "https://www.mtverse.dev/components/cards/premium-cta-buttons-card",
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
