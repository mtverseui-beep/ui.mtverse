import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Step Modal - Modals React Component",
  description: "Multi-Step Modal is a production-ready modals React component featuring Wizard form with step indicator + back/next + slide transitions. Copy, customize,...",
  keywords: ["Multi-Step Modal","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/multi-step-modal" },
  openGraph: {
    type: "website",
    url: "/components/modals/multi-step-modal",
    title: "Multi-Step Modal - Modals React Component",
    description: "Multi-Step Modal is a production-ready modals React component featuring Wizard form with step indicator + back/next + slide transitions. Copy, customize,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Multi-Step Modal - Modals React Component",
    description: "Multi-Step Modal is a production-ready modals React component featuring Wizard form with step indicator + back/next + slide transitions. Copy, customize,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Multi-Step Modal",
  "description": "Multi-Step Modal is a production-ready modals React component featuring Wizard form with step indicator + back/next + slide transitions. Copy, customize,...",
  "url": "https://ui.mtverse.dev/components/modals/multi-step-modal",
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
