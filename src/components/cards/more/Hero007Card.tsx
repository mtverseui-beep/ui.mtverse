"use client";

import { ArrowRight, Download, Mail } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Hero007Card — exact copy from hero-section-design.zip
// ════════════════════════════════════════════════════════════════════════════
// Pastel nature hero with animated floating elements:
//   • Pastel gradient bg (rose → sky → violet)
//   • Animated birds (bounce + pulse)
//   • Floating butterflies (bounce with delay)
//   • Floating leaves (pulse)
//   • Soft clouds
//   • Badge, gradient headline, stats, CTA buttons, scroll indicator

export function Hero007Card() {
  return (
    <section className="relative min-h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-sky-50 to-violet-50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-sky-100/30 to-violet-100/40" />

      {/* Animated Birds */}
      <div className="absolute top-20 left-1/4 animate-pulse">
        <div className="relative">
          <div className="w-4 h-2 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full transform rotate-12 animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-1 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full transform -rotate-12 ml-2 -mt-1" />
        </div>
      </div>
      <div className="absolute top-32 right-1/3 animate-pulse">
        <div className="relative">
          <div className="w-3 h-2 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full transform rotate-45 animate-bounce" style={{ animationDelay: "1s" }} />
          <div className="w-2 h-1 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full transform -rotate-45 ml-1 -mt-1" />
        </div>
      </div>
      <div className="absolute top-16 right-1/4 animate-pulse">
        <div className="relative">
          <div className="w-5 h-2 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full transform -rotate-12 animate-bounce" style={{ animationDelay: "2s" }} />
          <div className="w-4 h-1 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full transform rotate-12 ml-1 -mt-1" />
        </div>
      </div>

      {/* Floating Butterflies */}
      <div className="absolute top-40 left-16 animate-bounce" style={{ animationDelay: "0.5s" }}>
        <div className="w-6 h-6 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-70 relative">
          <div className="absolute -right-1 top-0 w-4 h-4 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full" />
          <div className="absolute top-2 left-1 w-1 h-3 bg-amber-400 rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-40 right-20 animate-bounce" style={{ animationDelay: "1.5s" }}>
        <div className="w-5 h-5 bg-gradient-to-br from-violet-200 to-violet-300 rounded-full opacity-60 relative">
          <div className="absolute -right-1 top-0 w-3 h-3 bg-gradient-to-br from-sky-200 to-blue-300 rounded-full" />
          <div className="absolute top-1 left-1 w-1 h-2 bg-emerald-400 rounded-full" />
        </div>
      </div>

      {/* Floating Leaves */}
      <div className="absolute top-60 left-10 animate-pulse opacity-50">
        <div className="w-8 h-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full transform rotate-45" />
      </div>
      <div className="absolute bottom-60 right-16 animate-pulse opacity-40">
        <div className="w-6 h-3 bg-gradient-to-r from-green-200 to-green-300 rounded-full transform -rotate-12" />
      </div>

      {/* Soft Clouds */}
      <div className="absolute top-10 left-1/2 opacity-30">
        <div className="flex space-x-1">
          <div className="w-8 h-4 bg-white rounded-full" />
          <div className="w-6 h-3 bg-white rounded-full -ml-2 mt-1" />
          <div className="w-4 h-2 bg-white rounded-full -ml-1 mt-1" />
        </div>
      </div>
      <div className="absolute top-20 right-10 opacity-25">
        <div className="flex space-x-1">
          <div className="w-6 h-3 bg-white rounded-full" />
          <div className="w-8 h-4 bg-white rounded-full -ml-2" />
          <div className="w-5 h-3 bg-white rounded-full -ml-1 mt-1" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-slate-700 text-sm font-medium shadow-lg">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            Available for new projects
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 leading-tight">
              <span className="block">Creative</span>
              <span className="block bg-gradient-to-r from-rose-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                Designer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Bringing nature's beauty into digital experiences through
              <span className="text-rose-500 font-semibold"> gentle</span> and
              <span className="text-violet-500 font-semibold"> harmonious</span> design solutions
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-rose-200/30">
              <div className="text-3xl md:text-4xl font-bold text-rose-500">50+</div>
              <div className="text-slate-600 text-sm">Projects Completed</div>
            </div>
            <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-violet-200/30">
              <div className="text-3xl md:text-4xl font-bold text-violet-500">3+</div>
              <div className="text-slate-600 text-sm">Years Experience</div>
            </div>
            <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-sky-200/30">
              <div className="text-3xl md:text-4xl font-bold text-sky-500">25+</div>
              <div className="text-slate-600 text-sm">Happy Clients</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-300 to-pink-400 hover:from-rose-400 hover:to-pink-500 text-white border-0 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-rose-300/30 transition-all duration-300 group rounded-2xl">
              View My Work
              <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 border-violet-300/50 text-slate-700 hover:bg-violet-100/50 backdrop-blur-sm px-6 py-4 text-lg font-medium transition-all duration-300 hover:border-violet-400/60 bg-white/30 rounded-2xl border">
              <Mail className="h-5 w-5" /> Contact Me
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 border-sky-300/50 text-slate-700 hover:bg-sky-100/50 backdrop-blur-sm px-6 py-4 text-lg font-medium transition-all duration-300 hover:border-sky-400/60 bg-white/30 rounded-2xl border">
              <Download className="h-5 w-5" /> Resume
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-rose-50/50 to-transparent" />
    </section>
  );
}
