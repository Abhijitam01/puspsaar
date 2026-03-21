'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { EmailTemplate } from '@/app/admin/system/page' // adjust import path if needed

export const emailTemplateColumns: ColumnDef<EmailTemplate>[] = [
  {
    accessorKey: 'name',
    header: 'Template',
    cell: ({ row }) => (
      <div> 
        <div className="pb-1">{row.getValue('name')}</div>
        <div className="text-[10px] dark:text-orange-400 text-muted-foreground">
          {row.original.code}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue('subject')}</div>
    )
  },
  {
    accessorKey: 'variables',
    header: 'Variables',
    cell: ({ row }) => (
      <div className="text-sm">
        {row.getValue<string[]>('variables').join(', ')}
      </div>
    )
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('isActive')

      return (
        <Badge
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'lastModified',
    header: 'Last Modified',
    cell: ({ row }) => (
      <div className="text-[12px]">
        {new Date(row.getValue('lastModified')).toLocaleDateString()}
      </div>
    )
  }
]