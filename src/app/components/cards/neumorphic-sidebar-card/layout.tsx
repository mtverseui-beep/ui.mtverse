import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Sidebar – Sidebar React Component",
  description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised…",
  keywords: ["Neumorphic Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/neumorphic-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/neumorphic-sidebar-card",
    title: "Neumorphic Sidebar – Sidebar React Component",
    description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neumorphic Sidebar – Sidebar React Component",
    description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Sidebar",
  "description": "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised…",
  "url": "https://www.mtverse.dev/components/cards/neumorphic-sidebar-card",
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
