"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { dummyUsers } from "@/data/dummy-user";
import { dummyDeliveryAddresses, dummyOrders } from "@/data/order-history-data";
import { UserDetails } from '@/components/admin/user-management/user-details';


export default function ViewUserDetails() {
    const params = useParams();
    const userId = params.id as string;

    const user = dummyUsers.find(user => user.id === userId);
    const userAddresses = dummyDeliveryAddresses.filter(
        address => address.customerId === `cust_${userId.padStart(3, '0')}`
    );

    // Fixed: Create the formatted customer ID to match dummyOrders format
    const formattedCustomerId = `cust_${userId.padStart(3, '0')}`;
    const orders = dummyOrders.filter(
        order => order.customerId === formattedCustomerId
    );

    if (!user) {
        return (
            <div className="min-h-screen py-4 px-4 md:px-8 flex items-center justify-center">
                <div>User not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-4 px-4 md:px-8">
            <div className="m-4">
              <h1 className='text-2xl font-bold'>User Profile</h1>
                <Breadcrumb className="">
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/admin/user">Manage User</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>User Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Separator className="my-4 " />
            <div className="space-y-5 mt-5 p-0.5 bg-gray-50 dark:bg-muted-foreground/10 rounded-lg">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-5">
                        <UserDetails
                            user={user}
                            deliveryAddresses={userAddresses}
                            orders={orders} 
                              
                        />
                         
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}