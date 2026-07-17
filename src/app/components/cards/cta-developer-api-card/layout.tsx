import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer API CTA – CTA React Component",
  description: "Developer API CTA is a production-ready cta React component featuring Code block + API endpoint + get API key + dark. Copy, customize, and use it in Next.js…",
  keywords: ["Developer API CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-developer-api-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-developer-api-card",
    title: "Developer API CTA – CTA React Component",
    description: "Developer API CTA is a production-ready cta React component featuring Code block + API endpoint + get API key + dark. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer API CTA – CTA React Component",
    description: "Developer API CTA is a production-ready cta React component featuring Code block + API endpoint + get API key + dark. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Developer API CTA",
  "description": "Developer API CTA is a production-ready cta React component featuring Code block + API endpoint + get API key + dark. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/cta-developer-api-card",
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
