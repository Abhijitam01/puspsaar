'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, PlusCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/ui/data-table';
import { IDepartment, IEmployee } from '@/model/employee';
import { columns } from '@/components/admin/employee/columns';
import { EmployeeStats } from '@/components/admin/employee/EmployeeStats';
import { Input } from '@/components/ui/input';


const departments: IDepartment[] = [
  {
    id: "d1",
    name: "Engineering",
    code: "ENG",
    description: "Software Engineering Department",
    isActive: true,
  },
  {
    id: "d2",
    name: "Human Resources",
    code: "HR",
    description: "Handles recruitment and employee relations",
    isActive: true,
  },
];

const data: IEmployee[] = [
  {
    _id: "UI1",
    createdBy: "admin",
    userId: "EMP001",
    employeeCode: "EM1",
    firstName: "Ravi",
    middleName: "Kumar",
    lastName: "Mishra",
    gender: "Male",
    personalEmail: "ravi.kumar@gmail.com",
    workPhone: "+91 987-654-3210",
    department: departments[0],
    departmentId: "d1",
    designation: "Software Engineer",
    reportingToId: "e2",
    status: "ACTIVE",
    employmentType: "FULL_TIME",
    joiningDate: "2023-06-01T09:00:00Z",
    confirmationDate: "2023-12-01T09:00:00Z",
    salary: 750000,
    currency: "INR",
    profileImage: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    emergencyContactName: "Amit Kumar",
    emergencyContactPhone: "+91-9998887777",
    emergencyContactRelation: "Brother",
    currentAddress: {
      line1: "123, MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    permanentAddress: {
      line1: "45, Civil Lines",
      city: "Patna",
      state: "Bihar",
      postalCode: "800001",
      country: "India",
    },
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2024-07-01T10:00:00Z"
  },
  {
    _id: "UI2",
    createdBy: "admin",
    userId: "EMP002",
    employeeCode: "EM2",
    firstName: "Anjali",
    middleName: "",
    lastName: "Sharma",
    gender: "Female",
    personalEmail: "anjali.sharma@example.com",
    workPhone: "+91 987-650-1234",
    department: departments[0],
    departmentId: "d1",
    designation: "Team Lead",
    reportingToId: "e5",
    status: "ACTIVE",
    employmentType: "FULL_TIME",
    joiningDate: "2022-04-15T09:00:00Z",
    confirmationDate: "2022-10-15T09:00:00Z",
    salary: 1200000,
    currency: "INR",
    profileImage: "https://img.freepik.com/free-photo/stylish-young-caucasian-woman-wearing-glasses-smiling-posing-against-beige-background-copy-space_1258-87234.jpg?semt=ais_hybrid&w=740&q=80",
    emergencyContactName: "Raj Sharma",
    emergencyContactPhone: "+91 987-650-4321",
    emergencyContactRelation: "Father",
    currentAddress: {
      line1: "45, Residency Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560025",
      country: "India",
    },
    permanentAddress: {
      line1: "67, Connaught Place",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
    },
    createdAt: "2022-04-10T10:00:00Z",
    updatedAt: "2024-06-10T10:00:00Z",
  },

]


export default function EmployeesPage() {

  return (
    <div className="min-h-screen py-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className='text-2xl font-bold'>All Employees</h1>
        <div className='flex gap-4'>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>

          <Link href="/admin/employee/add">
            <Button className='bg-secondary text-white hover:bg-secondary/90'>
              <PlusCircle className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Employee Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="mt-4 mb-6" />

      {/* Stats Cards */}
      <div className="p-0.5 bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl mb-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Performance Overview
            </CardTitle>
            <CardDescription className="text-xs">
              Key statistics and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeStats />
          </CardContent>
        </Card>
      </div>
      {/* Data Table */}
      <Card className="border shadow-sm mt-6">
        <CardHeader>
          <CardTitle>Employees List</CardTitle>
          <CardDescription>Search, filter, and manage all employees in your organization</CardDescription>
          <div>
            <Input type="search" placeholder="Search employees..." className="mt-4 w-full md:w-1/3"></Input>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>

    </div>
  );
}