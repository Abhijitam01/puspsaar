"use client";
import React, { useState } from "react";
import { Package, MapPin, Truck, XCircle, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IOrder, OrderStatus, PaymentStatus } from '@/model/order';

interface OrderHistoryProps {
  orders: IOrder[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case OrderStatus.PENDING:
      case OrderStatus.CONFIRMED:
      case OrderStatus.PACKED:
      case OrderStatus.OUT_FOR_DELIVERY:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge variant="destructive">Cancelled</Badge>;
      case OrderStatus.PENDING:
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case OrderStatus.CONFIRMED:
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>;
      case OrderStatus.PACKED:
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Packed</Badge>;
      case OrderStatus.OUT_FOR_DELIVERY:
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Out for Delivery</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const toggleExpanded = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (!orders?.length) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 border-dashed">
        <Package className="h-20 w-20 text-muted-foreground mb-6" />
        <h3 className="text-2xl font-semibold mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground max-w-md">
          This customer hasn&apos;t placed any orders yet. When they make their first purchase,
          their order history will appear here.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="shadow-none border hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.orderStatus)}
                  {getStatusBadge(order.orderStatus)}
                </div>
                <div>
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(order.finalAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(order.id)}
                  className="p-2"
                >
                  {expandedOrder === order.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>

          {expandedOrder === order.id && (
            <CardContent className="space-y-4 pt-0">
              <Separator />

              {/* Products */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Products</h4>
                <div className="grid gap-3">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={item.productImage} alt={item.productName || 'Product'} />
                        <AvatarFallback className="text-xs">
                          {item.productName ? item.productName.split(' ').map(n => n[0]).join('') : 'P'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.productName || 'Product'}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} • {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatCurrency(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment & Delivery Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Payment & Delivery
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Status:</span>
                      <Badge
                        variant={order.paymentStatus === PaymentStatus.COMPLETED ? 'default' : 'secondary'}
                        className={
                          order.paymentStatus === PaymentStatus.COMPLETED
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-muted text-foreground'
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    {order.deliverySlot && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Slot:</span>
                        <span className="font-medium">{order.deliverySlot.startTime} - {order.deliverySlot.endTime}</span>
                      </div>
                    )}
                    {order.cancellationReason && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cancellation Reason:</span>
                        <span className="font-medium text-red-600">{order.cancellationReason}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.deliveryAddress && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h4>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{order.deliveryAddress.fullName}</p>
                      <p className="text-muted-foreground">{order.deliveryAddress.address}</p>
                      <p className="text-muted-foreground">
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {order.deliveryAddress.addressType || 'Other'}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Order Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee:</span>
                    <span>{formatCurrency(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>{formatCurrency(order.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-base col-span-2 pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(order.finalAmount)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
} 