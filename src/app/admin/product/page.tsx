'use client'

import { Button } from "@/components/ui/button";
import { Car, PlusCircleIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { columns } from "@/components/admin/product/product-column";
import { dummyProducts } from "@/data/dummy-products";
import { DataTable } from "@/components/ui/data-table";
import ProductStats from "@/components/admin/product/product-stats";


export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase();
    return dummyProducts.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch) ||
        product.vin.toLowerCase().includes(normalizedSearch) ||
        product.make.toLowerCase().includes(normalizedSearch) ||
        product.model.toLowerCase().includes(normalizedSearch) ||
        product.location.city.toLowerCase().includes(normalizedSearch) ||
        product.tags.some(tag => tag.toLowerCase().includes(normalizedSearch));
      
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || 
        product.categoryIds.some(cat => cat.toLowerCase().includes(categoryFilter.toLowerCase()));
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const vehicleStats = useMemo(() => {
    const totalVehicles = dummyProducts.length;
    const readyVehicles = dummyProducts.filter(p => p.vehicleStatus === "READY").length;
    const inspectionQueue = dummyProducts.filter(p => ["INTAKE", "INSPECTION"].includes(p.vehicleStatus)).length;
    const reservedVehicles = dummyProducts.filter(p => p.vehicleStatus === "RESERVED").length;
    const averageTicket =
      totalVehicles === 0
        ? 0
        : dummyProducts.reduce((sum, product) => sum + product.sellingPrice, 0) / totalVehicles;
    const coverageCities = new Set(dummyProducts.map(p => p.location.city)).size;

    return {
      totalVehicles,
      readyVehicles,
      inspectionQueue,
      reservedVehicles,
      averageTicket,
      coverageCities,
    };
  }, []);

  return (
  <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
    <div className=" flex items-center justify-between">
        <div>
          <h1 className='text-2xl font-bold'>Vehicle Listings</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Vehicle Listings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
          <Link href="/admin/product/add">
            <Button className="bg-secondary cursor-pointer hover:bg-tertiary/90 text-white font-semibold">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Intake Vehicle
            </Button>
          </Link>
      </div>
       <Separator className="" />

      {/* Stats Cards */}
      <div className="space-y-5">
        <div className="p-0.5  bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Fleet Snapshot
              </CardTitle>
              <CardDescription> Single-party owned vehicles with lifecycle readiness status</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
                 <ProductStats {...vehicleStats} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Products Table */}
       <div className='space-y-5 mt-5 bg-gradient-to-r from-teal-50 to-green-50 p-0.5 dark:from-zinc-700 dark:to-zinc-800 rounded-lg'>
      <Card className="border-0 shadow-sm  ">
        <CardContent className="p-5">
          <DataTable 
            columns={columns} 
            data={filteredProducts}
          />
        </CardContent>
      </Card>
      </div>
    </div>
  );
}