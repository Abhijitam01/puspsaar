'use client';

import EditWarehouseInventoryForm from '@/components/admin/product/add/Warehouse-Inventory-form';
import EditProductForm from '@/components/admin/product/edit/basic-product-form';
import EditProductPricingForm from '@/components/admin/product/edit/pricing-form';
import EditProductAttributesForm from '@/components/admin/product/edit/Product-Attributes-Form';
import EditProductImageForm from '@/components/admin/product/edit/product-image';
import EditProductReturnPolicy from '@/components/admin/product/edit/product-return-policy';
import AddProductStepper from '@/components/shared/stepper';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button'; // Added missing import
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function EditProductPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const steps = [
    "Basic Details",
    "Pricing Info",
    " Brand & Category ",
    "Product Image & Variant",
    "Inventory",
    "Return Policy",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const updateProduct = async () => {
    setIsProcessing(true);
    try {
      // Add your update logic here
      console.log('Updating product...');
      // After successful update, you might want to redirect
      // router.push('/employees');
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderComponent = () => {
    const stepContent = [
      <div key="EditBasicInfo">
        <EditProductForm />
      </div>,
      <div key="EditProductPricingForm">
        <EditProductPricingForm />
      </div>,
      <div key="EditProductImageForm">
        <EditProductImageForm />
      </div>,
      <div key="EditProductAttributesForm">
        <EditProductAttributesForm />
      </div>,
      <div key="">
        <EditWarehouseInventoryForm />
      </div>,
      <div key="EditProductReturnPolicy">
        <EditProductReturnPolicy />
      </div>,
    ];

    return <React.Fragment>{stepContent[activeStep]}</React.Fragment>;
  };

  return (
    <section>
      <div className="min-h-screen py-4 px-2 md:px-8">
        <div className="space-y-4">
          <h1 className='text-2xl font-bold'>Edit Product </h1>
          <Breadcrumb className="m-4">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/product">Manage Product</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Edit Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="my-4" />

          <AddProductStepper steps={steps} activeStep={activeStep} />

          {/* Main Form Content */}
          <div className="p-6 rounded-lg m-6 space-y-6  bg-white  dark:bg-muted-foreground/9 border-gray-200 shadow-sm dark:shadow-lg">
            {renderComponent()}
            <Separator className="my-6" />
            <div className="flex flex-row justify-end gap-4">
              <Button
                variant="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="w-24 hover:bg-orange-500 cursor-pointer text-white"
              >
                Back
              </Button>


              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={updateProduct}
                  disabled={isProcessing}
                  className='w-32 bg-green-600 hover:bg-green-700 cursor-pointer text-white'
                >
                  {isProcessing ? "Updating..." : "Update Product"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-24 bg-secondary hover:bg-secondary cursor-pointer text-white"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}