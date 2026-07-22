import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist CTA - CTA React Component",
  description: "Waitlist CTA is a production-ready cta React component featuring Limited spots + email input + countdown. Copy, customize, and use it in Next.js projects.",
  keywords: ["Waitlist CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-waitlist" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-waitlist",
    title: "Waitlist CTA - CTA React Component",
    description: "Waitlist CTA is a production-ready cta React component featuring Limited spots + email input + countdown. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Waitlist CTA - CTA React Component",
    description: "Waitlist CTA is a production-ready cta React component featuring Limited spots + email input + countdown. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Waitlist CTA",
  "description": "Waitlist CTA is a production-ready cta React component featuring Limited spots + email input + countdown. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cta/cta-waitlist",
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
