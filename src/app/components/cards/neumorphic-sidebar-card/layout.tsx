import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Sidebar - Sidebar React Component",
  description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised...",
  keywords: ["Neumorphic Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/neumorphic-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/neumorphic-sidebar",
    title: "Neumorphic Sidebar - Sidebar React Component",
    description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Neumorphic Sidebar - Sidebar React Component",
    description: "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Sidebar",
  "description": "Neumorphic Sidebar is a production-ready sidebar React component featuring Soft 3D extruded UI · inset/outset dual shadows · pressed active states · raised...",
  "url": "https://ui.mtverse.dev/components/sidebars/neumorphic-sidebar",
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
