'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShoppingBag, Clock, CheckCircle, Package, TrendingUp } from "lucide-react"

// ⬇️ Named export
export function OrdersStats({
  totalOrders,
  pendingOrders,
  processingOrders,
  deliveredOrders,
  totalRevenue,
}: {
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  deliveredOrders: number
  totalRevenue: number
}) {
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      change: "+12% from last month",
      trendColor: "text-green-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      change: `${processingOrders} processing`,
      trendColor: "text-yellow-500",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      change: `${((deliveredOrders / totalOrders) * 100).toFixed(1)}% success rate`,
      trendColor: "text-green-500",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: Package,
      change: "+8% from last month",
      trendColor: "text-green-500",
    },
  ]

  const cardGradients = [
    "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-emerald-400 dark:to-emerald-950",
    "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-rose-400 dark:to-rose-950",
    "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-indigo-500 dark:to-indigo-950",
    "bg-gradient-to-br from-green-50 to-green-100 dark:from-pink-400 dark:to-pink-950",
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-none hover:shadow-xl transition-all duration-300 py-3 ${cardGradients[index]}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-8 w-8 rounded-md p-2 bg-white/30 backdrop-blur-sm" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className={`h-3 w-3 mr-1 ${stat.trendColor}`} />
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ✅ Default export for the page
export default function OrdersStatsPage() {
  const totalOrders = 2456
  const pendingOrders = 340
  const processingOrders = 120
  const deliveredOrders = 2116
  const totalRevenue = 321470

  return (
   
      <OrdersStats
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        deliveredOrders={deliveredOrders}
        totalRevenue={totalRevenue}
      />
  
  )
}