import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbital Halo - Backgrounds React Component",
  description: "Orbital Halo is a production-ready backgrounds React component featuring Measured orbital rings · fintech focal system · replaces particle tornado. Copy,...",
  keywords: ["Orbital Halo","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/particle-vortex-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/particle-vortex-bg",
    title: "Orbital Halo - Backgrounds React Component",
    description: "Orbital Halo is a production-ready backgrounds React component featuring Measured orbital rings · fintech focal system · replaces particle tornado. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Orbital Halo - Backgrounds React Component",
    description: "Orbital Halo is a production-ready backgrounds React component featuring Measured orbital rings · fintech focal system · replaces particle tornado. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Orbital Halo",
  "description": "Orbital Halo is a production-ready backgrounds React component featuring Measured orbital rings · fintech focal system · replaces particle tornado. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/particle-vortex-bg",
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
