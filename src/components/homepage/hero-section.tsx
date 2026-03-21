'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=2500&q=100"
          alt="Luxury Perfume Cinematic Viewer"
          className="w-full h-full object-cover object-top"
        />
        {/* Subtle vignette and gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Hero Content - True Minimalism */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[#C6A969] text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 sm:mb-8 font-light">
            Maison Puspsaar
          </span>
          
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-normal text-white leading-[0.9] tracking-[-0.03em] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            L'Essence<br />
            <span className="italic font-light">du Temps</span>
          </h1>
          
          <p className="text-white/70 max-w-md text-sm sm:text-base font-light tracking-wide mb-12">
            Discover a curated archive of the world's most evocative, rare, and sophisticated fragrances.
          </p>
          
          <Link href="/product">
            <span className="inline-block border-b border-[#C6A969] pb-1 text-[#C6A969] text-xs sm:text-sm tracking-[0.2em] uppercase transition-all hover:text-white hover:border-white">
              Discover the Collection
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
