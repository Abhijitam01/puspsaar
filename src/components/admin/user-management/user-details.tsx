'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IDeliveryAddress, IOrder } from "@/model/order";
import { IUser } from "@/model/user";
import { PersonalDetails } from "./section/personal-details";
import { OrderHistory } from "./section/order-history";
import { Skeleton } from "@/components/ui/skeleton";


interface UserDetailsProps {
  user: IUser;
  deliveryAddresses: IDeliveryAddress[];
  orders: IOrder[];
  isTabLoading?: (tab: string) => boolean;
  onTabChange?: (tab: string) => void;
}

export function UserDetails({
  user,
  deliveryAddresses,
  orders,
  isTabLoading,
  onTabChange
}: UserDetailsProps) {

  const handleTabChange = (value: string) => {
    onTabChange?.(value);
  };

  return (
    <div className="min-h-screen px-4 md:px-8">
      <Tabs defaultValue="personal" className="w-full" onValueChange={handleTabChange}>


        <TabsList className="grid grid-cols-3  gap-3 bg-transprent  dark:bg-muted-foreground/10 p-1 h-12">
          <TabsTrigger
            value="personal"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all 
                 data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                 hover:bg-blue-100"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all 
                 data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                 hover:bg-blue-100"
          >
            Order History
          </TabsTrigger>
        </TabsList>
        <div className="p-6">
          {/* Personal Info Tab */}
          <TabsContent value="personal" className="mt-0">
            {isTabLoading?.('personal') ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : (
              <PersonalDetails user={user} deliveryAddresses={deliveryAddresses} />
            )}
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders" className="mt-0">
            {isTabLoading?.('orders') ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : (
              <OrderHistory orders={orders} />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}