'use client'

import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  { id: 'Men', label: 'Men', icon: '🌿', href: '/product?category=Men' },
  { id: 'Women', label: 'Women', icon: '🌸', href: '/product?category=Women' },
  { id: 'Unisex', label: 'Unisex', icon: '✨', href: '/product?category=Unisex' },
  { id: 'Luxury', label: 'Luxury', icon: '💎', href: '/product?tags=Oud,Luxury' },
]

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80',
    tagline: 'New Arrivals',
    headline: 'Find Your\nSignature Scent',
    sub: 'Curated luxury fragrances from the world\'s finest houses',
  },
  {
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Bestsellers',
    headline: 'Timeless\nElegance',
    sub: 'From fresh florals to deep ouds — a scent for every story',
  },
  {
    image: 'https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Exclusive Collection',
    headline: 'The Art of\nPerfumery',
    sub: 'Rare ingredients, masterful compositions, unforgettable impressions',
  },
]

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const current = heroSlides[activeSlide]

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Background Image with cross-fade */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </div>
      ))}

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C6A969] to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {/* Tagline pill */}
        <motion.div
          key={`tag-${activeSlide}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6A969]/20 border border-[#C6A969]/40 text-[#C6A969] text-xs tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3 h-3" />
          {current.tagline}
        </motion.div>

        {/* Headline */}
        <motion.h1
          key={`h1-${activeSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-tight whitespace-pre-line"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
        >
          {current.headline}
        </motion.h1>

        {/* Sub */}
        <motion.p
          key={`sub-${activeSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto"
        >
          {current.sub}
        </motion.p>

        {/* Search */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center max-w-xl mx-auto shadow-2xl border border-white/20 mb-10">
          <Search className="w-5 h-5 text-white/60 ml-3 shrink-0" />
          <input
            type="text"
            placeholder="Search perfumes, brands, notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && searchQuery) {
                window.location.href = `/product?q=${encodeURIComponent(searchQuery)}`
              }
            }}
            className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none text-sm"
          />
          <Link href={`/product${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}>
            <Button className="bg-[#C6A969] hover:bg-[#d4b87a] text-black rounded-xl px-6 py-2.5 font-medium text-sm shrink-0">
              Search
            </Button>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm hover:bg-white/20 hover:border-[#C6A969]/50 transition-all hover:scale-105"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeSlide ? 'w-8 h-2 bg-[#C6A969]' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
