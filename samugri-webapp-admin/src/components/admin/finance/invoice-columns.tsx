'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export interface Invoice {
  id: string
  invoiceNumber: string
  orderId: string
  customerName: string
  subtotal: number
  taxAmount: number
  totalAmount: number
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED'
  issuedAt?: string
  dueDate?: string
  paidAt?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'green'
    case 'ISSUED': return 'yellow'
    case 'CANCELLED': return 'red'
    default: return 'gray'
  }
}

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('invoiceNumber')}</div>
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
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => (
      <div className="font-medium">
        ₹{row.getValue<number>('totalAmount').toLocaleString()}
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
    accessorKey: 'issuedAt',
    header: 'Issued',
    cell: ({ row }) => (
      row.original.issuedAt ? (
        <div className="text-sm">
          {new Date(row.original.issuedAt).toLocaleDateString()}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    )
  }
]