'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Star, Eye, Edit, Package, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface Vendor {
  id: string
  vendorCode: string
  businessName: string
  businessType: 'INDIVIDUAL' | 'COMPANY'
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED'
  businessEmail: string
  businessPhone: string
  gstNumber?: string
  rating: number
  totalProducts: number
  totalSales: number
  commissionRate: number
  joinedDate: string
  lastSaleDate?: string
}

// ✅ Helper functions
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'green'
    case 'PENDING': return 'yellow'
    case 'SUSPENDED': return 'orange'
    case 'BLOCKED': return 'red'
    default: return 'gray'
  }
}

export const renderStars = (rating: number) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">
        {rating > 0 ? rating.toFixed(1) : 'New'}
      </span>
    </div>
  )
}

// ✅ Columns definition
export  const vendorColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: 'vendorCode',
    header: 'Vendor Code',
    cell: ({ row }) => <div className="font-medium">{row.getValue('vendorCode')}</div>
  },
  {
    accessorKey: 'businessName',
    header: 'Business',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('businessName')}</div>
        <div className="text-sm text-muted-foreground">
          <Badge variant="outline" className="mr-2">{row.original.businessType}</Badge>
          {row.original.gstNumber && <span className="text-xs">{row.original.gstNumber}</span>}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className={`border-${getStatusColor(row.getValue('status'))}-500 text-${getStatusColor(row.getValue('status'))}-700`}>
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => renderStars(row.getValue('rating'))
  },
  {
    accessorKey: 'totalProducts',
    header: 'Products',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-medium">{row.getValue('totalProducts')}</div>
        <div className="text-xs text-muted-foreground">items</div>
      </div>
    )
  },
  {
    accessorKey: 'totalSales',
    header: 'Sales',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-medium">{row.getValue('totalSales')}</div>
        <div className="text-xs text-muted-foreground">orders</div>
      </div>
    )
  },
  {
    accessorKey: 'commissionRate',
    header: 'Commission',
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('commissionRate')}%</div>
    )
  },
  {
  accessorKey: 'joinedDate',
  header: 'Joined',
  cell: ({ row }) => {
    const [clientDate, setClientDate] = useState<string | null>(null);

    useEffect(() => {
      const date = new Date(row.getValue('joinedDate'));
      setClientDate(date.toLocaleDateString());
    }, [row]);

    return (
      <div className="text-sm">
        {clientDate ?? '...'}
      </div>
    );
  }
},
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Edit className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
          <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Package className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>
          <DropdownMenuItem><DollarSign className="h-4 w-4 mr-2" />View Payouts</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]