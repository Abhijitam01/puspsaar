import { IOrderStatusHistory, OrderStatus } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateSafely } from "@/lib/utils/dateTimeUtils";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

// Status configuration for timeline
const statusConfig = {
  [OrderStatus.PENDING]: { 
    color: "#FBAE44", 
    label: "Order Placed",
    icon: Clock,
    description: "Order has been placed and is awaiting confirmation"
  },
  [OrderStatus.CONFIRMED]: { 
    color: "#3B82F6", 
    label: "Order Confirmed",
    icon: CheckCircle,
    description: "Order has been confirmed and is being prepared"
  },
  [OrderStatus.PACKED]: { 
    color: "#8B5CF6", 
    label: "Order Packed",
    icon: CheckCircle,
    description: "Order has been packed and is ready for delivery"
  },
  [OrderStatus.OUT_FOR_DELIVERY]: { 
    color: "#F59E0B", 
    label: "Out for Delivery",
    icon: CheckCircle,
    description: "Order is out for delivery"
  },
  [OrderStatus.DELIVERED]: { 
    color: "#10B981", 
    label: "Delivered",
    icon: CheckCircle,
    description: "Order has been successfully delivered"
  },
  [OrderStatus.CANCELLED]: { 
    color: "#EF4444", 
    label: "Cancelled",
    icon: XCircle,
    description: "Order has been cancelled"
  },
  [OrderStatus.RETURNED]: { 
    color: "#F97316", 
    label: "Returned",
    icon: AlertCircle,
    description: "Order has been returned"
  },
};

interface OrderTimelineProps {
  statusHistory: IOrderStatusHistory[];
}

export function OrderTimeline({ statusHistory }: OrderTimelineProps) {
  // Sort status history by creation date (newest first)
  const sortedHistory = [...(statusHistory || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card className="dark:bg-muted-foreground/3  bg-white border-none dark:shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Order Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No status history available</p>
            </div>
          ) : (
            sortedHistory.map((status, index) => {
              const config = statusConfig[status.status] || {
                color: "#6B7280",
                label: status.status || "Unknown",
                icon: AlertCircle,
                description: "Status changed"
              };
              const IconComponent = config.icon;
              const isLatest = index === 0;

              return (
                <div key={status.id} className="flex items-start space-x-3">
                  {/* Status Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isLatest ? 'ring-2 ring-offset-2' : ''
                  }`} style={{
                    backgroundColor: `${config.color}20`,
                    border: `2px solid ${config.color}`,
                    ...(isLatest && { ringColor: config.color })
                  }}>
                    <IconComponent 
                      className="h-4 w-4" 
                      style={{ color: config.color }}
                    />
                  </div>

                  {/* Status Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{config.label}</h4>
                      {isLatest && (
                        <Badge 
                          className="text-xs"
                          style={{
                            backgroundColor: `${config.color}10`,
                            color: config.color
                          }}
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {config.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDateSafely(status.createdAt, "MMM dd, yyyy 'at' hh:mm a")}
                      </span>
                      {status.changedBy && (
                        <span className="text-xs text-muted-foreground">
                          by {status.changedBy}
                        </span>
                      )}
                    </div>
                    {status.reason && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Reason: {status.reason}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}