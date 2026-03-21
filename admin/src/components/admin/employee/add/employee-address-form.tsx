'use client'

import { FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"


export default function EmployeeAddressForm() {
    const form = useForm()
    const [sameAsCurrent, setSameAsCurrent] = useState(false)


    const currentValues = form.watch("current")
    useEffect(() => {
        if (sameAsCurrent) {
        form.setValue("permanent", currentValues)
    }
    }, [sameAsCurrent, currentValues, form])

    return(
        <FormProvider {...form}>
      <div>
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold">Add New Employee Address</h1>
           <p className="text-sm text-muted-foreground">Please fill out the form below to add a new address for the employee.</p>
        </div>
      </div>
        <form className="space-y-4">
            <div className="space-y-4">
                <h2 className="font-bold text-md text-secondary">Current Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <FormField
                        control={form.control}
                        name="current.line1"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1"> Line 1*</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Street, Building" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current.line2"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1"> Line 2</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Apartment, Suite (optional)" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                   <FormField
                        control={form.control}
                        name="current.city"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1">City*</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter City" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                     />
                    <FormField
                        control={form.control}
                        name="current.state"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1">State*</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter State" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current.postalCode"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1">Postal Code*</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter Postal Code" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current.country"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold line-clamp-1">Country*</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter Country" className='rounded-lg border p-5 shadow-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                </div>
            </div>
            
            <div className="flex items-center gap-2">
            <Input
                type="checkbox"
                id="sameAsCurrent"
                checked={sameAsCurrent}
                onChange={(e) => setSameAsCurrent(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="sameAsCurrent" className="text-sm font-medium">Permanent address same as current</Label>
            </div>

            {!sameAsCurrent && (
                <div className="space-y-4">
                    <h2 className="font-bold text-md text-secondary">Permanent Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormField
                            control={form.control}
                            name="permanent.line1"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1"> Line 1*</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Street, Building" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="permanent.line2"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1">Line 2</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Apartment, Suite (optional)" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="permanent.city"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1">City*</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Enter City" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="permanent.state"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1">State*</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Enter State" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="permanent.postalCode"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1">Postal Code*</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Enter Postal Code" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="permanent.country"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold line-clamp-1">Country*</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Enter Country" className='rounded-lg border p-5 shadow-sm' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
        </form>
        </FormProvider>
    )
}