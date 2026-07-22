import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sage Forest Sidebar - Sidebar React Component",
  description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·...",
  keywords: ["Sage Forest Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/sage-forest-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/sage-forest-sidebar",
    title: "Sage Forest Sidebar - Sidebar React Component",
    description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Sage Forest Sidebar - Sidebar React Component",
    description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sage Forest Sidebar",
  "description": "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/sage-forest-sidebar",
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
