import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arctic Frost Sidebar – Sidebar React Component",
  description: "Arctic Frost Sidebar is a production-ready sidebar React component featuring Icy frost blue · snow texture · glassmorphism · rounded organic · winter/cloud…",
  keywords: ["Arctic Frost Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/arctic-frost-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/arctic-frost-sidebar-card",
    title: "Arctic Frost Sidebar – Sidebar React Component",
    description: "Arctic Frost Sidebar is a production-ready sidebar React component featuring Icy frost blue · snow texture · glassmorphism · rounded organic · winter/cloud…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arctic Frost Sidebar – Sidebar React Component",
    description: "Arctic Frost Sidebar is a production-ready sidebar React component featuring Icy frost blue · snow texture · glassmorphism · rounded organic · winter/cloud…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Arctic Frost Sidebar",
  "description": "Arctic Frost Sidebar is a production-ready sidebar React component featuring Icy frost blue · snow texture · glassmorphism · rounded organic · winter/cloud…",
  "url": "https://www.mtverse.dev/components/cards/arctic-frost-sidebar-card",
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
