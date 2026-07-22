import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Mesh Bold Stat Cards - Hero React Component",
  description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other...",
  keywords: ["Gradient Mesh Bold Stat Cards","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero020" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero020",
    title: "Gradient Mesh Bold Stat Cards - Hero React Component",
    description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Gradient Mesh Bold Stat Cards - Hero React Component",
    description: "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Gradient Mesh Bold Stat Cards",
  "description": "Gradient Mesh Bold Stat Cards is a production-ready hero React component featuring Scroll reveal — 4 pinned full-height sections that slide over each other...",
  "url": "https://ui.mtverse.dev/components/heroes/hero020",
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
