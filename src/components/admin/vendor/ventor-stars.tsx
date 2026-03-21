"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2, Package, TrendingUp, Star } from "lucide-react"

interface Vendor {
  rating: number
}

interface StatsCardProps {
  totalVendors: number
  activeVendors: number
  pendingVendors: number
  totalProducts: number
  totalSales: number
  vendorData: Vendor[]
}

export function StatsCards({
  totalVendors,
  activeVendors,
  pendingVendors,
  totalProducts,
  totalSales,
  vendorData,
}: StatsCardProps) {
  const ratedVendors = vendorData.filter(v => v.rating > 0)
  const averageRating =
    ratedVendors.length > 0
      ? ratedVendors.reduce((sum, v) => sum + v.rating, 0) / ratedVendors.length
      : 0

  const stats = [
    { title: "Total Vendors", value: totalVendors, subtitle: `${activeVendors} active, ${pendingVendors} pending`, icon: Building2 },
    { title: "Total Products", value: totalProducts.toLocaleString(), subtitle: "across all vendors", icon: Package },
    { title: "Total Sales", value: totalSales.toLocaleString(), subtitle: "orders completed", icon: TrendingUp },
    { title: "Average Rating", value: averageRating.toFixed(1), subtitle: "vendor satisfaction", icon: Star },
  ]

  // 🎨 Gradient sets
  const cardGradients = [
    "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-400 dark:to-purple-950",
    "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-300 dark:to-red-950",
    "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-400 dark:to-green-950",
    "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-400 dark:to-blue-950",
  ]

  const iconGradients = [
    "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    "bg-gradient-to-br from-red-400 to-orange-800 text-white",
    "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
    "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className={`${cardGradients[idx]} shadow-lg border-none`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`h-8 w-8 rounded-full p-1 flex items-center justify-center ${iconGradients[idx]}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs opacity-80">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ✅ Example usage
export default function VendorStarsCards() {
  return (
    <StatsCards
      totalVendors={120}
      activeVendors={95}
      pendingVendors={25}
      totalProducts={8450}
      totalSales={15600}
      vendorData={[
        { rating: 4.5 },
        { rating: 3.8 },
        { rating: 5 },
        { rating: 4.2 },
      ]}
    />
  )
}