import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asymmetric Split Dark Panel - Footer React Component",
  description: "Asymmetric Split Dark Panel is a production-ready footer React component featuring Asymmetric split — dark brand panel + white links panel (Verdant). Copy,...",
  keywords: ["Asymmetric Split Dark Panel","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer015" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer015",
    title: "Asymmetric Split Dark Panel - Footer React Component",
    description: "Asymmetric Split Dark Panel is a production-ready footer React component featuring Asymmetric split — dark brand panel + white links panel (Verdant). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Asymmetric Split Dark Panel - Footer React Component",
    description: "Asymmetric Split Dark Panel is a production-ready footer React component featuring Asymmetric split — dark brand panel + white links panel (Verdant). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Asymmetric Split Dark Panel",
  "description": "Asymmetric Split Dark Panel is a production-ready footer React component featuring Asymmetric split — dark brand panel + white links panel (Verdant). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer015",
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
