'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, Search, Eye, ChevronDown, Car, MapPin, Calendar, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'

interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  specs: string
}

interface Order {
  id: string
  date: string
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  estimatedDelivery?: string
  deliveryAddress: {
    name: string
    address: string
    city: string
    pincode: string
  }
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: 'VH-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 1725000,
    estimatedDelivery: '2024-01-22',
    items: [
      {
        id: 1,
        name: '2022 Hyundai Creta SX (O) Turbo',
        price: 1725000,
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
        specs: 'Turbo Petrol • Automatic • 18,000 km',
      },
    ],
    deliveryAddress: {
      name: 'Arjun Khanna',
      address: 'D-904, Skyline Enclave, Residency Road',
      city: 'Bengaluru',
      pincode: '560001',
    },
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'VH-2024-002',
    date: '2024-02-10',
    status: 'shipped',
    total: 2450000,
    estimatedDelivery: '2024-02-18',
    items: [
      {
        id: 2,
        name: '2023 BMW 3 Series 330i M Sport',
        price: 2450000,
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=400&q=80',
        specs: 'Petrol • Automatic • 8,500 km',
      },
    ],
    deliveryAddress: {
      name: 'Arjun Khanna',
      address: 'D-904, Skyline Enclave, Residency Road',
      city: 'Bengaluru',
      pincode: '560001',
    },
    paymentMethod: 'EMI - HDFC Bank',
  },
  {
    id: 'VH-2024-003',
    date: '2024-02-25',
    status: 'processing',
    total: 3200000,
    items: [
      {
        id: 3,
        name: '2024 Mercedes-Benz C-Class C200',
        price: 3200000,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
        specs: 'Petrol • Automatic • 2,100 km',
      },
    ],
    deliveryAddress: {
      name: 'Arjun Khanna',
      address: 'D-904, Skyline Enclave, Residency Road',
      city: 'Bengaluru',
      pincode: '560001',
    },
    paymentMethod: 'Credit Card',
  },
]

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'shipped':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'confirmed':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    case 'processing':
      return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    case 'cancelled':
      return 'bg-red-500/10 text-red-600 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return CheckCircle
    case 'shipped':
      return Truck
    case 'confirmed':
    case 'processing':
      return Clock
    default:
      return Package
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[#E0E0E0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-1">Puspsaar</p>
            <h1 className="text-3xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>My Orders</h1>
            <p className="text-[#6B6B6B] mt-1 text-sm">Track and manage your fragrance orders</p>
          </div>
          <Link
            href="/product"
            className="border border-[#1C1C1C] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:bg-black hover:text-white transition-colors"
          >
            Browse Fragrances
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search by order ID or fragrance name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#E0E0E0] py-2.5 pl-9 pr-4 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#E0E0E0] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] focus:outline-none focus:border-black bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-32 border border-[#E0E0E0]">
            <Package className="w-16 h-16 mx-auto text-[#E0E0E0] mb-6" />
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              No orders found
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-8">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : "You haven't placed any orders yet"}
            </p>
            <Link
              href="/product"
              className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <div key={order.id} className="border border-[#E0E0E0] overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F5F5F5] border-b border-[#E0E0E0]">
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B]">Order ID</p>
                        <p className="font-semibold text-[#1C1C1C]">{order.id}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B]">Order Date</p>
                        <p className="font-medium text-[#1C1C1C]">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] border ${getStatusColor(order.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Order Items */}
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                      <div className="w-24 h-20 overflow-hidden shrink-0 bg-[#F5F5F5]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1C1C1C] text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-[#6B6B6B] mt-1">{item.specs}</p>
                        <p className="text-base font-bold text-[#1C1C1C] mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-t border-[#E0E0E0]">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6B6B]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {order.deliveryAddress.city}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" />
                        {order.paymentMethod}
                      </div>
                      {order.estimatedDelivery && order.status !== 'delivered' && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          Est. {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="border border-[#E0E0E0] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            View Details
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg bg-white border border-[#E0E0E0]">
                          <DialogHeader>
                            <DialogTitle className="text-[#1C1C1C]">Order Details — {order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 pt-4">
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#6B6B6B] mb-3">Products</h4>
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border border-[#E0E0E0]" />
                                  <div>
                                    <p className="font-semibold text-[#1C1C1C] text-sm">{item.name}</p>
                                    <p className="text-xs text-[#6B6B6B] mt-0.5">{item.specs}</p>
                                    <p className="font-bold text-[#1C1C1C] mt-1">{formatPrice(item.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#6B6B6B] mb-2">Delivery Address</h4>
                              <p className="text-[#1C1C1C] text-sm">{order.deliveryAddress.name}</p>
                              <p className="text-xs text-[#6B6B6B]">
                                {order.deliveryAddress.address}<br />
                                {order.deliveryAddress.city} — {order.deliveryAddress.pincode}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#6B6B6B] mb-2">Payment Method</h4>
                              <p className="text-[#1C1C1C] text-sm">{order.paymentMethod}</p>
                            </div>
                            <div className="pt-4 border-t border-[#E0E0E0] flex justify-between items-center">
                              <span className="font-semibold text-[#1C1C1C]">Total Amount</span>
                              <span className="text-xl font-bold text-[#1C1C1C]">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {order.status === 'shipped' && (
                        <button className="bg-black text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5" />
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

