'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package,  Archive, BarChart3, TrendingDown, MoveDiagonal } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import InventoryStats from "@/components/admin/inventory/nventory-stars"
import { dummyLowStockItem, LowStockList } from "@/components/admin/inventory/low-Stock-List-card"
import { dummyStockMovements, RecentStockMovements } from "@/components/admin/inventory/recent-stock-movement"

export default function InventoryPage() {
  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      <div className=" flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Inventory Management</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inventory </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500  dark:bg-orange-500 text-white cursor-pointer transition-all ">
            <Archive className="h-4 w-4 mr-2" />
            Stock Report
          </Button>
          <Link href="/admin/product/add">
            <Button className="bg-secondary text-white cursor-pointer transition-all ">
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="" />

      <div className="space-y-5">
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Inventory Overview
              </CardTitle>
              <CardDescription>Key statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
              <InventoryStats />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-emerald-600" />
                 Low Stock Items
                </CardTitle>
                <CardDescription>Sales, orders, and customer trends</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <LowStockList items={dummyLowStockItem} />
              </CardContent>
            </Card>
          </div>
        
        <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MoveDiagonal className="h-5 w-5 text-emerald-600" />
                 Recent Stock Movements
                </CardTitle>
                <CardDescription>Sales, orders, and customer trends</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
               <RecentStockMovements movements={dummyStockMovements} />
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}