'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Truck, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react'

interface OrderTracking {
  status: string
  timestamp: string
  location?: string
  description: string
  completed: boolean
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  total: number
  items: Array<{
    id: number
    name: string
    price: number
    image: string
    size: string
    color: string
    quantity: number
    brand?: string
    category?: string
  }>
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

export default function OrderTrackingDialog({ order }: { order: Order }) {
  const trackingSteps = Array.isArray(order.tracking) ? order.tracking : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-2xl gap-2 text-xs hover:bg-green-50 hover:border-green-200 hover:text-green-600 dark:bg-gray-100 dark:text-gray-500 dark:hover:bg-green-500 dark:hover:text-white"
        >
          <Truck className="h-4 w-4" />
          Track Order
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold dark:text-gray-800">
            Order Tracking
          </DialogTitle>
          <div className="relative flex items-center gap-8">
            <div className="absolute h-2 w-2 bg-orange-600 rounded-full"></div>
            <span className="text-sm text-orange-500 ml-4">{order.id}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Top Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
            <div className="space-y-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:bg-blue-50 p-4">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                Tracking Number
              </p>
              <p className="text-gray-600 font-mono text-sm">
                {order.trackingNumber || 'Not Available'}
              </p>
            </div>

            <div className="space-y-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:bg-blue-50">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Estimated Delivery
              </p>
              <p className="text-gray-600 text-sm">
                {order.estimatedDelivery
                  ? new Date(order.estimatedDelivery).toLocaleDateString()
                  : 'TBD'}
              </p>
            </div>
          </div>

          {/* Order Tracking Timeline */}
          {trackingSteps.length > 0 ? (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 text-lg">Order Timeline</h3>
              <div className="space-y-6">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* Vertical Line */}
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-4 top-10 w-px h-12 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}

                    {/* Status Circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        step.completed
                          ? 'bg-[#2FA276] text-white'
                          : 'bg-white border border-gray-300 text-gray-400'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-800">{step.status}</p>
                        {step.completed && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                      {step.location && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                          <MapPin className="h-3 w-3" />
                          {step.location}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(step.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic text-center">
              No tracking updates available for this order.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
