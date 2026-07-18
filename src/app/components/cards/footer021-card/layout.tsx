import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Luxury Gold Sweep Serif - Footer React Component",
  description: "Dark Luxury Gold Sweep Serif is a production-ready footer React component featuring Dark luxury — black + gold serif + minimal links + gold sweep (MAISON)....",
  keywords: ["Dark Luxury Gold Sweep Serif","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer021" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer021",
    title: "Dark Luxury Gold Sweep Serif - Footer React Component",
    description: "Dark Luxury Gold Sweep Serif is a production-ready footer React component featuring Dark luxury — black + gold serif + minimal links + gold sweep (MAISON)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dark Luxury Gold Sweep Serif - Footer React Component",
    description: "Dark Luxury Gold Sweep Serif is a production-ready footer React component featuring Dark luxury — black + gold serif + minimal links + gold sweep (MAISON)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Luxury Gold Sweep Serif",
  "description": "Dark Luxury Gold Sweep Serif is a production-ready footer React component featuring Dark luxury — black + gold serif + minimal links + gold sweep (MAISON)....",
  "url": "https://ui.mtverse.dev/components/footers/footer021",
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
