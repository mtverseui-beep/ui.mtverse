import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Dialog – Modals React Component",
  description: "Onboarding Dialog is a production-ready modals React component featuring Multi-step welcome flow with progress dots + skip + finish. Copy, customize, and…",
  keywords: ["Onboarding Dialog","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/onboarding-dialog-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/onboarding-dialog-card",
    title: "Onboarding Dialog – Modals React Component",
    description: "Onboarding Dialog is a production-ready modals React component featuring Multi-step welcome flow with progress dots + skip + finish. Copy, customize, and…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onboarding Dialog – Modals React Component",
    description: "Onboarding Dialog is a production-ready modals React component featuring Multi-step welcome flow with progress dots + skip + finish. Copy, customize, and…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Onboarding Dialog",
  "description": "Onboarding Dialog is a production-ready modals React component featuring Multi-step welcome flow with progress dots + skip + finish. Copy, customize, and…",
  "url": "https://www.mtverse.dev/components/cards/onboarding-dialog-card",
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
