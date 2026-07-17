import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation Sidebar Edit GitHub – Footer React Component",
  description: "Documentation Sidebar Edit GitHub is a production-ready footer React component featuring Documentation — edit-on-GitHub link + 3 link cols + version…",
  keywords: ["Documentation Sidebar Edit GitHub","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer012-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer012-card",
    title: "Documentation Sidebar Edit GitHub – Footer React Component",
    description: "Documentation Sidebar Edit GitHub is a production-ready footer React component featuring Documentation — edit-on-GitHub link + 3 link cols + version…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation Sidebar Edit GitHub – Footer React Component",
    description: "Documentation Sidebar Edit GitHub is a production-ready footer React component featuring Documentation — edit-on-GitHub link + 3 link cols + version…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Documentation Sidebar Edit GitHub",
  "description": "Documentation Sidebar Edit GitHub is a production-ready footer React component featuring Documentation — edit-on-GitHub link + 3 link cols + version…",
  "url": "https://www.mtverse.dev/components/cards/footer012-card",
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
