import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Mesh Gradient Tilt Hover – Pricing React Component",
  description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt).…",
  keywords: ["Glass Mesh Gradient Tilt Hover","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing009-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing009-card",
    title: "Glass Mesh Gradient Tilt Hover – Pricing React Component",
    description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass Mesh Gradient Tilt Hover – Pricing React Component",
    description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Glass Mesh Gradient Tilt Hover",
  "description": "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt).…",
  "url": "https://www.mtverse.dev/components/cards/pricing009-card",
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
