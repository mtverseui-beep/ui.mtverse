import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal SaaS Hairline Pill – Footer React Component",
  description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio).…",
  keywords: ["Minimal SaaS Hairline Pill","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer006-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer006-card",
    title: "Minimal SaaS Hairline Pill – Footer React Component",
    description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimal SaaS Hairline Pill – Footer React Component",
    description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Minimal SaaS Hairline Pill",
  "description": "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio).…",
  "url": "https://www.mtverse.dev/components/cards/footer006-card",
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
