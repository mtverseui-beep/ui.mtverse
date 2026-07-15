"use client";

import { Leaf, Sparkles, ArrowRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Hero009Card — exact copy from exact-landing-page-clone1.zip (Olea Skincare)
// ════════════════════════════════════════════════════════════════════════════
// Hero with:
//   • Teal/cyan/emerald gradient bg
//   • Parallax floating blobs (scroll-driven translateY)
//   • Left content: slide-in from left (translate-x), eyebrow, headline with
//     SVG underline draw animation, paragraph, CTAs, star rating
//   • Right content: slide-in from right, product image with hover zoom,
//     floating Leaf + Sparkles icons (bounce animation)
//   • All CSS animations inlined (animate-draw, floating-element, btn styles)

export function Hero009Card() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use the scroll container instead of window
    function findScrollParent(el: Element | null): Element | null {
      if (!el) return null;
      let node: Element | null = el;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node;
        node = node.parentElement;
      }
      return null;
    }

    const el = document.querySelector("[data-hero009]");
    const scrollEl = findScrollParent(el);

    const handleScroll = () => {
      const scrollTop = scrollEl ? scrollEl.scrollTop : window.scrollY;
      setScrollY(scrollTop);
    };

    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    }
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => {
      cancelAnimationFrame(frame);
      if (scrollEl) scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes hero009-draw { to { stroke-dashoffset: 0; } }
        .hero009-animate-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: hero009-draw 2s ease-out forwards;
        }
        .hero009-floating-element {
          position: absolute;
          background: white;
          border-radius: 9999px;
          padding: 1rem;
          box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.1), 0 4px 6px -2px rgba(20, 184, 166, 0.05);
          animation: bounce 2s ease-in-out infinite;
        }
        .hero009-shadow-primary-lg {
          box-shadow: 0 25px 50px -12px rgba(20, 184, 166, 0.25);
        }
      `}</style>

      <section data-hero009 className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 min-h-full flex items-center pt-20 overflow-hidden">
        {/* Parallax floating blobs */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content — slide in from left */}
            <div
              className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="space-y-6">
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium">
                  Premium Australian Skincare
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight">
                  Celebrating
                  <br />
                  <span className="text-teal-500 relative">
                    Australian Nature
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                      <path
                        d="M0 6C50 2 100 10 150 6C200 2 250 10 300 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="hero009-animate-draw"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Discover our range of premium skincare products crafted with native Australian botanicals for radiant,
                healthy skin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-teal-200/50 text-sm font-medium">
                  SEE HYDRATING RANGE
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center justify-center bg-white hover:bg-teal-50 text-gray-800 px-8 py-4 rounded-full border border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm text-sm font-medium">
                  WATCH STORY
                </a>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by 10,000+ customers</p>
              </div>
            </div>

            {/* Right content — slide in from right */}
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-3xl hero009-shadow-primary-lg">
                  { }
                  <img
                    src="/images/ai-portfolio/olea-hero.jpg"
                    alt="Premium skincare products with pink flowers and facial tools"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating elements */}
              <div className="hero009-floating-element -top-4 -right-4">
                <Leaf className="w-6 h-6 text-teal-500" />
              </div>
              <div className="hero009-floating-element -bottom-4 -left-4" style={{ animationDelay: "500ms" }}>
                <Sparkles className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
