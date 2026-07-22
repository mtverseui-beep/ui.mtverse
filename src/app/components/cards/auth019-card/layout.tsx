import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Screen Image Glass Auth - Auth React Component",
  description: "Full-Screen Image Glass Auth is a production-ready auth React component featuring Full-screen Unsplash tech image bg + dark overlay + centered glass form +...",
  keywords: ["Full-Screen Image Glass Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth019" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth019",
    title: "Full-Screen Image Glass Auth - Auth React Component",
    description: "Full-Screen Image Glass Auth is a production-ready auth React component featuring Full-screen Unsplash tech image bg + dark overlay + centered glass form +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Full-Screen Image Glass Auth - Auth React Component",
    description: "Full-Screen Image Glass Auth is a production-ready auth React component featuring Full-screen Unsplash tech image bg + dark overlay + centered glass form +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Screen Image Glass Auth",
  "description": "Full-Screen Image Glass Auth is a production-ready auth React component featuring Full-screen Unsplash tech image bg + dark overlay + centered glass form +...",
  "url": "https://ui.mtverse.dev/components/auth/auth019",
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
