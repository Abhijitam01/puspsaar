'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function CouponSettings() {
    const switches = [
        {
            label: 'Auto-generate codes',
            desc: 'Create unique codes when none specified',
        },
        {
            label: 'Case sensitive',
            desc: 'Require exact case for coupon codes',
        },
        {
            label: 'Email notifications',
            desc: 'Notify admins when coupons are used',
        },
    ]

    const inputs = [
        {
            label: 'Usage limit per customer',
            placeholder: '',
            type: 'number',
            defaultValue: 1,
            min: 1,
        },
        {
            label: 'Code prefix',
            placeholder: 'e.g., SAVE, DEAL',
            type: 'text',
        },
    ]

    return (
        <div className='gradient-to-br from-blue-50 to-purple-50  dark:from-zinc-700 dark:to-zinc-800 rounded-lg'>
            <Card className="">
                <CardHeader className="pt-2">
                    <CardTitle className="text-base font-semibold">Coupon Settings</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Configure default coupon behavior
                    </p>
                </CardHeader>
                <CardContent className="space-y-5 pb-5">
                    {/* Switches */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3    ">
                        {switches.map((item, i) => (
                            <div key={i} className="flex items-center border justify-between dark:bg-muted-foreground/7 p-3 rounded-md">
                                <div className="space-y-0.5 ">
                                    <Label className="text-sm font-medium pb-3">{item.label}</Label>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <Switch />
                            </div>
                        ))}
                    </div>
                    <Separator />
                    {/* Inputs */}
                    <div className="grid gap-9 sm:grid-cols-2">
                        {inputs.map((item, i) => (
                            <div key={i} className="space-y-1.5">
                                <Label className="text-sm font-medium line-clamp-1">{item.label}</Label>
                                <Input
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    defaultValue={item.defaultValue}
                                    min={item.min}
                                    className='w-full max-w-sm rounded-md '
                                />
                            </div>
                        ))}
                    </div>
                    <Separator className='mt-8' />
                    <div className='flex justify-end space-x-5 mt-4 text-white'>
                        <Button variant="outline" className='bg-rose-600 t'>Cancel</Button>
                        <Button className='bg-secondary t'>Save</Button>
                    </div>

                </CardContent>

            </Card>
        </div>
    )
}