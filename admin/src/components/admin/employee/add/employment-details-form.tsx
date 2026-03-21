'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";


export default function EmploymentForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold">Add Working Information</h1>
        <p className="text-sm text-muted-foreground">Please fill out the form below to add working information for the employee.</p>
      </div>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Department ID*</FormLabel>
                <FormControl>
                  <Input placeholder="Auto-generated or enter manually"
                    className="rounded-lg border p-5 shadow-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Department Name*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dept1">Sales</SelectItem>
                    <SelectItem value="dept2">Engineering</SelectItem>
                    <SelectItem value="dept3">HR</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Department Code</FormLabel>
                <FormControl>
                  <Input placeholder="Unique code e.g. HR01"
                    className="rounded-lg border p-5 shadow-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Designation*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter  your designation"
                    className="rounded-lg border p-5 shadow-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reportingToId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Reporting To*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="emp1">John Doe</SelectItem>
                    <SelectItem value="emp2">Jane Smith</SelectItem>
                    <SelectItem value="emp3">Michael Lee</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Parent Department*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                      <SelectValue placeholder="Select parent department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="parent1">Head Office</SelectItem>
                    <SelectItem value="parent2">Regional Office</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1"> Employment Status*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Employment Type*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border p-5 shadow-sm w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold line-clamp-1">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Is Active */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="">
                  <FormLabel>Active Status</FormLabel>
                  <p className="text-sm text-muted-foreground">Mark whether this department is active</p>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
        </FormProvider >
    )
}