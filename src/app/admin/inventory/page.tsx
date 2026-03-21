'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Car, ClipboardCheck, ShieldCheck, Gauge, FileClock } from "lucide-react"
import InventoryStats from "@/components/admin/inventory/nventory-stars"
import { LowStockList, pipelineVehicles } from "@/components/admin/inventory/low-Stock-List-card"
import { RecentStockMovements, vehicleActivities } from "@/components/admin/inventory/recent-stock-movement"
import { dummyProducts } from "@/data/dummy-products"

export default function InventoryPage() {
  const vehicles = dummyProducts
  const readyVehicles = vehicles.filter(vehicle => vehicle.vehicleStatus === "READY").length
  const reservedVehicles = vehicles.filter(vehicle => vehicle.vehicleStatus === "RESERVED").length
  const pendingInspection = vehicles.filter(vehicle =>
    vehicle.vehicleStatus === "INSPECTION" || vehicle.vehicleStatus === "INTAKE"
  ).length
  const totalTestDrives = vehicles.reduce((sum, vehicle) => sum + (vehicle.testDriveCount ?? 0), 0)

  const averageDaysInYard = vehicles.length
    ? Math.round(
        vehicles.reduce((sum, vehicle) => {
          const acquired = new Date(vehicle.ownership.acquisitionDate).getTime()
          const updated = Date.now()
          return sum + (updated - acquired) / (1000 * 60 * 60 * 24)
        }, 0) / vehicles.length
      )
    : 0

  const stats = [
    {
      title: "Active Fleet",
      value: `${vehicles.length} vehicles`,
      icon: Car,
      subtext: `${readyVehicles} ready to publish`,
      subtextClass: "text-xs text-muted-foreground",
    },
    {
      title: "Pending Inspection",
      value: pendingInspection,
      icon: ClipboardCheck,
      subtext: "Intake + inspection queue",
      subtextClass: "text-xs text-amber-600",
      isBadge: true,
    },
    {
      title: "Reserved Pipeline",
      value: reservedVehicles,
      icon: ShieldCheck,
      subtext: "Awaiting delivery slots",
      subtextClass: "text-xs text-blue-600",
    },
    {
      title: "Test Drive Demand",
      value: totalTestDrives,
      icon: Gauge,
      subtext: `${averageDaysInYard} avg. days in yard`,
      subtextClass: "text-xs text-emerald-600",
    },
  ]

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      <div className=" flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Vehicle Inventory</h1>
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
            <FileClock className="h-4 w-4 mr-2" />
            Lifecycle Report
          </Button>
          <Link href="/admin/product/add">
            <Button className="bg-secondary text-white cursor-pointer transition-all ">
              <Car className="h-4 w-4 mr-2" />
              Intake Vehicle
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
                <Car className="h-5 w-5 text-blue-600" />
                Fleet Overview
              </CardTitle>
              <CardDescription>Live view of dealership-owned vehicles</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
              <InventoryStats stats={stats} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-emerald-600" />
                 Lifecycle Queue
                </CardTitle>
                <CardDescription>Vehicles awaiting inspection, detailing, delivery</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <LowStockList items={pipelineVehicles} />
              </CardContent>
            </Card>
          </div>
        
        <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileClock className="h-5 w-5 text-emerald-600" />
                 Live Activity
                </CardTitle>
                <CardDescription>Latest inspections, reservations & test drives</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
               <RecentStockMovements activities={vehicleActivities} />
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}