import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Neural Mesh Glass Cards - Footer React Component",
  description: "AI Neural Mesh Glass Cards is a production-ready footer React component featuring Full CTA email section + bg image + blur + minimal footer (Agentic). Copy,...",
  keywords: ["AI Neural Mesh Glass Cards","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer003" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer003",
    title: "AI Neural Mesh Glass Cards - Footer React Component",
    description: "AI Neural Mesh Glass Cards is a production-ready footer React component featuring Full CTA email section + bg image + blur + minimal footer (Agentic). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Neural Mesh Glass Cards - Footer React Component",
    description: "AI Neural Mesh Glass Cards is a production-ready footer React component featuring Full CTA email section + bg image + blur + minimal footer (Agentic). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Neural Mesh Glass Cards",
  "description": "AI Neural Mesh Glass Cards is a production-ready footer React component featuring Full CTA email section + bg image + blur + minimal footer (Agentic). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer003",
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
