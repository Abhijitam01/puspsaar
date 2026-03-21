'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { IPerfumeProduct } from '@/model/product';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ProductCard from '@/components/product/productcard';

const categories = ['All', 'Men', 'Women', 'Unisex'];
const concentrations = ['All', 'EDP', 'EDT', 'Parfum', 'EDC'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

function ProductPageContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeConcentration, setActiveConcentration] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        setProducts(data as any[]);
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
        p.tags?.some(t => t.toLowerCase().includes(q))
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
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80"
            alt="Perfume collection"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#C6A969]/10 text-[#C6A969] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              The Puspsaar Archive
            </span>
            <h1 className="text-5xl sm:text-7xl font-light text-foreground mb-6 racking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
              Discovery Store
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-serif italic">
              Explore our curated selection of fine fragrances, crafted for the discerning individual.
            </p>
          </div>

          {/* Search & Sort */}
          <div className="bg-card/40 backdrop-blur-3xl rounded-3xl p-6 border border-border/50 max-w-4xl mx-auto shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-[#C6A969] transition-colors" />
                <input
                  type="text"
                  placeholder="Find your signature scent..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-muted/50 border border-border/50 rounded-2xl py-4 px-6 pl-14 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#C6A969]/20 transition-all text-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-muted/50 border border-border/50 rounded-2xl py-4 px-8 text-foreground focus:outline-none focus:ring-2 focus:ring-[#C6A969]/20 text-sm cursor-pointer min-w-[220px] font-bold uppercase tracking-widest text-[10px]"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
                  activeCategory === cat
                    ? 'bg-foreground text-background border-foreground shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]'
                    : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-[#C6A969]/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="w-[1px] h-8 bg-border/50 mx-2 hidden sm:block" />
            {concentrations.map(c => (
              <button
                key={c}
                onClick={() => setActiveConcentration(c)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
                  activeConcentration === c
                    ? 'bg-[#C6A969] text-black border-[#C6A969] shadow-[0_10px_20px_-5px_rgba(198,169,105,0.4)]'
                    : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-[#C6A969]/50 hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{filteredProducts.length} Results</span>
            <div className="flex items-center gap-2 bg-muted/30 rounded-xl p-1.5 border border-border/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-12 h-12 rounded-full border-2 border-[#C6A969]/20 border-t-[#C6A969] animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C6A969] animate-pulse">Filtering Essences</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
            <SlidersHorizontal className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="text-2xl font-light text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>No Fragrances Found</h3>
            <p className="text-muted-foreground text-sm mb-10 max-w-md mx-auto">We couldn't find any fragrances matching your current selection. Try broadening your discovery filters.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); setActiveConcentration('All'); }}
              className="px-10 py-4 rounded-full bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest shadow-xl"
            >
              Reset Archive
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#C6A969]/20 border-t-[#C6A969] animate-spin" /></div>}>
      <ProductPageContent />
    </Suspense>
  )
}
