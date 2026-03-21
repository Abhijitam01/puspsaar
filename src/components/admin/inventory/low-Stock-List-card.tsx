"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type VehicleStage = "INTAKE" | "INSPECTION" | "DETAILING" | "READY" | "RESERVED"

export interface PipelineVehicle {
  vehicle: string
  vin: string
  stage: VehicleStage
  advisor: string
  eta?: string
  nextAction: string
}

interface PipelineListProps {
  title?: string
  items: PipelineVehicle[]
}

export const pipelineVehicles: PipelineVehicle[] = [
  {
    vehicle: "2018 Honda City ZX CVT",
    vin: "MRHGM2680JT501234",
    stage: "INSPECTION",
    advisor: "Ganesh Iyer",
    eta: "Awaiting paint report",
    nextAction: "Approve detailing budget",
  },
  {
    vehicle: "2020 Jeep Compass Limited Plus",
    vin: "1C4NJDCB0LD102938",
    stage: "RESERVED",
    advisor: "S. Nair",
    eta: "Delivery 25 Feb",
    nextAction: "Prepare delivery kit",
  },
  {
    vehicle: "2019 Swift VXI AMT",
    vin: "MA3EJKD1S00784563",
    stage: "READY",
    advisor: "A. Khan",
    eta: "Slot available today",
    nextAction: "Push to marketing",
  },
]

const stageColors: Record<VehicleStage, string> = {
  INTAKE: "bg-amber-100 text-amber-800",
  INSPECTION: "bg-blue-100 text-blue-800",
  DETAILING: "bg-purple-100 text-purple-800",
  READY: "bg-emerald-100 text-emerald-800",
  RESERVED: "bg-slate-200 text-slate-800",
}

export function LowStockList({ title = "Vehicle Lifecycle", items }: PipelineListProps) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={item.vin}
          className="flex flex-col gap-3 p-4 border-none bg-gray-50 dark:bg-muted-foreground/9 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{item.vehicle}</div>
              <p className="text-xs text-muted-foreground">VIN: {item.vin}</p>
            </div>
            <Badge className={`${stageColors[item.stage]} rounded-full`}>{item.stage}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              <p>Advisor: {item.advisor}</p>
              {item.eta && <p className="text-xs mt-1">Status: {item.eta}</p>}
            </div>
            <Button size="sm" variant="outline">
              {item.stage === "RESERVED" ? "Deliver" : "Update"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/80">{item.nextAction}</p>
        </div>
      ))}
    </div>
  )
}