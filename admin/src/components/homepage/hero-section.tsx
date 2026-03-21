'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const heroSlides = [
  {
    id: 1,
    title: "Complete Pooja Kits",
    subtitle: "Everything you need for a perfect pooja",
    description: "Choose from ready-to-use pooja kits for all festivals and rituals",
    image: "https://thumbs.dreamstime.com/b/traditional-pooja-items-karwa-chauth-ai-generated-karwa-chauth-pooja-items-red-fabric-background-400332281.jpg",
    cta: "Shop Kits",
    badge: "New Arrival",
    stats: { rating: 4.9, reviews: "1.2k", customers: "8k+" }
  },
  {
    id: 2,
    title: "Diya & Candle Collection",
    subtitle: "Light up your celebrations",
    description: "Decorative and traditional diyas for Diwali, Chhath, and other festivals",
    image: "https://www.distacart.com/cdn/shop/articles/Web_blog_Essential_Pooja_Samugri-229065_ecd013f1-2018-4f4b-99d5-5ec14e29f70a.jpg?v=1752574226",
    cta: "Shop Diyas",
    badge: "50% OFF",
    stats: { rating: 4.8, reviews: "2k", customers: "12k+" }
  },
  {
    id: 3,
    title: "Incense & Dhoop Sticks",
    subtitle: "Fill your home with fragrance",
    description: "Premium incense sticks and dhoop for all your pooja and meditation needs",
    image: "https://shop.99pandit.com/public/img/uploads/media/8011861757773711.png",
    cta: "Shop Incense",
    badge: "Best Seller",
    stats: { rating: 4.7, reviews: "1.5k", customers: "10k+" }
  },
  {
    id: 4,
    title: "Pooja Thali Sets",
    subtitle: "Elegant and traditional",
    description: "Complete pooja thali sets with bell, kalash, and other essentials",
    image: "https://thumbs.dreamstime.com/b/traditional-pooja-items-karwa-chauth-ai-generated-karwa-chauth-pooja-items-red-fabric-background-400332281.jpg",
    cta: "Shop Thali Sets",
    badge: "Limited Offer",
    stats: { rating: 4.9, reviews: "1.8k", customers: "9k+" }
  }
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[450px] lg:h-[500px] xl:h-[650px] rounded-xl overflow-hidden shadow-md">

      {/* Mobile Image */}
      <div className="absolute inset-0 sm:hidden ">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-fill"
        />
        <div className="absolute inset-0 !bg-gradient-to-r !from-black/70 !via-black/40 !to-transparent" />
      </div>

      {/* Desktop Image */}
      <div className="absolute inset-0 hidden sm:block">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 !bg-gradient-to-r !from-black/70 via-black/40 !to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <Badge className="hidden sm:inline-block  bg-orange-500 border-2 text-primary-foreground text-[10px] px-2 sm:px-3 py-1">
              {currentSlideData.badge}
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {currentSlideData.title}
            </h1>
            <h2 className="text-sm sm:text-lg md:text-2xl text-white/90 mb-3 font-medium">
              {currentSlideData.subtitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-md mb-2 text-white/80  max-w-md">
              {currentSlideData.description}
            </p>

            <div className="flex items-center gap-4 sm:gap-6 mb-6">
              <div className="flex items-center gap-2 text-yellow-500">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-warning fill-current"
                    />
                  ))}
                </div>
                <span className="text-white/80 text-xs sm:text-sm font-medium">
                  {currentSlideData.stats.rating} ({currentSlideData.stats.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{currentSlideData.stats.customers} customers</span>
              </div>
            </div>

            <div className="flex  sm:flex-row gap-3 sm:gap-5">
              <Button
                size="sm"
                className="
                  text-primary-foreground dark:text-orange-400
                   border p-4
                  rounded-full
                  text-sm sm:text-lg"
                onClick={() => (window.location.href = "/products")}
              >
                {currentSlideData.cta}
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="
                
                 border  p-4
                  rounded-full
                  text-sm sm:text-lg"
                onClick={() => (window.location.href = "/products")}
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
      >
        {isAutoPlaying ? (
          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Play className="h-3 w-3 sm:h-4 sm:w-4" />
        )}
      </button>
    </div>
  )
}