import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Lift Gradient Avatar Stars – Testimonials React Component",
  description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow).…",
  keywords: ["Hover Lift Gradient Avatar Stars","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials004-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials004-card",
    title: "Hover Lift Gradient Avatar Stars – Testimonials React Component",
    description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hover Lift Gradient Avatar Stars – Testimonials React Component",
    description: "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Hover Lift Gradient Avatar Stars",
  "description": "Hover Lift Gradient Avatar Stars is a production-ready testimonials React component featuring Hover lift cards + gradient avatars + star ratings (Glow).…",
  "url": "https://www.mtverse.dev/components/cards/testimonials004-card",
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
