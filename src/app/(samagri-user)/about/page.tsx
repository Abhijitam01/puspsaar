'use client'

import { Award, Flower2, Heart, Shield, Users, Clock, Sparkles, ArrowRight, Star, Zap, Target, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { value: '250+', label: 'Artisanal Blends', icon: Flower2, color: 'text-[#C6A969]', bgColor: 'bg-[#C6A969]/10' },
  { value: '15K+', label: 'Global Connoisseurs', icon: Users, color: 'text-[#C6A969]', bgColor: 'bg-[#C6A969]/10' },
  { value: '12', label: 'Master Perfumers', icon: Award, color: 'text-[#C6A969]', bgColor: 'bg-[#C6A969]/10' },
  { value: '100%', label: 'Pure Essence', icon: Heart, color: 'text-[#C6A969]', bgColor: 'bg-[#C6A969]/10' },
]

const values = [
  {
    icon: Shield,
    title: 'Purity & Provenance',
    description: 'Every essence is sourced from its origin, ensuring the highest concentration of natural oils and absolute transparency in our distillation process.',
    iconBg: 'bg-[#C6A969]/20',
  },
  {
    icon: Award,
    title: 'Artisanal Excellence',
    description: 'We reject mass production. Each bottle of Puspsaar is hand-filled and aged to perfection, honoring the slow-craft philosophy of haute parfumerie.',
    iconBg: 'bg-[#C6A969]/20',
  },
  {
    icon: Heart,
    title: 'Sustenance of Soul',
    description: 'A fragrance is more than a scent; it is an emotional anchor. Our creations are designed to evoke memories and define identities.',
    iconBg: 'bg-[#C6A969]/20',
  },
  {
    icon: Clock,
    title: 'Timeless Longevity',
    description: 'Our proprietary "Infusion-X" technique ensures that our extraits de parfum linger for 24+ hours, creating a silken sillage that never fades.',
    iconBg: 'bg-[#C6A969]/20',
  },
]

const team = [
  {
    name: 'Aravind K. Iyer',
    role: 'Founder & Chief Curator',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'A third-generation botanist dedicated to preserving the ancient art of Indian attars through modern olfaction.',
    roleColor: 'text-[#C6A969]',
    iconBg: 'bg-[#C6A969]/10',
  },
  {
    name: 'Elena Vance',
    role: 'Master Perfumer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Trained in Grasse, Elena brings European finesse to Puspsaar\'s rich, exotic botanical palette.',
    roleColor: 'text-[#C6A969]',
    iconBg: 'bg-[#C6A969]/10',
  },
  {
    name: 'Samuel Thorne',
    role: 'Head of Distillation',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'The architect behind our signature extraits, mastering the delicate balance of heat and pressure.',
    roleColor: 'text-[#C6A969]',
    iconBg: 'bg-[#C6A969]/10',
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
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=2500&q=80"
            alt="Perfume Distillation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#C6A969]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C6A969]">Our Heritage</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-light mb-8 leading-tight tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
              The Archive of <br />
              <span className="italic text-[#C6A969]">Rare Essences</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-serif">
              Maison Puspsaar is curated for those who seek more than a scent. We capture movement, memory, and the ephemeral beauty of the natural world.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <Link href="/product">
                <Button size="lg" className="bg-[#C6A969] hover:bg-[#B59858] text-black gap-3 rounded-full px-10 py-7 text-[10px] font-bold uppercase tracking-widest transition-all">
                  Browse the archive
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-zinc-900/50 border-y border-white/5">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={stat.label} 
                  className="group text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl ${stat.bgColor} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <p className="text-5xl font-light text-white mb-2 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20 mb-8">
                <Target className="w-4 h-4 text-[#C6A969]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A969]">The philosophy</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Sculpting Air into <br />
                <span className="italic">Profound Memories</span>
              </h2>
              
              <p className="text-lg text-white/60 mb-10 leading-relaxed font-serif">
                We believe olfaction is the highest form of art. Unlike sight or sound, scent bypasses logic and strikes the heart directly. At Puspsaar, we don't just "mix" perfumes; we sculpt them using botanical extractions and rare molecular structures.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, text: 'Proprietary Cold-Press Distillation' },
                  { icon: Globe, text: 'Globally Sourced, Ethically Harvested' },
                  { icon: Star, text: 'Limited Edition Serialized Batches' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#C6A969]" />
                    </div>
                    <span className="text-sm text-white/80 font-medium tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-[4/5]"
              >
                <img
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=100"
                  alt="Artisanal Perfumery"
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-[#C6A969] text-[10px] font-bold uppercase tracking-widest mb-1">Maison Workshop</p>
                  <p className="text-2xl font-light italic">Batch No. 892 Extraction</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20 mb-8">
              <Heart className="w-4 h-4 text-[#C6A969]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A969]">The Core</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Built on <span className="italic text-[#C6A969]">Legacy & Essence</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="group relative"
                >
                  <div className={`w-16 h-16 rounded-3xl ${value.iconBg} flex items-center justify-center mb-8 border border-[#C6A969]/30 transition-all duration-500 group-hover:bg-[#C6A969] group-hover:rotate-6`}>
                    <IconComponent className="w-7 h-7 text-[#C6A969] group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#C6A969] mb-4">{value.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-serif">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>The Puspsaar Journey</h2>
            <div className="h-px w-24 bg-[#C6A969] mx-auto" />
          </div>

          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-10 items-start"
              >
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#C6A969] to-transparent opacity-40 shrink-0">
                  {milestone.year}
                </div>
                <div className="pt-2 border-l border-white/10 pl-10">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-3">{milestone.title}</h3>
                  <p className="text-white/50 font-serif leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[4rem] overflow-hidden group">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1594125355975-d01138bb5244?auto=format&fit=crop&w=2000&q=80"
                alt="Luxury Lifestyle"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-black/80" />
            </div>
            
            <div className="relative z-10 py-32 px-8 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl font-light text-white mb-10 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Your Signature <br /> 
                <span className="italic text-[#C6A969]">Awaits Discovery</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/product">
                  <Button size="lg" className="bg-white text-black hover:bg-[#C6A969] transition-colors rounded-full px-12 py-8 text-[10px] font-bold uppercase tracking-widest">
                    Enter the archive
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
