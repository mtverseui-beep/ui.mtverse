import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editable 3D Profile - Profile React Component",
  description: "Editable 3D Profile is a production-ready profile React component featuring Drag-to-rotate + edit flip. Copy, customize, and use it in Next.js projects.",
  keywords: ["Editable 3D Profile","Profile component","Profile React component","Profile Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/editable-3d-profile" },
  openGraph: {
    type: "website",
    url: "/components/cards/editable-3d-profile",
    title: "Editable 3D Profile - Profile React Component",
    description: "Editable 3D Profile is a production-ready profile React component featuring Drag-to-rotate + edit flip. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Editable 3D Profile - Profile React Component",
    description: "Editable 3D Profile is a production-ready profile React component featuring Drag-to-rotate + edit flip. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Editable 3D Profile",
  "description": "Editable 3D Profile is a production-ready profile React component featuring Drag-to-rotate + edit flip. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/editable-3d-profile",
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
