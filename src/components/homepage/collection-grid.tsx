'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'men',
    label: 'Men',
    description: 'Bold. Confident. Timeless.',
    href: '/product?category=Men',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-slate-900/80 to-slate-800/60',
    accent: '#7a8a9a',
  },
  {
    id: 'women',
    label: 'Women',
    description: 'Radiant. Elegant. Unforgettable.',
    href: '/product?category=Women',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffbb679e1c2?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-rose-900/70 to-pink-800/50',
    accent: '#d4a0b5',
  },
  {
    id: 'unisex',
    label: 'Unisex',
    description: 'Fluid. Modern. Effortless.',
    href: '/product?category=Unisex',
    image: 'https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/70 to-yellow-800/40',
    accent: '#C6A969',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    description: 'Rare. Opulent. Extraordinary.',
    href: '/product?tags=Oud,Luxury',
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-stone-900/80 to-stone-800/60',
    accent: '#B8943A',
  },
]

export default function CollectionGrid() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="text-center mb-10">
        <p className="text-[#C6A969] text-xs tracking-[0.3em] uppercase mb-3">Curated Collections</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={cat.href} className="group block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />

                {/* Gold shine on hover */}
                <div className="absolute inset-0 bg-[#C6A969]/0 group-hover:bg-[#C6A969]/10 transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-white text-2xl font-bold mb-1"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-white/70 text-xs mb-4">{cat.description}</p>
                  <div className="flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: cat.accent }}>
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
