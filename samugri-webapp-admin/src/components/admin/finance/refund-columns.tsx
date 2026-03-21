'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export interface Refund {
  id: string
  orderId: string
  paymentId: string
  amount: number
  reason: string
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED'
  customerName: string
  requestedAt: string
  processedAt?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'SUCCESS': return 'green'
    case 'PROCESSING': return 'yellow'
    case 'FAILED': return 'red'
    case 'PENDING': return 'blue'
    default: return 'gray'
  }
}

export const refundColumns: ColumnDef<Refund>[] = [
  {
    accessorKey: 'orderId',
    header: 'Order',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('orderId')}</div>
    )
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('customerName')}</div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="font-medium">
        ₹{row.getValue<number>('amount').toLocaleString()}
      </div>
    )
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue('reason')}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`border-${getStatusColor(row.getValue('status'))}-500 text-${getStatusColor(row.getValue('status'))}-700`}
      >
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'requestedAt',
    header: 'Requested',
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('requestedAt')).toLocaleDateString()}
      </div>
    )
  }
]