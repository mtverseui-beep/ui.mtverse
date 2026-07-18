import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Split-Panel Auth - Auth React Component",
  description: "Photo Split-Panel Auth is a production-ready auth React component featuring Unsplash photo split-panel + testimonial overlay + clean white form right. Copy,...",
  keywords: ["Photo Split-Panel Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth005" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth005",
    title: "Photo Split-Panel Auth - Auth React Component",
    description: "Photo Split-Panel Auth is a production-ready auth React component featuring Unsplash photo split-panel + testimonial overlay + clean white form right. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Photo Split-Panel Auth - Auth React Component",
    description: "Photo Split-Panel Auth is a production-ready auth React component featuring Unsplash photo split-panel + testimonial overlay + clean white form right. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Photo Split-Panel Auth",
  "description": "Photo Split-Panel Auth is a production-ready auth React component featuring Unsplash photo split-panel + testimonial overlay + clean white form right. Copy,...",
  "url": "https://ui.mtverse.dev/components/auth/auth005",
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
