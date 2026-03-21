'use client'

import { Star, Heart, Wind } from 'lucide-react'
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
  brand?: string
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

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative border border-[#E0E0E0] bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Fragrance notes overlay on hover */}
          {product.fragrance_notes && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <Wind className="w-5 h-5 text-white mb-3" />
              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 mb-4">Scent Profile</h4>
              <div className="space-y-3 w-full text-center">
                {product.fragrance_notes.top?.length > 0 && (
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Top</p>
                    <p className="text-[11px] text-white font-medium line-clamp-1">{product.fragrance_notes.top.join(', ')}</p>
                  </div>
                )}
                {product.fragrance_notes.middle?.length > 0 && (
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Heart</p>
                    <p className="text-[11px] text-white font-medium line-clamp-1">{product.fragrance_notes.middle.join(', ')}</p>
                  </div>
                )}
                {product.fragrance_notes.base?.length > 0 && (
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Base</p>
                    <p className="text-[11px] text-white font-medium line-clamp-1">{product.fragrance_notes.base.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wishlist button */}
          <button
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              isWishlisted ? 'shadow-sm' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'text-red-500 fill-red-500' : 'text-[#1C1C1C]'
              }`}
            />
          </button>

          {/* Discount badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-[#E32C2B] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1">
              {product.discount}
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white text-[10px] font-bold text-[#1C1C1C]">
            <Star className="h-3 w-3 text-[#FFAF00] fill-[#FFAF00]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {product.brand && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">{product.brand}</p>
          )}
          <h3 className="text-sm font-semibold text-[#1C1C1C] mb-1 line-clamp-1">{product.name}</h3>
          {product.subtitle && (
            <p className="text-xs text-[#6B6B6B] italic mb-3 line-clamp-1">{product.subtitle}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#1C1C1C]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-[#ABABAB] line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className="text-[10px] text-[#6B6B6B]">{product.ratingCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
