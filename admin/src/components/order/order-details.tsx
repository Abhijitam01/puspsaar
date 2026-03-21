'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, Clock, CreditCard, Dot, MessageSquare, Package, RefreshCw, RotateCcw, Shield, Star, Timer, TrashIcon, Truck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '../ui/separator'
import { orders } from '@/data/order-data'

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

interface Order {
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
  tracking?: Array<{
    status: string
    timestamp: string
    location?: string
    description: string
    completed: boolean
  }>
  canCancel: boolean
  canReturn: boolean
  returnWindow?: string
}
import OrderDetailsDialog from './order-details-dialog'
import OrderTrackingDialog from './order-tracking dialog'
import { Badge } from '@/components/ui/badge'

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'shipped':
            return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'confirmed':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'pending':
            return 'bg-gray-100 text-gray-800 border-gray-200'
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'returned':
            return 'bg-orange-100 text-orange-800 border-orange-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

export const getStatusIcon = (status: string) => {
    switch (status) {
        case 'delivered':
            return <CheckCircle className="h-4 w-4" />
        case 'shipped':
            return <Truck className="h-4 w-4" />
        case 'confirmed':
            return <Package className="h-4 w-4" />
        case 'pending':
            return <Clock className="h-4 w-4" />
        case 'cancelled':
            return <X className="h-4 w-4" />
        case 'returned':
            return <RotateCcw className="h-4 w-4" />
        default:
            return <Package className="h-4 w-4" />
    }
}

