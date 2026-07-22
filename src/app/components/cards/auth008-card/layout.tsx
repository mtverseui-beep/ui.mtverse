import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holographic Iridescent Auth - Auth React Component",
  description: "Holographic Iridescent Auth is a production-ready auth React component featuring Holographic iridescent rotating conic-gradient border + dark glass...",
  keywords: ["Holographic Iridescent Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth008" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth008",
    title: "Holographic Iridescent Auth - Auth React Component",
    description: "Holographic Iridescent Auth is a production-ready auth React component featuring Holographic iridescent rotating conic-gradient border + dark glass...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Holographic Iridescent Auth - Auth React Component",
    description: "Holographic Iridescent Auth is a production-ready auth React component featuring Holographic iridescent rotating conic-gradient border + dark glass...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Holographic Iridescent Auth",
  "description": "Holographic Iridescent Auth is a production-ready auth React component featuring Holographic iridescent rotating conic-gradient border + dark glass...",
  "url": "https://ui.mtverse.dev/components/auth/auth008",
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
