'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[85vh] items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center py-16 lg:py-24 lg:pr-12 order-2 lg:order-1"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6B6B6B] mb-6">
              Premium Fragrances
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1C1C1C] leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Discover<br />
              <span className="italic font-normal">Your</span> Scent
            </h1>
            <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed max-w-md mb-10">
              Middle Eastern-quality perfumes, attars, and gifting sets — crafted for those who know the language of fragrance.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/product"
                className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/collections/gifting"
                className="border border-[#1C1C1C] text-[#1C1C1C] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] hover:text-white transition-colors"
              >
                View Gifting Sets
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-12 pt-8 border-t border-[#E0E0E0]">
              {[
                { value: '500+', label: 'Fragrances' },
                { value: '50k+', label: 'Happy Customers' },
                { value: '100%', label: 'Authentic' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-[#1C1C1C]">{stat.value}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 h-[50vw] lg:h-full min-h-[320px] lg:min-h-[85vh]"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1200&q=80"
              alt="Premium Fragrances — Puspsaar"
              className="w-full h-full object-cover"
            />
            {/* Promo badge */}
            <div className="absolute bottom-8 left-8 bg-black text-white px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">Limited Offer</p>
              <p className="text-sm font-bold uppercase tracking-wider">Buy 2 Get 1 Free</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
