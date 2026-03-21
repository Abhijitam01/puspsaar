import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DataTableSkeleton() {
  return (
    <Card className="border rounded-lg shadow-sm">
      <CardContent className="p-6">
        {/* Search and Filter Bar Skeleton */}
        <div className="flex items-center justify-between pb-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>

        {/* Table Header Skeleton */}
        <div className="border rounded-md">
          <div className="grid grid-cols-5 gap-4 p-4 bg-muted">
            {Array(5).fill(null).map((_, index) => (
              <Skeleton key={`header-${index}`} className="h-4 w-full" />
            ))}
          </div>

          {/* Table Rows Skeleton */}
          {Array(5).fill(null).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-5 gap-4 p-4 border-t hover:bg-muted/50"
            >
              {Array(5).fill(null).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-4 w-full"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 