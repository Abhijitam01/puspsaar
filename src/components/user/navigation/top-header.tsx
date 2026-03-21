'use client'

import React, { useState } from 'react'
import { Search, Heart, ShoppingBag, X, User, Menu, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

export default function TopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore(s => s.totalItems())
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { label: 'Shop', href: '/product' },
    { label: 'Men', href: '/product?category=Men' },
    { label: 'Women', href: '/product?category=Women' },
    { label: 'Unisex', href: '/product?category=Unisex' },
    { label: 'About', href: '/about' },
  ]

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="w-full sticky top-0 z-50 border-b nav-border bg-background/95 backdrop-blur-2xl">
      {/* Announcement Bar */}
      <div className="bg-black text-white py-2 overflow-hidden border-b border-white/5">
        <div className="flex whitespace-nowrap animate-marquee">
          <p className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] px-4">
            Complimentary shipping on orders over ₹5,000 • Discover our Limited Edition Private Reserve • 
          </p>
          <p className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] px-4">
            Complimentary shipping on orders over ₹5,000 • Discover our Limited Edition Private Reserve • 
          </p>
          <p className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] px-4">
            Complimentary shipping on orders over ₹5,000 • Discover our Limited Edition Private Reserve • 
          </p>
        </div>
      </div>

      {/* Gold top strip */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C6A969] to-transparent" />

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center group-hover:bg-[#C6A969] transition-all duration-300">
            <span className="text-background text-xs font-bold tracking-wider">P</span>
          </div>
          <span
            className="text-xl font-bold tracking-[0.08em] uppercase text-foreground"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.12em' }}
          >
            Puspsaar
          </span>
        </Link>

        {/* Center: Nav links */}
        <nav className="flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#C6A969] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-2">
          {/* Search inline */}
          <div className="relative mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-52 bg-muted/50 border border-border rounded-xl py-2 px-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60 focus:w-64 transition-all duration-300"
            />
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-muted transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-muted-foreground hover:text-[#C6A969]" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          )}

          {/* Wishlist */}
          <Link href="/wishlist" className="p-2.5 rounded-xl hover:bg-muted transition-all group">
            <Heart className="w-5 h-5 text-muted-foreground group-hover:text-rose-400 transition-colors" />
          </Link>

          {/* Profile */}
          <Link href="/profile" className="p-2.5 rounded-xl hover:bg-muted transition-all group">
            <User className="w-5 h-5 text-muted-foreground group-hover:text-[#C6A969] transition-colors" />
          </Link>

          {/* Cart with live count */}
          <Link href="/cart" className="relative p-2.5 rounded-xl hover:bg-muted transition-all group">
            <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-[#C6A969] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#C6A969] text-[10px] font-bold text-black flex items-center justify-center shadow-lg">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-background text-xs font-bold">P</span>
          </div>
          <span className="text-lg font-bold tracking-widest uppercase text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
            Puspsaar
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {mounted && (
            <button onClick={toggleTheme} className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/cart" className="relative p-2 rounded-xl text-muted-foreground hover:bg-muted">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C6A969] text-[9px] font-bold text-black flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-left font-bold tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Puspsaar
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  My Orders
                </Link>
              </div>
              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search fragrances..."
                    className="w-full border border-border rounded-xl bg-muted/40 py-2.5 px-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
