'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { IAuditLog } from '@/app/admin/system/page' // adjust import path if needed

export const auditColumns: ColumnDef<IAuditLog>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Timestamp',
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('createdAt')).toLocaleString()}
      </div>
    )
  },
  {
    accessorKey: 'userEmail',
    header: 'User',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('userEmail') || 'System'}</div>
        <div className="text-xs text-muted-foreground">{row.original.ipAddress}</div>
      </div>
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const action = row.getValue<string>('action')
      const variant =
        action === 'CREATE'
          ? 'default'
          : action === 'UPDATE'
          ? 'secondary'
          : action === 'DELETE'
          ? 'destructive'
          : 'outline'

      return <Badge variant={variant}>{action}</Badge>
    }
  },
  {
    accessorKey: 'entityType',
    header: 'Entity',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('entityType')}</div>
        <div className="text-xs text-muted-foreground">{row.original.entityId}</div>
      </div>
    )
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => (
      <div className="max-w-xs truncate text-sm">
        {row.getValue('details') || 'No details available'}
      </div>
    )
  }
]