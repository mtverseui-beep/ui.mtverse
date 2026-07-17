import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Style Feature Matrix Gradient – Pricing React Component",
  description: "Apple Style Feature Matrix Gradient is a production-ready pricing React component featuring Apple-style clean + tiered feature matrix + gradient price text…",
  keywords: ["Apple Style Feature Matrix Gradient","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing020-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing020-card",
    title: "Apple Style Feature Matrix Gradient – Pricing React Component",
    description: "Apple Style Feature Matrix Gradient is a production-ready pricing React component featuring Apple-style clean + tiered feature matrix + gradient price text…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Style Feature Matrix Gradient – Pricing React Component",
    description: "Apple Style Feature Matrix Gradient is a production-ready pricing React component featuring Apple-style clean + tiered feature matrix + gradient price text…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple Style Feature Matrix Gradient",
  "description": "Apple Style Feature Matrix Gradient is a production-ready pricing React component featuring Apple-style clean + tiered feature matrix + gradient price text…",
  "url": "https://www.mtverse.dev/components/cards/pricing020-card",
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
