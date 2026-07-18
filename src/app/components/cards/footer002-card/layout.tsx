import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Magnetic Typewriter - Footer React Component",
  description: "Portfolio Magnetic Typewriter is a production-ready footer React component featuring Brand + pages + newsletter + social glow (AI Portfolio). Copy,...",
  keywords: ["Portfolio Magnetic Typewriter","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer002" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer002",
    title: "Portfolio Magnetic Typewriter - Footer React Component",
    description: "Portfolio Magnetic Typewriter is a production-ready footer React component featuring Brand + pages + newsletter + social glow (AI Portfolio). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Portfolio Magnetic Typewriter - Footer React Component",
    description: "Portfolio Magnetic Typewriter is a production-ready footer React component featuring Brand + pages + newsletter + social glow (AI Portfolio). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Portfolio Magnetic Typewriter",
  "description": "Portfolio Magnetic Typewriter is a production-ready footer React component featuring Brand + pages + newsletter + social glow (AI Portfolio). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer002",
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
