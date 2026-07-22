import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rail Dock Sidebar - Sidebar React Component",
  description: "Rail Dock Sidebar is a production-ready sidebar React component featuring macOS dock · hover and focus magnification · rail-relative tooltips · active bar ·...",
  keywords: ["Rail Dock Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/rail-dock-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/rail-dock-sidebar",
    title: "Rail Dock Sidebar - Sidebar React Component",
    description: "Rail Dock Sidebar is a production-ready sidebar React component featuring macOS dock · hover and focus magnification · rail-relative tooltips · active bar ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Rail Dock Sidebar - Sidebar React Component",
    description: "Rail Dock Sidebar is a production-ready sidebar React component featuring macOS dock · hover and focus magnification · rail-relative tooltips · active bar ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Rail Dock Sidebar",
  "description": "Rail Dock Sidebar is a production-ready sidebar React component featuring macOS dock · hover and focus magnification · rail-relative tooltips · active bar ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/rail-dock-sidebar",
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
