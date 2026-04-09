'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { IPerfumeProduct } from '@/model/product'
import ProductCard from '@/components/product/productcard'
import TopNavbar from '@/components/user/navigation/top-header'
import { Footer } from '@/components/layout/footer'

const COLLECTION_CONFIG: Record<string, {
  title: string
  subtitle: string
  description: string
  category: string | null
  image: string
}> = {
  men: {
    title: "Men's Collection",
    subtitle: 'Bold. Confident. Timeless.',
    description: 'Explore our curated range of masculine fragrances — from woody ouds to fresh aquatics.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80',
  },
  women: {
    title: "Women's Collection",
    subtitle: 'Radiant. Elegant. Unforgettable.',
    description: 'Discover our feminine collection — floral bouquets, delicate musks, and warm oriental blends.',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffbb679e1c2?auto=format&fit=crop&w=2000&q=80',
  },
  gifting: {
    title: 'Gifting Sets',
    subtitle: 'The Perfect Gift for Every Occasion.',
    description: 'Beautifully curated fragrance sets, gift boxes, and combo packs for birthdays, anniversaries, and celebrations.',
    category: null,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=2000&q=80',
  },
  attars: {
    title: 'Attars',
    subtitle: 'The Purest Form of Fragrance.',
    description: 'Traditional concentrated perfume oils — long-lasting, alcohol-free, and deeply aromatic. Rooted in Middle Eastern heritage.',
    category: null,
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=2000&q=80',
  },
  signature: {
    title: 'Signature Collection',
    subtitle: 'Exclusively Ours.',
    description: 'Our in-house crafted signature range — unique blends you won\'t find anywhere else.',
    category: null,
    image: 'https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=2000&q=80',
  },
}

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
]

function CollectionPageContent({ slug }: { slug: string }) {
  const config = COLLECTION_CONFIG[slug]
  if (!config) notFound()

  const [products, setProducts] = useState<IPerfumeProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const url = config.category 
          ? `/api/products?category=${encodeURIComponent(config.category)}`
          : '/api/products';
        const response = await fetch(url);
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setProducts(data as IPerfumeProduct[]);
        }
      } catch (error) {
        console.error('Failed to fetch collection products:', error);
      }
      setIsLoading(false)
    }
    fetchProducts()
  }, [slug, config.category])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
    }
    return result
  }, [products, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Collection Hero */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={config.image}
          alt={config.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-white transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-white capitalize">{slug}</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {config.title}
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-lg">{config.subtitle}</p>
        </div>
      </section>

      {/* Description */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-b border-[#E0E0E0]">
        <p className="text-[#6B6B6B] text-sm max-w-2xl">{config.description}</p>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[73px] z-40 bg-white border-b border-[#E0E0E0] py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full border border-[#E0E0E0] py-2.5 px-4 pl-9 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#6B6B6B]" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-[#6B6B6B]">{filteredProducts.length} products</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-[#E0E0E0] py-2 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] focus:outline-none focus:border-black cursor-pointer bg-white"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 border-2 border-[#E0E0E0] border-t-black animate-spin" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">Loading...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product as any} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-32 border border-[#E0E0E0]">
            <SlidersHorizontal className="w-12 h-12 text-[#E0E0E0] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              No Products Found
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-8">Try adjusting your search or browse all products.</p>
            <Link
              href="/product"
              className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
            >
              Browse All
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

export default function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = React.use(props.params)
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E0E0E0] border-t-black animate-spin" />
      </div>
    }>
      <CollectionPageContent slug={params.slug} />
    </Suspense>
  )
}
