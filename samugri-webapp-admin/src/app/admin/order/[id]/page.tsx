"use client";

import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Download, Printer, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { OrderDetailsContent } from "@/components/admin/order/order-details/order-details-content";
// import { OrderDetailsSkeleton } from "@/components/users/sections/order/order-details-skeleton";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { OrderDetailsSkeleton } from "@/components/admin/user-management/section/orders/order-details-skeleton";
import { OrderDetailsContent } from "@/components/admin/orders/order-details/order-details-content";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="min-h-screen p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        <Separator className="mb-8" />

        <Card className="bg-transparent">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <RefreshCw className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Error Loading Order</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-4 md:px-8 space-y-5">
      <div className="flex items-center justify-between m-4">
        <div className="">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                 <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/order">Order Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Order Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Invoice </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print </Button>    
        </div>

      </div>
      <Separator className="" />

      {isLoading ? (
        <OrderDetailsSkeleton />
      ) : order ? (
        <OrderDetailsContent order={order} />
      ) : (
        <Card className="bg-transparent border shadow-none">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No order found</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}