import { useState, useMemo, Suspense, useEffect } from 'react';
import { IPerfumeProduct } from '@/model/product';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ProductCard from '@/components/product/productcard';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
  const router = useRouter();
  
  // URL-driven states
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activeConcentration, setActiveConcentration] = useState('All');
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<IPerfumeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Sync state when URL params change (e.g. user clicks Nav links)
  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(queryParam);
  }, [categoryParam, queryParam]);

  // Helper to update URL without full reload
  const updateFilters = (newCategory: string, newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory !== 'All') params.set('category', newCategory);
    else params.delete('category');
    
    if (newQuery) params.set('q', newQuery);
    else params.delete('q');

    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
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

  const heroConfig = {
    'All': { title: 'Discovery Store', subtitle: 'Explore our curated selection of fine fragrances.' },
    'Men': { title: 'Pour Homme', subtitle: 'Bold, aromatic, and sophisticated essences.' },
    'Women': { title: 'Pour Femme', subtitle: 'Radiant, elegant, and timeless bouquets.' },
    'Unisex': { title: 'The Shared Archive', subtitle: 'Fluid scents that transcend boundaries.' }
  }[activeCategory] || { title: 'Discovery Store', subtitle: 'Explore our curated selection of fine fragrances.' };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80"
            alt="Perfume collection"
            className="w-full h-full object-cover opacity-[0.03] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-background" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeCategory}
            >
              <span className="inline-block px-5 py-2 rounded-full bg-[#C6A969]/10 text-[#C6A969] text-[10px] font-bold uppercase tracking-[0.4em] mb-8 border border-[#C6A969]/20">
                Puspsaar {activeCategory !== 'All' ? activeCategory : 'Archive'}
              </span>
              <h1 className="text-5xl sm:text-8xl font-light text-foreground mb-8 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                {heroConfig.title}
              </h1>
              <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto font-serif italic opacity-70">
                {heroConfig.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Search & Sort Container */}
          <div className="bg-card/30 backdrop-blur-3xl rounded-[2.5rem] p-4 sm:p-6 border border-white/5 max-w-4xl mx-auto shadow-2xl mt-12">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-[#C6A969] transition-colors" />
                <input
                  type="text"
                  placeholder="Find your signature scent..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    updateFilters(activeCategory, e.target.value);
                  }}
                  className="w-full bg-muted/40 border border-white/5 rounded-2xl py-4 px-6 pl-14 text-foreground placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#C6A969]/30 transition-all text-sm"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); updateFilters(activeCategory, ''); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:text-[#C6A969]">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-muted/40 border border-white/5 rounded-2xl py-4 sm:py-0 px-8 h-full text-foreground focus:outline-none focus:ring-1 focus:ring-[#C6A969]/30 text-[10px] cursor-pointer min-w-[220px] font-bold uppercase tracking-[0.2em]"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value} className="bg-[#0F0F0F]">{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[73px] z-40 w-full border-y border-white/5 bg-background/80 backdrop-blur-3xl py-4 mb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mr-2">Category:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); updateFilters(cat, searchQuery); }}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#C6A969] text-black shadow-lg shadow-[#C6A969]/20'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="w-px h-6 bg-white/10 mx-4 hidden lg:block" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mr-2">Grade:</span>
              {concentrations.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveConcentration(c)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeConcentration === c
                      ? 'bg-white text-black'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest tabular-nums">
                {filteredProducts.length} fragrances
              </span>
              <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#C6A969] text-black' : 'text-white/40 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#C6A969] text-black' : 'text-white/40 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <div className="w-16 h-16 rounded-full border border-[#C6A969]/10 border-t-[#C6A969] animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C6A969] animate-pulse">Consulting the Archive</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ProductCard product={product as any} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-40 bg-[#0F0F0F] rounded-[4rem] border border-white/5"
          >
            <SlidersHorizontal className="w-20 h-20 text-white/5 mx-auto mb-8" />
            <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Archive Exhausted</h3>
            <p className="text-white/40 text-base mb-12 max-w-md mx-auto font-serif italic">We couldn't find any essences matching your current search criteria. Try resetting the discovery filters.</p>
            <button
              onClick={() => { setActiveCategory('All'); updateFilters('All', ''); setActiveConcentration('All'); }}
              className="px-12 py-5 rounded-full bg-white text-black hover:bg-[#C6A969] transition-all text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl"
            >
              Reset Archive
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border border-[#C6A969]/10 border-t-[#C6A969] animate-spin" /></div>}>
      <ProductPageContent />
    </Suspense>
  )
}
