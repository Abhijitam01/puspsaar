  'use client'

  import { useState } from 'react'
  import { Gauge, CalendarClock } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  import { DataTable } from '@/components/ui/data-table/data-table'
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
  import { Separator } from '@/components/ui/separator'
import DeliveryStatsCards from '@/components/admin/delivery/delivery-stats'
import { deliveryColumns, TestDrive } from '@/components/admin/delivery/delivery-columns'
  

  const testDriveData: TestDrive[] = [
    {
      id: 'td-001',
      requestId: 'TD-2025-001',
      vehicle: '2022 Hyundai Creta SX (O)',
      vin: 'MAANH81AVN0012345',
      customerName: 'Anita Mehra',
      customerPhone: '+91 98111 22334',
      advisorName: 'R. Sharma',
      advisorPhone: '+91 98111 00987',
      status: 'CONFIRMED',
      preferredSlot: '2025-02-20T11:30:00Z',
      requestedAt: '2025-02-18T09:00:00Z',
      hub: 'Okhla Mega Hub',
      driveType: 'CITY',
      notes: 'Needs 30-min loop',
    },
    {
      id: 'td-002',
      requestId: 'TD-2025-002',
      vehicle: '2020 Jeep Compass Limited Plus',
      vin: '1C4NJDCB0LD102938',
      customerName: 'Lakshmi Narayan',
      customerPhone: '+91 99222 11044',
      advisorName: 'S. Nair',
      advisorPhone: '+91 99887 66554',
      status: 'IN_PROGRESS',
      preferredSlot: '2025-02-19T15:00:00Z',
      requestedAt: '2025-02-17T12:30:00Z',
      hub: 'Golf Course Studio',
      driveType: 'HIGHWAY',
      notes: 'Already paid booking fee',
    },
    {
      id: 'td-003',
      requestId: 'TD-2025-003',
      vehicle: '2019 Swift VXI AMT',
      vin: 'MA3EJKD1S00784563',
      customerName: 'Prateek Jha',
      customerPhone: '+91 98000 44321',
      advisorName: 'A. Khan',
      advisorPhone: '+91 98000 88761',
      status: 'REQUESTED',
      preferredSlot: '2025-02-21T10:00:00Z',
      requestedAt: '2025-02-18T18:10:00Z',
      hub: 'Electronic City Yard',
      driveType: 'CITY',
      notes: 'Wants pickup from office',
    },
    {
      id: 'td-004',
      requestId: 'TD-2025-004',
      vehicle: '2021 Tata Nexon EV XZ+',
      vin: 'MATANX80LEN003875',
      customerName: 'Sonia Kapoor',
      customerPhone: '+91 90007 88776',
      advisorName: 'Priya Dutta',
      advisorPhone: '+91 97777 66545',
      status: 'COMPLETED',
      preferredSlot: '2025-02-18T09:30:00Z',
      requestedAt: '2025-02-15T14:00:00Z',
      hub: 'Navi Mumbai EV Hub',
      driveType: 'HOME_TEST',
      notes: 'Shared positive feedback',
    },
    {
      id: 'td-005',
      requestId: 'TD-2025-005',
      vehicle: '2018 Honda City ZX CVT',
      vin: 'MRHGM2680JT501234',
      customerName: 'Vikram Sethi',
      customerPhone: '+91 91234 77890',
      advisorName: 'Ganesh Iyer',
      advisorPhone: '+91 96666 12345',
      status: 'CANCELLED',
      preferredSlot: '2025-02-17T16:30:00Z',
      requestedAt: '2025-02-16T10:45:00Z',
      hub: 'OMR Reconditioning Center',
      driveType: 'CITY',
      notes: 'Reschedule requested',
    },
  ]





  export default function DeliveryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filteredData = testDriveData.filter(request => {
      const matchesSearch =
        request.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.vehicle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || request.status === statusFilter

      return matchesSearch && matchesStatus
    })

    const totalRequests = testDriveData.length
    const scheduledDrives = testDriveData.filter(d =>
      ['CONFIRMED', 'IN_PROGRESS'].includes(d.status)
    ).length
    const completedToday = testDriveData.filter(d => d.status === 'COMPLETED').length
    const cancelledDrives = testDriveData.filter(d => d.status === 'CANCELLED').length
    const avgLeadTimeHours = testDriveData.length
      ? testDriveData.reduce((sum, d) => {
          const lead =
            (new Date(d.preferredSlot).getTime() - new Date(d.requestedAt).getTime()) /
            (1000 * 60 * 60)
          return sum + lead
        }, 0) / testDriveData.length
      : 0

    return (
      <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
        {/* Header */}
        <div className=" flex items-center justify-between">
          <div>
            <h1 className='font-bold text-2xl'>Test Drive Management</h1>
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Test Drives</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className='flex items-center gap-2'>
              <CalendarClock className="h-4 w-4" />
              Create Slot
            </Button>
            <Button className='bg-secondary text-white'>
              Assign Advisor
            </Button>
          </div>
        </div>
        <Separator className="" />
        {/* Stats Cards */}
       
          <div className="p-0.5 bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
            <Card className="border-0 shadow-sm ">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-blue-600" />
                  Test Drive Overview
                </CardTitle>
                <CardDescription>Pipeline of customer experiences</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <DeliveryStatsCards
                  scheduledDrives={scheduledDrives}
                  completedToday={completedToday}
                  cancelledDrives={cancelledDrives}
                  avgLeadTimeHours={avgLeadTimeHours}
                  totalRequests={totalRequests}
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
            placeholder="Search test drives..."
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
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className='space-y-5 mt-5 bg-gradient-to-r from-teal-50 to-green-50 p-0.5 dark:from-zinc-700 dark:to-zinc-800 rounded-lg'>
          <Card className='border-0 shadow-sm '>
          <CardHeader className='pt-2'>
            <CardTitle>Test Drive Requests</CardTitle>
            <p className="text-sm text-muted-foreground">Assign advisors, monitor demand, and convert bookings</p>
          </CardHeader>
          <CardContent className="pb-5">
            <DataTable
              columns={deliveryColumns}
              data={filteredData}
              searchKey="requestId"
                statusFilter={{
                  value: statusFilter,
                  onValueChange: setStatusFilter,
                  options: [
                    { value: 'all', label: 'All Status' },
                    { value: 'REQUESTED', label: 'Requested' },
                    { value: 'CONFIRMED', label: 'Confirmed' },
                    { value: 'IN_PROGRESS', label: 'In Progress' },
                    { value: 'COMPLETED', label: 'Completed' },
                    { value: 'CANCELLED', label: 'Cancelled' }
                  ]
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }