import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Earthy Verdant Auth - Auth React Component",
  description: "Warm Earthy Verdant Auth is a production-ready auth React component featuring Warm earthy beige Fraunces serif + paper grain + leaf logo + stem underline...",
  keywords: ["Warm Earthy Verdant Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth012" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth012",
    title: "Warm Earthy Verdant Auth - Auth React Component",
    description: "Warm Earthy Verdant Auth is a production-ready auth React component featuring Warm earthy beige Fraunces serif + paper grain + leaf logo + stem underline...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Warm Earthy Verdant Auth - Auth React Component",
    description: "Warm Earthy Verdant Auth is a production-ready auth React component featuring Warm earthy beige Fraunces serif + paper grain + leaf logo + stem underline...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Earthy Verdant Auth",
  "description": "Warm Earthy Verdant Auth is a production-ready auth React component featuring Warm earthy beige Fraunces serif + paper grain + leaf logo + stem underline...",
  "url": "https://ui.mtverse.dev/components/auth/auth012",
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
