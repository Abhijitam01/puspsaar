'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Payment } from '@/app/admin/finance/page'


const getStatusColor = (status: string) => {
  switch (status) {
    case 'SUCCESS': case 'PAID': return 'green'
    case 'PENDING': case 'ISSUED': case 'PROCESSING': return 'yellow'
    case 'FAILED': case 'CANCELLED': return 'red'
    case 'REFUNDED': return 'blue'
    default: return 'gray'
  }
}
export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'orderId',
    header: 'Order',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('orderId')}</div>
        <div className="text-sm text-muted-foreground">
          {new Date(row.original.date).toLocaleDateString()}
        </div>
      </div>
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
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => (
      <div>
        <Badge variant="outline">{row.getValue('method')}</Badge>
        {row.original.cardLast4 && (
          <div className="text-xs text-muted-foreground mt-1">
            **** {row.original.cardLast4}
          </div>
        )}
      </div>
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
    accessorKey: 'gatewayName',
    header: 'Gateway',
    cell: ({ row }) => (
      <div>
        <div className="text-sm">{row.getValue('gatewayName')}</div>
        {row.original.gatewayPaymentId && (
          <div className="text-xs text-muted-foreground font-mono">
            {row.original.gatewayPaymentId}
          </div>
        )}
      </div>
    )
  }
]   