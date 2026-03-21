'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/ui/data-table';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, Download } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { UserStats } from '@/components/admin/user-management/UserStats';
import { userColumns } from '@/components/admin/user-management/user-column';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { dummyUsers } from '@/data/dummy-user';

const genderOptions = [
    { value: 'all', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

export default function UsersManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);  // Pagination state
    const [searchValue, setSearchValue] = useState(""); // search state
    const [genderFilter, setGenderFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all'); // Filter
    const [userStatusFilter, setuserStatusFilter] = useState("all");

    const filteredUsers = dummyUsers.filter((user) => {
        const matchesSearch =
            searchValue === '' ||
            user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.phone?.includes(searchValue);

        const matchesGender = genderFilter === 'all' || user.gender?.toLowerCase() === genderFilter;
        const matchesStatus = statusFilter === 'all' || user.status?.toLowerCase() === statusFilter;

        return matchesSearch && matchesGender && matchesStatus;
    });

    const paginatedUsers = filteredUsers.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate refresh
        setTimeout(() => {
            setIsLoading(false);
            console.log('user refreshed');
        }, 1000);
    };

    const handleClearFilters = () => {
        setSearchValue("");
        setuserStatusFilter("all");

    };

    if (isLoading) {
        return <DataTableSkeleton />;
    }

    return (
        <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
            <div className=" flex items-center justify-between">
                <div>
                   <h1 className='text-2xl font-bold'>User management</h1>
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>User Management</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Button variant={'outline'} className='border dark:bg-muted-foreground/10  cursor-pointer transition-all '>
                    <Download className="h-4 w-4 mr-1" />
                    Export Report
                </Button>
            </div>
            <Separator className="" />

            <div className="space-y-5">
                <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart className="h-5 w-5 text-blue-600" />
                                User Overview
                            </CardTitle>
                            <CardDescription>Key statistics and metrics</CardDescription>
                        </CardHeader>
                        <CardContent className='pb-4'>
                            <UserStats />
                        </CardContent>
                    </Card>
                </div>
                <Separator className="" />
                <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl ">
                    <Card className='border-0 shadow-sm'>
                        <CardContent className="p-5">
                               <div className="w-full overflow-x-auto">
                            <DataTable
                                columns={userColumns} data={paginatedUsers}
                                searchPlaceholder="Search users by name, email, or phone..."
                                searchValue={searchValue}
                                onSearchChange={setSearchValue}
                                filters={[
                                    {
                                        key: 'gender',
                                        placeholder: 'Filter by Gender',
                                        value: genderFilter,
                                        options: genderOptions,
                                        onChange: setGenderFilter,
                                    },
                                    {
                                        key: 'status',
                                        placeholder: 'Filter by Status',
                                        value: statusFilter,
                                        options: statusOptions,
                                        onChange: setStatusFilter,
                                    },]}
                                onRefresh={handleRefresh}
                                onClearFilters={handleClearFilters}
                                isLoading={isLoading}
                            // pagination={{
                            //     pageIndex,
                            //     pageSize,
                            //     totalItems: filteredUsers.length,
                            //     totalPages: Math.ceil(filteredUsers.length / pageSize),
                            // }} onPaginationChange={(newPageIndex, newPageSize) => {
                            //     setPageIndex(newPageIndex);
                            //     setPageSize(newPageSize);
                            // }}
                            />
</div>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </div>
    );
}