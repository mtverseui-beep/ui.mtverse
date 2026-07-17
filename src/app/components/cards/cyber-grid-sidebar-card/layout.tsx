import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber Grid Sidebar – Sidebar React Component",
  description: "Cyber Grid Sidebar is a production-ready sidebar React component featuring Neon green matrix · monospace · scanline overlay · CRT glow · hacker/terminal…",
  keywords: ["Cyber Grid Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cyber-grid-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cyber-grid-sidebar-card",
    title: "Cyber Grid Sidebar – Sidebar React Component",
    description: "Cyber Grid Sidebar is a production-ready sidebar React component featuring Neon green matrix · monospace · scanline overlay · CRT glow · hacker/terminal…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Grid Sidebar – Sidebar React Component",
    description: "Cyber Grid Sidebar is a production-ready sidebar React component featuring Neon green matrix · monospace · scanline overlay · CRT glow · hacker/terminal…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyber Grid Sidebar",
  "description": "Cyber Grid Sidebar is a production-ready sidebar React component featuring Neon green matrix · monospace · scanline overlay · CRT glow · hacker/terminal…",
  "url": "https://www.mtverse.dev/components/cards/cyber-grid-sidebar-card",
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
