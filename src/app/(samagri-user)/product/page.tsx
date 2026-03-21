'use client';

import { useState, useMemo, Suspense } from 'react';
import { perfumeProducts } from '@/data/perfume-data';
import { IPerfumeProduct } from '@/model/product';
import { Heart, Search, Grid, List, Star, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

const categories = ['All', 'Men', 'Women', 'Unisex'];
const concentrations = ['All', 'EDP', 'EDT', 'Parfum', 'EDC'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

function ProductPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeConcentration, setActiveConcentration] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const addItem = useCartStore(s => s.addItem);
  
  const [products, setProducts] = useState<IPerfumeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setProducts(data as IPerfumeProduct[]);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, [supabase]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeConcentration !== 'All') {
      result = result.filter(p => p.concentration === activeConcentration);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [products, activeCategory, activeConcentration, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80"
            alt="Perfume collection"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-3">Puspsaar Collection</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Explore Our Fragrances
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Discover {products.length}+ premium perfumes from the world's finest houses
            </p>
          </div>

          {/* Search */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-4 border border-border max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, brand, note..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl py-3 px-4 pl-11 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60 text-sm"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-muted border border-border rounded-xl py-3 px-4 pr-8 text-foreground focus:outline-none focus:border-[#C6A969]/60 text-sm cursor-pointer min-w-[180px]"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="w-px bg-border mx-1 self-stretch" />
            {concentrations.map(c => (
              <button
                key={c}
                onClick={() => setActiveConcentration(c)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeConcentration === c
                    ? 'bg-[#C6A969] text-black font-semibold'
                    : 'bg-muted text-muted-foreground hover:bg-accent border border-border'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">{filteredProducts.length} fragrances</span>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-[#C6A969] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-semibold text-lg mb-2">No fragrances found</p>
            <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); setActiveConcentration('All'); }}
              className="px-6 py-2.5 rounded-full bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[#C6A969] border-t-transparent animate-spin" /></div>}>
      <ProductPageContent />
    </Suspense>
  )
}

function ProductCard({ product, viewMode }: { product: IPerfumeProduct; viewMode: 'grid' | 'list' }) {
  const addItem = useCartStore(s => s.addItem);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className={`group bg-card border border-border rounded-2xl overflow-hidden card-hover ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
      {/* Image */}
      <Link href={`/product/${product.id}`} className={`block ${viewMode === 'list' ? 'w-48 shrink-0' : ''}`}>
        <div className={`relative overflow-hidden bg-muted ${viewMode === 'list' ? 'h-full' : 'aspect-square'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#C6A969] text-black text-xs font-bold">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={e => { e.preventDefault(); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100"
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              addItem({ id: String(product.id), name: product.name, brand: product.brand, price: product.price, image: product.image, volume: product.volumes[0], category: product.category });
              toast.success(`${product.name} added to cart`);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium hover:bg-[#C6A969] hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingBag className="w-3 h-3" />
            Add to Cart
          </button>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs">
            <Star className="w-3 h-3 fill-[#C6A969] text-[#C6A969]" />
            {product.rating}
          </div>
        </div>
      </Link>

      {/* Info */}
      <Link href={`/product/${product.id}`} className="flex-1 min-w-0">
        <div className="p-4">
          <p className="text-[#C6A969] text-xs font-semibold mb-0.5">{product.brand}</p>
          <h3 className="font-semibold text-foreground text-base mb-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{product.subtitle}</p>

          {/* Notes preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.fragranceNotes.top.slice(0, 2).map(n => (
              <span key={n} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs border border-border">
                {n}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-foreground font-bold text-lg">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-xs line-through ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border">
              {product.concentration}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
