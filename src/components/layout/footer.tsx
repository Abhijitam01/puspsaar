import Link from 'next/link'
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F5F5] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-normal tracking-[0.15em] uppercase text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Puspsaar
              </span>
            </Link>
            <p className="text-[#F5F5F5]/50 text-xs sm:text-sm tracking-wide leading-relaxed max-w-sm font-light">
              Maison Puspsaar curates the world's most exquisite, rare, and sophisticated fragrances. An archive of olfactory art.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a href="#" className="text-white/40 hover:text-[#C6A969] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-white/40 hover:text-[#C6A969] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-white/40 hover:text-[#C6A969] transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links - 2 cols each */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-8">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/product?category=Men" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">Pour Homme</Link></li>
              <li><Link href="/product?category=Women" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">Pour Femme</Link></li>
              <li><Link href="/product?category=Unisex" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">Unisex</Link></li>
              <li><Link href="/product" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">The Archive</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-8">Client Care</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="text-white/50 hover:text-white transition-colors text-xs tracking-wide">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter - 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-8">The Insider</h3>
            <p className="text-[#F5F5F5]/50 text-xs tracking-wide mb-6 font-light">
              Subscribe to receive exclusive access to private sales and limited editions.
            </p>
            <form className="relative flex items-center group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white/20 pb-4 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-[#C6A969] transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-[#C6A969] group-hover:text-[#C6A969] transition-all duration-500 hover:bg-[#C6A969] hover:text-black"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-between items-center gap-8 py-12 border-y border-white/5 mb-12">
          {[
            { label: 'Artisanal Distillation', icon: '⚗️' },
            { label: 'Ethically Sourced', icon: '🌍' },
            { label: 'Zero Plastic Packaging', icon: '📦' },
            { label: 'Hand-crafted in India', icon: '🇮🇳' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-lg">{badge.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[10px] tracking-wider uppercase">
            © {new Date().getFullYear()} Maison Puspsaar. Original.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-white/30 hover:text-white text-[10px] tracking-wider uppercase transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white text-[10px] tracking-wider uppercase transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
