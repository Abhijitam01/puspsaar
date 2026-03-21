'use client'

import React from 'react'

import WishlistCard from '@/components/wishlist/wishlist-card'
import { IProduct } from '@/components/product/productcard'


export default function WishListPage() {
  const wishlistItems: IProduct[] = [
    {
      id: 1,
      name: 'Premium Brass Diya',
      subtitle: 'Handcrafted traditional diya for daily worship',
      price: 249,
      originalPrice: 399,
      discount: '38% OFF',
      rating: 4.7,
      ratingCount: '1.2k',
     image: 'https://villagedecor.in/cdn/shop/files/Offer_Image_30.png?v=1758358708&width=2048',
      size: ['Small', 'Medium', 'Large']
    },
    {
    id: 2,
    name: 'Diwali',
    subtitle: 'Festive decoration set for Diwali',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    size: ['S', 'M', 'L', 'XL', 'XXl'],
    image: 'https://utsavcollection.com/cdn/shop/files/1.2WarmwhitesteadyLEDDiyaLights.jpg?v=1726558791',
  },
    {
    id: 3,
    name: 'Pooja Thali',
    subtitle: 'Brass thali set for rituals',
    price: 417,
    originalPrice: 1099,
    discount: '62% OFF',
    rating: 4.3,
    ratingCount: '4.5k',
    size: ['S', 'M', 'XL', 'XXl'],
    image: 'https://jainartvilla.in/cdn/shop/files/Brass-puja-thali-10-pc.jpg?v=1717669017'
  },
    {
     id: 4,
    name: 'Sandalwood Dhoop & Sticks Set',
    subtitle: 'Aromatic sandalwood incense set',
    image: "https://ambicaagarbathies.com/cdn/shop/files/GOLDEN_SANDAL_DOOP-1.jpg?v=1736402622",
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    rating: 4.5,
    ratingCount: '104',
    size: ['M', 'L', 'XL', 'XXl'],
    },
   {
    id: 5,
    name: 'Chhat Pooja Chaup',
    subtitle: 'Traditional pooja decoration item',
    price: 650,
    originalPrice: 790,
    discount: '17% OFF',
    size: ['M', 'L', 'XL', 'XXl'],
    rating: 4.5,
    ratingCount: '104',
    image: 'https://m.media-amazon.com/images/I/71rmJxJevNL._UF350,350_QL80_.jpg',
  },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h2 className="text-2xl font-semibold text-gray-800">Your Wishlist</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Items in wishlist: <span className="font-medium text-gray-800">{wishlistItems.length}</span>
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
