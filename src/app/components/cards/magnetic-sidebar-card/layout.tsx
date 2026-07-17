import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetic Sidebar – Sidebar React Component",
  description: "Magnetic Sidebar is a production-ready sidebar React component featuring Icons pull toward cursor · animated gradient active bg · radial glow · neon icon…",
  keywords: ["Magnetic Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/magnetic-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/magnetic-sidebar-card",
    title: "Magnetic Sidebar – Sidebar React Component",
    description: "Magnetic Sidebar is a production-ready sidebar React component featuring Icons pull toward cursor · animated gradient active bg · radial glow · neon icon…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnetic Sidebar – Sidebar React Component",
    description: "Magnetic Sidebar is a production-ready sidebar React component featuring Icons pull toward cursor · animated gradient active bg · radial glow · neon icon…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Magnetic Sidebar",
  "description": "Magnetic Sidebar is a production-ready sidebar React component featuring Icons pull toward cursor · animated gradient active bg · radial glow · neon icon…",
  "url": "https://www.mtverse.dev/components/cards/magnetic-sidebar-card",
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
