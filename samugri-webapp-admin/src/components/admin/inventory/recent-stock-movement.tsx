"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StockMovement {
  type: "Sale" | "Restock" | "Adjustment"
  product: string
  quantity: number
  time: string
}

interface RecentStockMovementsProps {
  title?: string
  movements: StockMovement[]
}

export const dummyStockMovements: StockMovement[] = [
  { type: "Sale", product: "Incense Sticks (Pack of 50)", quantity: -2, time: "10 min ago" },
  { type: "Restock", product: "Dhoop Cones (Pack of 20)", quantity: +50, time: "1 hour ago" },
  { type: "Sale", product: "Camphor Tablets", quantity: -5, time: "2 hours ago" },
  { type: "Adjustment", product: "Agarbatti Holder", quantity: -1, time: "3 hours ago" },
];


export function RecentStockMovements({ 
  title = "Recent Stock Movements", 
  movements 
}: RecentStockMovementsProps) {
  return (

        <div className="space-y-5">
          {movements.map((movement, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 border-none bg-gray-50 dark:bg-muted-foreground/9 rounded-lg"
            >
              <div>
                <div className="font-medium">{movement.product}</div>
                <div className="text-sm text-muted-foreground">{movement.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={movement.quantity > 0 ? "default" : "secondary"}
                  className={movement.quantity > 0 ? "text-green-700 bg-green-100" : ""}
                >
                  {movement.quantity > 0 ? "+" : ""}
                  {movement.quantity}
                </Badge>
                <span className="text-sm text-muted-foreground">{movement.time}</span>
              </div>
            </div>
          ))}
        </div>
  )
}