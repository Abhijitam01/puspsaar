'use client'

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormProvider, useForm } from "react-hook-form"


export default function EditEmployeeContactForm() {

  const form = useForm();
  return (
    <FormProvider {...form}>
      <div className="">
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Edit Employee Contact</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to edit the contact for the employee.</p>
        </div>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name='personalEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold line-clamp-1">Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email"
                      className="rounded-lg border p-5 shadow-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='personalPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold line-clamp-1">Phone*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number"
                      className="rounded-lg border p-5 shadow-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold line-clamp-1">Emergency Phone Number*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter emergency contact phone"
                      className="rounded-lg border p-5 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactRelation.relationship"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="font-bold line-clamp-1">Relationship*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}