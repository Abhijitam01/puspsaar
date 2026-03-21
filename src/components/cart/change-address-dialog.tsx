'use client'

import { useState } from "react"
import { MapPin, Navigation, X } from "lucide-react"

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
]

export default function ChangeAddressDialog({ open, onOpenChange }: Props) {
    const [selected, setSelected] = useState("1")
    const [pincode, setPincode] = useState("")

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
            <div className="w-full max-w-md bg-white border border-[#E0E0E0]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#1C1C1C]" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1C1C1C]">
                            Select Delivery Address
                        </h3>
                    </div>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Address List */}
                    <div className="space-y-2">
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                onClick={() => setSelected(String(addr.id))}
                                className={`flex items-start gap-3 p-3 cursor-pointer border transition-colors ${
                                    selected === String(addr.id)
                                        ? 'border-[#1C1C1C] bg-[#F5F5F5]'
                                        : 'border-[#E0E0E0] hover:border-[#ABABAB]'
                                }`}
                            >
                                <div className={`w-4 h-4 mt-0.5 border-2 shrink-0 flex items-center justify-center ${
                                    selected === String(addr.id) ? 'border-[#1C1C1C]' : 'border-[#E0E0E0]'
                                }`}>
                                    {selected === String(addr.id) && (
                                        <div className="w-2 h-2 bg-[#1C1C1C]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#1C1C1C]">
                                        {addr.name}, {addr.pincode}{' '}
                                        <span className="ml-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-[#E0E0E0] text-[#6B6B6B] px-1.5 py-0.5">
                                            {addr.type}
                                        </span>
                                    </p>
                                    <p className="text-xs text-[#6B6B6B] truncate mt-0.5">{addr.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-[#E0E0E0]" />

                    {/* Pincode Check */}
                    <div className="space-y-3">
                        <p className="text-xs text-[#6B6B6B]">Use pincode to check delivery info</p>
                        <div className="flex gap-2">
                            <input
                                placeholder="Enter pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="flex-1 border border-[#E0E0E0] px-3 py-2 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                            />
                            <button className="px-4 py-2 border border-[#1C1C1C] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors">
                                Check
                            </button>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] hover:underline">
                            <Navigation className="h-3 w-3" />
                            Use my current location
                        </button>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
                    >
                        Deliver Here
                    </button>
                </div>
            </div>
        </div>
    )
}
