import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertex Monthly Annual Toggle - Pricing React Component",
  description: "Vertex Monthly Annual Toggle is a production-ready pricing React component featuring Monthly/annual toggle + 3-tier grid + popular badge (Vertex). Copy,...",
  keywords: ["Vertex Monthly Annual Toggle","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing001" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing001",
    title: "Vertex Monthly Annual Toggle - Pricing React Component",
    description: "Vertex Monthly Annual Toggle is a production-ready pricing React component featuring Monthly/annual toggle + 3-tier grid + popular badge (Vertex). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Vertex Monthly Annual Toggle - Pricing React Component",
    description: "Vertex Monthly Annual Toggle is a production-ready pricing React component featuring Monthly/annual toggle + 3-tier grid + popular badge (Vertex). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Vertex Monthly Annual Toggle",
  "description": "Vertex Monthly Annual Toggle is a production-ready pricing React component featuring Monthly/annual toggle + 3-tier grid + popular badge (Vertex). Copy,...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing001",
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
