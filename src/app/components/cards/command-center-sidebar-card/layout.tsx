import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Center Sidebar – Sidebar React Component",
  description: "Command Center Sidebar is a production-ready sidebar React component featuring DevOps terminal style · monospace · status indicators · CPU sparkline · dark…",
  keywords: ["Command Center Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/command-center-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/command-center-sidebar-card",
    title: "Command Center Sidebar – Sidebar React Component",
    description: "Command Center Sidebar is a production-ready sidebar React component featuring DevOps terminal style · monospace · status indicators · CPU sparkline · dark…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Command Center Sidebar – Sidebar React Component",
    description: "Command Center Sidebar is a production-ready sidebar React component featuring DevOps terminal style · monospace · status indicators · CPU sparkline · dark…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Command Center Sidebar",
  "description": "Command Center Sidebar is a production-ready sidebar React component featuring DevOps terminal style · monospace · status indicators · CPU sparkline · dark…",
  "url": "https://www.mtverse.dev/components/cards/command-center-sidebar-card",
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
