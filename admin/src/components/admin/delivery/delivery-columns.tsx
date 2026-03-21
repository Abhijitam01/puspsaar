// components/admin/delivery/delivery-columns.tsx
'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'


export interface Delivery {
  id: string
  trackingId: string
  orderId: string
  customerName: string
  deliveryAddress: string
  agentName: string
  agentPhone: string
  status: 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED'
  scheduledDate: string
  deliveryTime?: string
  distance: number
  estimatedTime: number
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'yellow'
    case 'ASSIGNED': return 'blue'
    case 'PICKED_UP': return 'purple'
    case 'IN_TRANSIT': return 'orange'
    case 'OUT_FOR_DELIVERY': return 'green'
    case 'DELIVERED': return 'green'
    case 'FAILED': return 'red'
    default: return 'gray'
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'LOW': return 'green'
    case 'MEDIUM': return 'yellow'
    case 'HIGH': return 'orange'
    case 'URGENT': return 'red'
    default: return 'gray'
  }
}

export const deliveryColumns: ColumnDef<Delivery>[] = [
  {
    accessorKey: 'trackingId',
    header: 'Tracking ID',
    cell: ({ row }) => (
      <div>
        <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
          {row.getValue('trackingId')}
        </code>
        <div className="text-xs text-muted-foreground ">
          {row.original.orderId}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('customerName')}</div>
        <div className="text-xs text-muted-foreground max-w-xs truncate">
          {row.original.deliveryAddress}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'agentName',
    header: 'Delivery Agent',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('agentName')}</div>
        <div className="text-xs text-muted-foreground">{row.original.agentPhone}</div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className={`border-${getStatusColor(row.getValue('status'))}-500 rounded-full text-${getStatusColor(row.getValue('status'))}-700`}>
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge variant="outline" className={`border-${getPriorityColor(row.getValue('priority'))}-500 text-${getPriorityColor(row.getValue('priority'))}-700`}>
        {row.getValue('priority')}
      </Badge>
    )
  },
  {
    accessorKey: 'distance',
    header: 'Distance',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-medium">{row.getValue<number>('distance').toFixed(1)} km</div>
        <div className="text-xs text-muted-foreground">
          {row.original.estimatedTime > 0 ? `${row.original.estimatedTime} min` : 'Completed'}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'scheduledDate',
    header: 'Scheduled',
    cell: ({ row }) => {
      const date = new Date(row.getValue('scheduledDate'))
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">{date.toLocaleTimeString()}</div>
        </div>
      )
    }
  },
  {
  accessorKey: 'actions',
  header: 'Actions',
  cell: ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="p-1">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => alert(`Viewing ${row.original.trackingId}`)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Editing ${row.original.trackingId}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Cancelling ${row.original.trackingId}`)}>
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

]