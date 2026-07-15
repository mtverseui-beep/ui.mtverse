"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Purpose-built for product development",
    shortDescription: "Built specifically for modern product teams",
    fullContent: {
      paragraphs: [
        "Linear was developed with a specific purpose: to empower product teams to do their best work. Every aspect is intentionally designed to help teams focus on what they do best: Planning, building, and shipping great products.",
        "Because of its fit-to-purpose design, Linear is incredibly easy to use, but grows more powerful as you scale. It's principled where it needs to be, but provides enough flexibility to adapt to your team's unique way of working.",
        "We believe that this approach creates a better way to build products. And more than 15,000 product teams around the globe – from early-stage startups to public companies – agree.",
      ],
      testimonial:
        "We'd tried many tools before Linear but none of them felt like they were made for the way we work. Linear was a breath of fresh air - speedy, snappy, and a pleasure to use.",
      company: "Vercel",
    },
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center">
        { }
        <img
          src="/premium/linear-feature/purpose-built.png"
          alt="Purpose-built for product development illustration"
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    id: 2,
    title: "Designed to move fast",
    shortDescription: "Built for speed and efficiency",
    fullContent: {
      paragraphs: [
        "Speed is at the core of Linear's design philosophy. Every interaction, every animation, every feature is optimized to help teams move faster without sacrificing quality or thoughtfulness.",
        "From sub-50ms response times to keyboard shortcuts for every action, Linear eliminates friction at every step. The interface is designed to get out of your way so you can focus on what matters most.",
        "Fast doesn't just mean quick loading times – it means faster decision making, faster iteration cycles, and ultimately faster time to market for your products.",
      ],
      testimonial:
        "Linear's speed transformed how our team works. What used to take multiple clicks and page loads now happens instantly. It's like the difference between walking and flying.",
      company: "Stripe",
    },
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center">
        { }
        <img
          src="/premium/linear-feature/move-fast.png"
          alt="Designed to move fast illustration"
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    id: 3,
    title: "Crafted to perfection",
    shortDescription: "Every detail meticulously designed",
    fullContent: {
      paragraphs: [
        "Perfection isn't about adding more features – it's about refining every detail until the experience feels effortless. Linear is crafted with an obsessive attention to detail that you can feel in every interaction.",
        "From the carefully tuned animations to the thoughtfully designed information hierarchy, every element serves a purpose. The interface adapts to your workflow, not the other way around.",
        "This commitment to craft creates software that doesn't just work well – it feels good to use. When tools are this well-designed, work becomes more enjoyable and teams naturally perform better.",
      ],
      testimonial:
        "The attention to detail in Linear is incredible. It's not just functional – it's beautiful. Using it daily feels like working with a piece of art that happens to be incredibly powerful.",
      company: "Notion",
    },
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center">
        { }
        <img
          src="/premium/linear-feature/crafted-perfection.png"
          alt="Crafted to perfection illustration"
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
];

export function LinearFeatureCardsCard() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <div className="min-h-full bg-[#0d0d0d] text-white">
      {/* Header Section */}
      <div className="container mx-auto py-16 px-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20"></div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-y-8 gap-x-0">
          {features.map((feature) => (
            <div key={feature.id} className="mx-6">
              {selectedFeature !== feature.id && (
                <motion.div
                  layoutId={`feature-${feature.id}`}
                  className="relative bg-[#1a1a1a]/50 hover:bg-[#1f1f1f]/60 p-8 cursor-pointer group transition-all duration-300 h-full border border-[rgba(255,255,255,0.03)] rounded-4xl max-w-sm mx-auto"
                  onClick={() => setSelectedFeature(feature.id)}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    duration: 1.2,
                  }}
                >
                  <button className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-[#404040] flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4 text-[#8b8b8b] group-hover:text-[#cccccc]" />
                  </button>

                  <motion.div layoutId={`illustration-${feature.id}`}>{feature.illustration}</motion.div>

                  <div className="mt-6">
                    <motion.h3
                      layoutId={`title-${feature.id}`}
                      className="text-xl leading-tight h-14 flex items-center text-balance font-medium"
                    >
                      {feature.title}
                    </motion.h3>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-[#0d0d0d]/95 backdrop-blur-sm z-40"
              onClick={() => setSelectedFeature(null)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-0 pt-16">
              <motion.div
                layoutId={`feature-${selectedFeature}`}
                className="bg-[#1a1a1a] rounded-t-2xl p-12 max-w-3xl w-full h-full border-t border-[#2a2a2a] relative overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 1.2,
                }}
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#404040] flex items-center justify-center hover:border-[#555555] transition-colors"
                >
                  <X className="w-4 h-4 text-[#8b8b8b]" />
                </motion.button>

                {features.find((f) => f.id === selectedFeature) && (
                  <>
                    <motion.div
                      layoutId={`illustration-${selectedFeature}`}
                      className="relative w-full h-64 flex items-center justify-center mb-8"
                    >
                      { }
                      <img
                        src={
                          selectedFeature === 1
                            ? "/premium/linear-feature/purpose-built.png"
                            : selectedFeature === 2
                              ? "/premium/linear-feature/move-fast.png"
                              : "/premium/linear-feature/crafted-perfection.png"
                        }
                        alt={`${features.find((f) => f.id === selectedFeature)?.title} illustration`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    <div className="mb-8">
                      <motion.h2
                        layoutId={`title-${selectedFeature}`}
                        className="text-4xl lg:text-5xl tracking-tight font-semibold leading-tight"
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 20,
                          duration: 1.2,
                        }}
                      >
                        {features.find((f) => f.id === selectedFeature)?.title}
                      </motion.h2>
                    </div>

                    {/* Additional content that appears only in modal */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="space-y-8 text-left max-w-2xl"
                    >
                      {features
                        .find((f) => f.id === selectedFeature)
                        ?.fullContent.paragraphs.map((paragraph, index) => (
                          <p key={index} className="text-[#8b8b8b] text-lg leading-relaxed text-pretty">
                            {paragraph}
                          </p>
                        ))}

                      {/* Testimonial */}
                      <div className="text-center space-y-6 py-8">
                        <blockquote className="text-xl text-white font-medium leading-relaxed text-balance">
                          &ldquo;{features.find((f) => f.id === selectedFeature)?.fullContent.testimonial}&rdquo;
                        </blockquote>
                        <div className="flex justify-center">
                          <div className="text-[#666666] font-medium text-lg">
                            {features.find((f) => f.id === selectedFeature)?.fullContent.company}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
