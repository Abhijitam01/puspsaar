'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import WishlistCard from '@/components/wishlist/wishlist-card'
import { IProduct } from '@/components/product/productcard'

const initialWishlist: IProduct[] = [
  {
    id: 1,
    name: 'Oud Noir Extrait de Parfum',
    subtitle: 'Woody · Smoky · Dark Amber',
    price: 8500,
    originalPrice: 9500,
    discount: '11% OFF',
    rating: 4.7,
    ratingCount: '1.2k',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Rose Absolue Eau de Parfum',
    subtitle: 'Floral · Soft · Romantic',
    price: 6200,
    originalPrice: 7000,
    discount: '11% OFF',
    rating: 4.5,
    ratingCount: '840',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Santal Blanc Eau de Toilette',
    subtitle: 'Woody · Creamy · Warm',
    price: 4800,
    originalPrice: 5500,
    discount: '13% OFF',
    rating: 4.3,
    ratingCount: '520',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Amber Oud Concentrated',
    subtitle: 'Oriental · Spicy · Rich',
    price: 3200,
    originalPrice: 3800,
    discount: '16% OFF',
    rating: 4.5,
    ratingCount: '104',
    image: 'https://images.unsplash.com/photo-1590736969596-1c2b7ba4e0e3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Jasmine Attar Pure',
    subtitle: 'Floral · Fresh · Feminine',
    price: 2800,
    originalPrice: 3200,
    discount: '13% OFF',
    rating: 4.8,
    ratingCount: '312',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=900&q=80',
  },
]

export default function WishListPage() {
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>(initialWishlist)

  const handleRemove = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E0E0E0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-1">Puspsaar</p>
            <h1 className="text-3xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>My Wishlist</h1>
            <p className="text-[#6B6B6B] mt-1 text-sm">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <Link
            href="/product"
            className="border border-[#1C1C1C] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:bg-black hover:text-white transition-colors"
          >
            Browse Fragrances
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-32 border border-[#E0E0E0]">
            <Heart className="w-16 h-16 mx-auto text-[#E0E0E0] mb-6" />
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Your wishlist is empty
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-8">Save your favourite fragrances here</p>
            <Link
              href="/product"
              className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlistItems.map((product) => (
              <WishlistCard key={product.id} product={product} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
