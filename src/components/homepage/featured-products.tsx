'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { IPerfumeProduct } from '@/model/product';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IPerfumeProduct[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function loadFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('price', { ascending: false }) // e.g. show highest price first as premium
        .limit(4);
      if (data) setProducts(data as IPerfumeProduct[]);
    }
    loadFeatured();
  }, [supabase]);

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[#C6A969] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4">Curated Collection</p>
          <h2 className="text-3xl md:text-5xl font-normal text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
            The Premium Selection
          </h2>
          <div className="mt-6 w-12 h-px bg-[#C6A969]/50 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center cursor-pointer"
            >
              <Link href={`/product/${product.id}`} className="w-full">
                {/* Minimalist Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8E5DE] dark:bg-[#1A1A1A] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>
                
                {/* Ultra-minimal info */}
                <div className="text-center w-full px-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6A969] mb-2">{product.brand}</p>
                  <h3 className="text-sm md:text-base font-medium text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className="text-sm text-foreground">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <Link 
            href="/product" 
            className="group flex items-center gap-4 text-xs tracking-widest uppercase text-foreground hover:text-[#C6A969] transition-colors"
          >
            Explore the full collection
            <div className="w-8 h-px bg-foreground group-hover:bg-[#C6A969] transition-colors"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
