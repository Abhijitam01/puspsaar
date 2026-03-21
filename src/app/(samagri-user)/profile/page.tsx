'use client'

import {
  Heart,
  ShoppingBag,
  Package,
  Settings,
  Clock
} from 'lucide-react'
import ProfileDetails from '@/components/profile/profile-details'
import QucikActionsOption from '@/components/profile/quick-action-option'
import QuickStats from '@/components/profile/quick-stats'
import FeedbackReviews from './feedback-form'

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

export default function ProfilePage() {
  const userProfile: IUserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    pincode: "10001"
  }

  const extendedUserProfile: IExtendedUserProfile = {
    ...userProfile,
    joinDate: new Date("2024-01-14"),
    totalOrders: 12,
    totalSpent: 45600,
    wishlistItems: 8
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[#E0E0E0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-1">Puspsaar</p>
          <h1 className="text-3xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>My Profile</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="border border-[#E0E0E0] p-6 bg-white relative">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 border-2 border-[#E0E0E0] overflow-hidden bg-[#F5F5F5]">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt={extendedUserProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-2 border-white" />
                </div>

                {/* User Info */}
                <h2 className="text-lg font-bold text-[#1C1C1C]">{extendedUserProfile.name}</h2>
                <p className="text-sm text-[#6B6B6B] mt-0.5">{extendedUserProfile.email}</p>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-[#6B6B6B]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Joined {extendedUserProfile.joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <span className="absolute -top-2 right-3 bg-black text-white text-[9px] font-bold uppercase tracking-[0.1em] px-3 py-1">
                  Premium Member
                </span>

                {/* Stats */}
                <div className="w-full mt-6 pt-6 border-t border-[#E0E0E0]">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#1C1C1C]">{extendedUserProfile.totalOrders}</div>
                      <div className="text-[10px] text-[#6B6B6B] mt-1 uppercase tracking-widest">Orders</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#1C1C1C]">₹{(extendedUserProfile.totalSpent / 1000).toFixed(0)}k</div>
                      <div className="text-[10px] text-[#6B6B6B] mt-1 uppercase tracking-widest">Spent</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#1C1C1C]">{extendedUserProfile.wishlistItems}</div>
                      <div className="text-[10px] text-[#6B6B6B] mt-1 uppercase tracking-widest">Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <QucikActionsOption />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <ProfileDetails userProfile={userProfile} />
            <QuickStats user={extendedUserProfile} />
          </div>
        </div>
      </div>
      <FeedbackReviews />
    </div>
  )
}
