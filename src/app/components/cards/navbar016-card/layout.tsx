import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Agency Numbered Links - Navbar React Component",
  description: "Creative Agency Numbered Links is a production-ready navbar React component featuring Creative agency — asymmetric wordmark + numbered links + fullscreen...",
  keywords: ["Creative Agency Numbered Links","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar016" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar016",
    title: "Creative Agency Numbered Links - Navbar React Component",
    description: "Creative Agency Numbered Links is a production-ready navbar React component featuring Creative agency — asymmetric wordmark + numbered links + fullscreen...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Creative Agency Numbered Links - Navbar React Component",
    description: "Creative Agency Numbered Links is a production-ready navbar React component featuring Creative agency — asymmetric wordmark + numbered links + fullscreen...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Creative Agency Numbered Links",
  "description": "Creative Agency Numbered Links is a production-ready navbar React component featuring Creative agency — asymmetric wordmark + numbered links + fullscreen...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar016",
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
