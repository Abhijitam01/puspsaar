import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

const collections = [
  { label: 'Men', href: '/collections/men' },
  { label: 'Women', href: '/collections/women' },
  { label: 'Gifting', href: '/collections/gifting' },
  { label: 'Attars', href: '/collections/attars' },
  { label: 'Signature', href: '/collections/signature' },
]

const help = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#F5F5F5] border-t border-[#E0E0E0] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-wider">P</span>
                </div>
                <span className="text-lg font-bold tracking-[0.12em] uppercase text-[#1C1C1C]"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Puspsaar
                </span>
              </div>
            </Link>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
              Premium fragrances inspired by the Middle East. Authentic attars, perfumes, and gifting sets delivered to your door.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2">
            <h3 className="text-[#1C1C1C] text-xs font-semibold tracking-[0.2em] uppercase mb-6">Collections</h3>
            <ul className="space-y-3">
              {collections.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/product" className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors text-sm">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="lg:col-span-2">
            <h3 className="text-[#1C1C1C] text-xs font-semibold tracking-[0.2em] uppercase mb-6">Help</h3>
            <ul className="space-y-3">
              {help.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-[#1C1C1C] text-xs font-semibold tracking-[0.2em] uppercase mb-6">Newsletter</h3>
            <p className="text-[#6B6B6B] text-sm mb-4">
              Subscribe for exclusive offers, new arrivals, and fragrance tips.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 border border-[#E0E0E0] bg-white px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1C1C] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E0E0E0] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#ABABAB] text-xs">
            © {new Date().getFullYear()} Puspsaar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[#ABABAB] hover:text-[#1C1C1C] text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[#ABABAB] hover:text-[#1C1C1C] text-xs transition-colors">Terms</Link>
            <Link href="/shipping" className="text-[#ABABAB] hover:text-[#1C1C1C] text-xs transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
