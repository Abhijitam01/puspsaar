'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Percent, TrendingUp } from 'lucide-react'
import type { Discount } from '@/app/admin/marketing/coupon/page' 
import { Separator } from '@/components/ui/separator'

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

export default function CouponAnalytics({ coupons }: { coupons: Discount[] }) {
    const totalRedemptions = coupons.reduce((sum, c) => sum + c.usedCount, 0)
    const totalPotentialRedemptions = coupons.reduce((sum, c) => sum + (c.usageLimit || 0), 0)
    const averageRedemptionRate =
        totalPotentialRedemptions > 0
            ? ((totalRedemptions / totalPotentialRedemptions) * 100).toFixed(1)
            : 0

    return (
        <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid gap-7 md:grid-cols-3">
                <Card className='border shadow-md '>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                        <Users className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent className='flex justify-between gap-2 pb-4'>
                        <div className="text-2xl font-bold">{totalRedemptions.toLocaleString()}</div>
                        <Badge variant="outline" className="text-xs text-purple-600">Across all coupons</Badge>
                    </CardContent>
                </Card>

                <Card className='border shadow-sm '>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Redemption Rate</CardTitle>
                        <Percent className="h-4 w-4 text-rose-400" />
                    </CardHeader>
                    <CardContent className='flex justify-between gap-2'>
                        <div className="text-2xl font-bold">{averageRedemptionRate}%</div>
                        <Badge variant="outline" className="text-xs text-red-400">Average across campaigns</Badge>
                    </CardContent>
                </Card>

                <Card className='border shadow-sm '>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent className='flex justify-between gap-2'>
                        <div className="text-2xl font-bold">{coupons.filter((c) => c.isActive).length}</div>
                        <Badge variant="outline" className="text-xs text-green-600">Currently running</Badge>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performing Coupons */}
            <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
                <Card className="border-0 shadow-sm space-y-2 ">
                    <CardHeader className="pt-4">
                        <CardTitle>Top Performing Coupons</CardTitle>
                        <CardDescription>Based on redemption count</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="space-y-4">
                            {coupons
                                .sort((a, b) => b.usedCount - a.usedCount)
                                .slice(0, 5)
                                .map((coupon, index, arr) => (
                                    <div key={coupon.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Badge className={getTypeColor(coupon.type)}>{coupon.code}</Badge>
                                                <span className="text-sm text-muted-foreground text-center">
                                                    {coupon.description}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{coupon.usedCount} uses</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {coupon.usageLimit
                                                        ? `${((coupon.usedCount / coupon.usageLimit) * 100).toFixed(1)}% of limit`
                                                        : 'No limit'}
                                                </div>
                                            </div>
                                        </div>
                                        {index < arr.length - 1 && <Separator className="my-2" />}
                                    </div>
                                ))}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}