export default function OrderDetails() {
    const [selectedTab, setSelectedTab] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const filteredOrders = orders.filter(order => {
        const matchesTab = selectedTab === 'all' || order.status === selectedTab
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some((item: OrderItem) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesTab && matchesSearch
    }).sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            case 'total':
                return b.total - a.total
            case 'status':
                return a.status.localeCompare(b.status)
            default:
                return 0
        }
    })

    const handleCancelOrder = (orderId: string) => {
        console.log('Cancel order:', orderId)
        // Implement cancel order logic
    }

    const handleReturnOrder = (orderId: string) => {
        console.log('Return order:', orderId)
        // Implement return order logic
    }

    const handleReorder = (order: Order) => {
        console.log('Reorder:', order)
        // Implement reorder logic
    }

    return (
        <div className="max-w-7xl mx-auto lg:px-8 py-6 space-y-6">

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">

                <div className="overflow-x-auto">
                    <TabsList className="grid grid-cols-6  gap-8 bg-transprent h-12  p-1 rounded-full ">
                        <TabsTrigger value="all" className="rounded-full px-4 py-2 text-sm font-medium transition-all w-full
               data-[state=active]:bg-secondary data-[state=active]:text-white 
               hover:bg-blue-100">All Orders</TabsTrigger>
                        <TabsTrigger value="pending" className='rounded-full px-3  py-2 text-sm font-medium transition-all 
               data-[state=active]:bg-secondary data-[state=active]:text-white 
               hover:bg-blue-100'>Pending</TabsTrigger>
                        <TabsTrigger value="confirmed" className='rounded-full px-4 py-2 text-sm font-medium transition-all 
               data-[state=active]:bg-secondary data-[state=active]:text-white
               hover:bg-blue-100'>Confirmed</TabsTrigger>
                        <TabsTrigger value="shipped" className='rounded-full px-4 py-2 text-sm font-medium transition-all 
               data-[state=active]:bg-secondary data-[state=active]:text-white 
               hover:bg-blue-100'>Shipped</TabsTrigger>
                        <TabsTrigger value="delivered" className='rounded-full px-4 py-2 text-sm font-medium transition-all 
               data-[state=active]:bg-secondary data-[state=active]:text-white 
               hover:bg-blue-100'>Delivered</TabsTrigger>

                        <TabsTrigger value="cancelled" className='rounded-full px-4 py-2 text-sm font-medium transition-all 
               data-[state=active]:bg-secondary data-[state=active]:text-white 
               hover:bg-blue-100'>Cancelled</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value={selectedTab} className="mt-6">
                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <Card className="border shadow-none rounded-md">
                                <CardContent className="p-12 text-center">
                                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                        {selectedTab === 'all'
                                            ? "You haven't placed any orders yet."
                                            : `No ${selectedTab} orders found.`
                                        }
                                    </p>
                                    <Button onClick={() => window.location.href = '/products'} size="lg" className='bg-orange-400 cursor-pointer'>Start Shopping</Button>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredOrders.map((order) => (
                                <Card key={order.id} className="shadow-none hover:shadow-lg transition-all duration-200 border py-4 rounded-lg relative">
                                    <div className='absolute w-1 h-50 bg-tertiary rounded-full top-1/4 left-0'></div>
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <CardTitle className="text-gray-800 text-lg">Order #{order.id}</CardTitle>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4  text-purple-600" />
                                                        Placed on {new Date(order.date).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CreditCard className="h-4 w-4 text-yellow-600" />
                                                        {order.paymentMethod}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge className={`${getStatusColor(order.status)} border text-sm px-3 py-1`}>
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(order.status)}
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </div>
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        {/* Order Items */}
                                        <div className="space-y-3">
                                            {order.items.map((item: OrderItem) => (
                                                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg overflow-hidden border">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h4>
                                                        <div className="flex flex-wrap items-center gap-3 sm:gap-1 text-xs sm:text-sm text-gray-600 mb-2">
                                                            <Badge variant="outline" className="border border-secondary text-secondary text-[10px] px-2 py-0.5 rounded-full font-medium">
                                                                {item.brand}
                                                            </Badge>

                                                            <div className="flex items-center ">
                                                                <Dot className='w-8 h-8 text-blue-700' />
                                                                <span>Size: {item.size}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Dot className='w-8 h-8 text-blue-700' />
                                                                <span>Color: {item.color}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Dot className='w-8 h-8 text-blue-700' />
                                                                <span>Qty: {item.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between ">
                                                            <div className="font-semibold dark:text-gray-800">
                                                                ₹{(item.price * item.quantity).toLocaleString()}
                                                            </div>
                                                            <div className="text-xs text-gray-500 hidden sm:block">
                                                                ₹{item.price} × {item.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className='dark:bg-gray-200' />

                                        {/* Order Summary */}
                                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="text-sm text-gray-600">
                                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                </div>
                                                {order.trackingNumber && (
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Package className="h-4 w-4" />
                                                        Tracking: <span className="font-mono">{order.trackingNumber}</span>
                                                    </div>
                                                )}
                                                {order.estimatedDelivery && (
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Timer className="h-4 w-4" />
                                                        Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <div className="font-bold text-xl text-gray-800 mb-1">
                                                    Total: ₹{order.total.toLocaleString()}
                                                </div>
                                                <Badge className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Separator className='' />
                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            <OrderDetailsDialog order={order} />

                                            {order.status === 'shipped' && order.trackingNumber && (
                                                <OrderTrackingDialog order={order} />
                                            )}

                                            {order.status === 'delivered' && (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-1 text-xs hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 rounded-full dark:bg-gray-100 dark:text-gray-500 dark:hover:bg-orange-500 dark:hover:text-white "
                                                    >
                                                        <Star className="h-4 w-4" />
                                                        <span className="hidden sm:inline">Rate & Review</span>
                                                        <span className="sm:hidden">Review</span>
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-1 text-xs hover:bg-green-50 hover:border-green-200 hover:text-green-600 rounded-full dark:bg-gray-100 dark:text-gray-500 dark:hover:bg-orange-500 dark:hover:text-white "
                                                        onClick={() => handleReorder(order)}
                                                    >
                                                        <RefreshCw className="h-4 w-4" />
                                                        <span className="hidden sm:inline">Reorder</span>
                                                        <span className="sm:hidden">Reorder</span>
                                                    </Button>

                                                </>
                                            )}

                                            {order.canCancel && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50 hover:border-red-200 rounded-2xl "
                                                    onClick={() => handleCancelOrder(order.id)}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                    <span className="hidden sm:inline">Cancel Order</span>
                                                    <span className="sm:hidden">Cancel</span>
                                                </Button>
                                            )}

                                            {order.canReturn && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50 hover:border-red-200 rounded-2xl"
                                                    onClick={() => handleReturnOrder(order.id)}
                                                >
                                                    <RotateCcw className="h-4 w-4 mr-1" />
                                                    <span className="hidden sm:inline">Return</span>
                                                    <span className="sm:hidden">Return</span>
                                                </Button>

                                            )}

                                            {order.status === 'delivered' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-1 text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 rounded-full "
                                                >
                                                    <MessageSquare className="h-4 w-4" />
                                                    <span className="hidden sm:inline">Contact Support</span>
                                                    <span className="sm:hidden">Support</span>
                                                </Button>

                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

