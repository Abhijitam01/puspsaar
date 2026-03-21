"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@/model/order"
import { Package, Clock, Truck, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface OrderStatusUpdateDialogProps {
  currentStatus: OrderStatus
  orderId: string
  onStatusUpdate: (orderId: string, status: OrderStatus, reason?: string) => void
  isUpdating?: boolean
  trigger?: React.ReactNode
}

const statusConfig = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-500",
    description: "Order is pending confirmation"
  },
  [OrderStatus.CONFIRMED]: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "bg-blue-500/10 text-blue-500",
    description: "Order has been confirmed"
  },
  [OrderStatus.PACKED]: {
    label: "Packed",
    icon: Package,
    color: "bg-purple-500/10 text-purple-500",
    description: "Order has been packed"
  },
  [OrderStatus.OUT_FOR_DELIVERY]: {
    label: "Out for Delivery",
    icon: Truck,
    color: "bg-orange-500/10 text-orange-500",
    description: "Order is out for delivery"
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-500",
    description: "Order has been delivered"
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-500/10 text-red-500",
    description: "Order has been cancelled"
  },
  [OrderStatus.RETURNED]: {
    label: "Returned",
    icon: RotateCcw,
    color: "bg-gray-500/10 text-gray-500",
    description: "Order has been returned"
  }
}

const getNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  switch (currentStatus) {
    case OrderStatus.PENDING:
      return [OrderStatus.CONFIRMED, OrderStatus.CANCELLED]
    case OrderStatus.CONFIRMED:
      return [OrderStatus.PACKED, OrderStatus.CANCELLED]
    case OrderStatus.PACKED:
      return [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED]
    case OrderStatus.OUT_FOR_DELIVERY:
      return [OrderStatus.DELIVERED, OrderStatus.RETURNED]
    case OrderStatus.DELIVERED:
      return [OrderStatus.RETURNED]
    default:
      return []
  }
}

export function OrderStatusUpdateDialog({
  currentStatus,
  orderId,
  onStatusUpdate,
  isUpdating = false,
  trigger
}: OrderStatusUpdateDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus)
  const [reason, setReason] = useState("")

  console.log(selectedStatus);

  const nextStatuses = getNextStatuses(currentStatus)
  const currentConfig = statusConfig[currentStatus]
  const selectedConfig = statusConfig[selectedStatus]

  const handleSubmit = () => {
    if (selectedStatus !== currentStatus) {
      onStatusUpdate(orderId, selectedStatus, reason.trim() || undefined)
      setOpen(false)
      setReason("")
      setSelectedStatus(currentStatus)
    }
    console.log(selectedStatus)
  }

  const CurrentIcon = currentConfig.icon
  const SelectedIcon = selectedConfig.icon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Update Status
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order | <span className='text-green-400 font-bold'>{orderId}</span>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-6">
          {/* Current Status */}
          <div className="space-y-2">

            <div className="flex items-center gap-3 p-3 rounded-sm  bg-muted-foreground/9">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <CurrentIcon className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <Label className="">Current Status</Label>

                <p className="text-sm text-muted-foreground mt-1">
                  {currentConfig.description}
                </p>
              </div>
              <Badge variant="secondary" className={currentConfig.color}>
                {currentConfig.label}
              </Badge>
            </div>
          </div>

          {/* New Status Selection */}
          <div className="space-y-5">
            <Label className="line-clamp-1">New Status</Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as OrderStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={currentStatus} disabled>
                  <div className="flex items-center gap-2">
                    <CurrentIcon className="h-4 w-4" />
                    {currentConfig.label} (Current)
                  </div>
                </SelectItem>
                {nextStatuses.map((status) => {
                  const config = statusConfig[status]
                  const Icon = config.icon
                  return (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {config.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            {selectedStatus !== currentStatus && (
              <div className="flex items-center gap-3 p-3 p-3 rounded-sm bg-muted-foreground/9">
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                  <SelectedIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <Label className="line-clamp-1">New Status</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedConfig.description}
                  </p>
                </div>
               <Badge variant="secondary" className={selectedConfig.color} > {selectedConfig.label} </Badge>

              </div>
            )}
          </div>

          {/* Reason (optional for most statuses, required for cancellation) */}
          {selectedStatus !== currentStatus && (
            <div className="space-y-2">
              <Label className="line-clamp-1">
                Reason {selectedStatus === OrderStatus.CANCELLED || selectedStatus === OrderStatus.RETURNED ? "(Required)" : "(Optional)"}
              </Label>
              <Textarea
                id="reason"
                placeholder={`Enter reason for ${selectedConfig.label.toLowerCase()}...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="resize-none border-gray-50 border-1"
                rows={3}
              />
            </div>
          )}
        </div>
        <Separator />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={'default'}
            className="cursor-pointer text-white bg-secondary hover:bg-secondary/90 transition-all"
            onClick={handleSubmit}
            disabled={
              selectedStatus === currentStatus ||
              isUpdating ||
              ((selectedStatus === OrderStatus.CANCELLED || selectedStatus === OrderStatus.RETURNED) && !reason.trim())
            }
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}