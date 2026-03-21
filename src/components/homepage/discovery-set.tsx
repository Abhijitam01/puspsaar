'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DiscoverySet() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden bg-[#0F0F0F] border border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center">
            {/* Image Column */}
            <div className="relative aspect-square sm:aspect-video lg:aspect-auto lg:h-[600px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7ef53?auto=format&fit=crop&w=1200&q=80"
                alt="Puspsaar Discovery Set"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:p-20 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A969]/10 border border-[#C6A969]/20">
                <Sparkles className="w-4 h-4 text-[#C6A969]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C6A969]">Limited Release</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-light text-white leading-tight tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                The Discovery <br />
                <span className="italic">Collection</span>
              </h2>
              
              <p className="text-white/50 text-base sm:text-lg font-serif leading-relaxed max-w-lg">
                Six 5ml extraits de parfum, curated to reveal the entire Puspsaar archive. A silken journey through Oud, Rose, and rare Botanicals. 
              </p>

              <div className="space-y-4 pt-4">
                {[
                  'Hand-filled in crystal vials',
                  'Exclusive invitation to Private Sales',
                  'Redeemable against full-size bottles'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C6A969]" />
                    <span className="text-xs sm:text-sm text-white/70 font-light tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                <Button className="w-full sm:w-auto bg-[#C6A969] hover:bg-[#B59858] text-black rounded-full px-10 py-7 text-[10px] font-bold uppercase tracking-widest transition-all">
                  Get the set — ₹2,450
                </Button>
                <Link href="/product" className="text-[10px] font-bold uppercase tracking-widest text-[#C6A969] hover:text-white transition-colors flex items-center gap-2 group">
                  EXPLORE ARCHIVE 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
