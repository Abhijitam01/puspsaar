import { IOrder, PaymentStatus } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Receipt, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Payment status badge component
function getPaymentStatusBadge(status: PaymentStatus) {
  const statusConfig = {
    [PaymentStatus.PENDING]: { color: "#FBAE44", label: "Pending" },
    [PaymentStatus.COMPLETED]: { color: "#10B981", label: "Completed" },
    [PaymentStatus.FAILED]: { color: "#EF4444", label: "Failed" },
    [PaymentStatus.REFUNDED]: { color: "#F97316", label: "Refunded" },
  };

  // Get config or use fallback for unknown status
  const config = statusConfig[status] || { color: "#6B7280", label: status || "Unknown" };
  
  return (
    <Badge 
      className="rounded-full bg-opacity-10 font-medium text-sm px-3 py-1"
      style={{
        backgroundColor: `${config.color}10`,
        color: config.color
      }}
    >
      {config.label}
    </Badge>
  );
}

interface PaymentInformationProps {
  order: IOrder;
}

export function PaymentInformation({ order }: PaymentInformationProps) {
  return (
    <Card className="dark:bg-muted-foreground/5  bg-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Receipt className="h-4 w-4" />
              <span>Payment Status</span>
            </div>
            {getPaymentStatusBadge(order.paymentStatus)}
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Payment Method</span>
            </div>
            <Badge variant="outline" className="uppercase">
              {order.paymentMethod}
            </Badge>
          </div>
            <Separator />
          {/* Payment Breakdown */}
          <div className="pt-3  space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">-₹{order.discount.toFixed(2)}</span>
              </div>
            )}

            {order.discountAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Coupon Discount</span>
                <span className="text-green-600">-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}

            {order.deliveryFee > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₹{order.deliveryFee.toFixed(2)}</span>
              </div>
            )}

            {order.taxAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{order.taxAmount.toFixed(2)}</span>
              </div>
            )}
              <Separator />
            <div className="flex items-center justify-between text-base font-semibold pt-2 ">
              <span>Total Amount</span>
              <span className="text-green-600">₹{order.finalAmount.toFixed(2)}</span>
            </div>
          </div>

            <Separator />
          {/* Payment References */}
          {(order.paymentRef || order.razorpayOrderId || order.razorpayPaymentId) && (
            <div className="pt-3  space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Payment References
              </div>
              
              {order.paymentRef && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Payment Ref</span>
                  <span className="font-mono">{order.paymentRef}</span>
                </div>
              )}

              {order.razorpayOrderId && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Razorpay Order ID</span>
                  <span className="font-mono">{order.razorpayOrderId}</span>
                </div>
              )}

              {order.razorpayPaymentId && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Razorpay Payment ID</span>
                  <span className="font-mono">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          )}
            <Separator />
          {/* Coupon Information */}
          {order.couponCode && (
            <div className="pt-3 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Coupon Applied</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {order.couponCode}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}