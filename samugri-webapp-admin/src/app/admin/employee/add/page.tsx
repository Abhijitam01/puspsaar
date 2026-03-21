'use client';
  import { Separator } from "@/components/ui/separator";
  import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
  import AddProductStepper from "@/components/shared/stepper";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import AddBasicInfoForm from "@/components/admin/employee/add/basic-info-form";
import EmployeeContactForm from "@/components/admin/employee/add/employee-contact-form";
import EmploymentForm from "@/components/admin/employee/add/employment-details-form";
import CompensationForm from "@/components/admin/employee/add/compensation-form";
import EmployeeAddressForm from "@/components/admin/employee/add/employee-address-form";
import FinishSection from "@/components/admin/product/add/finish-section";
import AddBasicInfoForm from "@/components/admin/employee/add/basic-info-form";


  export default function AddEmployeePage() {

    const [activeStep, setActiveStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const steps = [
    "Basic Details",
    "Contact Details",
    "Working Details",
    "Dates & Compensation",
    "Address",
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
      <div key="AddBasicInfo" >
        <AddBasicInfoForm />
      </div>,
      <div key="EmployeeContactForm">
       <EmployeeContactForm />
      </div>,
       <div key="">
       <EmploymentForm />
      </div>,
       <div key="">
       <CompensationForm />
      </div>,
     
      <div key="EmployeeAddressForm">
         <EmployeeAddressForm />
      </div>,
      
    ];
    return <React.Fragment>{stepContent[activeStep]}</React.Fragment>;
  };

  return (
    <section >
      <div className=" min-h-screen py-4 px-2 md:px-8 ">
      <div className="space-y-4  ">
        <h1 className="font-bold text-2xl">Add New Employee</h1>
        <Breadcrumb className="m-4">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin/employee">Manage Employees</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Add New Employee</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className="my-4 m-4" />
        <AddProductStepper steps={steps} activeStep={activeStep}   />
        
         {activeStep === steps.length ? (
         <React.Fragment>
            <FinishSection />
          </React.Fragment>
        ) : (
          
          <React.Fragment >
          <div className="p-0.5 rounded-lg  m-6 space-y-6 bg-white dark:bg-transparent p-8 dark:border border-zinc-600  shadow-sm dark:shadow-lg">
            {renderComponent()}
            <Separator className="my-6 mb-6" />
            <div className="flex flex-row  justify-end  gap-9  ">
              <Button
                variant={"secondary"}
                disabled={activeStep === 0}
                onClick={handleBack}
                className="w-24 shadow-md bg-secondary text-white"
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={() => {
                    saveUser();
                    handleNext();
                  }}
                  className="w-24 bg-secondary text-white hover:bg-secondary/90"
                >
                  {isProcessing ? (
                    <>
                      
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Finish"
                  )}
                </Button>
              ) : (
                
                <Button
                  onClick={() => {
                    handleNext();
                  }}
                  className="w-24 bg-secondary text-white hover:bg-secondary/90"
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
}