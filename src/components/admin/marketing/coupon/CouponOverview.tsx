'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, TrendingUp, Calendar, DollarSign,  } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// 📊 Stats content
const couponStats = (props: {
  totalCoupons: number
  activeCoupons: number
  totalUsage: number
  averageUsageRate: string | number
}) => [
  {
    title: 'Total Coupons',
    value: props.totalCoupons,
    subtext: `${props.activeCoupons} active`,
    icon: Gift,
  },
  {
    title: 'Total Usage',
    value: props.totalUsage.toLocaleString(),
    subtext: `${props.averageUsageRate}% avg usage rate`,
    icon: TrendingUp,
  },
  {
    title: 'Active Campaigns',
    value: props.activeCoupons,
    subtext: 'Running currently',
    icon: Calendar,
  },
  {
    title: 'Estimated Savings',
    value: `₹${(props.totalUsage * 45).toLocaleString()}`,
    subtext: ' savings',
    icon: DollarSign,
  },
]

// 🎨 Gradient sets separated
const cardGradients = [
    'bg-gradient-to-br from-green-50 to-green-100 dark:from-teal-400 dark:to-teal-950',
  'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-red-400 dark:to-red-950',
  'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500 dark:to-blue-950',
  'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500 dark:to-purple-950',
]

interface CouponOverviewProps {
  totalCoupons: number
  activeCoupons: number
  totalUsage: number
  averageUsageRate: string | number
}

export default function CouponOverview({
  totalCoupons,
  activeCoupons,
  totalUsage,
  averageUsageRate,
}: CouponOverviewProps) {
  const stats = couponStats({ totalCoupons, activeCoupons, totalUsage, averageUsageRate })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-none hover:shadow-xl transition-all py-5  ${cardGradients[index]}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-8 w-8 rounded-md p-2 bg-white/20 dark:bg-black/20" />
          </CardHeader>
          <CardContent className='flex justify-between gap-1'>
            <div className="text-xl font-bold">{stat.value}</div>
            <Badge className="text-[10px]  text-zinc-600">{stat.subtext}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}