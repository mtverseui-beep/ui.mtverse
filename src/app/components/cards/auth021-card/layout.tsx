import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Mesh Stats Auth - Auth React Component",
  description: "Gradient Mesh Stats Auth is a production-ready auth React component featuring Orange/rose gradient mesh + glass card + social proof stats...",
  keywords: ["Gradient Mesh Stats Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth021" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth021",
    title: "Gradient Mesh Stats Auth - Auth React Component",
    description: "Gradient Mesh Stats Auth is a production-ready auth React component featuring Orange/rose gradient mesh + glass card + social proof stats...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Gradient Mesh Stats Auth - Auth React Component",
    description: "Gradient Mesh Stats Auth is a production-ready auth React component featuring Orange/rose gradient mesh + glass card + social proof stats...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Gradient Mesh Stats Auth",
  "description": "Gradient Mesh Stats Auth is a production-ready auth React component featuring Orange/rose gradient mesh + glass card + social proof stats...",
  "url": "https://ui.mtverse.dev/components/auth/auth021",
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
