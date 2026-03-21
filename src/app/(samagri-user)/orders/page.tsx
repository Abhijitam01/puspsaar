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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-1">Track and manage your vehicle orders</p>
          </div>
          <Link href="/product">
            <Button variant="outline" className="gap-2">
              <Car className="w-4 h-4" />
              Browse More Cars
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or vehicle name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 rounded-md bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filters"
                  : "You haven't placed any orders yet"}
              </p>
              <Link href="/product">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <Card key={order.id} className="overflow-hidden hover:border-primary/30 transition-all">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/30 border-b border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Order ID</p>
                          <p className="font-semibold text-foreground">{order.id}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Order Date</p>
                          <p className="font-medium text-foreground">
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} border gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Order Items */}
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4">
                        <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.specs}</p>
                          <p className="text-lg font-bold text-primary mt-2">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/20 border-t border-border/50">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {order.deliveryAddress.city}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CreditCard className="w-4 h-4" />
                          {order.paymentMethod}
                        </div>
                        {order.estimatedDelivery && order.status !== 'delivered' && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Est. {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 pt-4">
                              {/* Vehicle */}
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-3">Vehicle</h4>
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex gap-4">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div>
                                      <p className="font-semibold text-foreground">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">{item.specs}</p>
                                      <p className="font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Delivery Address */}
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Delivery Address</h4>
                                <p className="text-foreground">{order.deliveryAddress.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.deliveryAddress.address}<br />
                                  {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                                </p>
                              </div>

                              {/* Payment */}
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Payment Method</h4>
                                <p className="text-foreground">{order.paymentMethod}</p>
                              </div>

                              {/* Total */}
                              <div className="pt-4 border-t border-border">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-foreground">Total Amount</span>
                                  <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {order.status === 'shipped' && (
                          <Button size="sm" className="gap-2">
                            <Truck className="w-4 h-4" />
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

