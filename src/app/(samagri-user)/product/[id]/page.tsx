'use client'
import React, { useState } from 'react'
import { Star, Heart, Share2, ShoppingBag, ChevronLeft, ChevronRight, Check, Minus, Plus, Wind, Flower2, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IPerfumeProduct } from '@/model/product'
import ProductCard from '@/components/product/productcard'

function ProductDetailContent({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVolume, setSelectedVolume] = useState(product.volumes?.[0] ?? product.volume)
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
    toast.success(`${product.name} added to cart!`)
  }

  const volumes = product.volumes && product.volumes.length > 0 ? product.volumes : [product.volume].filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-black transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/product?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[#1C1C1C]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group aspect-square overflow-hidden bg-[#F5F5F5]">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-[#E32C2B] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                  {discount}% OFF
                </span>
              )}
              <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1">
                {product.concentration}
              </span>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => (i === 0 ? images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white border border-[#E0E0E0] text-[#1C1C1C] opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => (i === images.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white border border-[#E0E0E0] text-[#1C1C1C] opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-black' : 'border-[#E0E0E0] hover:border-[#ABABAB]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6B6B6B]">{product.brand}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 border transition-colors ${
                      isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-[#E0E0E0] text-[#6B6B6B] hover:text-black hover:border-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 border border-[#E0E0E0] text-[#6B6B6B] hover:text-black hover:border-black transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-2"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {product.name}
              </h1>
              <p className="text-[#6B6B6B] text-sm mb-4">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#FFAF00] text-[#FFAF00]' : 'text-[#E0E0E0]'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#1C1C1C]">{product.rating}</span>
                <span className="text-sm text-[#6B6B6B]">({product.ratingCount || '15+'} reviews)</span>
                <span className={`px-2.5 py-0.5 text-xs font-semibold ${
                  product.stock_quantity > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stock_quantity > 5 ? 'In Stock' : product.stock_quantity > 0 ? `Only ${product.stock_quantity} left` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="py-5 border-y border-[#E0E0E0]">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1C1C1C]">₹{product.price.toLocaleString()}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-[#ABABAB] line-through">₹{product.original_price.toLocaleString()}</span>
                    <span className="bg-[#E32C2B] text-white text-xs font-bold px-2 py-0.5">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[#6B6B6B] text-xs mt-1">Inclusive of all taxes. Free delivery on this order.</p>
            </div>

            {/* Description */}
            <p className="text-[#6B6B6B] text-sm leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="border border-[#E0E0E0] px-3 py-1 text-xs text-[#6B6B6B]">{product.category}</span>
              <span className="border border-[#E0E0E0] px-3 py-1 text-xs text-[#6B6B6B]">{product.concentration}</span>
              {product.tags?.map((tag: string) => (
                <span key={tag} className="border border-[#E0E0E0] px-3 py-1 text-xs text-[#6B6B6B]">{tag}</span>
              ))}
            </div>

            {/* Volume Selector */}
            {volumes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#1C1C1C] mb-3">Select Volume</h3>
                <div className="flex flex-wrap gap-2">
                  {volumes.map((vol: string) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-5 py-2 text-sm font-medium border transition-colors ${
                        selectedVolume === vol
                          ? 'bg-black text-white border-black'
                          : 'border-[#E0E0E0] text-[#6B6B6B] hover:border-black hover:text-black'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E0E0E0]">
                <button
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  className="p-3 hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-[#1C1C1C]" />
                </button>
                <span className="px-5 font-semibold text-[#1C1C1C] min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-[#F5F5F5] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#1C1C1C]" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock_quantity <= 0}
                className="flex-1 bg-black text-white py-4 text-sm font-bold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#6B6B6B] pt-2">
              {['Authentic Guaranteed', 'Free Delivery', '7-Day Returns'].map(item => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fragrance Notes */}
        {product.fragrance_notes && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">Olfactory Profile</p>
              <h2
                className="text-3xl font-bold text-[#1C1C1C]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                The Scent Pyramid
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Wind, label: 'Top Notes', sub: 'The First Impression', notes: product.fragrance_notes.top, color: '#059669' },
                { icon: Flower2, label: 'Heart Notes', sub: 'The Soul of Essence', notes: product.fragrance_notes.middle, color: '#e11d48' },
                { icon: Zap, label: 'Base Notes', sub: 'The Lasting Memory', notes: product.fragrance_notes.base, color: '#d97706' },
              ].map(({ icon: Icon, label, sub, notes, color }) => (
                <div key={label} className="border border-[#E0E0E0] p-8 text-center">
                  <div className="w-14 h-14 mx-auto border border-[#E0E0E0] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#1C1C1C] mb-1">{label}</h3>
                  <p className="text-[10px] text-[#6B6B6B] uppercase tracking-widest mb-6">{sub}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {notes?.map((note: string) => (
                      <span key={note} className="border border-[#E0E0E0] text-[#1C1C1C] text-xs px-3 py-1.5">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pb-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">You May Also Like</p>
                <h2
                  className="text-2xl font-bold text-[#1C1C1C]"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  Related Fragrances
                </h2>
              </div>
              <Link
                href={`/product?category=${product.category}`}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] underline underline-offset-4 hover:text-[#6B6B6B] transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`/api/products/${params.id}?related=true`);
        const data = await response.json();
        if (data.product) {
          // Normalize camelCase if necessary, though Drizzle does this
          setProduct(data.product);
          if (data.related) setRelatedProducts(data.related);
        }
      } catch (error) {
        console.error('Failed to load product data:', error);
      }
      setIsLoading(false);
    }
    loadData()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E0E0E0] border-t-black animate-spin" />
      </div>
    )
  }

  if (!product && !isLoading) return notFound()

  // Update snake_case to camelCase in the content component call or inner logic
  // Based on the schema created earlier:
  // stockQuantity, originalPrice, fragranceNotes
  
  return (
    <ProductDetailContent 
      product={{
        ...product,
        stock_quantity: product.stockQuantity,
        original_price: product.originalPrice,
        fragrance_notes: product.fragranceNotes
      }} 
      relatedProducts={relatedProducts.map(rp => ({
        ...rp,
        stock_quantity: rp.stockQuantity,
        original_price: rp.originalPrice,
        fragrance_notes: rp.fragranceNotes
      }))} 
    />
  )
}
