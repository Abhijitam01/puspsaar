'use client'

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormValues } from "@/lib/schema/product-schema"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ProductPricingFormProps {
  isEditing: boolean
  activeStep?: number
  handleBack?: () => void
}

export default function EditProductPricingForm() {

  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      mrp: 0,
      sellingPrice: 0,
      costPrice: undefined,
      taxRate: undefined,
      hsnCode: ''
    }
  })

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form submitted:', data)
    // Handle form submission here
  }

  return (
    <FormProvider {...form}>
       <div>
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Product Pricing Information</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to edit basic information for the product.</p>
        </div>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="mrp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >MRP</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0.00"
                          className='rounded-lg border p-5 shadow-sm'
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selling Price Field */}
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Selling Price</FormLabel>
                    <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0.00"
                           className='rounded-lg border p-5 shadow-sm'
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    <FormMessage  />
                  </FormItem>
                )}
              />

              {/* Cost Price Field */}
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Cost Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0.00"
                          className='rounded-lg border p-5 shadow-sm'
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tax Rate Field */}
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Tax Rate</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0.00"
                           className='rounded-lg border p-5 shadow-sm'
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* HSN Code Field */}
              <FormField
                control={form.control}
                name="hsnCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >HSN Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. 1234"
                       className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
          </div>
    </FormProvider>
  )
}