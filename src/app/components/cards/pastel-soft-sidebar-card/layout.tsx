import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastel Soft Sidebar - Sidebar React Component",
  description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles...",
  keywords: ["Pastel Soft Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/pastel-soft-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/pastel-soft-sidebar",
    title: "Pastel Soft Sidebar - Sidebar React Component",
    description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Pastel Soft Sidebar - Sidebar React Component",
    description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pastel Soft Sidebar",
  "description": "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles...",
  "url": "https://ui.mtverse.dev/components/sidebars/pastel-soft-sidebar",
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
