import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade Plan Modal - Modals React Component",
  description: "Upgrade Plan Modal is a production-ready modals React component featuring 3-tier pricing with monthly/yearly toggle + popular badge + feature lists. Copy,...",
  keywords: ["Upgrade Plan Modal","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/upgrade-plan-modal" },
  openGraph: {
    type: "website",
    url: "/components/modals/upgrade-plan-modal",
    title: "Upgrade Plan Modal - Modals React Component",
    description: "Upgrade Plan Modal is a production-ready modals React component featuring 3-tier pricing with monthly/yearly toggle + popular badge + feature lists. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Upgrade Plan Modal - Modals React Component",
    description: "Upgrade Plan Modal is a production-ready modals React component featuring 3-tier pricing with monthly/yearly toggle + popular badge + feature lists. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Upgrade Plan Modal",
  "description": "Upgrade Plan Modal is a production-ready modals React component featuring 3-tier pricing with monthly/yearly toggle + popular badge + feature lists. Copy,...",
  "url": "https://ui.mtverse.dev/components/modals/upgrade-plan-modal",
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
