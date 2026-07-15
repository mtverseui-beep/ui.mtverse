"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingCart, Eye, Check, Truck, Shield } from "lucide-react";
import { ecommerceProduct } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;

// EcommerceProductCard visual language: clean, light, retail. White card on
// light backdrop, bold photography, amber sale tags, generous padding. Reads
// like a premium Apple/Shopify product card — deliberately the LIGHTEST card
// in the set, distinct from the dark folder and the warm creator profile.

export function EcommerceProductCard() {
  const product = ecommerceProduct;
  const [activeColor, setActiveColor] = useState(0);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Soft amber ambient — retail warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(251,191,36,0.20), transparent 55%), radial-gradient(circle at 75% 80%, rgba(244,114,182,0.14), transparent 60%)",
        }}
      />

      <article className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
        {/* Image */}
        <div
          className="group/img relative h-[300px] overflow-hidden bg-slate-50 dark:bg-slate-950"
          onMouseEnter={() => setQuickView(true)}
          onMouseLeave={() => setQuickView(false)}
        >
          {/* Refined zoom — slower, smoother */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: quickView ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Image
              src={product.gallery[activeImage] ?? product.image}
              alt={product.title}
              fill
              sizes="380px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Cinematic vignette for premium feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.18) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/45 to-transparent dark:from-slate-900/45"
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 18 }}
              className="inline-flex items-center rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-[0_6px_16px_-4px_rgba(244,63,94,0.6)]"
            >
              −{product.discountPct}%
            </motion.span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold backdrop-blur-md ${
                product.stock <= 10
                  ? "bg-amber-500/90 text-white shadow-[0_6px_16px_-4px_rgba(245,158,11,0.6)]"
                  : "bg-emerald-500/90 text-white shadow-[0_6px_16px_-4px_rgba(16,185,129,0.6)]"
              }`}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {product.stockLabel}
            </span>
          </div>

          {/* Wishlist — premium glass button with burst animation */}
          <motion.button
            type="button"
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => setWished((v) => !v)}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/30 text-slate-700 backdrop-blur-md transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 dark:text-white"
          >
            <motion.span
              animate={wished ? { scale: [1, 1.4, 0.9, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  wished ? "fill-rose-500 text-rose-500" : "text-slate-700 dark:text-white/85"
                }`}
                strokeWidth={2}
              />
            </motion.span>
            {/* Ripple ring on click */}
            <AnimatePresence>
              {wished && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose-500/60"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* Quick view — smoother slide-up with premium glass */}
          <AnimatePresence>
            {quickView && (
              <motion.button
                type="button"
                initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.3, ease: EASE }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveImage((i) => (i + 1) % product.gallery.length)}
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[12px] font-semibold text-slate-800 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)] backdrop-blur-xl transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 dark:border-slate-700 dark:bg-slate-800/85 dark:text-white"
              >
                <Eye className="h-3.5 w-3.5" strokeWidth={2.2} />
                Quick view
                <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9.5px] font-medium text-slate-500 dark:bg-slate-700 dark:text-white/60">
                  {activeImage + 1}/{product.gallery.length}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {product.gallery.map((g, i) => (
              <motion.button
                key={g}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeImage}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImage(i)}
                className={`relative h-9 w-9 overflow-hidden rounded-md border-2 backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                  i === activeImage
                    ? "border-amber-500 shadow-[0_4px_12px_-2px_rgba(245,158,11,0.5)]"
                    : "border-white/70 opacity-80 hover:opacity-100 dark:border-slate-600"
                }`}
              >
                <Image src={g} alt="" fill sizes="36px" className="object-cover" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {product.category}
            </span>
            {/* Rating — clearer stars */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < Math.floor(product.rating);
                  const half = !filled && i < product.rating;
                  return (
                    <div key={i} className="relative h-3 w-3">
                      <Star
                        className="absolute inset-0 h-3 w-3 text-slate-300 dark:text-slate-700"
                        strokeWidth={1.5}
                      />
                      {(filled || half) && (
                        <div className={half ? "absolute inset-0 overflow-hidden" : "absolute inset-0"} style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}>
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="text-[11.5px] font-semibold text-slate-700 tabular-nums dark:text-white/80">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-white/40">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>

          <h2 className="mt-2 text-[16px] font-semibold leading-snug">
            {product.title}
          </h2>

          {/* Color variants — premium swatches with checkmark */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11.5px] font-medium text-slate-500 dark:text-white/55">
                Color — <span className="text-slate-900 dark:text-white/85">{product.colors[activeColor].name}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c, i) => {
                const active = i === activeColor;
                const isDarkSwatch = c.hex === "#0f1115" || c.hex === "#1e3a8a" || c.hex === "#b91c1c";
                return (
                  <motion.button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={active}
                    onClick={() => setActiveColor(i)}
                    whileTap={{ scale: 0.92 }}
                    className={`relative h-7 w-7 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                      active ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : "ring-1 ring-slate-200 hover:ring-slate-400 dark:ring-slate-700"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {/* Glossy top reflection */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-1 top-1 h-1.5 rounded-full bg-white/30 blur-[1px]"
                    />
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                          className="absolute inset-0 m-auto flex h-3 w-3 items-center justify-center"
                        >
                          <Check
                            className="h-3 w-3"
                            strokeWidth={3.5}
                            style={{ color: isDarkSwatch ? "white" : "black" }}
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Price + CTA — better hierarchy */}
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={product.price}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-[28px] font-semibold tracking-tight tabular-nums"
                >
                  ${product.price}
                </motion.span>
                <span className="text-[14px] text-slate-400 line-through dark:text-white/40">
                  ${product.originalPrice}
                </span>
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
                Save ${product.originalPrice - product.price} today
              </p>
            </div>

            {/* Add to cart — premium with "Added" state */}
            <motion.button
              type="button"
              onClick={handleAdd}
              whileTap={{ scale: 0.94 }}
              animate={added ? { boxShadow: "0 0 0 4px rgba(16,185,129,0.25)" } : {}}
              className={`relative flex items-center gap-1.5 overflow-hidden rounded-lg px-4 py-2.5 text-[12.5px] font-semibold shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                added
                  ? "bg-emerald-500 text-white shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)]"
                  : "bg-slate-900 text-white shadow-[0_8px_20px_-6px_rgba(15,23,42,0.6)] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 dark:shadow-[0_8px_20px_-6px_rgba(255,255,255,0.25)]"
              }`}
            >
              {/* Moving sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 hover:translate-x-full"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={added ? "added" : "cart"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center gap-1.5"
                >
                  {added ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2.4} />
                      Add to cart
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Trust row */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-white/45">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.9} />
              Free delivery by Fri
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.9} />
              2-year warranty
            </span>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
