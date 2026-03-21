'use client'

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

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(queryParam);
  }, [categoryParam, queryParam]);

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
      if (!error && data) setProducts(data as IPerfumeProduct[]);
      setIsLoading(false);
    }
    fetchProducts();
  }, [supabase]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (activeConcentration !== 'All') result = result.filter(p => p.concentration === activeConcentration);
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
    <div className="min-h-screen bg-white pb-20">
      {/* Page Header */}
      <section className="border-b border-[#E0E0E0] py-10 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">
                Puspsaar
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold text-[#1C1C1C]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {activeCategory === 'All' ? 'All Fragrances' : activeCategory}
              </h1>
            </div>
            <p className="text-sm text-[#6B6B6B]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[var(--header-h,73px)] z-40 w-full border-b border-[#E0E0E0] bg-white py-3">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); updateFilters(activeCategory, e.target.value); }}
                className="w-full border border-[#E0E0E0] py-2.5 px-4 pl-9 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); updateFilters(activeCategory, ''); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-[#6B6B6B]" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); updateFilters(cat, searchQuery); }}
                  className={`px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors border ${
                    activeCategory === cat
                      ? 'bg-black text-white border-black'
                      : 'text-[#6B6B6B] border-[#E0E0E0] hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="w-px h-5 bg-[#E0E0E0] mx-1" />
              {concentrations.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveConcentration(c)}
                  className={`px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors border ${
                    activeConcentration === c
                      ? 'bg-black text-white border-black'
                      : 'text-[#6B6B6B] border-[#E0E0E0] hover:border-black hover:text-black'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Sort + View */}
            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-[#E0E0E0] py-2 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] focus:outline-none focus:border-black cursor-pointer bg-white"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="flex items-center border border-[#E0E0E0]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'text-[#6B6B6B] hover:text-black'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'text-[#6B6B6B] hover:text-black'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 border-2 border-[#E0E0E0] border-t-black animate-spin" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">Loading...</p>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
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
            <p className="text-[#6B6B6B] text-sm mb-8 max-w-md mx-auto">
              We couldn&apos;t find any fragrances matching your search. Try adjusting the filters.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); updateFilters('All', ''); setActiveConcentration('All'); }}
              className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E0E0E0] border-t-black animate-spin" />
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  )
}
