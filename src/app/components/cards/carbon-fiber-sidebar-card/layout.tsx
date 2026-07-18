import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Fiber Sidebar - Sidebar React Component",
  description: "Carbon Fiber Sidebar is a production-ready sidebar React component featuring Carbon weave texture · industrial orange · telemetry gauge ·...",
  keywords: ["Carbon Fiber Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/carbon-fiber-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/carbon-fiber-sidebar",
    title: "Carbon Fiber Sidebar - Sidebar React Component",
    description: "Carbon Fiber Sidebar is a production-ready sidebar React component featuring Carbon weave texture · industrial orange · telemetry gauge ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Carbon Fiber Sidebar - Sidebar React Component",
    description: "Carbon Fiber Sidebar is a production-ready sidebar React component featuring Carbon weave texture · industrial orange · telemetry gauge ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Carbon Fiber Sidebar",
  "description": "Carbon Fiber Sidebar is a production-ready sidebar React component featuring Carbon weave texture · industrial orange · telemetry gauge ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/carbon-fiber-sidebar",
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
