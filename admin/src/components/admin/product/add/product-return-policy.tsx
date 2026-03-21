'use client'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const productSchema = z.object({
    isReturnable: z.boolean().optional(),
    returnPeriodDays: z.number().min(0, "Must be greater than or equal to 0").optional(),
    returnPolicyNote: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function ProductReturnPolicy() {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            isReturnable: false,
            returnPeriodDays: 0,
            returnPolicyNote: "",
        },
    })

    const onSubmit = (values: ProductFormValues) => {
        console.log(values)
    }

    return (
        <FormProvider {...form}>
            <div>
                <div className="space-y-2 mb-8">
                    <h1 className="text-xl font-bold">Return Policy</h1>
                    <p className="text-sm text-muted-foreground">Please fill out the form below to add return policy  for the product.</p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                     
                    <FormField
                        control={form.control}
                        name="returnPeriodDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold line-clamp-1">Return Period (Days)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter number of days"
                                        className="rounded-lg border p-5 shadow-sm"
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isReturnable"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-x-2 rounded-lg border p-5 shadow-sm">
                                <div className="flex-1">
                                    <FormLabel className="font-bold line-clamp-1">Returnable</FormLabel>
                                    <p className="text-xs text-muted-foreground">The number of days a customer can return the product.</p>
                                </div>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="h-6 w-6"
                                    />
                                </FormControl>
                               
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    {/* ✅ Return Policy Note (Textarea) */}
                    <FormField
                        control={form.control}
                        name="returnPolicyNote"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="font-bold line-clamp-1">Return Policy Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write detailed return conditions..."
                                        className=" font-normal"
                                        maxLength={500}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </div>
        </FormProvider >
    )
}