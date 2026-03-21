'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
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
        .order('price', { ascending: false })
        .limit(4);
      if (data) setProducts(data as IPerfumeProduct[]);
    }
    loadFeatured();
  }, [supabase]);

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">Handpicked for You</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Featured Fragrances
          </h2>
        </div>
        <Link
          href="/product"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1C1C1C] underline underline-offset-4 hover:text-[#6B6B6B] transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group"
          >
            <Link href={`/product/${product.id}`} className="block">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Wishlist */}
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F5F5F5]"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="w-4 h-4 text-[#1C1C1C]" />
                </button>
                {/* Quick add */}
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-3 text-[11px] font-bold uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  Quick Add
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">{product.brand}</p>
                <h3 className="text-sm font-medium text-[#1C1C1C] mb-2 leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-[#1C1C1C]">₹{product.price.toLocaleString()}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
