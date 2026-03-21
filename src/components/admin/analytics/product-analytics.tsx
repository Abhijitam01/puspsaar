
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const topProductsData = [
  { name: 'Hyundai Creta SX (O) Turbo', sales: 48, revenue: 8_25_00_000 },
  { name: 'Kia Seltos GTX+ DCT', sales: 36, revenue: 6_10_00_000 },
  { name: 'Tata Nexon EV Long Range', sales: 29, revenue: 4_45_00_000 },
  { name: 'Jeep Compass Limited 4x4', sales: 18, revenue: 3_96_00_000 },
  { name: 'Skoda Octavia L&K', sales: 15, revenue: 3_37_50_000 }
]

export function ProductAnalytics() {
    return (
       
            <div className="space-y-3   ">
                {topProductsData.map((product, index) => (
                    <div key={product.name} className="flex items-center dark:bg-muted-foreground/10 bg-neutral-100 justify-between p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-medium">
                                {index + 1}
                            </div>
                            <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-muted-foreground">{product.sales} units sold</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-emerald-600">₹{(product.revenue / 100000).toFixed(1)}L</div>
                            <div className="text-sm text-muted-foreground">Revenue</div>
                        </div>
                    </div>
                ))}
            </div>
       
    )
}

export default ProductAnalytics
