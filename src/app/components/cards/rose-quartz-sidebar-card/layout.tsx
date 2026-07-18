import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rose Quartz Sidebar - Sidebar React Component",
  description: "Rose Quartz Sidebar is a production-ready sidebar React component featuring Soft rose pink · Georgia serif · premium boutique · gem accents · beauty/fashion...",
  keywords: ["Rose Quartz Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/rose-quartz-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/rose-quartz-sidebar",
    title: "Rose Quartz Sidebar - Sidebar React Component",
    description: "Rose Quartz Sidebar is a production-ready sidebar React component featuring Soft rose pink · Georgia serif · premium boutique · gem accents · beauty/fashion...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Rose Quartz Sidebar - Sidebar React Component",
    description: "Rose Quartz Sidebar is a production-ready sidebar React component featuring Soft rose pink · Georgia serif · premium boutique · gem accents · beauty/fashion...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Rose Quartz Sidebar",
  "description": "Rose Quartz Sidebar is a production-ready sidebar React component featuring Soft rose pink · Georgia serif · premium boutique · gem accents · beauty/fashion...",
  "url": "https://ui.mtverse.dev/components/sidebars/rose-quartz-sidebar",
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
