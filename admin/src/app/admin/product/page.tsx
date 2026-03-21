'use client'

import { Button } from "@/components/ui/button";
import { ComponentIcon,  PlusCircleIcon, Search } from "lucide-react";
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
    return dummyProducts.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || 
        product.categoryIds.some(cat => cat.toLowerCase().includes(categoryFilter.toLowerCase()));
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    const total = dummyProducts.length;
    const active = dummyProducts.filter(p => p.status === "ACTIVE").length;
    const draft = dummyProducts.filter(p => p.status === "DRAFT").length;
    const inStock = dummyProducts.filter(p => p.stockStatus === "IN_STOCK").length;
    const lowStock = dummyProducts.filter(p => p.stockStatus === "LOW_STOCK").length;
    const outOfStock = dummyProducts.filter(p => p.stockStatus === "OUT_OF_STOCK").length;
    const featured = 0; 
    const newArrivals = 0; // dummyProducts.filter(p => p.isNewArrival).length;
    const bestSellers = 0; // dummyProducts.filter(p => p.isBestSeller).length;
    
    return {
      total,
      active,
      draft,
      inStock,
      lowStock,
      outOfStock,
      featured,
      newArrivals,
      bestSellers
    };
  }, []);

  const categories = useMemo(() => {
    const allCategories = dummyProducts.flatMap(p => p.categoryIds);
    return [...new Set(allCategories)];
  }, []);

  return (
  <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
    <div className=" flex items-center justify-between">
        <div>
          <h1 className='text-2xl font-bold'>Product Management</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Products </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
          <Link href="/admin/product/add">
            <Button className="bg-secondary cursor-pointer hover:bg-tertiary/90 text-white font-semibold">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Product
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
                <ComponentIcon className="h-5 w-5 text-blue-600" />
                Product Overview
              </CardTitle>
              <CardDescription> Detailed insights, key features, and performance metrics of the product</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
                 <ProductStats stats={stats} categories={categories} />
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