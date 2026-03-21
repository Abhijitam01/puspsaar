'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { ProductFormValues, productSchema } from "@/lib/schema/product-schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function AddWarehouseInventoryForm() {

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {

    }
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form submitted:', data);
  };


  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold">Warehouse & Inventory</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to add warehouse & inventory information for the product.</p>
        </div>
        <div>
          <h1 className="font-bold">Warehouse & Inventory</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Inventory Details */}
            <FormField
              control={form.control}
              name="warehouseInventory.0.availableQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Available Quantity*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className='rounded-lg border p-5 shadow-sm'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warehouseInventory.0.reorderQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Reorder Quantity*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className='rounded-lg border p-5 shadow-sm'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warehouseInventory.0.minStockLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Min Stock Level*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className='rounded-lg border p-5 shadow-sm'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Location */}
          <div>
            <h1 className="font-bold">Location Details</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <FormField
                  control={form.control}
                  name="warehouseInventory.0.location.rack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" line-clamp-1">Rack</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter rack number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warehouseInventory.0.location.shelf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" line-clamp-1">Shelf</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter shelf number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warehouseInventory.0.location.bin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" line-clamp-1">Bin</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter bin number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          {/* dimensions */}
          <div>
            <h1 className="font-bold">Product Dimension</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <FormField
                  control={form.control}
                  name="dimensions.0.length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" line-clamp-1">Length</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter rack number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions.0.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" line-clamp-1">Width</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter width" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions.0.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="line-clamp-1">Height</FormLabel>
                      <FormControl>
                        <Input {...field}
                          className='rounded-lg border p-5 shadow-sm'
                          placeholder="Enter height" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* unit */}
                <FormField
                  control={form.control}
                  name="dimensions.0.unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="line-clamp-1">Unit</FormLabel>
                      <FormControl className="w-full">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full rounded-lg border p-5 shadow-sm">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inches">inches</SelectItem>
                            <SelectItem value="mm">mm</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}