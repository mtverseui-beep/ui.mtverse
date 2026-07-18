import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Features - Features React Component",
  description: "Developer Features is a production-ready features React component featuring Terminal theme + code blocks + syntax highlight + CLI feature cards. Copy,...",
  keywords: ["Developer Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-developer" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-developer",
    title: "Developer Features - Features React Component",
    description: "Developer Features is a production-ready features React component featuring Terminal theme + code blocks + syntax highlight + CLI feature cards. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Developer Features - Features React Component",
    description: "Developer Features is a production-ready features React component featuring Terminal theme + code blocks + syntax highlight + CLI feature cards. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Developer Features",
  "description": "Developer Features is a production-ready features React component featuring Terminal theme + code blocks + syntax highlight + CLI feature cards. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-developer",
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
