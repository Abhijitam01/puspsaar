'use client'

import { HeartIcon, Star, ShoppingCart } from 'lucide-react'
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
  onRemove?: (id: number) => void
}

export const WishlistCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRemoving(true)
    setTimeout(() => {
      onRemove?.(product.id)
    }, 300)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    alert(`${product.name} added to cart!`)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className={`border border-[#E0E0E0] bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${isRemoving ? 'opacity-50 scale-95' : ''}`}>
        {/* Image */}
        <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

          {/* Discount badge */}
          <div className="absolute top-3 left-3 bg-[#E32C2B] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1">
            {product.discount}
          </div>

          {/* Remove / Wishlisted button */}
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center shadow-sm hover:bg-[#F5F5F5] transition-colors"
          >
            <HeartIcon className="h-4 w-4 text-[#E32C2B] fill-[#E32C2B]" />
          </button>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white text-[10px] font-bold text-[#1C1C1C]">
            <Star className="h-3 w-3 text-[#FFAF00] fill-[#FFAF00]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-[#1C1C1C] text-sm mb-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-[#6B6B6B] italic mb-3 line-clamp-1">{product.subtitle}</p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-sm font-bold text-[#1C1C1C]">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-[#ABABAB] line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}
export default WishlistCard
