import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dot Grid Minimal Auth - Auth React Component",
  description: "Dot Grid Minimal Auth is a production-ready auth React component featuring Minimal dot grid + ultra-narrow centered form + emerald accent + clean focused....",
  keywords: ["Dot Grid Minimal Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth020" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth020",
    title: "Dot Grid Minimal Auth - Auth React Component",
    description: "Dot Grid Minimal Auth is a production-ready auth React component featuring Minimal dot grid + ultra-narrow centered form + emerald accent + clean focused....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dot Grid Minimal Auth - Auth React Component",
    description: "Dot Grid Minimal Auth is a production-ready auth React component featuring Minimal dot grid + ultra-narrow centered form + emerald accent + clean focused....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dot Grid Minimal Auth",
  "description": "Dot Grid Minimal Auth is a production-ready auth React component featuring Minimal dot grid + ultra-narrow centered form + emerald accent + clean focused....",
  "url": "https://ui.mtverse.dev/components/auth/auth020",
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
