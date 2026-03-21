'use client'

import { Star, Heart, Sparkles, Wind } from 'lucide-react'
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
  fragrance_notes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
}

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative rounded-[2rem] border border-border/40 bg-card overflow-hidden text-card-foreground transition-all duration-700 hover:border-[#C6A969]/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 dark:bg-[#121212] dark:border-white/5 dark:hover:border-[#C6A969]/20">
        
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
          />
          
          {/* Subtle gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
          
          {/* MyOP Inspired: Hover for Notes Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-105 group-hover:scale-100">
            <Wind className="w-6 h-6 text-[#C6A969] mb-4" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A969] mb-4">Scent Profile</h4>
            
            <div className="space-y-4 w-full text-center">
              {product.fragrance_notes ? (
                <>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Top Notes</p>
                    <p className="text-xs text-white/90 font-medium line-clamp-1">{product.fragrance_notes.top?.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Heart Notes</p>
                    <p className="text-xs text-white/90 font-medium line-clamp-1">{product.fragrance_notes.middle?.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Base Notes</p>
                    <p className="text-xs text-white/90 font-medium line-clamp-1">{product.fragrance_notes.base?.join(', ')}</p>
                  </div>
                </>
              ) : (
                <p className="text-xs text-white/60 italic font-serif">Discovery in progress...</p>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 w-full text-center">
              <span className="text-[9px] text-[#C6A969] font-bold uppercase tracking-widest cursor-pointer hover:underline">
                View Collection details
              </span>
            </div>
          </div>

          {/* Floating Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            <button 
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl
                ${isWishlisted 
                  ? 'bg-rose-500 border-rose-400' 
                  : 'bg-black/20 border-white/10 hover:bg-[#C6A969] hover:border-[#C6A969] hover:text-black'
                }`}
              onClick={(e) => { 
                e.preventDefault()
                e.stopPropagation()
                setIsWishlisted(!isWishlisted)
              }}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-white fill-white' : 'text-white'}`} />
            </button>
          </div>

          {/* Status Badge */}
          {product.discount && (
            <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg border border-white/20">
              {product.discount}
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white shadow-lg">
            <Star className="h-3 w-3 text-[#C6A969] fill-[#C6A969]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground line-clamp-1">{product.name}</h3>
              <span className="text-xs text-muted-foreground/60 font-medium uppercase tracking-tighter">{product.ratingCount}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 font-serif italic" style={{ fontFamily: 'Georgia, serif' }}>{product.subtitle}</p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-foreground tracking-tight">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-muted-foreground/40 line-through font-medium">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            
            <div className="group/btn relative overflow-hidden h-8 w-8 rounded-full bg-muted/30 border border-border/40 flex items-center justify-center hover:bg-[#C6A969] hover:border-[#C6A969] transition-all duration-300">
               <Sparkles className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-black transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
