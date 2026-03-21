'use client'
import React from 'react'
import { Heart, ShoppingBag, Package, Settings, LogOut, ChevronRight } from 'lucide-react'

export default function QucikActionsOption() {
  const actions = [
    { icon: Heart, label: 'My Wishlist', href: '/wishlist', iconClass: 'text-[#1C1C1C]' },
    { icon: ShoppingBag, label: 'My Orders', href: '/orders', iconClass: 'text-[#1C1C1C]' },
    { icon: Package, label: 'Order History', href: '/orders', iconClass: 'text-[#1C1C1C]' },
    { icon: Settings, label: 'Settings', href: '#', iconClass: 'text-[#1C1C1C]' },
  ]

  return (
    <div className="border border-[#E0E0E0] bg-white">
      <div className="px-5 py-4 border-b border-[#E0E0E0]">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C]">Quick Actions</h3>
      </div>
      <div className="divide-y divide-[#E0E0E0]">
        {actions.map(({ icon: Icon, label, href, iconClass }) => (
          <button
            key={label}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F5F5] transition-colors text-left"
            onClick={() => { window.location.href = href }}
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${iconClass}`} />
              <span className="text-sm text-[#1C1C1C]">{label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#6B6B6B]" />
          </button>
        ))}
        <button
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F5F5] transition-colors text-left"
          onClick={() => {
            if (confirm('Are you sure you want to sign out?')) {
              localStorage.removeItem('user')
              window.location.href = '/login'
            }
          }}
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-4 w-4 text-[#E32C2B]" />
            <span className="text-sm text-[#E32C2B]">Sign Out</span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#6B6B6B]" />
        </button>
      </div>
    </div>
  )
}
