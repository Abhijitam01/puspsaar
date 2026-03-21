"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AddProductStepper from "@/components/shared/stepper";
import { Button } from "@/components/ui/button";
import ProductPricingForm from "@/components/admin/product/add/pricing-form";
import ProductAttributesForm from "@/components/admin/product/add/Product-Attributes-Form";
import ProductImageForm from "@/components/admin/product/add/product-image";
import ProductReturnPolicy from "@/components/admin/product/add/product-return-policy";
import ProductForm from "@/components/admin/product/add/basic-product-form";
import FinishSection from "@/components/admin/product/add/finish-section";
import AddWarehouseInventoryForm from "@/components/admin/product/add/Warehouse-Inventory-form";


const AddProductPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({});

  const steps = [
    "Basic Details",
    "Pricing & Finance",
    "Vehicle Specifications",
    "Images & Documentation",
    "Inspection & Condition",
    "Location & Availability",
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

  const saveUser = async () => {
    setIsProcessing(true);
    try {
      handleNext();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderComponent = () => {
    const stepContent = [
      <div key="ProductForm">
        <ProductForm />
      </div>,
      <div key="ProductPricingForm">
        <ProductPricingForm />
      </div>,

      <div key="ProductPhysicalAttributesForm">
        <ProductAttributesForm />
      </div>,
      <div key="ProductCategoryForm">
        <ProductImageForm />
      </div>,
      <div key="WarehouseInventoryForm">
        <AddWarehouseInventoryForm />
      </div>,

      <div key="ProductReturnPolicyForm">
        <ProductReturnPolicy />
      </div>,
    ];
    return <React.Fragment>{stepContent[activeStep]}</React.Fragment>;
  };

  return (
    <section >
      <div className="min-h-screen py-4 px-2 md:px-8">
        <div className="space-y-4">
          <h1 className='text-2xl font-bold'>Add Vehicle </h1>
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
                <BreadcrumbPage>Add New Vehicle</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="my-4 m-4" />
          <AddProductStepper steps={steps} activeStep={activeStep} />

          {activeStep === steps.length ? (
            <React.Fragment>
              <FinishSection />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="p-0.5  rounded-lg  m-6 space-y-6 bg-white  dark:bg-muted-foreground/9 p-8 border-gray-200  shadow-sm dark:shadow-lg">
                {renderComponent()}
                <Separator className="my-6 mb-6" />
                <div className="flex flex-row  justify-between pt-2">
                  <Button
                    variant={"secondary"}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className=" bg-secondary  text-white cursor-pointer"
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      onClick={() => {
                        saveUser();
                        handleNext();
                      }}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      {isProcessing ? (
                        <span>Processing...</span>
                      ) : (
                        "Finish"
                      )}
                    </Button>

                  ) : (

                    <Button
                      onClick={() => {
                        handleNext();
                      }}
                      className="bg-secondary text-white cursor-pointer"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}

        </div>
      </div>
    </section>
  );
};

export default AddProductPage;