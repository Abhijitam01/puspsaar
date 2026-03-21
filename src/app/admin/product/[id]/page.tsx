'use client'

import ProductDetails from '@/components/admin/product/product-details';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from "@/components/ui/separator";
import { dummyProducts } from "@/data/dummy-products";
import { IProduct } from "@/model/product";

export default function PreviewProductPage() {
    return (
        <div className="min-h-screen py-4 px-4 md:px-8">
           
                <h1 className='text-2xl font-bold'>Vehicle Preview</h1>
                  <Breadcrumb className="">
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/admin/product">Vehicle Listings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Vehicle Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
           
          
            <Separator className="my-4" />
            <div className="mt-4">
                <ProductDetails
                    product={dummyProducts[0] as IProduct}
                />
            </div>
        </div>
    );
}