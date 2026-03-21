"use client"

import { Badge } from "@/components/ui/badge"

type ActivityType = "Test Drive" | "Inspection" | "Reservation" | "Detailing"

export interface VehicleActivity {
  vehicle: string
  vin: string
  type: ActivityType
  actor: string
  timeAgo: string
  notes: string
}

interface RecentActivitiesProps {
  title?: string
  activities: VehicleActivity[]
}

export const vehicleActivities: VehicleActivity[] = [
  {
    vehicle: "2022 Hyundai Creta SX (O)",
    vin: "MAANH81AVN0012345",
    type: "Test Drive",
    actor: "Anita Mehra",
    timeAgo: "15 min ago",
    notes: "Requested extended highway loop",
  },
  {
    vehicle: "2018 Honda City ZX CVT",
    vin: "MRHGM2680JT501234",
    type: "Inspection",
    actor: "Ganesh Iyer",
    timeAgo: "1 hr ago",
    notes: "Paint depth analysis pending approval",
  },
  {
    vehicle: "2020 Jeep Compass Limited Plus",
    vin: "1C4NJDCB0LD102938",
    type: "Reservation",
    actor: "Lakshmi Narayan",
    timeAgo: "3 hrs ago",
    notes: "Advance received, delivery 25 Feb",
  },
  {
    vehicle: "2019 Swift VXI AMT",
    vin: "MA3EJKD1S00784563",
    type: "Detailing",
    actor: "Detail Bay C4",
    timeAgo: "Today 9:30 AM",
    notes: "Interior sanitization complete",
  },
]

const typeColors: Record<ActivityType, string> = {
  "Test Drive": "bg-emerald-100 text-emerald-800",
  Inspection: "bg-blue-100 text-blue-800",
  Reservation: "bg-amber-100 text-amber-800",
  Detailing: "bg-purple-100 text-purple-800",
}

export function RecentStockMovements({
  title = "Live Vehicle Activity",
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div
          key={`${activity.vin}-${activity.type}-${activity.timeAgo}`}
          className="flex flex-col gap-3 p-4 border-none bg-gray-50 dark:bg-muted-foreground/9 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{activity.vehicle}</div>
              <p className="text-xs text-muted-foreground">VIN: {activity.vin}</p>
            </div>
            <Badge className={`${typeColors[activity.type]} rounded-full`}>{activity.type}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Handled by: {activity.actor}</p>
            <span>{activity.timeAgo}</span>
          </div>
          <p className="text-xs text-muted-foreground/80">{activity.notes}</p>
        </div>
      ))}
    </div>
  )
}
