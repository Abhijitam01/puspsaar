'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export interface SupportTicket {
  id: string
  ticketNumber: string
  customerName: string
  customerEmail: string
  subject: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  category: string
  assignedTo?: string
  createdAt: string
  lastUpdated: string
}

// Tailwind-safe mappings
const priorityClasses: Record<SupportTicket['priority'], string> = {
  LOW: 'border-green-500 text-green-700',
  MEDIUM: 'border-yellow-500 text-yellow-700',
  HIGH: 'border-orange-500 text-orange-700',
  URGENT: 'border-red-500 text-red-700',
}

const statusClasses: Record<SupportTicket['status'], string> = {
  OPEN: 'border-red-500 text-red-700',
  IN_PROGRESS: 'border-yellow-500 text-yellow-700',
  RESOLVED: 'border-green-500 text-green-700',
  CLOSED: 'border-gray-500 text-gray-700',
}

export const ticketColumns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: 'ticketNumber',
    header: 'Ticket',
    cell: ({ row }) => (
      <div>
        <div className="font-medium line-clamp-1">{row.getValue('ticketNumber')}</div>
        <div className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      </div>
    ),
  },    

  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('customerName')}</div>
        <div className="text-xs text-muted-foreground">{row.original.customerEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => (
      <div>
        <div className="font-medium max-w-xs truncate">{row.getValue('subject')}</div>
        <Badge variant="outline" className="text-xs mt-1">
          {row.original.category}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={priorityClasses[row.getValue('priority') as SupportTicket['priority']]}
      >
        {row.getValue('priority')}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={statusClasses[row.getValue('status') as SupportTicket['status']]}
      >
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="text-sm">
        {row.getValue('assignedTo') || 'Unassigned'}
      </div>
    ),
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('lastUpdated')).toLocaleDateString()}
      </div>
    ),
  },
]