'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Heart, Share2, Star, RotateCcw, Plus, Minus,
  ChevronLeft, ChevronRight, TrendingUp, Check,
  Clock, Users, ShoppingCart
} from 'lucide-react'

interface ProductData {
  id: string;
  name: string;
  sellingPrice: number;
  mrp: number;
  description: string;
  shortDescription: string;
  avgRating: number;
  totalReviews: number;
  status: string;
  stockStatus: string;
  brand: string;
  sku: string;
  tags: string[];
  weight: number;
  returnPeriodDays: number;
}

interface ColorOption {
  name: string;
  value: string;
  available: boolean;
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const [isReserving, setIsReserving] = useState(false)
  
  // Mock data for demonstration
  const displayData: ProductData = {
    id: 'veh_001',
    name: '2022 Hyundai Creta SX (O) Turbo',
    sellingPrice: 1725000,
    mrp: 1899000,
    description: 'Velaire-certified Creta with panoramic roof, Bose audio, ventilated seats, and a spotless service record. Includes complimentary ceramic coating, zero-dep insurance, and Vault Shield coverage for 2 years / 40,000 km.',
    shortDescription: '18,000 km • Turbo Petrol AT • Single owner',
    avgRating: 4.9,
    totalReviews: 865,
    status: 'ACTIVE',
    stockStatus: 'IN_STOCK',
    brand: 'Hyundai Velaire Select',
    sku: 'DRP-CRETA-2022-SXO',
    tags: ['turbo', 'automatic', 'sunroof', 'ADAS'],
    weight: 1280,
    returnPeriodDays: 7
  }

  const productImages: string[] = [
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=1600&q=80'
  ]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Navy')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  type SectionType = 'description' | 'specifications' | 'service';

