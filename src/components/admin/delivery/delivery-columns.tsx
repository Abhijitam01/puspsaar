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
import { CalendarClock, MoreHorizontal, Phone } from 'lucide-react'

export type TestDriveStatus = 'REQUESTED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface TestDrive {
  id: string
  requestId: string
  vehicle: string
  vin: string
  customerName: string
  customerPhone: string
  advisorName: string
  advisorPhone: string
  status: TestDriveStatus
  preferredSlot: string
  hub: string
  driveType: 'CITY' | 'HIGHWAY' | 'HOME_TEST'
  notes?: string
  requestedAt: string
}

const statusStyles: Record<TestDriveStatus, string> = {
  REQUESTED: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export const deliveryColumns: ColumnDef<TestDrive>[] = [
  {
    accessorKey: 'requestId',
    header: 'Request',
    cell: ({ row }) => (
      <div>
        <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
          {row.getValue('requestId')}
        </code>
        <div className="text-xs text-muted-foreground ">
          VIN: {row.original.vin}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('vehicle')}</div>
        <div className="text-xs text-muted-foreground">{row.original.driveType} drive</div>
      </div>
    )
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('customerName')}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Phone className="h-3 w-3" />
          {row.original.customerPhone}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'advisorName',
    header: 'Advisor',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('advisorName')}</div>
        <div className="text-xs text-muted-foreground">{row.original.hub}</div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className={`${statusStyles[row.getValue('status') as TestDriveStatus]} rounded-full`}>
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'preferredSlot',
    header: 'Preferred Slot',
    cell: ({ row }) => {
      const date = new Date(row.getValue('preferredSlot'))
      return (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <CalendarClock className="h-3 w-3 text-muted-foreground" />
            {date.toLocaleDateString()}
          </div>
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
          <DropdownMenuItem onClick={() => alert(`Viewing ${row.original.requestId}`)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert(`Assigning ${row.original.requestId}`)}>
            Assign
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert(`Cancelling ${row.original.requestId}`)}>
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]