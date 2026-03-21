"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface LowStockItem {
    name: string
    stock: number
    threshold: number
}

interface LowStockListProps {
    title?: string
    items: LowStockItem[]
}

export const dummyLowStockItem: LowStockItem[] = [
  { name: "Incense Sticks (Pack of 50)", stock: 5, threshold: 20 },
  { name: "Dhoop Cones (Pack of 20)", stock: 8, threshold: 25 },
  { name: "Camphor Tablets", stock: 12, threshold: 30 },
  { name: "Agarbatti Holder", stock: 3, threshold: 15 },
];


export function LowStockList({ title = "Low Stock Items", items }: LowStockListProps) {
    return (

        <div className="space-y-5">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-3 border-none bg-gray-50 dark:bg-muted-foreground/9 rounded-lg"
                >
                    <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                            Threshold: {item.threshold} units
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            className={
                                     "bg-red-100 text-red-800" 
                            }
                        >
                            {item.stock} left
                        </Badge>

                        <Button size="sm" variant="outline">
                            Restock
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}