import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Feature Showcase - Features React Component",
  description: "Video Feature Showcase is a production-ready features React component featuring Video player mockup + play button + feature bullets + dark theme. Copy,...",
  keywords: ["Video Feature Showcase","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-video" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-video",
    title: "Video Feature Showcase - Features React Component",
    description: "Video Feature Showcase is a production-ready features React component featuring Video player mockup + play button + feature bullets + dark theme. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Video Feature Showcase - Features React Component",
    description: "Video Feature Showcase is a production-ready features React component featuring Video player mockup + play button + feature bullets + dark theme. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Video Feature Showcase",
  "description": "Video Feature Showcase is a production-ready features React component featuring Video player mockup + play button + feature bullets + dark theme. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-video",
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