  interface ExpandedSections {
    description: boolean;
    specifications: boolean;
    service: boolean;
  }

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    description: false,
    specifications: false,
    service: false
  })

  const sizes: string[] = ['Vault Standard', 'Vault Plus', 'Vault Signature']
  const colors: ColorOption[] = [
    { name: 'Polar White', value: '#f8f8f8', available: true },
    { name: 'Titan Grey', value: '#5f646a', available: true },
    { name: 'Deep Forest', value: '#003d2b', available: true },
    { name: 'Phantom Black', value: '#0d0d0d', available: false },
    { name: 'Lava Orange', value: '#ff5300', available: true }
  ]

  const discount = Math.round(((displayData.mrp - displayData.sellingPrice) / displayData.mrp) * 100)

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    )
  }

  const toggleSection = (section: SectionType) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
  }

  const ExpandableSection = ({ title, children, isExpanded, onToggle }: ExpandableSectionProps) => (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
          <Plus className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="p-4 pt-0 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Product Images */}
          <div className=" relative space-y-6">
            <div className="  group">
              <div className="relative  w-full h-[400px] md:h-[500px] lg:h-[500px] bg-gradient-to-br from-[#E0DCDC] to-[#BABABA] rounded-3xl overflow-hidden max-w-xl ">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={displayData.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute  right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-30 h-30 rounded-xl overflow-hidden bg-gray-100 transition-all ${selectedImageIndex === index
                    ? 'border-blue-500 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Product Details */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-3">
              <div className='flex justify-between'>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm  rounded-full">
                    Velaire Certified
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm  rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Ready for delivery
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all ${isWishlisted
                      ? 'bg-red-50 text-red-500 hover:bg-red-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <h1 className="text-md lg:text-xl font-bold text-gray-900 leading-tight mb-2">
                  {displayData.name}
                </h1>
                <p className="text-md lg:text-sm text-gray-500">{displayData.shortDescription}</p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-green-50 text-sm px-3 py-2 rounded-lg">
                  <Star className="w-4 h-4 fill-green-500 text-green-500" />
                  <span className="font-semibold text-green-700">{displayData.avgRating}</span>
                </div>
                <div className="text-gray-600 ">
                  <span className="text-sm">{displayData.totalReviews.toLocaleString()}</span> reviews
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>

            {/* Enhanced Pricing */}
            <div className="">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">₹{formatPrice(displayData.sellingPrice)}</span>
                <span className="text-md text-gray-500 line-through">₹{formatPrice(displayData.mrp)}</span>
                <span className="bg-tertiary text-white px-3 py-1 rounded-full text-xs">
                  {discount}% OFF
                </span>
              </div>
              <p className="text-green-600 text-sm">✓ Includes RTO transfer, detailing, and 1-year insurance</p>
              <p className="text-gray-600 text-sm mt-1">
                Save ₹{formatPrice(displayData.mrp - displayData.sellingPrice)} vs. showroom pricing
              </p>
            </div>
            <div className="prose prose-sm max-w-none border-none text-gray-700 text-sm mt-3">
              <p>{displayData.description}</p>
              <ul className="mt-4 space-y-2">
                <li>• 210+ point inspection with Vault Shield certification</li>
                <li>• Full service history, zero insurance claims, and single-owner profile</li>
                <li>• Complimented with complimentary ceramic coating and interior deep clean</li>
                <li>• Finance partners from 8.25% APR with quick approvals</li>
                <li>• Concierge delivery with personalized handover experience</li>
              </ul>
            </div>
            <Separator className='dark:bg-gray-200' />
            {/* Color Selection */}
            <div className="space-y-2">
              <h3 className="text-base font-normal text-gray-500 mb-4">Exterior Colors</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`relative flex items-center gap-2 px-2 py-1 rounded-xl text-xs border transition-all 
    ${selectedColor === color.name
                        ? 'border-blue-400 bg-blue-100 text-blue-600'
                        : color.available
                          ? 'border-gray-400 bg-gray-100 text-gray-700 hover:border-orange-300'
                          : 'border-gray-100 bg-gray-50 text-gray-400 opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border border-gray-300 ${color.name === 'White' ? 'border-gray-400' : ''
                        }`}
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="font-medium">{color.name}</span>

                    {!color.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-gray-400 rotate-45"></div>
                      </div>
                    )}
                  </button>

                ))}
              </div>
            </div>
            <Separator className=' dark:bg-gray-200' />
            {/* Size Selection */}
            <div className="space-y-2">
              <h3 className="text-base font-normal text-gray-500 mb-4">Select Warranty Plan</h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${selectedSize === size
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

            </div>
            <Separator className='dark:bg-gray-200' />
            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-normal text-gray-500 mb-4">Reservation Slots</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-gray-100 rounded-xl">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors dark:text-gray-700"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold min-w-[60px] text-center dark:text-gray-700">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors dark:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Booking Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{formatPrice(displayData.sellingPrice * quantity)}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  className="flex-1 bg-secondary text-white hover:bg-gray-900 rounded-full text-base py-4 sm:py-5 font-medium transition-colors gap-2"
                  onClick={async () => {
                    setIsReserving(true)
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    setIsReserving(false)
                    router.push('/cart')
                  }}
                  disabled={isReserving}
                >
                  {isReserving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  className="flex-1 bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white rounded-full text-base py-4 sm:py-5 font-medium transition-colors"
                  onClick={() => router.push('/contact')}
                >
                  Talk to Advisor
                </Button>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              <ExpandableSection
                title="Vehicle Specifications"
                isExpanded={expandedSections.specifications}
                onToggle={() => toggleSection('specifications')}
              >
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-sm mt-3">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">VIN</span>
                      <span className="font-medium">{displayData.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand / Model</span>
                      <span className="font-medium">{displayData.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel & Transmission</span>
                      <span className="font-medium">Turbo Petrol • 7-speed DCT</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mileage</span>
                      <span className="font-medium">18.2 km/l (ARAI)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Odometer</span>
                      <span className="font-medium">{displayData.weight.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty</span>
                      <span className="font-medium">Vault Shield 24m / 40,000 km</span>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection
                title="Delivery & Assurance"
                isExpanded={expandedSections.service}
                onToggle={() => toggleSection('service')}
              >
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3 mt-4">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Concierge Delivery</p>
                      <p className="text-gray-600">Doorstep handover with paperwork completion and detailed vehicle walkthrough.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">7-Day Exchange</p>
                      <p className="text-gray-600">{displayData.returnPeriodDays}-day / 500 km “no-questions” exchange program.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Ownership Support</p>
                      <p className="text-gray-600">Dedicated Velaire advisor for finance, insurance, and service bookings.</p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}