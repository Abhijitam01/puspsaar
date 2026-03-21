'use client'

import { useState } from 'react'
import {Tags } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import CouponOverview from '@/components/admin/marketing/coupon/CouponOverview'
import CouponTabs from '@/components/admin/marketing/coupon/CouponTabs'
import { couponColumns } from '@/components/admin/marketing/coupon/coupon-cloumns'

// Types based on Prisma schema
export interface Discount {
  id: string
  code: string
  description: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BUY_X_GET_Y' | 'FREE_SHIPPING'
  value: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  usageLimit?: number
  usagePerCustomer: number
  usedCount: number
  validFrom: string
  validUntil: string
  applicableCategories: string[]
  applicableProducts: string[]
  applicableBrands: string[]
  customerSegments: string[]
  isActive: boolean
  createdAt: string
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'PERCENTAGE':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'FIXED_AMOUNT':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'BUY_X_GET_Y':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'FREE_SHIPPING':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Sample data
const sampleCoupons: Discount[] = [
  {
    id: 'disc_1',
    code: 'WELCOME20',
    description: 'Welcome discount for new customers',
    type: 'PERCENTAGE',
    value: 20,
    minOrderAmount: 500,
    maxDiscountAmount: 200,
    usageLimit: 1000,
    usagePerCustomer: 1,
    usedCount: 342,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    applicableCategories: ['electronics', 'fashion'],
    applicableProducts: [],
    applicableBrands: [],
    customerSegments: ['new_customers'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'disc_2',
    code: 'SAVE50',
    description: 'Flat ₹50 off on orders above ₹999',
    type: 'FIXED_AMOUNT',
    value: 50,
    minOrderAmount: 999,
    usageLimit: 500,
    usagePerCustomer: 2,
    usedCount: 127,
    validFrom: '2024-09-01T00:00:00Z',
    validUntil: '2024-09-30T23:59:59Z',
    applicableCategories: [],
    applicableProducts: [],
    applicableBrands: ['nike', 'adidas'],
    customerSegments: [],
    isActive: true,
    createdAt: '2024-08-15T00:00:00Z'
  },
  {
    id: 'disc_3',
    code: 'FREESHIP',
    description: 'Free shipping on all orders',
    type: 'FREE_SHIPPING',
    value: 0,
    minOrderAmount: 299,
    usageLimit: 2000,
    usagePerCustomer: 5,
    usedCount: 1456,
    validFrom: '2024-08-01T00:00:00Z',
    validUntil: '2024-10-31T23:59:59Z',
    applicableCategories: [],
    applicableProducts: [],
    applicableBrands: [],
    customerSegments: [],
    isActive: true,
    createdAt: '2024-07-20T00:00:00Z'
  },
  {
    id: 'disc_4',
    code: 'BUY2GET1',
    description: 'Buy 2 get 1 free on select items',
    type: 'BUY_X_GET_Y',
    value: 2,
    usageLimit: 300,
    usagePerCustomer: 1,
    usedCount: 89,
    validFrom: '2024-09-15T00:00:00Z',
    validUntil: '2024-09-25T23:59:59Z',
    applicableCategories: ['fashion'],
    applicableProducts: [],
    applicableBrands: [],
    customerSegments: [],
    isActive: false,
    createdAt: '2024-09-10T00:00:00Z'
  }
]

export default function CouponManagementPage() {
  const router = useRouter()
  const [coupons, setCoupons] = useState<Discount[]>(sampleCoupons)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Filter coupons based on search and filters
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && coupon.isActive) ||
      (statusFilter === 'inactive' && !coupon.isActive)
    const matchesType = typeFilter === 'all' || coupon.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate metrics
  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter(c => c.isActive).length
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0)
  const averageUsageRate = coupons.length > 0 ?
    (coupons.reduce((sum, c) => sum + (c.usageLimit ? (c.usedCount / c.usageLimit) * 100 : 0), 0) / coupons.length).toFixed(1) : 0

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">

      <div>
        <h1 className='font-bold text-2xl'>Coupon Management</h1>
        <Breadcrumb className="">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Coupon </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator className="" />

      {/* Overview Coupon */}
      <div className="space-y-5">
        <div className="p-0.5  bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Tags className="h-5 w-5 text-blue-600" />
                Coupon Overview
              </CardTitle>
              <CardDescription>Key statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
              <CouponOverview
                totalCoupons={totalCoupons}
                activeCoupons={activeCoupons}
                totalUsage={totalUsage}
                averageUsageRate={averageUsageRate}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Coupon Tabs */}
      <CouponTabs
        coupons={coupons}
        filteredCoupons={filteredCoupons}
        couponColumns={couponColumns()}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </div>
  )
}

// Create Coupon Form Component
function CreateCouponForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'PERCENTAGE',
    value: 0,
    minOrderAmount: '',
    maxDiscountAmount: '',
    usageLimit: '',
    usagePerCustomer: 1,
    validFrom: '',
    validUntil: '',
    isActive: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating coupon:', formData)
    // Handle form submission here
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 py-4">
        {/* Basic Information */}
        <div className="space-y-4">
           <h4 className="font-medium">Basic Information</h4>
           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Coupon Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g., SAVE20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Discount Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Percentage Off</SelectItem>
                  <SelectItem value="FIXED_AMOUNT">Fixed Amount Off</SelectItem>
                  <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                  <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your coupon..."
              rows={3}
            />
          </div>
        </div>

        <Separator />

        {/* Discount Configuration */}
        <div className="space-y-4">
          <h4 className="font-medium">Discount Configuration</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">
                {formData.type === 'PERCENTAGE' ? 'Percentage (%)' :
                  formData.type === 'FIXED_AMOUNT' ? 'Amount (₹)' :
                    formData.type === 'BUY_X_GET_Y' ? 'Buy Quantity' : 'Value'}
              </Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrderAmount">Minimum Order Amount (₹)</Label>
              <Input
                id="minOrderAmount"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                min="0"
              />
            </div>
          </div>

          {formData.type === 'PERCENTAGE' && (
            <div className="space-y-2">
              <Label htmlFor="maxDiscountAmount">Maximum Discount Amount (₹)</Label>
              <Input
                id="maxDiscountAmount"
                type="number"
                value={formData.maxDiscountAmount}
                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                min="0"
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Usage Limits */}
        <div className="space-y-4">
          <h4 className="font-medium">Usage Limits</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usageLimit">Total Usage Limit</Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                min="1"
                placeholder="Unlimited"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usagePerCustomer">Uses Per Customer</Label>
              <Input
                id="usagePerCustomer"
                type="number"
                value={formData.usagePerCustomer}
                onChange={(e) => setFormData({ ...formData, usagePerCustomer: Number(e.target.value) })}
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Validity Period */}
        <div className="space-y-4">
          <h4 className="font-medium">Validity Period</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Valid From *</Label>
              <Input
                id="validFrom"
                type="datetime-local"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until *</Label>
              <Input
                id="validUntil"
                type="datetime-local"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <Separator />

         {/* Status */}
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className='bg-secondary text-white hover:bg-secondary/80 '>
          Create Coupon
        </Button>
      </div>
    </form>
  )
}