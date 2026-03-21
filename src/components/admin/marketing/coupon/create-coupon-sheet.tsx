'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CreateCouponForm from './create-coupon-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

interface CreateCouponDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function CreateCouponDialog({ isOpen, setIsOpen }: CreateCouponDialogProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger asChild>
        <Button className='bg-secondary text-white hover:bg-secondary/80 flex items-center'>
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </SheetTrigger>

      <SheetContent
        className="overflow-auto w-full max-w-full md:max-w-lg" 
      >
        <SheetHeader>
          <SheetTitle>Create New Coupon</SheetTitle>
          <SheetDescription>
            Set up a new discount code for your customers
          </SheetDescription>
        </SheetHeader>
       
        <div  >
          <CreateCouponForm onClose={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
    