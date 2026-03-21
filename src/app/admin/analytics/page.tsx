'use client'

import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Calendar1, Clock, Download, ScaleIcon, ShoppingBagIcon, TrendingUp, UserCheck2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { PageHeader } from '@/components/layout/page-header';
import AnalyticsStats from '@/components/admin/analytics/analytics-stars';
import CategoryDistributionChart from '@/components/admin/analytics/category-distribution-chart';
import RevenueChart from '@/components/admin/analytics/revenue-chart';
import MonthlyTrendsChart from '@/components/admin/analytics/monthly-trends-chart';
import MonthlySaleChart from '@/components/admin/analytics/monthly-sale-chart';
import OrderSaleChart from '@/components/admin/analytics/monthly-order-sale-chart';
import ProductAnalytics from '@/components/admin/analytics/product-analytics';
import CustomerAcquistionChart from '@/components/admin/analytics/customer-acquistion-chart';


export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <div>
          <h1 className='text-2xl font-bold'>Analytics Dashboard</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-35 ark:bg-muted-foreground/10 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={'outline'} className='border   cursor-pointer transition-all '>
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
        </div>
      </div>
      <Separator className="" />

      {/* Key Metrics */}
      <div className="space-y-5">
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Analytics Overview
              </CardTitle>
              <CardDescription>Key statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
              <AnalyticsStats />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className=" mt-4">
        <TabsList className='bg-transprent rounded-none gap-5 border-none'>
          <TabsTrigger value="overview" className='border-none rounded-2xl p-2'>Overview</TabsTrigger>
          <TabsTrigger value="sales" className='border-none rounded-2xl p-2'>Sales</TabsTrigger>
          <TabsTrigger value="products" className='border-none rounded-2xl p-2'>Products</TabsTrigger>
          <TabsTrigger value="customers" className='border-none rounded-2xl p-2'>Customers</TabsTrigger>
        </TabsList>
        <Separator className="mb-4" />

        <TabsContent value="overview" className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Revenue Chart */}
            <div className="p-0.5 bg-gradient-to-r from-orange-50 to-amber-50  dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
              <Card className=" h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Daily Revenue
                  </CardTitle>
                  <CardDescription>Revenue trends over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>

            <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
              <Card className=" h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ScaleIcon className="h-5 w-5 text-emerald-600" />
                    Sales by Category
                  </CardTitle>
                  <CardDescription>Revenue distribution across categories</CardDescription>
                </CardHeader>
                <CardContent className='pb-4'>
                  <CategoryDistributionChart />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className=" h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar1 className="h-5 w-5 text-emerald-600" />
                  Monthly Performance
                </CardTitle>
                <CardDescription>Sales, orders, and customer trends</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <MonthlyTrendsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Revenue Chart */}
            <div className="p-0.5 bg-gradient-to-r from-orange-50 to-amber-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
              <Card className=" h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    Monthly Sales Trend
                  </CardTitle>
                  <CardDescription>Revenue trends over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  < MonthlySaleChart />
                </CardContent>
              </Card>
            </div>

            <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
              <Card className=" h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingBagIcon className="h-5 w-5 text-emerald-600" />
                    Order Volume
                  </CardTitle>
                  <CardDescription>Revenue distribution across categories</CardDescription>
                </CardHeader>
                <CardContent className='pb-4'>
                  <OrderSaleChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className=" h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBagIcon className="h-5 w-5 text-emerald-600" />
                  Top Performing Products
                </CardTitle>
                <CardDescription>Best selling products by revenue and volume</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <ProductAnalytics />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="p-0.5 bg-gradient-to-r from-green-50 to-emerald-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className=" h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCheck2Icon className="h-5 w-5 text-emerald-600" />
                  Customer Acquisition Channels
                </CardTitle>
                <CardDescription>How customers are finding your business</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <CustomerAcquistionChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}