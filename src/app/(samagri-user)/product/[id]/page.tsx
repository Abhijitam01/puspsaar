'use client'
import React, { useState } from 'react'
import { Star, Heart, Share2, ShoppingBag, ChevronLeft, ChevronRight, Check, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cartStore'
import { perfumeProducts } from '@/data/perfume-data'
import { toast } from 'sonner'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { IPerfumeProduct } from '@/model/product'

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  React.useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('products').select('*').eq('id', params.id).single()
      if (data) {
        setProduct(data)
        // Also load some related items (same category)
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(4)
        if (related) setRelatedProducts(related)
      }
      setIsLoading(false)
    }
    loadData()
  }, [params.id, supabase])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[#C6A969] border-t-transparent animate-spin" /></div>
  }

  if (!product && !isLoading) return notFound()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVolume, setSelectedVolume] = useState(product.volumes[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  const handleAddToCart = async () => {
    setAddingToCart(true)
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: String(product.id),
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        volume: selectedVolume,
        category: product.category,
      })
    }
    await new Promise(r => setTimeout(r, 600))
    setAddingToCart(false)
    toast.success(`${product.name} (${selectedVolume}) added to cart!`)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-[#C6A969]">Home</Link>
          <span>/</span>
          <Link href="/product" className="hover:text-[#C6A969]">Shop</Link>
          <span>/</span>
          <Link href={`/product?category=${product.category}`} className="hover:text-[#C6A969]">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            <div className="relative group aspect-square rounded-3xl overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {discount && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C6A969] text-black text-xs font-bold">
                  {discount}% OFF
                </span>
              )}
              <span className="absolute top-4 right-16 px-3 py-1 rounded-full glass-panel text-foreground text-xs font-medium">
                {product.concentration}
              </span>
              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => (i === 0 ? images.length - 1 : i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => (i === images.length - 1 ? 0 : i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-[#C6A969]' : 'border-border hover:border-[#C6A969]/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Details ── */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#C6A969] text-sm font-semibold tracking-wide">{product.brand}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all ${isWishlisted ? 'bg-red-50 text-red-500' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted text-muted-foreground">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {product.name}
              </h1>
              <p className="text-muted-foreground text-sm mb-3">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#C6A969] text-[#C6A969]' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.ratingCount || '15+'} reviews)</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${product.stock_quantity > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                  {product.stock_quantity > 5 ? '✓ In Stock' : product.stock_quantity > 0 ? `Only ${product.stock_quantity} left` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">₹{product.original_price.toLocaleString()}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C6A969]/10 text-[#C6A969] text-sm font-semibold">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground text-xs mt-1">Inclusive of all taxes. Free delivery on this order.</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

            {/* Category + Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                {product.concentration}
              </span>
              {product.tags && product.tags.length > 0 && product.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* Volume Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Select Volume</h3>
              <div className="flex flex-wrap gap-3">
                {product.volumes && product.volumes.length > 0 ? product.volumes.map((vol: string) => (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                      selectedVolume === vol
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:border-[#C6A969] hover:text-foreground'
                    }`}
                  >
                    {vol}
                  </button>
                )) : (
                  <button
                    key={product.volume}
                    onClick={() => setSelectedVolume(product.volume)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                      selectedVolume === product.volume
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:border-[#C6A969] hover:text-foreground'
                    }`}
                  >
                    {product.volume}
                  </button>
                )}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-muted rounded-xl border border-border">
                <button
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  className="p-3 hover:bg-accent rounded-l-xl transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="px-5 font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-accent rounded-r-xl transition-colors"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock_quantity <= 0}
                className="flex-1 bg-foreground text-background hover:bg-[#C6A969] hover:text-black rounded-xl py-6 font-semibold text-base transition-all neon-glow"
              >
                {addingToCart ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                  </span>
                )}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              {['Authentic Guaranteed', 'Free Delivery', '7-Day Returns'].map(item => (
                <div key={item} className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#C6A969]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fragrance Notes Pyramid ── */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-2">Olfactory Profile</p>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
              Fragrance Notes
            </h2>
          </div>

          <div className="space-y-4">
            {/* Top Notes */}
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C6A969] to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20 flex items-center justify-center shrink-0 text-lg">
                  🌿
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">Top Notes</h3>
                    <span className="text-muted-foreground text-xs">· First impression (0–15 min)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.fragrance_notes?.top?.map((note: string) => (
                      <span key={note} className="px-3 py-1 rounded-full bg-muted text-foreground text-xs border border-border">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Notes */}
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C6A969]/60 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20 flex items-center justify-center shrink-0 text-lg">
                  🌸
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">Heart Notes</h3>
                    <span className="text-muted-foreground text-xs">· Soul of the fragrance (15 min–4 hrs)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.fragrance_notes?.middle?.map((note: string) => (
                      <span key={note} className="px-3 py-1 rounded-full bg-muted text-foreground text-xs border border-border">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Base Notes */}
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C6A969]/30 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20 flex items-center justify-center shrink-0 text-lg">
                  🪵
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">Base Notes</h3>
                    <span className="text-muted-foreground text-xs">· Lasting impression (4+ hrs)</span>
                  </div>
                    <div className="flex flex-wrap gap-2">
                    {product.fragrance_notes?.base?.map((note: string) => (
                      <span key={note} className="px-3 py-1 rounded-full bg-muted text-foreground text-xs border border-border">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-2">You May Also Like</p>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  Related Fragrances
                </h2>
              </div>
              <Link href={`/product?category=${product.category}`} className="text-sm text-muted-foreground hover:text-[#C6A969] transition-colors">
                View all {product.category} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={`/product/${rp.id}`} className="group block">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[#C6A969] text-xs font-medium mb-0.5">{rp.brand}</p>
                      <h3 className="text-foreground font-semibold text-sm line-clamp-1">{rp.name}</h3>
                      <p className="text-foreground font-bold text-sm mt-2">₹{rp.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}