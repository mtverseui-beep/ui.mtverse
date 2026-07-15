"use client";

import React from "react";
import { motion } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// TestimonialsCard — extracted from framer-motion-error project
// ════════════════════════════════════════════════════════════════════════════
// 3-column infinite-scroll testimonials with avatar + name + role.
// Bottom: infinite logo marquee. Uses framer-motion for scroll + marquee.
// The TestimonialsColumn component is inlined for self-containment.

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  { text: "This platform completely transformed how we build products. We shipped our MVP in 2 weeks instead of 2 months.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", name: "Sarah Chen", role: "CTO at TechFlow" },
  { text: "The best investment we've made for our engineering team. The ROI was immediate and substantial.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", name: "Marcus Johnson", role: "VP Engineering at Scale" },
  { text: "Finally, a tool that actually delivers on its promises. Our deployment time went from hours to minutes.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", name: "Emily Rodriguez", role: "Lead Developer at Nexus" },
  { text: "Implementing this was smooth and quick. The customizable interface made team onboarding effortless.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", name: "David Park", role: "IT Manager" },
  { text: "The support team is exceptional, guiding us through setup and providing ongoing assistance.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", name: "Aisha Patel", role: "Customer Success Lead" },
  { text: "Seamless integration enhanced our business operations and efficiency. Highly recommend.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", name: "James Wilson", role: "CEO at Quantum" },
  { text: "Its robust features and quick support have transformed our workflow significantly.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face", name: "Lisa Thompson", role: "Project Manager" },
  { text: "The smooth implementation exceeded expectations. It streamlined our entire business process.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", name: "Michael Brown", role: "Business Analyst" },
  { text: "Our team productivity improved dramatically with the user-friendly design and powerful features.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", name: "Rachel Kim", role: "Marketing Director" },
];

const FIRST_COLUMN = TESTIMONIALS.slice(0, 3);
const SECOND_COLUMN = TESTIMONIALS.slice(3, 6);
const THIRD_COLUMN = TESTIMONIALS.slice(6, 9);

const LOGOS = ["TechCorp", "Innovate", "NextGen", "Quantum", "Velocity", "Apex"];

export function TestimonialsCard() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-12"
        >
          <div className="border cs-border py-1.5 px-4 rounded-full text-sm text-muted-foreground">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mt-6">
            What our users say
          </h2>
          <p className="text-center mt-4 text-muted-foreground text-lg text-balance">
            See what our customers have to say about us.
          </p>
        </motion.div>

        {/* 3-column infinite scroll testimonials */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={FIRST_COLUMN} duration={15} />
          <TestimonialsColumn testimonials={SECOND_COLUMN} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={THIRD_COLUMN} className="hidden lg:block" duration={17} />
        </div>

        {/* Logo marquee */}
        <div className="mt-16 pt-16 border-t cs-border">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by industry leaders</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ x: { duration: 20, repeat: Infinity, ease: "linear" } }}
            >
              {[...LOGOS, ...LOGOS].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-xl font-semibold text-muted-foreground/50 whitespace-nowrap flex-shrink-0"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// TestimonialsColumn — inlined from testimonials-column.tsx
// ════════════════════════════════════════════════════════════════════════════
// A vertical infinite-scrolling column of testimonial cards. Duplicates the
// content 2x and translates by -50% for a seamless loop.

function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-2xl border cs-border bg-background backdrop-blur-sm max-w-xs w-full shadow-lg"
                key={`${index}-${i}`}
              >
                <p className="text-foreground/80 leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover ring-2 cs-border"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground tracking-tight leading-5">{name}</span>
                    <span className="text-sm text-muted-foreground leading-5">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
