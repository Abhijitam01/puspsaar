import { IOrderItem } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface OrderItemsProps {
  orderItems: IOrderItem[];
}

export function OrderItems({ orderItems }: OrderItemsProps) {
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Card className="dark:bg-muted-foreground/5  bg-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>Order Items ({orderItems.length} items)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 dark:bg-muted-foreground/5  bg-white border-none shadow-sm rounded-lg">
              {/* Product Image */}
              <div className="flex-shrink-0">
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    width={64}
                    height={64}
                    alt={item.productName || `Product ${index + 1}`}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">
                      {item.productName || `Product ${index + 1}`}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.unitPrice.toFixed(2)} each</span>
                      {item.bucketId && (
                        <Badge variant="outline" className="text-xs">
                          Bucket Item
                        </Badge>
                      )}
                    </div>
                    {item.specialRequirements && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Note: {item.specialRequirements}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{item.totalPrice.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Separator />
          {/* Summary */}
          <div className=" pt-4 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-medium">{totalQuantity}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}