import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Mesh Bold Stat Cards – Hero React Component",
  description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other…",
  keywords: ["Gradient Mesh Bold Stat Cards","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero020-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero020-card",
    title: "Gradient Mesh Bold Stat Cards – Hero React Component",
    description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Mesh Bold Stat Cards – Hero React Component",
    description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Gradient Mesh Bold Stat Cards",
  "description": "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other…",
  "url": "https://www.mtverse.dev/components/cards/hero020-card",
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
