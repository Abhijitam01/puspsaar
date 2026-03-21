'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Copy, Trash2, Users, TrendingUp, Calendar, DollarSign, Eye, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

// Sample coupon data (in real app, this would come from API)
const sampleCouponDetails = {
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
  createdAt: '2024-01-01T00:00:00Z',
  // Analytics data
  totalSavings: 68400,
  avgOrderValue: 1250,
  conversionRate: 15.6,
  usageByMonth: [45, 62, 38, 71, 55, 83, 67, 42, 28, 35, 41, 0],
  topCategories: [
    { name: 'Electronics', usage: 156 },
    { name: 'Fashion', usage: 98 },
    { name: 'Home', usage: 67 },
    { name: 'Sports', usage: 21 }
  ]
}

export default function CouponDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const couponId = params.id as string
  
  // In real app, fetch coupon data based on ID
  const coupon = sampleCouponDetails

  if (!coupon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Coupon Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The coupon with ID "{couponId}" could not be found.
            </p>
            <Button onClick={() => router.push('/admin/marketing/coupons')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Coupons
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const usagePercentage = coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : 0
  const daysRemaining = Math.ceil((new Date(coupon.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const getDiscountDisplay = () => {
    switch (coupon.type) {
      case 'PERCENTAGE':
        return `${coupon.value}% OFF`
      case 'FIXED_AMOUNT':
        return `₹${coupon.value} OFF`
      case 'FREE_SHIPPING':
        return 'FREE SHIPPING'
      case 'BUY_X_GET_Y':
        return `BUY ${coupon.value} GET 1 FREE`
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/admin/marketing/coupons')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Coupons
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{coupon.code}</h1>
            <p className="text-muted-foreground">{coupon.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Count</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coupon.usedCount}</div>
            <p className="text-xs text-muted-foreground">
              {coupon.usageLimit ? `of ${coupon.usageLimit} limit` : 'unlimited'}
            </p>
            {coupon.usageLimit && (
              <Progress value={usagePercentage} className="mt-2" />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{coupon.totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Customer savings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coupon.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              View to purchase
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysRemaining > 0 ? daysRemaining : 0}</div>
            <p className="text-xs text-muted-foreground">
              {daysRemaining > 0 ? 'Until expiry' : 'Expired'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Coupon Information */}
            <Card>
              <CardHeader>
                <CardTitle>Coupon Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Type</span>
                  <Badge className={getTypeColor(coupon.type)}>
                    {coupon.type}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Discount</span>
                  <span className="font-semibold text-green-600">
                    {getDiscountDisplay()}
                  </span>
                </div>
                
                {coupon.minOrderAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Min Order Amount</span>
                    <span>₹{coupon.minOrderAmount}</span>
                  </div>
                )}
                
                {coupon.maxDiscountAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Max Discount</span>
                    <span>₹{coupon.maxDiscountAmount}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uses Per Customer</span>
                  <span>{coupon.usagePerCustomer}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant={coupon.isActive ? 'default' : 'secondary'}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Validity & Restrictions */}
            <Card>
              <CardHeader>
                <CardTitle>Validity & Restrictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Valid From</span>
                  <p className="text-sm text-muted-foreground">
                    {new Date(coupon.validFrom).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Valid Until</span>
                  <p className="text-sm text-muted-foreground">
                    {new Date(coupon.validUntil).toLocaleString()}
                  </p>
                </div>
                
                <Separator />
                
                {coupon.applicableCategories.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Applicable Categories</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {coupon.applicableCategories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {coupon.customerSegments.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Customer Segments</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {coupon.customerSegments.map((segment) => (
                        <Badge key={segment} variant="outline" className="text-xs">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Usage by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Usage by Category</CardTitle>
                <CardDescription>Top categories where this coupon is used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coupon.topCategories.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{category.usage}</div>
                        <div className="text-xs text-muted-foreground">uses</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Order Value</span>
                  <span className="font-semibold">₹{coupon.avgOrderValue}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Orders</span>
                  <span className="font-semibold">{coupon.usedCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="font-semibold text-green-600">{coupon.conversionRate}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Customer Savings</span>
                  <span className="font-semibold text-blue-600">₹{coupon.totalSavings.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Recent coupon usage and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Usage history feature coming soon</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This will show detailed transaction history and user analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}