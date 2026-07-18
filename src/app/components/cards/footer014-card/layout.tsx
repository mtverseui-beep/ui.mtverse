import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centered Concentric Rings Brand - Footer React Component",
  description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether)....",
  keywords: ["Centered Concentric Rings Brand","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer014" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer014",
    title: "Centered Concentric Rings Brand - Footer React Component",
    description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Centered Concentric Rings Brand - Footer React Component",
    description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Centered Concentric Rings Brand",
  "description": "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether)....",
  "url": "https://ui.mtverse.dev/components/footers/footer014",
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
