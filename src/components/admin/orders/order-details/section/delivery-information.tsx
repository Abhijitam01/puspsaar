import { IOrder } from "@/model/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation, Home } from "lucide-react";
import { formatTime } from "@/lib/utils/dateTimeUtils";
import { Separator } from "@/components/ui/separator";

interface DeliveryInformationProps {
  order: IOrder;
}

export function DeliveryInformation({ order }: DeliveryInformationProps) {
  return (
    <Card className="dark:bg-muted-foreground/5  bg-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Delivery Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Delivery Address */}
          {order.deliveryAddress && (
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Home className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">
                    {order.deliveryAddress.fullName}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>{order.deliveryAddress.address}</div>
                    {order.deliveryAddress.landmark && (
                      <div>Near: {order.deliveryAddress.landmark}</div>
                    )}
                    <div>
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs">Phone: {order.deliveryAddress.phoneNumber}</span>
                      {order.deliveryAddress.addressType && (
                        <Badge variant="outline" className="text-xs">
                          {order.deliveryAddress.addressType}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Coordinates */}
              {order.deliveryAddress.latitude && order.deliveryAddress.longitude && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Navigation className="h-3 w-3" />
                  <span>
                    {order.deliveryAddress.latitude.toFixed(6)}, {order.deliveryAddress.longitude.toFixed(6)}
                  </span>
                </div>
              )}
            </div>
          )}
          <Separator />
          {/* Delivery Slot */}
          {order.deliverySlot && (
            <div className="">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Delivery Slot</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="font-medium">{order.deliverySlot.name}</div>
                <div className="flex items-center space-x-2">
                  <span>Time: {formatTime(order.deliverySlot.startTime)} - {formatTime(order.deliverySlot.endTime)}</span>
                </div>
            </div>
            </div>
          )}

          <Separator />
          {/* Default Address Indicator */}
          {order.deliveryAddress?.isDefault && (
            <div className="pt-2 ">
              <Badge variant="secondary" className="text-xs">
                Default Address
              </Badge>
            </div>
          )}

          {/* No delivery address fallback */}
          {!order.deliveryAddress && (
            <div className="text-center py-4 text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No delivery address available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}