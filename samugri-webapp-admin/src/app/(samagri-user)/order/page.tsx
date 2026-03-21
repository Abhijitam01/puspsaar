'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, Star, Eye, RefreshCw, Search, Download, MapPin, Phone, Calendar, CreditCard, ArrowRight, X, AlertCircle, RotateCcw, MessageSquare, ThumbsUp, ChevronDown, Award, Timer, Shield, Store, FileAxis3D, Dot, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import { orders } from '@/data/order-data'
import OrderDetails, { getStatusColor, getStatusIcon } from '@/components/order/order-details'

interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  brand?: string
  category?: string
}

interface OrderTracking {
  status: string
  timestamp: string
  location?: string
  description: string
  completed: boolean
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
  deliveryAddress: {
    name: string
    address: string
    city: string
    pincode: string
    phone: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  tracking?: OrderTracking[]
  canCancel: boolean
  canReturn: boolean
  returnWindow?: string
}
export default function OrdersPage() {

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const getOrderSummary = () => {
    const delivered = orders.filter(o => o.status === 'delivered').length
    const inProgress = orders.filter(o => ['confirmed', 'shipped'].includes(o.status)).length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

    return { delivered, inProgress, cancelled, totalSpent }
  }

  const { delivered, inProgress, cancelled, totalSpent } = getOrderSummary()
  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 ">
          <div className="mb-4 sm:mb-2 px-2">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-gray-800  sm:mb-2">My Order</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Check all orders at single place. It's east to manage.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ">
            {/* Search */}
            <div className="w-full sm:flex-1">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " />
                <Input
                  placeholder="Search orders by ID or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 rounded-full lg:w-[350px] sm:w-full bg-white"
                />
              </div>
            </div>

            {/* Sort + Button */}
            <div className="w-full sm:w-auto ">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 h-10 border rounded-lg focus:ring-2 focus:ring-gray-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="date">Order Date</SelectItem>
                  <SelectItem value="total">Total Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>
        <Separator />
        < OrderDetails />
      </div>
    </div>
  )
}