'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/ui/data-table';
import { dummyOrders } from '@/data/order-history-data';
import { IOrder, OrderStatus, PaymentStatus } from '@/model/order';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBasketIcon } from 'lucide-react';
import { AssignDeliverySheet } from '@/components/admin/orders/assign-delivery-sheet.tsx';
import { createOrderColumns } from '@/components/admin/orders/order-columns';
import OrdersStatsPage from '@/components/admin/orders/order-stars';

const orderStatusOptions = [
    { value: "all", label: "All Status" },
    { value: OrderStatus.PENDING, label: "Pending" },
    { value: OrderStatus.CONFIRMED, label: "Confirmed" },
    { value: OrderStatus.PACKED, label: "Packed" },
    { value: OrderStatus.OUT_FOR_DELIVERY, label: "Out for Delivery" },
    { value: OrderStatus.DELIVERED, label: "Delivered" },
    { value: OrderStatus.CANCELLED, label: "Cancelled" },
    { value: OrderStatus.RETURNED, label: "Returned" },
];

const paymentStatusOptions = [
    { value: "all", label: "All Payment Status" },
    { value: PaymentStatus.PENDING, label: "Pending" },
    { value: PaymentStatus.COMPLETED, label: "Completed" },
    { value: PaymentStatus.FAILED, label: "Failed" },
    { value: PaymentStatus.REFUNDED, label: "Refunded" },
];

export default function OrderPage() {
    const router = useRouter();
    const [orderStatusFilter, setOrderStatusFilter] = useState("all");
    const [orders, setOrders] = useState<IOrder[]>(dummyOrders as IOrder[]);
    const [isAssignDeliveryOpen, setIsAssignDeliveryOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const [searchValue, setSearchValue] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Handler for updating order status
    const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
        // console.log(`Updating order ${orderId} to status: ${status}`);

        // Update the local state for demo purposes
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId
                    ? { ...order, orderStatus: status }
                    : order
            )
        );
    };

    // Handler for assigning delivery agent
    const handleAssignDelivery = (orderId: string) => {
        console.log(`Assigning delivery agent to order: ${orderId}`);
        setSelectedOrderId(orderId);
        setIsAssignDeliveryOpen(true);
    };

    // Handler for viewing order details
    const handleViewDetails = (orderId: string) => {
        console.log(`Viewing details for order: ${orderId}`);
        router.push(`/admin/order/${orderId}`);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate refresh
        setTimeout(() => {
            setIsLoading(false);
            console.log('Orders refreshed');
        }, 1000);
    };

    const handleClearFilters = () => {
        setSearchValue("");
        setOrderStatusFilter("all");
        setPaymentStatusFilter("all");
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = searchValue === "" ||
            order.orderNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
            (order.customerName && order.customerName.toLowerCase().includes(searchValue.toLowerCase()));

        const matchesOrderStatus = orderStatusFilter === "all" ||
            order.orderStatus === orderStatusFilter;

        const matchesPaymentStatus = paymentStatusFilter === "all" ||
            order.paymentStatus === paymentStatusFilter;

        return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
    });

    return (
        <div className="min-h-screen py-2 px-4 md:px-8">
            <div className="m-4">
                <h1 className='text-2xl font-bold'>Sales & Test Drives</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Sales & Test Drives</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <Separator className="my-5" />
        
            <div className="space-y-5">
                <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShoppingBasketIcon className="h-5 w-5 text-blue-600" />
                                Sales & Test Drives Overview
                            </CardTitle>
                            <CardDescription>Monitor key order metrics and monthly performance changes.</CardDescription>
                        </CardHeader>
                        <CardContent className='pb-4'>
                            <OrdersStatsPage />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='space-y-5 mt-5 p-0.5 bg-gray-50 dark:bg-muted-foreground/10 rounded-lg'>
                <Card className='border-0 shadow-sm'>
                    <CardContent className="p-5">
                        <DataTable
                            columns={createOrderColumns(
                                handleStatusUpdate,
                                handleAssignDelivery,
                                handleViewDetails
                            )}
                            data={filteredOrders} // Use filteredOrders instead of orders
                            searchPlaceholder="Search orders..."
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            filters={[
                                {
                                    key: "orderStatus",
                                    placeholder: "Order Status",
                                    value: orderStatusFilter,
                                    options: orderStatusOptions,
                                    onChange: setOrderStatusFilter,
                                },
                                {
                                    key: "paymentStatus",
                                    placeholder: "Payment Status",
                                    value: paymentStatusFilter,
                                    options: paymentStatusOptions,
                                    onChange: setPaymentStatusFilter,
                                }
                            ]}
                            onRefresh={handleRefresh}
                            onClearFilters={handleClearFilters}
                            isLoading={isLoading}
                            // pagination={{
                            //     pageIndex: 0,
                            //     pageSize: 10,
                            //     totalItems: filteredOrders.length,
                            //     totalPages: Math.ceil(filteredOrders.length / 10),
                            // }}
                            // onPaginationChange={(pageIndex, pageSize) => {
                            //     console.log(`Page changed to ${pageIndex + 1}, page size: ${pageSize}`);
                            // }}
                        />
                    </CardContent>
                </Card>
            </div>
            <AssignDeliverySheet
                open={isAssignDeliveryOpen}
                onOpenChange={setIsAssignDeliveryOpen}
                orderId={selectedOrderId}
            />
        </div>
    );
}