'use client'

import { HeartIcon, Star, ShoppingCart, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
    // Simulate removal
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
      <div className={`relative bg-muted rounded-lg transition-all duration-300 ${isRemoving ? 'opacity-50 scale-95' : ''}`}>
        <div className="bg-card rounded-lg p-3 hover:shadow-lg transition-all duration-300 relative border border-border hover:border-primary/30">
          {/* Discount Tag */}
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded-tr-md rounded-bl-md z-10">
            {product.discount}
          </div>

          {/* Remove Button */}
          <button 
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-rose-100 dark:bg-rose-500/20 p-1.5 rounded-full shadow-sm z-10 hover:bg-rose-200 dark:hover:bg-rose-500/30 transition-colors"
          >
            <HeartIcon className="text-rose-600 dark:text-rose-400 h-5 w-5 fill-rose-600 dark:fill-rose-400" />
          </button>

          {/* Image */}
          <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden flex items-center justify-center bg-gradient-to-b from-muted to-accent">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Rating */}
          <div className="text-xs text-foreground font-semibold flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
            {product.rating} | {product.ratingCount}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-foreground line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{product.subtitle}</p>

          {/* Price */}
          <div className="text-sm font-semibold text-foreground mb-3">
            ₹{product.price.toLocaleString()}{' '}
            <span className="line-through text-xs text-muted-foreground ml-2">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="w-full gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
export default WishlistCard
