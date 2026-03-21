'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const scentTypes = [
  {
    id: 'oud',
    label: 'Oud',
    emoji: '🪵',
    description: 'Rich & Deep',
    href: '/product?smell=oud',
    bg: '#1C1C1C',
    text: '#FFFFFF',
  },
  {
    id: 'floral',
    label: 'Floral',
    emoji: '🌸',
    description: 'Fresh & Romantic',
    href: '/product?smell=floral',
    bg: '#FFF0F5',
    text: '#1C1C1C',
  },
  {
    id: 'woody',
    label: 'Woody',
    emoji: '🌲',
    description: 'Earthy & Warm',
    href: '/product?smell=woody',
    bg: '#F5F0E8',
    text: '#1C1C1C',
  },
  {
    id: 'fresh',
    label: 'Fresh',
    emoji: '🌊',
    description: 'Clean & Crisp',
    href: '/product?smell=fresh',
    bg: '#EBF5FF',
    text: '#1C1C1C',
  },
  {
    id: 'citrus',
    label: 'Citrus',
    emoji: '🍋',
    description: 'Bright & Zesty',
    href: '/product?smell=citrus',
    bg: '#FFFBE6',
    text: '#1C1C1C',
  },
  {
    id: 'musk',
    label: 'Musk',
    emoji: '✨',
    description: 'Soft & Sensual',
    href: '/product?smell=musk',
    bg: '#F5F0FF',
    text: '#1C1C1C',
  },
]

export default function SmellBrowse() {
  return (
    <section className="w-full">
      <div className="text-center mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">
          Find Your Fragrance
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#1C1C1C]"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Browse by Scent
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {scentTypes.map((scent, i) => (
          <motion.div
            key={scent.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link href={scent.href} className="group block">
              <div
                className="aspect-square flex flex-col items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-y-1"
                style={{ backgroundColor: scent.bg }}
              >
                <span className="text-3xl">{scent.emoji}</span>
                <div className="text-center px-2">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.1em]"
                    style={{ color: scent.text }}
                  >
                    {scent.label}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 opacity-70"
                    style={{ color: scent.text }}
                  >
                    {scent.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
