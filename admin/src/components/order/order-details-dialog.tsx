'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  CheckCircle,
  MapPin,
  Phone,
  Eye,
  Shuffle,
} from 'lucide-react'
import { getStatusColor, getStatusIcon } from '@/components/order/order-details'

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


export default function OrderDetailsDialog({ order }: { order: Order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs cursor-pointer hover:bg-orange-50 hover:text-orange-500 rounded-full dark:bg-gray-100 dark:text-gray-500 dark:hover:bg-orange-500 dark:hover:text-white"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto dark:bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold dark:text-gray-900">
            Order Details - {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <Card className="shadow-none border-none dark:border-dashed dark:bg-white bg-gray-50">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2 dark:text-gray-900">
                  <Package className="h-5 w-5 text-blue-600" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono font-medium dark:text-gray-500">{order.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium dark:text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600 font-semibold">Total Amount:</span>
                  <span className="font-bold text-xl text-green-600">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Address */}
          <Card className="shadow-none border-none dark:border-dashed dark:bg-white bg-gray-50">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2 dark:text-gray-900">
                <MapPin className="h-5 w-5 text-red-600" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm grid grid-cols-2">
              <p className="font-semibold text-gray-800">{order.deliveryAddress.name}</p>
              <p className="text-gray-600">{order.deliveryAddress.address}</p>
              <p className="text-gray-600">
                {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
              <p className="text-gray-600 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {order.deliveryAddress.phone}
              </p>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="shadow-none border-none dark:border-dashed dark:bg-white bg-gray-50">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2 dark:text-gray-900">
                <Shuffle className="h-5 w-5 text-yellow-600" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg hover:border-gray-200 transition-colors"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        {item.brand && (
                          <Badge variant="outline" className="text-xs dark:text-yellow-600">
                            {item.brand}
                          </Badge>
                        )}
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-lg text-gray-800">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

