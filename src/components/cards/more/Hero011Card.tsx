"use client";

import { ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Hero011Card — exact copy from Lumina fragrance hero
// ════════════════════════════════════════════════════════════════════════════
// Hero with:
//   • Background image (unsplash perfume) — exact from mediaConfig hero posterUrl
//   • Warm beige bg (#EDE3D3)
//   • Blur-in animations (staggered: eyebrow 0.2s, headline line 1 0.4s, line 2 0.6s, paragraph 0.8s, CTA 1s)
//   • Serif headline "Mist gently. Linger softly."
//   • Bottom fade gradient
//   • Scroll indicator with pulse animation

export function Hero011Card() {
  const heroPoster = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1920&q=80";

  return (
    <>
      <style>{`
        @keyframes lumina-blur-in {
          0% { opacity: 0; filter: blur(12px); transform: translateY(10px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .lumina-blur-in { animation: lumina-blur-in 0.8s ease-out; }
      `}</style>

      <section className="relative min-h-full flex items-center overflow-hidden" style={{ backgroundColor: "#EDE3D3" }}>
        {/* Background image (exact from mediaConfig) */}
        <div className="border-b border-[#2B1A12]/10 p-6 py-2" style={{ backgroundColor: "#EDE3D3" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              backgroundImage: `url(${heroPoster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#EDE3D3] via-[#EDE3D3]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full pt-20 mr-0 lg:mr-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <span
                className="text-sm uppercase mb-6 block text-[#2B1A12] lumina-blur-in opacity-0 tracking-normal"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                Premium Fragrance Rituals
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-balance text-[#2B1A12]">
                <span
                  className="block lumina-blur-in opacity-0 font-semibold"
                  style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                >
                  Mist gently.
                </span>
                <span
                  className="block lumina-blur-in opacity-0 font-semibold text-7xl xl:text-9xl"
                  style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                >
                  Linger softly.
                </span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0 text-[#2B1A12] lumina-blur-in opacity-0"
                style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
              >
                Discover body mists, hair perfumes, and room sprays that breathe with you. Soft rituals, layered scents, everyday presence.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start lumina-blur-in opacity-0"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-400 hover:opacity-90"
                  style={{ background: "#2B1A12", boxShadow: "rgba(14,63,126,0.04) 0px 6px 6px -3px, rgba(14,63,126,0.04) 0px 12px 12px -6px" }}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#2B1A12]">
          <span className="text-xs tracking-widest uppercase font-bold">Scroll</span>
          <div className="w-px h-12 bg-[#2B1A12]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#2B1A12]/60 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
}
