
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const topProductsData = [
   { name: 'Pooja Thali Set', sales: 320, revenue: 480000 },
  { name: 'Brass Diya (Pack of 4)', sales: 270, revenue: 243000 },
  { name: 'Incense Sticks (Agarbatti)', sales: 540, revenue: 162000 },
  { name: 'Camphor (Kapoor) Box', sales: 410, revenue: 205000 },
  { name: 'Rudraksha Mala', sales: 150, revenue: 225000 }
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
