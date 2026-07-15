"use client"

import { useState, useEffect, useRef } from "react"
import { ShoppingBag } from "lucide-react"

// ════════════════════════════════════════════════════════════════════════════
// Premium002Card — EXACT copy of ProductGrid from Lumina fragrance
// ════════════════════════════════════════════════════════════════════════════
// Exact copy of the source markup, adapted only for:
//   • <Link> → <a> (no next/link routing in showcase)
//   • <Image fill> → <img absolute inset-0> (no next/image in showcase)
//   • CSS variables → hardcoded hex values (no Lumina theme)
//   • NO title, NO description, NO "View All Products" button
//   • useCart removed (buttons are decorative)

type Category = "mist" | "hair" | "room"

const products = [
  // Body Mists
  {
    id: "cloud-veil-body-mist",
    name: "Cloud Veil Body Mist",
    description: "Soft musk, white petals, clean air",
    price: 38,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    category: "mist" as Category
  },
  {
    id: "rose-milk-body-mist",
    name: "Rose Milk Body Mist",
    description: "Fresh rose petals, almond milk",
    price: 38,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "mist" as Category
  },
  {
    id: "vanilla-hour-fragrance-mist",
    name: "Vanilla Hour Fragrance Mist",
    description: "Bourbon vanilla, tonka, golden amber",
    price: 44,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    category: "mist" as Category
  },
  {
    id: "evening-velvet-body-mist",
    name: "Evening Velvet Body Mist",
    description: "Plum, black amber, velvet rose",
    price: 46,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "mist" as Category
  },
  // Hair Perfumes
  {
    id: "amber-bloom-hair-perfume",
    name: "Amber Bloom Hair Perfume",
    description: "Warm amber, night-blooming jasmine",
    price: 42,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    category: "hair" as Category
  },
  {
    id: "warm-skin-hair-perfume",
    name: "Warm Skin Hair Perfume",
    description: "Sun-warmed skin, amber, sandalwood",
    price: 42,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "hair" as Category
  },
  {
    id: "soft-musk-travel-mini",
    name: "Soft Musk Travel Mini",
    description: "Clean musk in a 15ml companion",
    price: 22,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    badge: "Travel",
    category: "hair" as Category
  },
  {
    id: "bloom-layering-duo",
    name: "Bloom Layering Duo",
    description: "Body mist + hair perfume set",
    price: 72,
    originalPrice: 80,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    badge: "Sale",
    category: "hair" as Category
  },
  // Room Sprays
  {
    id: "citrus-linen-room-spray",
    name: "Citrus Linen Room Spray",
    description: "Cold-pressed citrus, white tea, fresh linen",
    price: 28,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "room" as Category
  },
  {
    id: "clean-cotton-room-spray",
    name: "Clean Cotton Room Spray",
    description: "Fresh laundry, white musk, soft cedar",
    price: 28,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "room" as Category
  },
  {
    id: "calm-linen-pillow-mist",
    name: "Calm Linen Pillow Mist",
    description: "Lavender, vanilla, soft cedar for rest",
    price: 32,
    originalPrice: null as number | null,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    category: "room" as Category
  },
  {
    id: "moonlit-amber-gift-set",
    name: "Moonlit Amber Gift Set",
    description: "Three amber rituals in a keepsake box",
    price: 96,
    originalPrice: 116,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    badge: "Sale",
    category: "room" as Category
  }
]

const categories = [
  { value: "mist" as Category, label: "Body Mists" },
  { value: "hair" as Category, label: "Hair Perfumes" },
  { value: "room" as Category, label: "Room Sprays" }
]

export function FragranceProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("mist")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = products.filter(product => product.category === selectedCategory)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) gridObserver.observe(gridRef.current)

    return () => {
      if (gridRef.current) gridObserver.unobserve(gridRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .boty-shadow { box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px; }
        .boty-transition { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      <section className="py-24 bg-[#F0E6D6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Segmented Control — no title/description */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#F7F1E8] rounded-full p-1 gap-1 relative">
              {/* Animated background slide */}
              <div
                className="absolute top-1 bottom-1 bg-[#2B1A12] rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{
                  left: selectedCategory === 'mist' ? '4px' : selectedCategory === 'hair' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
                  width: 'calc(33.333% - 4px)'
                }}
              />
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryChange(category.value)}
                  className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? "text-[#F7F1E8]"
                      : "text-[#7A6655] hover:text-[#2B1A12]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <a
                key={`${selectedCategory}-${product.id}`}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`group flex h-full flex-col transition-all duration-500 ease-out ${
                  isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
              >
                <div className="flex h-full flex-col bg-[#F7F1E8] rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                  {/* Image — fixed aspect ratio for consistency */}
                  <div className="relative aspect-square bg-[#EDE3D3] overflow-hidden flex-shrink-0">
                    { }
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover boty-transition group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                          product.badge === "Sale"
                            ? "bg-[#A65D57]/10 text-[#A65D57]"
                            : product.badge === "New"
                            ? "bg-[#8B5A4A]/10 text-[#8B5A4A]"
                            : "bg-[#C99B8E] text-[#2B1A12]"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    {/* Quick add button */}
                    <button
                      type="button"
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#F7F1E8]/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#2B1A12]" />
                    </button>
                  </div>

                  {/* Info — flex-1 + flex-col pushes price to bottom for equal heights */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg text-[#2B1A12] mb-1 leading-snug line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-[#7A6655] mb-3 leading-relaxed flex-1 line-clamp-2 min-h-[3rem]">{product.description}</p>
                    <div className="flex items-center gap-2 mt-auto pt-1">
                      <span className="font-medium text-[#2B1A12]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#7A6655] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
