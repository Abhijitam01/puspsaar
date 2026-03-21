'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Search,
  Heart,
  ShoppingBag,
  X,
  UserCircle2,
  Inbox,
  EllipsisVertical,
  ChevronUp,
  TextAlignEnd,
  ChevronRight,
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { categories } from '@/components/category/navbar-category'

export default function TopNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleMenuToggle = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  // Close user dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* ===== Desktop Header ===== */}
      <div className="hidden lg:flex items-center justify-between max-w-[92rem] mx-auto px-10 py-3">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Samugri Logo" className="w-28 h-auto object-contain" />
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-2xl mx-10 relative bg-gray-100 rounded-xl">
          <input
            type="text"
            placeholder="Search for pooja items..."
            className="w-full border-none rounded-xl py-2.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8 text-gray-700 relative">
          {/* Wishlist */}
          <Link href="/wishlist" className="flex items-center gap-1 hover:text-orange-600">
            <Heart className="w-5 h-5" />
            <span className="font-medium text-sm">Wishlist</span>
          </Link>

          {/* Login Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1 hover:text-orange-600 transition"
            >
              <UserCircle2 className="w-5 h-5" />
              <span className="font-medium text-sm">Login</span>
            </button>

            {userMenuOpen && (
              <Card className="absolute right-0 mt-2 w-80 bg-white border-none rounded-sm shadow-lg py-2 z-100" >
                <CardHeader className="mt-3">
                  <CardTitle className="text-tertiary">Welcome</CardTitle>
                  <CardDescription className="text-sm">
                    To access account and manage orders
                  </CardDescription>
                </CardHeader>
                <div className="flex justify-center gap-6 px-6 mb-3">
                  <Button
                    className="font-bold bg-tertiary text-white"
                    onClick={() => (window.location.href = '/login')}
                  >
                    Login
                  </Button>
                  <Button
                    className="font-bold bg-tertiary text-white"
                    onClick={() => (window.location.href = '/signup')}
                  >
                    Signup
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-1 hover:text-orange-600">
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            <span className="font-medium text-sm">Cart</span>
          </Link>

          {/* Become a Seller */}
          <Link href="/product" className="flex items-center gap-1 hover:text-orange-600">
            <Inbox className="w-5 h-5" />
            <span className="font-medium text-sm">Become a Seller</span>
          </Link>

          <EllipsisVertical className="w-5 h-5 hover:text-orange-600" />
        </div>
      </div>

      {/* ===== Mobile & Tablet Header ===== */}
      <div className="flex md:hidden items-center justify-between px-5 py-3 bg-white shadow-sm">
        <div >
          <img src="/logo.png" alt="Samugri Logo" className="w-24 h-auto object-contain" />
          {/* */}
        </div>

        {/* Left: Drawer Button */}
        <div className='flex item-center gap-3'>
          <div className="flex items-center gap-5 text-gray-700">
            <Heart className="w-5 h-5 hover:text-orange-600" />
            <ShoppingBag className="w-5 h-5 hover:text-orange-600" />
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md">
                {mobileOpen ? <X className="w-6 h-6" /> : <TextAlignEnd className="w-6 h-6" />}
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[80%] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Browse Categories</SheetTitle>
              </SheetHeader>
              <ul className="space-y-2 px-3">
                {categories.map((cat) => (
                  <li key={cat.id} className=' border-b border-gray-100'>
                    <button
                      className="w-full text-left flex justify-between items-center py-2 text-gray-800 font-medium"
                      onClick={() => handleMenuToggle(cat.id)}
                    >
                      <span>{cat.name}</span>
                      {cat.hasDropdown &&
                        (activeMenu === cat.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        ))}
                    </button>
                   {cat.hasDropdown && activeMenu === cat.id && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {cat.submenu?.map((section, idx) => (
                          <div key={idx}>
                            <h3 className="text-sm font-semibold text-gray-700">{section.title}</h3>
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-sm text-gray-600 pl-2 py-1">
                                {item}
                              </li>
                            ))}
                          </div>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
