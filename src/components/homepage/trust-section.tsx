'use client'

import { motion } from 'framer-motion'
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free shipping on all orders above ₹999',
  },
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Every fragrance is certified genuine',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert fragrance consultants always ready',
  },
]

export default function TrustSection() {
  return (
    <section className="w-full border-y border-[#E0E0E0] py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 border border-[#E0E0E0] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1C1C1C]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1C1C] mb-1">{f.title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
