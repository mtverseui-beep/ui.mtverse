import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Lift Gradient Avatar Stars - Testimonials React Component",
  description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow)....",
  keywords: ["Hover Lift Gradient Avatar Stars","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials004" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials004",
    title: "Hover Lift Gradient Avatar Stars - Testimonials React Component",
    description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Hover Lift Gradient Avatar Stars - Testimonials React Component",
    description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Hover Lift Gradient Avatar Stars",
  "description": "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow)....",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials004",
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
