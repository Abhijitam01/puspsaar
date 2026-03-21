'use client'
import React from 'react'
import { Heart, IndianRupee, ShoppingBasket } from 'lucide-react'

export interface IUserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface IExtendedUserProfile extends IUserProfile {
  joinDate: Date
  totalOrders: number
  totalSpent: number
  wishlistItems: number
}

interface QuickStatsProps {
  user: IExtendedUserProfile
}

export default function QuickStats({ user }: QuickStatsProps) {
  const stats = [
    {
      icon: ShoppingBasket,
      label: 'Total Orders',
      sub: 'All time',
      value: String(user.totalOrders),
    },
    {
      icon: IndianRupee,
      label: 'Total Spent',
      sub: 'All time',
      value: `₹${user.totalSpent.toLocaleString()}`,
    },
    {
      icon: Heart,
      label: 'Wishlist Items',
      sub: 'Saved products',
      value: String(user.wishlistItems),
    },
  ]

  return (
    <div className="border border-[#E0E0E0] bg-white">
      <div className="px-6 py-4 border-b border-[#E0E0E0]">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C]">Activity Overview</h3>
      </div>
      <div className="p-6 space-y-5">
        {stats.map(({ icon: Icon, label, sub, value }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-[#1C1C1C]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1C1C1C]">{label}</p>
                <p className="text-xs text-[#6B6B6B]">{sub}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-[#1C1C1C]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
