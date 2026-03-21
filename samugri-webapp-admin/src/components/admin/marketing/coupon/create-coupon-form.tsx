'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

interface CreateCouponFormProps {
    onClose: () => void
}

export default function CreateCouponForm({ onClose }: CreateCouponFormProps) {
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        type: 'PERCENTAGE',
        value: 0,
        minOrderAmount: '',
        maxDiscountAmount: '',
        usageLimit: '',
        usagePerCustomer: 1,
        validFrom: '',
        validUntil: '',
        isActive: true
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Creating coupon:', formData)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mx-2">
            {/* Basic Info */}
            <div className="grid gap-4 ">
                <div className="space-y-4 mx-3 dark:bg-muted-foreground/10 p-4">
                    <h4 className="font-medium text-yellow-400">Basic Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code" className='line-clamp-1'>Coupon Code *</Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g., SAVE20"
                                required
                                className='rounded-md'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className='line-clamp-1'>Discount Type *</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PERCENTAGE">Percentage Off</SelectItem>
                                    <SelectItem value="FIXED_AMOUNT">Fixed Amount Off</SelectItem>
                                    <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                                    <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2 ">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your coupon..."
                            rows={3}
                        />
                    </div>
                </div>

                {/* Discount Config */}
                <div className="space-y-6 mx-3 dark:bg-muted-foreground/10 p-4">
                    <h4 className="font-medium text-yellow-400">Discount Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="value" className='line-clamp-1'>
                                {formData.type === 'PERCENTAGE' ? 'Percentage (%)' :
                                    formData.type === 'FIXED_AMOUNT' ? 'Amount (₹)' :
                                        formData.type === 'BUY_X_GET_Y' ? 'Buy Quantity' : 'Value'}
                            </Label>
                            <Input
                                id="value"
                                type="number"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                                min="0"
                                required
                                className='rounded-md'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="minOrderAmount" className='line-clamp-1'>Minimum Order Amount (₹)</Label>
                            <Input
                                id="minOrderAmount"
                                type="number"
                                value={formData.minOrderAmount}
                                onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                                min="0"
                                placeholder="No minimum"
                                className='rounded-md'
                            />
                        </div>
                    </div>

                    {formData.type === 'PERCENTAGE' && (
                        <div className="space-y-2">
                            <Label htmlFor="maxDiscountAmount" className='line-clamp-1'>Maximum Discount Amount (₹)</Label>
                            <Input
                                id="maxDiscountAmount"
                                type="number"
                                value={formData.maxDiscountAmount}
                                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                                min="0"
                                className='rounded-md'
                            />
                        </div>
                    )}
                </div>

                {/* Usage Limits */}
                <div className="space-y-4 mx-3 dark:bg-muted-foreground/10 p-4">
                    <h4 className="font-medium text-yellow-400">Usage Limits</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="usageLimit" className='line-clamp-1'>Total Usage Limit</Label>
                            <Input
                                id="usageLimit"
                                type="number"
                                value={formData.usageLimit}
                                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                min="1"
                                placeholder="Unlimited"
                                className='rounded-md'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="usagePerCustomer" className='line-clamp-1'>Uses Per Customer</Label>
                            <Input
                                id="usagePerCustomer"
                                type="number"
                                value={formData.usagePerCustomer}
                                onChange={(e) => setFormData({ ...formData, usagePerCustomer: Number(e.target.value) })}
                                min="1"
                                required
                                className='rounded-md'
                            />
                        </div>
                    </div>
                </div>




                {/* Validity */}
                <div className="space-y-4 mx-3 dark:bg-muted-foreground/10 p-4">
                    <h4 className="font-medium text-yellow-400">Validity Period</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="validFrom" className='line-clamp-1'>Valid From *</Label>
                            <Input
                                id="validFrom"
                                type="datetime-local"
                                value={formData.validFrom}
                                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                required
                                className='rounded-md'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="validUntil" className='line-clamp-1'>Valid Until *</Label>
                            <Input
                                id="validUntil"
                                type="datetime-local"
                                value={formData.validUntil}
                                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                required
                                className='rounded-md'
                            />
                        </div>
                    </div>
                </div>
                    
                {/* Status */}
                <div className="mx-3 p-4  dark:bg-muted-foreground/10 rounded-md">
                    <h4 className="font-medium text-yellow-400 mb-3">Status</h4>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active</span>
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, isActive: checked })
                            }
                        />
                    </div>
                </div>

            </div>
            <Separator />
            <div className="flex justify-between space-x-6 mx-4 py-5">
                <Button type="button" variant="outline" className='bg-rose-600 text-white' onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-secondary text-white'>Create Coupon</Button>
            </div>
        </form>
    )
}