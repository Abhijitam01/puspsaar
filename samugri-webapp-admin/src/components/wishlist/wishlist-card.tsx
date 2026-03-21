'use client'

import { HeartIcon, Star } from 'lucide-react'
import React from 'react'

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

export const WishlistCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative bg-gray-50 rounded-sm">
      <div className="bg-white rounded-sm p-2 hover:shadow-md transition relative">
        {/* Discount Tag */}
        <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded-tr-md rounded-bl-md z-10">
          {product.discount}
        </div>

        {/* Image */}
        <div className="relative w-full h-64 mb-3 rounded-md overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
          <img src={product.image} alt={product.name} className="h-full object-contain" />
        </div>

        {/* Rating */}
        <div className="text-xs text-gray-700 font-semibold flex items-center gap-1 mb-1 relative">
          <Star className="h-4 w-4 text-green-600 fill-green-600" />
          {product.rating} | {product.ratingCount}
          <div className="absolute right-2  bg-rose-100 p-1.5 rounded-full shadow-sm">
            <HeartIcon className="text-rose-600 h-5 w-5" />
          </div>

        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-gray-800">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-2">{product.subtitle}</p>

        {/* Price */}
        <div className="text-sm font-semibold text-gray-900">
          ₹{product.price}{' '}
          <span className="line-through text-xs text-gray-400 ml-2">₹{product.originalPrice}</span>
        </div>

        {/* Sizes */}
        {product.size && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.size.map((size, i) => (
              <span key={i} className="px-2 py-0.5 border border-gray-300 rounded text-xs text-gray-600">
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default WishlistCard

