'use client'
import { Container, TrendingUpDown, ChartPieIcon, ShieldCheck } from "lucide-react"
import { useTheme } from "next-themes"

interface ReviewStatsProps {
  stats: {
    total: number
    active: number
    draft: number
    inStock: number
    lowStock: number
    outOfStock: number
    featured: number
    newArrivals: number
    bestSellers: number
  }
  categories: string[]
}

export default function ProductStats({ stats, categories }: ReviewStatsProps) {
  const { resolvedTheme } = useTheme()

  const cardData = [
    {
      title: "Total Products",
      value: stats.total,
      description: `${stats.active} active, ${stats.draft} draft`,
      icon: Container,
      bgLight: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Stock Status",
      value: stats.inStock,
      description: `${stats.lowStock} low stock, ${stats.outOfStock} out of stock`,
      icon: TrendingUpDown,
      bgLight: "bg-gradient-to-br from-green-50 to-teal-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Featured",
      value: stats.featured,
      description: `${stats.newArrivals} new arrivals, ${stats.bestSellers} best sellers`,
      icon: ShieldCheck,
      bgLight: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Categories",
      value: categories.length,
      description: "Active categories",
      icon: ChartPieIcon,
      bgLight: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {cardData.map((card, index) => {
        const Icon = card.icon
        const textColor = resolvedTheme === "dark" ? "text-gray-100" : "text-gray-900"
        const descColor = resolvedTheme === "dark" ? "text-gray-300" : "text-gray-700"

        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${
              resolvedTheme === "dark" ? "bg-muted-foreground/10" : card.bgLight
            }`}
          >
            {/* Top row: Icon + title */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    resolvedTheme === "dark" ? "bg-muted-foreground/20" : card.iconBg
                  }`}
                >
                  <Icon className={`${card.iconColor} w-5 h-5`} />
                </div>
                <h3 className={`text-md font-semibold ${textColor}`}>{card.title}</h3>
              </div>
            </div>

            {/* Bottom row: value + description */}
            <div className="flex justify-between items-center gap-2 px-4 py-2 rounded-full relative z-10">
              <span className={`text-xl font-bold ${textColor}`}>{card.value}</span>
              <p className={`text-xs ${descColor}`}>{card.description}</p>
            </div>

            {/* Subtle decorative circle */}
            {/* <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/50 rounded-tl-full transform translate-x-6 translate-y-6"></div> */}
          </div>
        )
      })}
    </div>
  )
}
