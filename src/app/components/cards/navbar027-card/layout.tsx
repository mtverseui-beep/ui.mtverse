import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Bottom Tab FAB - Navbar React Component",
  description: "Mobile Bottom Tab FAB is a production-ready navbar React component featuring Mobile first app — bottom tab bar + center FAB + active pill indicator...",
  keywords: ["Mobile Bottom Tab FAB","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar027" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar027",
    title: "Mobile Bottom Tab FAB - Navbar React Component",
    description: "Mobile Bottom Tab FAB is a production-ready navbar React component featuring Mobile first app — bottom tab bar + center FAB + active pill indicator...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Mobile Bottom Tab FAB - Navbar React Component",
    description: "Mobile Bottom Tab FAB is a production-ready navbar React component featuring Mobile first app — bottom tab bar + center FAB + active pill indicator...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Mobile Bottom Tab FAB",
  "description": "Mobile Bottom Tab FAB is a production-ready navbar React component featuring Mobile first app — bottom tab bar + center FAB + active pill indicator...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar027",
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
