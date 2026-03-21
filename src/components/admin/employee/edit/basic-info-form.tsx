'use client'

import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/admin/employee/image-upload"
import { employeePersonalSchema } from "@/lib/schema/employee/employee-personal-info"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


export default function EditBasicInfoForm() {

  const form = useForm({
    resolver: zodResolver(employeePersonalSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "male",
      profileImages: [],
      employeeCode: "",
      dob: "",
      userId: "",
    } 
  })

  useEffect(() => {
    form.reset({

    });
  }, [form]);

  const onSubmit = (data: any) => {
    console.log(data);
  } 
  return (
    <FormProvider {...form}>
      <div className="">
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Edit Personal Information</h1>
           <p className="text-sm text-muted-foreground">Please fill out the form below to edit personal information for the employee.</p>
        </div>
          <form  onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">First Name*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="Enter First Name"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="middleName"
                        placeholder="Enter Middle Name"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Last Name*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Enter Last Name"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">User ID*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="userId"
                        placeholder="Enter User ID"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-bold line-clamp-1">Gender*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField
                control={form.control}
                name="employeeCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Employee Code*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="employeeCode"
                        placeholder="Enter Employee Code"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-6" />

            <div className="space-y-4">
              <h1 className="font-bold text-md">Employee Image</h1>
              <ImageUpload
                accept="image/*"
                maxSize={10}
              />
            </div>

          </form>
        </div>
    </FormProvider>
  )
}