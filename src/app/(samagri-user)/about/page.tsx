'use client'

import { Award, Flower2, Heart, Shield, Users, Clock, ArrowRight, Star, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { value: '250+', label: 'Artisanal Blends', icon: Flower2 },
  { value: '15K+', label: 'Global Connoisseurs', icon: Users },
  { value: '12', label: 'Master Perfumers', icon: Award },
  { value: '100%', label: 'Pure Essence', icon: Heart },
]

const values = [
  {
    icon: Shield,
    title: 'Purity & Provenance',
    description: 'Every essence is sourced from its origin, ensuring the highest concentration of natural oils and absolute transparency in our distillation process.',
  },
  {
    icon: Award,
    title: 'Artisanal Excellence',
    description: 'We reject mass production. Each bottle of Puspsaar is hand-filled and aged to perfection, honoring the slow-craft philosophy of haute parfumerie.',
  },
  {
    icon: Heart,
    title: 'Sustenance of Soul',
    description: 'A fragrance is more than a scent; it is an emotional anchor. Our creations are designed to evoke memories and define identities.',
  },
  {
    icon: Clock,
    title: 'Timeless Longevity',
    description: 'Our proprietary "Infusion-X" technique ensures that our extraits de parfum linger for 24+ hours, creating a silken sillage that never fades.',
  },
]

const milestones = [
  { year: '2019', title: 'The First Bloom', description: 'Maison Puspsaar was founded in the foothills of Kannauj, reviving extinct floral extractions.' },
  { year: '2020', title: 'Global Discovery', description: 'Our signature "Oud Noir" gains international acclaim in London and Paris.' },
  { year: '2022', title: 'Sustainability Pledge', description: 'Achieved 100% zero-plastic packaging and ethical botanical sourcing across 4 continents.' },
  { year: '2024', title: 'The Modern Archive', description: 'Launched the Puspsaar Experience Centers in Tokyo, NYC, and Dubai.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=2500&q=80"
          alt="Perfume Distillation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Our Heritage</p>
          <h1
            className="text-5xl sm:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            The Archive of <br />
            <em>Rare Essences</em>
          </h1>
          <p className="text-white/70 max-w-lg text-sm sm:text-base leading-relaxed">
            Maison Puspsaar is curated for those who seek more than a scent. We capture movement, memory, and the ephemeral beauty of the natural world.
          </p>
          <Link
            href="/product"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#F5F5F5] transition-colors"
          >
            Browse the Archive
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#E0E0E0] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 border border-[#E0E0E0] flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-5 h-5 text-[#1C1C1C]" />
                  </div>
                  <p className="text-4xl font-bold text-[#1C1C1C] mb-1">{stat.value}</p>
                  <p className="text-[10px] text-[#6B6B6B] font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Heritage / Philosophy */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-4">The Philosophy</p>
              <h2
                className="text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Sculpting Air into <br />
                <em>Profound Memories</em>
              </h2>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
                We believe olfaction is the highest form of art. Unlike sight or sound, scent bypasses logic and strikes the heart directly. At Puspsaar, we don't just "mix" perfumes; we sculpt them using botanical extractions and rare molecular structures.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: 'Proprietary Cold-Press Distillation' },
                  { icon: Globe, text: 'Globally Sourced, Ethically Harvested' },
                  { icon: Star, text: 'Limited Edition Serialized Batches' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#1C1C1C]" />
                    </div>
                    <span className="text-sm text-[#1C1C1C] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=100"
                alt="Artisanal Perfumery"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-black text-white p-4">
                <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">Maison Workshop</p>
                <p className="text-sm font-medium italic">Batch No. 892 Extraction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-4">The Core</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1C1C1C]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Built on Legacy & Essence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <div key={value.title} className="bg-white border border-[#E0E0E0] p-6">
                  <div className="w-12 h-12 border border-[#E0E0E0] flex items-center justify-center mb-5">
                    <IconComponent className="w-5 h-5 text-[#1C1C1C]" />
                  </div>
                  <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#1C1C1C] mb-3">{value.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold text-[#1C1C1C] mb-4"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Puspsaar Journey
            </h2>
            <div className="h-px w-16 bg-[#1C1C1C] mx-auto" />
          </div>
          <div className="space-y-12">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-8 items-start"
              >
                <div className="text-4xl font-black text-[#E0E0E0] shrink-0 w-20 text-right">{milestone.year}</div>
                <div className="border-l-2 border-[#E0E0E0] pl-8 pt-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#1C1C1C] mb-2">{milestone.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594125355975-d01138bb5244?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Lifestyle"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-center px-4">
              <h2
                className="text-3xl sm:text-5xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Your Signature <em>Awaits Discovery</em>
              </h2>
              <Link
                href="/product"
                className="inline-block px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F5F5F5] transition-colors"
              >
                Enter the Archive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
