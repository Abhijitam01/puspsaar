'use client'

import React from 'react';
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const highlights = [
  'Hand-filled in crystal vials',
  'Exclusive access to Private Sales',
  'Redeemable against full-size bottles',
]

interface DiscoverySetProps {
  settings?: {
    image?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function DiscoverySet({ settings }: DiscoverySetProps) {
  const discoveryImage = settings?.image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80";
  const discoveryTitle = settings?.title || "The Discovery Collection";
  const discoverySubtitle = settings?.subtitle || "Six 5ml extraits de parfum, curated to reveal the entire Puspsaar archive. A silken journey through Oud, Rose, and rare Botanicals.";

  return (
    <section className="w-full">
      <div className="border border-[#E0E0E0] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square sm:aspect-video lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <img
              src={discoveryImage}
              alt="Puspsaar Discovery Set"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B6B6B] mb-6">
              Limited Release
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {discoveryTitle.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word === 'Collection' ? <span className="italic font-normal">{word}</span> : word}{' '}
                  {i === 1 && word !== 'Collection' && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed mb-8 max-w-md">
              {discoverySubtitle}
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1C1C1C]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/product"
                className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors inline-block"
              >
                Get the Set — ₹2,450
              </Link>
              <Link
                href="/product"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#1C1C1C] hover:text-[#6B6B6B] transition-colors group"
              >
                Explore All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
