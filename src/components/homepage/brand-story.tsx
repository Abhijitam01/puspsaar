'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function BrandStory() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
              alt="Puspsaar — The Art of Perfumery"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -right-6 bg-[#C6A969] text-black p-6 rounded-2xl shadow-2xl">
            <p className="text-4xl font-bold">12+</p>
            <p className="text-xs font-medium opacity-80">Luxury Houses</p>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The Art of<br />Perfumery
          </h2>
          <p className="text-muted-foreground text-base mb-5 leading-relaxed">
            Puspsaar was born from a deep love of fragrance — the belief that a scent is more than
            a smell; it is a memory, an emotion, an identity. We bring you the world's finest
            perfumes, curated with passion and delivered with care.
          </p>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            Every bottle in our collection is certified authentic, sourced directly from the
            world's most prestigious fragrance houses — from the ateliers of Paris to the oud
            souks of the Middle East.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-border">
            {[
              { label: 'Fragrances', value: '500+' },
              { label: 'Happy Customers', value: '50k+' },
              { label: 'Luxury Brands', value: '12+' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <Link href="/about">
            <Button className="bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all px-8 py-3 rounded-full font-medium">
              Discover Our Story
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
