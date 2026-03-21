'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Fragrances', value: '500+' },
  { label: 'Happy Customers', value: '50k+' },
  { label: 'Luxury Houses', value: '12+' },
]

export default function BrandStory() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
              alt="The Art of Perfumery — Puspsaar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Accent badge */}
          <div className="absolute -bottom-5 -right-5 bg-black text-white p-6">
            <p className="text-3xl font-bold">12+</p>
            <p className="text-xs text-white/70 mt-1 uppercase tracking-wider">Luxury Houses</p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-4">Our Story</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1C1C1C] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            The Art of<br />Perfumery
          </h2>
          <p className="text-[#6B6B6B] text-base mb-5 leading-relaxed">
            Puspsaar was born from a deep love of fragrance — the belief that a scent is more than a smell; it is a memory, an emotion, an identity. We bring you the world's finest perfumes, curated with passion and delivered with care.
          </p>
          <p className="text-[#6B6B6B] text-base mb-10 leading-relaxed">
            Every bottle in our collection is certified authentic, sourced directly from the world's most prestigious fragrance houses — from the ateliers of Paris to the oud souks of the Middle East.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-[#E0E0E0]">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-[#1C1C1C]">{s.value}</p>
                <p className="text-xs text-[#6B6B6B] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-block bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
          >
            Discover Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
