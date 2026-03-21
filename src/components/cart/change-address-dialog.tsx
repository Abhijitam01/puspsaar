'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MapPin, Navigation } from "lucide-react"

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
            <DialogContent className="max-w-md glass-panel border border-white/10 bg-card" >
                <DialogHeader>
                    <DialogTitle className="text-foreground flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-secondary" />
                        Select Delivery Address
                    </DialogTitle>
                </DialogHeader>

                {/* Address List */}
                <RadioGroup value={selected} onValueChange={setSelected} className="space-y-2">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className={`flex items-center space-x-3 rounded-lg p-3 transition-all cursor-pointer border ${
                                selected === String(addr.id) 
                                    ? 'bg-secondary/10 border-secondary/40' 
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                        >
                            <RadioGroupItem value={String(addr.id)} id={`addr-${addr.id}`} className="border-white/30 text-secondary" />
                            <div className="flex-1">
                                <Label
                                    htmlFor={`addr-${addr.id}`}
                                    className="cursor-pointer font-semibold text-foreground"
                                >
                                    {addr.name}, {addr.pincode}{" "}
                                    <span className="ml-1 text-xs bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full">
                                        {addr.type}
                                    </span>
                                </Label>
                                <p className="text-sm text-muted-foreground truncate mt-1">{addr.details}</p>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
                <Separator className="bg-white/10" />
                {/* Pincode Check */}
                <div className="mt-2 space-y-3">
                    <p className="text-muted-foreground text-sm">Use pincode to check delivery info</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="rounded-lg bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-secondary/50"
                        />
                        <Button variant="secondary" className="text-secondary-foreground bg-secondary hover:bg-secondary/80">Submit</Button>
                    </div>
                    <Button variant="link" className="text-secondary p-0 h-auto hover:text-secondary/80 flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        Use my current location
                    </Button>
                </div>

                {/* Save Button */}
                <Button
                    className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold neon-glow"
                    variant="default"
                    onClick={() => onOpenChange(false)}
                >
                    Deliver Here
                </Button>

            </DialogContent>
        </Dialog>
    )
}
