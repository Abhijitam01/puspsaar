'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ReactNode } from 'react'
import { DollarSign, CreditCard, RefreshCw, TrendingUp, GripHorizontal } from 'lucide-react'

interface Stat {
  title: string
  value: string | number
  description?: string | ReactNode
  icon?: ReactNode
  iconColor?: string // color for icon background or text
  iconBg?: string // optional background color
}

export default function FinanceStatsGrid({
  totalRevenue,
  pendingPayments,
  totalRefunds,
  processingRefunds,
  paymentData
}: {
  totalRevenue: number
  pendingPayments: number
  totalRefunds: number
  processingRefunds: number
  paymentData: { status: string }[]
}) {
  const statsData: Stat[] = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      description: (
        <>
          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
          +12% from last month
        </>
      ),
      icon: <DollarSign className="h-4 w-4 text-white" />,
      iconBg: 'bg-teal-500'
    },
    {
      title: 'Pending Payments',
      value: pendingPayments,
      description: 'Awaiting confirmation',
      icon: <CreditCard className="h-4 w-4 text-white" />,
      iconBg: 'bg-purple-500'
    },
    {
      title: 'Total Refunds',
      value: `₹${totalRefunds.toLocaleString()}`,
      description: `${processingRefunds} processing`,
      icon: <RefreshCw className="h-4 w-4 text-white" />,
      iconBg: 'bg-rose-500'
    },
    {
      title: 'Success Rate',
      value: `${(
        (paymentData.filter((p) => p.status === 'SUCCESS').length / paymentData.length) *
        100
      ).toFixed(1)}%`,
      description: 'Payment success rate',
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      iconBg: 'bg-yellow-500'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="border h-full shadow-none hover:shadow-[0_4px_15px_rgba(34,197,94,0.2)] rounded-xl transition-all duration-200 dark:bg-muted"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-4">
              {stat.icon && (
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${stat.iconBg}`}>
                  {stat.icon}
                </div>
              )}
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </div>
            <GripHorizontal className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stat.value}</div>
            {stat.description && (
              <p className="text-xs text-muted-foreground flex items-center">{stat.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
