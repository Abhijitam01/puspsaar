'use client'
import React from 'react'
import { Heart, ShoppingBag, Package, Settings, LogOut, ShoppingBasket, IndianRupeeIcon, HeartIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


export default function QucikActionsOption() {
  return (
    <Card className="border border-border bg-card rounded-xl shadow-none" >
      <CardHeader>
        <CardTitle className="text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Wishlist */}
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-3 hover:bg-accent"
          onClick={() => (window.location.href = '/wishlist')}
        >
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-3 text-pink-500" />
            <span className='text-muted-foreground'>My Wishlist</span>
          </div>
          <span className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>

        {/* My Orders */}
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-3 hover:bg-accent"
          onClick={() => (window.location.href = '/orders')}
        >
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-3 text-blue-500" />
            <span className='text-muted-foreground'>My Orders</span>
          </div>
          <span className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>

        {/* Order History */}
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-3 hover:bg-accent"
          onClick={() => (window.location.href = '/orders')}
        >
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-3 text-green-500" />
            <span className='text-muted-foreground'>Order History</span>
          </div>
          <span className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-5 hover:bg-accent"
          onClick={() => alert('Settings feature coming soon!')}
        >
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-3 text-purple-500" />
            <span className='text-muted-foreground'>Settings</span>
          </div>
          <span className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>

        {/* Sign Out */}
        <Button
          variant="ghost"
          className="w-full justify-between px-2 py-3 text-destructive hover:bg-destructive/10"
          onClick={() => {
            if (confirm('Are you sure you want to sign out?')) {
              localStorage.removeItem('user')
              window.location.href = '/login'
            }
          }}
        >
          <div className="flex items-center">
            <LogOut className="h-5 w-5 mr-3 text-destructive" />
            <span>Sign Out</span>
          </div>
          <span className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}
