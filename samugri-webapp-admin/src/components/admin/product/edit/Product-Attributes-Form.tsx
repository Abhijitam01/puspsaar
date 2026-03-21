'use client'

import { Card, CardContent } from "@/components/ui/card"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormValues } from "@/lib/schema/product-schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { PlusCircle, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"


// interface ProductAttributesFormProps {
//   isEditing: boolean
//   activeStep?: number
//   handleBack?: () => void
// }

export default function EditProductAttributesForm(){
  

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brandId: "",
      categoryIds: [],
      tags: [],
      images: [],
    }
  })

  const { fields: attributeFields, append: appendAttribute, remove: removeAttribute } = useFieldArray({
    control: form.control,
    name: "attributes"
  })

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data)
  }

  return (
    <FormProvider {...form} >
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold">Product Attribute Information</h1>
          <p className="text-sm text-muted-foreground">Please fill out the form below to edit brand & product attribute information for the product.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Brand*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter brand name"
                      className="rounded-lg border p-5 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Category ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter category name"
                      className="rounded-lg border p-5 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" line-clamp-1">Tags*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter tags"
                      className="rounded-lg border p-5 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-6" />

          <div >
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold">Product Attribute</h1>
              <Button
                type="button"
                size="sm"
                onClick={() => appendAttribute({
                  attributeTypeId: '',
                  attributeName: '',
                  dataType: 'TEXT',
                  isRequired: false,
                  value: ''
                })}
                className="bg-secondary hover:bg-secondary cursor-pointer text-white"
              >
                <PlusCircle className=" h-4 w-4" /> Add Attribute
              </Button>
            </div>

            <Card className="border-0 bg-transparent mt-3">
              <CardContent className="space-y-6 ">
                {attributeFields.map((field, index) => (
                  <div key={field.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-secondary">Attribute {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(index)}
                      >
                        <Trash className="h-4 w-4 text-tertiary" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.attributeTypeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Type ID</FormLabel>
                            <FormControl>
                              <Input {...field}
                                className='rounded-lg border p-5 shadow-sm'
                                placeholder="Enter Attribute Type ID" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.attributeName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Name</FormLabel>
                            <FormControl>
                              <Input {...field}
                                className='rounded-lg border p-5 shadow-sm'
                                placeholder="Enter Attribute Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       {/* <FormField
                        control={form.control}
                        name={`attributes.${index}.dataType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Data Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TEXT">Text</SelectItem>
                                <SelectItem value="NUMBER">Number</SelectItem>
                                <SelectItem value="BOOLEAN">Boolean</SelectItem>
                                <SelectItem value="DATE">Date</SelectItem>
                                <SelectItem value="ENUM">Enum</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                      
                       <FormField
                        control={form.control}
                        name={`attributes.${index}.value`}
                        render={({ field }) => {
                          const type = form.watch(`attributes.${index}.dataType`)
                          return (
                            <FormItem>
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                {type === 'BOOLEAN' ? (
                                  <Select onValueChange={field.onChange} value={String(field.value)} >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="true">True</SelectItem>
                                      <SelectItem value="false">False</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : type === 'NUMBER' ? (
                                  <Input type="number" {...field} value={field.value as string | number} />
                                ) : type === 'DATE' ? (
                                  <Input type="date" {...field} value={field.value as string} />
                                ) : type === 'ENUM' ? (
                                  <Select onValueChange={field.onChange} value={field.value as string}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Enum Value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {(form.watch(`attributes.${index}.values`) || []).map((val: string, idx: number) => (
                                        <SelectItem key={idx} value={val}>{val}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input {...field} value={field.value as string} />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.isRequired`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <FormLabel>Required</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {	form.watch(`attributes.${index}.dataType`) === 'ENUM' && (
                        <FormField
                          control={form.control}
                          name={`attributes.${index}.values`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Enum Values (comma separated)</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.join(", ") || ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value.split(",").map((v) => v.trim()).filter(Boolean)
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          {/* <div className="">
            {!isEditing && (
              <Button
                variant="outline"
                type="button"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="w-24 h-10 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="w-24 h-10 rounded-lg bg-primary hover:bg-primary-dark text-white"
            >
              {isEditing ? 'Update' : 'Next'}
            </Button>
          </div> */}
        </form>
      </div>
    </FormProvider>
  )
}