import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Blueprint - Backgrounds React Component",
  description: "Developer Blueprint is a production-ready backgrounds React component featuring Technical blueprint lines · API and SDK hero system · decorative-only layer....",
  keywords: ["Developer Blueprint","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/floating-code-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/floating-code-bg",
    title: "Developer Blueprint - Backgrounds React Component",
    description: "Developer Blueprint is a production-ready backgrounds React component featuring Technical blueprint lines · API and SDK hero system · decorative-only layer....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Developer Blueprint - Backgrounds React Component",
    description: "Developer Blueprint is a production-ready backgrounds React component featuring Technical blueprint lines · API and SDK hero system · decorative-only layer....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Developer Blueprint",
  "description": "Developer Blueprint is a production-ready backgrounds React component featuring Technical blueprint lines · API and SDK hero system · decorative-only layer....",
  "url": "https://ui.mtverse.dev/components/backgrounds/floating-code-bg",
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
