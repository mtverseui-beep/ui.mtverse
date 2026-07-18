import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Mesh Gradient Tilt Hover - Pricing React Component",
  description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt)....",
  keywords: ["Glass Mesh Gradient Tilt Hover","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing009" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing009",
    title: "Glass Mesh Gradient Tilt Hover - Pricing React Component",
    description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Glass Mesh Gradient Tilt Hover - Pricing React Component",
    description: "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Glass Mesh Gradient Tilt Hover",
  "description": "Glass Mesh Gradient Tilt Hover is a production-ready pricing React component featuring Glass cards on mesh gradient + 3D tilt-on-hover toward cursor (Tilt)....",
  "url": "https://ui.mtverse.dev/components/pricing/pricing009",
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
