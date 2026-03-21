'use client'

import { useState } from 'react'
import { Archive, Package, Plus, PlusCircle, UserCheck2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { DataTable } from '@/components/ui/data-table'
import VendorStarsCards from '@/components/admin/vendor/ventor-stars'
import { vendorColumns } from '@/components/admin/vendor/ventor-columns'
import { useRouter } from 'next/navigation'

// 🔹 Vendor interface
interface Vendor {
  id: string
  vendorCode: string
  businessName: string
  businessType: 'INDIVIDUAL' | 'COMPANY'
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED'
  businessEmail: string
  businessPhone: string
  gstNumber?: string
  rating: number
  totalProducts: number
  totalSales: number
  commissionRate: number
  joinedDate: string
  lastSaleDate?: string
}

// 🔹 Dummy Vendor Data
const vendorData: Vendor[] = [
  {
    id: '1',
    vendorCode: 'VND001',
    businessName: 'Tech Gadgets Store',
    businessType: 'COMPANY',
    status: 'ACTIVE',
    businessEmail: 'contact@techgadgets.com',
    businessPhone: '+91 9876543210',
    gstNumber: '27AAAAA0000A1Z5',
    rating: 4.5,
    totalProducts: 125,
    totalSales: 89,
    commissionRate: 12,
    joinedDate: '2024-01-15T00:00:00Z',
    lastSaleDate: '2024-09-08T14:30:00Z',
  },
  {
    id: '2',
    vendorCode: 'VND002',
    businessName: 'Fashion Trends',
    businessType: 'COMPANY',
    status: 'ACTIVE',
    businessEmail: 'orders@fashiontrends.com',
    businessPhone: '+91 9876543211',
    gstNumber: '07BBBBB1111B2Z6',
    rating: 4.2,
    totalProducts: 78,
    totalSales: 156,
    commissionRate: 15,
    joinedDate: '2024-02-20T00:00:00Z',
    lastSaleDate: '2024-09-09T10:15:00Z',
  },
  {
    id: '3',
    vendorCode: 'VND003',
    businessName: 'Home Essentials',
    businessType: 'INDIVIDUAL',
    status: 'PENDING',
    businessEmail: 'homeessentials@gmail.com',
    businessPhone: '+91 9876543212',
    rating: 0,
    totalProducts: 45,
    totalSales: 0,
    commissionRate: 10,
    joinedDate: '2024-09-05T00:00:00Z',
  },
  {
    id: '4',
    vendorCode: 'VND004',
    businessName: 'Sports World',
    businessType: 'COMPANY',
    status: 'ACTIVE',
    businessEmail: 'sales@sportsworld.com',
    businessPhone: '+91 9876543213',
    gstNumber: '29CCCCC2222C3Z7',
    rating: 4.8,
    totalProducts: 203,
    totalSales: 234,
    commissionRate: 8,
    joinedDate: '2023-11-10T00:00:00Z',
    lastSaleDate: '2024-09-09T16:45:00Z',
  },
  {
    id: '5',
    vendorCode: 'VND005',
    businessName: 'Books & More',
    businessType: 'INDIVIDUAL',
    status: 'SUSPENDED',
    businessEmail: 'books@example.com',
    businessPhone: '+91 9876543214',
    rating: 3.2,
    totalProducts: 89,
    totalSales: 23,
    commissionRate: 12,
    joinedDate: '2024-03-01T00:00:00Z',
    lastSaleDate: '2024-08-15T12:20:00Z',
  },
]

// 🔹 Status filter options
const vendorStatusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'BLOCKED', label: 'Blocked' },
]

export default function VendorsPage() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>(vendorData)
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // 🔹 View details handler
  const handleViewDetails = (vendorId: string) => {
    console.log(`Viewing vendor: ${vendorId}`)
    router.push(`/admin/vendor/${vendorId}`)
  }

  // 🔹 Refresh handler
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Vendors refreshed')
    }, 1000)
  }

  // 🔹 Clear filters handler
  const handleClearFilters = () => {
    setSearchValue('')
    setStatusFilter('all')
  }

  // 🔹 Filtered vendors
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      searchValue === '' ||
      vendor.businessName.toLowerCase().includes(searchValue.toLowerCase()) ||
      vendor.vendorCode.toLowerCase().includes(searchValue.toLowerCase()) ||
      vendor.businessEmail.toLowerCase().includes(searchValue.toLowerCase())

    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE)
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  // const paginatedData = filteredVendors.slice(startIndex, startIndex + ITEMS_PER_PAGE)


  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between">
        <div>
         <h1 className='text-2xl font-bold'>Vendor Management</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Vendors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-4">
          <Button className="bg-yellow-800 text-white">
            <Archive className="h-4 w-4 " />
            Vendor Report
          </Button>
          <Link href="/admin/vendor/add">
            <Button className="bg-secondary text-white">
              <PlusCircle className="h-4 w-4 " />
              Add Vendor
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* 🔹 Stats Section */}
      <div className="space-y-5">
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
          <Card className="border-0 shadow-sm ">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck2 className="h-5 w-5 text-blue-600" />
                Vendors Overview
              </CardTitle>
              <CardDescription>Key statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <VendorStarsCards />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 🔹 DataTable Section */}
       <div className='space-y-5 mt-5 p-0.5 bg-gradient-to-r from-green-50 to-teal-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl'>
      <Card className='border-0 shadow-sm '>
        <CardContent className='p-6'>
          <DataTable
            columns={vendorColumns}
            data={filteredVendors}
            searchPlaceholder="Search vendors..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filters={[
              {
                key: 'status',
                placeholder: 'Vendor Status',
                value: statusFilter,
                options: vendorStatusOptions,
                onChange: setStatusFilter,
              },
            ]}
            onRefresh={handleRefresh}
            onClearFilters={handleClearFilters}
            isLoading={isLoading}
            // pagination={{
            //   pageIndex: 0,
            //   pageSize: 10,
            //   totalItems: filteredVendors.length,
            //   totalPages: Math.ceil(filteredVendors.length / 10),
            // }}
            // onPaginationChange={(pageIndex, pageSize) => {
            //   console.log(`Page changed to ${pageIndex + 1}, page size: ${pageSize}`);
            // }}
          />
        </CardContent>
      </Card>
      </div>
    </div>
  )
}