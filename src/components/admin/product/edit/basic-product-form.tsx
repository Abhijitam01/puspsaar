'use client';


import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {productSchema} from '@/lib/schema/product-schema'
import {ProductFormValues} from '@/lib/schema/product-schema'

const EditProductForm = () => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      slug: '',
      description: '',
      shortDescription: ''
    }
  });

 const onSubmit = (data: ProductFormValues) => {
     console.log('Form submitted:', data);
  };

  return (
    <FormProvider {...form}>
      <div>
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Product Basic Information</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to edit basic information for the product.</p>
        </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Product Name*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Product Name"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >SKU*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter SKU"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Slug*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter product slug"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter short description"
                        className='rounded-lg border p-5 shadow-sm'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Full Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter full product description"
                      rows={5}
                      className="rounded-lg border shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
      </div>
    </FormProvider>
  );
}

export default EditProductForm;