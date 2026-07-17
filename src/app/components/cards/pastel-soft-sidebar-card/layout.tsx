import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastel Soft Sidebar – Sidebar React Component",
  description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles…",
  keywords: ["Pastel Soft Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pastel-soft-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pastel-soft-sidebar-card",
    title: "Pastel Soft Sidebar – Sidebar React Component",
    description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastel Soft Sidebar – Sidebar React Component",
    description: "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pastel Soft Sidebar",
  "description": "Pastel Soft Sidebar is a production-ready sidebar React component featuring Soft pastel UI · rounded-3xl · gradient pills per section · colored icon circles…",
  "url": "https://www.mtverse.dev/components/cards/pastel-soft-sidebar-card",
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
