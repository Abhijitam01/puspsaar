"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, Archive } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Products",
    value: "1,250",
    icon: Package,
    subtext: "Across 24 categories",
    subtextClass: "text-xs text-muted-foreground",
  },
  {
    title: "Low Stock Alerts",
    value: "25",
    icon: AlertTriangle,
    subtext: "Urgent Action Required",
    subtextClass: "mt-2 animate-pulse",
    isBadge: true,
  },
  {
    title: "Stock Value",
    value: "₹8,45,670",
    icon: TrendingUp,
    subtext: "+12% from last month",
    subtextClass: "text-xs text-green-600",
  },
  {
    title: "Categories",
    value: "24",
    icon: Archive,
    subtext: "Active categories",
    subtextClass: "text-xs text-muted-foreground",
  },
]

// 🎨 Gradient sets for cards
const cardGradients = [
  "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-400 dark:to-purple-950",
  "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-300 dark:to-red-950",
  "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-400 dark:to-green-950",
  "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-400 dark:to-blue-950",
]

// 🎨 Gradient sets for icon backgrounds
const iconGradients = [
  "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  "bg-gradient-to-br from-red-400 to-orange-800 text-white",
  "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
  "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
]

export default function InventoryStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-none hover:shadow-xl transition-colors py-3 ${cardGradients[index]}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-full  ${iconGradients[index]}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                stat.title === "Low Stock Alerts" ? "text-red-600" : ""
              }`}
            >
              {stat.value}
            </div>

            {stat.isBadge ? (
              <Badge variant="destructive" className={stat.subtextClass}>
                {stat.subtext}
              </Badge>
            ) : (
              <p className={stat.subtextClass}>{stat.subtext}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}