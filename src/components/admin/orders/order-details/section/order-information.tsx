import { IOrder } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateSafely } from "@/lib/utils/dateTimeUtils";
import { 
  Hash, 
  User, 
  CreditCard, 
  Calendar,
  MessageSquare,
  Tag
} from "lucide-react";

interface OrderInformationProps {
  order: IOrder;
}

export function OrderInformation({ order }: OrderInformationProps) {
  return (
    <Card className="dark:bg-muted-foreground/5  bg-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Hash className="h-5 w-5" />
          <span>Order Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>Order ID</span>
              </div>
              <span className="font-medium">{order.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Customer ID</span>
              </div>
              <span className="font-medium">#{order.customerId.slice(-8)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Payment Method</span>
              </div>
              <Badge variant="outline" className="uppercase">
                {order.paymentMethod}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Order Date</span>
              </div>
              <span className="font-medium">
                {order.createdAt ? formatDateSafely(order.createdAt, "MMM dd, yyyy 'at' hh:mm a") : "N/A"}
              </span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            {order.couponCode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Coupon Code</span>
                </div>
                <Badge variant="secondary" className="uppercase">
                  {order.couponCode}
                </Badge>
              </div>
            )}

            {order.specialInstructions && (
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mt-0.5" />
                  <span>Special Instructions</span>
                </div>
                <span className="font-medium text-sm text-right max-w-xs">
                  {order.specialInstructions}
                </span>
              </div>
            )}

            {order.paymentRef && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Reference</span>
                </div>
                <span className="font-medium text-sm">{order.paymentRef}</span>
              </div>
            )}

            {order.razorpayOrderId && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Razorpay Order ID</span>
                </div>
                <span className="font-medium text-sm">{order.razorpayOrderId}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}