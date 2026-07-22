import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Glow Tilt Cards - Footer React Component",
  description: "Aurora Glow Tilt Cards is a production-ready footer React component featuring Dark gradient + pink blur + 4 columns + social hover scale (Glow). Copy,...",
  keywords: ["Aurora Glow Tilt Cards","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer004" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer004",
    title: "Aurora Glow Tilt Cards - Footer React Component",
    description: "Aurora Glow Tilt Cards is a production-ready footer React component featuring Dark gradient + pink blur + 4 columns + social hover scale (Glow). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Aurora Glow Tilt Cards - Footer React Component",
    description: "Aurora Glow Tilt Cards is a production-ready footer React component featuring Dark gradient + pink blur + 4 columns + social hover scale (Glow). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Glow Tilt Cards",
  "description": "Aurora Glow Tilt Cards is a production-ready footer React component featuring Dark gradient + pink blur + 4 columns + social hover scale (Glow). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer004",
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
