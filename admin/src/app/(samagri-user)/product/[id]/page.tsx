'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Heart, Share2, Star,RotateCcw, Plus, Minus,
   ChevronLeft, ChevronRight, TrendingUp, Check,
 Clock, Users
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
  // Mock data for demonstration
  const displayData: ProductData = {
    id: '1',
    name: 'Annaprashan Baby Boy Topor (A10)',
    sellingPrice: 799,
    mrp: 1099,
    description: 'A complete pooja Samugri kit containing essential items like diya, agarbatti, roli, chawal, kalash, coconut, and more. Perfect for all religious ceremonies, daily worship, and festive occasions. Carefully packed with devotion and purity in mind.',
    shortDescription: 'Complete pooja kit with all essentials',
    avgRating: 4.8,
    totalReviews: 865,
    status: 'ACTIVE',
    stockStatus: 'IN_STOCK',
    brand: 'Divya Pooja Essentials',
    sku: 'DPK-001',
    tags: ['pooja', 'kit', 'festival', 'hindu rituals'],
    weight: 500,
    returnPeriodDays: 7
  }

  const productImages: string[] = [
    'https://pujadukaan.com/wp-content/uploads/2025/04/11.jpg',
    'https://pujadukaan.com/wp-content/uploads/2025/04/12.jpg',
    'https://pujadukaan.com/wp-content/uploads/2025/01/Annaprashan-Baby-Boy-Topor-A9.jpg',
    'https://m.media-amazon.com/images/I/71+u-OPo6iL._UF894,1000_QL80_.jpg'
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

  const sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors: ColorOption[] = [
    { name: 'Navy', value: '#1e3a8a', available: true },
    { name: 'Black', value: '#000000', available: true },
    { name: 'White', value: '#ffffff', available: true },
    { name: 'Gray', value: '#6b7280', available: false },
    { name: 'Forest', value: '#065f46', available: true }
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
                    {displayData.brand}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm  rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    In Stock
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
              <p className="text-green-600 text-sm">✓ Inclusive of all taxes</p>
              <p className="text-gray-600 text-sm mt-1">
                Save ₹{formatPrice(displayData.mrp - displayData.sellingPrice)} on this purchase
              </p>
            </div>
            <div className="prose prose-sm max-w-none border-none text-gray-700 text-sm mt-3">
                  <p>{displayData.description}</p>
                  <ul className="mt-4 space-y-2">
                    <li>• 100% organic cotton material</li>
                    <li>• Pre-shrunk and machine washable</li>
                    <li>• Comfortable regular fit</li>
                    <li>• Available in multiple colors and sizes</li>
                    <li>• Perfect for casual and semi-formal occasions</li>
                  </ul>
                </div>
            <Separator className='dark:bg-gray-200' />
            {/* Color Selection */}
            <div className="space-y-2">
              <h3 className="text-base font-normal text-gray-500 mb-4">Color</h3>
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
              <h3 className="text-base font-normal text-gray-500 mb-4">Choose Size</h3>
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
                <h3 className="text-base font-normal text-gray-500 mb-4">Quantity</h3>
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
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{formatPrice(displayData.sellingPrice * quantity)}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Buy Now Button */}
                <Button
                  className="flex-1 bg-secondary text-white hover:bg-gray-900 rounded-full text-base py-4 sm:py-5 font-medium transition-colors"
                  onClick={() => alert(`Added ${quantity} item(s) to cart!`)}
                >
                  Buy Now
                </Button>
                {/* Add to Cart Button */}
                <Button
                  className="flex-1 bg-secondary text-white hover:bg-gray-900 rounded-full text-base py-4 sm:py-5 font-medium transition-colors"
                  onClick={() => alert(`Added ${quantity} item(s) to cart!`)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              <ExpandableSection
                title="Product Specifications"
                isExpanded={expandedSections.specifications}
                onToggle={() => toggleSection('specifications')}
              >
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-sm mt-3">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-medium">{displayData.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">{displayData.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium">{displayData.weight}g</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">100% Cotton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care</span>
                      <span className="font-medium">Machine Wash</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin</span>
                      <span className="font-medium">Made in India</span>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection
                title="Shipping & Returns"
                isExpanded={expandedSections.service}
                onToggle={() => toggleSection('service')}
              >
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3 mt-4">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Fast Delivery</p>
                      <p className="text-gray-600">Get your order within 2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-gray-600">{displayData.returnPeriodDays} days return policy with free pickup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Customer Support</p>
                      <p className="text-gray-600">24/7 customer service available</p>
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