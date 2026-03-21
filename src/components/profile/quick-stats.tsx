'use client'
import React from 'react'
import { Card, CardContent } from '../ui/card'
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
  return (
    <div>
      <Card className="border border-border bg-card shadow-none">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Activity Overview</h3>
          <div className="space-y-4">
            {/* Total Orders */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                  <ShoppingBasket className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Total Orders</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-foreground">{user.totalOrders}</span>
            </div>

            {/* Total Spent */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                  <IndianRupee className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Total Spent</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-foreground">₹{user.totalSpent.toLocaleString()}</span>
            </div>

            {/* Wishlist Items */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Wishlist Items</p>
                  <p className="text-xs text-muted-foreground">Saved products</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-foreground">{user.wishlistItems}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
