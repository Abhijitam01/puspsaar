'use client'

import { Flame, KeySquare, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type GalleryCard = {
  title: string
  description: string
  image: string
  accent: string
  icon: LucideIcon
}

const galleryCards: GalleryCard[] = [
  {
    title: 'Immersive residencies',
    description: 'Multi-sensory salons, archival loops, and curated scents frame every delivery ritual.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    accent: '#a78bfa',
    icon: MapPin,
  },
  {
    title: 'Performance pits',
    description: 'Inspect underbody, suspension, and dyno reports like a race engineer.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    accent: '#38bdf8',
    icon: Flame,
  },
  {
    title: 'Concierge delivery',
    description: 'White-glove drop-off with ceremony playlists and reveal lighting.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    accent: '#fbbf24',
    icon: KeySquare,
  },
]

const stats = [
  { label: 'Residencies worldwide', value: '12' },
  { label: 'Member satisfaction', value: '97' },
  { label: 'Detailing hours', value: '18+' },
  { label: 'Forensic checks', value: '210 pts' },
]

export default function ExperienceGallery() {
  return (
    <section className="w-full rounded-[32px] border border-white/10 bg-[#070910] p-6 sm:p-10 text-white shadow-[0_25px_80px_rgba(8,8,15,0.7)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Velaire residency</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Every touchpoint feels like a concept reveal</h2>
        </div>
        <p className="text-white/70 lg:max-w-md">
          Designed for photo-worthy handovers and forensic level inspections. Our gallery moments turn pre-owned journeys into
          coveted premieres.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {galleryCards.map((card) => (
          <article
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f1c]/80"
          >
            <div className="absolute inset-0 opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-80">
              <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                  style={{ backgroundColor: `${card.accent}20`, color: card.accent }}
                >
                  signature
                </span>
                <card.icon className="h-4 w-4" style={{ color: card.accent }} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{card.title}</h3>
                <p className="text-sm text-white/70">{card.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
            <p className="uppercase tracking-[0.3em] text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

