import { IOrder } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getYear } from "@/lib/utils/dateTimeUtils";
import { User, Phone, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CustomerInformationProps {
  order: IOrder;
}

export function CustomerInformation({ order }: CustomerInformationProps) {
  return (
    <Card className="dark:bg-muted-foreground/5  bg-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Customer Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span>Customer ID</span>
            </div>
            <span className="font-medium text-sm">#{order.customerId.slice(-8)}</span>
          </div>

          {order.deliveryAddress && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </div>
                <span className="font-medium text-sm">{order.deliveryAddress.fullName}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </div>
                <span className="font-medium text-sm">{order.deliveryAddress.phoneNumber}</span>
              </div>

              {order.deliveryAddress.alternatePhoneNumber && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Alternate Phone</span>
                  </div>
                  <span className="font-medium text-sm">{order.deliveryAddress.alternatePhoneNumber}</span>
                </div>
              )}

              {order.deliveryAddress.addressType && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Address Type</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {order.deliveryAddress.addressType}
                  </Badge>
                </div>
              )}
            </>
          )}

          <Separator />
          {/* Additional customer info could be added here if available */}
          <div className="pt-2 ">
            <div className="text-xs text-muted-foreground">
              Customer since: {order.createdAt ? getYear(order.createdAt) : "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}