"use client";

// ════════════════════════════════════════════════════════════════════════════
// Testimonials004Card — exact copy from glow-modern-skincare
// ════════════════════════════════════════════════════════════════════════════
// 3-column testimonials with:
//   • Gradient italic headline "Loved by Thousands"
//   • Cards with hover lift (-8px) + shadow
//   • Star ratings, quotes, gradient avatars, "Verified Buyer" labels

const TESTIMONIALS = [
  { quote: "My skin has never looked better! The Vit-C Booster completely transformed my morning routine. Glowing skin without any filters.", name: "Sarah Chen", role: "Verified Buyer", avatarGradient: "from-[#ff4d8c] to-[#ff8f70]" },
  { quote: "Finally found skincare that actually works for sensitive skin. The Barrier Repair is a game changer. Worth every penny!", name: "Maya Rodriguez", role: "Verified Buyer", avatarGradient: "from-[#e0e7ff] to-[#c7d2fe]" },
  { quote: "Obsessed with the Glow Tonic! My pores are smaller and my skin texture is so smooth. This brand is the real deal.", name: "Zoe Williams", role: "Verified Buyer", avatarGradient: "from-[#ffe4e6] to-[#fecdd3]" },
];

export function Testimonials004Card() {
  return (
    <section className="py-14 px-6 md:px-10 bg-[#fafafa]">
      <div className="mx-auto max-w-[1100px]">
      <div className="text-center mb-10">
        <h3 className="text-[32px] md:text-[42px] font-semibold mb-4 text-black">
          Loved by{" "}
          <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
            Thousands
          </span>
        </h3>
        <p className="text-lg text-[#666]">Real results from real people</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="group bg-white rounded-[24px] p-8 border border-[#eee] transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
          >
            <div className="flex text-[#ffb800] text-lg mb-4">★★★★★</div>
            <p className="text-base leading-relaxed text-[#444] mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarGradient}`} />
              <div>
                <h4 className="font-semibold text-sm text-black">{t.name}</h4>
                <p className="text-xs text-[#888]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
