'use client'

import React, { useState } from 'react'
import { Search, Heart, ShoppingBag, X, User, Menu, Sun, Moon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'

export default function TopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { label: 'Collection', href: '/product' },
    { label: 'Orders', href: '/orders' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/[0.06] dark:border-white/[0.06] bg-background/90 backdrop-blur-2xl">
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
        {/* Left: Wordmark with elegant logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7fe8d7] to-teal-600 flex items-center justify-center shadow-lg shadow-[#7fe8d7]/25 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-[#7fe8d7]/35">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold text-foreground tracking-wide">Velaire</span>
            <span className="text-xl font-light text-muted-foreground/70">House</span>
          </div>
        </Link>

        {/* Center: Search with elegant container */}
        <div className={`flex-1 max-w-md mx-12 relative transition-all duration-400 ${searchFocused ? 'max-w-lg' : ''}`}>
          <input
            type="text"
            placeholder="Search collection..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full border border-border/60 rounded-2xl bg-muted/40 py-3 px-5 pl-12 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#7fe8d7]/40 focus:bg-muted/60 focus:shadow-[0_0_30px_rgba(127,232,215,0.08)] transition-all duration-300"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-muted/60 flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Right: Actions with elegant icons */}
        <div className="flex items-center gap-7">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#7fe8d7] after:to-teal-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 pl-6 border-l border-border/60">
            {/* Theme Toggle - Elegant */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="group relative p-2.5 rounded-xl hover:bg-muted/60 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-muted-foreground group-hover:text-amber-400 transition-colors duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground group-hover:text-violet-400 transition-colors duration-300" />
                )}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${resolvedTheme === 'dark' ? 'bg-amber-500/5' : 'bg-violet-500/5'}`} />
              </button>
            )}
            
            {/* Wishlist Icon */}
            <Link 
              href="/wishlist" 
              className="group relative p-2.5 rounded-xl hover:bg-muted/60 transition-all duration-300"
            >
              <Heart className="w-5 h-5 text-muted-foreground group-hover:text-rose-400 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-rose-500/5" />
            </Link>
            
            {/* Profile Icon */}
            <Link 
              href="/profile" 
              className="group relative p-2.5 rounded-xl hover:bg-muted/60 transition-all duration-300"
            >
              <User className="w-5 h-5 text-muted-foreground group-hover:text-[#7fe8d7] transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#7fe8d7]/5" />
            </Link>
            
            {/* Cart Icon with elegant badge */}
            <Link 
              href="/cart" 
              className="group relative p-2.5 rounded-xl hover:bg-muted/60 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-amber-400 transition-colors duration-300" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[10px] font-semibold text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                2
              </span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-500/5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7fe8d7] to-teal-600 flex items-center justify-center shadow-lg shadow-[#7fe8d7]/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">Velaire</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Theme Toggle Mobile */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-amber-400 hover:bg-muted/60 transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}
          <Link href="/wishlist" className="p-2.5 rounded-xl text-muted-foreground hover:text-rose-400 hover:bg-muted/60 transition-all">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative p-2.5 rounded-xl text-muted-foreground hover:text-amber-400 hover:bg-muted/60 transition-all">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[9px] font-semibold text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              2
            </span>
          </Link>
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-muted/60 transition-all">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-card/95 backdrop-blur-2xl border-border/50">
              <SheetHeader>
                <SheetTitle className="text-foreground text-left flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#7fe8d7] to-teal-600 flex items-center justify-center shadow-lg shadow-[#7fe8d7]/20">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  Menu
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-3.5 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3.5 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-border/60 rounded-xl bg-muted/40 py-3 px-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#7fe8d7]/40 transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
