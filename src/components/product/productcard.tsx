'use client'

import { Star, Heart, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'

export interface IProduct {
  id: number
  name: string
  subtitle: string
  price: number
  originalPrice: number
  discount: string
  rating: number
  ratingCount: string
  image: string
  size?: string[]
}

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    }
    return `₹${(price / 100000).toFixed(2)} L`
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative rounded-3xl border border-border bg-card overflow-hidden text-card-foreground transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.02] dark:border-white/[0.08] dark:hover:border-white/20 dark:hover:shadow-[0_8px_40px_rgba(127,232,215,0.08)]">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Wishlist Button - Elegant floating design */}
          <button 
            className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 
              ${isWishlisted 
                ? 'bg-rose-500/20 border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                : 'bg-white/[0.08] border-white/[0.12] hover:bg-white/15 hover:border-white/25 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]'
              } 
              opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
            onClick={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${isWishlisted ? 'text-rose-400 fill-rose-400 scale-110' : 'text-white/80'}`} />
          </button>

          {/* Discount Badge - Premium gradient style */}
          {product.discount && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] border border-emerald-400/20">
              <Sparkles className="w-3 h-3" />
              {product.discount}
            </div>
          )}

          {/* Rating - Elegant pill design */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/[0.08] text-xs text-white shadow-lg">
            <div className="flex items-center justify-center w-4 h-4 rounded-md bg-gradient-to-br from-amber-400 to-orange-500">
              <Star className="h-2.5 w-2.5 text-white fill-white" />
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-white/50">({product.ratingCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 bg-card dark:bg-transparent">
          <h3 className="text-lg font-semibold line-clamp-1 text-foreground dark:bg-gradient-to-r dark:from-white dark:to-white/80 dark:bg-clip-text dark:text-transparent">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.subtitle}</p>
          
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-xl font-bold text-primary dark:bg-gradient-to-r dark:from-[#f4d7b3] dark:to-[#e8c799] dark:bg-clip-text dark:text-transparent">{formatPrice(product.price)}</span>
            <span className="text-muted-foreground/60 line-through text-sm">{formatPrice(product.originalPrice)}</span>
          </div>

          {product.size && (
            <div className="flex flex-wrap gap-2 pt-1">
              {product.size.map((size, i) => (
                <span key={i} className="text-xs rounded-lg border border-border bg-muted px-3 py-1.5 text-muted-foreground hover:border-primary/30 hover:bg-accent transition-all cursor-default dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-white/15 dark:hover:bg-white/[0.08]">
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
