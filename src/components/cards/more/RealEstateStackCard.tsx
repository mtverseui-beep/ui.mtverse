"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Maximize,
  Share2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// RealEstateStackCard — luxury property discovery, editorial style.
// Sand + charcoal palette. A swipeable carousel of HD property cards with
// large price, MapPin location, bed/bath/sqft stats, save + share actions,
// and dot indicators. AnimatePresence crossfades between properties and the
// image scales subtly on hover.

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Casa Serena",
    location: "Punta Mita, Nayarit",
    price: "$4,850,000",
    beds: 5,
    baths: 6,
    sqft: 7200,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
    tag: "Oceanfront",
  },
  {
    id: 2,
    title: "The Cliffside Maison",
    location: "Big Sur, California",
    price: "$6,200,000",
    beds: 4,
    baths: 5,
    sqft: 5800,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    tag: "Architectural",
  },
  {
    id: 3,
    title: "Villa Lumière",
    location: "Saint-Tropez, France",
    price: "€8,400,000",
    beds: 6,
    baths: 7,
    sqft: 9100,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    tag: "Estate",
  },
  {
    id: 4,
    title: "Aurora Pavilion",
    location: "Reykjavík, Iceland",
    price: "$3,150,000",
    beds: 4,
    baths: 4,
    sqft: 4200,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    tag: "Modern",
  },
];

export function RealEstateStackCard() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  const go = (next: number, d: number) => {
    setDir(d);
    setIndex((next + PROPERTIES.length) % PROPERTIES.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(index + 1, 1);
    else if (info.offset.x > 80) go(index - 1, -1);
  };

  const property = PROPERTIES[index];

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient sand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 15%, rgba(214,178,120,0.22), transparent 55%), radial-gradient(circle at 80% 90%, rgba(120,113,108,0.16), transparent 60%)",
        }}
      />

      <article className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(41,37,36,0.4)]">
        {/* Image carousel */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.div
              key={property.id}
              custom={dir}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="group absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={property.image}
                alt={`${property.title} in ${property.location}`}
                fill
                sizes="380px"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* bottom gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {/* top tag + actions */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                <span className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-800 backdrop-blur-sm">
                  {property.tag}
                </span>
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setSaved((s) => ({ ...s, [property.id]: !s[property.id] }))
                    }
                    aria-label={saved[property.id] ? "Unsave property" : "Save property"}
                    aria-pressed={!!saved[property.id]}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-stone-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
                  >
                    <Heart
                      className={`h-4 w-4 transition ${saved[property.id] ? "fill-rose-500 text-rose-500" : ""}`}
                      strokeWidth={2.2}
                    />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Share property"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-stone-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/50"
                  >
                    <Share2 className="h-4 w-4" strokeWidth={2.2} />
                  </motion.button>
                </div>
              </div>
              {/* title overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h2 className="text-[24px] font-bold leading-tight tracking-tight">
                  {property.title}
                </h2>
                <p className="mt-0.5 flex items-center gap-1 text-[12px] font-medium text-white/85">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} />
                  {property.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrows */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => go(index - 1, -1)}
            aria-label="Previous property"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-stone-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/50"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => go(index + 1, 1)}
            aria-label="Next property"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-stone-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/50"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
          </motion.button>

          {/* dots */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
            {PROPERTIES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to property ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{
                  width: i === index ? 18 : 6,
                  backgroundColor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Body: price + stats + CTA */}
        <div className="p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                List price
              </p>
              <p className="text-[28px] font-bold leading-none tracking-tight text-stone-900 dark:text-stone-50">
                {property.price}
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-500/15 dark:text-amber-200">
              Verified
            </span>
          </div>

          {/* stats row */}
          <div className="mt-4 grid grid-cols-3 divide-x divide-stone-200 rounded-xl border border-stone-200 bg-stone-50 dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-800/40">
            <Stat icon={BedDouble} value={property.beds} label="Beds" />
            <Stat icon={Bath} value={property.baths} label="Baths" />
            <Stat icon={Maximize} value={property.sqft.toLocaleString()} label="Sq Ft" />
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="mt-4 w-full rounded-xl bg-stone-900 py-3 text-[13px] font-semibold text-stone-50 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Request a private tour
          </motion.button>
        </div>
      </article>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof BedDouble;
  value: string | number;
  label: string;
}) {
  return (
    <div className="px-2 py-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-amber-700 dark:text-amber-300" strokeWidth={1.9} />
      <p className="mt-1 text-[15px] font-bold tabular-nums text-stone-900 dark:text-stone-50">{value}</p>
      <p className="text-[9.5px] uppercase tracking-wider text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}
