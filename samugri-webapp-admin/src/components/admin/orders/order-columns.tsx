"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Truck, RefreshCw } from "lucide-react";
import { IOrder, OrderStatus, PaymentStatus } from "@/model/order";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { OrderStatusUpdateDialog } from "./order-status-update-dialog";
import { formatDateSafely } from "@/lib/utils/dateTimeUtils";

// Status badge components
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
      className="rounded-full bg-opacity-10 font-medium"
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
      className="rounded-full bg-opacity-10 font-medium"
      style={{
        backgroundColor: `${config.color}10`,
        color: config.color
      }}
    >
      {config.label}
    </Badge>
  );
}

interface OrderActionsProps {
  order: IOrder;
  onStatusUpdate?: (orderId: string, status: OrderStatus) => void;
  onAssignDelivery?: (orderId: string) => void;
  onViewDetails?: (orderId: string) => void;
}

function OrderActions({ order, onStatusUpdate, onAssignDelivery }: OrderActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (orderId: string, status: OrderStatus, reason?: string) => {
    if (onStatusUpdate) {
      setIsUpdating(true);
      try {
        await onStatusUpdate(orderId, status);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuItem onClick={() => router.push(`/admin/order/${order.id}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onAssignDelivery?.(order.id)}>
          <Truck className="mr-2 h-4 w-4" />
          Assign Delivery Agent
        </DropdownMenuItem>

        {order.orderStatus !== OrderStatus.DELIVERED &&
          order.orderStatus !== OrderStatus.CANCELLED &&
          order.orderStatus !== OrderStatus.RETURNED && (
            <>
              {order.orderStatus === OrderStatus.PENDING && (
                <DropdownMenuItem
                  onClick={() => handleStatusUpdate(order.id, OrderStatus.CONFIRMED)}
                  disabled={isUpdating}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                  Confirm Order
                </DropdownMenuItem>
              )}

              {order.orderStatus === OrderStatus.CONFIRMED && (
                <DropdownMenuItem
                  onClick={() => handleStatusUpdate(order.id, OrderStatus.PACKED)}
                  disabled={isUpdating}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                  Mark as Packed
                </DropdownMenuItem>
              )}

              {order.orderStatus === OrderStatus.PACKED && (
                <DropdownMenuItem
                  onClick={() => handleStatusUpdate(order.id, OrderStatus.OUT_FOR_DELIVERY)}
                  disabled={isUpdating}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Out for Delivery
                </DropdownMenuItem>
              )}

              {order.orderStatus === OrderStatus.OUT_FOR_DELIVERY && (
                <DropdownMenuItem
                  onClick={() => handleStatusUpdate(order.id, OrderStatus.DELIVERED)}
                  disabled={isUpdating}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                  Mark as Delivered
                </DropdownMenuItem>
              )}


            </>
          )}

        <OrderStatusUpdateDialog
          currentStatus={order.orderStatus}
          orderId={order.id}
          isUpdating={isUpdating}
          onStatusUpdate={handleStatusUpdate}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Status
            </DropdownMenuItem>
          }
        />

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const createOrderColumns = (
  onStatusUpdate?: (orderId: string, status: OrderStatus) => void,
  onAssignDelivery?: (orderId: string) => void,
  onViewDetails?: (orderId: string) => void
): ColumnDef<IOrder>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
      cell: ({ row }) => {
        const orderNumber = row.original.orderNumber as string;
        return (
          <div className="font-medium">
            {orderNumber}
          </div>
        );
      },
    },
   {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('customerName')}</div>
        <div className="text-xs text-muted-foreground">{row.original.customerEmail}</div>
      </div>
    )
  },
    {
      accessorKey: "orderItems",
      header: "Items",
      cell: ({ row }) => {
        const orderItems = row.getValue("orderItems") as IOrder["orderItems"];
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        return (
          <div className="text-center">
            {totalQuantity} 
          </div>
        );
      },
    },
    {
      accessorKey: "finalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("finalAmount") as number;
        return (
          <div className="font-medium">
            ₹{amount.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("orderStatus") as OrderStatus;
         console.log(status);
        return getOrderStatusBadge(status);
       
      },
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as PaymentStatus;
        return getPaymentStatusBadge(status);
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => {
        const method = row.getValue("paymentMethod") as string;
        return (
          <Badge variant="outline" className="uppercase">
            {method}
          </Badge>
        );
      },
    },
     {
    accessorKey: 'trackingNumber',
    header: 'Tracking',
    cell: ({ row }) => (
      row.original.trackingNumber ? (
        <code className="text-xs bg-muted px-2 py-1 rounded">
          {row.original.trackingNumber}
        </code>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    )
  },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Date" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return (
          <div className="text-sm">
            {formatDateSafely(date, "MMM dd, yyyy")}
            <div className="text-xs text-muted-foreground">
              {formatDateSafely(date, "hh:mm a")}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <OrderActions
            order={order}
            onStatusUpdate={onStatusUpdate}
            onAssignDelivery={onAssignDelivery}
            onViewDetails={onViewDetails}

          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];