'use client'

import React from 'react'

import WishlistCard from '@/components/wishlist/wishlist-card'
import { IProduct } from '@/components/product/productcard'


export default function WishListPage() {
  const wishlistItems: IProduct[] = [
    {
      id: 1,
      name: '2022 Hyundai Creta SX (O) Turbo',
      subtitle: '18,000 km • Petrol AT • Panoramic roof',
      price: 1725000,
      originalPrice: 1899000,
      discount: '9% OFF',
      rating: 4.7,
      ratingCount: '1.2k',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
      size: ['Petrol', 'Automatic', 'Turbo']
    },
    {
      id: 2,
      name: '2021 Kia Seltos GTX+ DCT',
      subtitle: '27,500 km • Turbo petrol • ADAS retrofit',
      price: 1830000,
      originalPrice: 1990000,
      discount: '8% OFF',
      rating: 4.5,
      ratingCount: '104',
      size: ['Petrol', 'Automatic', 'Turbo'],
      image: 'https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      name: '2020 Tata Nexon EV XZ+',
      subtitle: '21,000 km • 40 kWh battery • Fast charger',
      price: 1520000,
      originalPrice: 1650000,
      discount: '7% OFF',
      rating: 4.3,
      ratingCount: '4.5k',
      size: ['Electric', 'Automatic', 'Fast Charge'],
      image: 'https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      name: '2019 Maruti Suzuki Swift AMT',
      subtitle: '38,500 km • Petrol AMT • Dual airbags',
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
      price: 615000,
      originalPrice: 725000,
      discount: '15% OFF',
      rating: 4.5,
      ratingCount: '104',
      size: ['Petrol', 'Automatic', 'Hatchback'],
    },
    {
      id: 5,
      name: '2020 Jeep Compass 4x4',
      subtitle: '31,500 km • Diesel AT • Trailhawk kit',
      price: 2249000,
      originalPrice: 2450000,
      discount: '8% OFF',
      size: ['Diesel', 'Automatic', '4x4'],
      rating: 4.8,
      ratingCount: '312',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h2 className="text-2xl font-semibold text-foreground">Your Wishlist</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Items in wishlist: <span className="font-medium text-foreground">{wishlistItems.length}</span>
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
