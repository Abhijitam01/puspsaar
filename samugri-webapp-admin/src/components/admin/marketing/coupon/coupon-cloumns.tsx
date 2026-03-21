'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Discount } from '@/app/admin/marketing/coupon/page'

// Local helpers (you can also move them into utils if reused)
const getDiscountDisplay = (coupon: Discount) => {
  switch (coupon.type) {
    case 'PERCENTAGE':
      return `${coupon.value}%`
    case 'FIXED_AMOUNT':
      return `₹${coupon.value}`
    case 'FREE_SHIPPING':
      return 'Free Ship'
    case 'BUY_X_GET_Y':
      return `B${coupon.value}G1`
    default:
      return coupon.value.toString()
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'PERCENTAGE': return 'bg-blue-100 text-blue-800'
    case 'FIXED_AMOUNT': return 'bg-green-100 text-green-800'
    case 'FREE_SHIPPING': return 'bg-purple-100 text-purple-800'
    case 'BUY_X_GET_Y': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export const couponColumns = (): ColumnDef<Discount>[] => {
  const router = useRouter()

  return [
    {
      accessorKey: 'code',
      header: 'Coupon Code',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue('code')}
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-6 w-6 p-0"
            onClick={() => navigator.clipboard.writeText(row.getValue('code'))}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge className={getTypeColor(row.getValue('type'))}>
          {row.getValue('type')}
        </Badge>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Discount',
      cell: ({ row }) => (
        <span className="font-semibold text-green-600">
          {getDiscountDisplay(row.original)}
        </span>
      ),
    },
    {
      accessorKey: 'usedCount',
      header: 'Usage',
      cell: ({ row }) => {
        const coupon = row.original
        const usageRate = coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : 0
        return (
          <div className="text-center">
            <div>{coupon.usedCount} / {coupon.usageLimit || '∞'}</div>
            {coupon.usageLimit && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${Math.min(usageRate, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'validUntil',
      header: 'Valid Until',
      cell: ({ row }) => {
        const date = new Date(row.getValue('validUntil'))
        const isExpired = date < new Date()
        return (
          <div className={isExpired ? 'text-red-600' : 'text-gray-900'}>
            {date.toLocaleDateString()}
          </div>
        )
      },
    },
    {
  accessorKey: 'isActive',
  header: 'Status',
  cell: ({ row }) => {
    const isActive = row.getValue('isActive');
    const badgeClass = isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';

    return (
      <Badge className={badgeClass}>
        {isActive ? 'Active' : 'Inactive'}
      </Badge>
    );
  },
},
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const coupon = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/admin/marketing/coupons/${coupon.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Coupon
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}