import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberpunk Neon Grid Glitch Price - Pricing React Component",
  description: "Cyberpunk Neon Grid Glitch Price is a production-ready pricing React component featuring Cyberpunk neon + grid floor + scanlines + glitch RGB-split price...",
  keywords: ["Cyberpunk Neon Grid Glitch Price","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing019" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing019",
    title: "Cyberpunk Neon Grid Glitch Price - Pricing React Component",
    description: "Cyberpunk Neon Grid Glitch Price is a production-ready pricing React component featuring Cyberpunk neon + grid floor + scanlines + glitch RGB-split price...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Cyberpunk Neon Grid Glitch Price - Pricing React Component",
    description: "Cyberpunk Neon Grid Glitch Price is a production-ready pricing React component featuring Cyberpunk neon + grid floor + scanlines + glitch RGB-split price...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyberpunk Neon Grid Glitch Price",
  "description": "Cyberpunk Neon Grid Glitch Price is a production-ready pricing React component featuring Cyberpunk neon + grid floor + scanlines + glitch RGB-split price...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing019",
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
