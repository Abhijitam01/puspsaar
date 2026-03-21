'use client'

import { FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import NewProductImage from "./product-image-view";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";


export default function ProductImageForm() {

  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    defaultValues: {
      variantSku: '',
      variantName: '',
      mrp: 0,
      sellingPrice: 0,
      isActive: true,
      pricingOverride: false
    },
  });

  const handleImageUpload = async (files: File[]) => {
    // Convert files to data URLs for preview
    const newImages = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      })
    );
    setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Limit to 5 images
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
  }
  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <div className="space-y-2 mb-8">
          <h1 className="text-xl font-bold">Product Image & Variants</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to add image & product variants information for the product.</p>
        </div>
        <div>
          <h1 className="font-bold">Product Image</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="gap-6">
            <NewProductImage
              previewImages={images}
              onUpload={handleImageUpload}
              onRemove={handleRemoveImage}
            />
          </div>
          <Separator />

          <div>
            <h1 className="font-bold">Product Variants</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-5">
              <FormField
                control={form.control}
                name="variantSku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Variant Sku</FormLabel>
                    <FormControl>
                      <Input type="text" {...field}
                        placeholder="Enter variant SKU"
                        className="rounded-lg border p-5 shadow-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="variantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Variant Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field}
                        placeholder="Enter variant Name"
                        className="rounded-lg border p-5 shadow-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mrp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">MRP</FormLabel>
                    <FormControl>
                      <Input type="number"
                        placeholder="Enter MRP"
                        className="rounded-lg border p-5 shadow-sm"
                        min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold line-clamp-1">Selling Price</FormLabel>
                    <FormControl>
                      <Input type="number"
                        placeholder="Enter selling price"
                        className="rounded-lg border p-5 shadow-sm"
                        min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-5 shadow-sm">

                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-bold line-clamp-1">Active Variant</FormLabel>
                      <FormDescription>
                        This variant will be visible to customers
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricingOverride"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-5 shadow-sm">

                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-bold line-clamp-1">Override pricing for this variant</FormLabel>
                      <FormDescription >
                        Enable to set specific prices for this variant
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};