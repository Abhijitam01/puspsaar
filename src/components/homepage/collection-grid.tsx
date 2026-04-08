'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'men',
    label: 'Men',
    description: 'Bold & Woody',
    href: '/collections/men',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women',
    label: 'Women',
    description: 'Floral & Elegant',
    href: '/collections/women',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffbb679e1c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gifting',
    label: 'Gifting',
    description: 'Sets & Combos',
    href: '/collections/gifting',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'attars',
    label: 'Attars',
    description: 'Pure & Traditional',
    href: '/collections/attars',
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'signature',
    label: 'Signature',
    description: 'Exclusive Range',
    href: '/collections/signature',
    image: 'https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=800&q=80',
  },
]

interface CollectionGridProps {
  settings?: {
    images?: string[];
  };
}

export default function CollectionGrid({ settings }: CollectionGridProps) {
  const dynamicCategories = categories.map((cat, index) => {
    if (settings?.images && settings.images[index]) {
      return { ...cat, image: settings.images[index] };
    }
    return cat;
  });

  return (

    <section className="w-full">
      <div className="text-center mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">Shop by Category</p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#1C1C1C]"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Our Collections
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {dynamicCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={cat.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] mb-3">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] group-hover:text-black transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
