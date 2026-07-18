import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midnight Velvet Sidebar - Sidebar React Component",
  description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·...",
  keywords: ["Midnight Velvet Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/midnight-velvet-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/midnight-velvet-sidebar",
    title: "Midnight Velvet Sidebar - Sidebar React Component",
    description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Midnight Velvet Sidebar - Sidebar React Component",
    description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Midnight Velvet Sidebar",
  "description": "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/midnight-velvet-sidebar",
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
