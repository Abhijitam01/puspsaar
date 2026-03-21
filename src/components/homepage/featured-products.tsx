'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingBag } from 'lucide-react'
import { featuredProducts } from '@/data/perfume-data'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'

export default function FeaturedProducts() {
  const addItem = useCartStore(s => s.addItem)

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-3">Handpicked</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
            Featured Fragrances
          </h2>
        </div>
        <Link
          href="/product"
          className="text-sm text-muted-foreground hover:text-[#C6A969] transition-colors hidden sm:block"
        >
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group"
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Discount badge */}
                {product.discount && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#C6A969] text-black text-xs font-semibold">
                    {product.discount}
                  </span>
                )}
                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:text-[#C6A969] transition-all opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4" />
                </button>
                {/* Quick add */}
                <button
                  onClick={() => {
                    addItem({
                      id: String(product.id),
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      image: product.image,
                      volume: product.volumes[0],
                      category: product.category,
                    })
                    toast.success(`${product.name} added to cart`)
                  }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium hover:bg-[#C6A969] hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Quick Add
                </button>
              </div>

              {/* Info */}
              <Link href={`/product/${product.id}`}>
                <div className="p-4">
                  <p className="text-[#C6A969] text-xs mb-1 font-medium">{product.brand}</p>
                  <h3 className="text-foreground font-semibold text-base mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{product.subtitle}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-foreground font-bold">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-xs line-through ml-2">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-[#C6A969] text-[#C6A969]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
