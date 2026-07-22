import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insight Bento Dashboard - Charts React Component",
  description: "Insight Bento Dashboard is a production-ready charts React component featuring 35 animated bento cards · bar/line/area/donut/radial/wave/contribution ·...",
  keywords: ["Insight Bento Dashboard","Charts component","Charts React component","Charts Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/charts/insight-bento-dashboard" },
  openGraph: {
    type: "website",
    url: "/components/charts/insight-bento-dashboard",
    title: "Insight Bento Dashboard - Charts React Component",
    description: "Insight Bento Dashboard is a production-ready charts React component featuring 35 animated bento cards · bar/line/area/donut/radial/wave/contribution ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Insight Bento Dashboard - Charts React Component",
    description: "Insight Bento Dashboard is a production-ready charts React component featuring 35 animated bento cards · bar/line/area/donut/radial/wave/contribution ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Insight Bento Dashboard",
  "description": "Insight Bento Dashboard is a production-ready charts React component featuring 35 animated bento cards · bar/line/area/donut/radial/wave/contribution ·...",
  "url": "https://ui.mtverse.dev/components/charts/insight-bento-dashboard",
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
