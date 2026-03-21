'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface Address {
    id: number
    name: string
    pincode: string
    details: string
    type: "HOME" | "WORK" | "OTHER"
}

const addresses: Address[] = [
    {
        id: 1,
        name: "Vikarma Parsad",
        pincode: "804453",
        details: "Braham sathan kurthoul, Pillar no.45, Patna-804453",
        type: "HOME"
    },
    {
        id: 2,
        name: "Anjali Kumari",
        pincode: "844122",
        details: "West of Akshevast Roy College, VII+PO Madhaul",
        type: "HOME"
    },
    {
        id: 3,
        name: "Vikram Singh",
        pincode: "848102",
        details: "78, Dist- Patna, Vill- Danapur, Police Station XYZ",
        type: "HOME"
    },

];


export default function ChangeAddressDialog({ open, onOpenChange }: Props) {
    const [selected, setSelected] = useState("1")
    const [pincode, setPincode] = useState("")

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="max-w-md dark:bg-white" >
                <DialogHeader>
                    <DialogTitle className="dark:text-gray-800">Select Delivery Address</DialogTitle>
                </DialogHeader>

                {/* Address List */}
                <RadioGroup value={selected} onValueChange={setSelected} className="">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className="flex items-center space-x-3 rounded-md p-3 hover:bg-gray-50 "
                        >
                            <RadioGroupItem value={String(addr.id)} id={`addr-${addr.id}`} />
                            <div className="flex-1">
                                <Label
                                    htmlFor={`addr-${addr.id}`}
                                    className="cursor-pointer font-semibold dark:text-gray-700"
                                >
                                    {addr.name}, {addr.pincode}{" "}
                                    <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
                                        {addr.type}
                                    </span>
                                </Label>
                                <p className="text-sm text-gray-600 truncate">{addr.details}</p>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
                <Separator className="dark:bg-gray-200" />
                {/* Pincode Check */}
                <div className="mt-2 space-y-3 ">
                    <p className="text-gray-700 text-sm">Use pincode to check delivery info</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="rounded-sm"
                        />
                        <Button variant="secondary" className="text-white">Submit</Button>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                        Use my current location
                    </Button>
                </div>

                {/* Save Button */}
                <Button
                    className="w-full mt-4 bg-secondary text-white"
                    variant="default"
                    onClick={() => onOpenChange(false)}
                >
                    Deliver Here
                </Button>

            </DialogContent>
        </Dialog>
    )
}
