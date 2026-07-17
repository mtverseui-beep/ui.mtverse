import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Terminal ASCII CRT – Footer React Component",
  description: "Developer Terminal ASCII CRT is a production-ready footer React component featuring Developer tools — dark terminal aesthetic + GitHub stars + status…",
  keywords: ["Developer Terminal ASCII CRT","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer009-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer009-card",
    title: "Developer Terminal ASCII CRT – Footer React Component",
    description: "Developer Terminal ASCII CRT is a production-ready footer React component featuring Developer tools — dark terminal aesthetic + GitHub stars + status…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Terminal ASCII CRT – Footer React Component",
    description: "Developer Terminal ASCII CRT is a production-ready footer React component featuring Developer tools — dark terminal aesthetic + GitHub stars + status…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Developer Terminal ASCII CRT",
  "description": "Developer Terminal ASCII CRT is a production-ready footer React component featuring Developer tools — dark terminal aesthetic + GitHub stars + status…",
  "url": "https://www.mtverse.dev/components/cards/footer009-card",
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
