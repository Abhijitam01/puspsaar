'use client';


import EditBasicInfoForm from '@/components/admin/employee/edit/basic-info-form';
import EditCompensationForm from '@/components/admin/employee/edit/compensation-form';
import EditEmployeeAddressForm from '@/components/admin/employee/edit/employee-address-form';
import EditEmployeeContactForm from '@/components/admin/employee/edit/employee-contact-form';
import EditEmploymentForm from '@/components/admin/employee/edit/employment-details-form';
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

export default function EditEmployeePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

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

  const updateEmployee = async () => {
    setIsProcessing(true);
    try {
      // Add your update logic here
      console.log('Updating employee...');
      // After successful update, you might want to redirect
      // router.push('/employees');
    } catch (error) {
      console.error('Failed to update employee:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderComponent = () => {
    const stepContent = [
      <div key="EditBasicInfo">
        <EditBasicInfoForm />
      </div>,
      <div key="EditEmployeeContactForm">
        <EditEmployeeContactForm />
      </div>,
      <div key="EditEmploymentForm">
        <EditEmploymentForm />
      </div>,
      <div key="EditCompensationForm">
        <EditCompensationForm />
      </div>,
      <div key="EditEmployeeAddressForm">
        <EditEmployeeAddressForm />
      </div>,
    ];
    
    return <React.Fragment>{stepContent[activeStep]}</React.Fragment>;
  };

  return (
    <section>
      <div className="min-h-screen py-4 px-2 md:px-8">
        <div className="space-y-4">
          <h1 className='font-bold text-2xl'>Edit Employee</h1>
          <Breadcrumb className="m-4">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/employee">Manage Employees</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Edit Employee</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="my-4" />

          <AddProductStepper steps={steps} activeStep={activeStep} />
          
          {/* Main Form Content */}
          <div className="p-6 rounded-lg m-6 space-y-6 bg-white dark:bg-transparent dark:border border-zinc-600 shadow-sm dark:shadow-lg">
            {renderComponent()}
            <Separator className="my-6" />
            <div className="flex flex-row justify-end gap-4">
              <Button
                variant="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="w-24 bg-secondary text-white hover:bg-secondary/90 hover:cursor-pointer"
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={updateEmployee}
                  disabled={isProcessing}
                  className='w-32 bg-secondary text-white hover:bg-secondary/90 hover:cursor-pointer'
                >
                  {isProcessing ? "Updating..." : "Update Employee"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-24 bg-secondary text-white hover:bg-secondary/90 hover:cursor-pointer"
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