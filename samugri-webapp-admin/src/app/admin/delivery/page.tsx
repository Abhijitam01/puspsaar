  'use client'

  import { useState } from 'react'
  import { Truck, MapPin, Navigation, } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  import { DataTable } from '@/components/ui/data-table/data-table'
  import { ColumnDef } from '@tanstack/react-table'
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
  import { Separator } from '@/components/ui/separator'
import DeliveryStatsCards from '@/components/admin/delivery/delivery-stats'
import { deliveryColumns } from '@/components/admin/delivery/delivery-columns'
  

  interface Delivery {
    id: string
    trackingId: string
    orderId: string
    customerName: string
    deliveryAddress: string
    agentName: string
    agentPhone: string
    status: 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED'
    scheduledDate: string
    deliveryTime?: string
    distance: number
    estimatedTime: number
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  }

  const deliveryData: Delivery[] = [
    {
      id: '1',
      trackingId: 'TRK123456789',
      orderId: 'ORD-2024-001',
      customerName: 'John Doe',
      deliveryAddress: '123 Main St, Sector 18, Noida',
      agentName: 'Rajesh Kumar',
      agentPhone: '+91 9876543210',
      status: 'OUT_FOR_DELIVERY',
      scheduledDate: '2024-09-09T14:00:00Z',
      distance: 5.2,
      estimatedTime: 25,
      priority: 'HIGH'
    },
    {
      id: '2',
      trackingId: 'TRK987654321',
      orderId: 'ORD-2024-002',
      customerName: 'Jane Smith',
      deliveryAddress: '456 Oak Ave, Dwarka, Delhi',
      agentName: 'Amit Singh',
      agentPhone: '+91 9876543211',
      status: 'IN_TRANSIT',
      scheduledDate: '2024-09-09T15:30:00Z',
      distance: 8.7,
      estimatedTime: 45,
      priority: 'MEDIUM'
    },
    {
      id: '3',
      trackingId: 'TRK456789123',
      orderId: 'ORD-2024-003',
      customerName: 'Bob Johnson',
      deliveryAddress: '789 Pine St, Gurgaon',
      agentName: 'Priya Sharma',
      agentPhone: '+91 9876543212',
      status: 'DELIVERED',
      scheduledDate: '2024-09-09T10:00:00Z',
      deliveryTime: '2024-09-09T10:45:00Z',
      distance: 12.3,
      estimatedTime: 0,
      priority: 'LOW'
    },
    {
      id: '4',
      trackingId: 'TRK321654987',
      orderId: 'ORD-2024-004',
      customerName: 'Alice Wilson',
      deliveryAddress: '321 Elm St, Faridabad',
      agentName: 'Sunil Yadav',
      agentPhone: '+91 9876543213',
      status: 'ASSIGNED',
      scheduledDate: '2024-09-09T16:00:00Z',
      distance: 15.6,
      estimatedTime: 60,
      priority: 'URGENT'
    },
    {
      id: '5',
      trackingId: 'TRK789123456',
      orderId: 'ORD-2024-005',
      customerName: 'Mike Brown',
      deliveryAddress: '654 Maple Ave, Greater Noida',
      agentName: 'Deepak Verma',
      agentPhone: '+91 9876543214',
      status: 'FAILED',
      scheduledDate: '2024-09-08T18:00:00Z',
      distance: 22.1,
      estimatedTime: 0,
      priority: 'MEDIUM'
    }
  ]





  export default function DeliveryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filteredData = deliveryData.filter(delivery => {
      const matchesSearch =
        delivery.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.agentName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter

      return matchesSearch && matchesStatus
    })

    const totalDeliveries = deliveryData.length
    const activeDeliveries = deliveryData.filter(d =>
      ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'].includes(d.status)
    ).length
    const deliveredToday = deliveryData.filter(d => d.status === 'DELIVERED').length
    const failedDeliveries = deliveryData.filter(d => d.status === 'FAILED').length
    const avgDistance = deliveryData.reduce((sum, d) => sum + d.distance, 0) / deliveryData.length

    return (
      <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
        {/* Header */}
        <div className=" flex items-center justify-between">
          <div>
            <h1 className='font-bold text-2xl'>Delivery Management</h1>
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Delivery </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Live Map
            </Button>
            <Button className='bg-secondary text-white'>
              <Navigation className="h-4 w-4 mr-2" />
              Route Optimizer
            </Button>
          </div>
        </div>
        <Separator className="" />
        {/* Stats Cards */}
       
          <div className="p-0.5 bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
            <Card className="border-0 shadow-sm ">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Delivery Overview
                </CardTitle>
                <CardDescription>Key statistics and metrics</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <DeliveryStatsCards
                  activeDeliveries={activeDeliveries}
                  deliveredToday={deliveredToday}
                  failedDeliveries={failedDeliveries}
                  avgDistance={avgDistance}
                  totalDeliveries={totalDeliveries}
                />
              </CardContent>
            </Card>
          </div>
       

        {/* Quick Actions */}
        {/* <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-8 w-8 mx-auto text-blue-500" />
              <CardTitle className="text-lg">Delivery Agents</CardTitle>
              <CardDescription>Manage delivery personnel</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Navigation className="h-8 w-8 mx-auto text-green-500" />
              <CardTitle className="text-lg">Route Optimization</CardTitle>
              <CardDescription>Optimize delivery routes</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto text-purple-500" />
              <CardTitle className="text-lg">Live Tracking</CardTitle>
              <CardDescription>Real-time delivery tracking</CardDescription>
            </CardHeader>
          </Card>
        </div> */}

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 dark:bg-muted-foreground/10 p-4 rounded-lg bg-white shadow-sm">
          <Input
            placeholder="Search deliveries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm rounded-md"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ASSIGNED">Assigned</SelectItem>
              <SelectItem value="PICKED_UP">Picked Up</SelectItem>
              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
              <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className='space-y-5 mt-5 bg-gradient-to-r from-teal-50 to-green-50 p-0.5 dark:from-zinc-700 dark:to-zinc-800 rounded-lg'>
          <Card className='border-0 shadow-sm '>
          <CardHeader className='pt-2'>
            <CardTitle>Delivery List</CardTitle>
            <p className="text-sm text-muted-foreground">Manage and track all deliveries</p>
          </CardHeader>
          <CardContent className="pb-5">
            <DataTable
              columns={deliveryColumns}
              data={filteredData}
              searchKey="trackingId"
                statusFilter={{
                  value: statusFilter,
                  onValueChange: setStatusFilter,
                  options: [
                    { value: 'all', label: 'All Status' },
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'ASSIGNED', label: 'Assigned' },
                    { value: 'PICKED_UP', label: 'Picked Up' },
                    { value: 'IN_TRANSIT', label: 'In Transit' },
                    { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
                    { value: 'DELIVERED', label: 'Delivered' },
                    { value: 'FAILED', label: 'Failed' }
                  ]
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }