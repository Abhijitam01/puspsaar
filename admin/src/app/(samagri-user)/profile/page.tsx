'use client'

import {
  Heart,
  ShoppingBag,
  Package,
  Settings,
  Clock
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
  // Move profile data inside the component
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

  const quickActions = [
    { icon: Heart, label: 'Wishlist', href: '/wishlist', iconColor: 'text-rose-600' },
    { icon: ShoppingBag, label: 'Orders', href: '/orders', iconColor: 'text-blue-600' },
    { icon: Package, label: 'History', href: '/orders', iconColor: 'text-indigo-600' },
    { icon: Settings, label: 'Settings', href: '#', iconColor: 'text-slate-600' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-start py-6 text-2xl font-semibold">
          My Profile
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <Card className="border shadow-none relative">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-2 border-slate-200">
                      <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                      <AvatarFallback className="text-xl bg-slate-100 text-slate-700">
                        {extendedUserProfile.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* User Info */}
                  <h2 className="text-lg font-semibold text-slate-900">{extendedUserProfile.name}</h2>
                  <p className="text-sm text-slate-600 mt-0.5">{extendedUserProfile.email}</p>

                  <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Joined {extendedUserProfile.joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <Badge variant="outline" className="absolute -top-2 right-0 bg-secondary rounded-full border-secondary text-white px-3 py-1">
                    Premium Member
                  </Badge>

                  {/* Stats */}
                  <div className="w-full mt-6 pt-6 border-t border-slate-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-tertiary">{extendedUserProfile.totalOrders}</div>
                        <div className="text-xs text-slate-600 mt-1">Orders</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-tertiary">₹{(extendedUserProfile.totalSpent / 1000).toFixed(0)}k</div>
                        <div className="text-xs text-slate-600 mt-1">Spent</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-tertiary">{extendedUserProfile.wishlistItems}</div>
                        <div className="text-xs text-slate-600 mt-1">Saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
