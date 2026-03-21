'use client'

import { motion } from 'framer-motion'
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free shipping on all orders above ₹999',
    gradient: 'from-amber-500/20 to-yellow-600/10',
    iconColor: '#C6A969',
  },
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Every fragrance is certified genuine',
    gradient: 'from-green-500/20 to-emerald-600/10',
    iconColor: '#6ee7b7',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy',
    gradient: 'from-blue-500/20 to-indigo-600/10',
    iconColor: '#93c5fd',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert fragrance consultants always ready',
    gradient: 'from-purple-500/20 to-violet-600/10',
    iconColor: '#c4b5fd',
  },
]

export default function TrustSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${f.gradient} border border-border rounded-2xl p-5 text-center card-hover`}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${f.iconColor}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: f.iconColor }} />
              </div>
              <h3 className="text-foreground font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-xs">{f.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
