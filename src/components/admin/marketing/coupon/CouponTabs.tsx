'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/ui/data-table/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Discount } from '@/app/admin/marketing/coupon/page'
import CouponAnalytics from './coupon-analytics'
import CouponSettings from './coupon-setting'
import CreateCouponDialog from './create-coupon-sheet'



interface CouponTabsProps {
    coupons: Discount[]
    filteredCoupons: Discount[]
    couponColumns: ColumnDef<Discount>[]
    searchTerm: string
    setSearchTerm: (v: string) => void
    statusFilter: string
    setStatusFilter: (v: string) => void
    typeFilter: string
    setTypeFilter: (v: string) => void
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (v: boolean) => void
}

export default function CouponTabs({
    coupons,
    filteredCoupons,
    couponColumns,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
}: CouponTabsProps) {
    return (
        <Tabs defaultValue="all-coupons" className="space-y-4">
            <TabsList className="rounded-md p-1 flex space-x-2">
                <TabsTrigger
                    value="all-coupons"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-4"
                >
                    All Coupons
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-4"
                >
                    Analytics
                </TabsTrigger>
                <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full   px-4 py-4"
                >
                    Settings
                </TabsTrigger>
            </TabsList>

            {/* All Coupons */}
            <TabsContent value="all-coupons" className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border p-3">
                    {/* Left: Search Input */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search coupons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 rounded-md border outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    {/* Right: Filters */}
                    <div className="flex gap-4">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                                <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                                <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}

                <div className="p-0.5   rounded-xl">
                    <Card className="border shadow-sm ">
                        <CardHeader className="pt-2 flex items-center justify-between">
                            <CardTitle className="text-lg  gap-2">
                                Coupon List
                                <CardDescription>Manage your coupon codes and discounts</CardDescription>
                            </CardTitle>

                            <CreateCouponDialog
                                isOpen={isCreateDialogOpen}
                                setIsOpen={setIsCreateDialogOpen}
                            />
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-0">
                            <DataTable
                                columns={couponColumns}
                                data={filteredCoupons}
                                searchKey="code"
                            />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-4">
                <CouponAnalytics coupons={coupons} />
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-4">
                <CouponSettings />
            </TabsContent>
        </Tabs>
    )
}