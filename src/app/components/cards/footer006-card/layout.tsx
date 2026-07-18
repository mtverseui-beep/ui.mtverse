import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal SaaS Hairline Pill - Footer React Component",
  description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio)....",
  keywords: ["Minimal SaaS Hairline Pill","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer006" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer006",
    title: "Minimal SaaS Hairline Pill - Footer React Component",
    description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Minimal SaaS Hairline Pill - Footer React Component",
    description: "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Minimal SaaS Hairline Pill",
  "description": "Minimal SaaS Hairline Pill is a production-ready footer React component featuring Minimal SaaS — 2-row ultra-compact + horizontal scroll mobile (Lumio)....",
  "url": "https://ui.mtverse.dev/components/footers/footer006",
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
