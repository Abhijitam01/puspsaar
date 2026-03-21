'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { Discount } from '@/app/admin/marketing/page'

export const discountColumns: ColumnDef<Discount>[] = [
  {
    accessorKey: 'code',  
    header: 'Code',
    cell: ({ row }) => (
      <div>
        <div className="font-mono font-medium">{row.getValue('code')}</div>
        <div className="text-sm text-muted-foreground">{row.original.description}</div>
      </div>
    )
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <Badge variant="outline">{row.getValue('type')}</Badge>
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const type = row.original.type
      const value = row.getValue<number>('value')

      if (type === 'PERCENTAGE') return `${value}%`
      if (type === 'FIXED_AMOUNT') return `₹${value}`
      if (type === 'FREE_SHIPPING') return 'Free Shipping'
      return value.toString()
    }
  },
  {
    accessorKey: 'usage',
    header: 'Usage',
    cell: ({ row }) => {
      const used = row.original.usedCount
      const limit = row.original.usageLimit

      return (
        <div>
          <div className="font-medium">{used}{limit ? ` / ${limit}` : ''}</div>
          {limit && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(used / limit) * 100}%` }}
              />
            </div>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: 'validUntil',
    header: 'Expires',
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('validUntil')).toLocaleDateString()}
      </div>
    )
  },
  {
  accessorKey: 'isActive',
  header: 'Status',
  cell: ({ row }) => {
    const isActive = row.getValue<boolean>('isActive')
    const statusColors = isActive
      ? 'bg-green-100 text-green-800'  
      : 'bg-red-100 text-red-800'       

    return (
      <Badge className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors}`}>
        {isActive ? 'Active' : 'Inactive'}
      </Badge>
    )
  }
},

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2" />
            Edit Discount
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]