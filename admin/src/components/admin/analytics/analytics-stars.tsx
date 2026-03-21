import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, BarChart3, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "32,147",
    icon: DollarSign,
    change: "+12.5% from last month",
    trendColor: "text-green-500",
  },
  {
    title: "Total Orders",
    value: "2,456",
    icon: ShoppingCart,
    change: "+8.2% from last month",
    trendColor: "text-green-500",
  },
  {
    title: "New Customers",
    value: "1,234",
    icon: Users,
    change: "+15.3% from last month",
    trendColor: "text-green-500",
  },
  {
    title: "Avg Order Value",
    value: "1,309",
    icon: BarChart3,
    change: "+3.8% from last month",
    trendColor: "text-green-500",
  },
]

// 🎨 Gradient sets (cards + icons) separated
const cardGradients = [
  "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-emerald-400 dark:to-emerald-950",
  "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-rose-400 dark:to-rose-950",
  "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-indigo-500 dark:to-indigo-950",
  "bg-gradient-to-br from-green-50 to-green-100 dark:from-pink-400 dark:to-pink-950",
]

export default function AnalyticsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-none hover:shadow-xl transition-colors py-3 ${cardGradients[index]}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className={`h-8 w-8  rounded-md p-2 `}
            />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">₹ {stat.value} </div>
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