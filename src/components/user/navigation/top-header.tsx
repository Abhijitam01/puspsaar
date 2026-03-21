'use client'

import React, { useState, useEffect } from 'react'
import { Search, Heart, ShoppingBag, X, User, Menu } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

// Countdown target: 7 days from now (can be replaced with a fixed date)
function getCountdownTarget() {
  const target = new Date()
  target.setDate(target.getDate() + 7)
  return target
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const diff = target.getTime() - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

export default function TopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const totalItems = useCartStore(s => s.totalItems())
  const router = useRouter()
  const countdownTarget = React.useMemo(() => getCountdownTarget(), [])
  const timeLeft = useCountdown(countdownTarget)

  const navLinks = [
    { label: 'Men', href: '/collections/men' },
    { label: 'Women', href: '/collections/women' },
    { label: 'Gifting', href: '/collections/gifting' },
    { label: 'Attars', href: '/collections/attars' },
    { label: 'Signature', href: '/collections/signature' },
    { label: 'All Products', href: '/product' },
  ]

  const mobileExtraLinks = [
    { label: 'My Profile', href: '/profile' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Announcement Bar — black with countdown */}
      <div className="bg-black text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
            BUY 2 GET 1 FREE — Limited Time Offer
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-bold tabular-nums">
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.days)}d</span>
            <span>:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.hours)}h</span>
            <span>:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.mins)}m</span>
            <span>:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.secs)}s</span>
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="h-px bg-[#E0E0E0]" />

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-black flex items-center justify-center group-hover:bg-[#1C1C1C] transition-colors">
            <span className="text-white text-xs font-bold tracking-wider">P</span>
          </div>
          <span className="text-lg font-bold tracking-[0.12em] uppercase text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Puspsaar
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#1C1C1C] hover:text-black transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          {/* Search */}
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-56 border border-[#E0E0E0] py-2 px-4 pl-9 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all"
                />
              </div>
              <button onClick={() => setSearchOpen(false)} className="p-2 hover:bg-[#F5F5F5] transition-colors">
                <X className="w-4 h-4 text-[#6B6B6B]" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2.5 hover:bg-[#F5F5F5] transition-colors">
              <Search className="w-5 h-5 text-[#1C1C1C]" />
            </button>
          )}

          {/* Wishlist */}
          <Link href="/wishlist" className="p-2.5 hover:bg-[#F5F5F5] transition-colors group">
            <Heart className="w-5 h-5 text-[#1C1C1C] group-hover:text-red-500 transition-colors" />
          </Link>

          {/* Profile */}
          <Link href="/profile" className="p-2.5 hover:bg-[#F5F5F5] transition-colors">
            <User className="w-5 h-5 text-[#1C1C1C]" />
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2.5 hover:bg-[#F5F5F5] transition-colors">
            <ShoppingBag className="w-5 h-5 text-[#1C1C1C]" />
            {totalItems > 0 && (
              <span className="absolute -top-0 -right-0 w-4.5 h-4.5 rounded-full bg-black text-[10px] font-bold text-white flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-base font-bold tracking-widest uppercase text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Puspsaar
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/wishlist" className="p-2 text-[#1C1C1C] hover:bg-[#F5F5F5]">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative p-2 text-[#1C1C1C] hover:bg-[#F5F5F5]">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black text-[9px] font-bold text-white flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-[#1C1C1C] hover:bg-[#F5F5F5]">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white border-[#E0E0E0]">
              <SheetHeader>
                <SheetTitle className="text-left font-bold tracking-widest uppercase text-[#1C1C1C]"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Puspsaar
                </SheetTitle>
              </SheetHeader>

              {/* Mobile search */}
              <div className="mt-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`)
                      setMobileOpen(false)
                    }
                  }}
                  className="w-full border border-[#E0E0E0] py-2.5 px-4 pl-10 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black"
                />
              </div>

              {/* Nav links */}
              <div className="mt-6 space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ABABAB] px-3 mb-2">Collections</p>
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3 px-3 text-[#1C1C1C] hover:bg-[#F5F5F5] transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 space-y-0.5 border-t border-[#E0E0E0] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ABABAB] px-3 mb-2">Account</p>
                {mobileExtraLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3 px-3 text-[#6B6B6B] hover:text-[#1C1C1C] hover:bg-[#F5F5F5] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-[#E0E0E0]" />
    </header>
  )
}
