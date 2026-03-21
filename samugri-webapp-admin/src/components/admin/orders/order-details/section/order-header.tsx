import { IOrder, OrderStatus, PaymentStatus } from "@/model/order";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateSafely } from "@/lib/utils/dateTimeUtils";
import { Calendar, Clock, Package } from "lucide-react";

// Status badge components (reused from order-columns)
function getOrderStatusBadge(status: OrderStatus) {
  const statusConfig = {
    [OrderStatus.PENDING]: { color: "#FBAE44", label: "Pending" },
    [OrderStatus.CONFIRMED]: { color: "#3B82F6", label: "Confirmed" },
    [OrderStatus.PACKED]: { color: "#8B5CF6", label: "Packed" },
    [OrderStatus.OUT_FOR_DELIVERY]: { color: "#F59E0B", label: "Out for Delivery" },
    [OrderStatus.DELIVERED]: { color: "#10B981", label: "Delivered" },
    [OrderStatus.CANCELLED]: { color: "#EF4444", label: "Cancelled" },
    [OrderStatus.RETURNED]: { color: "#F97316", label: "Returned" },
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

interface OrderHeaderProps {
  order: IOrder;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <Card className="shadow-none border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
              <div className="flex items-center space-x-2">
                {getOrderStatusBadge(order.orderStatus)}
                {getPaymentStatusBadge(order.paymentStatus)}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Ordered on {order.createdAt ? formatDateSafely(order.createdAt, "MMM dd, yyyy") : "N/A"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{order.createdAt ? formatDateSafely(order.createdAt, "hh:mm a") : "N/A"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{(order.orderItems?.length || 0)} item{(order.orderItems?.length || 0) !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ₹{order.finalAmount.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Amount
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}