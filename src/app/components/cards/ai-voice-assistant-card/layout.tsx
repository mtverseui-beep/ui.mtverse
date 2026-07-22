import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice Assistant - AI React Component",
  description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end...",
  keywords: ["AI Voice Assistant","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/ai/ai-voice-assistant" },
  openGraph: {
    type: "website",
    url: "/components/ai/ai-voice-assistant",
    title: "AI Voice Assistant - AI React Component",
    description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Voice Assistant - AI React Component",
    description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Voice Assistant",
  "description": "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end...",
  "url": "https://ui.mtverse.dev/components/ai/ai-voice-assistant",
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
