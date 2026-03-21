'use client'
import { Car, ClipboardCheck, ShieldCheck, Gauge } from "lucide-react"
import { useTheme } from "next-themes"

interface VehicleStatsProps {
  totalVehicles: number
  readyVehicles: number
  inspectionQueue: number
  reservedVehicles: number
  averageTicket: number
  coverageCities: number
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

export default function ProductStats({
  totalVehicles,
  readyVehicles,
  inspectionQueue,
  reservedVehicles,
  averageTicket,
  coverageCities,
}: VehicleStatsProps) {
  const { resolvedTheme } = useTheme()

  const cardData = [
    {
      title: "Live Listings",
      value: totalVehicles,
      description: `${readyVehicles} ready to publish`,
      icon: Car,
      bgLight: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Inspection Queue",
      value: inspectionQueue,
      description: "Intake & certification",
      icon: ClipboardCheck,
      bgLight: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Reserved Vehicles",
      value: reservedVehicles,
      description: "Awaiting delivery slots",
      icon: ShieldCheck,
      bgLight: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconBg: "bg-green-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Average Ticket",
      value: formatCurrency(averageTicket),
      description: `${coverageCities} hubs`,
      icon: Gauge,
      bgLight: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {cardData.map((card) => {
        const Icon = card.icon
        const textColor = resolvedTheme === "dark" ? "text-gray-100" : "text-gray-900"
        const descColor = resolvedTheme === "dark" ? "text-gray-300" : "text-gray-700"

        return (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${
              resolvedTheme === "dark" ? "bg-muted-foreground/10" : card.bgLight
            }`}
          >
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

            <div className="flex justify-between items-center gap-2 px-4 py-2 rounded-full relative z-10">
              <span className={`text-xl font-bold ${textColor}`}>{card.value}</span>
              <p className={`text-xs ${descColor}`}>{card.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
