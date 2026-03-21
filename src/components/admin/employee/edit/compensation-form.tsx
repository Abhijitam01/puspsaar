'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormProvider, useForm } from "react-hook-form";


export default function EditCompensationForm() {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <div className="">
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Edit Joining Date & Compensation</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to edit joining date & compensation for the employee.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-4">
            <h2 className="font-bold text-md text-secondary">Joining Date</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Start Date</FormLabel>
                    <FormControl>
                      <Input type="date"
                        className="rounded-lg border p-5 shadow-sm"
                        placeholder="Select joining date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Confirmation Date</FormLabel>
                    <FormControl>
                      <Input type="date"
                        className="rounded-lg border p-5 shadow-sm"
                        placeholder="Select confirmation date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastWorkingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">End Date</FormLabel>
                    <FormControl>
                      <Input type="date"
                        className="rounded-lg border p-5 shadow-sm"
                        placeholder="Select last working date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-md text-secondary">Compensation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter salary amount"
                        className="rounded-lg border p-5 shadow-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Currency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}